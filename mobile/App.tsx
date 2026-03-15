import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import OnboardingScreen from './src/screens/OnboardingScreen';
import ListScreen       from './src/screens/ListScreen';
import MapScreen        from './src/screens/MapScreen';
import SavedScreen      from './src/screens/SavedScreen';
import DealDetailScreen from './src/screens/DealDetailScreen';

const Tab   = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabIcon({ icon, focused }: { icon: string; focused: boolean }) {
  return <Text style={{ fontSize: 22, opacity: focused ? 1 : 0.45 }}>{icon}</Text>;
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 0,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.08,
          shadowRadius: 12,
          elevation: 12,
          paddingBottom: 8,
          height: 64,
        },
        tabBarActiveTintColor: '#6C63FF',
        tabBarInactiveTintColor: '#aaa',
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600', marginTop: 2 },
      }}
    >
      <Tab.Screen
        name="Liste"
        component={ListScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon icon="🎁" focused={focused} />,
          tabBarLabel: 'Deals',
        }}
      />
      <Tab.Screen
        name="Karte"
        component={MapScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon icon="🗺️" focused={focused} />,
          tabBarLabel: 'Karte',
        }}
      />
      <Tab.Screen
        name="Gespeichert"
        component={SavedScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon icon="❤️" focused={focused} />,
          tabBarLabel: 'Gespeichert',
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [hasOnboarded, setHasOnboarded] = useState<boolean | null>(null);

  useEffect(() => {
    AsyncStorage.getItem('birthday').then(val => {
      setHasOnboarded(!!val);
    });
  }, []);

  // Splash: warte auf AsyncStorage
  if (hasOnboarded === null) {
    return <View style={{ flex: 1, backgroundColor: '#F8F9FA' }} />;
  }

  // Onboarding: noch kein Geburtstag gespeichert
  if (!hasOnboarded) {
    return <OnboardingScreen onComplete={() => setHasOnboarded(true)} />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={MainTabs} />
        <Stack.Screen
          name="DealDetail"
          component={DealDetailScreen}
          options={{
            headerShown: true,
            headerTitle: 'Deal Details',
            headerBackTitle: 'Zurück',
            headerTintColor: '#6C63FF',
            headerStyle: { backgroundColor: '#fff' },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
