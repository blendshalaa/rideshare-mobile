# RideShare — Java 3: kartat dhe faqet

## 1. Çfarë ndërtova

Ndërtova tri ekranet e skicës në Next.js: listën me tri karta udhëtimesh, faqen e detajeve dhe faqen e kërkesës në pritje. Të gjitha të dhënat janë fiktive dhe kërkesa është vetëm simulim, pa rezervim real.

## 2. Skedarët kryesorë

- `aplikacioni/src/lib/udhetimet.ts` — tri udhëtime fiktive (udhëtimi 3 ka 0 vende të lira).
- `aplikacioni/src/components/KartaUdhetimi.tsx` — karta e një udhëtimi.
- `aplikacioni/src/app/page.tsx` — lista me tri kartat.
- `aplikacioni/src/app/udhetimi/[id]/page.tsx` — detajet e udhëtimit dhe butoni “Kërko vend”.
- `aplikacioni/src/app/udhetimi/[id]/kerkesa/page.tsx` — mesazhi “Simulim: Në pritje”.
- `aplikacioni/src/app/not-found.tsx` — faqja “Udhëtimi nuk u gjet”.

## 3. Si ta nis

```
cd aplikacioni
npm install
npm run dev
```

Pastaj hap adresën që jep terminali (zakonisht http://localhost:3000).

## Prova 1 — Lista në telefon

**Hapat:** Hapa adresën kryesore `http://localhost:3000`, pastaj në Chrome kliko me të djathtën → Inspect → ikona e telefonit dhe zgjodha pamjen e telefonit.

**Rezultati:** U shfaqën saktësisht tri karta (Arben Krasniqi, Arta Berisha, Lirim Zenuni) dhe faqja nuk lëviz anash në telefon.

## Prova 2 — Detajet e kartës 2, zero vende dhe ID 99

**Hapat:** Klikova kartën e dytë, pastaj u ktheva dhe hapa kartën e tretë, në fund shkrova me dorë adresën `/udhetimi/99`.

**Rezultati:** Te karta 2 adresa u bë `/udhetimi/2` dhe u shfaq vendtakimi “Stacioni i autobusëve, Prishtinë”; te karta 3 butoni “Nuk ka vende të lira” ishte i çaktivizuar; adresa `/udhetimi/99` shfaqi faqen “Udhëtimi nuk u gjet”.

## Prova 3 — Mesazhi “Në pritje” dhe kthimi mbrapa

**Hapat:** Te detajet e kartës 2 klikova “Kërko vend”, pastaj klikova shigjetën ← dhe në fund “Kthehu te lista”.

**Rezultati:** U shfaq mesazhi “Simulim: Në pritje”, shigjeta më ktheu te detajet dhe “Kthehu te lista” më ktheu te lista, pa asnjë rezervim real.

## Prova me kolegun

Kolegu i kaloi të tri provat dhe arriti të lëvizë listë → detaje → kërkesë → mbrapa pa ndihmë.
