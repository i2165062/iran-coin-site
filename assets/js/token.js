// IranCoin (i21) — Token Dashboard Frontend

// اگر صفحه https باشد، ما هم API را روی https صدا می‌زنیم
// (برای لوکال یا تست روی http هم کار می‌کند)
const API_BASE =
  window.location.protocol === "https:"
    ? "https://api.irannft.art/api"
    : "http://api.irannft.art/api";

const SUMMARY_URL = `${API_BASE}/i21/summary`;
const CONFIG_URL = "../assets/data/token-config.json";

// DOM helpers
const $ = (id) => document.getElementById(id);

const els = {
  globalStatus: $("globalStatus"),
  statusText: $("statusText"),
  priceStatus: $("priceStatus"),

  // price
  priceUsd: $("priceUsd"),
  priceSol: $("priceSol"),
  tokenSymbol: $("tokenSymbol"),
  tokenName: $("tokenName"),
  tokenMint: $("tokenMint"),
  volume24hUsd: $("volume24hUsd"),
  txns24hTotal: $("txns24hTotal"),

  // market
  fdvUsd: $("fdvUsd"),
  liquidityUsd: $("liquidityUsd"),
  decimals: $("decimals"),

  // supply
  totalSupply: $("totalSupply"),
  circulatingSupply: $("circulatingSupply"),
  lockedSupply: $("lockedSupply"),
  unlockedSupply: $("unlockedSupply"),

  // locked contracts
  lockedContractsList: $("lockedContractsList"),
  lockedTotalText: $("lockedTotalText"),
  lockedTeamText: $("lockedTeamText")
};

function formatNumber(n, options = {}) {
  if (n === null || n === undefined || isNaN(n)) return "–";
  const { decimals = 2, compact = false } = options;
  const fmt = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    notation: compact ? "compact" : "standard"
  });
  return fmt.format(n);
}

function setGlobalStatus(type, text) {
  if (!els.globalStatus) return;
  els.globalStatus.hidden = false;
  els.globalStatus.classList.toggle("status-ok", type === "ok");
  els.globalStatus.classList.toggle("status-error", type === "error");
  els.statusText.textContent = text;
}

function setPriceStatus(type, text) {
  if (!els.priceStatus) return;
  els.priceStatus.textContent = text;
  els.priceStatus.classList.toggle("pill-error", type === "error");
}

// --- Fetch summary from API ---

async function fetchSummary() {
  try {
    const res = await fetch(SUMMARY_URL, { cache: "no-store" });
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }
    const data = await res.json();
    if (!data.ok) {
      throw new Error(data.error || "Unknown API error");
    }

    renderSummary(data);
    setPriceStatus("ok", "Live");
    setGlobalStatus("ok", "Connected to i21 API successfully.");
  } catch (err) {
    console.error("Error loading summary:", err);
    setPriceStatus("error", "Error");
    setGlobalStatus("error", `Failed to load data from API: ${err.message}`);
  }
}

// --- Render summary ---

