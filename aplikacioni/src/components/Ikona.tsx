// Ikona të thjeshta SVG (stili "outline"), pa librari shtesë.

const shtigjet = {
  makina:
    "M5 17h14M6 17v2M18 17v2M3 13l2-5.5A2 2 0 0 1 6.9 6h10.2a2 2 0 0 1 1.9 1.5L21 13v4H3zM7.5 13.5h.01M16.5 13.5h.01",
  menu: "M4 7h16M4 12h16M4 17h16",
  vendi: "M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21zM12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z",
  shigjeta: "M5 12h14M13 6l6 6-6 6",
  mbrapa: "M19 12H5M11 6l-6 6 6 6",
  kalendari: "M7 3v3M17 3v3M4 9h16M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z",
  ora: "M12 7v5l3 2M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z",
  ylli: "M12 3l2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.3 6.5 20.2l1-6.2L3 9.6l6.2-.9z",
  personi: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0",
  shtoPerson:
    "M10 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM2 21a8 8 0 0 1 13.5-5.8M19 15v6M16 18h6",
  shtepia: "M3 11l9-8 9 8M5 9.5V20h5v-6h4v6h5V9.5",
  filtri: "M4 7h10M18 7h2M4 17h4M12 17h8M16 5v4M10 15v4",
  bllok: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM5.6 5.6l12.8 12.8",
  kerko: "M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM20 20l-4-4",
} as const;

export type EmriIkones = keyof typeof shtigjet;

export default function Ikona({
  emri,
  madhesia = 20,
  className,
}: {
  emri: EmriIkones;
  madhesia?: number;
  className?: string;
}) {
  return (
    <svg
      width={madhesia}
      height={madhesia}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d={shtigjet[emri]} />
    </svg>
  );
}
