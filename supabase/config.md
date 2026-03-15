# Supabase Konfiguration

## Projekt

| Feld | Wert |
|---|---|
| Projekt-Name | birthday-app |
| Projekt-ID / Ref | dnhjtoxfttnzwahbrdgb |
| Region | eu-central-1 (Frankfurt) |
| Dashboard | https://supabase.com/dashboard/project/dnhjtoxfttnzwahbrdgb |
| API URL | https://dnhjtoxfttnzwahbrdgb.supabase.co |

## Extensions aktiviert

- `postgis` — Geo-Queries (Umkreissuche)
- `uuid-ossp` — UUID-Generierung

## Tabellen

| Tabelle | Beschreibung |
|---|---|
| `categories` | Deal-Kategorien (10 vorausgefüllt) |
| `users` | App-Nutzer mit Geburtstag & Standort |
| `businesses` | Unternehmen / Marken |
| `locations` | Einzelne Filialen mit GPS-Koordinaten |
| `deals` | Geburtstags-Angebote |
| `deal_locations` | Deal ↔ Filiale (wenn nicht kettenübergreifend) |
| `user_saved_deals` | Favoriten der Nutzer |
| `deal_reports` | Community-Meldungen |

## Geo-Index

`locations.geog` wird automatisch per Trigger aus `lat`/`lng` befüllt.
GIST-Index auf `geog` für schnelle Umkreissuche.

## Nächste Schritte

1. API Keys aus dem Dashboard holen (Settings → API)
2. Row Level Security (RLS) einrichten
3. Sample-Deals einspielen
4. Expo App mit Supabase verbinden
