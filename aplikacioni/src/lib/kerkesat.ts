import "server-only";
import { getSql } from "./db";

export type Statusi = "ne_pritje" | "pranuar";

export type Gjendja = {
  udhetim: { id: string; nisja: string; destinacioni: string; ora: string; vende: number };
  roli: "shofer" | "udhetar" | "jashte";
  // Shoferi pronar sheh kërkesat e udhëtimit të vet; udhëtari vetëm të vetën.
  kerkesat: { id: number; emri: string; statusi: Statusi }[];
  kerkesaIme: { id: number; statusi: Statusi } | null;
  lexuar: string;
};

export async function lexoGjendjen(udhetimId: string, perdoruesi: string | null): Promise<Gjendja | null> {
  const sql = getSql();
  const [u] = await sql`SELECT id, nisja, destinacioni, ora, vende, shofer_id FROM udhetimet WHERE id = ${udhetimId}`;
  if (!u) return null;
  const udhetim = { id: u.id, nisja: u.nisja, destinacioni: u.destinacioni, ora: u.ora, vende: u.vende };
  const lexuar = new Date().toISOString();
  if (!perdoruesi) return { udhetim, roli: "jashte", kerkesat: [], kerkesaIme: null, lexuar };
  if (u.shofer_id === perdoruesi) {
    const rows = await sql`SELECT k.id, p.emri, k.statusi FROM kerkesat k
      JOIN profilet p ON p.github_id = k.udhetar_id
      WHERE k.udhetim_id = ${udhetimId} ORDER BY k.krijuar`;
    return { udhetim, roli: "shofer", kerkesat: rows as Gjendja["kerkesat"], kerkesaIme: null, lexuar };
  }
  const [k] = await sql`SELECT id, statusi FROM kerkesat WHERE udhetim_id = ${udhetimId} AND udhetar_id = ${perdoruesi}`;
  return { udhetim, roli: "udhetar", kerkesat: [], kerkesaIme: k ? { id: k.id, statusi: k.statusi } : null, lexuar };
}

export type RezultatiKerkeses = "derguar" | "ekziston" | "shoferi" | "plot" | "nuk-u-gjet";

export async function dergoKerkesen(udhetimId: string, udhetarId: string): Promise<RezultatiKerkeses> {
  const sql = getSql();
  const [u] = await sql`SELECT vende, shofer_id FROM udhetimet WHERE id = ${udhetimId}`;
  if (!u) return "nuk-u-gjet";
  if (u.shofer_id === udhetarId) return "shoferi";
  const [ekziston] = await sql`SELECT 1 FROM kerkesat WHERE udhetim_id = ${udhetimId} AND udhetar_id = ${udhetarId}`;
  if (ekziston) return "ekziston";
  if (u.vende <= 0) return "plot";
  // UNIQUE (udhetim_id, udhetar_id): klikimet e përsëritura nuk krijojnë kopje.
  await sql`INSERT INTO kerkesat (udhetim_id, udhetar_id) VALUES (${udhetimId}, ${udhetarId})
    ON CONFLICT (udhetim_id, udhetar_id) DO NOTHING`;
  return "derguar";
}

export type RezultatiPranimit = "pranuar" | "tashme" | "plot" | "ndaluar";

export async function pranoKerkesen(kerkesaId: number, shoferId: string): Promise<RezultatiPranimit> {
  const sql = getSql();
  try {
    // Një deklaratë e vetme: statusi dhe vendet ndryshojnë bashkë ose aspak.
    // Kërkesa ndryshon vetëm nga 'ne_pritje', prandaj i njëjti pranim nuk zbret dy herë.
    // Nëse kërkesa pranohet por vendi nuk zbritet (0 vende), pjesëtimi me 0
    // e hedh poshtë gjithë deklaratën, që statusi të mos ndryshojë vetëm.
    const [r] = await sql`
      WITH k AS (
        UPDATE kerkesat SET statusi = 'pranuar', perditesuar = now()
        WHERE id = ${kerkesaId} AND statusi = 'ne_pritje'
          AND udhetim_id IN (SELECT id FROM udhetimet WHERE shofer_id = ${shoferId})
        RETURNING udhetim_id
      ), v AS (
        UPDATE udhetimet SET vende = vende - 1
        WHERE id IN (SELECT udhetim_id FROM k) AND vende > 0
        RETURNING vende
      )
      SELECT (SELECT count(*) FROM k)::int AS pranuar,
             CASE WHEN (SELECT count(*) FROM k) = (SELECT count(*) FROM v) THEN 1
                  ELSE 1 / (SELECT count(*) FROM v)::int END AS kontroll`;
    if (r.pranuar === 1) return "pranuar";
    const [k] = await sql`SELECT k.statusi FROM kerkesat k JOIN udhetimet u ON u.id = k.udhetim_id
      WHERE k.id = ${kerkesaId} AND u.shofer_id = ${shoferId}`;
    return k?.statusi === "pranuar" ? "tashme" : "ndaluar";
  } catch (e) {
    if ((e as { code?: string }).code === "22012") return "plot";
    throw e;
  }
}
