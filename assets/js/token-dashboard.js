// token-dashboard.js
// Frontend logic for i21 token dashboard
// Uses:
//   - Backend API (summary): http://SERVER:4000/api/i21/summary
//   - Local JSON: ../assets/data/token-locks.json

const API_BASE = "http://188.209.138.136:4000"; // TODO: later change to https://api.irannft.art
const SUMMARY_URL = `${API_BASE}/api/i21/summary`;
const LOCKS_URL = "../assets/data/token-locks.json";

// Small helpers
function formatNumber(n, decimals = 2) {
  if (n === null || n === undefined || isNaN(n)) return "–";
  return Number(n).toLocaleString("en-US", {
    maximumFractionDigits: decimals
  });
}

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

// Main loader
async function loadTokenDashboard() {
  try {
    // fetch summary from backend + manual lock data
    const [summaryRes, locksRes] = await Promise.all([
      fetch(SUMMARY_URL),
      fetch(LOCKS_URL)
    ]);

    const summary = await summaryRes.json();
    const locks = await locksRes.json();

    if (!summary.ok) {
      console.error("API error:", summary);
      setText("token-status", "Error");
      return;
    }

    const data = summary;
    const lockConfig = locks || {};
    const totalLocked = Number(lockConfig.totalLocked || 0);

    // ---- Price ----
    setText("token-status", "Online");
    setText("priceUsd", "$ " + formatNumber(data.priceUsd, 8));
    setText("priceSol", formatNumber(data.priceSol, 10) + " SOL");
    setText("volume24h", formatNumber(data.volume24hUsd, 2) + " USD");

    if (data.txns24h) {
      const tx = data.txns24h;
      const txText = `${formatNumber(tx.total, 0)} total  •  buys ${formatNumber(
        tx.buys,
        0
      )} / sells ${formatNumber(tx.sells, 0)}`;
      setText("txns24h", txText);
    }

    // ---- Token info & supply ----
    setText("tokenName", data.name || "IranCoin");
    setText("tokenSymbol", data.token || "i21");
    setText("tokenMint", data.mint);

    const supply = data.circulatingSupply || data.supply;
    if (supply) {
      setText("totalSupply", formatNumber(supply, 0) + " i21");
    } else {
      setText("totalSupply", "–");
    }

    // ---- Locked amounts (manual) ----
    if (totalLocked > 0) {
      setText("lockedTotal", formatNumber(totalLocked, 0) + " i21");

      if (supply) {
        const pct = (totalLocked / supply) * 100;
        setText(
          "lockedPercent",
          formatNumber(pct, 2) + "% of total supply"
        );
      } else {
        setText("lockedPercent", "–");
      }
    } else {
      setText("lockedTotal", "0");
      setText("lockedPercent", "0%");
    }

    // ---- Lock contracts table ----
    const tableBody = document.getElementById("locksTableBody");
    if (tableBody) {
      tableBody.innerHTML = ""; // clear

      const items = Array.isArray(lockConfig.contracts)
        ? lockConfig.contracts
        : [];

      if (!items.length) {
        const tr = document.createElement("tr");
        const td = document.createElement("td");
        td.colSpan = 3;
        td.textContent = "No locked contracts configured.";
        tableBody.appendChild(tr);
        tr.appendChild(td);
      } else {
        items.forEach((item) => {
          const tr = document.createElement("tr");

          const tdLabel = document.createElement("td");
          tdLabel.textContent = item.label || "";

          const tdAddr = document.createElement("td");
          if (item.address) {
            const a = document.createElement("a");
            // Using Solscan link; you can change to birdeye or others
            a.href = "https://solscan.io/account/" + item.address;
            a.target = "_blank";
            a.rel = "noopener noreferrer";
            a.textContent = item.address;
            tdAddr.appendChild(a);
          } else {
            tdAddr.textContent = "-";
          }

          const tdAmount = document.createElement("td");
          tdAmount.classList.add("align-right");
          tdAmount.textContent = formatNumber(item.amount || 0, 0);

          tr.appendChild(tdLabel);
          tr.appendChild(tdAddr);
          tr.appendChild(tdAmount);
          tableBody.appendChild(tr);
        });
      }
    }
  } catch (err) {
    console.error("Failed to load token dashboard:", err);
    setText("token-status", "Error");
  }
}

// Run once and refresh every 30s
document.addEventListener("DOMContentLoaded", () => {
  loadTokenDashboard();
  setInterval(loadTokenDashboard, 30000);
});
