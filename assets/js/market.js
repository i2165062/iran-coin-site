/* =========================================================
   IRAN NFT Market – JavaScript
   - Phantom wallet connection (Solana)
   - NFT explore grid (from assets/data/nfts.json)
   - My Panel demo (collection + listings stored in localStorage)
   - Converter simulator (i21 → Market token, Phase 2 UI)
   - Mobile Phantom banner + desktop QR
   ========================================================= */

/* ---------- Global state ---------- */
let currentWallet = null;
let nftData = [];
let ownedNfts = [];
let listingsByWallet = {}; // { [nftId]: { priceSol } }

let solConnection = null;

/* ---------- Token config (CHANGE THESE!) ---------- */

// i21 / IranCoin SPL mint address (current token on Solana)
// TODO: set to your real mint
const IRANCOIN_MINT_STRING = "4FCmKPqgpNVbzyBRtWPsh9mz3DCoqJFzTvazeAhzpump";
let IRANCOIN_MINT = null;

// Market token (Phase 2) SPL mint for NFT purchases
// TODO: when you create this mint, put its address here
const MARKET_TOKEN_MINT_STRING = "SET_MARKET_TOKEN_MINT_ADDRESS_HERE";
let MARKET_TOKEN_MINT = null;

// Converter design parameters (UI only right now)
const CONVERSION_RATE = 100; // 100 i21 → 1 Market token
const BURN_PERCENT = 50; // % of input i21 planned to burn

/* ---------- Helpers ---------- */

function shortenAddress(addr) {
  if (!addr) return "";
  return addr.slice(0, 4) + "..." + addr.slice(-4);
}

function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

/**
 * Build Phantom deeplink that opens this exact page inside Phantom mobile app.
 */
function buildPhantomDeepLink() {
  const dappUrl = encodeURIComponent(window.location.href);
  const ref = encodeURIComponent(window.location.origin);
  return `https://phantom.app/ul/browse/${dappUrl}?ref=${ref}`;
}

/* ---------- Solana connection ---------- */

function initSolanaConnection() {
  if (!window.solanaWeb3) {
    console.warn("solanaWeb3 not loaded yet");
    return;
  }

  if (!solConnection) {
    const { Connection } = window.solanaWeb3;

    // ⚠️ For production use your own RPC endpoint (Helius / QuickNode / etc)
    solConnection = new Connection(
      "https://mainnet.helius-rpc.com/?api-key=bb4aebe0-38f0-4d82-a5b7-989b168ee914",
      "confirmed"
    );
  }

  // Build PublicKey objects for token mints
  if (
    !IRANCOIN_MINT &&
    IRANCOIN_MINT_STRING &&
    IRANCOIN_MINT_STRING !== "YOUR_IRANCOIN_MINT_ADDRESS_HERE"
  ) {
    try {
      IRANCOIN_MINT = new window.solanaWeb3.PublicKey(IRANCOIN_MINT_STRING);
    } catch (e) {
      console.warn("Invalid IRANCOIN_MINT_STRING – please set a valid mint address.");
      IRANCOIN_MINT = null;
    }
  }

  if (
    !MARKET_TOKEN_MINT &&
    MARKET_TOKEN_MINT_STRING &&
    MARKET_TOKEN_MINT_STRING !== "SET_MARKET_TOKEN_MINT_ADDRESS_HERE"
  ) {
    try {
      MARKET_TOKEN_MINT = new window.solanaWeb3.PublicKey(MARKET_TOKEN_MINT_STRING);
    } catch (e) {
      console.warn("Invalid MARKET_TOKEN_MINT_STRING – please set a valid mint address.");
      MARKET_TOKEN_MINT = null;
    }
  }
}

/* ---------- Wallet (Phantom) ---------- */

