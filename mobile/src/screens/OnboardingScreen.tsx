import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  SafeAreaView, Alert, ScrollView
} from 'react-native';
import { saveUserProfile } from '../lib/users';

interface Props {
  onComplete: () => void;
}

const MONTHS = [
  'Januar','Februar','März','April','Mai','Juni',
  'Juli','August','September','Oktober','November','Dezember'
];

export default function OnboardingScreen({ onComplete }: Props) {
  const [day, setDay] = useState<number | null>(null);
  const [month, setMonth] = useState<number | null>(null);
  const [step, setStep] = useState<'month' | 'day'>('month');

  const daysInMonth = month ? new Date(2024, month, 0).getDate() : 31;

  async function finish() {
    if (!day || !month) return;
    try {
      await saveUserProfile(day, month);
      onComplete();
    } catch (e) {
      console.error('Fehler beim Speichern:', e);
      onComplete(); // trotzdem weiter, AsyncStorage wurde gesetzt
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.emoji}>🎂</Text>
        <Text style={styles.title}>Wann hast du Geburtstag?</Text>
        <Text style={styles.subtitle}>
          Wir zeigen dir, was du an deinem Geburtstag gratis oder vergünstigt bekommst – in deiner Nähe.
        </Text>
      </View>

      {step === 'month' ? (
        <>
          <Text style={styles.sectionLabel}>Monat wählen</Text>
          <ScrollView contentContainerStyle={styles.grid}>
            {MONTHS.map((m, i) => (
              <TouchableOpacity
                key={i}
                style={[styles.chip, month === i + 1 && styles.chipSelected]}
                onPress={() => { setMonth(i + 1); setStep('day'); }}
              >
                <Text style={[styles.chipText, month === i + 1 && styles.chipTextSelected]}>
                  {m}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </>
      ) : (
        <>
          <Text style={styles.sectionLabel}>Tag wählen – {MONTHS[(month ?? 1) - 1]}</Text>
          <ScrollView contentContainerStyle={styles.grid}>
            {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(d => (
              <TouchableOpacity
                key={d}
                style={[styles.dayChip, day === d && styles.chipSelected]}
                onPress={() => setDay(d)}
              >
                <Text style={[styles.chipText, day === d && styles.chipTextSelected]}>
                  {d}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity style={styles.backBtn} onPress={() => setStep('month')}>
              <Text style={styles.backText}>Monat ändern</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.ctaBtn, !day && styles.ctaBtnDisabled]}
              onPress={finish}
              disabled={!day}
            >
              <Text style={styles.ctaText}>Deals entdecken 🎉</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  hero: { alignItems: 'center', paddingTop: 48, paddingBottom: 24, paddingHorizontal: 24 },
  emoji: { fontSize: 64, marginBottom: 16 },
  title: { fontSize: 26, fontWeight: '800', color: '#1A1A2E', textAlign: 'center', marginBottom: 10 },
  subtitle: { fontSize: 15, color: '#666', textAlign: 'center', lineHeight: 22 },
  sectionLabel: { fontSize: 16, fontWeight: '700', color: '#1A1A2E', marginLeft: 20, marginBottom: 12 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 16, paddingBottom: 24 },
  chip: {
    paddingHorizontal: 16, paddingVertical: 10, margin: 4,
    borderRadius: 12, backgroundColor: '#fff',
    borderWidth: 1.5, borderColor: '#E0E0E0',
  },
  dayChip: {
    width: 52, height: 52, margin: 4, borderRadius: 12,
    backgroundColor: '#fff', borderWidth: 1.5, borderColor: '#E0E0E0',
    alignItems: 'center', justifyContent: 'center',
  },
  chipSelected: { backgroundColor: '#6C63FF', borderColor: '#6C63FF' },
  chipText: { fontSize: 14, fontWeight: '600', color: '#1A1A2E' },
  chipTextSelected: { color: '#fff' },
  footer: { padding: 20, gap: 10 },
  backBtn: { alignItems: 'center', padding: 12 },
  backText: { color: '#6C63FF', fontSize: 14, fontWeight: '600' },
  ctaBtn: {
    backgroundColor: '#6C63FF', borderRadius: 16,
    paddingVertical: 16, alignItems: 'center',
  },
  ctaBtnDisabled: { opacity: 0.4 },
  ctaText: { color: '#fff', fontSize: 17, fontWeight: '800' },
});
