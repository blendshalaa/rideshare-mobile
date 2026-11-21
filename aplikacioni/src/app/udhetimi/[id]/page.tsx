import Link from "next/link";
import { notFound } from "next/navigation";
import GabimLidhjeje from "@/components/GabimLidhjeje";
import ButoniPreferimit from "@/components/ButoniPreferimit";
import Ikona from "@/components/Ikona";
import SinkronizimiUdhetimit from "@/components/SinkronizimiUdhetimit";
import Vendtakimi from "@/components/Vendtakimi";
import { profiliIm } from "@/lib/lejet";
import { lexoPreferimet } from "@/lib/preferimet";
import { gjejUdhetimin } from "@/lib/udhetimet";

export const dynamic = "force-dynamic";

function Koka() {
  return (
    <header className="koka">
      <Link href="/" className="mbrapa" aria-label="Kthehu te lista">
        <Ikona emri="mbrapa" madhesia={22} />
      </Link>
      <h1>Detajet e udhëtimit</h1>
    </header>
  );
}

export default async function Detajet({
  params,
}: PageProps<"/udhetimi/[id]">) {
  const { id } = await params;
  let udhetim;
  try {
    udhetim = await gjejUdhetimin(id);
  } catch {
    return (
      <>
        <Koka />
        <main className="permbajtja">
          <GabimLidhjeje>
            <Link href="/" className="buton buton-kufi">
              ← Kthehu te lista
            </Link>
          </GabimLidhjeje>
        </main>
      </>
    );
  }
  // notFound mbetet jashtë try/catch: mungesa ≠ gabim lidhjeje.
  if (!udhetim) notFound();

  // Preferimet lexohen nga serveri, që të mbeten pas rifreskimit.
  let profili = null;
  let preferimet: string[] = [];
  try {
    profili = await profiliIm();
    if (profili) preferimet = await lexoPreferimet(profili.id);
  } catch {
    profili = null;
  }

  return (
    <>
      <Koka />

      <main className="permbajtja">
        <section className="kutia pa-mbushje">
          <div className="hero">
            <h2 className="hero-rruga">
              {udhetim.nisja} – {udhetim.destinacioni}
            </h2>
            <span className="hero-ora">
              <Ikona emri="ora" madhesia={18} />
              {udhetim.ora}
            </span>
            <span className="hero-etiketa">Udhëtimi #{udhetim.id}</span>
          </div>
        </section>

        <section className="kutia">
          <ul className="detajet">
            <li>
              <span className="ikona-rrethi"><Ikona emri="vendi" /></span>
              <div>
                <span className="i-zbehte">Vendtakimi</span>
                <strong>{udhetim.vendtakimi}</strong>
              </div>
            </li>
            <li>
              <span className="ikona-rrethi"><Ikona emri="ora" /></span>
              <div>
                <span className="i-zbehte">Ora</span>
                <strong>{udhetim.ora}</strong>
              </div>
            </li>
          </ul>
        </section>

        <SinkronizimiUdhetimit udhetimId={udhetim.id} />

        <ButoniPreferimit
          udhetimId={udhetim.id}
          fillimisht={preferimet.includes(udhetim.id)}
          numriFillestar={preferimet.length}
          brenda={Boolean(profili)}
        />

        <Vendtakimi />
      </main>

    </>
  );
}
