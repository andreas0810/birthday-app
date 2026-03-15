# Systemarchitektur – Birthday Deals App

## Überblick

```
┌─────────────────────────────────────────┐
│           Expo App (iOS + Android)       │
│                                         │
│  ┌──────────┐  ┌──────────┐  ┌───────┐ │
│  │ Map View │  │ List View│  │ Detail│ │
│  │ (Karte)  │  │ (Cards)  │  │  View │ │
│  └──────────┘  └──────────┘  └───────┘ │
│                                         │
│  GPS / Standort   Push Notifications    │
└────────────────┬────────────────────────┘
                 │ HTTPS / REST API
┌────────────────▼────────────────────────┐
│           Supabase Backend               │
│                                         │
│  PostgreSQL + PostGIS (Geo-Queries)     │
│  Supabase Auth (anonyme User)           │
│  Row Level Security (RLS)               │
│  Edge Functions (optional)              │
└─────────────────────────────────────────┘
```

## Datenfluss

1. **Onboarding**: Nutzer gibt Geburtstag ein, App fragt Standort ab
2. **Startseite**: App sendet GPS + Geburtstag an Supabase
3. **Query**: PostGIS-Umkreissuche liefert alle aktiven Deals in X km
4. **Anzeige**: Cards (Liste) + Pins auf Karte
5. **Detail**: Nutzer öffnet Deal → sieht Coupon/QR oder wird zu Partner-App weitergeleitet
6. **Geburtstag**: Push-Notification am Morgen des Geburtstags

## Komponenten

### Frontend (Expo)
- `app/index.tsx` — Onboarding
- `app/(tabs)/map.tsx` — Kartenansicht mit Deal-Pins
- `app/(tabs)/list.tsx` — Kartenansicht als scrollbare Cards
- `app/deal/[id].tsx` — Deal-Detailseite
- `app/(tabs)/saved.tsx` — Gespeicherte Deals
- `components/DealCard.tsx` — Wiederverwendbare Card-Komponente
- `lib/supabase.ts` — Supabase Client

### Backend (Supabase)
- Tabellen: users, businesses, locations, deals, categories, user_saved_deals, deal_reports
- PostGIS Extension für Geo-Queries
- RLS: Nutzer sehen nur aktive, verifizierte Deals
- Edge Function: Push-Notifications am Geburtstag (täglich per Cron)

## Umkreis-Einstellungen (Standard)

| Setting | Wert |
|---|---|
| Standard-Umkreis | 10 km |
| Maximaler Umkreis | 50 km |
| Sortierung | Entfernung aufsteigend |
