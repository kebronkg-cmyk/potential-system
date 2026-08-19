/* ═══════════════════════════════════════════════════════════
   JaSuVi — Speisekarte (Quelle: jasuvi.de, Stand 08/2026)
   Struktur: Kategorie → Gruppen → Gerichte.
   `price` (Zahl) = direkt auf die Bestellkarte legbar.
   `priceText` = Preis je nach Variante, Bestellung telefonisch.
   ═══════════════════════════════════════════════════════════ */
window.JASUVI_MENU = {

  lunch: [
    { title: "Vorspeisen", note: "Lunch täglich 11:30 – 14:45 (außer Sonntag)", items: [
      { id: "lv1", name: "Minifrühlingsrollen (5 Stk.)", desc: "", price: 3.5, veg: true },
      { id: "lv2", name: "Edamame", desc: "Gedämpfte Sojabohnen", price: 5.5, veg: true },
      { id: "lv3", name: "Nem Saigon", desc: "Hausgemachte vietnamesische Frühlingsrollen mit Hähnchen, Glasnudeln & Gemüse, Nuoc-Mam-Pha-Sauce", price: 5.5 },
      { id: "lv4", name: "Bo La Lot", desc: "Rinderhackfleisch in Betelblättern, gegrillt, mit Nuoc-Mam-Pha-Sauce", price: 6.5 },
      { id: "lv5", name: "Wantan-Suppe", desc: "Maultaschen-Suppe mit Hühnerfleisch-Garnelen-Füllung, Frühlingszwiebel & Koriander", price: 5.5 },
      { id: "lv6", name: "Gyoza", desc: "Knusprig gebratene Teigtaschen — Hühnerfleisch & Gemüse oder vegetarisch (Tofu & Gemüse), mit Soja-Dip", price: 5.0 },
      { id: "lv7", name: "Wakame — japanischer Algensalat", desc: "Zarter Meeresalgen-Salat in Sesam-Soja-Marinade", price: 5.5, veg: true },
      { id: "lv8", name: "Miso-Suppe", desc: "Klassisch mit Seetang, Frühlingszwiebeln & Tofu", price: 5.5, veg: true }
    ]},
    { title: "Wok-Gerichte", items: [
      { id: "lm1", name: "Ga Ca Ri", desc: "Hühnerfleisch mit Marktgemüse in roter Curry-Soße", price: 12.0 },
      { id: "lm2", name: "Ga Gion Sot Sate", desc: "Knusprige Hähnchenbrust mit Marktgemüse in Erdnuss-Soße", price: 12.5 },
      { id: "lm3", name: "Ga Gion Chua Ngot", desc: "Knusprige Hähnchenbrust mit Gemüse in Süß-Sauer-Soße", price: 12.5 },
      { id: "lm4", name: "Bo Xao Xa Ot", desc: "Gebratenes Rindfleisch mit Marktgemüse & Zitronengras", price: 13.5 },
      { id: "lm5", name: "Vit Ca Ri", desc: "Knusprige Ente mit Marktgemüse in roter Curry-Soße", price: 13.5 },
      { id: "lm6", name: "Vit Xao La Que", desc: "Gebratene Ente mit Marktgemüse & Thai-Basilikum in Austern-Soße", price: 13.5 },
      { id: "lm7", name: "Tofu Ca Ri", desc: "Gebratener Tofu mit Marktgemüse in roter Curry-Soße", price: 12.0, veg: true },
      { id: "lm8", name: "Tofu Xao Sa Ot", desc: "Gebratener Tofu mit Marktgemüse in Austern-Soße", price: 11.5, veg: true },
      { id: "lm9", name: "Pho Bo", desc: "Würzige Rinderbrühe mit Rindfleisch, Reisbandnudeln & frischen Kräutern", price: 14.5 },
      { id: "lm10", name: "Com Rang Ga", desc: "Gebratener Eierreis mit frischem Gemüse & Hühnerfleisch", price: 12.5 },
      { id: "lm11", name: "Pho Xao Bo", desc: "Gebratene Reisbandnudeln mit frischem Gemüse & Rindfleisch", price: 12.5 },
      { id: "lm12", name: "Bun Bowls", desc: "Lauwarme Reisnudeln mit Kräutern & Limettensauce — Tofu 12,0 / Rindfleisch 13,0 / Nem Saigon 13,5 / Knusprige Ente 13,5", priceText: "12,00 – 13,50 €" }
    ]},
    { title: "Sushi-Menüs", items: [
      { id: "lsm1", name: "Sushi Menü 1", desc: "6× Big Fried Salmon, 6× Kappa Maki, 2× Sake Nigiri", price: 14.5 },
      { id: "lsm2", name: "Sushi Menü 2", desc: "4× Lachs Inside-Out, 4× California Inside-Out mit Sesam, 6× Lachs Maki, 2× Lachs Nigiri", price: 13.5 },
      { id: "lsm3", name: "Sushi Menü 3", desc: "8× Tempura Inside-Out mit Frischkäse & Sesam, je 3× Lachs-, Thunfisch-, Avocado- & Gurken-Maki", price: 14.5 },
      { id: "lsm4", name: "Sushi Menü 4", desc: "6× Lachs Maki, 6× Thunfisch Maki, 6× Avocado Maki", price: 12.5 },
      { id: "lsm5", name: "Sushi Menü 5", desc: "8× Veggie Inside-Out mit Frischkäse & Sesam, 6× Avocado Maki, 6× Mango Maki", price: 13.5, veg: true }
    ]},
    { title: "Sushi Bowls (Lunch)", items: [
      { id: "lb1", name: "Veggie Bowl", desc: "Avocado, Gurke, Mango, Rettich, Seetang-Salat, Mais & Sesam", price: 13.5, veg: true },
      { id: "lb2", name: "Yakitori Bowl", desc: "Chicken Teriyaki, Gurke, Avocado, Seetang-Salat, Mais, Rettich, Mango, Sesam & Tobiko", price: 14.5 },
      { id: "lb3", name: "Lachs Bowl", desc: "Lachs, Gurke, Avocado, Seetang-Salat, Mais, Rettich, Mango, Sesam & Tobiko", price: 14.5 }
    ]}
  ],

  vorspeisen: [
    { title: "Vorspeisen", items: [
      { id: "1", name: "Nem Sài Gòn (3 Stk.)", desc: "Hausgemachte Saigon-Frühlingsrollen mit Hühnerfleisch, Gemüse, Glasnudeln & Nuoc-Mam-Pha-Soße", price: 7.5 },
      { id: "2", name: "Nem Rế Hà Nội (3 Stk.)", desc: "Knusprige Frühlingsrollen mit Garnelen, umhüllt von einem Taro-Netz", price: 8.5 },
      { id: "3", name: "Gỏi Cuốn Miền Tây (2 Stk.)", desc: "Glücksrollen vom Mekong: Reisnudeln, Salat & frische Kräuter — Tofu 6,9 / Hühnerfleisch 7,9 / Garnelen 8,9 / Lachs 8,9", priceText: "6,90 – 8,90 €" },
      { id: "4", name: "Tôm Chiên (2 Stk.)", desc: "Gebackene Tempura-Tigergarnelen mit süß-saurem Mango-Chili-Dip", price: 12.5 },
      { id: "5", name: "Bò Lá Lốt (4 Stk.)", desc: "Rindfleisch-Spieße in Lot-Blättern mit Mam-Dip", price: 11.5 },
      { id: "6", name: "Edamame", desc: "Gedämpfte Sojabohnen", price: 6.5, veg: true },
      { id: "7", name: "Gyoza (3 Stk.)", desc: "Gebratene Teigtaschen mit Huhn oder vegetarisch", price: 7.5 },
      { id: "8", name: "Yakitori (3 Stk.)", desc: "Hähnchenbrust-Spieße mit Lauchzwiebeln in Teriyaki-Soße", price: 7.5 },
      { id: "9", name: "Ebi Tempura (3 Stk.)", desc: "Riesengarnelen im Tempurateig", price: 7.5 },
      { id: "10", name: "Nem Chay (5 Stk.)", desc: "Vegetarische Frühlingsrollen mit Gemüsefüllung", price: 4.5, veg: true },
      { id: "11", name: "Krupuk", desc: "Krabbenchips", price: 3.5 },
      { id: "12", name: "Wantan Chiên (5 Stk.)", desc: "Gebackene Wantan-Teigtaschen mit Hühnerfleisch & Garnelen", price: 6.5 },
      { id: "13", name: "Gà Sa Tế (2 Stk.)", desc: "Hühnerfleisch in Viet-Kräutern & Kokosmilch mariniert, mit Viet-Pickles & Saté-Sauce", price: 6.5 },
      { id: "14", name: "Vietnam-Frühlingsrollen-Platte (für 2)", desc: "5 verschiedene Frühlingsrollen, Mango-Salat, Reisnudeln, Kräuter & Dips", price: 26.5 },
      { id: "15", name: "Sài Gòn Special Platte (für 2)", desc: "2 Frühlingsrollen, 2 Saté-Spieße, 2 Ebi Tempura, 6 vegetarische Frühlingsrollen, Papaya-Salat, Reisnudeln & Dips", price: 29.5 },
      { id: "16", name: "Vorspeisen-Combo (für 2)", desc: "2 Wantan, 2 Frühlingsrollen (Huhn), 1 Bò Lá Lốt, 1 Sommerrolle & 1 Salat", price: 26.5 },
      { id: "17", name: "Wakame-Salat", desc: "Japanischer Algensalat", price: 7.5, veg: true }
    ]},
    { title: "Suppen (klein)", items: [
      { id: "18", name: "Súp Gà Kokos", desc: "Kokosmilchsuppe mit Huhn, Champignons, Limettenblättern, Ananas, Zitronengras & grünem Spargel — leicht scharf", price: 8.5 },
      { id: "19", name: "Canh Chua Cá — Lachs", desc: "Lachs-Suppe mit Champignons, Ananas, Zitronengras, Tomaten & frischen Kräutern — leicht scharf", price: 9.5 },
      { id: "20", name: "Canh Chua Tôm", desc: "Garnelen-Suppe mit Champignons, Ananas, Zitronengras, Tomaten & frischen Kräutern — leicht scharf", price: 9.5 },
      { id: "21", name: "Canh Cải", desc: "Pak-Choi-Suppe mit Garnelen & Ingwer", price: 8.5 },
      { id: "22", name: "Canh Rau Tofu", desc: "Vegetarische Gemüsesuppe mit Tofu, Glasnudeln, grünem Spargel, Karotten & Kräutern", price: 7.5, veg: true },
      { id: "23", name: "Miso-Suppe", desc: "Vegetarisch, mit japanischem Bio-Tofu & Seetang", price: 8.5, veg: true }
    ]},
    { title: "Vietnam-Salate", items: [
      { id: "24", name: "Miến Tôm", desc: "Beliebter Garnelen-Salat aus Saigon: Glasnudeln, rote Zwiebeln, Chili & frische Kräuter — pikant", price: 16.5 },
      { id: "25", name: "Gỏi Xoài", desc: "Grüner Mango-Salat mit tranchierten Riesengarnelen & vielen Kräutern — pikant", price: 16.5 },
      { id: "26", name: "Nộm Đu Đủ", desc: "Frischer grüner Papaya-Salat mit Karotten, Garnelen, Limettensaft, Chili & Erdnüssen — pikant", price: 18.5 }
    ]},
    { title: "Zum Selberrollen", note: "Sommerrollen zum Selberrollen: Reispapier, Reisnudeln, verschiedenes Gemüse und …", items: [
      { id: "27", name: "Lá Lốt", desc: "Rindfleisch mit Zitronengras & Wildbetelblättern", price: 25.9 },
      { id: "28", name: "Tofu", desc: "Gebratener Tofu mit Zitronengras", price: 25.9, veg: true },
      { id: "29", name: "Ente", desc: "Knusprige Ente", price: 28.9 }
    ]}
  ],

  hauptgerichte: [
    { title: "Huhn", note: "Wok-Gerichte, serviert mit Gemüse — Reis als Beilage separat", items: [
      { id: "59", name: "Gà Pak Choi", desc: "Hühnerbrustfilet mit Pak Choi, Ingwer & Austernsoße — pikant", price: 16.5 },
      { id: "60", name: "Gà Erdnuss", desc: "Mit Erdnussbutter-Soße & gedünstetem Saisongemüse — leicht scharf", price: 16.5 },
      { id: "61", name: "Gà Curry", desc: "Knusprig, mit rotem Curry, Ananas, Brokkoli, Zitronengras, grünem Spargel & Kokosmilch", price: 16.5 },
      { id: "62", name: "Gà Hoisin", desc: "Knusprig, mit knackigem Gemüse in hauseigener Hoisin-Soße", price: 16.5 },
      { id: "63", name: "Gà Basilikum", desc: "Mit Basilikum-Soße & gedünstetem Saisongemüse", price: 16.5 },
      { id: "64", name: "Gà Sả Ớt", desc: "Mit gebratenem Zitronengras-Chili & Gemüse — leicht scharf", price: 16.5 },
      { id: "65", name: "Gà Chua Ngọt", desc: "Mit Süß-Sauer-Soße & Gemüse", price: 16.5 }
    ]},
    { title: "Rind", items: [
      { id: "66", name: "Bò Pak Choi", desc: "Gebratenes Rindfleisch mit Pak Choi, Ingwer & Austernsoße — pikant", price: 17.5 },
      { id: "67", name: "Bò Erdnuss", desc: "Mit Erdnussbutter-Soße & gedünstetem Saisongemüse — leicht scharf", price: 17.5 },
      { id: "68", name: "Bò Curry", desc: "Mit rotem Curry, Ananas, Brokkoli, Zitronengras, grünem Spargel & Kokosmilch", price: 17.5 },
      { id: "69", name: "Bò Hoisin", desc: "Mit knackigem Gemüse in hauseigener Hoisin-Soße", price: 17.5 },
      { id: "70", name: "Bò Basilikum", desc: "Mit Basilikum-Soße & gedünstetem Saisongemüse", price: 17.5 },
      { id: "71", name: "Bò Sả Ớt", desc: "Mit Zitronengras-Chili & Gemüse", price: 17.5 },
      { id: "72", name: "Bò Chua Ngọt", desc: "Mit Süß-Sauer-Soße & Gemüse", price: 17.5 },
      { id: "73", name: "Bò Xào Hành", desc: "Mit Zwiebeln in würziger Soße — authentisch asiatisch", price: 17.5 },
      { id: "74", name: "Bò Xào Dứa", desc: "Mit Ananas in würziger Soße — authentisch asiatisch", price: 17.5 }
    ]},
    { title: "Ente", items: [
      { id: "75", name: "Vịt Pak Choi", desc: "Knuspriges Entenfilet mit Pak Choi, Ingwer & Austernsoße — pikant", price: 18.5 },
      { id: "76", name: "Vịt Erdnuss", desc: "Mit Erdnussbutter-Soße & gedünstetem Saisongemüse — leicht scharf", price: 18.5 },
      { id: "77", name: "Vịt Curry", desc: "Knusprig, mit rotem Curry, Ananas, Brokkoli, Zitronengras, grünem Spargel & Kokosmilch", price: 18.5 },
      { id: "78", name: "Vịt Hoisin", desc: "Knusprig, mit knackigem Gemüse in hauseigener Hoisin-Soße", price: 18.5 },
      { id: "79", name: "Vịt Basilikum", desc: "Mit Basilikum-Soße & gedünstetem Saisongemüse", price: 18.5 },
      { id: "80", name: "Vịt Sả Ớt", desc: "Mit gebratenem Zitronengras-Chili & Gemüse", price: 18.5 },
      { id: "81", name: "Vịt Chua Ngọt", desc: "Knusprig, mit Süß-Sauer-Soße & Gemüse", price: 18.5 }
    ]},
    { title: "Lachs", items: [
      { id: "82", name: "Lachs Pak Choi", desc: "Gebratenes Lachsfilet mit Pak Choi, Ingwer & Austernsoße — pikant", price: 19.5 },
      { id: "83", name: "Lachs Erdnuss", desc: "Mit Erdnussbutter-Soße & gedünstetem Saisongemüse — leicht scharf", price: 19.5 },
      { id: "84", name: "Lachs Curry", desc: "Mit rotem Curry, Ananas, Brokkoli, Zitronengras, grünem Spargel & Kokosmilch", price: 19.5 },
      { id: "85", name: "Lachs Hoisin", desc: "Mit knackigem Gemüse in hauseigener Hoisin-Soße", price: 19.5 },
      { id: "86", name: "Lachs Basilikum", desc: "Mit Basilikum-Soße & gedünstetem Saisongemüse", price: 19.5 },
      { id: "87", name: "Lachs Sả Ớt", desc: "Mit gebratenem Zitronengras-Chili & Gemüse — leicht scharf", price: 19.5 },
      { id: "88", name: "Lachs Chua Ngọt", desc: "Mit Süß-Sauer-Soße & Gemüse", price: 19.5 }
    ]},
    { title: "Garnelen", items: [
      { id: "89", name: "Tôm Pak Choi", desc: "Gebratene Garnelen (5 Stk.) mit Pak Choi, Ingwer & Austernsoße — pikant", price: 19.5 },
      { id: "90", name: "Tôm Erdnuss", desc: "Mit Erdnussbutter-Soße & gedünstetem Saisongemüse — leicht scharf", price: 19.5 },
      { id: "91", name: "Tôm Curry", desc: "Mit rotem Curry, Ananas, Brokkoli, Zitronengras, grünem Spargel & Kokosmilch", price: 19.5 },
      { id: "92", name: "Tôm Hoisin", desc: "Mit knackigem Gemüse in hauseigener Hoisin-Soße", price: 19.5 },
      { id: "93", name: "Tôm Basilikum", desc: "Mit Basilikum-Soße & gedünstetem Saisongemüse", price: 19.5 },
      { id: "94", name: "Tôm Sả Ớt", desc: "Mit gebratenem Zitronengras-Chili & Gemüse — leicht scharf", price: 19.5 },
      { id: "95", name: "Tôm Chua Ngọt", desc: "Mit Süß-Sauer-Soße & Gemüse", price: 19.5 }
    ]},
    { title: "Vegetarisch — Tofu", items: [
      { id: "96", name: "Đậu phụ Pak Choi", desc: "Gebratener Tofu mit Pak Choi, Ingwer & Austernsoße — pikant", price: 15.5, veg: true },
      { id: "97", name: "Đậu phụ Erdnuss", desc: "Mit Erdnussbutter-Soße & gedünstetem Saisongemüse — leicht scharf", price: 15.5, veg: true },
      { id: "98", name: "Đậu phụ Curry", desc: "Mit rotem Curry, Ananas, Brokkoli, Zitronengras, grünem Spargel & Kokosmilch", price: 15.5, veg: true },
      { id: "99", name: "Đậu phụ Hoisin", desc: "Mit knackigem Gemüse in hauseigener Hoisin-Soße", price: 15.5, veg: true },
      { id: "100", name: "Đậu phụ Basilikum", desc: "Mit Basilikum-Soße & gedünstetem Saisongemüse", price: 15.5, veg: true },
      { id: "101", name: "Đậu phụ Sả Ớt", desc: "Mit gebratenem Zitronengras-Chili & Gemüse — leicht scharf", price: 15.5, veg: true },
      { id: "102", name: "Đậu phụ Chua Ngọt", desc: "Mit Süß-Sauer-Soße & Gemüse", price: 15.5, veg: true }
    ]},
    { title: "Extra-Beilagen", items: [
      { id: "bl1", name: "Reis", desc: "", price: 3.5, veg: true },
      { id: "bl2", name: "Reisnudeln", desc: "", price: 3.5, veg: true },
      { id: "bl3", name: "Kleiner Salat", desc: "", price: 5.0, veg: true },
      { id: "bl4", name: "Gebratene Nudeln / Reis", desc: "", price: 8.5 },
      { id: "bl5", name: "Wok-Gemüse", desc: "", price: 8.5, veg: true },
      { id: "bl6", name: "Seetang-Salat", desc: "", price: 8.5, veg: true }
    ]}
  ],

  nudeln: [
    { title: "Gebratene Nudeln", items: [
      { id: "30", name: "Mỳ Xào Tôm", desc: "Gebratene Nudeln mit Garnelen & verschiedenem Gemüse", price: 17.5 },
      { id: "31", name: "Mỳ Xào Tofu", desc: "Gebratene Nudeln mit Tofu & verschiedenem Gemüse", price: 13.5, veg: true },
      { id: "32", name: "Mỳ Xào Gà", desc: "Gebratene Nudeln mit Hühnerfleisch & verschiedenem Gemüse", price: 14.5 },
      { id: "33", name: "Mỳ Xào Vịt", desc: "Gebratene Nudeln mit Ente & verschiedenem Gemüse", price: 17.5 }
    ]},
    { title: "Gebratener Reis", items: [
      { id: "c1", name: "Cơm Chiên Trứng", desc: "Gebratener Eierreis mit Gemüse, Sojasprossen & Röstzwiebeln — Hühnerfleisch 13,5 / Ente 15,5 / Garnelen 16,5 / Tofu 13,5", priceText: "13,50 – 16,50 €" }
    ]},
    { title: "Udon", note: "Japanische Udon-Suppe mit kräftiger Brühe, Gemüse und …", items: [
      { id: "39", name: "Udon Rindfleisch", desc: "", price: 15.5 },
      { id: "40", name: "Udon Hühnerfleisch", desc: "", price: 14.5 },
      { id: "41", name: "Udon Tofu", desc: "", price: 13.5, veg: true },
      { id: "42", name: "Udon Garnelen", desc: "", price: 16.5 }
    ]},
    { title: "Yaki Udon", note: "Japanische Wok-Udon, gebraten mit verschiedenem Gemüse und …", items: [
      { id: "43", name: "Yaki Udon Rindfleisch", desc: "", price: 15.5 },
      { id: "44", name: "Yaki Udon Hühnerfleisch", desc: "", price: 14.5 },
      { id: "45", name: "Yaki Udon Tofu", desc: "", price: 13.5, veg: true },
      { id: "46", name: "Yaki Udon Garnelen", desc: "", price: 16.5 }
    ]},
    { title: "Ramen", note: "Japanische Suppe mit Weizennudeln, Gemüse und …", items: [
      { id: "47", name: "Ramen Schweinenacken", desc: "", price: 15.5 },
      { id: "48", name: "Ramen Hähnchenfleisch", desc: "", price: 14.5 }
    ]},
    { title: "Vietnamesische Nudelgerichte", items: [
      { id: "49", name: "Mỳ Wantan", desc: "Wantan-Nudeln mit traditioneller Brühe, Ente & Wantan", price: 19.5 },
      { id: "50", name: "Phở Việt Nam", desc: "8 Stunden gekochte Brühe, Reisbandnudeln, Koriander, Basilikum & Zwiebeln — Rindfleisch 15,5 / Hähnchen 14,5 / Tofu 13,5", priceText: "13,50 – 15,50 €" },
      { id: "51", name: "Phở Xào", desc: "Gebratene Reisbandnudeln mit Zwiebeln, Pak Choi, Karotten & Koriander — Rindfleisch 16,5 / Hähnchen 15,5 / Tofu 14,5", priceText: "14,50 – 16,50 €" },
      { id: "52", name: "Bún Cá Hải Phòng", desc: "Reisnudelsuppe aus Nord-Vietnam mit gebratenem Lachsfilet, Dill & Tomaten in leicht saurer Brühe", price: 15.5 },
      { id: "53", name: "Bún Bò Nam Bộ", desc: "Gebratene Rinderlende, lauwarme Reisnudeln, Salat, Kräuter, Erdnüsse & Nuoc-Mam-Pha-Soße", price: 15.5 },
      { id: "54", name: "Bún Chả Hà Nội", desc: "Gegrilltes Schweinefleisch mit lauwarmen Reisnudeln, frischen Salaten, Kräutern & Nuoc-Mam-Pha-Soße", price: 15.5 },
      { id: "55", name: "Bún Vịt — Ente-Reisnudeln", desc: "Lauwarme Reisnudeln mit Entenbrust, feinen Salaten, Kräutern & Nuoc-Mam-Pha-Soße", price: 17.5 },
      { id: "56", name: "Bún Nem Hà Nội", desc: "Knusprige Frühlingsrollen mit Hühnerfleisch, Salat, Kräuter, lauwarme Reisnudeln & Nuoc-Mam-Pha-Soße", price: 15.5 },
      { id: "57", name: "Bún Bò Lá Lốt", desc: "Rindfleisch in Lotblättern, kurz gebraten, mit Salat, Kräutern, Reisnudeln & Nuoc-Mam-Pha-Soße", price: 15.5 },
      { id: "58", name: "Bún Chay", desc: "Reisnudelplatte mit Tofu, Salat & Nuoc-Mam-Pha-Soße", price: 14.5, veg: true }
    ]}
  ],

  sushi: [
    { title: "Nigiri (2 Stk.)", note: "Reis und Belag, von Hand zu einer zwei Finger breiten Rolle gedrückt.", items: [
      { id: "n1", name: "Sake", desc: "Lachs", price: 6.5 },
      { id: "n2", name: "Maguro", desc: "Thunfisch", price: 7.5 },
      { id: "n3", name: "Butterfisch", desc: "", price: 6.5 },
      { id: "n4", name: "Unagi", desc: "Aal", price: 7.5 },
      { id: "n5", name: "Avocado", desc: "", price: 6.0, veg: true },
      { id: "n6", name: "Ebi", desc: "Eingelegte Garnelen", price: 6.5 },
      { id: "n7", name: "Hotate", desc: "Jakobsmuscheln", price: 6.5 },
      { id: "n8", name: "Aburi Sake", desc: "Flambiert, mit Teriyaki, Spicy Mayo, Frühlingszwiebeln, Korean Sesam & Tobiko", price: 7.5 },
      { id: "n9", name: "Aburi Thunfisch", desc: "Flambiert, mit Teriyaki, Spicy Mayo, Frühlingszwiebeln, Korean Sesam & Tobiko", price: 7.5 },
      { id: "n10", name: "Aburi Hotate", desc: "Flambiert, mit Teriyaki, Spicy Mayo, Frühlingszwiebeln, Korean Sesam & Tobiko", price: 7.5 }
    ]},
    { title: "Sashimi", items: [
      { id: "120", name: "Sake Sashimi (6 Stk.)", desc: "Lachs auf Wakame-Salat mit Tobiko", price: 16.5 },
      { id: "121", name: "Maguro Sashimi (6 Stk.)", desc: "Thunfisch auf Wakame-Salat mit Tobiko", price: 18.5 },
      { id: "122", name: "Sashimi Mix (12 Stk.)", desc: "Auf Wakame-Salat mit Tobiko", price: 29.5 },
      { id: "124", name: "Jasuvi Sashimi (15 Stk.)", desc: "Je 3× Lachs, Thunfisch, Jakobsmuschel, Butterfisch & eingelegte Garnelen auf Wakame-Salat", price: 33.5 }
    ]},
    { title: "Sushi Bowls", note: "Mit japanischer Soße und Spicy Mayo.", items: [
      { id: "b1", name: "Lachs Bowl", desc: "Lachs, Gurke, Avocado, Seetang-Salat, Mais, Rettich, Mango, Sesam & Tobiko", price: 16.5 },
      { id: "b2", name: "Thunfisch Bowl", desc: "Thunfisch, Lachs, Gurke, Avocado, Seetang-Salat, Mais, Rettich, Mango, Sesam & Tobiko", price: 17.0 },
      { id: "b3", name: "Veggie Bowl", desc: "Avocado, Gurke, Mango, Rettich, Seetang-Salat, Mais & Sesam", price: 16.0, veg: true },
      { id: "b4", name: "Flambierter Lachs Bowl", desc: "Flambierter Lachs, Gurke, Avocado, Seetang-Salat, Mais, Rettich, Mango, Sesam & Tobiko", price: 17.5 },
      { id: "b5", name: "Yakitori Bowl", desc: "Chicken Teriyaki, Gurke, Avocado, Seetang-Salat, Mais, Rettich, Mango, Sesam & Tobiko", price: 16.5 },
      { id: "b6", name: "Unagi Bowl", desc: "Gegrillter Aal, Gurke, Avocado, Seetang-Salat, Mais, Rettich, Mango, Sesam & Tobiko", price: 19.5 }
    ]},
    { title: "Maki (6 Stk.)", note: "Innen Fisch oder Gemüse und Reis, außen mit Nori gerollt.", items: [
      { id: "130", name: "Sake Maki", desc: "Lachs", price: 6.0 },
      { id: "131", name: "Maguro Maki", desc: "Thunfisch", price: 6.5 },
      { id: "132", name: "Avocado Maki", desc: "", price: 5.5, veg: true },
      { id: "133", name: "Kappa Maki", desc: "Gurke", price: 5.5, veg: true },
      { id: "134", name: "Sake Avocado Maki", desc: "Lachs & Avocado", price: 6.5 },
      { id: "135", name: "Tempura Ebi Maki", desc: "Panierte Garnelen", price: 6.5 },
      { id: "136", name: "Ebi Maki", desc: "Eingelegte Garnelen", price: 6.5 },
      { id: "137", name: "Spicy Tuna Maki", desc: "Thunfisch, Spicy Soße, Frühlingszwiebeln, Tobiko on top", price: 6.5 },
      { id: "138", name: "Spicy Sake Maki", desc: "Lachs, Spicy Soße, Frühlingszwiebeln, Tobiko on top", price: 6.5 },
      { id: "139", name: "Kani Maki", desc: "Surimi", price: 6.0 }
    ]},
    { title: "Inside-Out Rolls (8 Stk.)", note: "Der Reis liegt außen — dekoriert mit Sesam oder Kaviar.", items: [
      { id: "140", name: "Alaska", desc: "Lachs, Avocado, Sesam", price: 9.0 },
      { id: "141", name: "Maguro", desc: "Thunfisch, Avocado, Sesam", price: 9.5 },
      { id: "142", name: "California", desc: "Surimi, Avocado, Sesam", price: 8.5 },
      { id: "143", name: "Unagi", desc: "Gegrillter Aal, Avocado, Sesam, Teriyaki-Soße", price: 9.5 },
      { id: "144", name: "Sakekawa", desc: "Lachshaut, Gurke, Mayonnaise, Sesam", price: 9.0 },
      { id: "145", name: "Sake Spezial", desc: "Knuspriger Lachs, Philadelphia, Avocado, Teriyaki, Spicy Mayo & Sesam", price: 9.0 },
      { id: "146", name: "Creamy Avo", desc: "Avocado, Philadelphia, Sesam", price: 8.9, veg: true },
      { id: "147", name: "Creamy Gurke", desc: "Gurke, Philadelphia, Sesam", price: 8.9, veg: true },
      { id: "148", name: "Mango Phila", desc: "Mango, Philadelphia, Sesam", price: 8.9, veg: true },
      { id: "149", name: "Phila Veggie", desc: "Mango, Gurke, Avocado, Rettich, Philadelphia, Sesam", price: 9.9, veg: true }
    ]}
  ],

  rolls: [
    { title: "Jasuvi Crunchy Rolls (6 Stk.)", note: "Gebacken in Panko-Mehl, mit Spezial-Soße nach Jasuvi-Art.", items: [
      { id: "t1", name: "Big Fried Salmon", desc: "Lachs, Avocado, Rettich, Philadelphia, japanische Soße", price: 9.5 },
      { id: "t2", name: "Big Fried Tuna", desc: "Thunfisch, Avocado, Rettich, Philadelphia, japanische Soße", price: 10.5 },
      { id: "t3", name: "Big Fried Veggie", desc: "Avocado, Gurke, Mango, Rettich, Philadelphia, japanische Soße", price: 9.9, veg: true },
      { id: "t4", name: "Jasuvi Big Style", desc: "Lachs, Thunfisch, Avocado, Rettich, Philadelphia, japanische Soße", price: 11.5 },
      { id: "t5", name: "Big Fried Tatar", desc: "Avocado, Gurke, Mango, Rettich, Philadelphia — Lachs oder Thunfisch on top", price: 10.5 }
    ]},
    { title: "Jasuvi Special Rolls (8 Stk.)", note: "Spezialitäten mit Premium-Soße nach Jasuvi-Art.", items: [
      { id: "s1", name: "Tiger Roll", desc: "Tempura-Garnelen, Avocado, Philadelphia, ummantelt mit flambiertem Lachs — Avocado, Trüffelöl & japanische Soße on top", price: 16.5 },
      { id: "s2", name: "Double Queen", desc: "Tempura-Garnelen, Avocado, Philadelphia — Garnelen, Avocado, Trüffelöl & japanische Soße on top", price: 17.5 },
      { id: "s3", name: "Sakekawa Ebi", desc: "Knusprige Lachshaut, Gurke, Philadelphia, bedeckt mit Garnelen, Korean Sesam, Spicy Mayo & Teriyaki", price: 16.5 },
      { id: "s4", name: "Avocado Royal Roll", desc: "Eingelegte Garnelen, Lachs, Thunfisch, Avocado, Rettich — Kaviar, Wasabi-Soße & Teriyaki on top", price: 17.0 },
      { id: "s5", name: "Juicy Lucy", desc: "Lachs, Mango, Philadelphia — Erdbeeren & Teriyaki on top", price: 15.5 },
      { id: "s6", name: "Dragon Roll", desc: "Tempura-Garnelen, Avocado, Philadelphia, Unagi, Kaviar & Frühlingszwiebeln", price: 17.5 },
      { id: "s7", name: "Jasuvi Summerroll", desc: "Panierter Lachs, Gurke, Mayo, Salat & Rettich in Reispapier — Avocado, Trüffelöl & Kaviar on top", price: 16.5 },
      { id: "s8", name: "Spicy Salmon", desc: "Lachs-Tatar, Lachs on top, Frühlingszwiebeln, Kaviar & Spicy Mayo", price: 16.5 },
      { id: "s9", name: "Spicy Tuna", desc: "Thunfisch-Tatar, Gurke, Frühlingszwiebeln — Thunfisch, Kaviar & Spicy Mayo on top", price: 17.5 },
      { id: "s10", name: "Duck Queen", desc: "Knusprige Ente, Mango, Gurke, Philadelphia — Spicy Mayo & geröstete Zwiebeln on top", price: 17.5 },
      { id: "s11", name: "Chicken Royal", desc: "Gebackenes Hähnchen, Gurke, Philadelphia — Spicy Mayo & Erdnüsse on top", price: 16.0 },
      { id: "s12", name: "Crab Cheese", desc: "Soft-Shell-Crab, Avocado, Gurke, Philadelphia, Sesam, Teriyaki & Spicy Mayo", price: 18.0 },
      { id: "s13", name: "Seetang Roll", desc: "Lachs, Thunfisch, Rettich, Philadelphia — Seetang, Salat & Tobiko on top", price: 17.5 },
      { id: "s14", name: "Sumo Roll", desc: "Panierte Paprika, umwickelt mit Lachs, Philadelphia, Teriyaki, Korean Sesam & Mayo-Wasabi", price: 15.5 },
      { id: "s15", name: "King Roll", desc: "Knuspriger Lachs, Avocado, Rettich, Philadelphia, umwickelt mit Lachs, Korean Sesam, Teriyaki & Wasabi-Soße", price: 17.0 },
      { id: "s16", name: "Veggie Lucy", desc: "Avocado, Gurke, Rettich, Mango, Philadelphia, umwickelt mit Erdbeeren & Teriyaki", price: 15.5, veg: true },
      { id: "s17", name: "Green Roll", desc: "Avocado, Gurke, Mango, Rettich, Philadelphia — Avocado, Teriyaki & Sesam on top", price: 16.0, veg: true },
      { id: "s18", name: "Lachs Frühling", desc: "Lachs, panierte Frühlingszwiebeln, Philadelphia — Tobiko, Korean Sesam, Teriyaki & Mayo-Wasabi on top", price: 16.5 }
    ]},
    { title: "Sushi-Platten", items: [
      { id: "151", name: "Platte 1", desc: "6× Kappa Maki, 6× Mango Maki, 8× Creamy Phila Veggie", price: 16.0, veg: true },
      { id: "152", name: "Platte 2", desc: "8× Nigiri Mix (Lachs, Tuna, Ebi, Butterfisch), 8× Tiger Roll", price: 29.5 },
      { id: "153", name: "Platte 3 (für 2)", desc: "2× Miso Sake, 8× Tiger Roll, 4× Alaska, 4× California, 6× Lachs Maki, 6× Gurken Maki, 8× Nigiri Mix, 6× Big Veggie, 4× Lachs Sashimi", price: 58.9 },
      { id: "154", name: "Platte 4 (für 2)", desc: "2× Wakame-Salat, je 6× Lachs-, Avocado- & Tuna-Maki, 8× Avocado Royal Roll, 4× Nigiri Mix, 4× Sashimi Mix, 2× Double Queen, 1× Big Fried Salmon", price: 62.0 },
      { id: "155", name: "Platte 5 (für 2)", desc: "Edamame, Wakame-Salat, je 3× Lachs-, Gurken-, Thunfisch- & Avocado-Maki, 4× Mix-Sashimi, 8× Nigiri Mix, 1× Avocado Royal Roll, 1× Big Fried Tatar", price: 62.0 },
      { id: "156", name: "Platte 6 (für 2–3)", desc: "Wakame-Salat, 3× Gyoza, Edamame, je 6× Lachs-, Tuna- & Avocado-Maki, 6× Big Fried Veggie mit Spicy Lachs, 8× Dragon Roll, 8× Juicy Lucy, 8× Sashimi Mix", price: 85.5 },
      { id: "157", name: "Platte 7 (für 3–4)", desc: "Edamame, Wakame-Salat, 4× Tempura-Garnelen, je 6× Lachs-, Thunfisch- & Gurken-Maki, 10× Nigiri Mix, 10× Sashimi Mix, 8× Tiger, 8× Spicy Tuna, 10× Tempura Salmon", price: 105.5 }
    ]}
  ],

  dessert: [
    { title: "Dessert", items: [
      { id: "d1", name: "Daifuku Mochi", desc: "Rundes Mochi, gefüllt mit süßer roter Bohnenpaste", price: 8.5, veg: true },
      { id: "d2", name: "Bánh Chuối", desc: "Gedämpfter Klebreis mit Banane, roten Bohnen, Kokosmilch & Kokosraspeln", price: 6.5, veg: true },
      { id: "d3", name: "Chuối Chiên", desc: "Gebackene Banane mit Honig & Kokosraspeln", price: 6.0, veg: true },
      { id: "d4", name: "Bánh Rau Câu", desc: "Seetang-Dessert mit Kokosmilch, Kokosraspeln & frischen Kokosfasern — 100 % natürlich", price: 7.5, veg: true },
      { id: "d5", name: "Mochi-Eis", desc: "Drei verschiedene Eissorten im Reismehl-Mantel", price: 8.5, veg: true }
    ]},
  ],

  getraenke: [
    { title: "Softdrinks & Wasser", items: [
      { id: "g501", name: "Coca-Cola / Cola Light", desc: "0,2 l · 3,50 € — 0,4 l · 4,50 €", priceText: "3,50 / 4,50 €" },
      { id: "g502", name: "Fanta · Sprite", desc: "0,2 l · 3,50 € — 0,4 l · 4,50 €", priceText: "3,50 / 4,50 €" },
      { id: "g504", name: "Saft & Saftschorle", desc: "Apfel, Orange, Maracuja, Lychee, Johannisbeere oder Traube — 0,2 l · 3,50 € / 0,4 l · 4,50 €", priceText: "3,50 / 4,50 €" },
      { id: "g506", name: "Acqua Panna / San Pellegrino", desc: "Still oder mit Kohlensäure — 0,2 l · 3,50 € / 0,75 l · 6,50 €", priceText: "3,50 / 6,50 €" }
    ]},
    { title: "Heiße Getränke & Spezial-Tee", items: [
      { id: "g510", name: "Vietnamesischer Milchkaffee", desc: "", price: 3.9 },
      { id: "g511", name: "Tee", desc: "Ingwer, Jasmin, Schwarz oder Grün", price: 4.5 },
      { id: "g520", name: "Trà Chanh Việt Nam", desc: "Vietnamesischer Limetten-Eistee", price: 5.5 },
      { id: "g521", name: "Trà Đào", desc: "Vietnamesischer Pfirsich-Eistee", price: 5.5 },
      { id: "g522", name: "Trà Chanh Sả", desc: "Vietnamesischer Limetten-Zitronengras-Eistee", price: 5.5 }
    ]},
    { title: "Bier", items: [
      { id: "g530", name: "Asahi", desc: "Japanisches Bier, 0,3 l", price: 4.5 },
      { id: "g531", name: "Singha", desc: "Thailändisches Bier, 0,3 l", price: 4.5 },
      { id: "g532", name: "Saigon", desc: "Vietnamesisches Bier, 0,3 l", price: 4.5 },
      { id: "g533", name: "Helles · Weißbier · Radler", desc: "Auch alkoholfrei, 0,5 l", price: 4.5 }
    ]},
    { title: "Cocktails", note: "Alle Cocktails 9,50 €", items: [
      { id: "g540", name: "Hugo", desc: "Holundersirup, Prosecco, Minze, Limette", price: 9.5 },
      { id: "g542", name: "Pina Colada", desc: "Rum, Ananassaft, Coconut Cream", price: 9.5 },
      { id: "g544", name: "Cuba Libre", desc: "Bio-Limette, weißer Rum, Cola", price: 9.5 },
      { id: "g546", name: "Mojito", desc: "Limette, weißer Rum, Zucker, Basilikum", price: 9.5 },
      { id: "g547", name: "Lillet Wild Berry", desc: "Erdbeere, Lillet, Prosecco", price: 9.5 },
      { id: "g548", name: "Aperol Spritz", desc: "Prosecco, Soda, Aperol", price: 9.5 },
      { id: "g549", name: "Sake Calpico", desc: "Sake, Calpico, Soda, Minze", price: 9.5 },
      { id: "g550", name: "Tokyo Yuzu — alkoholfrei", desc: "Yuzu-Püree, Maracujasirup, Soda, Limettensaft, Minze", price: 9.5 },
      { id: "g541", name: "Soda Lemon — alkoholfrei", desc: "Frische Limette, Soda, Rohrzucker", price: 9.5 },
      { id: "g543", name: "Summer Breeze — alkoholfrei", desc: "Frische Ananas, Apfel, Minze", price: 9.5 },
      { id: "g551", name: "Saigon Mix — alkoholfrei", desc: "Ananas, Lychee, Orange, Minze", price: 9.5 },
      { id: "g552", name: "Halong Bay — alkoholfrei", desc: "Grenadine, Erdbeere, Orange, Lychee, Minze", price: 9.5 },
      { id: "g553", name: "Jasuvi Spezial — alkoholfrei", desc: "Rainbow Cocktail mit Curaçao-Sirup", price: 9.5 }
    ]},
    { title: "Wein vom Weinhof Mayer", note: "0,2 l · 7,50 € — Flasche 0,75 l · 25,00 €", items: [
      { id: "g560", name: "2023 Sauvignon Blanc", desc: "Vom Tonmergel, trocken", priceText: "7,50 / 25,00 €" },
      { id: "g561", name: "2021 Sankt Laurent", desc: "Vom Löss, trocken", priceText: "7,50 / 25,00 €" },
      { id: "g562", name: "2023 Chardonnay", desc: "Vom Tonmergel, trocken", priceText: "7,50 / 25,00 €" },
      { id: "g563", name: "2023 Merlot Rosé", desc: "Trocken", priceText: "7,50 / 25,00 €" },
      { id: "g564", name: "2023 Weißburgunder", desc: "Vom Kies, trocken", priceText: "7,50 / 25,00 €" }
    ]}
  ]
};
