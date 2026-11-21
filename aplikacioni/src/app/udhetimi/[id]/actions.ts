"use server";
import { profiliIm } from "@/lib/lejet";
import { shtoPreferimin } from "@/lib/preferimet";
import { gjejUdhetimin } from "@/lib/udhetimet";

export type PergjigjaPreferimit =
  | { ok: true; numri: number }
  | { ok: false; arsye: "hyr" | "gabim" };

export async function ruajPreferimin(udhetimId: string): Promise<PergjigjaPreferimit> {
  try {
    // Përdoruesi vjen nga sesioni, jo nga shfletuesi.
    const p = await profiliIm();
    if (!p) return { ok: false, arsye: "hyr" };
    if (!(await gjejUdhetimin(udhetimId))) return { ok: false, arsye: "gabim" };
    // Refuzim prove para shkrimit në databazë (vetëm me PREFERIM_GABIM_PROVE=1 në .env.local).
    if (process.env.PREFERIM_GABIM_PROVE === "1") {
      await new Promise((r) => setTimeout(r, 800));
      throw new Error("Refuzim prove");
    }
    return { ok: true, numri: await shtoPreferimin(p.id, udhetimId) };
  } catch {
    return { ok: false, arsye: "gabim" };
  }
}
