-- Java 10: kërkesat reale për vend. Ekzekuto në databazën e Javës 4–9.
-- Një udhëtar ka të shumtën një kërkesë për udhëtim; statusi: ne_pritje ose pranuar.
CREATE TABLE IF NOT EXISTS kerkesat (
  id SERIAL PRIMARY KEY,
  udhetim_id TEXT NOT NULL REFERENCES udhetimet(id) ON DELETE CASCADE,
  udhetar_id TEXT NOT NULL REFERENCES profilet(github_id) ON DELETE CASCADE,
  statusi TEXT NOT NULL DEFAULT 'ne_pritje' CHECK (statusi IN ('ne_pritje', 'pranuar')),
  krijuar TIMESTAMPTZ NOT NULL DEFAULT now(),
  perditesuar TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (udhetim_id, udhetar_id)
);

-- Udhëtim i dytë fiktiv për provën e ndërprerjes (Rasti 3).
-- Para ekzekutimit zëvendëso SHENO_ID_TENDE me ID-në tënde GitHub nga paneli.
INSERT INTO udhetimet (id, nisja, destinacioni, ora, vendtakimi, vende, shofer_id)
SELECT '4', 'Ferizaj', 'AAB', '12:30', 'Te stacioni kryesor', 2, github_id
FROM profilet WHERE github_id = 'SHENO_ID_TENDE'
ON CONFLICT (id) DO NOTHING;

SELECT id, nisja, ora, vende, shofer_id FROM udhetimet ORDER BY id;
