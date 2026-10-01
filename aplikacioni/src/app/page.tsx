import Ikona from "@/components/Ikona";
import KartaUdhetimi from "@/components/KartaUdhetimi";
import MenyjaPoshte from "@/components/MenyjaPoshte";
import { udhetimet } from "@/lib/udhetimet";

export default function Home() {
  return (
    <>
      <header className="koka">
        <span className="logo">
          <Ikona emri="makina" madhesia={22} />
        </span>
        <h1>RideShare</h1>
        <span className="koka-djathtas i-zbehte" aria-hidden="true">
          <Ikona emri="menu" madhesia={24} />
        </span>
      </header>

      <main className="permbajtja me-menu">
        <section className="kerkimi" aria-label="Filtri i udhëtimeve">
          <div className="kerkimi-rreshti">
            <Ikona emri="vendi" madhesia={18} className="blu" />
            <span>
              <small>Nga</small> Prishtina
            </span>
            <Ikona emri="shigjeta" madhesia={16} className="i-zbehte" />
            <Ikona emri="vendi" madhesia={18} className="blu" />
            <span>
              <small>Deri</small> AAB
            </span>
          </div>
          <div className="kerkimi-rreshti">
            <Ikona emri="kalendari" madhesia={18} className="blu" />
            <span>Sot, 08:00 – 12:00</span>
            <Ikona emri="filtri" madhesia={18} className="i-zbehte shty-djathtas" />
          </div>
        </section>

        <div className="titulli-listes">
          <h2>Udhëtimet e disponueshme</h2>
          <span className="i-zbehte">{udhetimet.length} rezultate</span>
        </div>

        <div className="lista">
          {udhetimet.map((u) => (
            <KartaUdhetimi key={u.id} udhetimi={u} />
          ))}
        </div>
      </main>

      <MenyjaPoshte />
    </>
  );
}
