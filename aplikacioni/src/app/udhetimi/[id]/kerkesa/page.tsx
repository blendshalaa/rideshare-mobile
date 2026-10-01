import Link from "next/link";
import { notFound } from "next/navigation";
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
          ←
        </Link>
        <h1>Kërkesa në pritje</h1>
      </header>

      <main className="permbajtja qender">
        <div className="ikona-ore" aria-hidden="true">
          🕒
        </div>
        <h2>Kërkesa u dërgua!</h2>
        <p>
          Kërkesa juaj për një vend te {udhetimi.shoferi} ({udhetimi.nga} →{" "}
          {udhetimi.deri}, {udhetimi.ora}) është dërguar te shoferi.
        </p>

        <p className="statusi">Simulim: Në pritje</p>
        <p className="i-zbehte">
          Kjo është vetëm një simulim — nuk është bërë asnjë rezervim real.
        </p>

        <Link href="/" className="buton buton-dyte">
          Kthehu te lista
        </Link>
      </main>
    </>
  );
}
