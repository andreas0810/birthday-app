-- Birthday Deals App – Initial Schema
-- Supabase Project: dnhjtoxfttnzwahbrdgb (eu-central-1)

-- Extensions
CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─────────────────────────────────────────
-- TABLES
-- ─────────────────────────────────────────

CREATE TABLE IF NOT EXISTS categories (
  id    uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name  text NOT NULL,
  icon  text,
  color text
);

CREATE TABLE IF NOT EXISTS users (
  id                    uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  birthday_day          integer NOT NULL CHECK (birthday_day BETWEEN 1 AND 31),
  birthday_month        integer NOT NULL CHECK (birthday_month BETWEEN 1 AND 12),
  display_name          text,
  location_lat          float,
  location_lng          float,
  city                  text,
  push_token            text,
  notifications_enabled boolean DEFAULT true,
  created_at            timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS businesses (
  id          uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name        text NOT NULL,
  category_id uuid REFERENCES categories(id),
  logo_url    text,
  website     text,
  is_chain    boolean DEFAULT false,
  verified    boolean DEFAULT false,
  created_at  timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS locations (
  id          uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id uuid REFERENCES businesses(id) ON DELETE CASCADE,
  name        text,
  address     text,
  city        text,
  country     text DEFAULT 'DE',
  lat         float NOT NULL,
  lng         float NOT NULL,
  geog        geography(Point, 4326),  -- automatisch per Trigger gesetzt
  phone       text,
  opening_hours jsonb,
  active      boolean DEFAULT true
);

CREATE TABLE IF NOT EXISTS deals (
  id                      uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id             uuid REFERENCES businesses(id) ON DELETE CASCADE,
  title                   text NOT NULL,
  description             text,
  deal_type               text NOT NULL CHECK (deal_type IN ('free_item','percent_discount','fixed_discount','free_service','free_entry')),
  discount_value          float,
  discount_unit           text CHECK (discount_unit IN ('percent','euro')),
  validity_type           text DEFAULT 'birthday_only' CHECK (validity_type IN ('birthday_only','birthday_week','birthday_month')),
  proof_required          text DEFAULT 'id_card' CHECK (proof_required IN ('id_card','app_screenshot','loyalty_card','none')),
  redemption_url          text,
  coupon_code             text,
  image_url               text,
  terms                   text,
  applies_to_all_locations boolean DEFAULT true,
  active                  boolean DEFAULT true,
  verified                boolean DEFAULT false,
  source_url              text,
  created_at              timestamptz DEFAULT now(),
  updated_at              timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS deal_locations (
  deal_id     uuid REFERENCES deals(id) ON DELETE CASCADE,
  location_id uuid REFERENCES locations(id) ON DELETE CASCADE,
  PRIMARY KEY (deal_id, location_id)
);

CREATE TABLE IF NOT EXISTS user_saved_deals (
  user_id  uuid REFERENCES users(id) ON DELETE CASCADE,
  deal_id  uuid REFERENCES deals(id) ON DELETE CASCADE,
  saved_at timestamptz DEFAULT now(),
  PRIMARY KEY (user_id, deal_id)
);

CREATE TABLE IF NOT EXISTS deal_reports (
  id           uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  deal_id      uuid REFERENCES deals(id) ON DELETE SET NULL,
  report_type  text CHECK (report_type IN ('expired','new_deal','wrong_info')),
  message      text,
  business_name text,
  submitted_at timestamptz DEFAULT now()
);

-- ─────────────────────────────────────────
-- TRIGGER: geography-Feld automatisch setzen
-- ─────────────────────────────────────────

CREATE OR REPLACE FUNCTION update_location_geog()
RETURNS trigger AS $$
BEGIN
  NEW.geog = ST_MakePoint(NEW.lng, NEW.lat)::geography;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_location_geog ON locations;
CREATE TRIGGER set_location_geog
  BEFORE INSERT OR UPDATE ON locations
  FOR EACH ROW EXECUTE FUNCTION update_location_geog();

-- ─────────────────────────────────────────
-- INDEXES
-- ─────────────────────────────────────────

CREATE INDEX IF NOT EXISTS locations_geog_idx ON locations USING GIST(geog);
CREATE INDEX IF NOT EXISTS deals_active_idx   ON deals(active, verified);
CREATE INDEX IF NOT EXISTS deals_business_idx ON deals(business_id);

-- ─────────────────────────────────────────
-- SEED: Kategorien
-- ─────────────────────────────────────────

INSERT INTO categories (name, icon, color) VALUES
  ('Essen & Trinken',    '🍔', '#E74C3C'),
  ('Café & Bäckerei',    '☕', '#795548'),
  ('Eiscreme & Desserts','🍦', '#F06292'),
  ('Shopping & Mode',    '🛍️', '#9C27B0'),
  ('Beauty & Wellness',  '💅', '#E91E63'),
  ('Sport & Fitness',    '🏋️', '#4CAF50'),
  ('Kino & Freizeit',   '🎬', '#FF9800'),
  ('Bowling & Gaming',   '🎳', '#3F51B5'),
  ('Hotels & Reisen',    '🏨', '#00BCD4'),
  ('Bücher & Musik',     '📚', '#8BC34A')
ON CONFLICT DO NOTHING;
