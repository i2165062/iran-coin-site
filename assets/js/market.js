// Simple state
let currentWallet = null;
let nftData = [];

// Shorten address like So111..abcd
function shortenAddress(addr) {
  if (!addr) return "";
  return addr.slice(0, 4) + "..." + addr.slice(-4);
}

// Wallet connection (Phantom)
async function connectWallet() {
  const provider = window.solana;
  const connectBtn = document.getElementById("connectWalletBtn");

  if (!provider || !provider.isPhantom) {
    alert("Phantom wallet not found. You will be redirected to install it.");
    window.open("https://phantom.app/", "_blank");
    return;
  }

  try {
    const resp = await provider.connect();
    currentWallet = resp.publicKey.toString();
    updateWalletUI();
  } catch (err) {
    console.error("Wallet connection rejected:", err);
    connectBtn.disabled = false;
  }
}

function disconnectWallet() {
  currentWallet = null;
    // Phantom خود disconnect دارد اما در حالت read-only لازم نیست حتماً صدا بزنیم
  updateWalletUI();
}

function updateWalletUI() {
  const connectBtn = document.getElementById("connectWalletBtn");
  const walletInfo = document.getElementById("walletInfo");
  const walletAddressShort = document.getElementById("walletAddressShort");
  const panelNotConnected = document.getElementById("panelNotConnected");
  const panelConnected = document.getElementById("panelConnected");
  const panelWalletShort = document.getElementById("panelWalletShort");

  if (currentWallet) {
    connectBtn.classList.add("hidden");
    walletInfo.classList.remove("hidden");
    walletAddressShort.textContent = shortenAddress(currentWallet);

    panelNotConnected.classList.add("hidden");
    panelConnected.classList.remove("hidden");
    panelWalletShort.textContent = shortenAddress(currentWallet);
  } else {
    connectBtn.classList.remove("hidden");
    walletInfo.classList.add("hidden");

    panelNotConnected.classList.remove("hidden");
    panelConnected.classList.add("hidden");
  }
}

// Load NFT data from JSON
async function loadNFTs() {
  try {
    const res = await fetch("assets/data/nfts.json");
    if (!res.ok) throw new Error("Failed to load nfts.json");
    nftData = await res.json();
    renderGrid();
  } catch (err) {
    console.error(err);
  }
}

// Render NFT grid with filters
function renderGrid() {
  const grid = document.getElementById("nftGrid");
  const emptyState = document.getElementById("emptyStateExplore");
  const categoryFilter = document.getElementById("categoryFilter");
  const sortFilter = document.getElementById("sortFilter");

  if (!grid) return;

  let filtered = [...nftData];

  // Category filter
  const category = categoryFilter.value;
  if (category !== "all") {
    filtered = filtered.filter((item) => item.category === category);
  }

  // Sort
  const sort = sortFilter.value;
  if (sort === "priceLowHigh") {
    filtered.sort((a, b) => (a.priceSol || 0) - (b.priceSol || 0));
  } else if (sort === "priceHighLow") {
    filtered.sort((a, b) => (b.priceSol || 0) - (a.priceSol || 0));
  } else if (sort === "latest") {
    filtered.sort((a, b) => (b.sortIndex || 0) - (a.sortIndex || 0));
  }

  grid.innerHTML = "";

  if (!filtered.length) {
    emptyState.classList.remove("hidden");
    return;
  } else {
    emptyState.classList.add("hidden");
  }

  filtered.forEach((item) => {
    const card = document.createElement("article");
    card.className = "nft-card";
    card.dataset.id = item.id;

    card.innerHTML = `
      <div class="nft-thumb-wrapper">
        <img src="${item.image}" alt="${item.title}" class="nft-thumb">
        <span class="nft-chip">${item.category}</span>
      </div>
      <div class="nft-body">
        <h3 class="nft-title">${item.title}</h3>
        <p class="nft-collection">${item.collection}</p>
        <div class="nft-footer">
          <div>
            <div class="price-pill">
              <span>${item.priceSol}</span>
              <span>SOL</span>
            </div>
            <div class="price-label">Floor price</div>
          </div>
          <span class="price-label">Tap for details</span>
        </div>
      </div>
    `;

    card.addEventListener("click", () => openModal(item));
    grid.appendChild(card);
  });
}

// Modal
function openModal(item) {
  const modal = document.getElementById("nftModal");
  const img = document.getElementById("modalImage");
  const title = document.getElementById("modalTitle");
  const col = document.getElementById("modalCollection");
  const cat = document.getElementById("modalCategory");
  const desc = document.getElementById("modalDescription");
  const price = document.getElementById("modalPrice");
  const creator = document.getElementById("modalCreator");
  const btn = document.getElementById("modalOpenSeaBtn");

  if (!modal) return;

  img.src = item.image;
  img.alt = item.title;
  title.textContent = item.title;
  col.textContent = item.collection || "IRAN NFT Collection";
  cat.textContent = item.category;
  desc.textContent = item.description || "";
  price.textContent = item.priceSol;
  creator.textContent = item.creator || "IRAN NFT Studio";

  if (item.openseaUrl) {
    btn.href = item.openseaUrl;
    btn.classList.remove("hidden");
  } else {
    btn.href = "#";
    btn.classList.add("hidden");
  }

  modal.classList.remove("hidden");
}

function closeModal() {
  const modal = document.getElementById("nftModal");
  if (modal) modal.classList.add("hidden");
}

// Tabs
function setupTabs() {
  const exploreBtn = document.getElementById("exploreTabBtn");
  const myPanelBtn = document.getElementById("myPanelTabBtn");
  const exploreSection = document.getElementById("exploreSection");
  const myPanelSection = document.getElementById("myPanelSection");

  if (!exploreBtn || !myPanelBtn) return;

  exploreBtn.addEventListener("click", () => {
    exploreBtn.classList.add("active");
    myPanelBtn.classList.remove("active");
    exploreSection.classList.add("active");
    myPanelSection.classList.remove("active");
  });

  myPanelBtn.addEventListener("click", () => {
    myPanelBtn.classList.add("active");
    exploreBtn.classList.remove("active");
    myPanelSection.classList.add("active");
    exploreSection.classList.remove("active");
  });
}

// Init
document.addEventListener("DOMContentLoaded", () => {
  // Load NFTs
  loadNFTs();

  // Wallet buttons
  const connectBtn = document.getElementById("connectWalletBtn");
  const panelConnectBtn = document.getElementById("panelConnectBtn");
  const disconnectBtn = document.getElementById("disconnectBtn");

  connectBtn?.addEventListener("click", connectWallet);
  panelConnectBtn?.addEventListener("click", connectWallet);
  disconnectBtn?.addEventListener("click", disconnectWallet);

  // Filters
  document.getElementById("categoryFilter")?.addEventListener("change", renderGrid);
  document.getElementById("sortFilter")?.addEventListener("change", renderGrid);

  // Tabs
  setupTabs();

  // Modal
  document.getElementById("modalCloseBtn")?.addEventListener("click", closeModal);
  document.getElementById("modalCloseBtn2")?.addEventListener("click", closeModal);
  document.querySelector("#nftModal .modal-backdrop")?.addEventListener("click", closeModal);

  // If Phantom is already connected (persisted)
  if (window.solana && window.solana.isPhantom) {
    window.solana.connect({ onlyIfTrusted: true })
      .then(res => {
        if (res.publicKey) {
          currentWallet = res.publicKey.toString();
          updateWalletUI();
        }
      })
      .catch(() => {});
  }
});
