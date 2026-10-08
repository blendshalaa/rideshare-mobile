# RideShare — Java 4 · Neon dhe PostgreSQL

## Çfarë ndërtova
Lista dhe detajet tani i lexojnë udhëtimet nga tabela `udhetimet` në Neon (PostgreSQL): `src/lib/db.ts` krijon lidhjen vetëm në server me `DATABASE_URL`, ndërsa `lexoUdhetimet()` dhe `gjejUdhetimin(id)` te `src/lib/udhetimet.ts` bëjnë pyetjet SQL; faqet kanë `dynamic = "force-dynamic"`, prandaj çdo rifreskim lexon të dhënat e reja nga databaza.

## Provat që bëra
### Prova 1: Ndryshimi në databazë shfaqet në aplikacion
Ndryshova orën e ID 2 nga 08:15 në 08:25 me `UPDATE udhetimet SET ora = '08:25' WHERE id = '2';`.
Pas rifreskimit lista tregoi 08:25 te karta e Fushë Kosovës dhe detajet e `/udhetimi/2` treguan gjithashtu 08:25, pa ndryshuar kodin.
E ktheva orën në 08:15 dhe pas rifreskimit të dyja faqet treguan sërish 08:15; ID 3 kishte ende zero vende (butoni i çaktivizuar) dhe `/udhetimi/99` shfaqi “Udhëtimi nuk u gjet”.

### Prova 2: Lista bosh dhe rikthimi
Shtova `WHERE false` vetëm te pyetja e `lexoUdhetimet`.
U shfaq mesazhi “Nuk ka udhëtime për momentin.”, ndërsa në databazë mbetën 3 rreshta (nuk fshiva asgjë). Pasi hoqa `WHERE false`, u kthyen tri kartat.

### Prova 3: Lidhja mungon, rikthimi dhe siguria
Ndryshova përkohësisht emrin `DATABASE_URL` në `DATABASE_URL_PA_TEST` në `.env.local`, rinisa serverin dhe u shfaq mesazhi “Nuk u lidhëm me databazën. Provo përsëri.”
Riktheva emrin `DATABASE_URL`, rinisa serverin dhe aplikacioni punoi sërish me tri kartat. `.env.local` mungon në listën e ndryshimeve të Git/GitHub Desktop, sepse `.gitignore` ka rreshtin `.env*`.

## Ku gjendet puna
- `aplikacioni/schema.sql` — tabela dhe tri udhëtimet fiktive.
- Skedarët që ndryshova: `aplikacioni/src/lib/db.ts`, `aplikacioni/src/lib/udhetimet.ts`, `aplikacioni/src/app/page.tsx`, `aplikacioni/src/app/udhetimi/[id]/page.tsx`, `aplikacioni/src/app/udhetimi/[id]/kerkesa/page.tsx`, `aplikacioni/src/components/KartaUdhetimi.tsx`, `aplikacioni/package.json`.
- Repository: https://github.com/blendshalaa/rideshare-mobile
- Aplikacioni nuk është ende në Vercel; provat u bënë lokalisht.

## Çfarë mbetet për përmirësim
Aplikacioni vetëm lexon udhëtime fiktive dhe ndryshimet bëhen vetëm në SQL; hapi im i ardhshëm është ta publikoj në Vercel me të njëjtën databazë Neon. Kërkesa “Në pritje” mbetet simulim; nuk ka rezervim real.

## Ndihma nga AI (Artificial Intelligence – inteligjencë artificiale)
AI (Claude) më ndihmoi të krijoj projektin Neon `rideshare-java4`, të ekzekutoj `schema.sql`, të përshtat kodin dhe dizajnin me databazën, dhe ekzekutoi tri provat në kompjuterin tim; unë kontrollova rezultatet e provave dhe që `.env.local` nuk shkon në GitHub.
