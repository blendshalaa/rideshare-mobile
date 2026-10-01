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

## 4. Provat

**Prova 1 — Lista në telefon:** Te adresa kryesore shfaqen saktësisht tri karta dhe në pamjen e telefonit në Inspect nuk ka lëvizje anash.

**Prova 2 — Detajet, zero vende dhe ID 99:** Kur klikoj kartën e dytë adresa bëhet `/udhetimi/2` dhe shfaqet vendtakimi “Stacioni i autobusëve, Prishtinë”; te karta 3 butoni “Nuk ka vende të lira” është i çaktivizuar, ndërsa `/udhetimi/99` shfaq “Udhëtimi nuk u gjet”.

**Prova 3 — Kërkesa dhe kthimi mbrapa:** Pas klikimit “Kërko vend” shfaqet “Simulim: Në pritje”, dhe me shigjetën ← ose “Kthehu te lista” kthehem mbrapa pa asnjë rezervim real.

## 5. Prova me kolegun

Kolegu i kaloi të tri provat dhe arriti të lëvizë listë → detaje → kërkesë → mbrapa pa ndihmë.
