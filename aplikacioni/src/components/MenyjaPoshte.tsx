import Link from "next/link";
import Ikona from "./Ikona";

// "Kërkesat" vjen më vonë; "Profili" hap panelin.
export default function MenyjaPoshte({ aktiv = "udhetimet" }: { aktiv?: "udhetimet" | "profili" }) {
  return (
    <nav className="menyja-poshte" aria-label="Menyja kryesore">
      <Link href="/" className={aktiv === "udhetimet" ? "menyja-elementi aktiv" : "menyja-elementi"}>
        <Ikona emri="shtepia" madhesia={22} />
        Udhëtimet
      </Link>
      <span className="menyja-elementi" aria-disabled="true" title="Së shpejti">
        <Ikona emri="ora" madhesia={22} />
        Kërkesat
      </span>
      <Link href="/panel" className={aktiv === "profili" ? "menyja-elementi aktiv" : "menyja-elementi"}>
        <Ikona emri="personi" madhesia={22} />
        Profili
      </Link>
    </nav>
  );
}
