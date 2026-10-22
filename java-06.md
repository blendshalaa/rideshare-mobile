# RideShare — Java 6 · PWA dhe puna offline

## Çfarë ndërtova
**Manifesti** (`src/app/manifest.ts` → `/manifest.webmanifest`) i jep aplikacionit emrin “RideShare AAB”, ikonat dhe pamjen standalone, që të mund të instalohet si aplikacion; nuk ruan të dhëna. **Service worker** (`public/sw.js`) qëndron mes faqes dhe rrjetit: kur ka internet e merr listën nga serveri (Next.js → Neon) dhe ruan një kopje me kohën e ruajtjes; kur serveri nuk arrihet, kthen kopjen e ruajtur dhe faqen `offline.html`. **Kopja publike në pajisje** (Cache Storage `rideshare-public-v1`) përmban vetëm `/api/udhetimet` me gjashtë fushat publike, faqen offline dhe ikonat — asnjë profil, sesion, panel ose sekret.

## Provat që bëra
### Prova 1: Manifesti dhe vizita online
Hapa `http://localhost:3000/manifest.webmanifest`: emri “RideShare AAB”, `display: standalone` dhe dy ikona 192×192 dhe 512×512; `/icons/icon-192.png` dhe `/icons/icon-512.png` u hapën si PNG. Pas hapjes së faqes kryesore me internet, `/sw.js` ishte aktiv (activated) dhe Cache Storage → `rideshare-public-v1` përmbante `/offline.html`, dy ikonat dhe `/api/udhetimet`; `/offline.html` tregoi tri kartat, “Lista erdhi nga serveri” dhe kohën e ruajtjes. Instalimin në telefon nuk e provova.

### Prova 2: Pa internet dhe pas rifreskimit
E simulova ndërprerjen me modalitetin Offline të shfletuesit (si Network → Offline në DevTools), pastaj rifreskova `/`. Faqja erdhi nga service worker dhe u hapën tri kartat (Prishtinë 08:00, Fushë Kosovë 08:15, Lipjan 07:45) me “Ruajtur për herë të fundit” dhe mesazhin “Lista e fundit e ruajtur · Mund të jetë vjetruar. Serveri nuk u arrit.” Nuk ishte konfirmim rezervimi, sepse kjo është vetëm kopje leximi: butoni “Kërko vend” ishte i çaktivizuar dhe asgjë nuk dërgohet te serveri.

### Prova 3: Lidhja rikthehet
Me RideShare offline, ndryshova ID 2 në Neon nga 08:15 në 08:25; kopja offline vazhdoi të tregonte 08:15 me mesazhin e listës së ruajtur. Pasi riktheva lidhjen dhe klikova “Rifresko listën”, ID 2 tregoi 08:25, mesazhi u bë “Lista erdhi nga serveri” dhe koha e ruajtjes u përditësua. Riktheva 08:15 në Neon dhe pas rifreskimit lista tregoi sërish 08:15.

## Ku gjendet puna
- Repository: https://github.com/blendshalaa/rideshare-mobile
- Skedarët e shtuar: `aplikacioni/src/app/manifest.ts`, `aplikacioni/public/icons/icon-192.png`, `aplikacioni/public/icons/icon-512.png`, `aplikacioni/src/app/api/udhetimet/route.ts`, `aplikacioni/public/sw.js`, `aplikacioni/public/offline.html`, `aplikacioni/src/components/Pwa.tsx`; ndryshuar: `aplikacioni/src/app/layout.tsx`.
- Aplikacioni nuk është publikuar në Vercel; provat u bënë në localhost.

## Çfarë mbetet për përmirësim
Në vizitën e parë pa internet nuk ka kopje: faqja offline shfaq “Ende nuk ka listë të ruajtur. Hape aplikacionin me internet dhe provo përsëri.” Leximi offline tregon vetëm listën e fundit të ruajtur, që mund të jetë e vjetër, dhe nuk hap detajet, panelin ose kërkesën për vend; më pas do të ruaja edhe faqet e detajeve dhe do t’i ofroja instalimin në telefon pas publikimit në Vercel me HTTPS.

## Ndihma nga AI (Artificial Intelligence – inteligjencë artificiale)
AI (Claude) më ndihmoi të shtoj manifestin, API-në, service worker-in dhe faqen offline, të gjeneroj ikonat dhe ta përshtat faqen offline me dizajnin e aplikacionit. Tri provat i ekzekutoi AI me shfletues të automatizuar në modalitetin offline dhe ndryshimin e orës e verifikoi në Neon; unë i kontrollova rezultatet.
