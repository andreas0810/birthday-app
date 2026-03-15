# Birthday App

Eine App zum Verwalten von Geburtstagen – für iOS und Android.

## Ziel

Geburtstage von Kontakten speichern, verwalten und rechtzeitig daran erinnert werden.

## Projektstruktur

```
birthday-app/
├── data/                  # Datenschemas und Beispieldaten
│   ├── schema.json        # Datenstruktur-Definition
│   └── sample.json        # Beispieldaten
├── docs/                  # Dokumentation
│   └── data-model.md      # Datenmodell-Beschreibung
└── README.md
```

## Datenmodell

Siehe [`docs/data-model.md`](docs/data-model.md) für die vollständige Beschreibung.

## Tech Stack

- App: React Native / Flutter (noch offen)
- Daten: lokal (SQLite o.ä.) + optional Cloud-Sync

## Status

- [x] Datenmodell definiert
- [ ] App-Framework gewählt
- [ ] UI-Prototyp
- [ ] iOS Build
- [ ] Android Build
