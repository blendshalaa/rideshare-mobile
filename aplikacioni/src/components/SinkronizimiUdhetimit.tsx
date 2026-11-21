"use client";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { dergoKerkesenVeprim, pranoKerkesenVeprim } from "@/app/udhetimi/[id]/actions";

type Statusi = "ne_pritje" | "pranuar";
type Gjendja = {
  udhetim: { id: string; vende: number };
  roli: "shofer" | "udhetar" | "jashte";
  kerkesat: { id: number; emri: string; statusi: Statusi }[];
  kerkesaIme: { id: number; statusi: Statusi } | null;
  lexuar: string;
};

const INTERVALI = 5000;
const statusiTekst: Record<Statusi, string> = { ne_pritje: "Në pritje", pranuar: "U pranua" };

export default function SinkronizimiUdhetimit({ udhetimId }: { udhetimId: string }) {
  const [gjendja, setGjendja] = useState<Gjendja | null>(null);
  const [rilidhje, setRilidhje] = useState(false);
  const [veprimi, setVeprimi] = useState<string | null>(null);
  const [mesazhi, setMesazhi] = useState<{ ok: boolean; tekst: string } | null>(null);
  const kontrolli = useRef<AbortController | null>(null);

  // Një lexim në herë. Me `menjehere` anulohet leximi i vjetër, që përgjigjja
  // e tij të mos e mbishkruajë gjendjen e re pas një veprimi.
  const lexo = useCallback(async (menjehere = false) => {
    if (kontrolli.current) {
      if (!menjehere) return;
      kontrolli.current.abort();
    }
    const ac = new AbortController();
    kontrolli.current = ac;
    try {
      const r = await fetch(`/api/udhetimi/${udhetimId}/gjendja`, { cache: "no-store", signal: ac.signal });
      if (!r.ok) throw new Error(String(r.status));
      const data = (await r.json()) as Gjendja;
      if (ac.signal.aborted) return;
      setGjendja(data);
      // Paralajmërimi hiqet vetëm pas një përgjigjeje të suksesshme.
      setRilidhje(false);
    } catch {
      // Mbaj vlerat e fundit dhe shëno që mund të jenë të vjetra.
      if (!ac.signal.aborted) setRilidhje(true);
    } finally {
      if (kontrolli.current === ac) kontrolli.current = null;
    }
  }, [udhetimId]);

  useEffect(() => {
    // Leximi i parë menjëherë pas shfaqjes, pastaj çdo 5 sekonda.
    const fillimi = setTimeout(() => lexo(), 0);
    const timer = setInterval(() => lexo(), INTERVALI);
    const kurKthehetRrjeti = () => lexo(true);
    window.addEventListener("online", kurKthehetRrjeti);
    return () => {
      clearTimeout(fillimi);
      clearInterval(timer);
      window.removeEventListener("online", kurKthehetRrjeti);
      kontrolli.current?.abort();
    };
  }, [lexo]);

  async function vepro(emri: string, fn: () => Promise<{ ok: boolean; mesazh: string }>) {
    if (veprimi) return;
    setVeprimi(emri);
    setMesazhi(null);
    try {
      const r = await fn();
      setMesazhi({ ok: r.ok, tekst: r.mesazh });
    } catch {
      setMesazhi({ ok: false, tekst: "Veprimi nuk arriti te serveri. Provo përsëri." });
    }
    setVeprimi(null);
    // Rilexo menjëherë nga serveri: suksesi shfaqet nga gjendja e ruajtur.
    await lexo(true);
    // Mesazhi i veprimit largohet; gjendja e serverit mbetet në ekran.
    setTimeout(() => setMesazhi(null), 4000);
  }

  if (!gjendja) {
    return (
      <section className="kutia sinkronizimi">
        <p className="i-zbehte">{rilidhje ? "Po rilidhemi…" : "Po lexojmë gjendjen nga serveri…"}</p>
      </section>
    );
  }

  const bllokuar = rilidhje || Boolean(veprimi);
  const ora = new Date(gjendja.lexuar).toLocaleTimeString("sq-AL");

  return (
    <section className="kutia sinkronizimi" data-roli={gjendja.roli}>
      <div className="sink-rreshti">
        <span className="i-zbehte">Vende të lira</span>
        <strong className="sink-vende" data-testid="vende-live">{gjendja.udhetim.vende}</strong>
      </div>

      {gjendja.roli === "shofer" && (
        <div>
          <h2 className="sink-titulli">Kërkesat për udhëtimin tim</h2>
          {gjendja.kerkesat.length === 0 && <p className="i-zbehte">Ende pa kërkesë</p>}
          {gjendja.kerkesat.map((k) => (
            <div key={k.id} className="sink-kerkesa" data-testid="kerkesa-shoferit" data-statusi={k.statusi}>
              <span>
                Kërkesa e <strong>{k.emri}</strong>:{" "}
                <span className={k.statusi === "pranuar" ? "etiketa" : "etiketa etiketa-gri"}>{statusiTekst[k.statusi]}</span>
              </span>
              {k.statusi === "ne_pritje" ? (
                <button
                  type="button"
                  className="buton"
                  disabled={bllokuar}
                  onClick={() => vepro("pranim", () => pranoKerkesenVeprim(k.id))}
                >
                  {veprimi === "pranim" ? "Po pranohet…" : "Prano kërkesën"}
                </button>
              ) : (
                <p className="njoftim njoftim-sukses">Pranimi u ruajt</p>
              )}
            </div>
          ))}
        </div>
      )}

      {gjendja.roli === "udhetar" && (
        <div data-testid="kerkesa-ime" data-statusi={gjendja.kerkesaIme?.statusi ?? "pa"}>
          <h2 className="sink-titulli">Kërkesa ime</h2>
          {!gjendja.kerkesaIme ? (
            <>
              <p className="i-zbehte">Pa kërkesë</p>
              <button
                type="button"
                className="buton"
                disabled={bllokuar || gjendja.udhetim.vende <= 0}
                onClick={() => vepro("kerkese", () => dergoKerkesenVeprim(udhetimId))}
              >
                {veprimi === "kerkese" ? "Po dërgohet…" : gjendja.udhetim.vende <= 0 ? "Nuk ka vende të lira" : "Kërko një vend"}
              </button>
            </>
          ) : gjendja.kerkesaIme.statusi === "ne_pritje" ? (
            <p><span className="etiketa etiketa-gri">Në pritje</span> Kërkesa u dërgua</p>
          ) : (
            <p className="njoftim njoftim-sukses">U pranua · Vendi u konfirmua</p>
          )}
        </div>
      )}

      {gjendja.roli === "jashte" && (
        <Link href="/panel" className="buton buton-kufi">Hyr për të kërkuar një vend</Link>
      )}

      {mesazhi && <p role="status" className={mesazhi.ok ? "njoftim njoftim-sukses" : "njoftim njoftim-gabim"}>{mesazhi.tekst}</p>}

      {rilidhje ? (
        <p role="alert" className="njoftim njoftim-paralajmerim" data-testid="rilidhje">
          Po rilidhemi · të dhënat mund të jenë të vjetra. Veprimet që kërkojnë rrjet janë të bllokuara.
        </p>
      ) : (
        <p className="i-zbehte shenim">Gjendja u lexua nga serveri në {ora} · përditësim automatik çdo 5 sekonda</p>
      )}
    </section>
  );
}
