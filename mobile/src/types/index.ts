export type DealType = 'free_item' | 'percent_discount' | 'fixed_discount' | 'free_service' | 'free_entry';
export type ValidityType = 'birthday_only' | 'birthday_week' | 'birthday_month';
export type ProofRequired = 'id_card' | 'app_screenshot' | 'loyalty_card' | 'none';

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface Business {
  id: string;
  name: string;
  category_id: string;
  logo_url?: string;
  website?: string;
  is_chain: boolean;
  verified: boolean;
}

export interface Location {
  id: string;
  business_id: string;
  name?: string;
  address?: string;
  city?: string;
  lat: number;
  lng: number;
  active: boolean;
}

export interface Deal {
  id: string;
  business_id: string;
  title: string;
  description?: string;
  deal_type: DealType;
  discount_value?: number;
  discount_unit?: 'percent' | 'euro';
  validity_type: ValidityType;
  proof_required: ProofRequired;
  redemption_url?: string;
  coupon_code?: string;
  image_url?: string;
  terms?: string;
  applies_to_all_locations: boolean;
  active: boolean;
  verified: boolean;
  // Joined fields
  businesses?: Business;
  distance_m?: number;
}

export interface UserProfile {
  id: string;
  birthday_day: number;
  birthday_month: number;
  display_name?: string;
  city?: string;
  notifications_enabled: boolean;
}
