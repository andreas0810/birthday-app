# 🎂 Birthday Deals App

Eine iOS & Android App, die zeigt: **Was bekomme ich an meinem Geburtstag gratis oder vergünstigt — in meiner Nähe?**

## Konzept

Nutzer hinterlegen ihren Geburtstag einmalig. Die App zeigt dann:
- Alle verfügbaren Gratis-Angebote und Rabatte an ihrem Geburtstag
- Gefiltert nach Standort / Umkreis
- Als **Kartenansicht** (Map) und **Listenansicht** (Cards)
- Mit direkt einlösbarem Coupon / QR-Code

## Features (Ziel)

### Nutzer-Seite
- [ ] Onboarding: Geburtstagsangabe + Standortfreigabe
- [ ] Übersichtsseite: Alle Deals in meiner Nähe (Kartenansicht + Liste)
- [ ] Deal-Detailseite: Angebot, Einlösebedingungen, Karte zum Hinzeigen
- [ ] Favoriten speichern
- [ ] Push-Notification am Geburtstag

### Admin/Daten-Seite
- [ ] Datenbank aller Geburtstags-Deals (Restaurants, Shops, Beauty, ...)
- [ ] Deals nach Kategorie, Stadt, Umkreis filterbar
- [ ] Verifizierte und Community-gemeldete Deals

## Tech Stack

| Bereich     | Technologie                          |
|-------------|--------------------------------------|
| App         | **Expo / React Native** (iOS + Android) |
| Karte       | React Native Maps (Google Maps)      |
| Backend/DB  | **Supabase** (PostgreSQL + PostGIS für Geo-Queries) |
| Auth        | Supabase Auth                        |
| Push        | Expo Notifications                   |
| Hosting     | Supabase (kostenlos bis zu einem Limit) |

## Projektstruktur

```
birthday-app/
├── app/                   # Expo/React Native App (kommt später)
├── data/
│   ├── schema.json        # Vollständiges Datenbankschema
│   ├── sample-deals.json  # Beispiel-Deals für die DB
│   └── categories.json    # Deal-Kategorien
├── docs/
│   ├── data-model.md      # Datenmodell-Beschreibung
│   ├── architecture.md    # Systemarchitektur
│   └── ui-concept.md      # UI/UX Konzept
└── README.md
```

## Datenquellen (geplant)

- Manuell gepflegte Datenbank bekannter Ketten (McDonald's, Starbucks, etc.)
- Community-Beiträge (User melden neue Deals)
- Später: automatisches Scraping / Partnerprogramm

## Nächste Schritte

1. Datenmodell finalisieren
2. Supabase-Projekt anlegen
3. Expo App Grundgerüst
4. UI Design (Cards + Map)
