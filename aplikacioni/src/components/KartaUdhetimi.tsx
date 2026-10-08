import Link from "next/link";
import { tekstiVendeve } from "@/lib/tekste";
import type { Udhetim } from "@/lib/udhetimet";
import Ikona from "./Ikona";

export function KartaUdhetimi({ udhetim }: { udhetim: Udhetim }) {
  const plot = udhetim.vende === 0;

  return (
    <Link href={`/udhetimi/${udhetim.id}`} className="karta">
      <div className="karta-krye">
        <span className="ikona-rrethi">
          <Ikona emri="vendi" />
        </span>
        <div className="karta-shoferi">
          <strong className="rreshti">
            {udhetim.nisja}
            <Ikona emri="shigjeta" madhesia={14} className="i-zbehte" />
            {udhetim.destinacioni}
          </strong>
          <span className="i-zbehte vendtakimi">{udhetim.vendtakimi}</span>
        </div>
        <span className="ora-karta">{udhetim.ora}</span>
      </div>

      <div className="rreshti">
        <Ikona emri="personi" madhesia={16} className="i-zbehte" />
        <span className={plot ? "etiketa etiketa-plot" : "etiketa"}>
          {tekstiVendeve(udhetim.vende)}
        </span>
      </div>

      <span className="buton buton-dyte">Shiko udhëtimin</span>
    </Link>
  );
}

export default KartaUdhetimi;
