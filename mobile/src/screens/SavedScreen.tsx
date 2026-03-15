import React, { useEffect, useState, useCallback } from 'react';
import {
  View, Text, StyleSheet, FlatList,
  SafeAreaView, ActivityIndicator, RefreshControl
} from 'react-native';
import { fetchSavedDeals } from '../lib/deals';
import { getUserId } from '../lib/users';
import DealCard from '../components/DealCard';
import { Deal } from '../types';

export default function SavedScreen({ navigation }: any) {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async () => {
    try {
      const userId = await getUserId();
      if (userId) {
        const data = await fetchSavedDeals(userId);
        setDeals(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#6C63FF" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerBar}>
        <Text style={styles.headerTitle}>Gespeicherte Deals ❤️</Text>
        <Text style={styles.headerSub}>
          {deals.length > 0 ? `${deals.length} Deals gespeichert` : 'Noch keine gespeichert'}
        </Text>
      </View>

      <FlatList
        data={deals}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <DealCard
            deal={item}
            onPress={() => navigation.navigate('DealDetail', { deal: item })}
          />
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => { setRefreshing(true); load(); }}
            tintColor="#6C63FF"
          />
        }
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.center}>
            <Text style={styles.emptyIcon}>❤️</Text>
            <Text style={styles.emptyTitle}>Noch nichts gespeichert</Text>
            <Text style={styles.emptySub}>
              Tippe in einem Deal auf „Speichern", um ihn hier wiederzufinden.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32 },
  headerBar: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 8 },
  headerTitle: { fontSize: 22, fontWeight: '800', color: '#1A1A2E' },
  headerSub: { fontSize: 13, color: '#888', marginTop: 2 },
  list: { paddingTop: 8, paddingBottom: 32 },
  emptyIcon: { fontSize: 56, marginBottom: 16 },
  emptyTitle: { fontSize: 18, fontWeight: '700', color: '#1A1A2E', marginBottom: 8 },
  emptySub: { fontSize: 14, color: '#888', textAlign: 'center', lineHeight: 21 },
});
