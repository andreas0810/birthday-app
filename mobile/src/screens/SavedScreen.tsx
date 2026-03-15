import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

export default function SavedScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.center}>
        <Text style={styles.emoji}>❤️</Text>
        <Text style={styles.title}>Gespeicherte Deals</Text>
        <Text style={styles.sub}>
          Tippe auf das Herz bei einem Deal, um ihn hier zu speichern.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32 },
  emoji: { fontSize: 64, marginBottom: 16 },
  title: { fontSize: 22, fontWeight: '800', color: '#1A1A2E', marginBottom: 8 },
  sub: { fontSize: 15, color: '#888', textAlign: 'center', lineHeight: 22 },
});
