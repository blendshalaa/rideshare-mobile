const ngjyrat = ["#2563eb", "#db2777", "#059669", "#d97706", "#7c3aed"];

export default function Avatar({
  id,
  emri,
  madhesia = 48,
}: {
  id: string;
  emri: string;
  madhesia?: number;
}) {
  const inicialet = emri
    .split(" ")
    .map((p) => p.charAt(0))
    .join("")
    .slice(0, 2);
  const ngjyra = ngjyrat[(Number(id) || 0) % ngjyrat.length];

  return (
    <div
      className="avatar"
      style={{ width: madhesia, height: madhesia, background: ngjyra }}
      aria-hidden="true"
    >
      {inicialet}
    </div>
  );
}
