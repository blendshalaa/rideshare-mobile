# RideShare — Java 10

## Çfarë ndërtova
Kërkesa për vend nuk është më simulim: udhëtari e dërgon me një veprim në server, dhe ajo ruhet në tabelën e re `kerkesat` në Neon me statusin `ne_pritje`. Shoferi pronar e pranon me një veprim tjetër në server, që në një deklaratë të vetme SQL e bën statusin `pranuar` dhe e ul numrin e vendeve me 1. Te detajet e udhëtimit, komponenti `SinkronizimiUdhetimit` lexon gjendjen nga `/api/udhetimi/[id]/gjendja` menjëherë dhe pastaj çdo 5 sekonda, pa Refresh manual. Shoferi sheh kërkesat e udhëtimit të vet, udhëtari vetëm kërkesën e vet, dhe identiteti merret nga sesioni. Ndryshimi ndaj javës 9: atje ylli ruante vetëm preferimin e një përdoruesi; tani dy përdorues të ndryshëm shohin të njëjtën gjendje nga serveri, dhe kur leximi dështon ekrani mban vlerat e fundit me “Po rilidhemi” në vend që të tregojë 0.

Plotëso fushat e modelit me vëzhgimet e tua para dorëzimit. Pjesa e përgjigjes së GitHub-it përditësohet pas dorëzimit të parë.

## Përgatitja e provës
Udhëtimi fiktiv ID 2 (Ferizaj → AAB, 10:05) me 2 vende fillestare; për Rastin 3 udhëtimi i dytë fiktiv ID 4 (Ferizaj → AAB, 12:30) me 2 vende. Roli shofer pronar: llogaria ime (pronar i ID 2 dhe ID 4 në `shofer_id`). Roli udhëtar: një profil prove “Arta (provë)” vetëm në databazën e laboratorit. Sesionet ishin të ndara: dy kontekste të veçanta shfletuesi, si një dritare normale dhe një private, secili me cookie-n e vet të sesionit. Provat u bënë me shfletues të automatizuar në 375 px dhe me sesione testimi të krijuara me sekretin lokal të NextAuth; asnjë fjalëkalim nuk u nda.

## Provat që bëra
### Prova 1: Rasti 1 · Kërkesa mbërrin te shoferi
- Hapat: hapa `/udhetimi/2` te shoferi dhe te udhëtarja; të dy treguan “Vende të lira 2”, shoferi “Ende pa kërkesë” dhe udhëtarja “Pa kërkesë”. Udhëtarja klikoi “Kërko një vend”.
- Çfarë prisja: udhëtarja sheh “Në pritje”, shoferi e sheh kërkesën brenda leximit të radhës (≤ 5 s), vendet mbeten 2.
- Çfarë pa realisht shoferi dhe udhëtari, pa Refresh: udhëtarja pas 0,5 s pa “Në pritje · Kërkesa u dërgua”; shoferi pas 3,6–4,1 s pa “Kërkesa e Arta (provë): Në pritje” dhe butonin “Prano kërkesën”. Të dy treguan ende 2 vende.
- Ku e verifikova ruajtjen: në tabelën `kerkesat` në Neon ishte një rresht me statusin `ne_pritje`, ndërsa `udhetimet.vende` mbeti 2.

### Prova 2: Rasti 2 · Pranimi përditëson të dy ekranet
- Hapat dhe vendet para/pas: shoferi klikoi “Prano kërkesën”. Para: 2 vende dhe `ne_pritje`. Pas: shoferi pa “U pranua · Pranimi u ruajt” dhe 1 vend; udhëtarja, pa Refresh, pa “U pranua · Vendi u konfirmua” dhe 1 vend. Neon: `vende = 1`, `statusi = pranuar`.
- Përsëritja e pranimit dhe prova me 0 vende: e ridërgova dy herë të njëjtën kërkesë pranimi te serveri; të dyja herët përgjigjja ishte “Kërkesa ishte pranuar tashmë; vendet nuk ndryshuan.” dhe Neon mbeti me 1 vend. Me të dhëna prove e ktheva kërkesën në pritje dhe vendet në 0; pranimi dha “Nuk ka vende të lira. Kërkesa mbetet në pritje.”, vendet mbetën 0 (jo negative) dhe statusi `ne_pritje`. Pastaj i riktheva 2 vende.
- Çfarë pashë realisht te të dy përdoruesit: të njëjtin numër vendesh dhe të njëjtin status në të dy ekranet pas çdo leximi. Gjatë provës së parë gjeta dy gabime të mia: pranimi refuzohej gjithmonë si “Nuk ka vende” sepse PostgreSQL e llogariste `1 / 0` që në planifikim, dhe një lexim i vjetër mbishkruante gjendjen e re pas dërgimit. I korrigjova dhe e përsërita provën me sukses.

