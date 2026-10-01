import Link from "next/link";
import { notFound } from "next/navigation";
import Avatar from "@/components/Avatar";
import Ikona from "@/components/Ikona";
import { gjejUdhetimin } from "@/lib/udhetimet";

export default async function KerkesaNePritje({
  params,
}: PageProps<"/udhetimi/[id]/kerkesa">) {
  const { id } = await params;
  const udhetimi = gjejUdhetimin(id);

  // Pa vende ose ID e panjohur: nuk lejohet kërkesa.
  if (!udhetimi || udhetimi.vendeTeLira === 0) notFound();

  return (
    <>
      <header className="koka">
        <Link
          href={`/udhetimi/${udhetimi.id}`}
          className="mbrapa"
          aria-label="Kthehu te detajet"
        >
          <Ikona emri="mbrapa" madhesia={22} />
        </Link>
        <h1>Kërkesa në pritje</h1>
      </header>

      <main className="permbajtja">
        <div className="sukses">
          <div className="ora-madhe">
            <Ikona emri="ora" madhesia={56} />
          </div>
          <h2>Kërkesa u dërgua!</h2>
          <p className="i-zbehte">
            Kërkesa juaj për një vend në këtë udhëtim është dërguar te shoferi.
          </p>
        </div>

        <section className="kutia">
          <div className="karta-krye">
            <Avatar id={udhetimi.id} emri={udhetimi.shoferi} />
            <div className="karta-shoferi">
              <strong>{udhetimi.shoferi}</strong>
              <span className="vleresimi">
                <Ikona emri="ylli" madhesia={14} className="ylli" />
                {udhetimi.vleresimi}{" "}
                <span className="i-zbehte">({udhetimi.numriVleresimeve})</span>
              </span>
            </div>
          </div>
          <div className="karta-info">
            <span className="rreshti">
              <Ikona emri="vendi" madhesia={16} className="i-zbehte" />
              {udhetimi.nga}
              <Ikona emri="shigjeta" madhesia={14} className="i-zbehte" />
              {udhetimi.deri}
            </span>
            <span className="rreshti">
              <Ikona emri="ora" madhesia={16} className="i-zbehte" />
              Sot, {udhetimi.ora}
            </span>
          </div>
        </section>

        <div className="statusi">
          <Ikona emri="ora" madhesia={28} />
          <div>
            <strong>Simulim: Në pritje</strong>
            <span>Kjo është vetëm simulim — nuk është bërë rezervim real.</span>
          </div>
        </div>

        <Link href="/" className="buton buton-kufi">
          Kthehu te lista
        </Link>
      </main>
    </>
  );
}
