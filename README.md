# JaSuVi — Website

Komplett neu gestaltete Website für das japanische Restaurant **JaSuVi** in München-Pasing
(Bachbauernstraße 5, 81241 München).

## Aufbau

Statische Website ohne Build-Schritt — direkt deploybar (z. B. GitHub Pages, Netlify, jeder Webspace):

- `index.html` — Struktur und Inhalte (Hero, Philosophie, Kaiten-Band, Speisekarte, Kontakt, Bestellkarte)
- `styles.css` — Design-System („Ink & Paper“: dunkle Bühne, Washi-Töne, Zinnoberrot), Animationen und Responsive-Layout
- `app.js` — Interaktion: 3D-Kaiten-Karussell, Bestellkarte, Scroll-Reveals, Magnetic Buttons, Tilt-Effekte

## Features

- **3D-Kaiten-Band**: drehbares Sushi-Laufband (CSS 3D + Drag/Swipe), Gerichte lassen sich direkt auf die Bestellkarte legen
- **Bestellkarte**: seitliches Panel mit Mengen, Zwischensumme, Fly-to-Cart-Animation und Direktlinks (Telefon, Lieferando, Wolt)
- **Fließende Übergänge**: Preloader-Choreografie, Zeilen-Reveals, Section-Fades, Marquee, weiche Spring-Easings
- Vollständig responsiv, respektiert `prefers-reduced-motion`, keine externen Abhängigkeiten außer Google Fonts

## Lokal ansehen

```bash
python3 -m http.server 8080
# dann http://localhost:8080 öffnen
```
