import Link from "next/link";
import { notFound } from "next/navigation";
import GabimLidhjeje from "@/components/GabimLidhjeje";
import Ikona from "@/components/Ikona";
import { gjejUdhetimin } from "@/lib/udhetimet";

export const dynamic = "force-dynamic";

export default async function Kerkesa({
  params,
}: PageProps<"/udhetimi/[id]/kerkesa">) {
  const { id } = await params;
  let udhetim;
  try {
    udhetim = await gjejUdhetimin(id);
  } catch {
    return (
      <main className="permbajtja">
        <GabimLidhjeje>
          <Link href="/" className="buton buton-kufi">
            ← Kthehu te lista
          </Link>
        </GabimLidhjeje>
      </main>
    );
  }
  if (!udhetim) notFound();

  return (
    <>
      <header className="koka">
        <Link href={`/udhetimi/${id}`} className="mbrapa" aria-label="Kthehu te detajet">
          <Ikona emri="mbrapa" madhesia={22} />
        </Link>
        <h1>Kërkesa</h1>
      </header>

      <main className="permbajtja">
        {udhetim.vende > 0 ? (
          <>
            <div className="sukses">
              <div className="ora-madhe">
                <Ikona emri="ora" madhesia={56} />
              </div>
              <h2>Simulim: Në pritje</h2>
              <p className="i-zbehte">
                Kërkesa për {udhetim.nisja} nuk është dërguar te shoferi.
              </p>
            </div>

            <section className="kutia">
              <span className="rreshti">
                <Ikona emri="vendi" madhesia={16} className="i-zbehte" />
                <strong className="rreshti">
                  {udhetim.nisja}
                  <Ikona emri="shigjeta" madhesia={14} className="i-zbehte" />
                  {udhetim.destinacioni}
                </strong>
              </span>
              <span className="rreshti">
                <Ikona emri="ora" madhesia={16} className="i-zbehte" />
                {udhetim.ora} · {udhetim.vendtakimi}
              </span>
            </section>

            <div className="statusi">
              <Ikona emri="ora" madhesia={28} />
              <div>
                <strong>Vetëm simulim</strong>
                <span>Ruajtjen dhe konfirmimin real do t’i shtojmë më vonë.</span>
              </div>
            </div>
          </>
        ) : (
          <div className="sukses">
            <div className="ora-madhe e-kuqe">
              <Ikona emri="bllok" madhesia={52} />
            </div>
            <h2>Nuk ka vende të lira.</h2>
          </div>
        )}

        <Link href="/" className="buton buton-kufi">
          Kthehu te lista
        </Link>
      </main>
    </>
  );
}
