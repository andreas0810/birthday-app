-- GPS-Koordinaten für alle Businesses
-- Ketten: je 5 Standorte in Großstädten
-- Einzelstandorte: exakte Koordinaten

INSERT INTO locations (business_id, name, address, city, lat, lng, active) VALUES

-- ─── Starbucks (Kette) ───────────────────────────────────────────────────────
('2b9ce50e-f31b-4994-a72c-6c782658bad7', 'Starbucks Berlin Potsdamer Platz',  'Potsdamer Platz 1',        'Berlin',    52.5096, 13.3760, true),
('2b9ce50e-f31b-4994-a72c-6c782658bad7', 'Starbucks München Marienplatz',     'Kaufingerstr. 1',          'München',   48.1374, 11.5755, true),
('2b9ce50e-f31b-4994-a72c-6c782658bad7', 'Starbucks Hamburg Jungfernstieg',   'Jungfernstieg 12',         'Hamburg',   53.5534, 9.9940,  true),
('2b9ce50e-f31b-4994-a72c-6c782658bad7', 'Starbucks Frankfurt Hauptwache',    'An der Hauptwache 1',      'Frankfurt', 50.1136, 8.6796,  true),
('2b9ce50e-f31b-4994-a72c-6c782658bad7', 'Starbucks Köln Schildergasse',      'Schildergasse 42',         'Köln',      50.9380, 6.9570,  true),
('2b9ce50e-f31b-4994-a72c-6c782658bad7', 'Starbucks Stuttgart Königstraße',   'Königstraße 20',           'Stuttgart', 48.7758, 9.1810,  true),
('2b9ce50e-f31b-4994-a72c-6c782658bad7', 'Starbucks Düsseldorf Königsallee',  'Königsallee 30',           'Düsseldorf',51.2217, 6.7762,  true),

-- ─── Subway (Kette) ──────────────────────────────────────────────────────────
('513deb84-b874-45b6-9490-d9f2390eb75b', 'Subway Berlin Mitte',               'Unter den Linden 5',       'Berlin',    52.5170, 13.3889, true),
('513deb84-b874-45b6-9490-d9f2390eb75b', 'Subway München HBF',                'Bahnhofplatz 2',           'München',   48.1402, 11.5604, true),
('513deb84-b874-45b6-9490-d9f2390eb75b', 'Subway Hamburg Mönckebergstr.',     'Mönckebergstr. 1',         'Hamburg',   53.5500, 9.9924,  true),
('513deb84-b874-45b6-9490-d9f2390eb75b', 'Subway Frankfurt Zeil',             'Zeil 40',                  'Frankfurt', 50.1143, 8.6842,  true),
('513deb84-b874-45b6-9490-d9f2390eb75b', 'Subway Köln Neumarkt',              'Neumarkt 10',              'Köln',      50.9334, 6.9468,  true),
('513deb84-b874-45b6-9490-d9f2390eb75b', 'Subway Stuttgart City',             'Königstraße 50',           'Stuttgart', 48.7764, 9.1815,  true),
('513deb84-b874-45b6-9490-d9f2390eb75b', 'Subway Nürnberg HBF',               'Bahnhofstr. 1',            'Nürnberg',  49.4468, 11.0826, true),

-- ─── Burger King (Kette) ─────────────────────────────────────────────────────
('5f1a4447-3d93-400e-ad4b-b0f66273fb68', 'Burger King Berlin Alexanderplatz', 'Alexanderplatz 3',         'Berlin',    52.5219, 13.4132, true),
('5f1a4447-3d93-400e-ad4b-b0f66273fb68', 'Burger King München Stachus',       'Stachus 5',                'München',   48.1380, 11.5650, true),
('5f1a4447-3d93-400e-ad4b-b0f66273fb68', 'Burger King Hamburg Reeperbahn',    'Reeperbahn 1',             'Hamburg',   53.5499, 9.9637,  true),
('5f1a4447-3d93-400e-ad4b-b0f66273fb68', 'Burger King Frankfurt Zeil',        'Zeil 60',                  'Frankfurt', 50.1129, 8.6820,  true),
('5f1a4447-3d93-400e-ad4b-b0f66273fb68', 'Burger King Köln HBF',              'Trankgasse 1',             'Köln',      50.9413, 6.9590,  true),
('5f1a4447-3d93-400e-ad4b-b0f66273fb68', 'Burger King Dortmund City',         'Westenhellweg 10',         'Dortmund',  51.5136, 7.4653,  true),

