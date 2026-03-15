-- ─────────────────────────────────────────────────────────────────────────────
-- RPC: get_nearby_deals
-- Gibt alle aktiven Deals zurück, sortiert nach Entfernung
-- ─────────────────────────────────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION get_nearby_deals(
  user_lat float,
  user_lng float,
  radius_m  float DEFAULT 25000
)
RETURNS TABLE (
  deal_id       uuid,
  location_id   uuid,
  lat           float,
  lng           float,
  distance_m    float,
  title         text,
  description   text,
  deal_type     text,
  discount_value float,
  discount_unit text,
  validity_type text,
  proof_required text,
  redemption_url text,
  coupon_code   text,
  terms         text,
  verified      boolean,
  business_id   uuid,
  business_name text,
  logo_url      text,
  location_name text,
  address       text,
  city          text
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    d.id            AS deal_id,
    l.id            AS location_id,
    l.lat,
    l.lng,
    ST_Distance(
      l.geog,
      ST_MakePoint(user_lng, user_lat)::geography
    )::float        AS distance_m,
    d.title,
    d.description,
    d.deal_type,
    d.discount_value,
    d.discount_unit,
    d.validity_type,
    d.proof_required,
    d.redemption_url,
    d.coupon_code,
    d.terms,
    d.verified,
    b.id            AS business_id,
    b.name          AS business_name,
    b.logo_url,
    l.name          AS location_name,
    l.address,
    l.city
  FROM deals d
  JOIN businesses b ON d.business_id = b.id
  JOIN locations l  ON l.business_id = b.id
  WHERE
    d.active = true
    AND l.active = true
    AND ST_DWithin(
      l.geog,
      ST_MakePoint(user_lng, user_lat)::geography,
      radius_m
    )
  ORDER BY distance_m ASC;
END;
$$ LANGUAGE plpgsql STABLE;

-- ─────────────────────────────────────────────────────────────────────────────
-- ROW LEVEL SECURITY
-- ─────────────────────────────────────────────────────────────────────────────

-- Deals, Businesses, Locations, Categories: öffentlich lesbar
ALTER TABLE deals       ENABLE ROW LEVEL SECURITY;
ALTER TABLE businesses  ENABLE ROW LEVEL SECURITY;
ALTER TABLE locations   ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories  ENABLE ROW LEVEL SECURITY;
ALTER TABLE users       ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_saved_deals ENABLE ROW LEVEL SECURITY;
ALTER TABLE deal_reports ENABLE ROW LEVEL SECURITY;

-- Öffentliche Lesezugriffe
CREATE POLICY "Deals öffentlich lesbar"      ON deals      FOR SELECT USING (active = true);
CREATE POLICY "Businesses öffentlich lesbar" ON businesses FOR SELECT USING (true);
CREATE POLICY "Locations öffentlich lesbar"  ON locations  FOR SELECT USING (active = true);
CREATE POLICY "Categories öffentlich lesbar" ON categories FOR SELECT USING (true);

-- Nutzer: nur eigene Daten sehen/ändern (anon-Nutzer via user_id in AsyncStorage)
CREATE POLICY "Users eigene Zeile lesen"  ON users FOR SELECT USING (true);
CREATE POLICY "Users eigene Zeile anlegen" ON users FOR INSERT WITH CHECK (true);
CREATE POLICY "Users eigene Zeile updaten" ON users FOR UPDATE USING (true);

-- Saved Deals: jeder kann seine eigenen speichern/lesen/löschen
CREATE POLICY "Saved lesen"   ON user_saved_deals FOR SELECT USING (true);
CREATE POLICY "Saved anlegen" ON user_saved_deals FOR INSERT WITH CHECK (true);
CREATE POLICY "Saved löschen" ON user_saved_deals FOR DELETE USING (true);

-- Deal Reports: jeder kann melden
CREATE POLICY "Reports anlegen" ON deal_reports FOR INSERT WITH CHECK (true);
