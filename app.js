// ============================================
//  SNACKBOX — app.js
//  Menu data, cart, language, WhatsApp order
// ============================================

// ---- YOUR WHATSAPP NUMBER ----
// Replace with your number in international format (no + or spaces)
const WHATSAPP_NUMBER = "628123456789"; // e.g. Indonesia: 628xxxxxxxxx

// ---- MENU DATA ----
// For images: put your image files in an /images/ folder on GitHub.
// Set "img" to the filename (e.g. "images/keripik.jpg").
// If the file doesn't exist, an emoji placeholder is shown automatically.
const menuData = [
  {
    id: 1, category: "snack",
    nameEn: "Crispy Potato Chips",
    nameId: "Keripik Kentang Renyah",
    descEn: "Golden, crunchy chips with a light seasoning. Perfect anytime snack!",
    descId: "Keripik emas renyah dengan bumbu ringan. Camilan sempurna kapan saja!",
    price: 15000,
    img: "images/chips.jpg",
    emoji: "🥔"
  },
  {
    id: 2, category: "snack",
    nameEn: "Spicy Fried Tempeh",
    nameId: "Tempe Goreng Pedas",
    descEn: "Crispy fried tempeh with a spicy kick. Indonesian classic!",
    descId: "Tempe goreng renyah dengan sensasi pedas. Klasik Indonesia!",
    price: 12000,
    img: "images/tempeh.jpg",
    emoji: "🌶️"
  },
  {
    id: 3, category: "snack",
    nameEn: "Cheese Sticks",
    nameId: "Stik Keju",
    descEn: "Crunchy cheese-flavored sticks. Great for munching!",
    descId: "Stik renyah rasa keju. Cocok untuk ngemil!",
    price: 18000,
    img: "images/cheese-sticks.jpg",
    emoji: "🧀"
  },
  {
    id: 4, category: "sweet",
    nameEn: "Chocolate Brownies",
    nameId: "Brownies Coklat",
    descEn: "Rich, fudgy brownies made with premium chocolate. Pure bliss!",
    descId: "Brownies lembut dan kaya rasa dari coklat premium. Memanjakan lidah!",
    price: 25000,
    img: "images/brownies.jpg",
    emoji: "🍫"
  },
  {
    id: 5, category: "sweet",
    nameEn: "Rainbow Donut",
    nameId: "Donat Pelangi",
    descEn: "Fluffy donut with colorful rainbow sprinkles on top!",
    descId: "Donat lembut dengan topping sprinkle pelangi berwarna-warni!",
    price: 20000,
    img: "images/donut.jpg",
    emoji: "🍩"
  },
  {
    id: 6, category: "sweet",
    nameEn: "Mochi Ice Cream",
    nameId: "Mochi Es Krim",
    descEn: "Soft, chewy mochi filled with creamy ice cream.",
    descId: "Mochi kenyal berisi es krim yang creamy dan lembut.",
    price: 22000,
    img: "images/mochi.jpg",
    emoji: "🍡"
  },
  {
    id: 7, category: "drink",
    nameEn: "Fresh Lemonade",
    nameId: "Lemonade Segar",
    descEn: "Freshly squeezed lemon with a hint of mint. Super refreshing!",
    descId: "Perasan lemon segar dengan sentuhan mint. Sangat menyegarkan!",
    price: 18000,
    img: "images/lemonade.jpg",
    emoji: "🍋"
  },
  {
    id: 8, category: "drink",
    nameEn: "Matcha Latte",
    nameId: "Matcha Latte",
    descEn: "Premium Japanese matcha blended with creamy milk. Rich and smooth.",
    descId: "Matcha Jepang premium dicampur susu creamy. Kaya dan lembut.",
    price: 28000,
    img: "images/matcha.jpg",
    emoji: "🍵"
  },
  {
    id: 9, category: "drink",
    nameEn: "Strawberry Milkshake",
    nameId: "Milkshake Stroberi",
    descEn: "Thick and creamy strawberry milkshake. A sweet treat!",
    descId: "Milkshake stroberi yang kental dan creamy. Manisnya pas!",
    price: 30000,
    img: "images/milkshake.jpg",
    emoji: "🍓"
  }
];

// ---- STATE ----
let cart = {};
let currentLang = "en";
let currentFilter = "all";

// ---- INIT ----
document.addEventListener("DOMContentLoaded", () => {
  renderMenu();
});

