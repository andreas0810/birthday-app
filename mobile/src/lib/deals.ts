import { supabase } from './supabase';
import { Deal } from '../types';

export async function fetchNearbyDeals(
  lat: number,
  lng: number,
  radiusMeters: number = 10000
): Promise<Deal[]> {
  const { data, error } = await supabase.rpc('get_nearby_deals', {
    user_lat: lat,
    user_lng: lng,
    radius_m: radiusMeters,
  });

  if (error) throw error;
  return data ?? [];
}

export async function fetchAllDeals(): Promise<Deal[]> {
  const { data, error } = await supabase
    .from('deals')
    .select(`*, businesses(name, logo_url, is_chain, verified)`)
    .eq('active', true)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data ?? [];
}

export async function saveDeal(userId: string, dealId: string): Promise<void> {
  const { error } = await supabase
    .from('user_saved_deals')
    .insert({ user_id: userId, deal_id: dealId });
  if (error) throw error;
}

export async function unsaveDeal(userId: string, dealId: string): Promise<void> {
  const { error } = await supabase
    .from('user_saved_deals')
    .delete()
    .eq('user_id', userId)
    .eq('deal_id', dealId);
  if (error) throw error;
}

export async function fetchSavedDeals(userId: string): Promise<Deal[]> {
  const { data, error } = await supabase
    .from('user_saved_deals')
    .select(`deal_id, deals(*, businesses(name, logo_url))`)
    .eq('user_id', userId);

  if (error) throw error;
  return (data ?? []).map((row: any) => row.deals).filter(Boolean);
}
