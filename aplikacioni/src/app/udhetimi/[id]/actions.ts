"use server";
import { profiliIm } from "@/lib/lejet";
import { dergoKerkesen, pranoKerkesen } from "@/lib/kerkesat";
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

export type PergjigjaVeprimit = { ok: boolean; mesazh: string };

const mesazhetKerkeses: Record<string, PergjigjaVeprimit> = {
  derguar: { ok: true, mesazh: "Kërkesa u dërgua." },
  ekziston: { ok: true, mesazh: "Kërkesa jote ekziston tashmë." },
  shoferi: { ok: false, mesazh: "Je shoferi i këtij udhëtimi." },
  plot: { ok: false, mesazh: "Nuk ka vende të lira." },
  "nuk-u-gjet": { ok: false, mesazh: "Udhëtimi nuk u gjet." },
};

const mesazhetPranimit: Record<string, PergjigjaVeprimit> = {
  pranuar: { ok: true, mesazh: "Pranimi u ruajt." },
  tashme: { ok: true, mesazh: "Kërkesa ishte pranuar tashmë; vendet nuk ndryshuan." },
  plot: { ok: false, mesazh: "Nuk ka vende të lira. Kërkesa mbetet në pritje." },
  ndaluar: { ok: false, mesazh: "Nuk ke leje për këtë kërkesë." },
};

export async function dergoKerkesenVeprim(udhetimId: string): Promise<PergjigjaVeprimit> {
  try {
    const p = await profiliIm();
    if (!p) return { ok: false, mesazh: "Hyr për të kërkuar një vend." };
    return mesazhetKerkeses[await dergoKerkesen(udhetimId, p.id)];
  } catch {
    return { ok: false, mesazh: "Kërkesa nuk u ruajt. Provo përsëri." };
  }
}

export async function pranoKerkesenVeprim(kerkesaId: number): Promise<PergjigjaVeprimit> {
  try {
    const p = await profiliIm();
    if (!p) return { ok: false, mesazh: "Hyr si shofer për të pranuar." };
    // Pronari kontrollohet në server nga sesioni, jo nga ndërfaqja.
    return mesazhetPranimit[await pranoKerkesen(Number(kerkesaId), p.id)];
  } catch {
    return { ok: false, mesazh: "Pranimi nuk u ruajt. Provo përsëri." };
  }
}
