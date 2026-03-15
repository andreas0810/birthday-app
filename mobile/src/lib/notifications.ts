import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from './supabase';
import { getUserId } from './users';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export async function registerForPushNotifications(): Promise<string | null> {
  if (!Device.isDevice) return null;

  const { status: existing } = await Notifications.getPermissionsAsync();
  let finalStatus = existing;

  if (existing !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') return null;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'Birthday Deals',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
    });
  }

  const token = (await Notifications.getExpoPushTokenAsync()).data;

  // Token in DB speichern
  const userId = await getUserId();
  if (userId && token) {
    const platform = Platform.OS === 'ios' ? 'ios' : 'android';
    await supabase.from('push_tokens')
      .upsert({ user_id: userId, token, platform }, { onConflict: 'token' });
  }

  return token;
}

// Prüfe ob neue Deals seit letztem App-Start vorhanden sind
export async function checkForNewDeals(): Promise<number> {
  const lastCheck = await AsyncStorage.getItem('last_deals_check');
  const since = lastCheck ?? new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

  const { count } = await supabase
    .from('deals')
    .select('id', { count: 'exact', head: true })
    .eq('active', true)
    .gt('created_at', since);

  const newCount = count ?? 0;

  if (newCount > 0) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: '🎁 Neue Geburtstags-Deals!',
        body: `${newCount} neue Angebot${newCount > 1 ? 'e' : ''} wurden hinzugefügt. Jetzt ansehen!`,
        data: { screen: 'Liste' },
      },
      trigger: null, // sofort
    });
  }

  await AsyncStorage.setItem('last_deals_check', new Date().toISOString());
  return newCount;
}

// Lokale Geburtstags-Erinnerung für eine Person
export async function scheduleBirthdayReminder(name: string, day: number, month: number): Promise<void> {
  // Kancelliere alte Erinnerungen für diese Person
  const scheduled = await Notifications.getAllScheduledNotificationsAsync();
  const existing = scheduled.find(n => n.content.data?.personName === name);
  if (existing) await Notifications.cancelScheduledNotificationAsync(existing.identifier);

  const now = new Date();
  let year = now.getFullYear();
  const birthdayThisYear = new Date(year, month - 1, day);
  if (birthdayThisYear < now) year += 1;

  // 1 Tag vorher um 9:00 Uhr
  const reminderDate = new Date(year, month - 1, day - 1, 9, 0, 0);
  if (reminderDate > now) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: `🎂 Morgen hat ${name} Geburtstag!`,
        body: 'Jetzt Deals in der App anschauen und etwas Schönes schenken.',
        data: { personName: name, screen: 'Liste' },
      },
      trigger: { type: Notifications.SchedulableTriggerInputTypes.DATE, date: reminderDate },
    });
  }
}