// ---- RENDER MENU ----
function renderMenu() {
  const grid = document.getElementById("menuGrid");
  const filtered = currentFilter === "all"
    ? menuData
    : menuData.filter(item => item.category === currentFilter);

  grid.innerHTML = filtered.map(item => {
    const name  = currentLang === "en" ? item.nameEn  : item.nameId;
    const desc  = currentLang === "en" ? item.descEn  : item.descId;
    const addLabel = currentLang === "en" ? "Add +" : "Tambah +";
    const tagLabels = { snack: "Snack", sweet: "Sweet", drink: "Drink" };
    const tagLabelsId = { snack: "Camilan", sweet: "Manis", drink: "Minuman" };
    const tagLabel = currentLang === "en" ? tagLabels[item.category] : tagLabelsId[item.category];

    return `
      <div class="menu-card" data-category="${item.category}">
        <div class="menu-card-img-placeholder" style="background:${getCategoryGradient(item.category)}">
          <img
            class="menu-card-img"
            src="${item.img}"
            alt="${name}"
            onerror="this.style.display='none'"
            style="position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;"
          />
          <span style="font-size:4rem;position:relative;z-index:1;">${item.emoji}</span>
        </div>
        <div class="menu-card-body">
          <span class="menu-card-tag tag-${item.category}">${tagLabel}</span>
          <h3>${name}</h3>
          <p>${desc}</p>
          <div class="menu-card-footer">
            <span class="menu-price">${formatIDR(item.price)}</span>
            <button class="add-btn" onclick="addToCart(${item.id})">${addLabel}</button>
          </div>
        </div>
      </div>
    `;
  }).join("");

  // Fix image overlay positioning
  document.querySelectorAll(".menu-card-img-placeholder").forEach(el => {
    el.style.position = "relative";
    el.style.overflow = "hidden";
  });
}

function getCategoryGradient(cat) {
  const g = {
    snack: "linear-gradient(135deg,#FFE5D0,#FFD0A0)",
    sweet: "linear-gradient(135deg,#FFD6E8,#FFC0D5)",
    drink: "linear-gradient(135deg,#D0F4FF,#B0E8FF)"
  };
  return g[cat] || "#f0f0f0";
}

// ---- FILTER ----
function filterMenu(cat) {
  currentFilter = cat;
  document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
  event.currentTarget.classList.add("active");
  renderMenu();
}

// ---- CART ----
function addToCart(id) {
  cart[id] = (cart[id] || 0) + 1;
  updateCartUI();
  const item = menuData.find(m => m.id === id);
  const name = currentLang === "en" ? item.nameEn : item.nameId;
  showToast(currentLang === "en"
    ? `✅ ${name} added to cart!`
    : `✅ ${name} ditambahkan ke keranjang!`);
}

function changeQty(id, delta) {
  cart[id] = (cart[id] || 0) + delta;
  if (cart[id] <= 0) delete cart[id];
  updateCartUI();
}

function updateCartUI() {
  const total = Object.keys(cart).reduce((sum, id) => {
    const item = menuData.find(m => m.id === parseInt(id));
    return sum + item.price * cart[id];
  }, 0);

  const totalCount = Object.values(cart).reduce((a, b) => a + b, 0);
  document.getElementById("cartBadge").textContent = totalCount;
  document.getElementById("cartTotal").textContent = formatIDR(total);

  // Cart sidebar items
  const cartItemsEl = document.getElementById("cartItems");
  if (!totalCount) {
    cartItemsEl.innerHTML = `
      <div class="empty-cart">
        <span>🛒</span>
        <p>${currentLang === "en" ? "Your cart is empty!" : "Keranjangmu kosong!"}</p>
      </div>`;
  } else {
    cartItemsEl.innerHTML = Object.keys(cart).map(id => {
      const item = menuData.find(m => m.id === parseInt(id));
      const name = currentLang === "en" ? item.nameEn : item.nameId;
      return `
        <div class="cart-item">
          <span class="cart-item-emoji">${item.emoji}</span>
          <div class="cart-item-info">
            <div class="cart-item-name">${name}</div>
            <div class="cart-item-price">${formatIDR(item.price)} / item</div>
          </div>
          <div class="cart-item-controls">
            <button class="qty-btn" onclick="changeQty(${id},-1)">−</button>
            <span class="qty-num">${cart[id]}</span>
            <button class="qty-btn" onclick="changeQty(${id},1)">+</button>
          </div>
        </div>`;
    }).join("");
  }

  // Order summary
  const summaryEl = document.getElementById("orderSummary");
  if (!totalCount) {
    summaryEl.innerHTML = `
      <h3>${currentLang === "en" ? "Your Cart is Empty 🛒" : "Keranjangmu Kosong 🛒"}</h3>
      <p>${currentLang === "en" ? "Add items from the menu above!" : "Tambahkan item dari menu di atas!"}</p>`;
  } else {
    const itemsHtml = Object.keys(cart).map(id => {
      const item = menuData.find(m => m.id === parseInt(id));
      const name = currentLang === "en" ? item.nameEn : item.nameId;
      return `
        <div class="summary-item">
          <span class="summary-item-name">${item.emoji} ${name}</span>
          <span class="summary-item-qty">× ${cart[id]}</span>
          <span class="summary-item-price">${formatIDR(item.price * cart[id])}</span>
        </div>`;
    }).join("");

    summaryEl.innerHTML = `
      <h3>${currentLang === "en" ? "Order Summary 🧾" : "Ringkasan Pesanan 🧾"}</h3>
      ${itemsHtml}
      <div class="summary-total-row">
        <span>${currentLang === "en" ? "TOTAL" : "TOTAL"}</span>
        <span>${formatIDR(total)}</span>
      </div>`;
  }
}

