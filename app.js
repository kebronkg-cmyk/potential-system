/* ═══════════════════════════════════════════════════════════
   JaSuVi — Interaktion & Motion
   Läuft auf index.html und speisekarte.html — Abschnitte, die
   auf einer Seite fehlen, werden per Element-Guard übersprungen.
   Speisekartendaten: menu-data.js (window.JASUVI_MENU)
   ═══════════════════════════════════════════════════════════ */
(() => {
  "use strict";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = matchMedia("(pointer: fine)").matches;
  const fmt = (n) => n.toFixed(2).replace(".", ",") + " €";
  const menuData = window.JASUVI_MENU || {}; // Rechtsseiten laden keine Speisekartendaten
  const WHATSAPP = "498992740177"; // Restaurant-Rufnummer im internationalen Format

  /* ─────────── Kaiten: die Beliebtesten, mit Original-Fotos ─────────── */
  const kaitenDishes = [
    { id: "s1", name: "Tiger Roll", price: 16.5, photo: "img/hero.jpg", tag: "タイガー" },
    { id: "s6", name: "Dragon Roll", price: 17.5, photo: "img/sushi-3.jpg", tag: "ドラゴン" },
    { id: "s15", name: "King Roll", price: 17.0, photo: "img/sushi-1.jpg", tag: "キング" },
    { id: "s2", name: "Double Queen", price: 17.5, photo: "img/sushi-4.jpg", tag: "クイーン" },
    { id: "152", name: "Sushi-Platte 2", price: 29.5, photo: "img/sushi-2.jpg", tag: "盛り合わせ" },
    { id: "61", name: "Gà Curry", price: 16.5, photo: "img/gericht-chicken-curry.jpg", tag: "カレー" }
  ];

  // Preis-Lookup über die komplette Speisekarte + Kaiten-Band
  const priceBook = new Map();
  Object.values(menuData).flat().forEach((group) => {
    group.items.forEach((d) => {
      if (typeof d.price === "number") priceBook.set(d.id, { name: d.name, price: d.price });
    });
  });
  kaitenDishes.forEach((d) => priceBook.set(d.id, { name: d.name, price: priceBook.get(d.id)?.price ?? d.price }));

  /* ─────────── Preloader ─────────── */
  const preloader = document.getElementById("preloader");
  if (preloader) {
    const heroTitle = document.querySelector(".hero-title, .page-title");
    const finishPreload = () => {
      preloader.classList.add("is-done");
      if (heroTitle) heroTitle.classList.add("is-revealed");
      document.querySelectorAll(".hero .reveal-up, .page-head .reveal-up").forEach((el, i) => {
        setTimeout(() => el.classList.add("in-view"), 350 + i * 120);
      });
      setTimeout(() => preloader.classList.add("is-gone"), 1400);
    };
    window.addEventListener("load", () => setTimeout(finishPreload, prefersReducedMotion ? 0 : 1200));
    setTimeout(finishPreload, 3000); // Fallback, falls "load" hängt
  }

  /* ─────────── Scroll-Reveals ─────────── */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18, rootMargin: "0px 0px -8% 0px" });
  document.querySelectorAll(".reveal-up, .split-lines, .philo-card, .hours-card").forEach((el) => {
    if (!el.closest(".hero") && !el.closest(".page-head")) revealObserver.observe(el);
  });

  /* ─────────── Header ─────────── */
  const header = document.getElementById("siteHeader");
  const isStaticHeader = header.classList.contains("is-scrolled") && !document.querySelector(".hero");
  let lastY = window.scrollY;
  window.addEventListener("scroll", () => {
    const y = window.scrollY;
    if (!isStaticHeader) header.classList.toggle("is-scrolled", y > 40);
    const cartOpen = cartEl ? cartEl.classList.contains("is-open") : false;
    if (y <= 300 || cartOpen) header.classList.remove("is-hidden");
    else if (y > lastY + 6) header.classList.add("is-hidden");
    else if (y < lastY - 6) header.classList.remove("is-hidden");
    if (Math.abs(y - lastY) > 6) lastY = y;
  }, { passive: true });

  /* ─────────── Magnetic Buttons ─────────── */
  if (!prefersReducedMotion && finePointer) {
    document.querySelectorAll("[data-magnetic]").forEach((el) => {
      el.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) * 0.18;
        const y = (e.clientY - r.top - r.height / 2) * 0.28;
        el.style.transform = `translate(${x}px, ${y}px)`;
      });
      el.addEventListener("mouseleave", () => {
        el.style.transition = "transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)";
        el.style.transform = "";
        setTimeout(() => { el.style.transition = ""; }, 500);
      });
    });
  }

  /* ─────────── Hero-Diashow (vollflächig) ─────────── */
  const heroStage = document.querySelector(".hero-stage");
  if (heroStage) {
    const slides = [...heroStage.querySelectorAll(".hero-slide")];
    if (slides.length > 1 && !prefersReducedMotion) {
      let current = 0;
      setInterval(() => {
        slides[current].classList.remove("is-active");
        current = (current + 1) % slides.length;
        slides[current].classList.add("is-active");
      }, 6000);
    }
  }

  /* ─────────── Google-Bewertung ───────────
     Statisch gepflegte Werte (Stand: 08/2026). Sind in der Seite ein
     Google-Places-Schlüssel und eine Place-ID hinterlegt, werden Schnitt
     und Anzahl live nachgeladen — sonst bleiben die gepflegten Werte stehen. */
  const ratingCfg = window.JASUVI_GOOGLE || {};
  if (ratingCfg.apiKey && ratingCfg.placeId) {
    fetch(`https://places.googleapis.com/v1/places/${ratingCfg.placeId}?fields=rating,userRatingCount&key=${ratingCfg.apiKey}`)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((d) => {
        if (!d.rating) return;
        const value = d.rating.toFixed(1).replace(".", ",");
        document.querySelectorAll("#ratingValue, #heroRatingValue").forEach((el) => { el.textContent = value; });
        document.querySelectorAll("#ratingCount, #heroRatingCount").forEach((el) => { el.textContent = d.userRatingCount; });
      })
      .catch(() => { /* gepflegte Werte bleiben stehen */ });
  }
  const writeLink = document.getElementById("reviewWriteLink");
  if (writeLink) {
    // Ohne Place-ID führt der Weg über die Google-Suche zum Eintrag,
    // dort ist "Rezension schreiben" einen Klick entfernt.
    writeLink.href = ratingCfg.placeId
      ? `https://search.google.com/local/writereview?placeid=${ratingCfg.placeId}`
      : "https://www.google.com/search?q=JaSuVi+Restaurant+Bachbauernstra%C3%9Fe+5+M%C3%BCnchen";
  }

  /* ─────────── Kaiten — rundes Band in der Draufsicht ───────────
     Der Ring dreht sich um die eigene Achse; jeder Teller wird
     gegenrotiert, damit Foto und Beschriftung aufrecht bleiben.
     Der aktive Teller ist der auf der 6-Uhr-Position (unten). */
  const ring = document.getElementById("kaitenRing");
  if (ring) {
    const stage = document.getElementById("kaitenStage");
    const caption = document.getElementById("kaitenCaption");
    const captionName = document.getElementById("kaitenName");
    const captionPrice = document.getElementById("kaitenPrice");
    const stepAngle = 360 / kaitenDishes.length;
    const FRONT_AT = 180; // Winkel der aktiven Position (unten)
    let radius = 200;
    let ringAngle = 0;
    let dragging = false;

    kaitenDishes.forEach((dish, i) => {
      const plate = document.createElement("div");
      plate.className = "kaiten-plate";
      plate.dataset.index = i;
      plate.innerHTML = `
        <span class="plate-photo">
          <img src="${dish.photo}" alt="" loading="lazy" draggable="false">
          <span class="plate-rim"></span>
        </span>
        <span class="plate-tag">${dish.tag}</span>`;
      ring.appendChild(plate);
    });
    const plates = [...ring.children.length ? ring.querySelectorAll(".kaiten-plate") : []];

    function measure() {
      const plateSize = parseFloat(getComputedStyle(stage).getPropertyValue("--plate")) || 140;
      radius = stage.clientWidth / 2 - plateSize * 0.66;
      stage.style.setProperty("--kr", `${radius}px`);
    }
    measure();
    window.addEventListener("resize", () => { measure(); updateKaiten(false); });

    const frontIndex = () => {
      const norm = (((FRONT_AT - ringAngle) % 360) + 360) % 360;
      return Math.round(norm / stepAngle) % kaitenDishes.length;
    };
    function updateKaiten(animateCaption = true) {
      ring.style.transform = `rotate(${ringAngle}deg)`;
      const front = frontIndex();
      plates.forEach((p, i) => {
        p.classList.toggle("is-front", i === front);
        p.style.transform = `rotate(${i * stepAngle}deg) translateY(${-radius}px) rotate(${-i * stepAngle - ringAngle}deg)`;
      });
      const dish = kaitenDishes[front];
      if (!animateCaption || prefersReducedMotion) {
        captionName.textContent = dish.name;
        captionPrice.textContent = fmt(dish.price);
        return;
      }
      caption.classList.add("is-switching");
      setTimeout(() => {
        captionName.textContent = dish.name;
        captionPrice.textContent = fmt(dish.price);
        caption.classList.remove("is-switching");
      }, 220);
    }
    updateKaiten(false);

    const rotateKaiten = (dir) => { ringAngle += dir * stepAngle; updateKaiten(); };
    document.getElementById("kaitenPrev").addEventListener("click", () => rotateKaiten(-1));
    document.getElementById("kaitenNext").addEventListener("click", () => rotateKaiten(1));

    // Drag / Swipe — horizontale Bewegung dreht das Band
    let dragStartX = 0, dragStartAngle = 0, moved = false;
    const dragStartFn = (x) => { dragging = true; moved = false; dragStartX = x; dragStartAngle = ringAngle; ring.classList.add("no-anim"); stage.classList.add("is-dragging"); };
    const dragMove = (x) => {
      if (!dragging) return;
      const dx = x - dragStartX;
      if (Math.abs(dx) > 4) moved = true;
      ringAngle = dragStartAngle + dx * 0.25;
      updateKaiten(false);
    };
    const dragEnd = () => {
      if (!dragging) return;
      dragging = false;
      ring.classList.remove("no-anim");
      stage.classList.remove("is-dragging");
      ringAngle = Math.round(ringAngle / stepAngle) * stepAngle; // einrasten
      updateKaiten();
    };
    stage.addEventListener("pointerdown", (e) => {
      if (e.target.closest(".kaiten-center")) return; // Buttons im Zentrum nicht als Drag werten
      dragStartFn(e.clientX);
      stage.setPointerCapture(e.pointerId);
    });
    stage.addEventListener("pointermove", (e) => dragMove(e.clientX));
    stage.addEventListener("pointerup", dragEnd);
    stage.addEventListener("pointercancel", dragEnd);
    stage.addEventListener("click", (e) => {
      if (moved) return;
      const plate = e.target.closest(".kaiten-plate");
      if (!plate) return;
      const i = Number(plate.dataset.index);
      // Teller vorne: Großansicht öffnen. Sonst erst nach vorne drehen.
      if (i === frontIndex()) { openLightbox(i); return; }
      const target = FRONT_AT - i * stepAngle;
      let delta = ((target - ringAngle) % 360 + 540) % 360 - 180;
      ringAngle += delta;
      updateKaiten();
    });
    // Von außen ansteuerbar, damit die Großansicht das Band mitdreht
    window.__kaitenGoTo = (i) => {
      const target = FRONT_AT - i * stepAngle;
      let delta = ((target - ringAngle) % 360 + 540) % 360 - 180;
      ringAngle += delta;
      updateKaiten();
    };

    // Sanfte Autorotation, solange niemand interagiert
    if (!prefersReducedMotion) {
      let idleTimer = null;
      let autoRotate = setInterval(() => { if (!dragging) rotateKaiten(-1); }, 5000);
      const pauseAuto = () => {
        clearInterval(autoRotate);
        clearTimeout(idleTimer);
        idleTimer = setTimeout(() => {
          autoRotate = setInterval(() => { if (!dragging) rotateKaiten(-1); }, 5000);
        }, 12000);
      };
      ["pointerdown", "click"].forEach((ev) => document.getElementById("kaiten").addEventListener(ev, pauseAuto));
    }

    document.getElementById("kaitenAdd").addEventListener("click", (e) => {
      const dish = kaitenDishes[frontIndex()];
      addToCart(dish.id, e.currentTarget);
    });
  }

  /* ─────────── Speisekarte: Zeilen-Renderer ─────────── */
  function itemRow(item, delay) {
    const row = document.createElement("article");
    row.className = "menu-item";
    row.style.animationDelay = `${delay}s`;
    const price = typeof item.price === "number" ? fmt(item.price) : item.priceText;
    const noLabel = /^\d+$/.test(item.id) ? `<span class="menu-item-no">${item.id}</span>` : "";
    row.innerHTML = `
      <div class="menu-item-info">
        <h4>${noLabel}${item.name}${item.veg ? ' <span class="veg-dot" title="vegetarisch/vegan" role="img" aria-label="vegetarisch"></span>' : ""}</h4>
        ${item.desc ? `<p>${item.desc}</p>` : ""}
      </div>
      <span class="menu-item-price">${price}</span>
      ${typeof item.price === "number" ? `
      <button class="menu-item-add" data-id="${item.id}" aria-label="${item.name} auf die Bestellkarte legen">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>
      </button>` : `<span></span>`}`;
    return row;
  }
  function appendGroup(container, group, delayRef) {
    const head = document.createElement("div");
    head.className = "menu-group-head";
    head.style.animationDelay = `${delayRef.v}s`;
    head.innerHTML = `<h3>${group.title}</h3>`;
    container.appendChild(head);
    delayRef.v = Math.min(delayRef.v + 0.045, 0.5);
    if (group.note) {
      const note = document.createElement("p");
      note.className = "menu-group-note";
      note.textContent = group.note;
      note.style.animationDelay = `${delayRef.v}s`;
      container.appendChild(note);
    }
    group.items.forEach((item) => {
      container.appendChild(itemRow(item, delayRef.v));
      delayRef.v = Math.min(delayRef.v + 0.045, 0.5);
    });
  }

  /* ─────────── Speisekarte auf der Startseite (Tabs) ─────────── */
  const menuList = document.getElementById("menuList");
  if (menuList) {
    const tabs = document.querySelectorAll(".menu-tab");
    const renderMenu = (cat) => {
      menuList.innerHTML = "";
      const delayRef = { v: 0 };
      menuData[cat].forEach((group) => appendGroup(menuList, group, delayRef));
    };
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        tabs.forEach((t) => { t.classList.remove("is-active"); t.setAttribute("aria-selected", "false"); });
        tab.classList.add("is-active");
        tab.setAttribute("aria-selected", "true");
        renderMenu(tab.dataset.cat);
      });
    });
    renderMenu("vorspeisen");
  }

  /* ─────────── Karten-Seite: Gänge im Tagesverlauf ───────────
     Statt einer endlosen Liste zeigt die Seite genau einen Gang.
     Die Reihenfolge folgt dem Tag: Mittagstisch, Auftakt, Sushi,
     Signature Rolls, Wok, Nudeln, Dessert, Getränke. */
  const courseStage = document.getElementById("courseStage");
  if (courseStage) {
    const courses = [
      { key: "lunch", time: "Mo – Fr 11:30 – 14:45", title: "Mittagstisch", sub: "Montag bis Freitag 11:30 – 14:45 Uhr · Samstag ab 12:00 Uhr · Sonntag Ruhetag", icon: "sun" },
      { key: "sushi", time: "Unsere Spezialität", title: "Sushi & Sashimi", sub: "Nigiri, Sashimi, Maki, Inside-Out und Bowls", icon: "fish" },
      { key: "rolls", time: "Das Aushängeschild", title: "Signature Rolls & Platten", sub: "Crunchy Rolls, Special Rolls und Platten zum Teilen", icon: "star" },
      { key: "vorspeisen", time: "Zum Auftakt", title: "Vorspeisen, Suppen & Salate", sub: "Kleine Gerichte zum Ankommen", icon: "bowl" },
      { key: "hauptgerichte", time: "Hauptgang", title: "Aus dem Wok", sub: "Huhn, Rind, Ente, Lachs, Garnelen und Tofu", icon: "flame" },
      { key: "nudeln", time: "Hauptgang", title: "Nudeln & Reis", sub: "Phở, Bún, Udon, Ramen und gebratener Reis", icon: "noodle" },
      { key: "dessert", time: "Zum Abschluss", title: "Dessert", sub: "Süßes aus Japan und Vietnam", icon: "sweet" },
      { key: "getraenke", time: "Den ganzen Abend", title: "Getränke", sub: "Softdrinks, Tee, Bier, Cocktails und Wein", icon: "glass" }
    ];
    const icons = {
      sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
      bowl: '<path d="M3 11h18a9 9 0 0 1-18 0Z"/><path d="M12 4c1.5 1 1.5 2.5 0 3.5"/>',
      fish: '<path d="M3 12c4-6 12-6 18 0-6 6-14 6-18 0Z"/><circle cx="16" cy="11" r=".8" fill="currentColor"/>',
      star: '<path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1.1 5.8L12 16.9 6.7 19.6l1.1-5.8L3.5 9.7l5.9-.8Z"/>',
      flame: '<path d="M12 3s5 4 5 8.5A5 5 0 0 1 7 11.5C7 8 10 6.5 10 4c0 0 2 1 2 3"/>',
      noodle: '<path d="M4 8h16M4 12h16M4 16h16"/><path d="M8 8v10M16 8v10"/>',
      sweet: '<circle cx="12" cy="13" r="6"/><path d="M9 7c1-2 5-2 6 0"/>',
      glass: '<path d="M6 4h12l-5 8v6h3M11 18H8"/><path d="M6 4l6 8"/>'
    };

    const navInner = document.getElementById("courseNavInner");
    const courseNav = document.getElementById("courseNav");

    courses.forEach((c, i) => {
      const b = document.createElement("button");
      b.className = "course-chip" + (i === 0 ? " is-active" : "");
      b.dataset.course = c.key;
      b.innerHTML = `
        <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[c.icon]}</svg>
        <span class="course-chip-text">
          <span class="course-chip-time">${c.time}</span>
          <span class="course-chip-title">${c.title}</span>
        </span>`;
      navInner.appendChild(b);
    });

    function renderCourse(key) {
      const c = courses.find((x) => x.key === key);
      courseStage.innerHTML = "";
      const sec = document.createElement("section");
      sec.className = "course-panel";
      sec.innerHTML = `
        <header class="course-head">
          <span class="card-ornament" aria-hidden="true"></span>
          <p class="course-time">${c.time}</p>
          <h2>${c.title}</h2>
          <p class="course-sub">${c.sub}</p>
        </header>`;
      const groups = menuData[key];
      const wrap = document.createElement("div");
      wrap.className = "course-groups";
      const frag = document.createDocumentFragment();
      groups.forEach((group, gi) => {
        const det = document.createElement("details");
        det.className = "course-group";
        det.open = groups.length === 1 || gi === 0;
        det.style.animationDelay = `${Math.min(gi * 0.05, 0.3)}s`;
        const list = document.createElement("div");
        list.className = "menu-list";
        const itemFrag = document.createDocumentFragment();
        const delayRef = { v: 0 };
        group.items.forEach((item) => {
          itemFrag.appendChild(itemRow(item, delayRef.v));
          delayRef.v = Math.min(delayRef.v + 0.03, 0.32);
        });
        list.appendChild(itemFrag);
        det.innerHTML = `
          <summary>
            <span class="course-group-title">${group.title}</span>
            <span class="course-group-count">${group.items.length}</span>
            <svg class="course-group-chevron" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>
          </summary>`;
        if (group.note) {
          const note = document.createElement("p");
          note.className = "menu-group-note";
          note.textContent = group.note;
          det.appendChild(note);
        }
        det.appendChild(list);
        frag.appendChild(det);
      });
      wrap.appendChild(frag);
      sec.appendChild(wrap);
      courseStage.replaceChildren(sec);
    }

    // Dokumentposition des Navigators. Sticky-Elemente melden beim Scrollen
    // ihre Klebeposition — auch über offsetTop. Der feste Anker davor nicht.
    const courseAnchor = document.getElementById("courseAnchor");
    const navDocTop = () => (courseAnchor ? courseAnchor.offsetTop : courseNav.offsetTop);

    navInner.addEventListener("click", (e) => {
      const chip = e.target.closest(".course-chip");
      if (!chip) return;
      navInner.querySelectorAll(".course-chip").forEach((c) => c.classList.remove("is-active"));
      chip.classList.add("is-active");
      // Erst scrollen (sofortiges Feedback), dann im nächsten Frame rendern
      const target = Math.max(0, navDocTop() - 90);
      if (window.scrollY > target) window.scrollTo({ top: target, behavior: prefersReducedMotion ? "auto" : "smooth" });
      requestAnimationFrame(() => renderCourse(chip.dataset.course));
    });
    renderCourse("lunch");

    // Zurück-zum-Navigator-Pfeil
    const toTop = document.getElementById("toTop");
    if (toTop) {
      toTop.addEventListener("click", () => {
        courseNav.classList.remove("is-tucked");
        window.scrollTo({ top: Math.max(0, navDocTop() - 90), behavior: prefersReducedMotion ? "auto" : "smooth" });
      });
      // Der Navigator klebt oben; der Pfeil bringt einen zusätzlich
      // aus tieferen Gängen in einem Sprung zurück nach oben.
      // Navigator weicht beim Runterscrollen aus dem Weg und kommt
      // beim Hochscrollen sofort zurück; der Pfeil führt direkt hin.
      let navLastY = window.scrollY;
      const onScroll = () => {
        const y = window.scrollY;
        const past = y > navDocTop() + 40;
        // Hysterese: nur bei deutlicher Bewegung umschalten. Sanftes
        // Auslaufen liefert Deltas von 1–2 px und würde sonst flackern.
        if (!past) {
          courseNav.classList.remove("is-tucked");
        } else if (y > navLastY + 6) {
          courseNav.classList.add("is-tucked");
        } else if (y < navLastY - 6) {
          courseNav.classList.remove("is-tucked");
        }
        toTop.classList.toggle("is-visible", y > navDocTop() + 400);
        if (Math.abs(y - navLastY) > 6) navLastY = y;
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    }
  }

  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".menu-item-add");
    if (btn) addToCart(btn.dataset.id, btn);
  });

  /* ─────────── Bestellkarte ─────────── */
  const cartEl = document.getElementById("cart");
  const cartScrim = document.getElementById("cartScrim");
  const cartToggle = document.getElementById("cartToggle");
  const cartCount = document.getElementById("cartCount");
  const cartItemsEl = document.getElementById("cartItems");
  const cartTotalEl = document.getElementById("cartTotal");
  const cart = new Map(); // id -> Menge

  // Rechtsseiten (Impressum) tragen keine Bestellkarte — alles Folgende hängt daran
  if (cartEl) {
    const openCart = () => {
      cartEl.classList.add("is-open");
      cartScrim.classList.add("is-open");
      cartEl.setAttribute("aria-hidden", "false");
      header.classList.remove("is-hidden");
    };
    const closeCart = () => {
      cartEl.classList.remove("is-open");
      cartScrim.classList.remove("is-open");
      cartEl.setAttribute("aria-hidden", "true");
    };
    cartToggle.addEventListener("click", () => (cartEl.classList.contains("is-open") ? closeCart() : openCart()));
    document.getElementById("cartClose").addEventListener("click", closeCart);
    cartScrim.addEventListener("click", closeCart);
    window.addEventListener("keydown", (e) => { if (e.key === "Escape") closeCart(); });
    cartItemsEl.addEventListener("click", (e) => {
      const btn = e.target.closest(".qty-btn");
      if (!btn) return;
      changeQty(btn.closest(".cart-item").dataset.id, btn.dataset.act === "plus" ? 1 : -1);
    });
  }

  function bump(el) {
    el.classList.remove("is-bumping");
    void el.offsetWidth;
    el.classList.add("is-bumping");
    setTimeout(() => el.classList.remove("is-bumping"), 500);
  }

  function flyToCart(fromEl) {
    if (prefersReducedMotion || !fromEl) return;
    const from = fromEl.getBoundingClientRect();
    const to = cartToggle.getBoundingClientRect();
    const dot = document.createElement("span");
    dot.className = "fly-dot";
    dot.style.left = `${from.left + from.width / 2 - 8}px`;
    dot.style.top = `${from.top + from.height / 2 - 8}px`;
    document.body.appendChild(dot);
    const dx = to.left + to.width / 2 - (from.left + from.width / 2);
    const dy = to.top + to.height / 2 - (from.top + from.height / 2);
    dot.animate(
      [
        { transform: "translate(0, 0) scale(1)", opacity: 1 },
        { transform: `translate(${dx * 0.5}px, ${dy - 120}px) scale(1.15)`, opacity: 1, offset: 0.55 },
        { transform: `translate(${dx}px, ${dy}px) scale(0.35)`, opacity: 0.7 }
      ],
      { duration: 700, easing: "cubic-bezier(0.5, 0, 0.3, 1)" }
    ).onfinish = () => dot.remove();
  }

  function addToCart(id, sourceEl) {
    if (!cartEl || !priceBook.has(id)) return;
    cart.set(id, (cart.get(id) || 0) + 1);
    flyToCart(sourceEl);
    setTimeout(() => { renderCart(id); bump(cartCount); }, prefersReducedMotion ? 0 : 600);
  }

  function changeQty(id, delta) {
    const next = (cart.get(id) || 0) + delta;
    if (next <= 0) {
      const row = cartItemsEl.querySelector(`[data-id="${id}"]`);
      cart.delete(id);
      if (row && !prefersReducedMotion) {
        row.classList.add("is-leaving");
        setTimeout(() => renderCart(), 320);
      } else {
        renderCart();
      }
    } else {
      cart.set(id, next);
      renderCart();
    }
  }

  function renderCart(newId = null) {
    const count = [...cart.values()].reduce((a, b) => a + b, 0);
    const total = [...cart.entries()].reduce((sum, [id, qty]) => sum + priceBook.get(id).price * qty, 0);
    cartCount.textContent = count;
    cartTotalEl.textContent = fmt(total);
    cartEl.classList.toggle("has-items", count > 0);
    bump(cartTotalEl);

    cartItemsEl.innerHTML = "";
    cart.forEach((qty, id) => {
      const { name, price } = priceBook.get(id);
      const li = document.createElement("li");
      li.className = "cart-item" + (id === newId ? " is-new" : "");
      li.dataset.id = id;
      li.innerHTML = `
        <span class="cart-item-name">${name}</span>
        <span class="cart-item-price">${fmt(price * qty)}</span>
        <span class="cart-item-qty">
          <button class="qty-btn" data-act="minus" aria-label="Eine Portion weniger">−</button>
          <span class="qty-val">${qty}</span>
          <button class="qty-btn" data-act="plus" aria-label="Eine Portion mehr">+</button>
        </span>`;
      cartItemsEl.appendChild(li);
    });
  }
  /* ─────────── Teller-Großansicht ───────────
     Zeigt das Foto des Gerichts groß als Teller, mit Beschreibung
     aus der Speisekarte und direktem Weg auf die Bestellkarte. */
  const lightbox = document.getElementById("lightbox");
  let lbIndex = 0;
  function openLightbox(i) {
    if (!lightbox) return;
    lbIndex = ((i % kaitenDishes.length) + kaitenDishes.length) % kaitenDishes.length;
    const dish = kaitenDishes[lbIndex];
    const entry = priceBook.get(dish.id);
    // Beschreibung aus der Speisekarte nachschlagen
    let desc = "";
    Object.values(menuData).flat().forEach((group) => {
      const hit = group.items.find((it) => it.id === dish.id);
      if (hit && hit.desc) desc = hit.desc;
    });
    document.getElementById("lightboxImg").src = dish.photo;
    document.getElementById("lightboxImg").alt = dish.name;
    document.getElementById("lightboxTag").textContent = dish.tag;
    document.getElementById("lightboxName").textContent = dish.name;
    document.getElementById("lightboxDesc").textContent = desc;
    document.getElementById("lightboxPrice").textContent = fmt(entry ? entry.price : dish.price);
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    document.getElementById("lightboxClose").focus();
    if (window.__kaitenGoTo) window.__kaitenGoTo(lbIndex);
  }
  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }
  if (lightbox) {
    document.getElementById("lightboxClose").addEventListener("click", closeLightbox);
    document.getElementById("lightboxPrev").addEventListener("click", () => openLightbox(lbIndex - 1));
    document.getElementById("lightboxNext").addEventListener("click", () => openLightbox(lbIndex + 1));
    lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeLightbox(); });
    document.getElementById("lightboxAdd").addEventListener("click", (e) => {
      addToCart(kaitenDishes[lbIndex].id, e.currentTarget);
      closeLightbox();
    });
    window.addEventListener("keydown", (e) => {
      if (!lightbox.classList.contains("is-open")) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") openLightbox(lbIndex - 1);
      if (e.key === "ArrowRight") openLightbox(lbIndex + 1);
    });
  }

  /* ─────────── Checkout: Bestellung ohne Backend ───────────
     Der Gast stellt seine Bestellung zusammen, ergänzt Name,
     Telefon und Abholung/Lieferung — daraus entsteht ein fertiger
     Bestelltext, der per WhatsApp gesendet oder beim Anruf
     vorgelesen/kopiert wird. Kein Server, keine Zahlung nötig:
     bezahlt wird wie gewohnt bei Abholung bzw. Lieferung. */
  const checkoutToggle = document.getElementById("checkoutToggle");
  if (checkoutToggle) {
    const form = document.getElementById("checkoutForm");
    const feedback = document.getElementById("checkoutFeedback");

    checkoutToggle.addEventListener("click", () => {
      const show = form.hidden;
      form.hidden = !show;
      checkoutToggle.querySelector("span").textContent = show ? "Formular schließen" : "Zur Abholung vorbestellen";
      if (show) form.querySelector("input[name='kunde']").focus();
    });

    function orderText() {
      const lines = ["Vorbestellung zur Abholung — JaSuVi:", ""];
      cart.forEach((qty, id) => {
        const { name, price } = priceBook.get(id);
        lines.push(`${qty}× ${name} — ${fmt(price * qty)}`);
      });
      const total = [...cart.entries()].reduce((sum, [id, qty]) => sum + priceBook.get(id).price * qty, 0);
      lines.push("", `Summe: ${fmt(total)}`, "");
      lines.push(`Name: ${form.kunde.value.trim()}`);
      lines.push(`Telefon: ${form.telefon.value.trim()}`);
      lines.push(form.zeit.value.trim() ? `Abholung um: ${form.zeit.value.trim()}` : "Abholung: so bald wie möglich");
      if (form.hinweis.value.trim()) lines.push(`Hinweis: ${form.hinweis.value.trim()}`);
      return lines.join("\n");
    }

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (cart.size === 0) { feedback.textContent = "Ihre Abholung ist noch leer."; return; }
      window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(orderText())}`, "_blank", "noopener");
      feedback.textContent = "WhatsApp öffnet sich mit Ihrer Vorbestellung — nur noch absenden.";
    });

    document.getElementById("checkoutCopy").addEventListener("click", async () => {
      if (cart.size === 0) { feedback.textContent = "Ihre Abholung ist noch leer."; return; }
      try {
        await navigator.clipboard.writeText(orderText());
        feedback.textContent = "Text kopiert — jetzt anrufen und durchgeben: 089 9274 0177.";
      } catch {
        feedback.textContent = "Kopieren nicht möglich — rufen Sie uns einfach an: 089 9274 0177.";
      }
    });
  }

  /* ─────────── Sanfte Anker-Navigation ─────────── */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
    });
  });

  /* ─────────── Karten-Tilt (Über uns & Öffnungszeiten) ─────────── */
  if (!prefersReducedMotion && finePointer) {
    document.querySelectorAll("[data-tilt]").forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const r = card.getBoundingClientRect();
        const nx = (e.clientX - r.left) / r.width - 0.5;
        const ny = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `perspective(900px) rotateY(${nx * 7}deg) rotateX(${-ny * 7}deg) translateY(-3px)`;
      });
      card.addEventListener("mouseleave", () => { card.style.transform = ""; });
    });
  }
})();
