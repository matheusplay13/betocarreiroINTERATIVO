// =============================================
//  BETO CARRERO WORLD – APP.JS
// =============================================

// ── Rides (apenas para avaliações) ────────────────────────────────────────────

const RIDES = [
  { id: 1,  name: 'Fire Whip',              category: 'radical',  emoji: '🔥', desc: 'Montanha-russa invertida – pés soltos no ar!' },
  { id: 2,  name: 'Big Drop',               category: 'radical',  emoji: '🗼', desc: 'Uma das maiores torres de queda livre do Brasil' },
  { id: 3,  name: 'Star Mountain',          category: 'radical',  emoji: '⭐', desc: 'Montanha-russa clássica com loopings emocionantes' },
  { id: 4,  name: 'Rebuliço',              category: 'radical',  emoji: '🌀', desc: 'Gira no ar: horizontal, vertical e diagonal' },
  { id: 5,  name: 'Spin Blast',             category: 'radical',  emoji: '💿', desc: 'Disco gigante para 40 pessoas sobre trilho em onda' },
  { id: 6,  name: 'Madagascar Crazy River', category: 'agua',     emoji: '🦁', desc: 'Bote gigante em corredeiras com personagens do Madagascar' },
  { id: 7,  name: 'Tchibum',               category: 'agua',     emoji: '💦', desc: 'Montanha-russa com queda em água a 80 km/h!' },
  { id: 8,  name: 'Super Soaker Splash',    category: 'agua',     emoji: '🔫', desc: 'Brinquedo giratório com lançadores de água' },
  { id: 9,  name: 'Hot Wheels Turbo Drive', category: 'familia',  emoji: '🏎️', desc: 'Simulador em pista – pilote um carrinho real!' },
  { id: 10, name: 'Tigor Mountain',         category: 'familia',  emoji: '🐯', desc: 'Montanha-russa mais leve, ideal para toda a família' },
  { id: 11, name: 'Ferrovia DinoMagic',     category: 'familia',  emoji: '🚂', desc: 'Passeio de trem clássico por cenários com dinossauros' },
  { id: 12, name: 'Barco Pirata',           category: 'familia',  emoji: '🏴‍☠️', desc: 'Barco pêndulo tradicional na Ilha dos Piratas' },
  { id: 13, name: 'Raskapuska',             category: 'familia',  emoji: '⛵', desc: 'Passeio de barco por cenários coloridos dentro de montanha' },
  { id: 14, name: 'Roda Gigante',           category: 'familia',  emoji: '🎡', desc: 'Vista panorâmica incrível de todo o parque' },
  { id: 15, name: 'Autopista (Bate-bate)',  category: 'familia',  emoji: '🚗', desc: 'Clássico bate-bate para toda a família' },
  { id: 16, name: 'Carrossel Veneziano',    category: 'familia',  emoji: '🎠', desc: 'Carrossel luxuoso em estilo veneziano' },
  { id: 17, name: 'Dum Dum',                category: 'infantil', emoji: '🐊', desc: 'Montanha-russa infantil no formato de jacaré' },
  { id: 18, name: 'Hot Wheels Extreme Kids',category: 'infantil', emoji: '🚙', desc: 'Jipinhos elétricos para os pequeninos' },
  { id: 19, name: 'Acqua Boat',             category: 'infantil', emoji: '🚤', desc: 'Barquinhos na água para crianças' },
  { id: 20, name: 'Kart Baby',              category: 'infantil', emoji: '🏁', desc: 'Kartinho para os futuros pilotos mirins' },
  { id: 21, name: 'Adventure Kids',         category: 'infantil', emoji: '🧗', desc: 'Torre de escalada de madeira para crianças' },
  { id: 22, name: 'Baby Elefante',          category: 'infantil', emoji: '🐘', desc: 'Brinquedo clássico giratório para os bebês' },
  { id: 23, name: 'Portal da Escuridão',    category: 'pago',     emoji: '👻', desc: 'Labirinto interativo de terror com atores' },
  { id: 24, name: 'Nerf Arcade',            category: 'pago',     emoji: '🎯', desc: 'Jogos eletrônicos e desafios com lançadores Nerf' },
];

