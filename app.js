/* AUTOFOODZ — interactive logic */

const products = [
  { id:1, name:"Butter Chicken Bowl", cat:"Mains", price:299, img:"https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&q=80" },
  { id:2, name:"Truffle Mushroom Pasta", cat:"Mains", price:349, img:"https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600&q=80" },
  { id:3, name:"Mediterranean Bowl", cat:"Bowls", price:259, img:"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80" },
  { id:4, name:"Quinoa Power Bowl", cat:"Bowls", price:279, img:"https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80" },
  { id:5, name:"Margherita Pizza", cat:"Pizzas", price:329, img:"https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=600&q=80" },
  { id:6, name:"Pepperoni Supreme", cat:"Pizzas", price:399, img:"https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80" },
  { id:7, name:"Family Feast Combo", cat:"Combos", price:899, img:"https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80" },
  { id:8, name:"Crispy Chicken Wings", cat:"Snacks", price:229, img:"https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=600&q=80" },
  { id:9, name:"Loaded Nachos", cat:"Snacks", price:199, img:"https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=600&q=80" },
  { id:10, name:"Chocolate Lava Cake", cat:"Desserts", price:179, img:"https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&q=80" },
  { id:11, name:"Cold Brew Coffee", cat:"Beverages", price:149, img:"https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=600&q=80" },
  { id:12, name:"Fresh Fruit Smoothie", cat:"Beverages", price:159, img:"https://images.unsplash.com/photo-1502741338009-cac2772e18bc?w=600&q=80" },
];

const workflow = [
  { i:"📦", l:"Raw Materials" }, { i:"🛡️", l:"Quality Check" },
  { i:"🔍", l:"AI Inspection" }, { i:"🤖", l:"Robot Cooking" },
  { i:"📡", l:"Sensor Monitor" }, { i:"📦", l:"Packaging" },
  { i:"🏭", l:"Warehouse" }, { i:"🚚", l:"Delivery" },
];

const warehouses = [
  { city:"Bangalore", cap:"12,000 meals/day", orders:842, dispatch:"6,200" },
  { city:"Chennai", cap:"9,500 meals/day", orders:612, dispatch:"4,800" },
  { city:"Hyderabad", cap:"8,000 meals/day", orders:503, dispatch:"4,100" },
  { city:"Mumbai", cap:"15,000 meals/day", orders:1102, dispatch:"8,400" },
  { city:"Delhi", cap:"14,000 meals/day", orders:980, dispatch:"7,600" },
  { city:"Pune", cap:"7,500 meals/day", orders:421, dispatch:"3,500" },
];

const offers = [
  { tag:"Daily Deal", title:"20% off Bowls", desc:"Every weekday, 11am–3pm" },
  { tag:"Combo Pack", title:"Family Feast — Save ₹400", desc:"4 mains + 2 sides + 2 desserts" },
  { tag:"Weekend", title:"Buy 1 Pizza, Get 1 Free", desc:"Fri – Sun, dine-in & delivery" },
];

const reviews = [
  { name:"Aisha R.", rating:5, text:"The butter chicken arrived hot, perfectly portioned. You can taste the precision." },
  { name:"Rahul M.", rating:5, text:"Love the live order tracking. Felt like watching a factory tour for my dinner." },
  { name:"Priya S.", rating:4, text:"Truffle pasta is restaurant-grade. Delivery in 24 minutes flat." },
];

/* RENDER PRODUCTS + FILTERS */
let activeCat = "All";
const cats = ["All", ...new Set(products.map(p => p.cat))];

function renderFilters(){
  document.getElementById("filters").innerHTML = cats.map(c =>
    `<button class="filter-btn ${c===activeCat?'active':''}" data-cat="${c}">${c}</button>`
  ).join("");
  document.querySelectorAll(".filter-btn").forEach(b => {
    b.onclick = () => { activeCat = b.dataset.cat; renderFilters(); renderProducts(); };
  });
}

