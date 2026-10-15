import Link from "next/link";
import GabimLidhjeje from "@/components/GabimLidhjeje";
import Ikona from "@/components/Ikona";
import { KartaUdhetimi } from "@/components/KartaUdhetimi";
import MenyjaPoshte from "@/components/MenyjaPoshte";
import { lexoUdhetimet, type Udhetim } from "@/lib/udhetimet";

// Lexo bazën përsëri në çdo kërkesë për këtë faqe.
export const dynamic = "force-dynamic";

function Koka() {
  return (
    <header className="koka">
      <span className="logo">
        <Ikona emri="makina" madhesia={22} />
      </span>
      <h1>RideShare</h1>
      <Link href="/panel" className="koka-djathtas lidhja-panel">
        <Ikona emri="personi" madhesia={18} />
        Hyr / Paneli im
      </Link>
    </header>
  );
}

export default async function Home() {
  let udhetimet: Udhetim[];
  try {
    udhetimet = await lexoUdhetimet();
  } catch {
    return (
      <>
        <Koka />
        <main className="permbajtja">
          <GabimLidhjeje>
            {/* <a> e jo <Link>: rifreskim i plotë i faqes */}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a className="buton" href="/">
              Provo përsëri
            </a>
          </GabimLidhjeje>
        </main>
      </>
    );
  }

  return (
    <>
      <Koka />

      <main className="permbajtja me-menu">
        <section className="kerkimi" aria-label="Udhëtimet për AAB">
          <div className="kerkimi-rreshti">
            <Ikona emri="vendi" madhesia={18} className="blu" />
            <span>
              <small>Deri</small> AAB
            </span>
            <span className="burimi shty-djathtas">
              <span className="pika" aria-hidden="true" />
              Burimi: Neon
            </span>
          </div>
          <div className="kerkimi-rreshti">
            <Ikona emri="kalendari" madhesia={18} className="blu" />
            <span>Sot</span>
            <small className="shty-djathtas">të dhëna fiktive për ushtrime</small>
          </div>
        </section>

        <div className="titulli-listes">
          <h2>Udhëtimet për AAB</h2>
          <span className="i-zbehte">{udhetimet.length} rezultate</span>
        </div>

        {udhetimet.length === 0 ? (
          <div className="kutia bosh">
            <Ikona emri="kerko" madhesia={32} className="i-zbehte" />
            <p>Nuk ka udhëtime për momentin.</p>
          </div>
        ) : (
          <div className="lista">
            {udhetimet.map((udhetim) => (
              <KartaUdhetimi key={udhetim.id} udhetim={udhetim} />
            ))}
          </div>
        )}
      </main>

      <MenyjaPoshte />
    </>
  );
}
