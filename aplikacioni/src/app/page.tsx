import KartaUdhetimi from "@/components/KartaUdhetimi";
import { udhetimet } from "@/lib/udhetimet";

export default function Home() {
  return (
    <>
      <header className="koka">
        <h1>🚗 RideShare</h1>
      </header>

      <main className="permbajtja">
        <div className="titulli-listes">
          <h2>Udhëtimet e disponueshme</h2>
          <span className="i-zbehte">{udhetimet.length} rezultate</span>
        </div>

        <div className="lista">
          {udhetimet.map((u) => (
            <KartaUdhetimi key={u.id} udhetimi={u} />
          ))}
        </div>
      </main>
    </>
  );
}
