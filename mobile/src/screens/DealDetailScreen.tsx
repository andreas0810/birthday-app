import React from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, SafeAreaView, Linking, Alert
} from 'react-native';
import { Deal } from '../types';

const DEAL_TYPE_LABELS: Record<string, string> = {
  free_item:        '🎁 Gratis Artikel',
  free_entry:       '🎟️ Gratis Eintritt',
  free_service:     '✨ Gratis Service',
  percent_discount: '% Prozent-Rabatt',
  fixed_discount:   '€ Fixbetrag-Rabatt',
};

const VALIDITY_LABELS: Record<string, string> = {
  birthday_only:  '📅 Nur am Geburtstag',
  birthday_week:  '📅 Ganze Geburtstagsw.',
  birthday_month: '📅 Ganzer Geburtstagsmonat',
};

const PROOF_LABELS: Record<string, string> = {
  id_card:       '🪪 Personalausweis vorzeigen',
  app_screenshot: '📱 App-Screenshot zeigen',
  loyalty_card:  '💳 Kundenkarte erforderlich',
  none:          '✅ Kein Nachweis nötig',
};

export default function DealDetailScreen({ route, navigation }: any) {
  const { deal } = route.params as { deal: Deal };
  const business = deal.businesses;

  const discountText =
    deal.deal_type === 'percent_discount' && deal.discount_value
      ? `${deal.discount_value}% Rabatt`
      : deal.deal_type === 'fixed_discount' && deal.discount_value
      ? `${deal.discount_value}€ Rabatt`
      : 'Gratis';

  async function openDeal() {
    if (deal.redemption_url) {
      const supported = await Linking.canOpenURL(deal.redemption_url);
      if (supported) Linking.openURL(deal.redemption_url);
      else Alert.alert('Fehler', 'Link kann nicht geöffnet werden.');
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Hero */}
        <View style={styles.hero}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoLetter}>{business?.name?.[0] ?? '?'}</Text>
          </View>
          <Text style={styles.businessName}>{business?.name}</Text>
          {deal.verified && (
            <View style={styles.verifiedBadge}>
              <Text style={styles.verifiedText}>Verifiziert</Text>
            </View>
          )}
        </View>

        {/* Titel & Rabatt */}
        <View style={styles.section}>
          <Text style={styles.title}>{deal.title}</Text>
          <Text style={styles.discount}>{discountText}</Text>
          {deal.description && (
            <Text style={styles.description}>{deal.description}</Text>
          )}
        </View>

        {/* Info-Karten */}
        <View style={styles.infoGrid}>
          <InfoItem icon="🏷️" label="Art" value={DEAL_TYPE_LABELS[deal.deal_type]} />
          <InfoItem icon="📅" label="Gültigkeit" value={VALIDITY_LABELS[deal.validity_type]} />
          <InfoItem icon="📋" label="Nachweis" value={PROOF_LABELS[deal.proof_required]} />
          {deal.coupon_code && (
            <InfoItem icon="🎫" label="Coupon-Code" value={deal.coupon_code} highlight />
          )}
        </View>

        {/* Bedingungen */}
        {deal.terms && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Bedingungen</Text>
            <Text style={styles.terms}>{deal.terms}</Text>
          </View>
        )}
      </ScrollView>

      {/* CTA */}
      <View style={styles.footer}>
        {deal.redemption_url ? (
          <TouchableOpacity style={styles.ctaBtn} onPress={openDeal}>
            <Text style={styles.ctaText}>Deal einlösen 🎉</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.ctaBtnDisabled}>
            <Text style={styles.ctaText}>Im Geschäft einlösen</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

function InfoItem({ icon, label, value, highlight }: {
  icon: string; label: string; value: string; highlight?: boolean;
}) {
  return (
    <View style={[styles.infoItem, highlight && styles.infoItemHighlight]}>
      <Text style={styles.infoIcon}>{icon}</Text>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={[styles.infoValue, highlight && styles.infoValueHighlight]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  scroll: { paddingBottom: 100 },
  hero: { alignItems: 'center', paddingVertical: 32, backgroundColor: '#fff' },
  logoCircle: {
    width: 80, height: 80, borderRadius: 24,
    backgroundColor: '#6C63FF20', alignItems: 'center', justifyContent: 'center',
    marginBottom: 12,
  },
  logoLetter: { fontSize: 36, fontWeight: '800', color: '#6C63FF' },
  businessName: { fontSize: 20, fontWeight: '800', color: '#1A1A2E', marginBottom: 6 },
  verifiedBadge: {
    backgroundColor: '#2ECC7120', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 10,
  },
  verifiedText: { fontSize: 12, color: '#27AE60', fontWeight: '700' },
  section: { backgroundColor: '#fff', margin: 12, borderRadius: 16, padding: 20 },
  title: { fontSize: 22, fontWeight: '800', color: '#1A1A2E', marginBottom: 6 },
  discount: { fontSize: 18, fontWeight: '700', color: '#6C63FF', marginBottom: 10 },
  description: { fontSize: 15, color: '#555', lineHeight: 22 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#1A1A2E', marginBottom: 8 },
  terms: { fontSize: 14, color: '#666', lineHeight: 21 },
  infoGrid: { margin: 12, gap: 8 },
  infoItem: {
    backgroundColor: '#fff', borderRadius: 14, padding: 16,
    flexDirection: 'row', alignItems: 'center', gap: 12,
  },
  infoItemHighlight: { backgroundColor: '#6C63FF10', borderWidth: 1.5, borderColor: '#6C63FF30' },
  infoIcon: { fontSize: 20 },
  infoLabel: { fontSize: 13, color: '#888', width: 80 },
  infoValue: { flex: 1, fontSize: 14, fontWeight: '600', color: '#1A1A2E' },
  infoValueHighlight: { color: '#6C63FF', fontSize: 16, letterSpacing: 1 },
  footer: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    padding: 20, paddingBottom: 36, backgroundColor: '#fff',
    borderTopWidth: 1, borderColor: '#F0F0F0',
  },
  ctaBtn: {
    backgroundColor: '#6C63FF', borderRadius: 16,
    paddingVertical: 16, alignItems: 'center',
  },
  ctaBtnDisabled: {
    backgroundColor: '#888', borderRadius: 16,
    paddingVertical: 16, alignItems: 'center',
  },
  ctaText: { color: '#fff', fontSize: 17, fontWeight: '800' },
});