async function connectWallet() {
  const provider = window.solana;

  // 1) Phantom not injected in this browser context
  if (!provider || !provider.isPhantom) {
    const deepLink = buildPhantomDeepLink();

    if (isMobile()) {
      // On mobile: suggest opening inside Phantom app
      const go = confirm(
        "On mobile, please open this page inside the Phantom wallet.\n\n" +
          "Tap OK to try opening in Phantom, or Cancel to stay here."
      );
      if (go) {
        window.location.href = deepLink;
      }
    } else {
      // Desktop: redirect to install Phantom extension
      alert("Phantom wallet not found. You will be redirected to install it.");
      window.open("https://phantom.app/", "_blank");
    }
    return;
  }

  // 2) Phantom is available (desktop extension or Phantom in-app browser)
  try {
    const resp = await provider.connect();
    currentWallet = resp.publicKey.toString();
    listingsByWallet = loadListingsForWallet(currentWallet);
    updateWalletUI();
    refreshMyPanel();
    await loadBalances();
  } catch (err) {
    console.error("Wallet connection rejected:", err);
  }
}

function disconnectWallet() {
  currentWallet = null;
  listingsByWallet = {};
  updateWalletUI();
  refreshMyPanel();
  resetBalanceUI();
}

function updateWalletUI() {
  const connectBtn = document.getElementById("connectWalletBtn");
  const walletInfo = document.getElementById("walletInfo");
  const walletAddressShort = document.getElementById("walletAddressShort");
  const panelNotConnected = document.getElementById("panelNotConnected");
  const panelConnected = document.getElementById("panelConnected");
  const panelWalletFull = document.getElementById("panelWalletFull");

  if (currentWallet) {
    connectBtn?.classList.add("hidden");
    walletInfo?.classList.remove("hidden");
    if (walletAddressShort) walletAddressShort.textContent = shortenAddress(currentWallet);

    panelNotConnected?.classList.add("hidden");
    panelConnected?.classList.remove("hidden");
    if (panelWalletFull) panelWalletFull.textContent = currentWallet;
  } else {
    connectBtn?.classList.remove("hidden");
    walletInfo?.classList.add("hidden");

    panelNotConnected?.classList.remove("hidden");
    panelConnected?.classList.add("hidden");
  }
}

/* ---------- Local storage for listings (demo) ---------- */

function getListingsKey(wallet) {
  return `iranNftListings_${wallet}`;
}

function loadListingsForWallet(wallet) {
  if (!wallet) return {};
  try {
    const raw = localStorage.getItem(getListingsKey(wallet));
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    console.warn("Failed to parse listings from storage", e);
    return {};
  }
}

function saveListingsForWallet(wallet, data) {
  if (!wallet) return;
  try {
    localStorage.setItem(getListingsKey(wallet), JSON.stringify(data));
  } catch (e) {
    console.warn("Failed to save listings to storage", e);
  }
}

/* ---------- Load NFTs from JSON ---------- */
/**
 * Expects a file: ../assets/data/nfts.json
 * Each item should be something like:
 * {
 *   "id": "1",
 *   "title": "...",
 *   "collection": "...",
 *   "category": "Architecture",
 *   "image": "../images/...jpg",
 *   "priceSol": 1.2,
 *   "sortIndex": 100,
 *   "description": "...",
 *   "creator": "...",
 *   "openseaUrl": "https://...",
 *   "demoOwner": "SOLANA_WALLET_ADDRESS_FOR_DEMO"
 * }
 */
async function loadNFTs() {
  try {
    const res = await fetch("../assets/data/nfts.json");
    if (!res.ok) throw new Error("Failed to load nfts.json");
    nftData = await res.json();
    renderExploreGrid();
    if (currentWallet) {
      refreshMyPanel();
    }
  } catch (err) {
    console.error(err);
  }
}

/* ---------- Explore grid ---------- */