-- ─── Nordsee (Kette) ─────────────────────────────────────────────────────────
('eec7f0ed-cf3c-47dd-b565-f17a53726c61', 'Nordsee Berlin Forum',              'Alexanderplatz 9',         'Berlin',    52.5219, 13.4100, true),
('eec7f0ed-cf3c-47dd-b565-f17a53726c61', 'Nordsee München Kaufinger',         'Kaufingerstr. 11',         'München',   48.1376, 11.5740, true),
('eec7f0ed-cf3c-47dd-b565-f17a53726c61', 'Nordsee Hamburg Europa Passage',    'Ballindamm 40',            'Hamburg',   53.5518, 9.9998,  true),
('eec7f0ed-cf3c-47dd-b565-f17a53726c61', 'Nordsee Frankfurt MyZeil',          'Zeil 106',                 'Frankfurt', 50.1130, 8.6860,  true),
('eec7f0ed-cf3c-47dd-b565-f17a53726c61', 'Nordsee Köln Hohe Str.',            'Hohe Str. 50',             'Köln',      50.9354, 6.9530,  true),

-- ─── XXXLutz Restaurant (Kette) ──────────────────────────────────────────────
('2a2850f1-ddd9-4504-92a3-6c36b6745e03', 'XXXLutz München Nord',              'Ingolstädter Str. 51',     'München',   48.2020, 11.5640, true),
('2a2850f1-ddd9-4504-92a3-6c36b6745e03', 'XXXLutz Berlin Lichtenberg',        'Möllendorffstr. 1',        'Berlin',    52.5200, 13.5080, true),
('2a2850f1-ddd9-4504-92a3-6c36b6745e03', 'XXXLutz Hamburg Moorfleet',         'Moorfleeter Str. 1',       'Hamburg',   53.5080, 10.0720, true),
('2a2850f1-ddd9-4504-92a3-6c36b6745e03', 'XXXLutz Frankfurt Nieder-Eschbach', 'Am Hühnerberg 1',          'Frankfurt', 50.1980, 8.6710,  true),
('2a2850f1-ddd9-4504-92a3-6c36b6745e03', 'XXXLutz Köln Butzweilerhof',        'Am Butzweilerhof 1',       'Köln',      50.9990, 6.8587,  true),

-- ─── CinemaxX (Kette) ────────────────────────────────────────────────────────
('a1a99ae7-64e2-44bd-9c8e-47bc0cde6f7d', 'CinemaxX Hamburg',                  'Dammtorstr. 1',            'Hamburg',   53.5587, 9.9893,  true),
('a1a99ae7-64e2-44bd-9c8e-47bc0cde6f7d', 'CinemaxX Berlin',                   'Potsdamer Str. 5',         'Berlin',    52.5096, 13.3780, true),
('a1a99ae7-64e2-44bd-9c8e-47bc0cde6f7d', 'CinemaxX Frankfurt',                'Hanauer Landstr. 25',      'Frankfurt', 50.1118, 8.7142,  true),
('a1a99ae7-64e2-44bd-9c8e-47bc0cde6f7d', 'CinemaxX Düsseldorf',               'Ronsdorfer Str. 77',       'Düsseldorf',51.2217, 6.7880,  true),
('a1a99ae7-64e2-44bd-9c8e-47bc0cde6f7d', 'CinemaxX Hannover',                 'Raschplatz 5',             'Hannover',  52.3817, 9.7430,  true),
('a1a99ae7-64e2-44bd-9c8e-47bc0cde6f7d', 'CinemaxX Dresden',                  'Prager Str. 5',            'Dresden',   51.0459, 13.7363, true),