### Prova 3: Rasti 3 · Ndërprerja dhe rilidhja
- ID-ja e udhëtimit të ri të provës, cila dritare ishte offline dhe si e provova: ID 4 me 2 vende. Udhëtarja dërgoi kërkesën, pastaj vetëm dritarja e saj u vu offline (si DevTools → Network → Offline), ndërsa shoferi mbeti online dhe e pranoi kërkesën.
- Pamja e fundit gjatë ndërprerjes: udhëtarja mbajti “Vende të lira 2” dhe “Në pritje”, me paralajmërimin “Po rilidhemi · të dhënat mund të jenë të vjetra. Veprimet që kërkojnë rrjet janë të bllokuara.” Numri nuk u bë 0. Në të njëjtën kohë shoferi dhe Neon tregonin 1 vend dhe `pranuar`.
- Çfarë ndryshoi pas rilidhjes: pasi u kthye rrjeti, pa Refresh manual, pas 0,5 s udhëtarja pa “U pranua · Vendi u konfirmua” dhe 1 vend, dhe paralajmërimi u hoq pas leximit të suksesshëm.

## Ku gjendet puna
- Repository: https://github.com/blendshalaa/rideshare-mobile
- Skema/migrimi: `aplikacioni/schema-java10.sql` (tabela `kerkesat` me `UNIQUE (udhetim_id, udhetar_id)` dhe udhëtimi fiktiv ID 4).
- Logjika në server: `aplikacioni/src/lib/kerkesat.ts` (`lexoGjendjen`, `dergoKerkesen`, `pranoKerkesen`).
- Rruga e leximit të gjendjes: `aplikacioni/src/app/api/udhetimi/[id]/gjendja/route.ts` (`GET`, `Cache-Control: private, no-store`).
- Veprimi i pranimit dhe i kërkesës: `aplikacioni/src/app/udhetimi/[id]/actions.ts` (`pranoKerkesenVeprim`, `dergoKerkesenVeprim`).
- Leximi automatik: `aplikacioni/src/components/SinkronizimiUdhetimit.tsx`, i përdorur te `aplikacioni/src/app/udhetimi/[id]/page.tsx`.
- Demonstrimi nuk është publikuar në Vercel.

## Prova me kolegun
Nuk e kam bërë ende me koleg; do ta demonstroj në klasë. E provova vetëm me një hyrje tjetër: kërkesë në pritje me 0 vende. Parashikimi: pranimi refuzohet dhe vendet nuk bëhen negative. Vëzhgimi: “Nuk ka vende të lira. Kërkesa mbetet në pritje.” dhe vendet mbetën 0. Funksioni që e shpjegon: `pranoKerkesen` te `aplikacioni/src/lib/kerkesat.ts`, ku kërkesa ndryshon vetëm nëse ul edhe vendin, përndryshe gjithë deklarata hidhet poshtë.

## Çfarë mbetet për përmirësim
Leximi çdo 5 sekonda nuk garanton vetë rezervim të saktë: ndërmjet dy leximeve ekrani mund të jetë i vjetër, prandaj rregulli i vendeve kontrollohet në server në momentin e pranimit. Shoferi nuk mund ta refuzojë ose anulojë një kërkesë, dhe udhëtari nuk mund ta tërheqë. Leximi i vazhdueshëm shkakton kërkesa edhe kur asgjë nuk ndryshon. Hapi i ardhshëm: refuzimi/anulimi dhe një version numerik i gjendjes, që klienti të mos e rishkruajë ekranin pa nevojë.

## Ndihma nga AI (Artificial Intelligence – inteligjencë artificiale)
AI (Claude) bëri pothuajse gjithë punën: krijoi tabelën në Neon, shkroi logjikën në server, rrugën e leximit, komponentin dhe këtë raport, dhe ekzekutoi tri provat me shfletues të automatizuar, me dy sesione testimi dhe një profil udhëtareje prove. Gjatë provave AI gjeti dhe korrigjoi dy gabime në kodin e vet. Unë zgjodha të punoj kështu për mungesë kohe; provat nuk i kam përsëritur ende vetë dhe duhet ta përgatis shpjegimin për kolegun dhe për klasën.

## Pas dorëzimit të parë — përditëso më vonë
Ky seksion mund të mbetet kështu në dorëzimin e parë. Pasi të marrësh përgjigjen, shto linkun e Issue-t, commit-in e kontrolluar dhe çfarë kaloi ose duhet korrigjuar. 2/2 teknikisht nuk provon funksionimin e aplikacionit.
