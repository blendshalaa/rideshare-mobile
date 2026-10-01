import Link from "next/link";

export default function NukUGjet() {
  return (
    <>
      <header className="koka">
        <h1>🚗 RideShare</h1>
      </header>

      <main className="permbajtja qender">
        <h2>Udhëtimi nuk u gjet</h2>
        <p className="i-zbehte">
          Ky udhëtim nuk ekziston ose nuk është më i disponueshëm.
        </p>
        <Link href="/" className="buton">
          Kthehu te lista
        </Link>
      </main>
    </>
  );
}
