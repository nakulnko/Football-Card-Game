
let playersPool = [];
let userCards = [];
let coins = 1000;
const PACK_COST = 100;

// Load players
fetch('players.json').then(r => r.json()).then(data => {
  playersPool = data;
});

function saveUserData() {
  localStorage.setItem("userCards", JSON.stringify(userCards));
  localStorage.setItem("coins", coins);
}
function loadUserData() {
  userCards = JSON.parse(localStorage.getItem("userCards")) || [];
  coins = parseInt(localStorage.getItem("coins")) || 1000;
  updateCoinsUI();
}
function updateCoinsUI() {
  if (document.getElementById("coins")) {
    document.getElementById("coins").textContent = coins;
  }
}

function initGame() {
  loadUserData();
  document.getElementById("open-pack-btn").addEventListener("click", openPack);
  updateCoinsUI();
}

function openPack() {
  if (coins < PACK_COST) { alert('Not enough coins!'); return; }
  coins -= PACK_COST;
  const newCards = [];
  for (let i = 0; i < 1; i++) {
    const card = playersPool[Math.floor(Math.random() * playersPool.length)];
    newCards.push(card);
    userCards.push(card);
  }
  saveUserData();
  updateCoinsUI();
  displayPack(newCards);
}

function displayPack(cards) {
  const div = document.getElementById("pack-cards");
  div.innerHTML = "";
  cards.forEach(card => {
    const c = document.createElement("div");
    c.className = "card";
    c.innerHTML = `<strong>${card.name}</strong><br>Attack: ${card.attack}`;
    div.appendChild(c);
  });
}

// Collection
function initCollectionPage() {
  loadUserData();
  const col = document.getElementById("collection");
  userCards.forEach(card => {
    const c = document.createElement("div");
    c.className = "card";
    c.innerHTML = `<strong>${card.name}</strong><br>Attack: ${card.attack}`;
    col.appendChild(c);
  });
}

// Squad
function initSquadBuilderPage() {
  loadUserData();
  const squad = [];
  const squadSlots = document.getElementById("squad-slots");
  const collection = document.getElementById("collection-squad");

  userCards.forEach(card => {
    const c = document.createElement("div");
    c.className = "card";
    c.innerHTML = `<strong>${card.name}</strong><br>Attack: ${card.attack}`;
    collection.appendChild(c);
  });
}
