import Link from "next/link";
import Hyrja from "@/components/Hyrja";
import Ikona from "@/components/Ikona";
import MenyjaPoshte from "@/components/MenyjaPoshte";
import { profiliIm } from "@/lib/lejet";
import { gjejUdhetimin } from "@/lib/udhetimet";
import { ruajOren } from "./actions";

export const dynamic = "force-dynamic";
const mesazhet: Record<string, string> = {
  hyr: "Hyr në llogari para se të ndryshosh udhëtimin.",
  ndaluar: "Nuk ke leje për këtë udhëtim. Ora nuk ndryshoi.",
  fushe: "Shkruaj një orë të vlefshme, p.sh. 08:25. ID duhet të jetë 1, 2 ose 3.",
  ruajtur: "Ora u ruajt me sukses. Kontrollo listën dhe detajet.",
  databaza: "Nuk u lidhëm me databazën. Kontrollo Neon dhe provo përsëri.",
};

function Koka() {
  return (
    <header className="koka">
      <Link href="/" className="mbrapa" aria-label="Kthehu te udhëtimet">
        <Ikona emri="mbrapa" madhesia={22} />
      </Link>
      <h1>Paneli im</h1>
    </header>
  );
}

export default async function Panel({ searchParams }: {
  searchParams: Promise<{ m?: string }>;
}) {
  const { m } = await searchParams;
  let p;
  let oraAktuale = "08:15";
  try {
    p = await profiliIm();
    // Formulari tregon orën që është ruajtur realisht në Neon.
    if (p?.roli === "shofer") oraAktuale = (await gjejUdhetimin("2"))?.ora ?? oraAktuale;
  } catch {
    return (
      <>
        <Koka />
        <main className="permbajtja">
          <p role="alert" className="njoftim njoftim-gabim">{mesazhet.databaza}</p>
          <Link href="/panel" className="buton">Provo përsëri</Link>
        </main>
      </>
    );
  }

  return (
    <>
      <Koka />
      <main className="permbajtja me-menu">
        {m && mesazhet[m] && (
          <p role="status" className={m === "ruajtur" ? "njoftim njoftim-sukses" : "njoftim njoftim-gabim"}>
            {mesazhet[m]}
          </p>
        )}

        {!p ? (
          <section className="kutia profili">
            <div className="ora-madhe e-zbehte">
              <Ikona emri="personi" madhesia={48} />
            </div>
            <p className="i-zbehte">
              Lista është publike. Për panelin hyr me llogarinë tënde GitHub.
            </p>
            <Hyrja brenda={false} />
          </section>
        ) : (
          <section className="kutia profili">
            <div className="avatar-madh" aria-hidden="true">{p.emri.charAt(0)}</div>
            <p>Përshëndetje, <strong>{p.emri}</strong>.</p>
            <p>
              Roli: <span className={p.roli === "shofer" ? "etiketa" : "etiketa etiketa-gri"}>{p.roli}</span>
            </p>
            <p className="i-zbehte">ID ime GitHub: <code>{p.id}</code></p>
            <Hyrja brenda />
          </section>
        )}

        {p?.roli === "shofer" ? (
          <form action={ruajOren} className="kutia">
            <h2>Ndrysho orën e udhëtimit tim</h2>
            <input type="hidden" name="id" value="2" />
            <p className="i-zbehte">
              Ora aktuale në databazë: <strong className="ora-aktuale">{oraAktuale}</strong>
            </p>
            <label htmlFor="ora" className="i-zbehte">Ora e re (format 24-orësh, p.sh. 10:00)</label>
            {/* Tekst e jo type="time": shmang formatin AM/PM të shfletuesit. */}
            <input
              key={oraAktuale}
              id="ora"
              name="ora"
              type="text"
              inputMode="numeric"
              pattern="([01][0-9]|2[0-3]):[0-5][0-9]"
              placeholder="08:25"
              defaultValue={oraAktuale}
              required
              className="fusha"
            />
            <button type="submit" className="buton">Ruaj orën</button>
            <p className="i-zbehte shenim">
              Formulari i laboratorit provon ID 2. Serveri verifikon pronarin edhe nëse ID ndryshohet.
            </p>
          </form>
        ) : p && (
          <p className="kutia i-zbehte">
            Si udhëtar mund të shohësh udhëtimet; nuk mund të ndryshosh orën e shoferit.
          </p>
        )}

        <Link href="/" className="buton buton-dyte">Kthehu te udhëtimet</Link>
        <p className="i-zbehte shenim qender-tekst">Kërkesa për vend mbetet simulim këtë javë.</p>
      </main>
      <MenyjaPoshte aktiv="profili" />
    </>
  );
}
