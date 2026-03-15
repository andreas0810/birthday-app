import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Image
} from 'react-native';
import { Deal } from '../types';

interface Props {
  deal: Deal;
  onPress: () => void;
}

const DEAL_LABELS: Record<string, { label: string; color: string }> = {
  free_item:        { label: 'GRATIS',    color: '#2ECC71' },
  free_entry:       { label: 'GRATIS',    color: '#2ECC71' },
  free_service:     { label: 'GRATIS',    color: '#2ECC71' },
  percent_discount: { label: 'RABATT',    color: '#E74C3C' },
  fixed_discount:   { label: 'RABATT',    color: '#E74C3C' },
};

const VALIDITY_LABELS: Record<string, string> = {
  birthday_only:  'Nur am Geburtstag',
  birthday_week:  'Geburtstagsw.',
  birthday_month: 'Im Geburtstagsmonat',
};

export default function DealCard({ deal, onPress }: Props) {
  const badge = DEAL_LABELS[deal.deal_type] ?? { label: 'DEAL', color: '#6C63FF' };
  const business = deal.businesses;

  const discountText =
    deal.deal_type === 'percent_discount' && deal.discount_value
      ? `${deal.discount_value}% Rabatt`
      : deal.deal_type === 'fixed_discount' && deal.discount_value
      ? `${deal.discount_value}€ Rabatt`
      : 'Gratis';

  const distance =
    deal.distance_m !== undefined
      ? deal.distance_m < 1000
        ? `${Math.round(deal.distance_m)} m`
        : `${(deal.distance_m / 1000).toFixed(1)} km`
      : null;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <View style={styles.header}>
        {business?.logo_url ? (
          <Image source={{ uri: business.logo_url }} style={styles.logo} resizeMode="contain" />
        ) : (
          <View style={[styles.logo, styles.logoPlaceholder]}>
            <Text style={styles.logoInitial}>{business?.name?.[0] ?? '?'}</Text>
          </View>
        )}
        <View style={styles.headerText}>
          <Text style={styles.businessName}>{business?.name ?? '–'}</Text>
          {distance && <Text style={styles.distance}>{distance} entfernt</Text>}
        </View>
        <View style={[styles.badge, { backgroundColor: badge.color }]}>
          <Text style={styles.badgeText}>{badge.label}</Text>
        </View>
      </View>

      <Text style={styles.title}>{deal.title}</Text>
      <Text style={styles.discount}>{discountText}</Text>

      <View style={styles.footer}>
        <Text style={styles.validity}>{VALIDITY_LABELS[deal.validity_type]}</Text>
        {deal.verified && (
          <View style={styles.verifiedBadge}>
            <Text style={styles.verifiedText}>Verifiziert</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  logo: {
    width: 44,
    height: 44,
    borderRadius: 10,
    marginRight: 10,
  },
  logoPlaceholder: {
    backgroundColor: '#6C63FF20',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoInitial: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6C63FF',
  },
  headerText: { flex: 1 },
  businessName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A1A2E',
  },
  distance: {
    fontSize: 12,
    color: '#888',
    marginTop: 1,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A2E',
    marginBottom: 4,
  },
  discount: {
    fontSize: 14,
    color: '#6C63FF',
    fontWeight: '600',
    marginBottom: 10,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  validity: {
    fontSize: 12,
    color: '#888',
  },
  verifiedBadge: {
    backgroundColor: '#2ECC7120',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  verifiedText: {
    fontSize: 11,
    color: '#27AE60',
    fontWeight: '600',
  },
});
