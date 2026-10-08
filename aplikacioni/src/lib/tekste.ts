export function tekstiVendeve(n: number): string {
  if (n === 0) return "Nuk ka vende të lira";
  if (n === 1) return "1 vend i lirë";
  return `${n} vende të lira`;
}