const CAT = {
  radical:  { label: '🔥 Radical',      cls: 'level-radical' },
  familia:  { label: '👨‍👩‍👧 Família',    cls: 'level-familia' },
  infantil: { label: '🧸 Infantil',     cls: 'level-infantil' },
  agua:     { label: '💧 Água',         cls: 'level-agua' },
  pago:     { label: '💳 Pago à parte', cls: 'level-pago' },
};

// ── LocalStorage ──────────────────────────────────────────────────────────────

const LS = {
  get: k => JSON.parse(localStorage.getItem(k) || 'null'),
  set: (k, v) => localStorage.setItem(k, JSON.stringify(v)),
};

let state = {
  // customPins: [{id, name, x, y, visited}]  – mapa checklist livre
  customPins: LS.get('bcw_pins')      || [],
  ratings:    LS.get('bcw_ratings')   || {},
  myRatings:  LS.get('bcw_myRatings') || {},
  feedbacks:  LS.get('bcw_feedbacks') || [],
  loggedIn:   false,
};

function save() {
  LS.set('bcw_pins',      state.customPins);
  LS.set('bcw_ratings',   state.ratings);
  LS.set('bcw_myRatings', state.myRatings);
  LS.set('bcw_feedbacks', state.feedbacks);
}

// Limpa dados demo antigos de avaliações se existirem
if (LS.get('bcw_checked')) { localStorage.removeItem('bcw_checked'); }

// ── Toast ─────────────────────────────────────────────────────────────────────

function showToast(msg, type = '') {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = `toast ${type} show`;
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), 3000);
}

// ── Navbar ────────────────────────────────────────────────────────────────────

const navbar    = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

window.addEventListener('scroll', () => navbar.classList.toggle('scrolled', window.scrollY > 20));
hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
document.querySelectorAll('.nav-link').forEach(l => l.addEventListener('click', () => navLinks.classList.remove('open')));

// ── MAP EDITOR ────────────────────────────────────────────────────────────────

const mapContainer  = document.getElementById('mapContainer');
const mapImg        = document.getElementById('mapImg');
const pinsLayer     = document.getElementById('pinsLayer');
const pinPopup      = document.getElementById('pinPopup');
const pinNameInput  = document.getElementById('pinNameInput');
const pinConfirmBtn = document.getElementById('pinConfirmBtn');
const pinCancelBtn  = document.getElementById('pinCancelBtn');

let pendingX = 0, pendingY = 0; // % coordinates of click

// Click on map → open popup
mapContainer.addEventListener('click', (e) => {
  // Ignore if click is on a pin or popup
  if (e.target.closest('.map-pin') || e.target.closest('.pin-popup')) return;

  const rect = mapImg.getBoundingClientRect();
  const containerRect = mapContainer.getBoundingClientRect();

  // Position relative to the image in %
  pendingX = ((e.clientX - rect.left) / rect.width)  * 100;
  pendingY = ((e.clientY - rect.top)  / rect.height) * 100;

  // Clamp to valid range
  pendingX = Math.max(2, Math.min(98, pendingX));
  pendingY = Math.max(5, Math.min(95, pendingY));

  // Position popup relative to mapContainer
  let popupLeft = e.clientX - containerRect.left + 12;
  let popupTop  = e.clientY - containerRect.top  - 20;

  // Prevent popup from going off right edge
  if (popupLeft + 240 > containerRect.width) {
    popupLeft = e.clientX - containerRect.left - 252;
  }
  // Prevent popup from going off top
  if (popupTop < 0) popupTop = 10;

  pinPopup.style.left = popupLeft + 'px';
  pinPopup.style.top  = popupTop  + 'px';
  pinPopup.classList.remove('hidden');
  pinNameInput.value = '';
  pinNameInput.focus();
});

// Confirm → add pin
function confirmPin() {
  const name = pinNameInput.value.trim();
  if (!name) { pinNameInput.focus(); return; }

  const pin = {
    id:      Date.now(),
    name,
    x:       pendingX,
    y:       pendingY,
    visited: false,
  };

  state.customPins.push(pin);
  save();
  closePopup();
  renderPin(pin);
  updateSidebar();
  updateHeroStat();
  showToast(`📍 "${name}" adicionado ao mapa!`, 'success');
}

