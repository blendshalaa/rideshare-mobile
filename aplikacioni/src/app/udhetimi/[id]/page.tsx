import Link from "next/link";
import { notFound } from "next/navigation";
import Avatar from "@/components/Avatar";
import Ikona from "@/components/Ikona";
import { gjejUdhetimin, tekstiVendeve } from "@/lib/udhetimet";

export default async function DetajetUdhetimit({
  params,
}: PageProps<"/udhetimi/[id]">) {
  const { id } = await params;
  const udhetimi = gjejUdhetimin(id);

  if (!udhetimi) notFound();

  const plot = udhetimi.vendeTeLira === 0;

  return (
    <>
      <header className="koka">
        <Link href="/" className="mbrapa" aria-label="Kthehu te lista">
          <Ikona emri="mbrapa" madhesia={22} />
        </Link>
        <h1>Detajet e udhëtimit</h1>
      </header>

      <main className="permbajtja me-cta">
        <section className="kutia pa-mbushje">
          <div className="hero">
            <Ikona emri="makina" madhesia={96} />
            <span className="hero-etiketa">{udhetimi.makina}</span>
          </div>
          <div className="karta-krye hero-shoferi">
            <Avatar id={udhetimi.id} emri={udhetimi.shoferi} madhesia={52} />
            <div className="karta-shoferi">
              <strong>{udhetimi.shoferi}</strong>
              <span className="vleresimi">
                <Ikona emri="ylli" madhesia={14} className="ylli" />
                {udhetimi.vleresimi}{" "}
                <span className="i-zbehte">({udhetimi.numriVleresimeve} vlerësime)</span>
              </span>
            </div>
          </div>
        </section>

        <section className="kutia">
          <ul className="detajet">
            <li>
              <span className="ikona-rrethi"><Ikona emri="vendi" /></span>
              <div>
                <strong>
                  {udhetimi.nga} → {udhetimi.deri}
                </strong>
                <span className="i-zbehte">Vendtakimi: {udhetimi.vendtakimi}</span>
              </div>
            </li>
            <li>
              <span className="ikona-rrethi"><Ikona emri="kalendari" /></span>
              {udhetimi.data}
            </li>
            <li>
              <span className="ikona-rrethi"><Ikona emri="ora" /></span>
              {udhetimi.ora}
            </li>
            <li>
              <span className="ikona-rrethi"><Ikona emri="makina" /></span>
              <span>
                {udhetimi.makina}{" "}
                <span className="i-zbehte">(Ngjyrë {udhetimi.ngjyra})</span>
              </span>
            </li>
            <li>
              <span className={plot ? "ikona-rrethi e-kuqe" : "ikona-rrethi"}>
                <Ikona emri="personi" />
              </span>
              <span className={plot ? "teksti-kuq" : undefined}>
                {tekstiVendeve(udhetimi.vendeTeLira)}
              </span>
            </li>
          </ul>
        </section>

        <section className="kutia">
          <h2>Përshkrimi</h2>
          <p className="i-zbehte">{udhetimi.pershkrimi}</p>
        </section>
      </main>

      <div className="cta">
        {plot ? (
          <button type="button" className="buton" disabled>
            <Ikona emri="bllok" />
            Nuk ka vende të lira
          </button>
        ) : (
          <Link href={`/udhetimi/${udhetimi.id}/kerkesa`} className="buton">
            <Ikona emri="shtoPerson" />
            Kërko vend
          </Link>
        )}
      </div>
    </>
  );
}