function renderSummary(summary) {
  const s = summary;

  // price
  els.priceUsd.textContent = s.priceUsd
    ? `$${formatNumber(s.priceUsd, { decimals: 6 })}`
    : "–";
  els.priceSol.textContent = s.priceSol
    ? `${formatNumber(s.priceSol, { decimals: 6 })} SOL`
    : "–";

  // token basics (fallback به config اگر null باشد)
  if (window.i21Config && window.i21Config.token) {
    els.tokenSymbol.textContent = window.i21Config.token.symbol || s.token || "i21";
    els.tokenName.textContent = window.i21Config.token.name || s.name || "I2165062 (i21)";
    els.tokenMint.textContent =
      window.i21Config.token.mint || s.mint || "4FCmKPqgpNVbzyBRtWPsh9mz3DCoqJFzTvazeAhzpump";
  } else {
    els.tokenSymbol.textContent = s.token || "i21";
    els.tokenName.textContent = s.name || "I2165062 (i21)";
    els.tokenMint.textContent =
      s.mint || "4FCmKPqgpNVbzyBRtWPsh9mz3DCoqJFzTvazeAhzpump";
  }

  // 24h volume & trades
  els.volume24hUsd.textContent = s.volume24hUsd
    ? `$${formatNumber(s.volume24hUsd, { compact: true })}`
    : "–";

  const buys = s.txns24h?.buys ?? null;
  const sells = s.txns24h?.sells ?? null;
  const total = s.txns24h?.total ?? null;
  els.txns24hTotal.textContent =
    total !== null ? `${total} trades (${buys} buys / ${sells} sells)` : "–";

  // market
  els.fdvUsd.textContent = s.fdvUsd
    ? `$${formatNumber(s.fdvUsd, { compact: true })}`
    : "–";
  els.liquidityUsd.textContent = s.liquidityUsd
    ? `$${formatNumber(s.liquidityUsd, { compact: true })}`
    : "–";
  els.decimals.textContent =
    s.decimals !== null && s.decimals !== undefined ? s.decimals : "–";

  // supply
  const totalSupply =
    window.i21Config?.supply?.total ?? s.circulatingSupply ?? null;
  const circulating = s.circulatingSupply ?? null;
  const locked =
    window.i21Config?.lockedContracts?.reduce(
      (acc, c) => acc + (Number(c.amount) || 0),
      0
    ) ?? null;

  const unlocked =
    totalSupply !== null && locked !== null ? totalSupply - locked : null;

  els.totalSupply.textContent =
    totalSupply !== null
      ? `${formatNumber(totalSupply)} ${window.i21Config?.token?.symbol || "i21"}`
      : "–";

  els.circulatingSupply.textContent =
    circulating !== null ? formatNumber(circulating) : "–";

  els.lockedSupply.textContent =
    locked !== null ? formatNumber(locked) : "–";

  els.unlockedSupply.textContent =
    unlocked !== null ? formatNumber(unlocked) : "–";
}

// --- Load local config (locked wallets etc.) ---

async function loadConfig() {
  try {
    const res = await fetch(CONFIG_URL, { cache: "no-store" });
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }
    const cfg = await res.json();
    window.i21Config = cfg;
    renderConfig(cfg);
  } catch (err) {
    console.warn("Failed to load token-config.json:", err);
  }
}

function renderConfig(cfg) {
  // Locked summary
  if (cfg.lockedSummary) {
    if (els.lockedTotalText) {
      const total = cfg.lockedSummary.totalLocked || 0;
      els.lockedTotalText.textContent = `${formatNumber(total)} ${
        cfg.token?.symbol || "i21"
      }`;
    }
    if (els.lockedTeamText) {
      const team = cfg.supply?.teamAllocation || 0;
      els.lockedTeamText.textContent = `${formatNumber(team)} ${
        cfg.token?.symbol || "i21"
      }`;
    }
  }

  // Locked contracts
  const list = els.lockedContractsList;
  list.innerHTML = "";

  if (!cfg.lockedContracts || !cfg.lockedContracts.length) {
    const empty = document.createElement("p");
    empty.className = "muted small";
    empty.textContent = "No locked contracts configured yet.";
    list.appendChild(empty);
    return;
  }

  cfg.lockedContracts.forEach((c) => {
    const item = document.createElement("div");
    item.className = "locked-item";

    const title = document.createElement("h3");
    title.className = "locked-title";
    title.textContent = c.label || "Locked Wallet";

    const meta = document.createElement("div");
    meta.className = "locked-meta";

    if (c.unlockDate) {
      const unlock = document.createElement("span");
      unlock.textContent = `Unlock: ${c.unlockDate}`;
      meta.appendChild(unlock);
    }

    if (c.notes) {
      const notes = document.createElement("span");
      notes.textContent = `Notes: ${c.notes}`;
      meta.appendChild(notes);
    }

    const addr = document.createElement("span");
    addr.textContent = `Address: ${c.address}`;
    meta.appendChild(addr);

    const amt = document.createElement("span");
    amt.textContent = `Amount: ${formatNumber(c.amount || 0)} ${
      cfg.token?.symbol || "i21"
    }`;
    meta.appendChild(amt);

    // Optional explorer link (Solscan)
    if (c.explorerUrl) {
      const link = document.createElement("a");
      link.href = c.explorerUrl;
      link.target = "_blank";
      link.rel = "noreferrer";
      link.className = "locked-link";
      link.textContent = "View on Solscan";
      meta.appendChild(link);
    }

    item.appendChild(title);
    item.appendChild(meta);
    list.appendChild(item);
  });
}

// --- Init ---

document.addEventListener("DOMContentLoaded", () => {
  loadConfig();
  fetchSummary();
});