-- ─── Cineplex (Kette) ────────────────────────────────────────────────────────
('3d8546fb-ae2e-4c5c-a528-564c4fecff0e', 'Cineplex Göttingen',                'Groner-Tor-Str. 2',        'Göttingen', 51.5328, 9.9329,  true),
('3d8546fb-ae2e-4c5c-a528-564c4fecff0e', 'Cineplex Kassel',                   'Werner-Hilpert-Str. 24',   'Kassel',    51.3167, 9.4961,  true),
('3d8546fb-ae2e-4c5c-a528-564c4fecff0e', 'Cineplex Rostock',                  'Schnickmannstr. 6',        'Rostock',   54.0865, 12.1388, true),
('3d8546fb-ae2e-4c5c-a528-564c4fecff0e', 'Cineplex Saarbrücken',              'Trierer Str. 1',           'Saarbrücken',49.2354, 6.9969, true),
('3d8546fb-ae2e-4c5c-a528-564c4fecff0e', 'Cineplex Würzburg',                 'Eichhornstr. 1',           'Würzburg',  49.7958, 9.9270,  true),

-- ─── Einzelstandorte: Freizeitparks ──────────────────────────────────────────
('e8d0a7c6-7ce8-4aaa-a61b-535a435519a1', 'Heide Park Resort',                 'Gildehauser Weg 1',        'Soltau',    53.0821, 9.8452,  true),
('3369a7b5-b035-493a-b2b2-76988760383d', 'Europa-Park',                       'Europa-Park-Str. 2',       'Rust',      48.2671, 7.7218,  true),
('237651df-c325-4afa-8e7b-c532f9eb4c0e', 'Legoland Deutschland',              'LEGOLAND-Allee 1',         'Günzburg',  48.4613, 10.2670, true),
('b236e649-44a7-4b52-9463-125202e4f8f2', 'Tropical Islands',                  'Tropical-Islands-Allee 1', 'Krausnick', 51.9624, 13.7416, true),
('17dbdc5b-1e6b-416d-adbd-f015f2ffe761', 'Filmpark Babelsberg',               'August-Bebel-Str. 26-53',  'Potsdam',   52.3784, 13.1193, true),
('52a5015a-9e81-4b50-984c-d9d0a07e50fb', 'Hansa-Park',                        'Am Hansa-Park 1',          'Sierksdorf',54.0697, 10.7601, true),
('740b9190-92ba-4930-9fd9-70fa3eb15969', 'Zoo Magdeburg',                     'Zooallee 1',               'Magdeburg', 52.1321, 11.6285, true),

-- ─── Thermen ─────────────────────────────────────────────────────────────────
('98af54c8-11a3-4589-b3b7-6b7acf2b3efc', 'SaarowTherme',                      'Seestr. 52',               'Bad Saarow',52.1498, 13.9644, true),
('e7dc623e-a885-442e-8891-8c5ea1f8269c', 'Avenida Therme',                    'Hohenfeldener See 1',      'Hohenfelden',50.9167, 11.4333, true),
('f547542a-926f-4bfe-b7a9-858345fc4ac0', 'Dünentherme',                       'Strandweg 1',              'St. Peter-Ording', 54.3085, 8.6241, true),
('0ea9db9b-ac15-4fb2-9f72-8c86b996ccee', 'Wonnemar Wismar',                   'Zum Wasserturm 1',         'Wismar',    53.8933, 11.4660, true),
('0ea9db9b-ac15-4fb2-9f72-8c86b996ccee', 'Wonnemar Sonthofen',                'Grüntenstr. 5',            'Sonthofen', 47.5167, 10.2833, true),
('0ea9db9b-ac15-4fb2-9f72-8c86b996ccee', 'Wonnemar Backnang',                 'Maubacher Str. 20',        'Backnang',  48.9500, 9.4333,  true),
('0ea9db9b-ac15-4fb2-9f72-8c86b996ccee', 'Wonnemar Marktheidenfeld',          'Zur Mainwiese 1',          'Marktheidenfeld', 49.8500, 9.6000, true),
('18040e31-2339-421b-99cb-90d3127bde1e', 'Monte Mare Troisdorf',              'Josef-Dietzgen-Str. 3',    'Troisdorf', 50.8191, 7.1461,  true),
('18040e31-2339-421b-99cb-90d3127bde1e', 'Monte Mare Rüdesheim',              'Rheinstr. 50',             'Rüdesheim', 49.9836, 7.9228,  true),
('18040e31-2339-421b-99cb-90d3127bde1e', 'Monte Mare Rheinbach',              'Am Monte Mare 1',          'Rheinbach', 50.6264, 6.9536,  true),

