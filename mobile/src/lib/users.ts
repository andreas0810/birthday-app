import { supabase } from './supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserProfile } from '../types';

export async function saveUserProfile(day: number, month: number): Promise<string> {
  // Check if we already have a user ID
  let userId = await AsyncStorage.getItem('user_id');

  if (userId) {
    // Update existing user
    await supabase.from('users').update({
      birthday_day: day,
      birthday_month: month,
    }).eq('id', userId);
  } else {
    // Create new user
    const { data, error } = await supabase
      .from('users')
      .insert({ birthday_day: day, birthday_month: month })
      .select('id')
      .single();

    if (error) throw error;
    userId = data.id;
    await AsyncStorage.setItem('user_id', userId!);
  }

  await AsyncStorage.setItem('birthday', JSON.stringify({ day, month }));
  return userId!;
}

export async function getUserId(): Promise<string | null> {
  return AsyncStorage.getItem('user_id');
}

export async function getBirthday(): Promise<{ day: number; month: number } | null> {
  const raw = await AsyncStorage.getItem('birthday');
  return raw ? JSON.parse(raw) : null;
}