function closePopup() {
  pinPopup.classList.add('hidden');
  pinNameInput.value = '';
}

pinConfirmBtn.addEventListener('click', confirmPin);
pinCancelBtn.addEventListener('click', closePopup);
pinNameInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') confirmPin();
  if (e.key === 'Escape') closePopup();
});

// Render a single pin element onto the map
function renderPin(pin) {
  const el = document.createElement('div');
  el.className = `map-pin${pin.visited ? ' visited' : ''}`;
  el.id = `pin-${pin.id}`;
  el.style.left = pin.x + '%';
  el.style.top  = pin.y + '%';
  el.title      = pin.name;

  el.innerHTML = `
    <div class="pin-label">${pin.name}</div>
    <div class="pin-head">
      <span class="pin-check-icon">${pin.visited ? '✓' : ''}</span>
    </div>
    <div class="pin-shadow"></div>
    <button class="pin-delete" title="Remover pin">×</button>
  `;

  // Click on pin body → toggle visited
  el.querySelector('.pin-head').addEventListener('click', (e) => {
    e.stopPropagation();
    toggleVisit(pin.id);
  });

  // Click × → delete
  el.querySelector('.pin-delete').addEventListener('click', (e) => {
    e.stopPropagation();
    deletePin(pin.id);
  });

  pinsLayer.appendChild(el);
}

function toggleVisit(id) {
  const pin = state.customPins.find(p => p.id === id);
  if (!pin) return;
  pin.visited = !pin.visited;
  save();

  // Update DOM
  const el = document.getElementById(`pin-${id}`);
  if (el) {
    el.classList.toggle('visited', pin.visited);
    el.querySelector('.pin-check-icon').textContent = pin.visited ? '✓' : '';
  }

  updateSidebar();
  updateHeroStat();
  showToast(pin.visited ? `✅ "${pin.name}" visitado!` : `↩️ "${pin.name}" desmarcado.`,
            pin.visited ? 'success' : '');
}

function deletePin(id) {
  const pin = state.customPins.find(p => p.id === id);
  state.customPins = state.customPins.filter(p => p.id !== id);
  save();

  const el = document.getElementById(`pin-${id}`);
  if (el) {
    el.style.animation = 'fadeOut 0.2s ease forwards';
    setTimeout(() => el.remove(), 200);
  }

  updateSidebar();
  updateHeroStat();
  if (pin) showToast(`🗑️ "${pin.name}" removido.`);
}

// Render all saved pins on load
function renderAllPins() {
  pinsLayer.innerHTML = '';
  state.customPins.forEach(renderPin);
}

// ── SIDEBAR ───────────────────────────────────────────────────────────────────

function updateSidebar() {
  const total   = state.customPins.length;
  const visited = state.customPins.filter(p => p.visited).length;
  const list    = document.getElementById('sidebarList');

  if (total === 0) {
    list.innerHTML = '<div class="sl-empty">Nenhum pin ainda.<br>Clique no mapa para começar! 👆</div>';
    return;
  }

  list.innerHTML = state.customPins.map(p => `
    <div class="sl-item ${p.visited ? 'visited' : ''}" onclick="toggleVisit(${p.id})">
      <div class="sl-check">${p.visited ? '✓' : ''}</div>
      <span class="sl-name">${p.name}</span>
      <button class="sl-del" onclick="event.stopPropagation();deletePin(${p.id})" title="Remover">×</button>
    </div>
  `).join('');
}

function updateHeroStat() {
  // elementos removidos do HTML — função mantida sem erros
}

// Clear all
document.getElementById('clearAll').addEventListener('click', () => {
  if (!state.customPins.length) return;
  if (!confirm('Remover todos os pins do mapa?')) return;
  state.customPins = [];
  save();
  renderAllPins();
  updateSidebar();
  updateHeroStat();
  showToast('🗑️ Todos os pins removidos.');
});

// ── RATINGS ───────────────────────────────────────────────────────────────────

let ratingFilter = 'all';

