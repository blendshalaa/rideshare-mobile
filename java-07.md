# RideShare · Java 7

Ruaje si **java-07.md**, pranë README në rrënjën e repository-t tënd. Plotëso me vëzhgimet e tua dhe plotëso çdo vend bosh përpara dorëzimit. Ruaj titujt dhe etiketat. Para/Pas janë dy URL të plota commit-esh nga i njëjti repository, me kodin e plotë prej 40 shenjash.

Pas Commit dhe Push, hap formularin e lëndës për **Java 7** dhe vendos linkun kryesor të repository-t. Rezultati vjen te komenti **Kontrolli automatik i dorëzimit**, nga github-actions[bot], në Issue-n tënd. Lexo 5/5 dhe çdo ✅/❌; nëse korrigjon, bëj Push dhe komento **rikontrollo** te i njëjti Issue. 5/5 është kontroll teknik, jo notë.

## Rasti im
GitHub: blendshalaa
Kodi: P7-985
Skenari i zgjedhur (numri dhe titulli, nga Rastet 1–5): Rasti 2 · Pa vende
ID i udhëtimit në projektin tim: 2
Të dhënat fiktive të rastit: Ferizaj → AAB, 10:05, 2 vende. Ora për provën e re: 10:10.

## Parashikimi
Në listë pres kartën Ferizaj → AAB me orën 10:05 dhe 2 vende të lira. Kur e hap, adresa duhet të jetë /udhetimi/2 dhe detajet duhet të tregojnë të njëjtat vlera. Kur vendet bëhen 0 në Neon, pres që lista dhe detajet të thonë qartë se nuk ka vende, butoni të jetë i çaktivizuar dhe të mos premtohet asnjë vend ose rezervim.

## Dy probleme
1. Te detajet e ID 2 numri i vendeve përsëritej: me 2 vende shfaqej “Vende të lira: 2” dhe “2 vende të lira”, ndërsa me 0 vende “Vende të lira: 0” dhe “Nuk ka vende të lira”. Hapat: vendos `vende = 0` për ID 2 në Neon dhe hap `/udhetimi/2`.
2. Pa internet, hapja e `/udhetimi/2` jep gabimin e shfletuesit `ERR_INTERNET_DISCONNECTED`, pa asnjë mesazh nga aplikacioni, sepse `sw.js` shërben kopjen vetëm për `/` dhe `/offline.html`. Hapat: hap faqen kryesore me internet, ndalo rrjetin dhe hap `/udhetimi/2`. Këtë problem nuk e korrigjova.

## Korrigjimi
Skedari: aplikacioni/src/app/udhetimi/[id]/page.tsx
Ky skedar lexon udhëtimin nga Neon sipas ID-së dhe shfaq detajet, si dhe lidhjen “Kërko vend” ose butonin e çaktivizuar kur vendet janë 0. Etiketën “Vende të lira: {numri}” e ndryshova në “Vendet”, sepse rreshti poshtë saj e tregon tashmë gjendjen. Teksti “Nuk ka vende të lira” mbetet te rreshti dhe te butoni i çaktivizuar.

## Versionet
Para: https://github.com/blendshalaa/rideshare-mobile/commit/9cc63e2c0d52fd7bcaac370c293e56d13082abe5
Pas: https://github.com/blendshalaa/rideshare-mobile/commit/2b4b7b85f5d6138a6eae5e0e1f316e35025d1efa

## Provat që bëra
### Prova 1
Hapat: Hap faqen kryesore në 375 px, kliko kartën Ferizaj → AAB, pastaj “Kërko vend”.
Pritshmëria: E njëjta orë dhe të njëjtat vende në listë e detaje, adresa `/udhetimi/2`, dhe te kërkesa vetëm simulim, pa rezervim.
Vëzhgimi: Lista dhe detajet treguan Ferizaj → AAB, 10:05, 2 vende të lira; adresa u bë `/udhetimi/2`. Te `/udhetimi/2/kerkesa` u shfaq “Simulim: Në pritje” dhe “Kërkesa për Ferizaj nuk është dërguar te shoferi.”

### Prova 2
Hapat: Vendos `vende = 0` për ID 2 në Neon dhe hap `/udhetimi/2`, listën dhe `/udhetimi/2/kerkesa`.
Pritshmëria: Numri i vendeve nuk përsëritet me “Vende të lira: 0”, butoni është i çaktivizuar dhe nuk ka lidhje për kërkesë.
Vëzhgimi: Detajet treguan “Vendet: Nuk ka vende të lira”, pa “Vende të lira: 0”; butoni “Nuk ka vende të lira” ishte i çaktivizuar dhe nuk kishte lidhje kërkese. Lista tregoi “Nuk ka vende të lira” dhe adresa direkte e kërkesës “Nuk ka vende të lira.” Teksti përsëritet ende te rreshti dhe te butoni. Pastaj i ktheva 2 vende.

### Prova 3
Hapat: Me 2 vende, ndrysho vetëm orën e ID 2 në 10:10 në Neon dhe rifresko listën e detajet; pastaj rikthe 10:05.
Pritshmëria: Lista dhe detajet tregojnë 10:10 pa ndryshim kodi, dhe 10:05 pas rikthimit.
Vëzhgimi: Lista dhe detajet treguan 10:10 me “2 vende të lira”; pas rikthimit detajet dhe Neon treguan 10:05.

## Ndryshimi i ri
Nuk e kam demonstruar ende me koleg dhe nuk e kam shpjeguar në klasë; do ta bëj në takimin e radhës. Në provë ndryshoi vetëm ora në 10:10: parashikimi ishte që lista dhe detajet ta tregojnë pa ndryshim kodi, dhe ashtu doli, sepse të dyja faqet e lexojnë ID 2 nga Neon në çdo kërkesë.

## Ndihma nga AI
AI (Claude) bëri këtë javë pothuajse të gjithë punën, ndonëse udhëzimi kërkon që parashikimi dhe korrigjimi të bëhen nga studenti: shkroi parashikimin, gjeti dy problemet, zgjodhi dhe shkroi korrigjimin, ndryshoi të dhënat në Neon, ekzekutoi tri provat me shfletues të automatizuar dhe shkroi këtë raport. Unë zgjodha të punoj kështu për mungesë kohe dhe bëra Push e dorëzimin. Provat nuk i kam përsëritur ende vetë.
