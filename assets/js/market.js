// --- Global state ---
let currentWallet = null;
let nftData = [];
let ownedNfts = [];
let listingsByWallet = {}; // { walletAddress: { [nftId]: { priceSol } } }

// Solana connection (global)
let solConnection = null;

// IranCoin SPL Mint (توکن خودت روی سولانا)
// ⬇️ حتماً این رشته را با آدرس واقعی mint توکن خودت عوض کن
const IRANCOIN_MINT_STRING = "4FCmKPqgpNVbzyBRtWPsh9mz3DCoqJFzTvazeAhzpump";
let IRANCOIN_MINT = null;

// Shorten address like So11..abcd
function shortenAddress(addr) {
  if (!addr) return "";
  return addr.slice(0, 4) + "..." + addr.slice(-4);
}

// Init Solana connection
function initSolanaConnection() {
  if (!window.solanaWeb3) {
    console.warn("solanaWeb3 not loaded yet");
    return;
  }
  if (!solConnection) {
    const { Connection, clusterApiUrl } = window.solanaWeb3;
    // برای پروژه جدی بهتره RPC اختصاصی بزاری، این فقط مثال mainnet-beta است
    solConnection = new Connection(clusterApiUrl("mainnet-beta"), "confirmed");
  }

  // سعی می‌کنیم mint توکن را از رشته بسازیم
  if (!IRANCOIN_MINT && IRANCOIN_MINT_STRING && IRANCOIN_MINT_STRING !== "YOUR_IRANCOIN_MINT_ADDRESS_HERE") {
    try {
      IRANCOIN_MINT = new window.solanaWeb3.PublicKey(IRANCOIN_MINT_STRING);
    } catch (e) {
      console.warn("Invalid IRANCOIN_MINT_STRING, please set a valid mint address.");
      IRANCOIN_MINT = null;
    }
  }
}