function renderExploreGrid() {
  const grid = document.getElementById("nftGrid");
  const emptyState = document.getElementById("emptyStateExplore");
  const categoryFilter = document.getElementById("categoryFilter");
  const sortFilter = document.getElementById("sortFilter");

  if (!grid) return;

  let filtered = [...nftData];

  // Filter by category
  const category = categoryFilter?.value || "all";
  if (category !== "all") {
    filtered = filtered.filter((item) => item.category === category);
  }

  // Sort by price or latest
  const sort = sortFilter?.value || "latest";
  if (sort === "priceLowHigh") {
    filtered.sort((a, b) => (a.priceSol || 0) - (b.priceSol || 0));
  } else if (sort === "priceHighLow") {
    filtered.sort((a, b) => (b.priceSol || 0) - (a.priceSol || 0));
  } else if (sort === "latest") {
    filtered.sort((a, b) => (b.sortIndex || 0) - (a.sortIndex || 0));
  }

  grid.innerHTML = "";

  if (!filtered.length) {
    emptyState?.classList.remove("hidden");
    return;
  } else {
    emptyState?.classList.add("hidden");
  }

  // Create cards
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

/* ---------- Modal ---------- */

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

/* ---------- My Panel (demo) ---------- */

function computeOwnedNftsForCurrentWallet() {
  if (!currentWallet) {
    ownedNfts = [];
    return;
  }

  // DEMO:
  // If nfts.json has "demoOwner" equal to the wallet address, we treat it as owned.
  ownedNfts = nftData.filter(
    (item) =>
      item.demoOwner &&
      item.demoOwner.toLowerCase() === currentWallet.toLowerCase()
  );

  // FUTURE:
  // Replace this logic with a real Solana NFT ownership API or on-chain lookup.
}

function refreshMyPanel() {
  const statOwnedCount = document.getElementById("statOwnedCount");
  const statListingsCount = document.getElementById("statListingsCount");
  const collectionGrid = document.getElementById("myCollectionGrid");
  const listingsGrid = document.getElementById("myListingsGrid");
  const emptyCollection = document.getElementById("emptyMyCollection");
  const emptyListings = document.getElementById("emptyMyListings");

  if (!currentWallet) {
    ownedNfts = [];
    if (statOwnedCount) statOwnedCount.textContent = "0";
    if (statListingsCount) statListingsCount.textContent = "0";
    if (collectionGrid) collectionGrid.innerHTML = "";
    if (listingsGrid) listingsGrid.innerHTML = "";
    emptyCollection?.classList.remove("hidden");
    emptyListings?.classList.remove("hidden");
    return;
  }

  computeOwnedNftsForCurrentWallet();

  /* ----- Collection tab ----- */
  if (collectionGrid) collectionGrid.innerHTML = "";
  if (!ownedNfts.length) {
    emptyCollection?.classList.remove("hidden");
  } else {
    emptyCollection?.classList.add("hidden");
    ownedNfts.forEach((item) => {
      const card = document.createElement("article");
      card.className = "nft-card panel-compact";
      card.dataset.id = item.id;

      const isListed = listingsByWallet[item.id];

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
              <div class="price-label">${
                isListed ? "Listed (demo)" : "Not listed"
              }</div>
            </div>
          </div>
          <div class="nft-actions">
            <button class="btn btn-secondary btn-list">${
              isListed ? "Update price" : "List for sale"
            }</button>
            ${
              isListed
                ? '<button class="btn btn-ghost btn-unlist">Remove listing</button>'
                : ""
            }
          </div>
        </div>
      `;

      // Clicking image opens modal
      card
        .querySelector(".nft-thumb-wrapper")
        .addEventListener("click", () => openModal(item));

      // List / update price
      const listBtn = card.querySelector(".btn-list");
      listBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        handleListForSale(item);
      });

      // Unlist
      const unlistBtn = card.querySelector(".btn-unlist");
      if (unlistBtn) {
        unlistBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          handleUnlist(item);
        });
      }

      collectionGrid.appendChild(card);
    });
  }

  /* ----- Listings tab ----- */
  if (listingsGrid) listingsGrid.innerHTML = "";
  const listingIds = Object.keys(listingsByWallet || {});
  if (!listingIds.length) {
    emptyListings?.classList.remove("hidden");
  } else {
    emptyListings?.classList.add("hidden");
    listingIds.forEach((id) => {
      const item = nftData.find((n) => String(n.id) === String(id));
      if (!item) return;

      const listing = listingsByWallet[id];
      const card = document.createElement("article");
      card.className = "nft-card panel-compact";
      card.dataset.id = item.id;

      card.innerHTML = `
        <div class="nft-thumb-wrapper">
          <img src="${item.image}" alt="${item.title}" class="nft-thumb">
          <span class="nft-chip">Listed</span>
        </div>
        <div class="nft-body">
          <h3 class="nft-title">${item.title}</h3>
          <p class="nft-collection">${item.collection}</p>
          <div class="nft-footer">
            <div>
              <div class="price-pill">
                <span>${listing.priceSol}</span>
                <span>SOL</span>
              </div>
              <div class="price-label">Demo listing (local)</div>
            </div>
          </div>
          <div class="nft-actions">
            <button class="btn btn-secondary btn-list-update">Update price</button>
            <button class="btn btn-ghost btn-unlist">Remove listing</button>
          </div>
        </div>
      `;

      card
        .querySelector(".nft-thumb-wrapper")
        .addEventListener("click", () => openModal(item));

      card
        .querySelector(".btn-list-update")
        .addEventListener("click", (e) => {
          e.stopPropagation();
          handleListForSale(item);
        });

      card.querySelector(".btn-unlist").addEventListener("click", (e) => {
        e.stopPropagation();
        handleUnlist(item);
      });

      listingsGrid.appendChild(card);
    });
  }

  if (statOwnedCount) statOwnedCount.textContent = String(ownedNfts.length);
  if (statListingsCount) statListingsCount.textContent = String(listingIds.length);
}

/* ---------- Listing handlers (demo only) ---------- */

function handleListForSale(item) {
  if (!currentWallet) {
    alert("Please connect your wallet first.");
    return;
  }

  const currentListing = listingsByWallet[item.id];
  const defaultPrice = currentListing?.priceSol || item.priceSol || 1;
  const value = prompt("Set listing price in SOL (demo only):", defaultPrice);

  if (!value) return;
  const priceNum = Number(value);
  if (isNaN(priceNum) || priceNum <= 0) {
    alert("Invalid price.");
    return;
  }

  listingsByWallet[item.id] = { priceSol: priceNum };
  saveListingsForWallet(currentWallet, listingsByWallet);
  refreshMyPanel();

  // FUTURE: here you would call your marketplace smart contract to list the NFT.
}

function handleUnlist(item) {
  if (!currentWallet) return;
  if (!listingsByWallet[item.id]) return;

  const sure = confirm("Remove this listing? (demo only)");
  if (!sure) return;

  delete listingsByWallet[item.id];
  saveListingsForWallet(currentWallet, listingsByWallet);
  refreshMyPanel();

  // FUTURE: call marketplace contract to cancel listing.
}

/* ---------- Balances (SOL + tokens) ---------- */

function resetBalanceUI() {
  const solEl = document.getElementById("statSolBalance");
  const tokI21El = document.getElementById("statTokenBalanceI21");
  const tokMarketEl = document.getElementById("statTokenBalanceMarket");
  if (solEl) solEl.textContent = "–";
  if (tokI21El) tokI21El.textContent = "–";
  if (tokMarketEl) tokMarketEl.textContent = "–";
}

async function loadBalances() {
  if (!currentWallet) {
    resetBalanceUI();
    return;
  }
  if (!window.solanaWeb3) {
    console.warn("solanaWeb3 not available");
    return;
  }

  initSolanaConnection();
  if (!solConnection) {
    console.warn("No Solana connection");
    return;
  }

  const solEl = document.getElementById("statSolBalance");
  const tokI21El = document.getElementById("statTokenBalanceI21");
  const tokMarketEl = document.getElementById("statTokenBalanceMarket");

  try {
    const { PublicKey, LAMPORTS_PER_SOL } = window.solanaWeb3;
    const pubkey = new PublicKey(currentWallet);

    const lamports = await solConnection.getBalance(pubkey);
    const sol = lamports / LAMPORTS_PER_SOL;
    if (solEl) solEl.textContent = sol.toFixed(4);
  } catch (e) {
    console.error("Failed to fetch SOL balance:", e);
    if (solEl) solEl.textContent = "error";
  }

  // i21 balance
  if (!IRANCOIN_MINT) {
    if (tokI21El) tokI21El.textContent = "set mint";
  } else {
    try {
      const { PublicKey } = window.solanaWeb3;
      const pubkey = new PublicKey(currentWallet);

      const resp = await solConnection.getParsedTokenAccountsByOwner(pubkey, {
        mint: IRANCOIN_MINT
      });

      let amount = 0;
      if (resp.value && resp.value.length > 0) {
        for (const acc of resp.value) {
          const info = acc.account.data.parsed.info;
          const tokenAmount = info.tokenAmount;
          amount += Number(tokenAmount.uiAmount || 0);
        }
      }

      if (tokI21El) tokI21El.textContent = amount.toLocaleString("en-US");
    } catch (e) {
      console.error("Failed to fetch i21 balance:", e);
      if (tokI21El) tokI21El.textContent = "error";
    }
  }

  // Market token balance (Phase 2)
  if (!MARKET_TOKEN_MINT) {
    if (tokMarketEl) tokMarketEl.textContent = "coming soon";
  } else {
    try {
      const { PublicKey } = window.solanaWeb3;
      const pubkey = new PublicKey(currentWallet);

      const resp = await solConnection.getParsedTokenAccountsByOwner(pubkey, {
        mint: MARKET_TOKEN_MINT
      });

      let amount = 0;
      if (resp.value && resp.value.length > 0) {
        for (const acc of resp.value) {
          const info = acc.account.data.parsed.info;
          const tokenAmount = info.tokenAmount;
          amount += Number(tokenAmount.uiAmount || 0);
        }
      }

      if (tokMarketEl) tokMarketEl.textContent = amount.toLocaleString("en-US");
    } catch (e) {
      console.error("Failed to fetch market token balance:", e);
      if (tokMarketEl) tokMarketEl.textContent = "error";
    }
  }
}

/* ---------- Tabs (main + inner) ---------- */

function setupMainTabs() {
  const exploreBtn = document.getElementById("exploreTabBtn");
  const myPanelBtn = document.getElementById("myPanelTabBtn");
  const exploreSection = document.getElementById("exploreSection");
  const myPanelSection = document.getElementById("myPanelSection");

  exploreBtn?.addEventListener("click", () => {
    exploreBtn.classList.add("active");
    myPanelBtn?.classList.remove("active");
    exploreSection?.classList.add("active");
    myPanelSection?.classList.remove("active");
  });

  myPanelBtn?.addEventListener("click", () => {
    myPanelBtn.classList.add("active");
    exploreBtn?.classList.remove("active");
    myPanelSection?.classList.add("active");
    exploreSection?.classList.remove("active");
  });
}

function setupPanelTabs() {
  const buttons = document.querySelectorAll(".panel-tab-btn");
  const tabs = {
    overview: document.getElementById("panelOverview"),
    collection: document.getElementById("panelCollection"),
    listings: document.getElementById("panelListings")
  };

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-panel-tab");
      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      Object.entries(tabs).forEach(([key, section]) => {
        if (!section) return;
        if (key === target) section.classList.add("active");
        else section.classList.remove("active");
      });
    });
  });
}

/* ---------- Converter simulator (Phase 2 UI) ---------- */

function setupConverterSimulator() {
  const input = document.getElementById("convertInputI21");
  const outMarket = document.getElementById("convertOutputMarket");
  const outBurn = document.getElementById("convertOutputBurn");

  if (!input || !outMarket || !outBurn) return;

  const update = () => {
    const value = Number(input.value || 0);
    if (isNaN(value) || value <= 0) {
      outMarket.textContent = "0";
      outBurn.textContent = "0";
      return;
    }

    const marketAmount = value / CONVERSION_RATE;
    const burnAmount = (value * BURN_PERCENT) / 100;

    outMarket.textContent = marketAmount.toFixed(4).replace(/\.?0+$/, "");
    outBurn.textContent = burnAmount.toFixed(2).replace(/\.?0+$/, "");
  };

  input.addEventListener("input", update);
}

/* ---------- Phantom helpers (mobile banner + desktop QR) ---------- */

function setupPhantomHelpers() {
  const mobileBanner = document.getElementById("phantomMobileBanner");
  const mobileBtn = document.getElementById("phantomMobileBannerBtn");
  const qrCard = document.getElementById("phantomQrCard");
  const qrImg = document.getElementById("phantomQrImage");

  const deepLink = buildPhantomDeepLink();

  // On mobile, if Phantom is NOT injected (Safari / Chrome), show banner.
  if (isMobile() && (!window.solana || !window.solana.isPhantom)) {
    mobileBanner?.classList.remove("hidden");
    if (mobileBtn) {
      mobileBtn.onclick = () => {
        window.location.href = deepLink;
      };
    }
  }

  // On desktop, show QR card so user can open this page in Phantom on their phone.
  if (!isMobile() && qrCard && qrImg) {
    const qrApiBase = "https://api.qrserver.com/v1/create-qr-code/";
    const qrUrl = `${qrApiBase}?size=220x220&data=${encodeURIComponent(
      deepLink
    )}`;
    qrImg.src = qrUrl;
    qrCard.classList.remove("hidden");
  }
}

/* ---------- Init ---------- */

document.addEventListener("DOMContentLoaded", () => {
  // Solana connection
  if (window.solanaWeb3) {
    initSolanaConnection();
  }

  // Load NFT dataset
  loadNFTs();

  // Wallet buttons
  document
    .getElementById("connectWalletBtn")
    ?.addEventListener("click", connectWallet);
  document
    .getElementById("panelConnectBtn")
    ?.addEventListener("click", connectWallet);
  document
    .getElementById("disconnectBtn")
    ?.addEventListener("click", disconnectWallet);

  // Filters
  document
    .getElementById("categoryFilter")
    ?.addEventListener("change", renderExploreGrid);
  document
    .getElementById("sortFilter")
    ?.addEventListener("change", renderExploreGrid);

  // Tabs
  setupMainTabs();
  setupPanelTabs();

  // Modal
  document
    .getElementById("modalCloseBtn")
    ?.addEventListener("click", closeModal);
  document
    .getElementById("modalCloseBtn2")
    ?.addEventListener("click", closeModal);
  document
    .querySelector("#nftModal .modal-backdrop")
    ?.addEventListener("click", closeModal);

  // Overview → Explore button
  document
    .getElementById("overviewGoExplore")
    ?.addEventListener("click", () => {
      document.getElementById("exploreTabBtn")?.click();
    });

  // Phase 2 converter UI
  setupConverterSimulator();

  // Phantom banner + QR
  setupPhantomHelpers();

  // If Phantom already trusted (e.g. desktop extension)
  if (window.solana && window.solana.isPhantom) {
    window.solana
      .connect({ onlyIfTrusted: true })
      .then(async (res) => {
        if (res.publicKey) {
          currentWallet = res.publicKey.toString();
          listingsByWallet = loadListingsForWallet(currentWallet);
          updateWalletUI();
          refreshMyPanel();
          await loadBalances();
        }
      })
      .catch(() => {});
  }
});
