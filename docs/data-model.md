# Datenmodell – Birthday App

## Überblick

Die App arbeitet mit drei Kernentitäten:

| Entität   | Beschreibung                              |
|-----------|-------------------------------------------|
| `Person`  | Kontakt mit Geburtstag und Erinnerungen   |
| `Group`   | Kategorie (Familie, Freunde, Arbeit ...)  |
| `Settings`| App-weite Einstellungen des Nutzers       |

---

## Person

| Feld            | Typ            | Pflicht | Beschreibung                          |
|-----------------|----------------|---------|---------------------------------------|
| `id`            | string (UUID)  | ✅      | Eindeutige ID                         |
| `name`          | string         | ✅      | Vollständiger Name                    |
| `birthday.day`  | integer 1–31   | ✅      | Geburtstag                            |
| `birthday.month`| integer 1–12   | ✅      | Geburtsmonat                          |
| `birthday.year` | integer        | ❌      | Geburtsjahr (optional, für Alter)     |
| `photo`         | string         | ❌      | Pfad oder URL zum Profilbild          |
| `groups`        | string[]       | ❌      | Liste von Gruppen-IDs                 |
| `notes`         | string         | ❌      | Persönliche Notiz                     |
| `reminderDays`  | integer[]      | ❌      | Erinnerung X Tage vorher, z.B. [0,7] |
| `createdAt`     | ISO 8601       | ✅      | Erstellungsdatum                      |
| `updatedAt`     | ISO 8601       | ✅      | Letztes Update                        |

---

## Group

| Feld    | Typ    | Pflicht | Beschreibung              |
|---------|--------|---------|---------------------------|
| `id`    | string | ✅      | Eindeutige ID             |
| `name`  | string | ✅      | Gruppenname               |
| `color` | string | ❌      | Hex-Farbe z.B. `#FF5733` |
| `icon`  | string | ❌      | Emoji oder Icon-Name      |

---

## Settings

| Feld                   | Typ       | Default    | Beschreibung                     |
|------------------------|-----------|------------|----------------------------------|
| `defaultReminderDays`  | integer[] | [1, 7]     | Standard-Erinnerungstage         |
| `notificationsEnabled` | boolean   | true       | Push-Benachrichtigungen an/aus   |
| `language`             | string    | "de"       | Sprache der App                  |
| `theme`                | string    | "system"   | light / dark / system            |

---

## Beispiel-Flow

1. Nutzer fügt Person hinzu → `Person`-Objekt wird erstellt
2. Person wird einer Gruppe zugeordnet → `groups`-Array erhält Gruppen-ID
3. App berechnet täglich: Wer hat in X Tagen Geburtstag?
4. Push-Notification wird X Tage vorher gesendet (laut `reminderDays`)