function renderRatings() {
  const grid     = document.getElementById('ratingsGrid');
  const filtered = RIDES.filter(r => ratingFilter === 'all' || r.category === ratingFilter);

  grid.innerHTML = filtered.map(r => {
    const myVal = state.myRatings[r.id] || 0;
    const rData = state.ratings[r.id]   || { sum: 0, count: 0 };
    const avg   = rData.count ? (rData.sum / rData.count).toFixed(1) : '—';

    const stars = [1,2,3,4,5].map(n => `
      <span class="star ${myVal >= n ? 'lit' : ''}"
            onclick="rateStar(${r.id}, ${n})" title="${n}★">⭐</span>
    `).join('');

    return `
      <div class="rating-row" id="rc-${r.id}">
        <span class="rr-emoji">${r.emoji}</span>
        <div class="rr-name">
          ${r.name}
          <div class="rr-cat">${CAT[r.category].label}</div>
        </div>
        <div class="rr-stars">${stars}</div>
        <div class="rr-avg">${avg !== '—' ? avg + '★' : '—'}</div>
      </div>`;
  }).join('');
}

function rateStar(rideId, val) {
  const prev  = state.myRatings[rideId] || 0;
  const rData = state.ratings[rideId]   || { sum: 0, count: 0 };
  if (prev) { rData.sum = rData.sum - prev + val; }
  else       { rData.sum += val; rData.count += 1; }
  state.myRatings[rideId] = val;
  state.ratings[rideId]   = rData;
  save();
  showToast(`${RIDES.find(r => r.id === rideId)?.name} avaliado com ${val}⭐`, 'success');
  renderRatings();
  if (state.loggedIn) renderAdminDashboard();
}

document.querySelectorAll('.filter-btn[data-rfilter]').forEach(btn => {
  btn.addEventListener('click', () => {
    ratingFilter = btn.dataset.rfilter;
    document.querySelectorAll('.filter-btn[data-rfilter]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderRatings();
  });
});

// ── FEEDBACK ──────────────────────────────────────────────────────────────────

let selectedEmoji = 0;

document.querySelectorAll('.emoji-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    selectedEmoji = +btn.dataset.val;
    document.querySelectorAll('.emoji-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
  });
});

document.getElementById('feedbackForm').addEventListener('submit', e => {
  e.preventDefault();
  const name  = document.getElementById('fbName').value.trim();
  const email = document.getElementById('fbEmail').value.trim();
  const visit = document.getElementById('fbVisit').value;
  const msg   = document.getElementById('fbMsg').value.trim();
  if (!name || !msg) { showToast('Preencha nome e comentário!', 'error'); return; }

  const EMOJIS = ['', '😞', '😐', '😊', '😄', '🤩'];
  state.feedbacks.unshift({
    id: Date.now(), name, email, visit, msg,
    emoji: EMOJIS[selectedEmoji] || '😊',
    date:  new Date().toLocaleDateString('pt-BR'),
  });
  save();
  document.getElementById('feedbackForm').reset();
  document.querySelectorAll('.emoji-btn').forEach(b => b.classList.remove('selected'));
  selectedEmoji = 0;
  renderWall();
  if (state.loggedIn) renderAdminDashboard();
  showToast('Feedback enviado! Obrigado 🎉', 'success');
});

function renderWall() {
  const list = document.getElementById('wallList');
  if (!state.feedbacks.length) {
    list.innerHTML = `<div class="wall-empty">✉️ Seja o primeiro a comentar!</div>`;
    return;
  }
  list.innerHTML = state.feedbacks.slice(0, 20).map(fb => `
    <div class="wall-item">
      <div class="wall-item-top">
        <div class="wall-avatar">${fb.name.charAt(0).toUpperCase()}</div>
        <div class="wall-meta">
          <div class="wall-name">${fb.name}</div>
          <div class="wall-date">${fb.date}${fb.visit ? ' · Visitou: ' + fb.visit : ''}</div>
        </div>
        <div class="wall-emoji">${fb.emoji}</div>
      </div>
      <p class="wall-msg">${fb.msg}</p>
    </div>
  `).join('');
}

// ── ADMIN ─────────────────────────────────────────────────────────────────────

