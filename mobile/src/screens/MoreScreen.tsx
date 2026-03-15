import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  SafeAreaView, ScrollView, Linking, Alert
} from 'react-native';

const PAYPAL_URL = 'https://www.paypal.com/donate?business=dein@paypal.de&amount=3&currency_code=EUR&item_name=Kaffee+fuer+den+Entwickler';

export default function MoreScreen() {
  async function openPayPal() {
    const supported = await Linking.canOpenURL(PAYPAL_URL);
    if (supported) {
      await Linking.openURL(PAYPAL_URL);
    } else {
      Alert.alert('Fehler', 'PayPal konnte nicht geöffnet werden.');
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <Text style={styles.heroEmoji}>🎂</Text>
          <Text style={styles.heroTitle}>Birthday Deals</Text>
          <Text style={styles.heroVersion}>Version 1.0.0</Text>
        </View>

        {/* Spenden-Card */}
        <View style={styles.donateCard}>
          <Text style={styles.donateTitle}>☕ Einen Kaffee spendieren?</Text>
          <Text style={styles.donateText}>
            Diese App ist kostenlos und werbefrei. Wenn dir Birthday Deals gefällt und du den Entwickler
            unterstützen möchtest, freue ich mich über eine kleine Spende. 😊
          </Text>
          <TouchableOpacity style={styles.donateBtn} onPress={openPayPal}>
            <Text style={styles.donateBtnEmoji}>☕</Text>
            <View>
              <Text style={styles.donateBtnTitle}>Einen Kaffee spendieren</Text>
              <Text style={styles.donateBtnSub}>3 € via PayPal · einmalig · freiwillig</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Info-Abschnitt */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Über die App</Text>
          <InfoRow icon="🎁" label="Was ist Birthday Deals?" value="Zeigt dir Gratis-Angebote und Rabatte an deinem Geburtstag – in deiner Nähe." />
          <InfoRow icon="📍" label="Standort" value="Wird nur für die Umkreissuche verwendet. Kein Tracking." />
          <InfoRow icon="🔒" label="Datenschutz" value="Nur dein Geburtsdatum wird gespeichert. Keine personenbezogenen Daten werden verkauft." />
        </View>

        {/* Deal melden */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mitmachen</Text>
          <TouchableOpacity
            style={styles.actionRow}
            onPress={() => Linking.openURL('mailto:feedback@birthday-deals.app?subject=Neuer Deal-Hinweis')}
          >
            <Text style={styles.actionIcon}>📬</Text>
            <View style={styles.actionText}>
              <Text style={styles.actionLabel}>Deal melden oder hinzufügen</Text>
              <Text style={styles.actionSub}>Kennst du ein Angebot, das fehlt?</Text>
            </View>
            <Text style={styles.actionArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionRow}
            onPress={() => Linking.openURL('https://github.com/andreas0810/birthday-app')}
          >
            <Text style={styles.actionIcon}>💻</Text>
            <View style={styles.actionText}>
              <Text style={styles.actionLabel}>Open Source auf GitHub</Text>
              <Text style={styles.actionSub}>Code ansehen & beitragen</Text>
            </View>
            <Text style={styles.actionArrow}>›</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.footer}>
          Gemacht mit ❤️ · Alle Angaben ohne Gewähr · Angebote können sich ändern
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

function InfoRow({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoIcon}>{icon}</Text>
      <View style={styles.infoText}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  content: { padding: 20, paddingBottom: 48 },
  hero: { alignItems: 'center', paddingVertical: 24 },
  heroEmoji: { fontSize: 56, marginBottom: 8 },
  heroTitle: { fontSize: 24, fontWeight: '800', color: '#1A1A2E' },
  heroVersion: { fontSize: 13, color: '#aaa', marginTop: 4 },

  donateCard: {
    backgroundColor: '#fff', borderRadius: 20, padding: 20, marginBottom: 20,
    borderWidth: 2, borderColor: '#6C63FF20',
  },
  donateTitle: { fontSize: 18, fontWeight: '800', color: '#1A1A2E', marginBottom: 8 },
  donateText: { fontSize: 14, color: '#666', lineHeight: 21, marginBottom: 16 },
  donateBtn: {
    backgroundColor: '#0070BA', borderRadius: 14, padding: 16,
    flexDirection: 'row', alignItems: 'center', gap: 14,
  },
  donateBtnEmoji: { fontSize: 28 },
  donateBtnTitle: { fontSize: 15, fontWeight: '800', color: '#fff' },
  donateBtnSub: { fontSize: 12, color: '#ffffff99', marginTop: 2 },

  section: {
    backgroundColor: '#fff', borderRadius: 16, padding: 16,
    marginBottom: 16,
  },
  sectionTitle: { fontSize: 13, fontWeight: '700', color: '#888', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 0.5 },
  infoRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, marginBottom: 12 },
  infoIcon: { fontSize: 20, marginTop: 2 },
  infoText: { flex: 1 },
  infoLabel: { fontSize: 14, fontWeight: '700', color: '#1A1A2E', marginBottom: 2 },
  infoValue: { fontSize: 13, color: '#666', lineHeight: 19 },

  actionRow: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    paddingVertical: 12, borderBottomWidth: 1, borderColor: '#F5F5F5',
  },
  actionIcon: { fontSize: 22 },
  actionText: { flex: 1 },
  actionLabel: { fontSize: 14, fontWeight: '600', color: '#1A1A2E' },
  actionSub: { fontSize: 12, color: '#888', marginTop: 1 },
  actionArrow: { fontSize: 20, color: '#ccc' },

  footer: { textAlign: 'center', fontSize: 12, color: '#bbb', lineHeight: 18, marginTop: 8 },
});
