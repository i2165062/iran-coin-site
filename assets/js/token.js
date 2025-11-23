// ================================
// IranCoin (i21) — Token Dashboard
// Frontend logic
// ================================

// آدرس API بک‌اند (حتماً https برای جلوگیری از خطای mixed content)
const API_BASE = 'https://api.irannft.art/api';

// مسیر فایل تنظیمات دستی توکن
const CONFIG_URL = '../assets/data/token-config.json';

// -------------------------
// Helper functions
// -------------------------

async function fetchJson(url) {
  const res = await fetch(url, { method: 'GET' });
  if (!res.ok) {
    throw new Error(`Request failed ${res.status} for ${url}`);
  }
  return res.json();
}

function formatNumber(num, decimals = 2) {
  if (num === null || num === undefined) return '–';
  const n = Number(num);
  if (!Number.isFinite(n)) return '–';

  if (n >= 1_000_000_000) return (n / 1_000_000_000).toFixed(decimals) + 'B';
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(decimals) + 'M';
  if (n >= 1_000) return (n / 1_000).toFixed(decimals) + 'K';

  return n.toFixed(decimals);
}

function formatUsd(num) {
  if (num === null || num === undefined) return '–';
  const n = Number(num);
  if (!Number.isFinite(n)) return '–';
  if (n < 0.0001) return '$' + n.toExponential(2);
  return '$' + formatNumber(n, 2);
}

// ساده برای کوتاه کردن آدرس‌ها
function shortenAddress(addr) {
  if (!addr) return '–';
  if (addr.length <= 10) return addr;
  return addr.slice(0, 4) + '...' + addr.slice(-4);
}

// -------------------------
// Main loader
// -------------------------

async function loadDashboard() {
  const statusPill = document.getElementById('status-pill');
  const statusDot = document.getElementById('status-dot');
  const priceEl = document.getElementById('price-value');
  const symbolEl = document.getElementById('price-symbol');
  const volumeEl = document.getElementById('volume-24h');
  const tradesEl = document.getElementById('trades-24h');
  const mintEl = document.getElementById('mint-address');
  const tokenNameEl = document.getElementById('token-name');
  const fdvEl = document.getElementById('fdv-usd');
  const liqEl = document.getElementById('liquidity-usd');
  const decimalsEl = document.getElementById('decimals');
  const totalSupplyEl = document.getElementById('total-supply');
  const circulatingEl = document.getElementById('circulating-supply');
  const lockedEl = document.getElementById('locked-supply');
  const unlockedEl = document.getElementById('unlocked-supply');
  const locksContainer = document.getElementById('locked-contracts');

  try {
    // ۱) همزمان اطلاعات API و تنظیمات دستی را بگیر
    const [summary, config] = await Promise.all([
      fetchJson(`${API_BASE}/i21/summary`),
      fetchJson(CONFIG_URL)
    ]);

    if (!summary || summary.ok === false) {
      throw new Error('Backend /summary returned error flag');
    }

    // ---------------- Price card ----------------
    const priceUsd = summary.priceUsd;
    const volume24hUsd = summary.volume24hUsd;
    const totalTrades24h = summary.txns24h?.total ?? null;

    priceEl.textContent = formatUsd(priceUsd);
    symbolEl.textContent = summary.token || config.symbol || 'i21';
    volumeEl.textContent = formatUsd(volume24hUsd);
    tradesEl.textContent = totalTrades24h ?? '–';

    mintEl.textContent = shortenAddress(summary.mint || config.mint);
    mintEl.setAttribute('title', summary.mint || config.mint || '');

    tokenNameEl.textContent = summary.name || config.name || 'IranCoin';

    // ---------------- Market card ----------------
    fdvEl.textContent = formatUsd(summary.fdvUsd);
    liqEl.textContent = formatUsd(summary.liquidityUsd);
    decimalsEl.textContent = summary.decimals ?? config.decimals ?? '–';

    // ---------------- Supply card ----------------
    const totalSupply =
      config.totalSupply ??
      summary.circulatingSupply ??
      0;

    const circulatingSupply = summary.circulatingSupply ?? '–';

    totalSupplyEl.textContent = formatNumber(totalSupply, 0);
    circulatingEl.textContent = formatNumber(circulatingSupply, 0);

    // از config برای عدد قفل‌شده/آزاد شده
    if (config.lockedSupply !== undefined) {
      lockedEl.textContent = formatNumber(config.lockedSupply, 0);
    } else {
      lockedEl.textContent = '–';
    }

    if (config.unlockedSupply !== undefined) {
      unlockedEl.textContent = formatNumber(config.unlockedSupply, 0);
    } else if (totalSupply && config.lockedSupply) {
      unlockedEl.textContent = formatNumber(
        totalSupply - config.lockedSupply,
        0
      );
    } else {
      unlockedEl.textContent = '–';
    }

    // ---------------- Locked contracts list ----------------
    locksContainer.innerHTML = '';

    if (Array.isArray(config.lockedContracts) && config.lockedContracts.length) {
      config.lockedContracts.forEach(lock => {
        const div = document.createElement('div');
        div.className = 'locked-item';

        const head = document.createElement('div');
        head.className = 'locked-item-title';

        const label = document.createElement('div');
        label.className = 'locked-item-label';
        label.textContent = lock.label || 'Locked allocation';

        const amount = document.createElement('div');
        amount.className = 'locked-item-amount';
        amount.textContent = formatNumber(lock.amount, 0) + ' ' +
          (config.symbol || 'i21');

        head.appendChild(label);
        head.appendChild(amount);

        const addr = document.createElement('div');
        addr.className = 'locked-item-address';
        addr.textContent = lock.address || '–';

        div.appendChild(head);
        div.appendChild(addr);
        locksContainer.appendChild(div);
      });
    } else {
      locksContainer.textContent =
        'No manual locked-contract data has been set yet.';
    }

    // ---------------- Status pill → OK ----------------
    statusPill.textContent = 'Live';
    statusPill.classList.remove('status-error');
    statusPill.style.background = 'var(--accent-soft)';
    statusDot.style.background = '#22c55e';

  } catch (err) {
    console.error('Failed to load token dashboard:', err);

    // وضعیت Error
    if (statusPill) {
      statusPill.textContent = 'Error';
      statusPill.style.background = 'var(--danger-soft)';
    }
    if (statusDot) {
      statusDot.style.background = '#ef4444';
    }

    // قیمت و بقیه فیلدها را خالی کن
    if (priceEl) priceEl.textContent = '–';
    if (volumeEl) volumeEl.textContent = '–';
    if (tradesEl) tradesEl.textContent = '–';
  }
}

document.addEventListener('DOMContentLoaded', loadDashboard);
