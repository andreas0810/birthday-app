import React, { useEffect, useState, useCallback } from 'react';
import {
  View, Text, StyleSheet, FlatList,
  SafeAreaView, ActivityIndicator, RefreshControl,
  ScrollView, TouchableOpacity
} from 'react-native';
import * as Location from 'expo-location';
import { fetchAllDeals } from '../lib/deals';
import DealCard from '../components/DealCard';
import { Deal } from '../types';

const CATEGORIES = [
  { id: 'all', label: 'Alle', icon: '✨' },
  { id: 'free', label: 'Gratis', icon: '🎁' },
  { id: 'food', label: 'Essen', icon: '🍔' },
  { id: 'cafe', label: 'Café', icon: '☕' },
  { id: 'beauty', label: 'Beauty', icon: '💅' },
  { id: 'cinema', label: 'Kino', icon: '🎬' },
];

const FREE_TYPES = ['free_item', 'free_entry', 'free_service'];

export default function ListScreen({ navigation }: any) {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState('all');

  const load = useCallback(async () => {
    try {
      const data = await fetchAllDeals();
      setDeals(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const filtered = deals.filter(d => {
    if (filter === 'all') return true;
    if (filter === 'free') return FREE_TYPES.includes(d.deal_type);
    return true;
  });

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#6C63FF" />
        <Text style={styles.loadingText}>Deals werden geladen…</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerBar}>
        <Text style={styles.headerTitle}>Deine Geburtstags-Deals 🎂</Text>
        <Text style={styles.headerSub}>{filtered.length} Angebote verfügbar</Text>
      </View>

      {/* Kategorie-Filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterRow}
        contentContainerStyle={styles.filterContent}
      >
        {CATEGORIES.map(cat => (
          <TouchableOpacity
            key={cat.id}
            style={[styles.filterChip, filter === cat.id && styles.filterChipActive]}
            onPress={() => setFilter(cat.id)}
          >
            <Text style={styles.filterIcon}>{cat.icon}</Text>
            <Text style={[styles.filterLabel, filter === cat.id && styles.filterLabelActive]}>
              {cat.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <DealCard
            deal={item}
            onPress={() => navigation.navigate('DealDetail', { deal: item })}
          />
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); load(); }} tintColor="#6C63FF" />}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.center}>
            <Text style={styles.emptyIcon}>🎉</Text>
            <Text style={styles.emptyText}>Noch keine Deals in deiner Nähe.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32 },
  loadingText: { marginTop: 12, color: '#888', fontSize: 14 },
  headerBar: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 8 },
  headerTitle: { fontSize: 22, fontWeight: '800', color: '#1A1A2E' },
  headerSub: { fontSize: 13, color: '#888', marginTop: 2 },
  filterRow: { maxHeight: 56 },
  filterContent: { paddingHorizontal: 16, paddingVertical: 8, gap: 8 },
  filterChip: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20,
    backgroundColor: '#fff', borderWidth: 1.5, borderColor: '#E0E0E0',
  },
  filterChipActive: { backgroundColor: '#6C63FF', borderColor: '#6C63FF' },
  filterIcon: { fontSize: 14 },
  filterLabel: { fontSize: 13, fontWeight: '600', color: '#444' },
  filterLabelActive: { color: '#fff' },
  list: { paddingTop: 8, paddingBottom: 32 },
  emptyIcon: { fontSize: 48, marginBottom: 12 },
  emptyText: { fontSize: 15, color: '#888', textAlign: 'center' },
});
