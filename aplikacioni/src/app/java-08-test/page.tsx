import Link from "next/link";
import Ikona from "@/components/Ikona";
import Vendtakimi from "@/components/Vendtakimi";

// Udhëtim fiktiv lokal: pa login, databazë, sekrete ose shërbime të jashtme.
const udhetimiProve = {
  id: "2",
  shoferi: "Dritoni",
  nisja: "Ferizaj",
  destinacioni: "AAB",
  ora: "08:15",
  vende: 2,
};

export default function Java08Test() {
  return (
    <>
      <header className="koka">
        <Link href="/" className="mbrapa" aria-label="Kthehu te lista">
          <Ikona emri="mbrapa" madhesia={22} />
        </Link>
        <h1>Vendtakimi · provë</h1>
      </header>
      <main className="permbajtja">
        <section className="kutia">
          <span className="i-zbehte">
            Udhëtimi {udhetimiProve.id} · {udhetimiProve.shoferi}
          </span>
          <strong className="rreshti">
            {udhetimiProve.nisja}
            <Ikona emri="shigjeta" madhesia={14} className="i-zbehte" />
            {udhetimiProve.destinacioni} · {udhetimiProve.ora}
          </strong>
          <span className="i-zbehte">Simulim për klasë · të dhëna fiktive</span>
        </section>
        <Vendtakimi />
      </main>
    </>
  );
}
