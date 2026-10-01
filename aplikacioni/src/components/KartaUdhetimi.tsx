import Link from "next/link";
import { tekstiVendeve, type Udhetimi } from "@/lib/udhetimet";
import Avatar from "./Avatar";
import Ikona from "./Ikona";

export default function KartaUdhetimi({ udhetimi }: { udhetimi: Udhetimi }) {
  const plot = udhetimi.vendeTeLira === 0;

  return (
    <Link href={`/udhetimi/${udhetimi.id}`} className="karta">
      <div className="karta-krye">
        <Avatar id={udhetimi.id} emri={udhetimi.shoferi} />
        <div className="karta-shoferi">
          <strong>{udhetimi.shoferi}</strong>
          <span className="vleresimi">
            <Ikona emri="ylli" madhesia={14} className="ylli" />
            {udhetimi.vleresimi} <span className="i-zbehte">({udhetimi.numriVleresimeve})</span>
          </span>
        </div>
        <span className="makina-etiketa">
          <Ikona emri="makina" madhesia={16} />
          {udhetimi.makina}
        </span>
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
          <span className={plot ? "etiketa etiketa-plot" : "etiketa"}>
            {tekstiVendeve(udhetimi.vendeTeLira)}
          </span>
        </span>
      </div>

      <span className="buton buton-dyte">Shiko udhëtimin</span>
    </Link>
  );
}
