"use client";
import { useRef, useState } from "react";
import Ikona from "./Ikona";

// Emrat teknikë që lexon testi te data-state; mesazhet për Artën janë shqip.
type Gjendja = "idle" | "loading" | "success" | "denied" | "error" | "timeout" | "unavailable";

const mesazhet: Record<Gjendja, string> = {
  idle: "Leja kërkohet vetëm kur klikon butonin.",
  loading: "Po lexojmë vendndodhjen…",
  success: "Pozicioni u mor. Shkruaj vetë emrin e vendtakimit.",
  denied: "Leja u refuzua. Shkruaj vendtakimin vetë.",
  error: "Pozicioni nuk është i disponueshëm. Shkruaj vendtakimin vetë.",
  timeout: "Koha mbaroi. Provo sërish ose shkruaj vendtakimin vetë.",
  unavailable: "Ky shfletues nuk e mbështet vendndodhjen. Shkruaj vendtakimin vetë.",
};

export default function Vendtakimi() {
  const [teksti, setTeksti] = useState("");
  const [konfirmuar, setKonfirmuar] = useState("");
  const [gabimi, setGabimi] = useState("");
  const [gjendja, setGjendja] = useState<Gjendja>("idle");
  const [saktesia, setSaktesia] = useState<number | null>(null);
  // Vetëm përgjigjja e kërkesës së fundit e ndryshon ekranin.
  const kerkesa = useRef(0);

  function konfirmoVendtakimin() {
    const vendi = teksti.trim();
    if (!vendi) {
      // Zgjedhja e mëparshme mbetet e pandryshuar.
      setGabimi("Shkruaj një vendtakim para se ta konfirmosh.");
      return;
    }
    setGabimi("");
    setKonfirmuar(vendi);
  }

  function kurMerretPozicioni(nr: number, pozicioni: GeolocationPosition) {
    if (nr !== kerkesa.current) return;
    // Koordinatat nuk ruhen dhe nuk shfaqen: vetëm saktësia në metra.
    setSaktesia(Math.round(pozicioni.coords.accuracy));
    setGjendja("success");
  }

  function kurDeshtonLeximi(nr: number, error: { code: number }) {
    if (nr !== kerkesa.current) return;
    setSaktesia(null);
    if (error.code === 1) setGjendja("denied");
    else if (error.code === 3) setGjendja("timeout");
    else setGjendja("error");
  }

  function kerkoVendndodhjen() {
    const nr = ++kerkesa.current;
    if (!("geolocation" in navigator) || !navigator.geolocation) {
      setSaktesia(null);
      setGjendja("unavailable");
      return;
    }
    setGjendja("loading");
    navigator.geolocation.getCurrentPosition(
      (p) => kurMerretPozicioni(nr, p),
      (e) => kurDeshtonLeximi(nr, e),
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 60000 },
    );
  }

  const deshtoi = ["denied", "error", "timeout", "unavailable"].includes(gjendja);

  return (
    <section className="kutia vendtakimi" aria-labelledby="vendtakimi-titulli">
      <h2 id="vendtakimi-titulli">Vendtakimi yt</h2>

      <button
        type="button"
        className="buton buton-kufi"
        data-testid="locate-me"
        onClick={kerkoVendndodhjen}
        disabled={gjendja === "loading"}
      >
        <Ikona emri="vendi" />
        {deshtoi ? "Provo sërish" : "Merr vendndodhjen time"}
      </button>
      <p
        role="status"
        aria-live="polite"
        data-testid="location-status"
        data-state={gjendja}
        className={deshtoi ? "njoftim njoftim-gabim" : gjendja === "success" ? "njoftim njoftim-sukses" : "i-zbehte"}
      >
        {mesazhet[gjendja]}
      </p>
      <p className="i-zbehte">
        Saktësia rreth: <strong data-testid="location-accuracy">{saktesia !== null ? `${saktesia} m` : ""}</strong>
      </p>

      <label htmlFor="vendtakimi-fusha" className="i-zbehte">
        Vendtakimi (p.sh. Biblioteka)
      </label>
      <input
        id="vendtakimi-fusha"
        data-testid="meeting-input"
        className="fusha"
        value={teksti}
        onChange={(e) => setTeksti(e.target.value)}
        placeholder="p.sh. Biblioteka"
        autoComplete="off"
      />
      <p role="alert" data-testid="meeting-error" className="teksti-kuq">{gabimi}</p>
      <button type="button" className="buton" data-testid="confirm-meeting" onClick={konfirmoVendtakimin}>
        Konfirmo
      </button>

      <p>
        Vendtakimi i konfirmuar:{" "}
        <strong data-testid="confirmed-meeting">{konfirmuar}</strong>
        {!konfirmuar && <span className="i-zbehte">asnjë ende</span>}
      </p>
      <p className="i-zbehte shenim">
        Ruhet vetëm në këtë faqe të shfletuesit; shoferi nuk e sheh ende. Koordinatat nuk ruhen.
      </p>
    </section>
  );
}
