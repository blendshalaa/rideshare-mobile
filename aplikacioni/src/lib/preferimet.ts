import "server-only";
import { getSql } from "./db";

// Preferimi i përket përdoruesit të kyçur; nuk është rezervim.
export async function lexoPreferimet(githubId: string): Promise<string[]> {
  const sql = getSql();
  const rows = await sql`SELECT udhetim_id FROM preferimet WHERE github_id = ${githubId} ORDER BY krijuar`;
  return rows.map((r) => String(r.udhetim_id));
}

// ON CONFLICT: përsëritja e të njëjtit synim nuk krijon rresht të dytë.
export async function shtoPreferimin(githubId: string, udhetimId: string): Promise<number> {
  const sql = getSql();
  await sql`INSERT INTO preferimet (github_id, udhetim_id) VALUES (${githubId}, ${udhetimId})
    ON CONFLICT (github_id, udhetim_id) DO NOTHING`;
  const rows = await sql`SELECT count(*)::int AS numri FROM preferimet WHERE github_id = ${githubId}`;
  return rows[0].numri as number;
}