-- ─── Klettern ────────────────────────────────────────────────────────────────
('8b23800e-d1c4-460d-ab50-47314997ea79', 'BOULDERBOCK',                       'Steinbeisstr. 4',          'Schwäbisch Hall', 49.1124, 9.7388, true),

-- ─── IKEA (Kette) ────────────────────────────────────────────────────────────
('0d63e7c9-e4be-42e6-833e-a256f14d6848', 'IKEA Berlin-Lichtenberg',           'Landsberger Allee 26',     'Berlin',    52.5193, 13.4847, true),
('0d63e7c9-e4be-42e6-833e-a256f14d6848', 'IKEA München-Brunnthal',            'Am IKEA 1',                'München',   48.0277, 11.6550, true),
('0d63e7c9-e4be-42e6-833e-a256f14d6848', 'IKEA Hamburg-Moorfleet',            'Moorfleet Str. 1',         'Hamburg',   53.5080, 10.0680, true),
('0d63e7c9-e4be-42e6-833e-a256f14d6848', 'IKEA Frankfurt-Niederrad',          'IKEA-Str. 1',              'Frankfurt', 50.0782, 8.6400,  true),
('0d63e7c9-e4be-42e6-833e-a256f14d6848', 'IKEA Köln-Godorf',                  'Militärringstr. 1',        'Köln',      50.8609, 6.9594,  true),
('0d63e7c9-e4be-42e6-833e-a256f14d6848', 'IKEA Stuttgart-Fellbach',           'Stuttgarter Str. 25',      'Fellbach',  48.7980, 9.2680,  true),

-- ─── Douglas (Kette) ─────────────────────────────────────────────────────────
('36aacd42-3b82-4af7-ad20-1830f1d3bd1d', 'Douglas Berlin Tauentzienstr.',     'Tauentzienstr. 13',        'Berlin',    52.5037, 13.3385, true),
('36aacd42-3b82-4af7-ad20-1830f1d3bd1d', 'Douglas München Kaufingerstr.',     'Kaufingerstr. 22',         'München',   48.1375, 11.5748, true),
('36aacd42-3b82-4af7-ad20-1830f1d3bd1d', 'Douglas Hamburg Spitalerstr.',      'Spitalerstr. 12',          'Hamburg',   53.5511, 10.0019, true),
('36aacd42-3b82-4af7-ad20-1830f1d3bd1d', 'Douglas Frankfurt Zeil',            'Zeil 90',                  'Frankfurt', 50.1138, 8.6868,  true),
('36aacd42-3b82-4af7-ad20-1830f1d3bd1d', 'Douglas Köln Schildergasse',        'Schildergasse 2',          'Köln',      50.9360, 6.9525,  true),
('36aacd42-3b82-4af7-ad20-1830f1d3bd1d', 'Douglas Stuttgart Königstr.',       'Königstr. 30',             'Stuttgart', 48.7760, 9.1798,  true),

-- ─── hairfree (Kette) ────────────────────────────────────────────────────────
('fdb40cb6-3202-4d40-81f3-e0f8c040e966', 'hairfree München',                  'Neuhauser Str. 5',         'München',   48.1377, 11.5651, true),
('fdb40cb6-3202-4d40-81f3-e0f8c040e966', 'hairfree Berlin',                   'Kurfürstendamm 30',        'Berlin',    52.5027, 13.3283, true),
('fdb40cb6-3202-4d40-81f3-e0f8c040e966', 'hairfree Frankfurt',                'Große Bockenheimer Str. 5','Frankfurt', 50.1160, 8.6720,  true),
('fdb40cb6-3202-4d40-81f3-e0f8c040e966', 'hairfree Stuttgart',                'Königstr. 10',             'Stuttgart', 48.7757, 9.1803,  true),
('fdb40cb6-3202-4d40-81f3-e0f8c040e966', 'hairfree Hamburg',                  'Mönckebergstr. 5',         'Hamburg',   53.5506, 10.0005, true),
('fdb40cb6-3202-4d40-81f3-e0f8c040e966', 'hairfree Köln',                     'Hohe Str. 30',             'Köln',      50.9352, 6.9520,  true);
