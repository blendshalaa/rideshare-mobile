"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import { ruajPreferimin } from "@/app/udhetimi/[id]/actions";

type Gjendja = "bosh" | "duke-ruajtur" | "ruajtur" | "gabim";

export default function ButoniPreferimit({
  udhetimId,
  fillimisht,
  numriFillestar,
  brenda,
}: {
  udhetimId: string;
  fillimisht: boolean;
  numriFillestar: number;
  brenda: boolean;
}) {
  const [gjendja, setGjendja] = useState<Gjendja>(fillimisht ? "ruajtur" : "bosh");
  const [numri, setNumri] = useState(numriFillestar);
  // Ref-i e ndal klikimin e dytë edhe para se React të rifreskojë butonin.
  const nePritje = useRef(false);

  async function kliko() {
    if (nePritje.current || gjendja === "ruajtur") return;
    nePritje.current = true;
    const numriPara = numri;
    // Pamja reagon menjëherë, por kjo nuk është ende konfirmim.
    setGjendja("duke-ruajtur");
    setNumri(numriPara + 1);
    let pergjigja;
    try {
      pergjigja = await ruajPreferimin(udhetimId);
    } catch {
      pergjigja = { ok: false as const, arsye: "gabim" as const };
    }
    if (pergjigja.ok) {
      setGjendja("ruajtur");
      setNumri(pergjigja.numri);
    } else {
      // Rikthe vlerat e mëparshme: asnjë sukses i rremë.
      setGjendja("gabim");
      setNumri(numriPara);
    }
    nePritje.current = false;
  }

  if (!brenda) {
    return (
      <section className="kutia preferimi">
        <p className="i-zbehte">Hyr për ta ruajtur këtë udhëtim te të preferuarat.</p>
        <Link href="/panel" className="buton buton-kufi">Hyr / Paneli im</Link>
      </section>
    );
  }

  const iMbushur = gjendja === "duke-ruajtur" || gjendja === "ruajtur";
  const etiketa = {
    bosh: "☆ Ruaj udhëtimin",
    "duke-ruajtur": "★ Po ruhet…",
    ruajtur: "★ I ruajtur",
    gabim: "☆ Provo përsëri",
  }[gjendja];
  const mesazhi = {
    bosh: "Nuk është te të preferuarat.",
    "duke-ruajtur": "Po presim konfirmimin e serverit.",
    ruajtur: "U ruajt te të preferuarat.",
    gabim: "Nuk u ruajt. Provo përsëri.",
  }[gjendja];

  return (
    <section className="kutia preferimi" data-gjendja={gjendja}>
      <button
        type="button"
        className={iMbushur ? "buton buton-yll i-mbushur" : "buton buton-yll"}
        onClick={kliko}
        disabled={gjendja === "duke-ruajtur" || gjendja === "ruajtur"}
        aria-pressed={iMbushur}
      >
        {etiketa}
      </button>
      <p role="status" aria-live="polite" className={gjendja === "gabim" ? "teksti-kuq" : "i-zbehte"}>
        {mesazhi}
      </p>
      <p className="preferimi-numri">
        Të preferuarat <strong>{numri}</strong>
        <span className="i-zbehte"> · Preferim personal · jo rezervim</span>
      </p>
    </section>
  );
}
