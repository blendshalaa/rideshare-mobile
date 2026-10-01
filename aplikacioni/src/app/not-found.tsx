import Link from "next/link";
import Ikona from "@/components/Ikona";

export default function NukUGjet() {
  return (
    <>
      <header className="koka">
        <span className="logo">
          <Ikona emri="makina" madhesia={22} />
        </span>
        <h1>RideShare</h1>
      </header>

      <main className="permbajtja">
        <div className="sukses">
          <div className="ora-madhe e-zbehte">
            <Ikona emri="kerko" madhesia={52} />
          </div>
          <h2>Udhëtimi nuk u gjet</h2>
          <p className="i-zbehte">
            Ky udhëtim nuk ekziston ose nuk është më i disponueshëm.
          </p>
        </div>
        <Link href="/" className="buton">
          Kthehu te lista
        </Link>
      </main>
    </>
  );
}
