# Datenmodell – Birthday Deals App

## Konzept

Die App zeigt Nutzern, welche **Gratis-Angebote und Rabatte** an ihrem Geburtstag in ihrer Nähe verfügbar sind.

---

## Entitäten

```
users ──────────── user_saved_deals ──── deals
                                          │
businesses ──────────────────────────────┤
     │                                    │
locations ──── deal_locations ────────────┘
     │
categories
```

---

## Tabellen

### `users`
| Feld | Typ | Beschreibung |
|---|---|---|
| id | uuid | Primärschlüssel |
| birthday_day | int | Tag (1–31) |
| birthday_month | int | Monat (1–12) |
| location_lat/lng | float | Letzter Standort |
| city | string | Ort |
| push_token | string | Expo Push Token für Notifications |

### `businesses`
| Feld | Typ | Beschreibung |
|---|---|---|
| id | uuid | Primärschlüssel |
| name | string | Firmenname |
| category_id | uuid | → categories |
| is_chain | bool | Filialkette? |
| verified | bool | Von uns geprüft? |

### `locations`
| Feld | Typ | Beschreibung |
|---|---|---|
| id | uuid | Primärschlüssel |
| business_id | uuid | → businesses |
| lat / lng | float | GPS-Koordinaten (für Umkreissuche) |
| address / city | string | Adresse |

### `deals`
| Feld | Typ | Beschreibung |
|---|---|---|
| id | uuid | Primärschlüssel |
| business_id | uuid | → businesses |
| title | string | z.B. "Gratis Getränk" |
| deal_type | enum | free_item / percent_discount / fixed_discount / free_service / free_entry |
| discount_value | float | z.B. 20 (für 20%) |
| validity_type | enum | birthday_only / birthday_week / birthday_month |
| proof_required | enum | id_card / app_screenshot / loyalty_card / none |
| applies_to_all_locations | bool | Gilt für alle Filialen der Kette? |
| verified | bool | Deal bestätigt? |

### `categories`
Vordefiniert: Essen, Café, Shopping, Beauty, Sport, Kino, etc.

### `user_saved_deals`
M:N-Verknüpfung — Nutzer speichert / favorisiert Deals.

### `deal_reports`
Community meldet: Deal abgelaufen, neuer Deal, falsche Info.

---

## Geo-Abfrage (Umkreissuche)

Supabase nutzt **PostGIS**. Abfrage aller Deals im Umkreis:

```sql
SELECT d.*, b.name, b.logo_url, l.address, l.city,
  ST_Distance(
    ST_MakePoint(l.lng, l.lat)::geography,
    ST_MakePoint(:user_lng, :user_lat)::geography
  ) AS distance_m
FROM deals d
JOIN businesses b ON d.business_id = b.id
JOIN locations l ON l.business_id = b.id
WHERE d.active = true
  AND ST_DWithin(
    ST_MakePoint(l.lng, l.lat)::geography,
    ST_MakePoint(:user_lng, :user_lat)::geography,
    :radius_meters
  )
ORDER BY distance_m ASC;
```

---

## Deal-Typen im Überblick

| Typ | Beispiel |
|---|---|
| `free_item` | Gratis Kaffee, Gratis Sub |
| `free_entry` | Gratis Kinoticket |
| `free_service` | Gratis Haarschnitt |
| `percent_discount` | 20% auf alles |
| `fixed_discount` | 5€ Rabatt |

## Gültigkeitszeitraum

| Wert | Bedeutung |
|---|---|
| `birthday_only` | Nur am genauen Geburtstag |
| `birthday_week` | 3 Tage vorher bis 3 Tage nachher |
| `birthday_month` | Gesamter Geburtstagsmonat |
