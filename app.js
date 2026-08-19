/* ═══════════════════════════════════════════════════════════
   JaSuVi — Interaktion & Motion
   Speisekartendaten: menu-data.js (window.JASUVI_MENU)
   ═══════════════════════════════════════════════════════════ */
(() => {
  "use strict";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = matchMedia("(pointer: fine)").matches;
  const fmt = (n) => n.toFixed(2).replace(".", ",") + " €";
  const menuData = window.JASUVI_MENU;

  /* ─────────── Kaiten-Teller (SVG-Baukasten) ─────────── */
  const plateArt = {
    roll: (fill) => `
      <svg viewBox="0 0 200 150" aria-hidden="true">
        <ellipse cx="100" cy="112" rx="92" ry="30" fill="#26231b"/>
        <ellipse cx="100" cy="106" rx="92" ry="30" fill="#332f24"/>
        <ellipse cx="100" cy="106" rx="72" ry="22" fill="none" stroke="#4a4433" stroke-width="2"/>
        <g>
          <g transform="translate(56 84)"><ellipse cx="0" cy="14" rx="26" ry="10" fill="#111"/><circle r="24" fill="#15120c"/><circle r="18" fill="#f3ecdc"/><circle r="8" fill="${fill}"/></g>
          <g transform="translate(100 76)"><ellipse cx="0" cy="16" rx="26" ry="10" fill="#111"/><circle r="26" fill="#15120c"/><circle r="20" fill="#f3ecdc"/><circle r="9" fill="${fill}"/></g>
          <g transform="translate(144 84)"><ellipse cx="0" cy="14" rx="26" ry="10" fill="#111"/><circle r="24" fill="#15120c"/><circle r="18" fill="#f3ecdc"/><circle r="8" fill="${fill}"/></g>
        </g>`,
    nigiri: (fill) => `
      <svg viewBox="0 0 200 150" aria-hidden="true">
        <ellipse cx="100" cy="112" rx="92" ry="30" fill="#26231b"/>
        <ellipse cx="100" cy="106" rx="92" ry="30" fill="#332f24"/>
        <ellipse cx="100" cy="106" rx="72" ry="22" fill="none" stroke="#4a4433" stroke-width="2"/>
        <g transform="translate(64 84) rotate(-8)">
          <ellipse cx="0" cy="12" rx="34" ry="15" fill="#f3ecdc"/>
          <path d="M-38 2 Q0 -20 38 2 Q20 12 0 10 Q-20 12 -38 2Z" fill="${fill}"/>
        </g>
        <g transform="translate(134 88) rotate(7)">
          <ellipse cx="0" cy="12" rx="34" ry="15" fill="#f3ecdc"/>
          <path d="M-38 2 Q0 -20 38 2 Q20 12 0 10 Q-20 12 -38 2Z" fill="${fill}"/>
          <rect x="-7" y="-14" width="14" height="28" rx="2" fill="#1d3a26" opacity=".85"/>
        </g>`,
    bowl: (fill) => `
      <svg viewBox="0 0 200 150" aria-hidden="true">
        <ellipse cx="100" cy="116" rx="80" ry="24" fill="#26231b"/>
        <path d="M30 78 Q100 150 170 78 Z" fill="#3b3527"/>
        <path d="M30 78 Q100 150 170 78" fill="none" stroke="#514936" stroke-width="3"/>
        <ellipse cx="100" cy="78" rx="70" ry="20" fill="#f3ecdc"/>
        <ellipse cx="76" cy="72" rx="22" ry="10" fill="${fill}"/>
        <ellipse cx="122" cy="70" rx="20" ry="9" fill="#7fae4e"/>
        <ellipse cx="104" cy="82" rx="16" ry="7" fill="#d9375e"/>
        <circle cx="140" cy="80" r="7" fill="#f7d774"/>`,
    gyoza: (fill) => `
      <svg viewBox="0 0 200 150" aria-hidden="true">
        <ellipse cx="100" cy="112" rx="92" ry="30" fill="#26231b"/>
        <ellipse cx="100" cy="106" rx="92" ry="30" fill="#332f24"/>
        <ellipse cx="100" cy="106" rx="72" ry="22" fill="none" stroke="#4a4433" stroke-width="2"/>
        <g fill="${fill}">
          <path d="M40 96 Q62 68 84 96 Q62 108 40 96Z"/>
          <path d="M78 88 Q100 60 122 88 Q100 100 78 88Z"/>
          <path d="M116 96 Q138 68 160 96 Q138 108 116 96Z"/>
        </g>
        <g stroke="#b98a4e" stroke-width="2.5" fill="none" opacity=".7">
          <path d="M50 88 q12 -10 24 0"/><path d="M88 80 q12 -10 24 0"/><path d="M126 88 q12 -10 24 0"/>
        </g>`
  };

  // Empfehlungen des Hauses — IDs entsprechen der Speisekarte (menu-data.js)
  const kaitenDishes = [
    { id: "s1", name: "Tiger Roll", price: 16.5, art: plateArt.roll("#e8734a"), tag: "タイガー" },
    { id: "t1", name: "Big Fried Salmon", price: 9.5, art: plateArt.roll("#f0a35e"), tag: "クランチー" },
    { id: "n1", name: "Sake Nigiri (2 Stk.)", price: 6.5, art: plateArt.nigiri("#e8734a"), tag: "にぎり" },
    { id: "s6", name: "Dragon Roll", price: 17.5, art: plateArt.roll("#7fae4e"), tag: "ドラゴン" },
    { id: "b1", name: "Lachs Bowl", price: 16.5, art: plateArt.bowl("#e8734a"), tag: "サーモン丼" },
    { id: "s2", name: "Double Queen", price: 17.5, art: plateArt.roll("#d4af5c"), tag: "クイーン" },
    { id: "7", name: "Gyoza (3 Stk.)", price: 7.5, art: plateArt.gyoza("#e9d3a3"), tag: "餃子" },
    { id: "n8", name: "Aburi Sake Nigiri (2 Stk.)", price: 7.5, art: plateArt.nigiri("#d98a48"), tag: "炙り" },
    { id: "b5", name: "Yakitori Bowl", price: 16.5, art: plateArt.bowl("#c98a3e"), tag: "焼き鳥丼" },
    { id: "s10", name: "Duck Queen", price: 17.5, art: plateArt.roll("#b8763a"), tag: "ダック" }
  ];

  // Preis-Lookup über die komplette Speisekarte + Kaiten-Band
  const priceBook = new Map();
  Object.values(menuData).flat().forEach((group) => {
    group.items.forEach((d) => {
      if (typeof d.price === "number") priceBook.set(d.id, { name: d.name, price: d.price });
    });
  });
  // Kaiten-Namen sind sprechender (z. B. "Sake Nigiri (2 Stk.)" statt "Sake") — sie gewinnen im Warenkorb
  kaitenDishes.forEach((d) => priceBook.set(d.id, { name: d.name, price: priceBook.get(d.id)?.price ?? d.price }));

  /* ─────────── Preloader ─────────── */
  const preloader = document.getElementById("preloader");
  const heroTitle = document.querySelector(".hero-title");
  const finishPreload = () => {
    preloader.classList.add("is-done");
    heroTitle.classList.add("is-revealed");
    document.querySelectorAll(".hero .reveal-up").forEach((el, i) => {
      setTimeout(() => el.classList.add("in-view"), 350 + i * 120);
    });
    setTimeout(() => preloader.classList.add("is-gone"), 1400);
  };
  window.addEventListener("load", () => setTimeout(finishPreload, prefersReducedMotion ? 0 : 1400));
  setTimeout(finishPreload, 3200); // Fallback, falls "load" hängt

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
    if (!el.closest(".hero")) revealObserver.observe(el);
  });

  /* ─────────── Header ─────────── */
  const header = document.getElementById("siteHeader");
  let lastY = window.scrollY;
  window.addEventListener("scroll", () => {
    const y = window.scrollY;
    header.classList.toggle("is-scrolled", y > 40);
    header.classList.toggle("is-hidden", y > lastY && y > 300 && !cartEl.classList.contains("is-open"));
    lastY = y;
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

  /* ─────────── Hero-Foto Tilt ─────────── */
  const heroPlate = document.getElementById("heroPlate");
  if (heroPlate && !prefersReducedMotion && finePointer) {
    const hero = document.getElementById("hero");
    hero.addEventListener("mousemove", (e) => {
      const r = hero.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width - 0.5;
      const ny = (e.clientY - r.top) / r.height - 0.5;
      heroPlate.style.transform = `rotateY(${nx * 10}deg) rotateX(${-ny * 8}deg)`;
    });
    hero.addEventListener("mouseleave", () => { heroPlate.style.transform = ""; });
  }

  /* ─────────── Kaiten-3D-Band ─────────── */
  const ring = document.getElementById("kaitenRing");
  const stage = document.getElementById("kaitenStage");
  const caption = document.getElementById("kaitenCaption");
  const captionName = document.getElementById("kaitenName");
  const captionPrice = document.getElementById("kaitenPrice");
  const stepAngle = 360 / kaitenDishes.length;
  const radius = Math.round(Math.min(420, Math.max(260, window.innerWidth * 0.3)));

  let ringAngle = 0;

  kaitenDishes.forEach((dish, i) => {
    const plate = document.createElement("div");
    plate.className = "kaiten-plate";
    plate.dataset.index = i;
    plate.innerHTML = `${dish.art}</svg><span class="plate-tag">${dish.tag}</span>`;
    plate.style.transform = `rotateY(${i * stepAngle}deg) translateZ(${radius}px) rotateY(${-i * stepAngle}deg)`;
    ring.appendChild(plate);
  });
  const plates = [...ring.children];

  function frontIndex() {
    const norm = ((-ringAngle % 360) + 360) % 360;
    return Math.round(norm / stepAngle) % kaitenDishes.length;
  }
  function updateKaiten(animateCaption = true) {
    ring.style.transform = `rotateY(${ringAngle}deg)`;
    const front = frontIndex();
    plates.forEach((p, i) => {
      // Winkelabstand des Tellers zur Front (0 = vorn, 180 = hinten)
      let d = Math.abs(((i * stepAngle + ringAngle) % 360 + 360) % 360);
      if (d > 180) d = 360 - d;
      p.classList.toggle("is-front", i === front);
      p.classList.toggle("is-back", d > 108);
      // Teller drehen sich gegen den Ring, damit sie immer zur Kamera schauen
      p.style.transform = `rotateY(${i * stepAngle}deg) translateZ(${radius}px) rotateY(${-i * stepAngle - ringAngle}deg)`;
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
  document.getElementById("kaitenPrev").addEventListener("click", () => rotateKaiten(1));
  document.getElementById("kaitenNext").addEventListener("click", () => rotateKaiten(-1));

  // Drag / Swipe
  let dragging = false, dragStartX = 0, dragStartAngle = 0, moved = false;
  const dragStart = (x) => { dragging = true; moved = false; dragStartX = x; dragStartAngle = ringAngle; ring.classList.add("no-anim"); stage.classList.add("is-dragging"); };
  const dragMove = (x) => {
    if (!dragging) return;
    const dx = x - dragStartX;
    if (Math.abs(dx) > 4) moved = true;
    ringAngle = dragStartAngle + dx * 0.3;
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
  stage.addEventListener("pointerdown", (e) => { dragStart(e.clientX); stage.setPointerCapture(e.pointerId); });
  stage.addEventListener("pointermove", (e) => dragMove(e.clientX));
  stage.addEventListener("pointerup", dragEnd);
  stage.addEventListener("pointercancel", dragEnd);
  stage.addEventListener("click", (e) => {
    if (moved) return;
    const plate = e.target.closest(".kaiten-plate");
    if (!plate) return;
    const i = Number(plate.dataset.index);
    // kürzester Weg zum angeklickten Teller
    const target = -i * stepAngle;
    let delta = ((target - ringAngle) % 360 + 540) % 360 - 180;
    ringAngle += delta;
    updateKaiten();
  });

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

  /* ─────────── Speisekarte ─────────── */
  const menuList = document.getElementById("menuList");
  const tabs = document.querySelectorAll(".menu-tab");

  function renderMenu(cat) {
    menuList.innerHTML = "";
    let delay = 0;
    const step = 0.045;
    menuData[cat].forEach((group) => {
      const head = document.createElement("div");
      head.className = "menu-group-head";
      head.style.animationDelay = `${delay}s`;
      head.innerHTML = `<h3>${group.title}</h3>`;
      menuList.appendChild(head);
      delay = Math.min(delay + step, 0.55);
      if (group.note) {
        const note = document.createElement("p");
        note.className = "menu-group-note";
        note.textContent = group.note;
        note.style.animationDelay = `${delay}s`;
        menuList.appendChild(note);
      }
      group.items.forEach((item) => {
        const row = document.createElement("article");
        row.className = "menu-item";
        row.style.animationDelay = `${delay}s`;
        delay = Math.min(delay + step, 0.55);
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
        menuList.appendChild(row);
      });
    });
  }
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => { t.classList.remove("is-active"); t.setAttribute("aria-selected", "false"); });
      tab.classList.add("is-active");
      tab.setAttribute("aria-selected", "true");
      renderMenu(tab.dataset.cat);
    });
  });
  renderMenu("vorspeisen");
  menuList.addEventListener("click", (e) => {
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
    if (!priceBook.has(id)) return;
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
  cartItemsEl.addEventListener("click", (e) => {
    const btn = e.target.closest(".qty-btn");
    if (!btn) return;
    changeQty(btn.closest(".cart-item").dataset.id, btn.dataset.act === "plus" ? 1 : -1);
  });

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
