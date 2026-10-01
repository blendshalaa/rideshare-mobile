import Link from "next/link";
import { tekstiVendeve, type Udhetimi } from "@/lib/udhetimet";

export default function KartaUdhetimi({ udhetimi }: { udhetimi: Udhetimi }) {
  const plot = udhetimi.vendeTeLira === 0;

  return (
    <Link href={`/udhetimi/${udhetimi.id}`} className="karta">
      <div className="karta-krye">
        <div className="avatar" aria-hidden="true">
          {udhetimi.shoferi.charAt(0)}
        </div>
        <div className="karta-shoferi">
          <strong>{udhetimi.shoferi}</strong>
          <span className="i-zbehte">
            ★ {udhetimi.vleresimi} ({udhetimi.numriVleresimeve}) · {udhetimi.makina}
          </span>
        </div>
      </div>

      <p className="rruga">
        {udhetimi.nga} → {udhetimi.deri}
      </p>

      <div className="karta-fund">
        <span>🕒 {udhetimi.ora}</span>
        <span className={plot ? "etiketa etiketa-plot" : "etiketa"}>
          {tekstiVendeve(udhetimi.vendeTeLira)}
        </span>
      </div>

      <span className="buton buton-dyte">Shiko udhëtimin</span>
    </Link>
  );
}
