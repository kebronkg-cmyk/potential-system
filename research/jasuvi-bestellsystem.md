# Jasuvi München — Analyse des bestehenden Online-Bestellsystems

**Recherchestand:** 19. August 2026
**Untersuchtes Restaurant:** Jasuvi, Bachbauernstraße 5, 81241 München (Tel. 089 92740177)
**Charakter dieses Dokuments:** Reine Recherche. Es wurden keine Dateien der Website geändert.

---

## 1. Kurzfassung (TL;DR)

| Frage | Antwort |
|---|---|
| Gibt es ein eigenes Bestellsystem? | **Nein.** Jasuvi hat kein eigenes System. Bestellungen laufen über **Lieferando.de** (sowie Wolt und Uber Eats). |
| Funktioniert auf `jasuvi-munchen.de` ein echter Warenkorb? | **Nein.** Die Seite zeigt die volle Karte mit Preisen, der Warenkorb ist per JavaScript **aktiv deaktiviert**. Jeder Klick führt zu `lieferando.de`. |
| Wer betreibt `jasuvi-munchen.de`? | **Lieferando.de** (Just Eat Takeaway.com) — sogenannte „Satelliten-/Minisite". Steht wörtlich im Seitenkopf. |
| Was ist `restaurant-reservieren-lieferservice.de`? | Ein **Affiliate-/SEO-Verzeichnis** mit Google-AdSense. Kein Bestellsystem, keine Speisekarte, keine echten Daten. |
| Preise identisch mit `jasuvi.de`? | **Nein.** Die Lieferando-Preise liegen durchgängig **ca. 24–33 % über** der Hauskarte (Median ≈ +27 %). |
| Gibt es eine App? | Keine eigene Jasuvi-App. Aber die Plattform-Apps von Lieferando, Wolt und Uber Eats. |
| In eigene Website einbindbar? | Nur als **Button-Widget / Deeplink** (offizielles Takeaway-Widget, iframe-basiert). **Kein** einbettbarer Warenkorb, **kein** Checkout im eigenen Layout. |
| Ist die Seite gepflegt? | **Ja, aktiv.** Jüngste Kundenbewertung vom **17. Aug 2026**. Öffnungszeiten stimmen mit `jasuvi.de` überein. |

**Wichtigste Konsequenz für ein Redesign:** Ein Relaunch von `jasuvi.de` kann Lieferando **nicht** als eingebetteten Checkout übernehmen. Technisch möglich ist nur ein „Jetzt bestellen"-Button, der den Gast wegleitet. Wer Bestellungen auf der eigenen Domain abwickeln will, braucht ein eigenes Bestellsystem — der Preisvergleich unten zeigt, dass dafür wirtschaftlich erheblicher Spielraum besteht.

---

## 2. Methodik und ehrliche Grenzen der Recherche

**Was direkt geprüft wurde:**
- Roh-HTML aller drei genannten Seiten (per HTTP abgerufen, nicht nur gerendert)
- Das JavaScript der Satellitenseite (`/assets/js/app.js`, 658 KB) — Logik des Bestellmoduls
- Die offizielle Takeaway-Widget-Auslieferung (`widgets.takeaway.com/buttons/buttons.js`) und eine gerenderte Widget-Instanz
- Die offizielle Lieferando-PDF-Anleitung zum „JETZT BESTELLEN"-Button
- `jasuvi.de` inkl. Speisekarte, Kontakt und Impressum
- Der server-gerenderte Datensatz der Wolt-Venue-Seite (enthält echte Gebühren- und Zonendaten)

**Was NICHT ermittelt werden konnte — bitte beachten:**