document.getElementById('loginBtn').addEventListener('click', () => {
  const u = document.getElementById('adminUser').value.trim();
  const p = document.getElementById('adminPass').value;
  if (u === 'admin' && p === 'beto2024') {
    state.loggedIn = true;
    document.getElementById('adminLogin').classList.add('hidden');
    document.getElementById('adminDashboard').classList.remove('hidden');
    renderAdminDashboard();
    showToast('Login realizado! Bem-vindo 🔓', 'success');
  } else {
    const err = document.getElementById('loginError');
    err.classList.add('visible');
    setTimeout(() => err.classList.remove('visible'), 3000);
  }
});

document.getElementById('adminPass').addEventListener('keydown', e => {
  if (e.key === 'Enter') document.getElementById('loginBtn').click();
});

document.getElementById('logoutBtn').addEventListener('click', () => {
  state.loggedIn = false;
  document.getElementById('adminDashboard').classList.add('hidden');
  document.getElementById('adminLogin').classList.remove('hidden');
  document.getElementById('adminUser').value = '';
  document.getElementById('adminPass').value = '';
  showToast('Logout realizado.');
});

function renderAdminDashboard() {
  const entries = Object.entries(state.ratings);
  const totalRatings   = entries.reduce((s, [, v]) => s + v.count, 0);
  const totalFeedbacks = state.feedbacks.length;
  let avgSum = 0, avgCnt = 0, topRide = '—', topAvg = 0;
  entries.forEach(([id, v]) => {
    if (v.count) {
      const a = v.sum / v.count;
      avgSum += v.sum; avgCnt += v.count;
      if (a > topAvg) { topAvg = a; topRide = RIDES.find(r => r.id === +id)?.name || '—'; }
    }
  });
  document.getElementById('ascTotalRatings').textContent   = totalRatings;
  document.getElementById('ascTotalFeedbacks').textContent = totalFeedbacks;
  document.getElementById('ascAvgRating').textContent      = avgCnt ? (avgSum/avgCnt).toFixed(1) : '0.0';
  document.getElementById('ascTopRide').textContent        = topRide.length > 12 ? topRide.slice(0,12)+'…' : topRide;

  const tbody  = document.getElementById('adminTableBody');
  const sorted = [...RIDES].sort((a, b) => {
    const ra = state.ratings[a.id] || { sum:0, count:0 };
    const rb = state.ratings[b.id] || { sum:0, count:0 };
    return (rb.count ? rb.sum/rb.count : 0) - (ra.count ? ra.sum/ra.count : 0);
  });
  tbody.innerHTML = sorted.map(r => {
    const rd  = state.ratings[r.id] || { sum: 0, count: 0 };
    const avg = rd.count ? (rd.sum/rd.count).toFixed(1) : '—';
    const stars = rd.count ? '★'.repeat(Math.round(rd.sum/rd.count)) : '—';
    return `<tr>
      <td>${r.emoji} ${r.name}</td>
      <td><span class="card-level ${CAT[r.category].cls}" style="font-size:.75rem">${CAT[r.category].label}</span></td>
      <td>${rd.count}</td>
      <td>${avg !== '—' ? `<span class="avg-pill">⭐ ${avg}</span>` : '—'}</td>
      <td class="admin-stars">${stars}</td>
    </tr>`;
  }).join('');

  const fbList = document.getElementById('feedbackAdminList');
  fbList.innerHTML = !state.feedbacks.length
    ? `<div class="no-data">Nenhum feedback ainda.</div>`
    : state.feedbacks.slice(0,30).map(fb => `
      <div class="feedback-admin-item">
        <div class="fai-top">
          <span class="fai-name">${fb.name}</span>
          <span class="fai-emoji">${fb.emoji}</span>
          <span class="fai-date">${fb.date}</span>
        </div>
        <p class="fai-msg">${fb.msg}</p>
      </div>`).join('');
}

// ── Keyframe fadeOut ──────────────────────────────────────────────────────────

const styleSheet = document.createElement('style');
styleSheet.textContent = `@keyframes fadeOut { to { opacity:0; transform:translate(-50%,-100%) scale(0.5); } }`;
document.head.appendChild(styleSheet);

// ── INIT ──────────────────────────────────────────────────────────────────────

function init() {
  // Render saved pins after image loads (for correct % positioning)
  if (mapImg.complete) renderAllPins();
  else mapImg.addEventListener('load', renderAllPins);

  updateSidebar();
  updateHeroStat();
  renderRatings();
  renderWall();
}

init();
