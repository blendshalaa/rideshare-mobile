# RideShare — Java 8

## Çfarë ndërtova
Shtova komponentin klient `Vendtakimi` për udhëtimin ID 2. Arta mund të klikojë “Merr vendndodhjen time”; leja kërkohet vetëm atëherë, jo kur hapet faqja. Nëse lejon, shfaqet “Pozicioni u mor” dhe saktësia në metra, por koordinatat nuk tregojnë emrin e vendit, prandaj Arta shkruan dhe konfirmon vetë vendtakimin (p.sh. Biblioteka). Nëse leja refuzohet (code 1), pozicioni nuk është i disponueshëm (code 2), koha mbaron (code 3) ose shfletuesi nuk ka `navigator.geolocation`, pritja mbaron me mesazh të veçantë dhe fusha manuale mbetet aktive. Teksti vetëm me hapësira nuk konfirmohet. Komponenti përdoret te detajet e udhëtimit dhe te faqja e provës `/java-08-test`, që ka udhëtimin fiktiv të Dritonit pa databazë.

## Provat që bëra
### Prova 1: Leja nuk kërkohet sapo hapet faqja.
Hapat: hapa `/java-08-test` me një numërues që regjistron çdo thirrje të `getCurrentPosition`; pastaj me pozicion prove (saktësia 37 m) dhe leje të dhënë klikova “Merr vendndodhjen time” dhe konfirmova Biblioteka.
Pritshmëria: në hapje gjendja `idle` dhe asnjë kërkesë për vendndodhje; pas klikimit “Pozicioni u mor” dhe saktësia.
Vëzhgimi: në hapje u shfaq “Leja kërkohet vetëm kur klikon butonin.”, gjendja ishte `idle` dhe `getCurrentPosition` u thirr 0 herë. Pas klikimit u shfaq “Pozicioni u mor. Shkruaj vetë emrin e vendtakimit.” dhe “Saktësia rreth: 37 m”; butoni u bë sërish aktiv dhe vendtakimi i konfirmuar u bë Biblioteka.

### Prova 2: Refuzimi i lejes nuk e bllokon përdoruesin.
Hapat: hapa faqen pa dhënë leje për vendndodhjen, klikova butonin, shkrova Parkingu dhe konfirmova. Pastaj, si **simulim**, zëvendësova përkohësisht `getCurrentPosition` që të kthejë gabimin `{ code: 3 }` dhe klikova përsëri.
Pritshmëria: pritja mbaron me mesazhin e refuzimit dhe vendtakimi manual konfirmohet; në simulimin e timeout-it pritja mbaron dhe mund të provoj sërish.
Vëzhgimi: u shfaq “Leja u refuzua. Shkruaj vendtakimin vetë.” (`denied`), butoni u bë “Provo sërish” dhe Parkingu u konfirmua. Në simulim gjendja kaloi nga `loading` në `timeout` me “Koha mbaroi. Provo sërish ose shkruaj vendtakimin vetë.” dhe Biblioteka u konfirmua manualisht. Pa `navigator.geolocation` u shfaq “Ky shfletues nuk e mbështet vendndodhjen. Shkruaj vendtakimin vetë.” dhe fusha manuale punoi. Vonesën reale nuk e provova.

### Prova 3: Dëshmitë në GitHub nuk tregojnë adresën time reale.
Hapat: kontrollova të gjithë skedarët që do të publikohen për numra me formë koordinatash, fjalët latitude/longitude, lidhje databaze, sekrete, email dhe skedarë `.env`.
Pritshmëria: asnjë koordinatë reale, adresë ose sekret në repository.
Vëzhgimi: nuk u gjet asnjë. Prova u bë vetëm me pozicion fiktiv në shfletues të automatizuar; komponenti nuk i shfaq dhe nuk i ruan koordinatat, vetëm saktësinë. Gjatë kontrollit gjeta gabimisht `package.json` dhe `node_modules/` në rrënjë nga instalimi i mjetit të provës; i fshiva para commit-it.

## Ku gjendet puna
- Repository: https://github.com/blendshalaa/rideshare-mobile
- `aplikacioni/src/components/Vendtakimi.tsx` — komponenti (funksionet `kerkoVendndodhjen`, `kurMerretPozicioni`, `kurDeshtonLeximi`, `konfirmoVendtakimin`).
- `aplikacioni/src/app/java-08-test/page.tsx` — faqja e provës me udhëtimin fiktiv të Dritonit.
- `aplikacioni/src/app/udhetimi/[id]/page.tsx` — përdor të njëjtin komponent te detajet.
- `mobile-week08.json` — konfigurimi i testit.
- Demonstrimi nuk është publikuar në Vercel.

## Çfarë mbetet për përmirësim
Vendtakimi i konfirmuar ruhet vetëm në gjendjen e faqes në këtë shfletues: humbet pas rifreskimit dhe Dritoni nuk e sheh, sepse nuk dërgohet te serveri. Hapi i ardhshëm është ta ruaj në Neon pas konfirmimit dhe ta shfaq te paneli i shoferit.

## Ndihma nga AI (Artificial Intelligence – inteligjencë artificiale)
AI (Claude) bëri pothuajse gjithë punën: shkroi komponentin, faqen e provës dhe konfigurimin, ekzekutoi tetë sjelljet dhe tri provat me shfletues të automatizuar e pozicion fiktiv, dhe shkroi këtë raport. Unë zgjodha të punoj kështu për mungesë kohe; provat nuk i kam përsëritur ende vetë dhe duhet ta përgatis shpjegimin për klasë.

## Prova me një hyrje të re
Nuk e kam bërë ende me koleg; e provova vetëm në shfletues të automatizuar dhe do ta demonstroj në klasë.
- Hyrja që provova: tekst me vetëm hapësira (“    ”) pasi Biblioteka ishte konfirmuar.
- Parashikimi im para klikimit: shfaqet gabim dhe Biblioteka mbetet e konfirmuar.
- Çfarë pashë realisht: “Shkruaj një vendtakim para se ta konfirmosh.” dhe vendtakimi i konfirmuar mbeti Biblioteka.
- Skedari dhe funksioni që e shpjegojnë: `aplikacioni/src/components/Vendtakimi.tsx`, funksioni `konfirmoVendtakimin` — `teksti.trim()` heq hapësirat dhe, kur mbetet bosh, vendos gabimin pa ndryshuar `konfirmuar`.
- Çfarë kuptova ose korrigjova: `trim()` e bën tekstin me hapësira të barabartë me tekst bosh; nuk korrigjova asgjë.

Këtë pjesë e shpjegoj në klasë. Kontrolli automatik nuk verifikon vërtetësinë e provës.
