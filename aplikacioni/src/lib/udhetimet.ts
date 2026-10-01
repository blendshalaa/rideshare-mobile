// Të dhëna fiktive — nuk ka rezervim real, vetëm simulim.

export type Udhetimi = {
  id: string;
  shoferi: string;
  vleresimi: number;
  numriVleresimeve: number;
  makina: string;
  ngjyra: string;
  nga: string;
  deri: string;
  vendtakimi: string;
  data: string;
  ora: string;
  vendeTeLira: number;
  pershkrimi: string;
};

export const udhetimet: Udhetimi[] = [
  {
    id: "1",
    shoferi: "Arben Krasniqi",
    vleresimi: 4.8,
    numriVleresimeve: 12,
    makina: "Toyota Corolla",
    ngjyra: "e zezë",
    nga: "Prishtina",
    deri: "AAB",
    vendtakimi: "Sheshi Nëna Terezë, Prishtinë",
    data: "E shtunë, 4 Tetor",
    ora: "08:30",
    vendeTeLira: 3,
    pershkrimi:
      "Udhëtim i rregullt për në AAB. Jam i hapur për ndalesa të vogla nëse ka nevojë.",
  },
  {
    id: "2",
    shoferi: "Arta Berisha",
    vleresimi: 4.6,
    numriVleresimeve: 8,
    makina: "VW Golf",
    ngjyra: "e bardhë",
    nga: "Prishtina",
    deri: "AAB",
    vendtakimi: "Stacioni i autobusëve, Prishtinë",
    data: "E shtunë, 4 Tetor",
    ora: "09:15",
    vendeTeLira: 2,
    pershkrimi: "Nisemi saktë në orar. Ju lutem ejani 5 minuta më herët.",
  },
  {
    id: "3",
    shoferi: "Lirim Zenuni",
    vleresimi: 4.9,
    numriVleresimeve: 20,
    makina: "Skoda Octavia",
    ngjyra: "gri",
    nga: "Prishtina",
    deri: "AAB",
    vendtakimi: "Te Pallati i Rinisë, Prishtinë",
    data: "E shtunë, 4 Tetor",
    ora: "10:00",
    vendeTeLira: 0,
    pershkrimi: "Makina është plot për këtë udhëtim.",
  },
];

export function gjejUdhetimin(id: string): Udhetimi | undefined {
  return udhetimet.find((u) => u.id === id);
}

export function tekstiVendeve(n: number): string {
  if (n === 0) return "Nuk ka vende të lira";
  if (n === 1) return "1 vend i lirë";
  return `${n} vende të lira`;
}
