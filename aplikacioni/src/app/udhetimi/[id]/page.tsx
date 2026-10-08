import Link from "next/link";
import { notFound } from "next/navigation";
import GabimLidhjeje from "@/components/GabimLidhjeje";
import Ikona from "@/components/Ikona";
import { tekstiVendeve } from "@/lib/tekste";
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

  const plot = udhetim.vende === 0;

  return (
    <>
      <Koka />

      <main className="permbajtja me-cta">
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
            <li>
              <span className={plot ? "ikona-rrethi e-kuqe" : "ikona-rrethi"}>
                <Ikona emri="personi" />
              </span>
              <div>
                <span className="i-zbehte">Vende të lira: {udhetim.vende}</span>
                <strong className={plot ? "teksti-kuq" : undefined}>
                  {tekstiVendeve(udhetim.vende)}
                </strong>
              </div>
            </li>
          </ul>
        </section>
      </main>

      <div className="cta">
        {udhetim.vende > 0 ? (
          <Link className="buton" href={`/udhetimi/${id}/kerkesa`}>
            <Ikona emri="shtoPerson" />
            Kërko vend
          </Link>
        ) : (
          <button type="button" className="buton" disabled>
            <Ikona emri="bllok" />
            Nuk ka vende të lira
          </button>
        )}
      </div>
    </>
  );
}
