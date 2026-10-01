# RideShare — Java 3

## Çfarë ndërtova
Sot përfundova tri ekranet e RideShare në Next.js: listën me tri karta udhëtimesh (`KartaUdhetimi.tsx` me të dhënat nga `udhetimet.ts`), faqen e detajeve të udhëtimit `/udhetimi/[id]` dhe faqen e kërkesës në pritje, si dhe faqen “Udhëtimi nuk u gjet”.

## Provat që bëra
### Prova 1: Lista në telefon
Hapa faqen kryesore në pamjen e telefonit (Inspect → ikona e telefonit); prisja tri karta pa lëvizje anash; pashë saktësisht tri karta (Arben Krasniqi, Arta Berisha, Lirim Zenuni) dhe faqja nuk lëvizte anash.

### Prova 2: Detajet e udhëtimit të dytë
Klikova kartën 2; prisja adresën /udhetimi/2 dhe vendtakimin e saj; pashë adresën /udhetimi/2 dhe vendtakimin “Stacioni i autobusëve, Prishtinë”.
Shënova edhe çfarë ndodhi te karta 3 (zero vende) dhe te /udhetimi/99: te karta 3 butoni “Nuk ka vende të lira” ishte i çaktivizuar, ndërsa /udhetimi/99 shfaqi faqen “Udhëtimi nuk u gjet”.

### Prova 3: Kërkesa në pritje
Klikova Kërko vend; prisja “Simulim: Në pritje”, pa rezervim real; pashë mesazhin “Kërkesa u dërgua!” dhe “Simulim: Në pritje”, pa asnjë rezervim real. Pastaj u ktheva te detajet dhe lista: shigjeta ← më ktheu te detajet e udhëtimit dhe butoni “Kthehu te lista” më ktheu te lista me tri kartat.

## Çfarë do të përmirësoj
Javën tjetër dua ta ruaj kërkesën në mënyrë që faqja “Kërkesat” të tregojë kërkesat e dërguara, sepse tani “Në pritje” është vetëm simulim dhe zhduket kur kthehem te lista.

## Ndihma nga AI (Artificial Intelligence – inteligjencë artificiale)
AI (Claude) më ndihmoi të krijoj projektin Next.js, të shkruaj kodin e kartave dhe të faqeve dhe ta formuloj këtë raport; vetë i hapa faqet në shfletues, provova klikimet dhe adresat dhe kontrollova rezultatet.
