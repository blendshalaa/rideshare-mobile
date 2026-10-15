# RideShare — Java 5 · Hyrja dhe lejet

## Çfarë ndërtova
Shtova hyrjen me GitHub (NextAuth) dhe panelin `/panel`. **Identiteti** tregon kush je: GitHub e verifikon llogarinë dhe sesioni mban ID-në tënde GitHub. **Roli** tregon çfarë lloj përdoruesi je: ruhet në tabelën `profilet` në Neon (`udhetar` ose `shofer`) dhe nuk zgjidhet nga formulari. **Pronësia** tregon cili udhëtim është i yti: kolona `udhetimet.shofer_id`. Serveri (`src/lib/lejet.ts`) e lejon ndryshimin e orës vetëm kur ke hyrë, je shofer dhe udhëtimi të përket ty; pronarin e merr nga sesioni, jo nga fusha e formularit.

## Provat që bëra
### Prova 1: Hyrja, rifreskimi dhe dalja
Hapa /panel pa hyrë, hyra me GitHub, rifreskova, pastaj dola.
Para hyrjes paneli shfaqte vetëm butonin “Hyr me GitHub”; pas hyrjes dhe pas rifreskimit shfaqej “Përshëndetje, Blend Shala.” me rolin shofer; pas klikimit “Dil” paneli kërkoi përsëri “Hyr me GitHub”.

### Prova 2: Shoferi ndryshon udhëtimin e vet
Si shofer i ID 2 e ndryshova orën në 08:25.
Paneli shfaqi “Ora u ruajt me sukses.” dhe “Ora aktuale në databazë: 08:25”; lista (karta Fushë Kosovë), detajet e `/udhetimi/2` dhe pyetja në Neon treguan të gjitha 08:25. E riktheva orën në 08:15 nga paneli dhe Neon tregoi sërish 08:15.

### Prova 3: Veprimi pa leje refuzohet
Nga formulari i hapur ndryshova ID në 1 dhe provova Ruaj.
U shfaq mesazhi “Nuk ke leje për këtë udhëtim. Ora nuk ndryshoi.” (adresa `/panel?m=ndaluar`). Me `SELECT id, ora FROM udhetimet` në Neon verifikova që ID 1 mbeti 08:00 dhe ID 2 mbeti 08:15; pas rifreskimit formulari u kthye te ID 2.

## Ku gjendet puna
- Repository: https://github.com/blendshalaa/rideshare-mobile
- `aplikacioni/schema-java05.sql` — tabela `profilet` dhe kolona `shofer_id`.
- Skedarët e rinj: `aplikacioni/src/lib/auth.ts`, `aplikacioni/src/app/api/auth/[...nextauth]/route.ts`, `aplikacioni/src/components/Hyrja.tsx`, `aplikacioni/src/lib/lejet.ts`, `aplikacioni/src/app/panel/actions.ts`, `aplikacioni/src/app/panel/page.tsx`; ndryshuar: `aplikacioni/src/app/page.tsx` (lidhja “Hyr / Paneli im”).
- Aplikacioni nuk është publikuar në Vercel; provat u bënë lokalisht.

## Çfarë mbetet për përmirësim
Kërkesa për vend është ende simulim dhe formulari i shoferit ndryshon vetëm ID 2. Më pas do të shtoja tabelën `kerkesat`, ku udhëtari ruan kërkesën dhe shoferi i udhëtimit e pranon ose e refuzon nga paneli.

## Ndihma nga AI (Artificial Intelligence – inteligjencë artificiale)
AI (Claude) më ndihmoi të instaloj NextAuth, të ekzekutoj SQL-në në Neon, të përshtat panelin me dizajnin dhe të rregulloj fushën e orës (tani tregon orën aktuale nga databaza, në format 24-orësh). Hyrjen e parë me GitHub e bëra vetë; tri provat i ekzekutoi AI në shfletues të automatizuar me një sesion testimi për llogarinë time, dhe rezultatet u verifikuan në Neon.
