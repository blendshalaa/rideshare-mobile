import Link from "next/link";
import Ikona from "./Ikona";

// Vetëm "Udhëtimet" funksionon tani; të tjerat vijnë më vonë.
export default function MenyjaPoshte() {
  return (
    <nav className="menyja-poshte" aria-label="Menyja kryesore">
      <Link href="/" className="menyja-elementi aktiv">
        <Ikona emri="shtepia" madhesia={22} />
        Udhëtimet
      </Link>
      <span className="menyja-elementi" aria-disabled="true" title="Së shpejti">
        <Ikona emri="ora" madhesia={22} />
        Kërkesat
      </span>
      <span className="menyja-elementi" aria-disabled="true" title="Së shpejti">
        <Ikona emri="personi" madhesia={22} />
        Profili
      </span>
    </nav>
  );
}
