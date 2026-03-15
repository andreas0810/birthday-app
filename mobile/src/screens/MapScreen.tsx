import React, { useEffect, useState, useRef } from 'react';
import {
  View, Text, StyleSheet, ActivityIndicator,
  TouchableOpacity, Dimensions
} from 'react-native';
import MapView, { Marker, Callout, UrlTile, Region } from 'react-native-maps';
import * as Location from 'expo-location';
import { fetchNearbyDeals, fetchAllDeals } from '../lib/deals';

const DEAL_COLORS: Record<string, string> = {
  free_item:        '#2ECC71',
  free_entry:       '#2ECC71',
  free_service:     '#2ECC71',
  percent_discount: '#E74C3C',
  fixed_discount:   '#E74C3C',
};

const DEFAULT_REGION: Region = {
  latitude: 51.1657,
  longitude: 10.4515,
  latitudeDelta: 8,
  longitudeDelta: 8,
};

export default function MapScreen({ navigation }: any) {
  const [locations, setLocations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<any | null>(null);
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status === 'granted') {
          const loc = await Location.getCurrentPositionAsync({});
          const lat = loc.coords.latitude;
          const lng = loc.coords.longitude;

          mapRef.current?.animateToRegion({
            latitude: lat, longitude: lng,
            latitudeDelta: 0.3, longitudeDelta: 0.3,
          }, 800);

          // Echte Deals im Umkreis 50km laden
          const nearby = await fetchNearbyDeals(lat, lng, 50000);
          setLocations(nearby);
        } else {
          // Kein Standort → alle Deals laden ohne Distanzfilter
          const all = await fetchAllDeals();
          // Für deals ohne Standort einfach leere Map zeigen
          setLocations([]);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={DEFAULT_REGION}
        showsUserLocation
        showsMyLocationButton
        mapType="none"
      >
        {/* OpenStreetMap Tiles */}
        <UrlTile
          urlTemplate="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          maximumZ={19}
          flipY={false}
          tileSize={256}
        />
        {locations.map((item, i) => (
          <Marker
            key={`${item.deal_id}-${item.location_id}-${i}`}
            coordinate={{ latitude: item.lat, longitude: item.lng }}
            pinColor={DEAL_COLORS[item.deal_type] ?? '#6C63FF'}
            onPress={() => setSelected(item)}
          >
            <Callout onPress={() => navigation.navigate('DealDetail', {
              deal: {
                id: item.deal_id,
                title: item.title,
                description: item.description,
                deal_type: item.deal_type,
                discount_value: item.discount_value,
                discount_unit: item.discount_unit,
                validity_type: item.validity_type,
                proof_required: item.proof_required,
                redemption_url: item.redemption_url,
                coupon_code: item.coupon_code,
                terms: item.terms,
                verified: item.verified,
                applies_to_all_locations: true,
                active: true,
                business_id: item.business_id,
                businesses: {
                  id: item.business_id,
                  name: item.business_name,
                  logo_url: item.logo_url,
                },
              }
            })}>
              <View style={styles.callout}>
                <Text style={styles.calloutBusiness}>{item.business_name}</Text>
                <Text style={styles.calloutTitle} numberOfLines={2}>{item.title}</Text>
                {item.distance_m && (
                  <Text style={styles.calloutDistance}>
                    {item.distance_m < 1000
                      ? `${Math.round(item.distance_m)} m entfernt`
                      : `${(item.distance_m / 1000).toFixed(1)} km entfernt`}
                  </Text>
                )}
                <Text style={styles.calloutMore}>Details →</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator color="#6C63FF" size="large" />
          <Text style={styles.loadingText}>Deals in deiner Nähe suchen…</Text>
        </View>
      )}

      {/* Info-Badge oben */}
      {!loading && locations.length > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>🎁 {locations.length} Deals in der Nähe</Text>
        </View>
      )}

      {/* Bottom Sheet */}
      {selected && (
        <View style={styles.bottomCard}>
          <View style={styles.bottomHandle} />
          <Text style={styles.bottomBusiness}>{selected.business_name}</Text>
          <Text style={styles.bottomTitle}>{selected.title}</Text>
          {selected.city && (
            <Text style={styles.bottomCity}>📍 {selected.city}</Text>
          )}
          <TouchableOpacity
            style={styles.bottomBtn}
            onPress={() => {
              navigation.navigate('DealDetail', {
                deal: {
                  id: selected.deal_id,
                  title: selected.title,
                  description: selected.description,
                  deal_type: selected.deal_type,
                  discount_value: selected.discount_value,
                  discount_unit: selected.discount_unit,
                  validity_type: selected.validity_type,
                  proof_required: selected.proof_required,
                  redemption_url: selected.redemption_url,
                  coupon_code: selected.coupon_code,
                  terms: selected.terms,
                  verified: selected.verified,
                  applies_to_all_locations: true,
                  active: true,
                  business_id: selected.business_id,
                  businesses: {
                    id: selected.business_id,
                    name: selected.business_name,
                    logo_url: selected.logo_url,
                  },
                }
              });
              setSelected(null);
            }}
          >
            <Text style={styles.bottomBtnText}>Deal ansehen 🎉</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSelected(null)} style={styles.closeBtn}>
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
    backgroundColor: '#ffffffCC',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  loadingText: { fontSize: 15, color: '#555' },
  badge: {
    position: 'absolute', top: 56, alignSelf: 'center',
    backgroundColor: '#1A1A2E', paddingHorizontal: 16, paddingVertical: 8,
    borderRadius: 20,
  },
  badgeText: { color: '#fff', fontSize: 13, fontWeight: '700' },
  callout: { width: 220, padding: 10 },
  calloutBusiness: { fontSize: 13, fontWeight: '800', color: '#1A1A2E', marginBottom: 2 },
  calloutTitle: { fontSize: 12, color: '#444', marginBottom: 4 },
  calloutDistance: { fontSize: 11, color: '#888', marginBottom: 4 },
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
  bottomBusiness: { fontSize: 13, color: '#888', fontWeight: '600', marginBottom: 4 },
  bottomTitle: { fontSize: 18, fontWeight: '800', color: '#1A1A2E', marginBottom: 6 },
  bottomCity: { fontSize: 13, color: '#888', marginBottom: 16 },
  bottomBtn: {
    backgroundColor: '#6C63FF', borderRadius: 14,
    paddingVertical: 14, alignItems: 'center',
  },
  bottomBtnText: { color: '#fff', fontSize: 15, fontWeight: '700' },
  closeBtn: { position: 'absolute', top: 16, right: 20, padding: 8 },
  closeBtnText: { fontSize: 18, color: '#888' },
});
