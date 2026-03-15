-- Mehrere Personen pro Nutzer verwalten
CREATE TABLE IF NOT EXISTS persons (
  id             uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id        uuid REFERENCES users(id) ON DELETE CASCADE,
  name           text NOT NULL,
  birthday_day   integer NOT NULL CHECK (birthday_day BETWEEN 1 AND 31),
  birthday_month integer NOT NULL CHECK (birthday_month BETWEEN 1 AND 12),
  birthday_year  integer,
  relation       text DEFAULT 'Sonstige', -- 'Ich', 'Partner', 'Kind', 'Freund', ...
  color          text DEFAULT '#6C63FF',
  emoji          text DEFAULT '🎂',
  created_at     timestamptz DEFAULT now()
);

ALTER TABLE persons ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Persons lesen"   ON persons FOR SELECT USING (true);
CREATE POLICY "Persons anlegen" ON persons FOR INSERT WITH CHECK (true);
CREATE POLICY "Persons updaten" ON persons FOR UPDATE USING (true);
CREATE POLICY "Persons löschen" ON persons FOR DELETE USING (true);

-- Spalte last_seen_deals_at für neue-Deals-Erkennung
ALTER TABLE users ADD COLUMN IF NOT EXISTS last_seen_deals_at timestamptz DEFAULT now();

-- Push Token Tabelle für Server-side Notifications
CREATE TABLE IF NOT EXISTS push_tokens (
  id         uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id    uuid REFERENCES users(id) ON DELETE CASCADE,
  token      text NOT NULL UNIQUE,
  platform   text CHECK (platform IN ('ios', 'android')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE push_tokens ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Tokens anlegen" ON push_tokens FOR INSERT WITH CHECK (true);
CREATE POLICY "Tokens löschen" ON push_tokens FOR DELETE USING (true);