// --- Wallet (Phantom) ---
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
    listingsByWallet = loadListingsForWallet(currentWallet);
    updateWalletUI();
    refreshMyPanel();
    await loadBalances(); // ⬅️ بعد از اتصال، بالانس‌ها را می‌گیریم
  } catch (err) {
    console.error("Wallet connection rejected:", err);
    if (connectBtn) connectBtn.disabled = false;
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

// --- Storage helpers for demo listings ---
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

// --- Load NFTs (demo dataset) ---
async function loadNFTs() {
  try {
    const res = await fetch("assets/data/nfts.json");
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

// --- Explore grid ---
function renderExploreGrid() {
  const grid = document.getElementById("nftGrid");
  const emptyState = document.getElementById("emptyStateExplore");
  const categoryFilter = document.getElementById("categoryFilter");
  const sortFilter = document.getElementById("sortFilter");

  if (!grid) return;

  let filtered = [...nftData];

  // Category filter
  const category = categoryFilter?.value || "all";
  if (category !== "all") {
    filtered = filtered.filter((item) => item.category === category);
  }

  // Sort
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

// --- Modal ---
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

// --- My Panel logic (demo) ---

// در نسخه واقعی، این تابع باید از API سولانا/مارکت داده واقعی بگیرد
function computeOwnedNftsForCurrentWallet() {
  if (!currentWallet) {
    ownedNfts = [];
    return;
  }

  // DEMO:
  // در nfts.json می‌توانی برای بعضی NFTها فیلد "demoOwner" را برابر یک آدرس سولانا قرار دهی
  // اگر demoOwner == currentWallet، آن NFT را "owned" حساب می‌کنیم.
  ownedNfts = nftData.filter(
    (item) => item.demoOwner && item.demoOwner.toLowerCase() === currentWallet.toLowerCase()
  );

  // در آینده:
  // اینجا باید یک fetch به API موردنظر بزنی (Helius / OpenSea / …)
  // و بر اساس آن، ownedNfts را بسازی.
}

function refreshMyPanel() {
  const statOwnedCount = document.getElementById("statOwnedCount");
  const statListingsCount = document.getElementById("statListingsCount");
  const collectionGrid = document.getElementById("myCollectionGrid");
  const listingsGrid = document.getElementById("myListingsGrid");
  const emptyCollection = document.getElementById("emptyMyCollection");
  const emptyListings = document.getElementById("emptyMyListings");

  if (!currentWallet) {
    // اگر والت وصل نیست، فقط استیت قبلی را پاک می‌کنیم
    ownedNfts = [];
    if (statOwnedCount) statOwnedCount.textContent = "0";
    if (statListingsCount) statListingsCount.textContent = "0";
    if (collectionGrid) collectionGrid.innerHTML = "";
    if (listingsGrid) listingsGrid.innerHTML = "";
    emptyCollection?.classList.remove("hidden");
    emptyListings?.classList.remove("hidden");
    return;
  }

  // محاسبه NFTهای متعلق به این والت در دمو
  computeOwnedNftsForCurrentWallet();

  // رندر Collection (NFTهایی که owner هستند)
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
              <div class="price-label">${isListed ? "Listed (demo)" : "Not listed"}</div>
            </div>
          </div>
          <div class="nft-actions">
            <button class="btn btn-secondary btn-list">${isListed ? "Update price" : "List for sale"}</button>
            ${
              isListed
                ? '<button class="btn btn-ghost btn-unlist">Remove listing</button>'
                : ""
            }
          </div>
        </div>
      `;

      // باز کردن مودال کلیک روی عکس
      card.querySelector(".nft-thumb-wrapper").addEventListener("click", () => openModal(item));

      // دکمه لیست
      const listBtn = card.querySelector(".btn-list");
      listBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        handleListForSale(item);
      });

      // دکمه آن‌لیست
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

  // رندر Listings (از state لوکال)
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

      card.querySelector(".nft-thumb-wrapper").addEventListener("click", () => openModal(item));
      card.querySelector(".btn-list-update").addEventListener("click", (e) => {
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

// --- Listing handlers (demo) ---
function handleListForSale(item) {
  if (!currentWallet) {
    alert("Please connect your wallet first.");
    return;
  }

  const currentListing = listingsByWallet[item.id];
  const defaultPrice = currentListing?.priceSol || item.priceSol || 1;
  const value = prompt("Set listing price in SOL (demo only):", defaultPrice);

  if (!value) return; // cancel
  const priceNum = Number(value);
  if (isNaN(priceNum) || priceNum <= 0) {
    alert("Invalid price.");
    return;
  }

  listingsByWallet[item.id] = { priceSol: priceNum };
  saveListingsForWallet(currentWallet, listingsByWallet);
  refreshMyPanel();

  // در نسخه واقعی اینجا باید تراکنش لیستینگ روی مارکت‌پلیس/کانترکت اجرا شود.
}

function handleUnlist(item) {
  if (!currentWallet) return;
  if (!listingsByWallet[item.id]) return;

  const sure = confirm("Remove this listing? (demo only)");
  if (!sure) return;

  delete listingsByWallet[item.id];
  saveListingsForWallet(currentWallet, listingsByWallet);
  refreshMyPanel();

  // نسخه واقعی: call unlist/cancel on marketplace contract
}

// --- Balances (SOL + IranCoin) ---
function resetBalanceUI() {
  const solEl = document.getElementById("statSolBalance");
  const tokEl = document.getElementById("statTokenBalance");
  if (solEl) solEl.textContent = "–";
  if (tokEl) tokEl.textContent = "–";
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
  const tokEl = document.getElementById("statTokenBalance");

  try {
    const { PublicKey, LAMPORTS_PER_SOL } = window.solanaWeb3;
    const pubkey = new PublicKey(currentWallet);

    // SOL balance
    const lamports = await solConnection.getBalance(pubkey);
    const sol = lamports / LAMPORTS_PER_SOL;
    if (solEl) solEl.textContent = sol.toFixed(4);
  } catch (e) {
    console.error("Failed to fetch SOL balance:", e);
    if (solEl) solEl.textContent = "error";
  }

  // IranCoin SPL Token balance
  if (!IRANCOIN_MINT) {
    if (tokEl) tokEl.textContent = "set mint";
    return;
  }

  try {
    const { PublicKey } = window.solanaWeb3;
    const pubkey = new PublicKey(currentWallet);

    const resp = await solConnection.getParsedTokenAccountsByOwner(pubkey, {
      mint: IRANCOIN_MINT
    });

    let amount = 0;
    if (resp.value && resp.value.length > 0) {
      // اگر چند اکانت باشد، همه را جمع می‌کنیم
      for (const acc of resp.value) {
        const info = acc.account.data.parsed.info;
        const tokenAmount = info.tokenAmount;
        amount += Number(tokenAmount.uiAmount || 0);
      }
    }

    if (tokEl) tokEl.textContent = amount.toLocaleString("en-US");
  } catch (e) {
    console.error("Failed to fetch token balance:", e);
    if (tokEl) tokEl.textContent = "error";
  }
}

// --- Tabs (main and inner) ---
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
        if (key === target) {
          section.classList.add("active");
        } else {
          section.classList.remove("active");
        }
      });
    });
  });
}

// --- Init ---
document.addEventListener("DOMContentLoaded", () => {
  // Init Solana connection (در صورت وجود web3)
  if (window.solanaWeb3) {
    initSolanaConnection();
  }

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
  document.getElementById("categoryFilter")?.addEventListener("change", renderExploreGrid);
  document.getElementById("sortFilter")?.addEventListener("change", renderExploreGrid);

  // Tabs
  setupMainTabs();
  setupPanelTabs();

  // Modal
  document.getElementById("modalCloseBtn")?.addEventListener("click", closeModal);
  document.getElementById("modalCloseBtn2")?.addEventListener("click", closeModal);
  document.querySelector("#nftModal .modal-backdrop")?.addEventListener("click", closeModal);

  // Overview button
  document.getElementById("overviewGoExplore")?.addEventListener("click", () => {
    document.getElementById("exploreTabBtn")?.click();
  });

  // If Phantom already trusted
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