function renderProducts(){
  const list = activeCat === "All" ? products : products.filter(p => p.cat === activeCat);
  document.getElementById("products").innerHTML = list.map(p => `
    <article class="product" data-id="${p.id}">
      <div class="product-img"><img src="${p.img}" alt="${p.name}" loading="lazy"/></div>
      <div class="product-body">
        <p class="product-cat">${p.cat}</p>
        <h3 class="product-name">${p.name}</h3>
        <div class="product-foot">
          <span class="product-price">₹${p.price}</span>
          <button class="add-btn" data-id="${p.id}">Add +</button>
        </div>
      </div>
    </article>
  `).join("");
  document.querySelectorAll(".add-btn").forEach(b => {
    b.onclick = (e) => {
      e.stopPropagation();
      const p = products.find(x => x.id == b.dataset.id);
      addToCart(p);
    };
  });
}

/* WORKFLOW */
document.getElementById("workflow").innerHTML = workflow.map((w,i) => `
  <div class="step">
    <div class="step-icon">${w.i}</div>
    <div class="step-label">${w.l}</div>
    <span class="step-num">STEP ${String(i+1).padStart(2,"0")}</span>
  </div>
`).join("");

/* WAREHOUSES */
document.getElementById("warehouses-grid").innerHTML = warehouses.map(w => `
  <div class="warehouse">
    <div class="wh-head">
      <h3 class="wh-city">📍 ${w.city}</h3>
      <span class="live">Live</span>
    </div>
    <p class="wh-cap">Capacity · ${w.cap}</p>
    <div class="wh-stats">
      <div><span>Active orders</span><strong>${w.orders}</strong></div>
      <div><span>Daily dispatch</span><strong>${w.dispatch}</strong></div>
    </div>
  </div>
`).join("");

/* OFFERS */
document.getElementById("offers-grid").innerHTML = offers.map(o => `
  <div class="offer">
    <span class="offer-tag">${o.tag}</span>
    <h3>${o.title}</h3>
    <p>${o.desc}</p>
    <a href="#menu" class="offer-link">Claim deal →</a>
  </div>
`).join("");

/* REVIEWS */
document.getElementById("reviews-grid").innerHTML = reviews.map(r => `
  <div class="review">
    <div class="stars">${"★".repeat(r.rating)}${"☆".repeat(5-r.rating)}</div>
    <p>"${r.text}"</p>
    <p class="review-name">— ${r.name}</p>
  </div>
`).join("");

/* COUNTDOWN */
let t = { h:5, m:42, s:18 };
function renderCountdown(){
  const pad = n => String(n).padStart(2,"0");
  document.getElementById("countdown").innerHTML = `
    <div class="cd-cell"><b>${pad(t.h)}</b><span>HRS</span></div>
    <div class="cd-cell"><b>${pad(t.m)}</b><span>MIN</span></div>
    <div class="cd-cell"><b>${pad(t.s)}</b><span>SEC</span></div>
  `;
}
renderCountdown();
setInterval(() => {
  t.s--;
  if (t.s < 0) { t.s = 59; t.m--; }
  if (t.m < 0) { t.m = 59; t.h--; }
  if (t.h < 0) t.h = 23;
  renderCountdown();
}, 1000);

/* CART */
const cart = JSON.parse(localStorage.getItem("autofoodz_cart") || "[]");
function addToCart(p){
  cart.push(p);
  localStorage.setItem("autofoodz_cart", JSON.stringify(cart));
  toast(`✓ ${p.name} added to cart`);
}

/* TOAST */
let toastTimer;
function toast(msg){
  const el = document.getElementById("toast");
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 2200);
}

/* MOBILE MENU */
document.getElementById("menuToggle").onclick = () => {
  document.getElementById("navLinks").classList.toggle("open");
};
document.querySelectorAll("#navLinks a").forEach(a => {
  a.onclick = () => document.getElementById("navLinks").classList.remove("open");
});

/* CHATBOT */
const chatFab = document.getElementById("chatFab");
const chatPanel = document.getElementById("chatPanel");
chatFab.onclick = () => { chatPanel.hidden = !chatPanel.hidden; };
document.querySelectorAll(".chat-options button").forEach(b => {
  b.onclick = () => toast(`💬 ${b.textContent}`);
});

/* CONTACT FORM */
document.getElementById("contactForm").onsubmit = (e) => {
  e.preventDefault();
  e.target.reset();
  toast("✓ Message sent! We'll get back to you.");
};

/* INIT */
renderFilters();
renderProducts();
