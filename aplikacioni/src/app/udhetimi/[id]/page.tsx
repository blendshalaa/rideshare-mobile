import Link from "next/link";
import { notFound } from "next/navigation";
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
          ←
        </Link>
        <h1>Detajet e udhëtimit</h1>
      </header>

      <main className="permbajtja">
        <section className="kutia">
          <div className="karta-krye">
            <div className="avatar" aria-hidden="true">
              {udhetimi.shoferi.charAt(0)}
            </div>
            <div className="karta-shoferi">
              <strong>{udhetimi.shoferi}</strong>
              <span className="i-zbehte">
                ★ {udhetimi.vleresimi} ({udhetimi.numriVleresimeve})
              </span>
            </div>
          </div>
        </section>

        <section className="kutia">
          <p className="rruga">
            {udhetimi.nga} → {udhetimi.deri}
          </p>
          <ul className="detajet">
            <li>📍 Vendtakimi: {udhetimi.vendtakimi}</li>
            <li>📅 {udhetimi.data}</li>
            <li>🕒 {udhetimi.ora}</li>
            <li>
              🚗 {udhetimi.makina} (Ngjyrë {udhetimi.ngjyra})
            </li>
            <li>👤 {tekstiVendeve(udhetimi.vendeTeLira)}</li>
          </ul>
        </section>

        <section className="kutia">
          <h2>Përshkrimi</h2>
          <p>{udhetimi.pershkrimi}</p>
        </section>

        {plot ? (
          <button type="button" className="buton" disabled>
            Nuk ka vende të lira
          </button>
        ) : (
          <Link href={`/udhetimi/${udhetimi.id}/kerkesa`} className="buton">
            Kërko vend
          </Link>
        )}
      </main>
    </>
  );
}
