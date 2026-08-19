# Online-Bestellsysteme auf der eigenen Restaurant-Website

**Recherchestand:** 19.08.2026
**Fragestellung:** Wie wickeln Sushi-/Asia-Restaurants (Schwerpunkt Deutschland/München) Online-Bestellungen auf ihrer *eigenen* Domain ab – und was kosten die dahinterliegenden Anbieter?

**Methodik:** Abruf des ausgelieferten HTML-Quelltexts der Startseiten und der jeweiligen Bestell-Unterseiten (`curl`, Browser-User-Agent), Auswertung der eingebundenen Skript-/Bild-/iframe-Domains, Footer-Hinweise und sichtbaren Texte; ergänzend Websuche und Abruf der Anbieter-Preisseiten.

> **Ehrlichkeits-Hinweis zur Datenlage:** Alle Zahlen unten sind entweder direkt aus dem Quelltext/der Anbieterseite zitiert oder mit Quelle belegt. Wo eine Seite nicht erreichbar war oder ein Wert erst nach Adress-/PLZ-Eingabe im JavaScript nachgeladen wird, steht das ausdrücklich als *nicht ermittelbar* dabei. Es wurden **keine** Preise, Provisionen oder Konditionen geschätzt oder ergänzt.

---

## 1. Übersicht der untersuchten Restaurants