1. **`lieferando.de/speisekarte/jasuvi` selbst war nicht abrufbar.** Die Domain ist durch Cloudflare-Bot-Schutz geschützt und liefert auf jeden automatisierten Zugriff **HTTP 403** („Just a moment…"). Auch die Takeaway-API (`cw-api.takeaway.com`) antwortet mit 403. Ein Browser-Zugriff (Playwright/Chromium) scheitert in dieser Sandbox an der Netzwerkschicht (`ERR_CONNECTION_RESET`, auch bei unproblematischen Domains).
   **Folge:** **Mindestbestellwert, Liefergebühr, Lieferradius/Postleitzahlen und Abholrabatt speziell bei Lieferando konnten NICHT verifiziert werden.** Die Angaben in Abschnitt 7 stammen daher, wo möglich, aus verifizierten Alternativquellen (Wolt) und sind klar als solche gekennzeichnet. Es wurde nichts geschätzt oder erfunden.
2. **Uber Eats** (`ubereats.com/de/store/jasuvi/...`) antwortete ebenfalls mit **HTTP 403**. Die Listung ist über die Websuche belegt, die Konditionen dort sind ungeprüft.
3. **Die Hauskarte auf `jasuvi.de` ist ein Bild-Scan** (30 PNG-Seiten, keine Textebene). Die Preise wurden visuell von den Seiten abgelesen. Es wurden **4 der 30 Seiten** vollständig ausgewertet — die Aussage „durchgängig teurer" stützt sich auf 16 gegenübergestellte Positionen aus diesen Seiten, nicht auf die komplette Karte.
4. **Alter der Hauskarte:** Die Menü-Bilder liegen unter `wp-content/uploads/2025/03/` und `2025/04/`, wurden also im **März/April 2025** hochgeladen. Sie könnten inzwischen veraltet sein. Ein Teil der Preisdifferenz kann daher schlicht ein Preisstand-Unterschied sein und nicht nur Plattform-Aufschlag. Das lässt sich ohne Rückfrage beim Restaurant nicht auflösen.

---

## 3. Seite 1: `https://www.jasuvi-munchen.de/`

### 3.1 Wer betreibt die Seite — die Belege aus dem Quelltext

Der Anbieter ist **nicht versteckt**, er steht offen im Markup:

```html
<div class="powerbyheader">
  <div class="image"><img src="/tpl/templaterevamped/images/home.svg" alt="Lieferando logo"/></div>
  <div class="text">Diese Website wird betrieben und verwaltet durch <p>Lieferando.de</p></div>
</div>
```

Weitere technische Indizien, alle aus dem Roh-HTML:

| Fundstelle | Inhalt | Aussage |
|---|---|---|
| Konfigurations-Objekt im `<head>` | `var site = { domain: 'lieferando.de', cc: '2', tz: 'Europe/Berlin', … }` | Seite ist eine Instanz der Lieferando-Plattform |
| Restaurant-Logo | `//static.lieferando.de/images/restaurants/de/**R511P713**/logo_465x320.png` | Interne Restaurant-ID bei Lieferando: **R511P713** |
| Hintergrundbild | `//static.takeaway.com/images/generic/heroes/51/51_sushi_25.jpg` | Assets vom Mutter-CDN **takeaway.com** |
| Tracking | Google Tag Manager `GTM-MLGFNTGL`, Legacy-UA `UA-7904955-1` | Zentraler Lieferando-Container |
| Analytics-Payload | `"pageGroup":"satellite_menu"` bzw. `"satellite_contact"`, `"country":"lieferando.de"` | Lieferando bezeichnet die Seite intern selbst als **„Satellite"** |
| Template-Marker (letzte Zeile) | `<!--templaterevamped--><!--ip-10-14-11-234-->` | Serverseitiges Template + interne AWS-IP |
| Footer-Logo | Verlinkt auf `https://www.lieferando.de/` | — |
| Server-Header | `Server: openresty/1.31.1.1`, `X-Varnish: 74590069` | Lieferando-Infrastruktur (nginx/OpenResty + Varnish) |
| Interner Kommentar im JS | `/* DH migration */` mit Cookie `realRefr = 'dh'` | Überbleibsel der Migration von **Delivery Hero** (Lieferheld/pizza.de) zu Lieferando, 2018/19 |

**Kein `<meta name="generator">` vorhanden.** Es gibt **keine iframes** im Dokument. Alle CSS/JS-Dateien liegen unter der eigenen Domain (`/style/style.css`, `/assets/css/takeaway.css`, `/assets/js/app.js`, `/js/jquery-3.1.1.min.js`) — der Verweis auf den Anbieter erfolgt über die CDN-Domains `static.lieferando.de` und `static.takeaway.com`.

### 3.2 Impressum der Seite (`/colofon`)

> „**Van Giang Than** handelt im Namen von Jasuvi, Bachbauernstraße 5, 81241 München. Sende uns eine E-Mail. Fax: 0800 202 07 702. Plattform der EU-Kommission zur Online-Streitbeilegung: https://ec.europa.eu/consumers/odr. Wir sind ein professioneller Anbieter. Erfahre mehr darüber, wie wir gemeinsam mit Lieferando.de die Verbraucherverantwortung übernehmen."

Der Betreiber ist juristisch das Restaurant (Van Giang Than), die technische Plattform ist Lieferando. Die Fax-Nummer 0800 202 07 702 ist eine Lieferando-Sammelnummer. Weitere Rechtsseiten (`/terms`, `/privacystatement`, `/cookiestatement`) sind Lieferando-Standardseiten.

### 3.3 Funktioniert dort ein echter Warenkorb? — **Nein.**

Das ist der zentrale Befund. Die Seite **sieht** aus wie ein Shop, ist aber keiner.

**Beleg 1 — Steuerflags im `<head>`:**
```html
<meta name="showOrderModule" content="false" />
<meta name="orderUrl" content="https://www.lieferando.de/speisekarte/jasuvi">
<meta name="orderButtonText" content="Online Essen bestellen">
```

**Beleg 2 — die Warenkorb-Funktionen sind leere Stubs:**
```html
<script>
  function addBasket() {}
  function menucard_ShowSideDishes() {}
</script>
```

**Beleg 3 — jeder Produkt-Button trägt die Klasse `order-not-available`:**
```html
<div class="menucard-container order-not-available">
  …
  <div class="addtobasket order-not-available"
       onclick="addSimpleProductBasket(event, 'templaterevamped'); return false;"
       data-productId="P3QR03307ON" …>
```

**Beleg 4 — die Logik in `/assets/js/app.js` (entminifiziert, gekürzt):**
```js
// Beim Laden:
var e = document.querySelector('meta[name="showOrderModule"]');
"true" === (e ? e.getAttribute("content").trim() : "")
  && (new JetFm).init().then(function (ok) { ok || hideOrderModuleForExperiment(); });

// Andernfalls:
hideOrderModuleForExperiment = function () {
  var url = document.querySelector('meta[name="orderUrl"]').getAttribute("content").trim();
  var t = new URL(url, window.location.origin);
  t.searchParams.set("pemid", "mini");          // -> ...?pemid=mini
  …
  document.querySelectorAll(".addtobasket")
          .forEach(function (el) { el.style.pointerEvents = "none"; });   // Klicks tot
  // Pseudo-Elemente der Bestell-Buttons entfernen, .staticBasket durch
  // einen Weiterleitungs-Button auf lieferando.de ersetzen
};
```

**Auslegung:** Die Lieferando-Satellitenplattform **kann** ein eingebettetes Bestellmodul (intern „**JetFm**") anzeigen. Für Jasuvi ist dieses Modul per Flag **abgeschaltet**. Stattdessen werden alle Warenkorb-Klicks per `pointer-events: none` blockiert und der Warenkorb-Bereich durch einen Weiterleitungs-Button ersetzt.

### 3.4 Der tatsächliche Bestellablauf — Schritt für Schritt

**Auf `jasuvi-munchen.de` (verifiziert):**

1. Gast öffnet die Seite und sieht die **vollständige Speisekarte mit Preisen** — 30 Kategorien, **207 Artikel**, inkl. Beschreibungen, Allergen-Kennzeichnungen (`data-allergens="G,A,C,F"`) und `schema.org/Product`-Auszeichnung.
2. Gast klickt auf ein Gericht oder den „+"-Button.
3. **Nichts passiert.** Der Klick ist per JavaScript deaktiviert, es wird kein Warenkorb gefüllt, kein Zwischenspeicher angelegt.
4. Der einzige funktionierende Weg ist der Button **„Online Essen bestellen"**:
   ```html
   <a class="btn-order-online" href="https://www.lieferando.de/speisekarte/jasuvi" rel="nofollow">
   ```
   bzw. der per JS erzeugte Ersatz-Warenkorb mit `…/speisekarte/jasuvi?pemid=mini`.
5. Der Gast **verlässt die Domain** und landet auf `lieferando.de`.

**Ab `lieferando.de` (NICHT verifizierbar — Bot-Schutz, siehe Abschnitt 2):**

Ab hier greift der Standardablauf der Lieferando-Plattform: Lieferadresse/PLZ eingeben → Liefern oder Abholen wählen → Artikel in den Warenkorb → Mindestbestellwert erreichen → Kontaktdaten → Zahlart → Bestellung abschicken → Live-Tracking. **Dieser Ablauf ist im Rahmen dieser Recherche nicht direkt beobachtet worden** und wird hier nur als bekannte Plattformmechanik genannt.

**Fazit:** Ein echter Warenkorb mit Checkout existiert — aber **nicht auf `jasuvi-munchen.de`**, sondern ausschließlich auf `lieferando.de`. Die Satellitenseite ist ein SEO-Schaufenster mit Weiterleitung.

---

## 4. Seite 2: `https://www.jasuvi-munchen.de/contact`

Technisch dieselbe Plattform, dieselben Flags (`showOrderModule=false`), derselbe Lieferando-Header. Inhalt:

**Kontakt:** Jasuvi, Bachbauernstraße 5, 81241 München
**Geo-Koordinaten (schema.org):** 48.14786 / 11.458365

**Lieferzeiten laut dieser Seite:**

| Tag | Zeiten |
|---|---|
| Montag – Freitag | 11:30 – 14:45 und 17:30 – 21:45 |
| Samstag | 12:00 – 14:45 und 17:30 – 21:45 |
| Sonntag | Geschlossen |

Die Seite enthält **keine Telefonnummer** — der Gast wird bewusst nicht am Kanal Lieferando vorbeigeleitet. Auf `jasuvi.de` steht die Nummer dagegen prominent (089 92740177).

---

## 5. Seite 3: `https://www.restaurant-reservieren-lieferservice.de/speisekarte/jasuvi`

**Das ist kein Bestellsystem.** Es handelt sich um ein Affiliate-Verzeichnis, das mit Restaurantdaten Werbeeinnahmen erzielt.

**Technische Einordnung:**
- Uraltes Frontend: **Bootstrap 2** (`bootstrap.min.css`, `bootstrap-responsive.min.css`), jQuery 3.6.1, Google-Font „Lobster", Leaflet 1.9.3 + OpenStreetMap, Cloudflare Rocket Loader
- **Drei Google-AdSense-Blöcke** (`ca-pub-3884369372091232`) — das Geschäftsmodell
- StatCounter-Tracking (`sc_project=11877725`)
- Footer: `2012-2026 / Restaurant-Reservieren-Lieferservice.de (v.1.3)`
- Kein Meta-Generator, kein CMS erkennbar (handgeschriebenes PHP)

**Die „Bestellen"-Buttons sind reine Affiliate-Links** — kein einziger führt zu einem eigenen Warenkorb:

| Button | Ziel | Netzwerk |
|---|---|---|
| „Online bestellen – Lieferando.de" | `awin1.com/awclick.php?…&awinaffid=85858&…&p=https%3A%2F%2Fwww.lieferando.de%2F` | **Awin** |
| „Jetzt reservieren" | `quandoo-de.pxf.io/c/44991/1079555/13701?u=…quandoo.de/munchen` | **Impact/PXF (Quandoo)** |
| „Online bestellen – Wolt.com" | `clk.tradedoubler.com/click?p=329505&a=3070336` | **Tradedoubler** |

Bemerkenswert: Die Links führen **nicht** zur Jasuvi-Seite, sondern nur auf die **Startseiten** der Plattformen. Der Gast muss dort neu suchen.

**Datenqualität — schlecht:**
- **Keine Speisekarte.** Wörtlich: *„Bitte rufen Sie die Lieferservice / Restaurant direkt über dem heutigen Menü zu fragen."*
- Küche als *„Oriental"* bezeichnet (Jasuvi ist japanisch/vietnamesisch)
- Postleitzahl im Adressfeld **leer**
- **Die „Postleitzahlen" sind Datenmüll:** *„820769093, 820769103, 820769113, …"* — neunstellige Zahlen, die keine deutschen PLZ sind (offensichtlich Datenbank-IDs), und der Text bricht mitten in der Liste ab (`…820770223, 8`)
- Der Bereich „Lieferservice in München" listet zehnmal den Linktext **„testing"**, verlinkt auf `/img/`, `/css/`, `/wp-admin/` — die Seite ist erkennbar verwahrlost
- Ein „Bewertungen"-Formular (`_review.php`, `restaurant_id=39129336`) sammelt Nutzer-Bewertungen

**Relevanz für Jasuvi: praktisch null**, außer als (schwaches) Backlink-Rauschen. Für ein Redesign irrelevant — ausgenommen der Hinweis, dass Jasuvi dort mit falschen Daten geführt wird.

---

## 6. Der Anbieter

### 6.1 Lieferando.de — Betreiber von `jasuvi-munchen.de`

| | |
|---|---|
| **Marke** | Lieferando.de |
| **Website** | https://www.lieferando.de/ |
| **Partnerportal** | https://www.lieferando.de/partner-werden (Partner Hub) |
| **Konzern** | Just Eat Takeaway.com (vormals Takeaway.com) |
| **Betreibergesellschaft** | Takeaway.com Central Core B.V. (so im App Store hinterlegt) |
| **Schwestermarken (im Widget-PDF genannt)** | Lieferservice.at, Lieferando.de, Pyszne.pl, Thuisbezorgd.nl, bis.co.il, Takeaway.com |
| **Rolle hier** | Bestellplattform + Betreiber der Satelliten-Domain `jasuvi-munchen.de` |
| **Restaurant-ID von Jasuvi** | `R511P713` |

### 6.2 Zusätzlich gefunden: Jasuvi ist auf mindestens drei Plattformen

| Plattform | Status | Beleg |
|---|---|---|
| **Lieferando** | Aktiv, mit eigener Satelliten-Domain | Diese Analyse |
| **Wolt** | Aktiv, Daten vollständig verifiziert | `wolt.com/de/deu/munich/restaurant/jasuvi` (Venue-ID `67b30ae8822cd96d604fc36d`) |
| **Uber Eats** | Gelistet, Konditionen **nicht** prüfbar (HTTP 403) | Websuche |

Auf Wolt ist **Van Giang Than** als Merchant hinterlegt (identisch mit dem Lieferando-Impressum). Verkäufer im Rechtssinne ist dort die *Wolt Enterprises Deutschland GmbH, Stralauer Allee 6, 10245 Berlin*.

---

## 7. Zahlarten, Mindestbestellwert, Liefergebühr, Lieferradius, Abholrabatt

> **Ehrlicher Hinweis:** Für **Lieferando** waren diese Werte **nicht ermittelbar** (Cloudflare-403, siehe Abschnitt 2). Die Satellitenseite zeigt sie nicht — im gesamten HTML von `jasuvi-munchen.de` kommt kein einziges Mal „Mindestbestellwert", „Liefergebühr", „Lieferkosten", „Liefergebiet" oder „Abholung" vor. Das ist eine direkte Folge des abgeschalteten Bestellmoduls. Die folgenden **Wolt-Werte sind dagegen exakt und verifiziert** — sie stammen aus dem server-gerenderten Datensatz der Venue-Seite.

### 7.1 Wolt — verifizierte Konditionen für Jasuvi (Stand 19.08.2026)

| Position | Wert | Feld im Datensatz |
|---|---|---|
| **Mindestbestellwert** | **10,00 €** (ohne Lieferkosten) | `venue_info_order_minimum: "€10.00"`, `order_minimum: 1000` |
| **Liefergebühr (Basis)** | **0,99 €** | `venue_info_base_delivery_price: "€0.99"`, `delivery_price: 99` |
| **Servicegebühr** | **8 %**, min. 0,99 € / max. 3,59 € | `service_fee_estimate: {min: 99, max: 359, percentage: 8}` |
| **Zahlarten** | **Karte, Bar, PayPal, Klarna** | `allowed_payment_methods: ["card","cash","paypal","klarna"]` |
| **Liefermethoden** | Lieferung **und** Abholung | `delivery_methods: ["takeaway","homedelivery"]` |
| **Abholrabatt** | **Kein Rabatt hinterlegt.** Abholung ist zudem als nicht bevorzugt markiert | `is_pickup_friendly: false` |
| **Lieferradius** | Polygon mit 251 Stützpunkten, Grenze **ca. 2,6 – 5,5 km** vom Restaurant (Ø ≈ 4,1 km Luftlinie) | aus `coordinates`-Polygon berechnet |
| **Bewertung** | **8,8 / 10** aus 20 Bewertungen | `rating: {score: "8.8", volume: 20}` |
| **Preisniveau** | €€€ (`price_range: 3`) | — |
| **Küchen-Tags** | Sushi, vietnamesisch, Noodles | `food_tags` |
| **Wolt+** | ja | `is_wolt_plus: true` |

**Konkrete Postleitzahlen** werden bei Wolt nicht als Liste geführt, sondern über das Polygon. Das Gebiet deckt bei ~4 km Radius um Pasing im Wesentlichen München-West ab (Pasing-Obermenzing, Laim, Aubing-Lochhausen-Langwied, Teile von Neuhausen-Nymphenburg und Hadern) — das ist eine **geografische Ableitung aus den Koordinaten**, keine offizielle PLZ-Angabe des Restaurants.

### 7.2 Lieferando — was allgemein bekannt ist (nicht Jasuvi-spezifisch)

Diese Angaben gelten plattformweit und **nicht** notwendigerweise für Jasuvi:

- **Zahlarten für Kunden:** PayPal, Kreditkarte, Klarna, Apple Pay, Google Pay, Sofortüberweisung/giropay, Barzahlung bei Lieferung — je nach Restaurant unterschiedlich freigeschaltet ([Lieferando Kundenservice](https://www.lieferando.de/kundenservice/thema/zahlungsoptionen)).
- **Gebührenaufschlag:** Seit April 2024 berechnet Lieferando **0,29 €** Zahlungsgebühr bei PayPal und Apple Pay ([FinanceFWD](https://financefwd.com/de/lieferando-gebuehren-paypal-apple-pay/), [paysol.de](https://www.paysol.de/news/lieferando-paypal-applepay-gebuehren-kreditkarte.php)).
- **Servicegebühr für Kunden:** seit 2. April 2025 **2,5 %** des Warenkorbwerts, gedeckelt bei **0,99 €** pro Bestellung — **nur bei Lieferung, nicht bei Selbstabholung** ([gastroinsider.de](https://gastroinsider.de/blog/lieferando-kosten-restaurant)).
- **Mindestbestellwert, Liefergebühr, Lieferradius und Abholrabatt legt jedes Restaurant individuell fest.** Für Jasuvi ist der Wert unbekannt.

---

## 8. Preisvergleich: `jasuvi.de` vs. Lieferando

### 8.1 Datenlage

- **Hauskarte (`jasuvi.de/speisekarte/`):** 30 Seiten als **PNG-Bilder** ohne Textebene, hochgeladen 03/2025 und 04/2025. Preise visuell abgelesen aus den Seiten `0004`, `0005`, `0006` und `0011`.
- **Lieferando-Karte:** maschinell aus dem HTML von `jasuvi-munchen.de` extrahiert (`<div class="product-price" itemprop="price">`), **207 Artikel in 30 Kategorien**, Abruf am 19.08.2026.

### 8.2 Die fünf angefragten Beispielgerichte

| # | Gericht | **jasuvi.de** (Hauskarte) | **Lieferando** | Differenz |
|---|---|---|---|---|
| 1 | Ebi Tempura (3 Stk.) | **7,50 €** | **9,50 €** | +2,00 € · **+26,7 %** |
| 2 | Wakame Salat | **7,50 €** | **10,00 €** | +2,50 € · **+33,3 %** |
| 3 | Súp Gà Kokos (Kokos-Hühnersuppe) | **8,50 €** | **10,50 €** | +2,00 € · **+23,5 %** |
| 4 | Gà Curry (Huhn Curry) ¹ | **16,50 €** | **20,50 €** | +4,00 € · **+24,2 %** |
| 5 | Nộm Đu Đủ (Papayasalat, pikant) | **18,50 €** | **24,00 €** | +5,50 € · **+29,7 %** |

¹ Auf Lieferando als *„Gà Gion Curry"* geführt (viet. *giòn* = knusprig); Beschreibung und Position identisch.

### 8.3 Elf weitere Positionen zur Absicherung

| Gericht | jasuvi.de | Lieferando | Differenz |
|---|---|---|---|
| Krupuk (Krabbenchips) | 3,50 € | 4,50 € | +28,6 % |
| Nem Chay (5 Stk.) | 4,50 € | 6,00 € | +33,3 % |
| Wantan Chiên (5 Stk.) | 6,50 € | 8,50 € | +30,8 % |
| Gà Sa Tế (2 Stk.) | 6,50 € | 8,50 € | +30,8 % |
| Canh Rau Tofu (Gemüsesuppe) | 7,50 € | 9,50 € | +26,7 % |
| Canh Cải (Pak-Choi-Suppe) | 8,50 € | 11,00 € | +29,4 % |
| Miso Suppe | 8,50 € | 11,00 € | +29,4 % |
| Canh Chua Cá Lachs | 9,50 € | 12,00 € | +26,3 % |
| Miến Tôm / Gỏi Xoài (pikant) | 16,50 € | 21,00 € | +27,3 % |
| Zum Selberrollen: Lá Lốt / Tofu | 25,90 € | 32,50 € | +25,5 % |
| Zum Selberrollen: Ente | 28,90 € | 36,00 € | +24,6 % |
| Sài Gòn Special Platte (2 Pers.) | 29,50 € | 37,00 € | +25,4 % |
| Vorspeisen Combo (2 Pers.) | 26,50 € | 34,00 € | +28,3 % |

### 8.4 Bewertung

**Die Preise stimmen nicht überein.** Über 16 gegenübergestellte Positionen liegt der Lieferando-Preis **ausnahmslos höher**, in einer sehr engen Spanne von **+23,5 % bis +33,3 %** (Median ≈ **+27 %**). Die Systematik (kein einziger Ausreißer nach unten, kein identischer Preis) spricht klar für einen **bewusst kalkulierten Plattformaufschlag**, mit dem das Restaurant die Provision kompensiert — ein in der Branche übliches Vorgehen.

**Fairerweise zu berücksichtigen:**
- Die Hauskarte ist von **März/April 2025**, die Lieferando-Karte von **August 2026**. Ein Teil der Differenz kann eine reguläre Preiserhöhung des Restaurants sein, die nur auf der Website nicht nachgezogen wurde.
- Verglichen wurden nur die Kategorien Vorspeisen, Suppen, Vietnam-Salate, Zum Selberrollen und Huhn.

**Strukturelle Unterschiede zwischen den Karten:** Lieferando führt Kategorien, die auf den geprüften Seiten der Hauskarte nicht vorkamen — *Jasuvi Crunchy Rolls, Jasuvi Special Rolls, Sushi Bowls, Sushi Menü Platten, Nigiri, Inside Out Rolls, Sashimi* sowie mehrere **Business-Lunch**-Blöcke mit deutlich günstigeren Preisen (z. B. *Miso Suppe 6,50 €*, *Wantan Suppe 6,50 €*, *Gyoza 6,00 €*, *Minifrühlingsrollen 4,00 €*, Bowls ab *14,50 €*). Die Lieferando-Karte ist also **umfangreicher und differenzierter gepflegt als die Karte auf der eigenen Website** — ein starkes Argument dafür, dass Lieferando derzeit der faktische Hauptvertriebskanal ist.

Auffällig ist außerdem die **inkonsistente Datenpflege bei Lieferando**: die Kategorie „Business Lunch" existiert dreimal, Artikelnamen wie *„20Stk."*, *„18Stk."*, *„16Stk."* stehen ohne Gerichtbezeichnung, und diakritische Zeichen fehlen teilweise (*„Cơm chien trung ga"* neben *„Cơm chiên trứng tom"*).

---

## 9. Gibt es eine App?

**Eine eigene Jasuvi-App existiert nicht.** Weder `jasuvi.de` noch `jasuvi-munchen.de` enthalten irgendeinen Verweis auf App Store, Google Play, `apps.apple.com` oder `play.google.com` (geprüft per Volltextsuche über beide Domains).

Bestellt werden kann über die **Plattform-Apps**:

| App | Anbieter | Link |
|---|---|---|
| **Lieferando.de** (iOS) | Takeaway.com Central Core B.V. | https://apps.apple.com/de/app/lieferando-de/id419724490 |
| **Lieferando.de** (Android) | Just Eat Takeaway.com | https://lieferando.app.link/web-playstore (offizieller Play-Store-Weiterleitungslink; die exakte Paket-ID wurde nicht verifiziert) |
| **Wolt** | Wolt Enterprises | iOS / Android |
| **Uber Eats** | Uber | iOS / Android |

Die Lieferando-App bietet Adressverwaltung, Live-Tracking und Zahlung per PayPal, Klarna, Kreditkarte, Apple Pay oder bar bei Lieferung.

---

## 10. Lässt sich dieses System in eine andere Website einbinden?

**Kurz: Nur als Button/Deeplink — nicht als eingebetteter Shop.**

### 10.1 Was Lieferando offiziell anbietet

Lieferando stellt Partnern eine dokumentierte Einbindung bereit: den **„JETZT BESTELLEN"-HTML-Button**. Die offizielle Anleitung (deutschsprachiges PDF aus den Takeaway-Marketing-Ressourcen) ist hier abrufbar:

- https://takeaway-marketing-resources.s3-eu-west-1.amazonaws.com/BE/Documents/Manual+HTML+Order+now+button+DE+.pdf
- (Österreich-Variante: `…Manual+HTML+Order+now+button+AT+.pdf`)

Aus dem PDF, sinngemäß: *„Für neue ‚Jetzt Bestellen'-Buttons haben wir einen HTML-Code erstellt … **Wozu dient der Button?** Jeder Besucher Ihrer Website kann auf diesen Button klicken. Auf diese Weise gelangen Sie auf Ihre Restaurant-Seite auf unserer Plattform Lieferando.de, wo Sie direkt über Ihre Online-Karte bestellen können."*

**Schritt 1:** Stelle im CMS wählen. **Schritt 2:** folgenden Code einfügen:

```html
<div class="takeaway_widget_js"
     data-shopurl="<your website url goes here>"
     data-lang="de"
     data-layout="rectangle"
     data-freedelivery="true"
     data-color="white"></div>
<script>
(function (d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//widgets.takeaway.com/buttons/buttons.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'takeaway-widget-js'));
</script>
```

### 10.2 Was das Widget technisch wirklich tut — nachgeprüft

`widgets.takeaway.com/buttons/buttons.js` **ist im August 2026 weiterhin live** (HTTP 200, 13 KB). Der relevante Teil, entminifiziert:

```js
init_takeaway_widget = function (doc) {
  var nodes = doc.getElementsByClassName("takeaway_widget_js");
  for (var i = 0; i < nodes.length; i++) {
    var frame = doc.createElement("iframe");
    nodes[i].appendChild(frame);
    frame.setAttribute("frameborder", 0);
    frame.setAttribute("scrolling", "no");
    frame.style.minWidth = "100%";
    var t      = nodes[i].dataset;
    var lang   = t.lang   || "nl";
    var layout = t.layout || "rectangle";     // rectangle | square
    var color  = t.color  || "orange";        // orange | white
    var kind   = t.freedelivery === "true" ? "free-delivery-" : "order-now-";
    frame.src  = "//widgets.takeaway.com/buttons/button-"
               + lang + "-" + kind + layout + "-" + color + ".html?shopurl=" + t.shopurl;
  }
  iFrameResize({ checkOrigin: false }, ".takeaway_widget_js iframe");
};
```

Der Rest der Datei ist **iframe-resizer** — Bibliothek zum Anpassen der iframe-Höhe. Ein Abruf einer konkreten Widget-Instanz bestätigt den Inhalt des iframes:

```html
<a id="takeaway_widget__link" class="takeaway_widget white rectangle" target="_blank"
   href="https://www.lieferando.de/__SHOPURL__?utm_campaign=activation&utm_medium=restaurant_website&utm_source=javascript_button&utm_content=js_button_rec_2">
  <div class="takeaway_widget__top"><img class="takeaway_widget__logo" src="img/de-rectangle-orange.png"></div>
  <div class="takeaway_widget__button">Jetzt bestellen</div>
</a>
```

Das iframe enthält **exakt einen Link mit einem Logo und dem Text „Jetzt bestellen"** — kein Menü, kein Warenkorb, keine Preise, kein Checkout. Der Platzhalter `__SHOPURL__` wird per Inline-Script aus dem Query-Parameter ersetzt; `target="_blank"` öffnet Lieferando in einem neuen Tab. UTM-Parameter zählen die Herkunft.

### 10.3 Die drei realistischen Integrationswege

| Weg | Machbar? | Was der Gast erlebt |
|---|---|---|
| **Deeplink** — `<a href="https://www.lieferando.de/speisekarte/jasuvi">` | **Ja, trivial.** Genau das nutzt die Satellitenseite selbst. Optional `?pemid=mini` oder UTM-Parameter zur Zuordnung. | Verlässt die Seite, landet auf Lieferando. |
| **Offizielles Button-Widget** (Code oben) | **Ja.** Skript ist aktiv, iframe-basiert, selbst-resizend, 2 Layouts × 2 Farben. | Identisch zum Deeplink, nur mit Lieferando-Branding. |
| **Eingebetteter Warenkorb / Checkout im eigenen Layout** | **Nein.** Es gibt kein öffentliches Widget, keine öffentliche API, keinen dokumentierten iframe-Endpunkt dafür. Das interne Bestellmodul („JetFm") existiert ausschließlich innerhalb der von Lieferando betriebenen Satelliten-Domains und ist für Jasuvi überdies abgeschaltet. Die Bestell-API (`cw-api.takeaway.com`) ist nicht öffentlich und durch Bot-Schutz gesperrt. | — |

**Bewertung für ein `jasuvi.de`-Redesign:** Der einzige seriöse Weg, Lieferando einzubinden, ist ein prominenter „Jetzt bestellen"-Button. Damit gibt man Marke, Kundendaten und Provision an Lieferando ab. Ein Checkout auf eigener Domain erfordert zwingend ein **anderes** System.

---

## 11. Ist die Seite aktuell und gepflegt?

**Ja — die Lieferando-Seite ist aktiv und wird bespielt.** Die eigene Website `jasuvi.de` ist es weniger.

### 11.1 `jasuvi-munchen.de` (Lieferando)

| Indikator | Befund |
|---|---|
| **Bewertungen** (`/review`) | **175 Bewertungen**, jüngste vom **17. Aug 2026** — also zwei Tage vor dem Recherchestand. Weitere: 12.08., 06.08., 04.08., 27.07., 24.07., 21.07.2026 |
| **Aussagekraft** | Bewertungen können nur nach echten Bestellungen abgegeben werden → **das System wird laufend genutzt** |
| **Speisekarte** | 207 Artikel, mit Allergenkennzeichnung und Business-Lunch-Angeboten → gepflegt |
| **Öffnungs-/Lieferzeiten** | Konsistent mit `jasuvi.de` (siehe unten) |
| **Datenqualitätsmängel** | „Business Lunch" dreimal als Kategorie; Artikel ohne Namen (*„20Stk."*, *„18Stk."*); uneinheitliche vietnamesische Diakritika |
| **HTTP-Header** | Kein `Last-Modified` (dynamisch via Varnish ausgeliefert) — kein Änderungsdatum ableitbar |

Der Tenor der jüngsten Bewertungen ist gemischt (Lob für Qualität; wiederholte Kritik an ausgelaufener Verpackung und trockenem Fisch) — inhaltlich für das Redesign nicht relevant, belegt aber die Aktivität.

### 11.2 Öffnungszeiten — Abgleich aller Quellen

| Quelle | Mo – Fr | Samstag | Sonntag |
|---|---|---|---|
| `jasuvi.de/kontakt` (Restaurant) | 11:30–15:00 & 17:30–22:00 | 12:00–14:45 & 17:30–22:00 | Ruhetag |
| `jasuvi-munchen.de/contact` (Lieferzeiten) | 11:30–14:45 & 17:30–21:45 | 12:00–14:45 & 17:30–21:45 | Geschlossen |
| Wolt (verifiziert) | 11:30–14:45 & 17:30–21:45 | 12:00–14:45 & 17:30–21:45 | Geschlossen |

**Konsistent und plausibel.** Die Lieferzeiten enden 15 Minuten vor Küchenschluss — ein üblicher Puffer, kein Pflegefehler. Lieferando und Wolt stimmen exakt überein. `jasuvi.de` nennt zusätzlich **Feiertage: 17:30 – 22:00**.

### 11.3 `jasuvi.de` — die eigene Website (zum Vergleich)

| Indikator | Befund |
|---|---|
| **Technik** | WordPress mit Theme *hugo-wp* und **Colibri**-Pagebuilder; Footer: *„Created for free using WordPress and Colibri"* |
| **Bestellfunktion** | **Keine.** Kein Warenkorb, kein Shop-Plugin, **kein einziger Link zu Lieferando, Wolt oder Uber Eats** |
| **Speisekarte** | 30 **Bild-Scans** (PNG), keine Textebene → nicht durchsuchbar, nicht für Suchmaschinen lesbar, schlecht auf Mobilgeräten, nicht barrierefrei |
| **Stand der Karte** | Uploads von **März/April 2025** |
| **Defekter Link** | Der WhatsApp-Button verweist auf `https://wa.me/` — **ohne Telefonnummer**, also funktionslos |
| **Copyright-Angaben** | Widersprüchlich: „© 2022" im Header, „Copyright@2025 Jasuvi Restaurant" im Inhalt, „© 2026 Jasuvi" (automatisch) im Footer |
| **Weiterer externer Link** | Eine eingefrorene Google-Suchergebnis-URL mit Session-Parametern vom **9. April 2025** (`…&sca_esv=…`) — funktioniert nicht dauerhaft |
| **Kontakt** | Tel. 089 92740177, „Für Bestellungen und Reservierung stehen wir Ihnen gerne unter der Telefonnummer … zur Verfügung" |

**Fazit:** Die von Lieferando betriebene Seite ist deutlich besser gepflegt als die eigene Website des Restaurants. `jasuvi.de` verweist nicht einmal auf die Bestellmöglichkeiten — Gäste, die dort landen, können nur telefonisch bestellen.

---

## 12. Konditionen des Anbieters für Restaurants in Deutschland (Stand 2026)

> **Hinweis:** Die folgenden Werte stammen aus öffentlich zugänglichen Branchenquellen, nicht aus Lieferandos offizieller Preisliste (diese wird nicht veröffentlicht). Konditionen sind **individuell verhandelbar** und variieren nach Standort, Volumen und Vertragsdatum. **Die konkreten Konditionen von Jasuvi sind nicht bekannt.**

### 12.1 Provision

| Modell | Provision (netto) |
|---|---|
| **Eigenlieferung** (Restaurant liefert selbst) | ca. **13 – 14 %** |
| **Lieferung durch Lieferando-Fahrer** (Full Service / Scoober) | ca. **25 – 31 %** |
| **Zusätzlich** | ca. **2,5 %** Servicegebühr-Konstrukt; ggf. Aktivierungsgebühr und Marketingpakete für bessere Platzierung |

Die Spanne wird von mehreren unabhängigen Quellen konsistent mit **14 – 30 %** angegeben. Bei hohem Bestellvolumen sind Nachlässe von **2 – 3 Prozentpunkten** berichtet worden.

### 12.2 Grundgebühr und Vertrag

| Punkt | Angabe |
|---|---|
| **Monatliche Grundgebühr** | **Keine.** Die Monetarisierung erfolgt ausschließlich über die Provision je Bestellung. |
| **Vertragslaufzeit** | **Unbestimmte Zeit, keine Mindestlaufzeit** — sofern im individuellen Anmeldeformular nichts anderes vereinbart wurde. |
| **Kündigungsfrist** | Die Quellen sind uneinheitlich: die Partner-AGB nennen **30 Tage** zur ordentlichen Kündigung, andere Quellen **2 Wochen zum Monatsende**. **Hier ist der individuelle Vertrag maßgeblich — bitte dort nachsehen.** |
| **Onboarding** | Online-Antrag über den Partner Hub: Antragsformular, aktuelle Speisekarte, Gewerbeanmeldung, Ausweisdokument, Bankverbindung. |

### 12.3 Kundenseitige Gebühren (2026)

- **Servicegebühr:** 2,5 % des Warenkorbwerts, max. **0,99 €** pro Bestellung, seit **2. April 2025** — **nur bei Lieferung, nicht bei Selbstabholung**.
- **Zahlungsgebühr:** **0,29 €** bei PayPal und Apple Pay (seit April 2024); bei Kreditkarte fällt sie nicht an.

### 12.4 Wirtschaftliche Einordnung für Jasuvi

Der gemessene **Preisaufschlag von ca. +27 %** auf der Lieferando-Karte liegt in derselben Größenordnung wie die Full-Service-Provision (25–31 %). Zwei Lesarten sind plausibel — welche zutrifft, lässt sich von außen **nicht** entscheiden:

1. Jasuvi nutzt die Lieferando-Lieferflotte und gibt die Provision vollständig an den Gast weiter.
2. Die Hauskarte von 03/2025 ist schlicht veraltet und der Aufschlag ist teilweise eine reguläre Preisanpassung.

Zum Vergleich: Bei **Wolt** zahlt der Gast **0,99 € Liefergebühr + 8 % Servicegebühr** bei **10 € Mindestbestellwert** (verifiziert) — die restaurantseitige Wolt-Provision ist nicht öffentlich.

---

## 13. Was das für ein Redesign von `jasuvi.de` bedeutet

Sachliche Ableitungen aus den Befunden, ohne Empfehlung:

1. **Es gibt nichts zu übernehmen.** Das „Bestellsystem" auf `jasuvi-munchen.de` gehört Lieferando, ist dort abgeschaltet und technisch nicht portierbar.
2. **Lieferando lässt sich nur als Wegleitung integrieren** — Button oder Deeplink. Ein Checkout auf eigener Domain ist damit nicht erreichbar.
3. **Die eigene Website verschenkt derzeit jede Bestellung**: kein Warenkorb, kein Plattform-Link, nur eine Telefonnummer und ein defekter WhatsApp-Button.
4. **Die Karte auf `jasuvi.de` ist nicht maschinenlesbar** (30 Bild-Scans, Stand 03–04/2025) und liegt preislich ~27 % unter Lieferando. Eine strukturierte, textbasierte Karte wäre die Grundlage für jedes eigene Bestellsystem — und für Suchmaschinen.
5. **Die Lieferando-Karte ist der aktuellere Datenbestand** (207 Artikel inkl. Business Lunch, Sushi-Platten, Nigiri, Allergene). Sie ist eine brauchbare Referenz für den Umfang der tatsächlichen Karte — allerdings mit Pflegefehlern (dreifache Kategorie „Business Lunch", namenlose Artikel „20Stk.").
6. **Ein eigener Kanal hat messbaren Hebel:** Bei ~27 % Aufschlag ließen sich Direktbestellungen entweder günstiger anbieten oder mit höherer Marge abwickeln. Das ist eine Rechnung, die das Restaurant mit seinen echten Zahlen anstellen muss — hier steht nur die beobachtete Preisdifferenz.
7. **Jasuvi ist auf mindestens drei Plattformen** (Lieferando, Wolt, Uber Eats). Ein Redesign sollte klären, welche davon beworben werden sollen.

---

## 14. Quellen

**Direkt analysierte Seiten (Abruf 19.08.2026)**
- https://www.jasuvi-munchen.de/ — Satellitenseite, Speisekarte (484 KB HTML, 207 Artikel)
- https://www.jasuvi-munchen.de/contact — Kontakt und Lieferzeiten
- https://www.jasuvi-munchen.de/colofon — Impressum
- https://www.jasuvi-munchen.de/review — Bewertungen (175, jüngste 17.08.2026)
- https://www.jasuvi-munchen.de/assets/js/app.js — Bestellmodul-Logik (`showOrderModule`, `hideOrderModuleForExperiment`)
- https://www.restaurant-reservieren-lieferservice.de/speisekarte/jasuvi — Affiliate-Verzeichnis
- https://jasuvi.de/ · https://jasuvi.de/speisekarte/ · https://jasuvi.de/kontakt/ — eigene Website
- https://wolt.com/de/deu/munich/restaurant/jasuvi — Wolt-Venue (Gebühren, Zone, Zahlarten)

**Anbieter-Dokumentation**
- https://takeaway-marketing-resources.s3-eu-west-1.amazonaws.com/BE/Documents/Manual+HTML+Order+now+button+DE+.pdf — offizielle Anleitung „JETZT BESTELLEN"-Button
- https://widgets.takeaway.com/buttons/buttons.js — Widget-Skript (live, HTTP 200)
- https://widgets.takeaway.com/buttons/button-de-order-now-rectangle-white.html — gerenderte Widget-Instanz
- https://www.lieferando.de/ — Plattform
- https://www.lieferando.de/kundenservice/thema/zahlungsoptionen — Zahlungsoptionen

**Nicht abrufbar (dokumentiert in Abschnitt 2)**
- https://www.lieferando.de/speisekarte/jasuvi — HTTP 403 (Cloudflare)
- https://cw-api.takeaway.com/api/v33/restaurant?slug=jasuvi — HTTP 403
- https://www.ubereats.com/de/store/jasuvi/keq0SEjrRa6Ed_bKoMd1tA — HTTP 403

**Recherche zu Konditionen (Websuche, Stand 2026)**
- [Lieferando Kosten Restaurant: Was du wirklich zahlst (2026) — gastroinsider.de](https://gastroinsider.de/blog/lieferando-kosten-restaurant)
- [Lieferando-Provision 2026: Was Restaurants wirklich zahlen — gastro-master.de](https://gastro-master.de/de/blog/lieferando-provision-2026)
- [Lieferando Provision 2026 — delovery.io](https://www.delovery.io/de/blog/lieferando-provision-was-restaurants-wirklich-zahlen)
- [Lieferando-Provision berechnen — gastro25.de](https://gastro25.de/ratgeber/lieferando-provision-berechnen)
- [Lieferando Partner – Kosten, Provision & Vertrag im Check — gastrorocket.de](https://gastrorocket.de/partner/lieferando-partner)
- [Lieferando-Partner werden: So funktioniert der Partner Hub — deinlokal24.de](https://deinlokal24.de/blog/lieferando-partner-werden)
- [Lieferando Partner werden: Eine gute Idee? — ordersmart.de](https://ordersmart.de/lieferando-partner/)
- [Lieferando kündigen — vergleich.org](https://www.vergleich.org/kuendigung/lieferando/)
- [Lieferando irritiert mit Extragebühren für Paypal — financefwd.com](https://financefwd.com/de/lieferando-gebuehren-paypal-apple-pay/)
- [Lieferando-Gebühren mit PayPal & Apple Pay — paysol.de](https://www.paysol.de/news/lieferando-paypal-applepay-gebuehren-kreditkarte.php)
- [Lieferando.de-App — App Store](https://apps.apple.com/de/app/lieferando-de/id419724490)
- [Lieferando.de — Google Play (Weiterleitungslink)](https://lieferando.app.link/web-playstore)

---

*Erstellt am 19.08.2026. Alle Preis- und Konditionsangaben sind Momentaufnahmen. Nicht ermittelbare Werte sind als solche gekennzeichnet und wurden nicht geschätzt.*
