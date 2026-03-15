import React, { useEffect, useState, useRef } from 'react';
import {
  View, Text, StyleSheet, ActivityIndicator,
  TouchableOpacity, ScrollView, Dimensions
} from 'react-native';
import MapView, { Marker, Callout, Region } from 'react-native-maps';
import * as Location from 'expo-location';
import { fetchAllDeals } from '../lib/deals';
import { Deal } from '../types';

const { width } = Dimensions.get('window');

const DEAL_COLORS: Record<string, string> = {
  free_item:        '#2ECC71',
  free_entry:       '#2ECC71',
  free_service:     '#2ECC71',
  percent_discount: '#E74C3C',
  fixed_discount:   '#E74C3C',
};

// Fallback-Koordinaten: München Zentrum
const DEFAULT_REGION: Region = {
  latitude: 48.1374,
  longitude: 11.5755,
  latitudeDelta: 0.1,
  longitudeDelta: 0.1,
};

export default function MapScreen({ navigation }: any) {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const loc = await Location.getCurrentPositionAsync({});
        setUserLocation({ lat: loc.coords.latitude, lng: loc.coords.longitude });
        mapRef.current?.animateToRegion({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        });
      }

      try {
        const data = await fetchAllDeals();
        setDeals(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Deals mit Koordinaten (über businesses/locations – vereinfacht mit Mock-Koordinaten für Demo)
  const dealsWithCoords = deals.slice(0, 20);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={DEFAULT_REGION}
        showsUserLocation
        showsMyLocationButton
      >
        {dealsWithCoords.map((deal, i) => {
          // Demo-Koordinaten um Nutzerstandort / München verteilt
          const base = userLocation ?? { lat: 48.1374, lng: 11.5755 };
          const lat = base.lat + (Math.sin(i * 1.2) * 0.04);
          const lng = base.lng + (Math.cos(i * 1.1) * 0.05);
          const color = DEAL_COLORS[deal.deal_type] ?? '#6C63FF';

          return (
            <Marker
              key={deal.id}
              coordinate={{ latitude: lat, longitude: lng }}
              pinColor={color}
              onPress={() => setSelectedDeal(deal)}
            >
              <Callout onPress={() => navigation.navigate('DealDetail', { deal })}>
                <View style={styles.callout}>
                  <Text style={styles.calloutBusiness}>{deal.businesses?.name}</Text>
                  <Text style={styles.calloutTitle}>{deal.title}</Text>
                  <Text style={styles.calloutMore}>Mehr anzeigen →</Text>
                </View>
              </Callout>
            </Marker>
          );
        })}
      </MapView>

      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator color="#6C63FF" size="large" />
        </View>
      )}

      {/* Bottom Sheet – ausgewählter Deal */}
      {selectedDeal && (
        <View style={styles.bottomCard}>
          <View style={styles.bottomHandle} />
          <Text style={styles.bottomBusiness}>{selectedDeal.businesses?.name}</Text>
          <Text style={styles.bottomTitle}>{selectedDeal.title}</Text>
          <TouchableOpacity
            style={styles.bottomBtn}
            onPress={() => navigation.navigate('DealDetail', { deal: selectedDeal })}
          >
            <Text style={styles.bottomBtnText}>Deal ansehen</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSelectedDeal(null)} style={styles.closeBtn}>
            <Text style={styles.closeBtnText}>✕</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#fff8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  callout: { width: 200, padding: 8 },
  calloutBusiness: { fontSize: 13, fontWeight: '700', color: '#1A1A2E', marginBottom: 2 },
  calloutTitle: { fontSize: 12, color: '#444', marginBottom: 4 },
  calloutMore: { fontSize: 12, color: '#6C63FF', fontWeight: '600' },
  bottomCard: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24,
    padding: 24, paddingBottom: 40,
    shadowColor: '#000', shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.12, shadowRadius: 16, elevation: 12,
  },
  bottomHandle: {
    width: 40, height: 4, backgroundColor: '#E0E0E0',
    borderRadius: 2, alignSelf: 'center', marginBottom: 16,
  },
  bottomBusiness: { fontSize: 13, color: '#888', marginBottom: 4, fontWeight: '600' },
  bottomTitle: { fontSize: 18, fontWeight: '800', color: '#1A1A2E', marginBottom: 16 },
  bottomBtn: {
    backgroundColor: '#6C63FF', borderRadius: 14,
    paddingVertical: 14, alignItems: 'center',
  },
  bottomBtnText: { color: '#fff', fontSize: 15, fontWeight: '700' },
  closeBtn: { position: 'absolute', top: 16, right: 20, padding: 8 },
  closeBtnText: { fontSize: 18, color: '#888' },
});