| Restaurant | Bestellung auf eigener Seite? | System / Anbieter | Zahlarten | Besonderheiten |
|---|---|---|---|---|
| **shizoo. japanese food** – [shizoo.asia](https://shizoo.asia/) | **Ja**, echter Warenkorb + Checkout auf eigener Subdomain `webshop.shizoo.asia` bzw. `shizoo.simplywebshop.de` | **SIDES** (vormals SimplyDelivery). Footer des Webshops: *„Lieferdienstsoftware und Webshop von SIDES“*. Assets von `sd-images.simplydelivery.io`, `sd-application.simplydelivery.io`, `sd-media.simplydelivery.io`; Shop-Host `*.simplywebshop.de`. Präsentationsseite: WordPress 7.0.4 + Bricks | Nicht aus dem Quelltext ermittelbar (Auswahl erst im Checkout nach Store-/PLZ-Wahl) | Multi-Store mit PLZ-Abfrage und Auswahltabelle „Store / Mbw. / Liefergebühr / Distanz“; Gutschein-Code im Warenkorb; **Pfand-Zeile** im Warenkorb + Verlinkung auf [vytal.org](https://www.vytal.org) (Mehrweg); Google Maps für Liefergebiets-Prüfung und Lieferkosten-Berechnung; **keine** Links zu Lieferando/Wolt/Uber Eats gefunden; keine eigene App verlinkt |
| **Sushi Kimi** – [sushi-kimi-bestellen.de](https://sushi-kimi-bestellen.de/) | **Nicht überprüfbar** (siehe Kasten unten). Indizien aus der öffentlich ausgelieferten `robots.txt` sprechen für einen echten eigenen Checkout | **Nicht identifiziert.** FoodAmigos wurde als Betreiber *ausgeschlossen* (Route-Fingerprint stimmt nicht überein, s.u.) | Nicht ermittelbar | Seite antwortet mit `HTTP 403` + `cf-mitigated: challenge` (Cloudflare „Just a moment…“). Zusätzlich verbietet die `robots.txt` explizit `User-agent: ClaudeBot → Disallow: /` – deshalb wurde **nicht** weiter gecrawlt |
| **Koi Sushi and More** – [koi-sushiandmore.de](https://www.koi-sushiandmore.de/) | **Ja**, kompletter Bestell- und Checkout-Flow auf eigener Domain | **Wix** (`<meta name="generator" content="Wix.com Website Builder">`) mit **Wix Restaurants „Online-Bestellungen (Neu)“**. Assets von `static.parastorage.com`, `static.wixstatic.com`, App-Widget `apps.wixrestaurants.com`, Fehler-Tracking `browser.sentry-cdn.com` | Nicht aus dem Quelltext ermittelbar (Wix-Zahlarten werden erst im Checkout geladen) | Eigene Seiten für *Warenkorbseite*, *Sidebar-Warenkorb*, *Checkout*, *Bestätigungsseite*, *Bestellverfolgung*, *Bestellmethode*, *Mein Konto / Meine Bestellungen / Meine Adressen / Zahlungsdetails*. Drei Bestellarten: **Abholung, Lieferung, Vor-Ort-Bestellungen**. **Abholrabatt: „bei Abholung : 5% Rabatt mit dem Code *abholrabatt* eingeben“**. Felder „Mindestbestellwert: 0,00 €“, „Liefergebühr:“ und „Kostenlose Lieferung über“ sind vorhanden, im Abhol-Modus aber leer/0 – konkrete Lieferwerte erscheinen erst nach Adresseingabe. **Keine** Lieferando-/Wolt-/Uber-Links gefunden. Keine eigene App |
| **Sushi Plus (Maxvorstadt)** – [sushiplus.de](https://sushiplus.de/) | **Ja**, echter Warenkorb + Checkout auf eigener Subdomain `maxvorstadt.sushiplus.de` | **Clickfood GmbH**. Footer: *„Powered by Clickfood GmbH“*; AngularJS-Shop, Assets von `media.clickfood.de/sushiplusMuenchen2/…` | **Barzahlung, PayPal und Kreditkarte (via PayPal)** – wörtlich aus dem Shop-Quelltext: `title="Barzahlung, PayPal und Kreditkarte (via PayPal) möglich"` (+ Icons `barlogo.png`, `pplogo.png`, `kkpplogo.png`) | **Eigene Apps:** iOS [`id1128309188`](https://apps.apple.com/us/app/sushi-plus/id1128309188?l=de), Android [`de.clickfood.sushiplusMuenchen1`](https://play.google.com/store/apps/details?id=de.clickfood.sushiplusMuenchen1). Coupons können **app-exklusiv** geschaltet werden („Dies ist ein exklusives Angebot welches nur *in unserer App* / *auf unserer Webseite* gültig ist“). Kundenkonto (Login/Registrieren), Vorbestellung mit Zeitwahl, PLZ→Filialzuordnung. Lieferzeiten 11:00–14:45 und 17:00–22:00 Uhr, Abholzeiten identisch. Mindestbestellwert/Liefergebühr sind pro Liefergebiet hinterlegt und werden per API nachgeladen – **nicht** im HTML |
| **SAM – Sushi and Meat (Maxvorstadt)** – [sushiandmeat.de](https://sushiandmeat.de/) | **Nein.** Reine Präsentationsseite (Next.js, eigenes Build). „Online bestellen →“ führt auf eine **fremde Domain** | **allO** (allO Eat / allO Gastronomy) – Ziel-Link `https://eat.allo.restaurant/restaurant/sam-sushi-and-meat-maxvorstadt`. Die Startseite selbst lädt nur `fonts.googleapis.com`, `fonts.gstatic.com` und den allO-Link | Die allO-Plattform kennt laut Sprachdatei die Methoden **„Online“ / „Bar“ / „Karte“** (`common-payment-method-app/cash/card`). Welche davon SAM konkret aktiviert hat, ist nicht ermittelbar (Restaurant-Konfiguration wird clientseitig geladen) | **Keine** Lieferando-/Wolt-/Uber-Eats-Links auf der Seite. allO unterstützt laut Sprachdatei Abholung + Lieferung, Mindestbestellwert für Lieferung, Liefergebühr („Keine Liefergebühr“ / „{{amount}}€ Liefergebühr“), Trinkgeld, Gutscheine, Rechnung splitten und QR-/Tischbestellung. Reservierung läuft per `mailto:` |

### Zusatzfunde (optional recherchiert)

| Fund | Beobachtung |
|---|---|
| **sushi-kimimuenchen.de** | Restaurant-Website, die als **Lieferando-/Takeaway.com-Partnerseite** gebaut ist: `<meta name="showOrderModule" content="true">`, `<meta name="orderUrl" content="https://www.lieferando.de/speisekarte/sushi-kimi-mnchen">`, Stylesheet `/assets/css/takeaway.css`. Die Speisekarte ist zwar auf der Seite, der Bestell-Button geht aber zu **Lieferando** – klassisches Beispiel für „Website ja, Umsatz trotzdem über die Plattform“ |
| **sushi-kimi.de** | Läuft auf **FoodAmigos** – belegt durch die eingebetteten Links `sushikimimunchen.foodamigos-storefront.com/speisekarte`, `www.foodamigos-storefront-online-shop.com`, `sushikimimunchen.online-karte.com` sowie Reservierung über `sushikimimunchen-1.tischreservieren.com`. Next.js-Frontend, Analytics via `cloud.umami.is` |
| Sushi Kimi gesamt | Dasselbe Restaurant fährt parallel **mindestens fünf** Kanäle: eigene FoodAmigos-Seite, eine Lieferando-Partnerseite, `sushi-kimi-bestellen.de`, dazu Lieferando, Wolt, Uber Eats, bringbutler und pizabo |
| **sushiya.de / sansaro** | München, gehobene japanische Küche. Kein Bestell-Shop auf der Startseite; Reservierung über **OpenTable** (`cdn.otstatic.com`, `opentable.de`). Es existiert eine Unterseite `/lieferservice/`, die aber hinter einem Bot-Check liegt und deshalb **nicht analysiert** werden konnte |

> ### Warum `sushi-kimi-bestellen.de` nicht analysiert wurde
> Die Domain liegt hinter Cloudflare (`162.159.136.89` / `162.159.135.89`) und liefert auf jede Anfrage `HTTP 403` mit Header `cf-mitigated: challenge` und dem Titel „Just a moment…“ – also eine JavaScript-Challenge. Ein Rendern mit lokalem Chromium war in dieser Umgebung nicht möglich (der Browser kommt nicht durch den Egress-Proxy: `net::ERR_CONNECTION_RESET`, auch für Kontrollziele wie `example.com`).
> Unabhängig davon untersagt die `robots.txt` der Seite `User-agent: ClaudeBot` ausdrücklich (`Disallow: /`); ein Umgehen der Challenge wäre daher auch nicht angemessen gewesen.
>
> **Was sich allein aus der frei ausgelieferten `robots.txt` ablesen lässt** (kein Crawling nötig): Die Seite ist eine SPA mit Restaurant-Slug-Routing und blockt Indexierung für `/*/checkout`, `/*/closed`, `/*/debug`, `/*/imprint`, `/*/profile`, `/*/reset-password`, `/*/terms-of-use`, `/*/cookie-policy`, `/*/privacy-promise`. Ein eigener **Checkout**, **Kundenprofile** und **Passwort-Reset** sprechen klar für ein echtes White-Label-Bestellsystem mit Kundenkonten – nicht für eine bloße Weiterleitung zu Lieferando. **Der Anbieter konnte aber nicht benannt werden.** FoodAmigos wurde geprüft und ausgeschlossen: im JS-Bundle des FoodAmigos-Storefronts (`foodamigos-storefront-online-shop.com/assets/index-OcmMVLq8.js`, 8,5 MB) kommen die Routen `privacy-promise`, `reset-password`, `terms-of-use` und `imprint` **nicht** vor.

---

## 2. Anbieter im Detail – Konditionen (Stand August 2026)

### 2.1 GloriaFood — **wird eingestellt, keine Neuanmeldungen mehr**

**Verifiziert:** Ja, die Einstellung ist auf der Anbieterseite selbst bestätigt. gloriafood.com schreibt wörtlich:

> „GloriaFood has been discontinued and is no longer accepting new signups. We are fully committed to supporting our existing customers throughout this transition.“

**Zum Datum 30.04.2027 – wichtige Einschränkung:** Dieses Datum steht **weder** auf der Startseite **noch** auf der Preisseite von gloriafood.com. Es stammt ausschließlich aus Sekundärquellen, die sich auf In-App-Benachrichtigungen und Partner-E-Mails von Oracle (Käufer von GloriaFood seit 2021) berufen. Diese Quellen sind durchweg Migrations-Anbieter, also nicht neutral, berichten den 30.04.2027 aber übereinstimmend – inkl. Aussage, dass es **keine Datenarchivierung und keinen Read-Only-Zugriff** nach diesem Datum gibt und über 123.000 Restaurants betroffen sind.

**Fazit zur Verifikation:** Einstellung = **bestätigt (Primärquelle)**. Datum 30.04.2027 = **plausibel, aber nur sekundär belegt**.

**Preise** (weiterhin auf der Preisseite gelistet, in **US-Dollar**, nicht EUR):

| Modul | Preis |
|---|---|
| Kernfunktionen (Website-Bestellung, QR-Bestellung, Reservierung, Analytics) | kostenlos |
| Restaurant-POS | US$ 49 / Monat / Standort (2 Jahre Bindung) |
| Online-/Kreditkartenzahlung | US$ 29 / Monat |
| Reservierungs-Anzahlungen | US$ 0,50 / Gast (nur bei angenommenen Buchungen) |
| Advanced Promo Marketing | US$ 19 / Monat |

**Relevanz für ein neues Restaurant: null.** Neuanmeldungen sind bereits geschlossen – GloriaFood ist als Option ausgeschieden, unabhängig vom exakten Abschaltdatum.

Quellen: [gloriafood.com](https://www.gloriafood.com/) · [gloriafood.com/pricing](https://www.gloriafood.com/pricing) · [ogent.ai – GloriaFood Shutdown: April 30, 2027](https://ogent.ai/gloriafood-shutdown) · [Applova](https://applova.io/blog/gloriafood-is-shutting-down-heres-what-restaurants-need-to-do-next/) · [Fleksa](https://fleksa.com/en/blog/gloriafood-shutting-down-what-restaurants-should-do-next) · [Menuro](https://menuro.io/blog/gloriafood-shutting-down-2027/)

---

### 2.2 SIDES (vormals SimplyDelivery) — das System hinter shizoo.asia

Deutscher Anbieter, modulare Gastro-Suite (Kasse mit TSE, provisionsfreier Webshop, eigene App, Küchendisplay, Self-Order-Terminal, Fahrerverwaltung, Warenwirtschaft, Dienstplan, Bonusprogramm, Payment).

**Paketpreise laut [get-sides.de/pakete-preise](https://www.get-sides.de/pakete-preise):**

| Paket | Preis / Monat | Inhalt (Kurzfassung) |
|---|---|---|
| Basic | **74 €** | Kassensystem, Portal-Anbindung, Kundendisplay |
| Web | **239 €** | Basic + Webshop, App, Bonussystem |
| Web & App | **274 €** | Webshop + App-Paket |
| Pro | **399 €** | 2× Kassenplatz, 2× Zusatzlizenzen, erweiterte Module |
| Enterprise | **659 €** | 4× Kassenplatz, 4× Lizenzen, Callcenter inklusive |

**Einzelmodule laut [get-sides.de](https://www.get-sides.de/):** SIDES Shop **149 €/Monat**, SIDES Kiosk **109 €/Monat**, SIDES Kitchen **66 €/Monat**, SIDES Drive **8 €/Monat**.

**Provision:** Der Webshop wird durchgängig als **„0 % Provision“ / „provisionsfreier Webshop“** beworben.

**Zusatzkosten – wörtlich von der Preisseite:** *„Einrichtungs- und Payment-Gebühren sowie Transaktions- und Hardware-Kosten können separat anfallen.“* Konkrete Beträge dafür werden **nicht** veröffentlicht.

**Vertragslaufzeit:** auf der Preisseite **nicht angegeben**.

Quellen: [get-sides.de/pakete-preise](https://www.get-sides.de/pakete-preise) · [get-sides.de](https://www.get-sides.de/) · Live-Beleg: `shizoo.simplywebshop.de` (Footer „Lieferdienstsoftware und Webshop von SIDES“)

---

### 2.3 Sitedish

Niederländischer Anbieter (nach eigenen Angaben >15 Jahre am Markt, >3.500 angebundene Restaurants), Komplettpaket aus eigener Bestellseite, Bestell-App, Kassensystem, Fahrer-App, Marketing-Tools und QR-Bestellung.

**Preis laut [sitedish.nl](https://www.sitedish.nl/): „€1 per dag“** für das Gesamtpaket (Bestelsite & -App, Kassa, BezorgApp, Marketing Tools, QR-bestellen). **Kündigungsfrist: ein Monat** (*„Bij Sitedish hanteren we een opzegtermijn van één maand.“*).

**Zusätzlich genannt (aus Sitedish-Unterseiten, per Suche belegt, auf der abgerufenen Startseite selbst nicht sichtbar): „€1 per dag + €0,30 per online transactie“**, exklusive Hardware-Kauf. Diesen Transaktionsbetrag konnte ich **nicht** auf der Startseite gegenlesen – bitte vor einer Entscheidung beim Anbieter bestätigen lassen.

**Einschränkung zur deutschen Preisliste:** `sitedish.de` und `www.sitedish.de` antworteten am 19.08.2026 durchgehend mit **HTTP 503 (Service Unavailable)**. Eine **deutsche** Preisliste konnte daher **nicht** verifiziert werden; die obigen Zahlen sind die niederländischen Konditionen. Zahlarten wurden auf der abgerufenen Seite nicht ausgewiesen.

Quellen: [sitedish.nl](https://www.sitedish.nl/) · [sitedish.nl – bestelsite & -app](https://www.sitedish.nl/oplossingen/bestelsite-app/) · [sitedish.nl – bespaar €4 per bestelling](https://www.sitedish.nl/bespaar-vier-euro-per-bestelling/)

---

### 2.4 foodamigos (heute: foodamigos.io)

**Wichtig – Domain-Wechsel:** `foodamigos.com` ist heute eine **geparkte GoDaddy-„For Sale“-Seite** (307-Redirect auf `forsale.godaddy.com`). `foodamigos.de` liefert `HTTP 404`, `www.foodamigos.de` war nicht erreichbar. Die aktive Präsenz ist **[foodamigos.io](https://www.foodamigos.io/de)**. Sitz laut Branchenverzeichnissen: Bonn, am Hauptbahnhof.

**Leistungsumfang laut foodamigos.io:** KI-gestützte Restaurant-Website, Online-Shop, **eigene Mobile App** mit Branding und Push-Nachrichten, Treueprogramm mit Punkten, automatisiertes Marketing (E-Mail/SMS, Warenkorb-Abbrecher), provisionsfreie Lieferung mit Fahrern zu Festpreisen, 24/7-Support, **monatlich kündbar**.

**Preise: keine.** Die Preisseite sagt wörtlich *„Transparente Preisgestaltung. Keine versteckten Gebühren. Nur faire Preise.“*, enthält aber **keine einzige konkrete Zahl** – nur einen Preisrechner, dessen Ergebnis erst nach Eingabe erscheint. Auch Setup-Gebühren, Transaktionsgebühren und Zahlarten sind nicht veröffentlicht. **Es lassen sich hier also keine Preise nennen.**

**Live-Beleg aus dieser Recherche:** `sushi-kimi.de` (München) läuft auf FoodAmigos – Storefront unter `sushikimimunchen.foodamigos-storefront.com`, Shop-Bundle von `www.foodamigos-storefront-online-shop.com`, Speisekarte zusätzlich unter `online-karte.com`, Reservierung über `tischreservieren.com`.

Quellen: [foodamigos.io/de](https://www.foodamigos.io/de) · [foodamigos.io/de/pricing](https://www.foodamigos.io/de/pricing) · [foodamigos.io – vs. Lieferando](https://www.foodamigos.io/en/resources/compare-foodamigos/foodamigos-vs-lieferando) · [ProvenExpert-Profil](https://www.provenexpert.com/de-de/foodamigos-online-bestellsystem-restaurant-marketing/)

---

### 2.5 Smoothr

Berliner Anbieter. **Der Produktfokus liegt laut eigener Website nicht auf dem klassischen Liefer-Webshop**, sondern auf: Self-Ordering-Terminals (Software + Hardware), Mobile Ordering & Loyalty, Drive-In mit dynamischen Menu-Boards, Digital Signage, „Coolr“ (KI-Vending), „Connect“ (Anbindung an Lieferplattformen) und Barcode-Self-Checkout. Beworbene Integrationen u.a. Vectron, SAP, Oracle, Lightspeed.

**Preise: keine öffentlichen Angaben.** Weder Monatsgebühr, Setup, Provision noch Transaktionsgebühren sind auf der Website genannt; es gibt keine Preisseite. Auch die unterstützten Zahlungsanbieter werden nicht ausgewiesen. Kontakt laut Website: `info@smoothr.de`, +49 30 311 965 44.

**Einordnung:** Zuschnitt und fehlende Selbstbedienungs-Preise deuten auf ein Enterprise-/Ketten-Vertriebsmodell hin – für ein einzelnes Sushi-Restaurant eher unpassend.

Quelle: [smoothr.de](https://www.smoothr.de/)

---

### 2.6 Lieferengine — **offenbar nicht mehr existent**

`lieferengine.de`, `www.lieferengine.de` und `lieferengine.com` lösen am 19.08.2026 im DNS **gar nicht mehr auf** (`NXDOMAIN`, „Name or service not known“); ein HTTPS-Abruf scheitert entsprechend. Auch eine gezielte Websuche nach `"Lieferengine"` in Kombination mit Bestellsystem/Lieferdienst-Software liefert **keinen** Anbieter dieses Namens, nur andere deutsche Anbieter.

**Ergebnis: Für Lieferengine können keine Konditionen genannt werden – der Anbieter ist unter diesem Namen nicht auffindbar.** Ich habe hier bewusst nichts ergänzt oder geraten.

---

### 2.7 orderbird

Primär ein **Kassensystem**-Anbieter (POS), nicht in erster Linie ein Liefer-Webshop.

**Einschränkung:** `orderbird.com` hat in dieser Session **jeden** Abruf mit `HTTP 403` beantwortet (Startseite, `/de/preise`, `/de/mini-preise-lizenzen`), ebenso das Vergleichsportal trusted.de. Die folgenden Zahlen stammen daher aus **Sekundärquellen**, nicht von orderbird selbst.

**orderbird MINI:**

| Modell | Preis |
|---|---|
| Flexible Monatslizenz | **39 € / Monat**, monatlich kündbar |
| Jahreslizenz | **348 € / Jahr** (rechnerisch 29 €/Monat) |
| 5-Jahreslizenz | **1.299 € / 5 Jahre** (rechnerisch ca. 21,65 €/Monat) |
| Kartenzahlung | **1,75 % Transaktionsgebühr** pro Transaktion |

Enthalten sind laut Quellen Kassensoftware, Barcodescanner, Bondrucker und Kartenleser; jedes Modell ist finanzamtkonform mit zertifizierter Online-TSE.

**Zum Bestellsystem:** orderbird bietet ein **Bestellsystem für den Abhol-Service**. Einen verifizierten Preis für ein Liefer-Webshop-Modul – und belastbare Zahlen für orderbird PRO – konnte ich **nicht** ermitteln, weil die Anbieterseite blockiert war. Diese Lücke lasse ich hier bewusst offen.

Quellen: [trusted.de – orderbird Kosten](https://trusted.de/orderbird-kosten) · [bizguide24 – orderbird Test](https://bizguide24.de/kassensystem/orderbird-kassensystem-test/) · [kassensystemevergleich.de](https://www.kassensystemevergleich.de/orderbird/) · [orderbird.com/de/mini-preise-lizenzen](https://www.orderbird.com/de/mini-preise-lizenzen) (403 in dieser Session)

---

### 2.8 Lieferando (Just Eat Takeaway) — Provision für Restaurants in Deutschland

**Wichtige Vorbemerkung:** Lieferando veröffentlicht **keine feste Preisliste**. Die AGB legen keinen Satz fest; die Provision wird pro Restaurant individuell im Anmeldeformular verhandelt. Die Anmeldeseite `lieferando.de/de/restaurant-anmelden` hat in dieser Session `HTTP 403` geliefert, konnte also nicht direkt zitiert werden. Die folgenden Werte sind branchenübliche Sätze aus Fachquellen (Stand 2026):

| Position | Satz |
|---|---|
| **Eigenlieferung** (eigene Fahrer / eigener Logistikpartner) | **13 – 14 %** vom Bestellwert; 13 % wird als der offiziell auf der Anmeldeseite kommunizierte Basissatz genannt (Stand April 2026) |
| **Lieferung durch Lieferando-Fahrer** | **25 – 31 %** (je nach Quelle 25–30 % bzw. 30–31 %) |
| **Service-Gebühr an den Endkunden** (seit 02.04.2025) | bei Eigenlieferung **2,5 %** des Bestellwerts, max. **0,99 €**; bei Plattformlieferung **bis 5 %**, max. **1,49 €** |
| Zahlungsabwicklung (Kartenzahlung des Kunden) | **0,3 – 1,5 %** |
| Optionale Sichtbarkeit („TopRank“ / Premium-Platzierung) | **50 – 400 € / Monat**, keine öffentliche Preisliste |
| Grundgebühr / Monatspauschale | keine |

**Vertragliche Nebenbedingung:** Es gilt eine **Preisparitäts-Klausel** („Gleicher-Preis-Garantie“) – die Preise auf Lieferando dürfen nicht höher sein als in den eigenen Kanälen. Die Provision lässt sich also **nicht** durch einen Aufschlag auf der Plattform ausgleichen. Genau das ist das stärkste betriebswirtschaftliche Argument für einen eigenen Shop.

Quellen: [gastroinsider.de – Lieferando Kosten Restaurant 2026](https://gastroinsider.de/blog/lieferando-kosten-restaurant) · [gastro-master.de – Lieferando-Provision 2026](https://gastro-master.de/de/blog/lieferando-provision-2026) · [gastro25.de – Provision berechnen](https://gastro25.de/ratgeber/lieferando-provision-berechnen) · [delovery.io](https://www.delovery.io/de/blog/lieferando-provision-was-restaurants-wirklich-zahlen) · [get-sides.de – Lieferando-Provision vs. eigener Webshop](https://www.get-sides.de/blog/lieferando-provision-eigener-webshop/) (Anbieter-Quelle, entsprechend interessengeleitet)

---

### 2.9 Wolt — Provision für Restaurants in Deutschland

**Was Wolt selbst sagt** ([merchant.wolt.com – Händlergebühren & Provisionen](https://merchant.wolt.com/de/deu/learning-center/wolt-merchant-fees-and-commissions)): Für jede Bestellung über den Wolt-Marketplace fällt ein **Prozentsatz auf die Zwischensumme** an („Provisionssatz“). Zusätzlich existiert eine **Plattformgebühr** („an additional charge beyond your commission“). Für **Wolt+**-Bestellungen gilt ein **etwas höherer** Prozentsatz (bzw. je nach Markt ein Festbetrag), für **Abholung/Takeaway** ein **reduzierter** Satz. **Konkrete Prozentzahlen veröffentlicht Wolt nicht** – wörtlich: *„The commissions and fees charged by Wolt are described in more detail in your contract with Wolt.“* Laut Wolt-FAQ fällt außerdem **keine Anmeldegebühr** an und die Partnerschaft ist jederzeit kündbar.

**Branchenübliche Sätze aus Fachquellen (Stand 2026):**

| Position | Satz |
|---|---|
| Lieferung durch Wolt-Kuriere | **25 – 30 %** vom Bestellwert |
| Eigene Lieferung | ca. **15 %** |
| Abholung / Takeaway | **unter 15 %** |
| Anmeldegebühr | **0 €** |
| Monatliche Fixkosten | **0 €** |
| Hardware (Tablet) | wird gestellt, Kosten werden über die Auszahlungen verrechnet |

Auszahlungsrhythmus wählbar: alle 5 Tage, zweimal monatlich oder monatlich.

Quellen: [merchant.wolt.com – Gebühren & Provisionen](https://merchant.wolt.com/de/deu/learning-center/wolt-merchant-fees-and-commissions) · [Wolt Merchant FAQ Deutschland](https://explore.wolt.com/de/deu/merchants/faq) · [gastroinsider.de – Wolt Kosten Restaurant](https://gastroinsider.de/blog/wolt-kosten-restaurant-vergleich) · [gastrorocket.de – Wolt Partner](https://gastrorocket.de/partner/wolt-partner)

---

### 2.10 Weitere Systeme, die in dieser Recherche real im Einsatz gefunden wurden

Diese standen nicht auf der Anbieterliste, tauchten aber bei den untersuchten Restaurants tatsächlich auf:

| System | Beleg | Preise |
|---|---|---|
| **Clickfood GmbH** | `maxvorstadt.sushiplus.de`, Assets `media.clickfood.de`, Footer „Powered by Clickfood GmbH“ | Keine öffentliche Preisliste gefunden. Liefert nachweislich **native iOS- und Android-Apps** pro Filiale sowie Barzahlung/PayPal/Kreditkarte-via-PayPal |
| **Wix Restaurants – Online-Bestellungen (Neu)** | `koi-sushiandmore.de`, Widget `apps.wixrestaurants.com` | Kosten = Wix-Business-Tarif + Wix-Payments-Transaktionsgebühren. **Konkrete EUR-Beträge für 2026 wurden in dieser Recherche nicht verifiziert** und werden hier deshalb nicht genannt |
| **allO (allO Eat)** | `eat.allo.restaurant`, verlinkt von `sushiandmeat.de` | Keine öffentlichen Preise ermittelt. Wichtig: Der Shop läuft auf **allO-Domain**, nicht auf der Restaurant-Domain |
| **Lieferando/Takeaway.com Restaurant-Website** | `sushi-kimimuenchen.de` (`takeaway.css`, `orderUrl` → lieferando.de) | Für Partner kostenlos – aber jede Bestellung läuft über Lieferando und damit über die Provision |

---

## 3. Fazit: die zwei sinnvollsten Lösungen für ein einzelnes Sushi-Restaurant in München

### Vorab: die Rechnung, die alles entscheidet

Ein eigener Shop lohnt sich ab dem Punkt, an dem die Monatspauschale unter der eingesparten Provision liegt. Bei Lieferando-Eigenlieferung (13 %) gilt:

| Monatspauschale | Break-even beim monatlichen Online-Bestellwert |
|---|---|
| 30 € (Sitedish-Niveau, „€1 pro Tag“) | ca. **230 €** |
| 149 € (SIDES Shop) | ca. **1.150 €** |
| 239 € (SIDES Web) | ca. **1.840 €** |
| 274 € (SIDES Web & App) | ca. **2.110 €** |

*(Eigene Rechnung: Pauschale ÷ 0,13. Setup-, Payment- und Transaktionskosten sind darin nicht enthalten – diese veröffentlicht SIDES nicht.)*

Bei Lieferando-**Fahrer**-Lieferung (25–31 %) halbiert sich der Break-even nochmals. Für ein Sushi-Restaurant mit typisch hohem Durchschnittsbon ist die Schwelle also schon bei sehr moderatem Online-Umsatz erreicht. Entscheidend ist außerdem die Preisparitäts-Klausel: Auf Lieferando lässt sich die Provision **nicht** einpreisen – im eigenen Shop schon.

### Empfehlung 1: **SIDES (Paket „Web“ bzw. „Web & App“, alternativ nur „SIDES Shop“)**

**Warum:**
- **Direkt im Zielsegment belegt.** shizoo.asia – ein Münchner Sushi-Lieferdienst – fährt genau darauf: eigener Warenkorb, Checkout, PLZ-basiertes Liefergebiet mit Mindestbestellwert und Liefergebühr pro Store, Gutschein-Codes, Abholung, sogar Mehrweg-/Pfandlogik. Das ist kein Prospektversprechen, sondern live nachprüfbar.
- **Einzige Option mit öffentlich nachlesbaren, konkreten Preisen** (74 / 239 / 274 / 399 / 659 € pro Monat, Einzelmodul Shop 149 €) – bei foodamigos, Smoothr, Clickfood und allO gibt es schlicht keine.
- **0 % Provision** auf den Webshop, dazu deutscher Anbieter mit TSE-konformer Kasse aus einer Hand – relevant, wenn Kasse und Online-Bestellung ohnehin zusammenwachsen sollen.
- Das Paket „Web & App“ (274 €) enthält eine **eigene App** – der Hebel für Stammkunden, den Sushi Plus über Clickfood mit app-exklusiven Coupons bereits vorexerziert.

**Was zu klären ist, bevor unterschrieben wird:** Einrichtungs-, Payment- und Transaktionsgebühren sowie die Vertragslaufzeit stehen **nicht** auf der Preisseite. Beides muss vor der Entscheidung schriftlich vorliegen.

### Empfehlung 2: **Wix Restaurants „Online-Bestellungen (Neu)“**

**Warum:**
- **Ebenfalls in München am Sushi-Restaurant belegt:** koi-sushiandmore.de hat damit einen vollständigen Bestellweg auf eigener Domain – Warenkorb, Checkout, Bestätigungsseite, Bestellverfolgung, Kundenkonto mit Adressen und Zahlungsdetails, dazu Abholung, Lieferung **und** Vor-Ort-Bestellung.
- **Niedrigste Einstiegshürde von allen untersuchten Lösungen.** Kein separater Software-Vertrag, kein Kassensystem-Zwang, keine Mindestlaufzeit-Diskussion; Website und Shop kommen aus einem System, das das Restaurant selbst pflegen kann.
- Rabattmechanik ist eingebaut und wird real genutzt – Koi steuert damit den **5 % Abholrabatt über den Code „abholrabatt“**, also genau den Hebel, mit dem sich margenstarke Selbstabholung gegen die Lieferplattformen ausspielen lässt.
- **Ehrlich dazu:** Ich habe die konkreten Wix-Kosten für 2026 (Business-Tarif + Wix-Payments-Transaktionsgebühren) in dieser Recherche **nicht verifiziert** und nenne sie deshalb nicht. Das ist vor einer Entscheidung nachzuholen. Fachlich ist Wix außerdem schwächer bei komplexer Lieferlogistik (Fahrerdisposition, mehrere Zonen, Callcenter) – für **einen** Standort in München ist das aber meist kein Limit.

### Warum die übrigen Anbieter ausscheiden

| Anbieter | Grund |
|---|---|
| **GloriaFood** | Eingestellt, **keine Neuanmeldungen mehr möglich** (Primärquelle). Abschaltung zum 30.04.2027 sekundär belegt, ohne Datenarchiv. Als Neuwahl ausgeschlossen |
| **Lieferengine** | Domains lösen im DNS nicht mehr auf; kein Anbieter dieses Namens auffindbar |
| **Smoothr** | Produktfokus auf Terminals/Drive-In/Digital Signage und Enterprise-Integrationen; keinerlei öffentliche Preise – für einen Einzelstandort unpassend |
| **foodamigos (foodamigos.io)** | Fachlich passend (Shop + eigene App + Loyalty, monatlich kündbar) und mit `sushi-kimi.de` sogar ein Münchner Sushi-Referenzkunde. Aber: **keine einzige veröffentlichte Zahl**, dazu ein Domain-Wechsel, bei dem die alte `.com` heute zum Verkauf steht – als Zweitangebot einholen, nicht blind wählen |
| **Sitedish** | Mit „€1 pro Tag“ preislich mit Abstand am attraktivsten. Aber: `sitedish.de` war während der Recherche durchgehend mit HTTP 503 offline, die deutsche Preisliste ließ sich nicht verifizieren, und die zusätzlich genannten 0,30 € pro Online-Transaktion konnte ich auf der Startseite nicht gegenlesen. Vor einer Entscheidung schriftlich bestätigen lassen |
| **orderbird** | Kassensystem-Anbieter; MINI ab 39 €/Monat bzw. ca. 21,65 €/Monat bei 5 Jahren, 1,75 % Kartengebühr. Ein verifizierter Preis für einen **Liefer**-Webshop war nicht ermittelbar (Anbieterseite blockte mit 403) |
| **allO** | Funktional vollständig (Abholung, Lieferung, Mindestbestellwert, Trinkgeld, QR-Tischbestellung), aber der Shop läuft auf **eat.allo.restaurant** statt auf der eigenen Domain – genau das Ziel „Bestellung auf der eigenen Seite“ wird damit verfehlt |
| **Lieferando / Wolt** | Als **zusätzlicher** Reichweitenkanal sinnvoll, nie als einziger: 13–14 % (Eigenlieferung) bis 31 % Provision, dazu Preisparität bei Lieferando, die eine Weitergabe der Kosten vertraglich ausschließt |

### Praxis-Empfehlung in einem Satz

Der Weg, den die untersuchten Münchner Sushi-Restaurants faktisch gehen, ist **beides parallel**: eigener provisionsfreier Shop als Hauptkanal plus Lieferando/Wolt für Neukunden-Reichweite – wobei der eigene Shop über Abholrabatt (Koi: 5 %) und app-exklusive Coupons (Sushi Plus) gezielt attraktiver gemacht wird als die Plattform.