function toggleCart() {
  document.getElementById("cartSidebar").classList.toggle("open");
  document.getElementById("cartOverlay").classList.toggle("open");
}

// ---- LANGUAGE ----
function toggleLanguage() {
  currentLang = currentLang === "en" ? "id" : "en";
  const btn = document.getElementById("langBtn");

  // Update button label
  btn.textContent = currentLang === "en" ? "🌐 Indonesia" : "🌐 English";

  // Update all [data-en] / [data-id] elements
  document.querySelectorAll("[data-en]").forEach(el => {
    el.textContent = currentLang === "en" ? el.dataset.en : el.dataset.id;
  });

  // Update input placeholders
  const placeholders = {
    customerName: { en: "e.g. Budi Santoso",    id: "cth. Budi Santoso" },
    customerEmail:{ en: "e.g. budi@email.com",  id: "cth. budi@email.com" },
    orderNotes:   { en: "Any special requests?", id: "Ada permintaan khusus?" }
  };
  Object.keys(placeholders).forEach(id => {
    const el = document.getElementById(id);
    if (el) el.placeholder = placeholders[id][currentLang];
  });

  // Re-render menu to update language
  renderMenu();
  updateCartUI();
}

// ---- WHATSAPP ORDER ----
function sendOrder() {
  const name  = document.getElementById("customerName").value.trim();
  const email = document.getElementById("customerEmail").value.trim();
  const notes = document.getElementById("orderNotes").value.trim();

  if (!name || !email) {
    showToast(currentLang === "en"
      ? "⚠️ Please fill in your name and email!"
      : "⚠️ Mohon isi nama dan email kamu!");
    return;
  }

  const cartKeys = Object.keys(cart);
  if (!cartKeys.length) {
    showToast(currentLang === "en"
      ? "🛒 Your cart is empty! Add some items first."
      : "🛒 Keranjangmu kosong! Tambahkan item dulu.");
    return;
  }

  // Build message
  let total = 0;
  const itemLines = cartKeys.map(id => {
    const item = menuData.find(m => m.id === parseInt(id));
    const name = currentLang === "en" ? item.nameEn : item.nameId;
    const subtotal = item.price * cart[id];
    total += subtotal;
    return `  • ${name} x${cart[id]} = ${formatIDR(subtotal)}`;
  }).join("\n");

  const greeting = currentLang === "en"
    ? `Hello! I'd like to place an order 🍿`
    : `Halo! Saya ingin memesan 🍿`;

  const customerInfo = currentLang === "en"
    ? `*Customer Details:*\nName: ${name}\nEmail: ${email}`
    : `*Detail Pelanggan:*\nNama: ${name}\nEmail: ${email}`;

  const orderHeader = currentLang === "en"
    ? `*Order Details:*` : `*Detail Pesanan:*`;

  const totalLabel = currentLang === "en"
    ? `*TOTAL: ${formatIDR(total)}*` : `*TOTAL: ${formatIDR(total)}*`;

  const notesLine = notes
    ? (currentLang === "en" ? `*Notes:* ${notes}` : `*Catatan:* ${notes}`)
    : "";

  const msg = [
    greeting, "",
    customerInfo, "",
    orderHeader,
    itemLines, "",
    totalLabel,
    notesLine,
    "",
    currentLang === "en"
      ? "Please confirm my order. Thank you! 🙏"
      : "Mohon konfirmasi pesanan saya. Terima kasih! 🙏"
  ].filter(Boolean).join("\n");

  const encoded = encodeURIComponent(msg);
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
  window.open(url, "_blank");
}

// ---- UTILS ----
function formatIDR(amount) {
  return "Rp " + amount.toLocaleString("id-ID");
}

let toastTimeout;
function showToast(msg) {
  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove("show"), 2600);
}
