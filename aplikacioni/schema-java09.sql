-- Java 9: udhëtimet e preferuara. Ekzekuto në databazën e Javës 4–5.
-- Çelësi primar (github_id, udhetim_id) lejon vetëm një preferim për çiftin.
CREATE TABLE IF NOT EXISTS preferimet (
  github_id TEXT NOT NULL REFERENCES profilet(github_id) ON DELETE CASCADE,
  udhetim_id TEXT NOT NULL REFERENCES udhetimet(id) ON DELETE CASCADE,
  krijuar TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (github_id, udhetim_id)
);

SELECT github_id, udhetim_id, krijuar FROM preferimet ORDER BY krijuar;
