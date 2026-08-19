# Befund: Wie Jasuvi heute Online-Bestellungen abwickelt

> Erhoben am 19.08.2026 durch Abruf und Quelltext-Analyse der Seiten.

## Kernbefund: jasuvi-munchen.de ist eine Lieferando-Satellitenseite

Die Seite `https://www.jasuvi-munchen.de/` sieht aus wie ein eigener Bestellshop,
ist technisch aber ein Whitelabel-Produkt von Lieferando (Just Eat Takeaway).

Belege aus dem Quelltext:

| Fund | Bedeutung |
|---|---|
| `"country":"lieferando.de"` im Tracking-Datenlayer | Die Seite meldet sich als Lieferando-Property |
| `"pageGroup":"satellite_menu"` | Lieferandos interne Bezeichnung für die Restaurant-eigene „Satelliten"-Speisekarte |
| Unterseite `/colofon` | Niederländisch für „Impressum" — Just Eat Takeaway ist ein niederländischer Konzern |
| `/assets/css/takeaway.css`, `/tpl/template1/` | Takeaway.com-Templates |
| Links auf `lieferando.de/speisekarte/jasuvi` | Bestellstrecke endet bei Lieferando |

**Konsequenz:** Bestellungen über jasuvi-munchen.de sind Lieferando-Bestellungen.
Die Provision fällt an wie bei Lieferando (13 % bei Selbstlieferung bis rund 30 %
mit Plattform-Fahrern, plus 0,3–1,5 % Zahlungsgebühren). Es ist **kein**
provisionsfreier eigener Shop.

Technische Details:
- Echter Warenkorb vorhanden (`addtobasket`, `product-order-button`, `/basket/…`)
- Zum Abrufzeitpunkt (ca. 08:00 Uhr) trugen die Buttons die Klasse
  `order-not-available` — plausibel, weil das Restaurant erst um 11:30 öffnet
- Komplette Speisekarte mit Allergenangaben (`data-allergens`) ist hinterlegt
- Keine erkennbare Schnittstelle zum Einbetten in eine fremde Seite
  (kein Widget-Script, kein iframe-Endpunkt gefunden)

## Was das für die neue Website bedeutet

Ein echter provisionsfreier Warenkorb auf jasuvi.de lässt sich damit **nicht**
herstellen — die Satellitenseite ist nicht einbettbar und führt ohnehin zu
Lieferando. Deshalb ist die Website jetzt so verdrahtet:

1. **Direkter Weg (provisionsfrei):** Bestellkarte auf jasuvi.de → Auswahl
   zusammenstellen → „Bestellung aufgeben" → fertiger Bestelltext per WhatsApp
   oder zum Kopieren fürs Telefon. Bezahlt wird bei Abholung/Lieferung.
2. **Bequemer Weg (mit Provision):** Verlinkung auf den Bestellshop
   jasuvi-munchen.de sowie auf Wolt und Lieferando, jeweils in neuem Tab.

Beide Wege stehen in der Bestellkarte direkt untereinander; der direkte Weg
ist der hervorgehobene Hauptbutton.

## Erreichbarkeit der Kanäle (Stand 19.08.2026)

| Kanal | HTTP-Status | Anmerkung |
|---|---|---|
| jasuvi-munchen.de | 200 | erreichbar, vollständige Karte |
| wolt.com/…/jasuvi | 200 | erreichbar |
| lieferando.de/speisekarte/jasuvi | 403 | Bot-Schutz gegen automatisierte Abrufe; im Browser normal erreichbar |

## Offene Punkte für den Inhaber

- Preise auf jasuvi-munchen.de gegen die Karte auf jasuvi.de prüfen; eine
  automatische Stichprobe war wegen der Seitenstruktur nicht verlässlich möglich.
- Falls ein wirklich provisionsfreier Shop gewünscht ist, braucht es einen
  eigenen Anbieter. Hinweis: GloriaFood wird zum 30.04.2027 von Oracle
  eingestellt (ohne Migrationspfad) und scheidet damit aus.
