// مسیر API بک‌اند (فعلاً http،یادت نره فقط 888888****8 بعد از SSL می‌کنیم https)
const API_BASE = 'https://api.irannft.art/api';
const CONFIG_URL = '../assets/data/token-config.json';

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
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

function formatDate(dateStr) {
  if (!dateStr) return '–';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'short',
    day: '2-digit'
  });
}

async function loadDashboard() {
  try {
    // درخواست همزمان به API و کانفیگ قفل‌ها
    const [summaryResp, config] = await Promise.all([
      fetchJson(`${API_BASE}/i21/summary`),
      fetchJson(CONFIG_URL)
    ]);

    if (!summaryResp.ok) {
      throw new Error(summaryResp.error || 'API returned error');
    }

    const data = summaryResp;
    const tokenData = data; // برای خوانایی

    // ---- PRICE CARD ----
    document.getElementById('price-usd').textContent =
      '$' + formatNumber(tokenData.priceUsd, 6);
    document.getElementById('price-sol').textContent =
      formatNumber(tokenData.priceSol, 6) + ' SOL';
    document.getElementById('token-name').textContent =
      `${config.name} (${config.symbol})`;
    document.getElementById('mint-address').textContent =
      tokenData.mint || '–';

    document.getElementById('volume-24h').textContent =
      '$' + formatNumber(tokenData.volume24hUsd, 2);

    if (tokenData.txns24h) {
      const { buys, sells, total } = tokenData.txns24h;
      document.getElementById('txns-24h').textContent =
        (total ?? (buys || 0) + (sells || 0)) + ' txs';
      document.getElementById('txns-breakdown').textContent =
        `Buys: ${buys || 0} • Sells: ${sells || 0}`;
    }

    // ---- MARKET CARD ----
    document.getElementById('fdv-usd').textContent =
      '$' + formatNumber(tokenData.fdvUsd, 2);
    document.getElementById('liquidity-usd').textContent =
      tokenData.liquidityUsd != null
        ? '$' + formatNumber(tokenData.liquidityUsd, 2)
        : '–';
    document.getElementById('decimals').textContent =
      tokenData.decimals ?? '–';

    // ---- SUPPLY CARD ----
    const totalSupply =
      config.totalSupply || tokenData.circulatingSupply || 0;
    const circulating = tokenData.circulatingSupply || 0;
    const locked = config.lockedSupply || 0;
    const unlocked = totalSupply - locked;

    document.getElementById('total-supply').textContent =
      formatNumber(totalSupply, 0) + ` ${config.symbol}`;
    document.getElementById('circulating-supply').textContent =
      formatNumber(circulating, 0) + ` ${config.symbol}`;
    document.getElementById('locked-supply').textContent =
      formatNumber(locked, 0) + ` ${config.symbol}`;
    document.getElementById('unlocked-supply').textContent =
      formatNumber(unlocked, 0) + ` ${config.symbol}`;

    // ---- LOCKED CONTRACTS ----
    const locksContainer = document.getElementById('locks-list');
    locksContainer.innerHTML = '';

    if (config.lockedContracts && config.lockedContracts.length) {
      config.lockedContracts.forEach(lock => {
        const div = document.createElement('div');
        div.className = 'lock-item';
        div.innerHTML = `
          <div class="lock-item-header">
            <div class="lock-label">${lock.label}</div>
            <div class="lock-amount">
              ${formatNumber(lock.amount, 0)} ${config.symbol}
            </div>
          </div>
          <div class="lock-meta">
            <span class="lock-address">${lock.address}</span>
            <span>${lock.reason || ''}</span>
            <span>Unlock: ${formatDate(lock.unlockDate)}</span>
          </div>
        `;
        locksContainer.appendChild(div);
      });
    } else {
      locksContainer.textContent =
        'No manual lock data has been provided yet.';
    }
  } catch (err) {
    console.error('Failed to load token dashboard:', err);
    document.getElementById('status-pill').textContent = 'Error';
    document.getElementById('status-pill').style.background = 'rgba(255,74,74,0.18)';
  }
}

document.addEventListener('DOMContentLoaded', loadDashboard);
