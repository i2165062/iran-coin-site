// Simple config for i21 token stats.
// 💡 در فاز بعد می‌توانیم این مقادیر را از API اختصاصی (سرور خودت) که از DEXTools / pump.fun می‌خواند، آپدیت کنیم.
const I21_CONFIG = {
  symbol: "i21",
  name: "i21 — IranCoin",
  mint: "4FCmKPqgpNVbzyBRtWPsh9mz3DCoqJFzTvazeAhzpump",
  decimals: 9,               // اگر در mint چیز دیگری است، این را عوض کن
  priceUsd: 0.000000001,     // قیمت تقریبی در USD (الان دمو)
  priceSol: 0.00000001,      // قیمت تقریبی در SOL (الان دمو)
  change24h: 0,              // درصد تغییر 24 ساعته
  circulatingSupply: 30950398366, // مثلا 30,950,398,366 i21 – این را با عدد واقعی خودت عوض کن
  holders: 0,                // تعداد هولدرها (فعلاً دستی)
  // داده‌های دمو برای نمودار
  priceHistory: [0.8, 1.2, 1.05, 1.5, 1.3, 1.9, 1.7, 2.1, 1.8, 2.4]
};

function formatNumber(num, decimals = 2) {
  if (num === null || num === undefined || isNaN(num)) return "-";
  return Number(num).toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
}

function formatBigInt(n) {
  if (!n && n !== 0) return "0";
  return Number(n).toLocaleString("en-US", { maximumFractionDigits: 0 });
}

function updateStatsFromConfig() {
  const priceUsdEl = document.getElementById("priceUsd");
  const priceSolEl = document.getElementById("priceSol");
  const changeEl = document.getElementById("priceChange");
  const mcapEl = document.getElementById("marketCapUsd");
  const circEl = document.getElementById("circulatingSupply");
  const holdersEl = document.getElementById("holdersCount");
  const mintEl = document.getElementById("mintAddress");
  const decimalsEl = document.getElementById("tokenDecimals");

  const cfg = I21_CONFIG;

  const priceUsd = cfg.priceUsd;
  const priceSol = cfg.priceSol;

  if (priceUsdEl) priceUsdEl.textContent = `$${formatNumber(priceUsd, 8)}`;
  if (priceSolEl) priceSolEl.textContent = `${formatNumber(priceSol, 8)} SOL`;

  // 24h change styling
  if (changeEl) {
    const pct = cfg.change24h || 0;
    const txt = `${pct > 0 ? "+" : ""}${pct.toFixed(2)}%`;
    changeEl.textContent = txt;
    changeEl.classList.remove("chip-positive", "chip-negative", "chip-neutral");
    if (pct > 0) changeEl.classList.add("chip-positive");
    else if (pct < 0) changeEl.classList.add("chip-negative");
    else changeEl.classList.add("chip-neutral");
  }

  // Market cap (approx)
  if (mcapEl) {
    const mcap = priceUsd * cfg.circulatingSupply;
    mcapEl.textContent = `$${formatNumber(mcap, 2)}`;
  }

  if (circEl) circEl.textContent = formatBigInt(cfg.circulatingSupply);
  if (holdersEl) holdersEl.textContent = formatBigInt(cfg.holders);

  if (mintEl) mintEl.textContent = cfg.mint;
  if (decimalsEl) decimalsEl.textContent = cfg.decimals;
}

// Simple sparkline chart
function drawPriceChart() {
  const canvas = document.getElementById("priceChart");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const w = canvas.width;
  const h = canvas.height;

  const data = I21_CONFIG.priceHistory || [];
  if (!data.length) return;

  // clear
  ctx.clearRect(0, 0, w, h);

  // background gradient
  const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
  bgGrad.addColorStop(0, "rgba(196,161,94,0.35)");
  bgGrad.addColorStop(1, "rgba(5,7,10,0.0)");
  ctx.fillStyle = bgGrad;

  // normalize data
  const min = Math.min(...data);
  const max = Math.max(...data);
  const span = max - min || 1;

  const paddingX = 10;
  const paddingY = 10;
  const innerW = w - paddingX * 2;
  const innerH = h - paddingY * 2;

  // path
  ctx.beginPath();
  data.forEach((val, i) => {
    const x = paddingX + (innerW * i) / (data.length - 1 || 1);
    const norm = (val - min) / span;
    const y = paddingY + innerH * (1 - norm);

    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });

  // stroke line
  ctx.lineWidth = 2;
  ctx.strokeStyle = "rgba(255,255,255,0.9)";
  ctx.stroke();

  // area under curve
  ctx.lineTo(paddingX + innerW, h - paddingY);
  ctx.lineTo(paddingX, h - paddingY);
  ctx.closePath();
  ctx.fillStyle = bgGrad;
  ctx.fill();

  // last point highlight
  const lastVal = data[data.length - 1];
  const lastNorm = (lastVal - min) / span;
  const lastX = paddingX + innerW;
  const lastY = paddingY + innerH * (1 - lastNorm);
  ctx.beginPath();
  ctx.arc(lastX, lastY, 4, 0, Math.PI * 2);
  ctx.fillStyle = "#ffffff";
  ctx.fill();
}

// ⚠️ نکته مهم درباره DEXTools / pump.fun:
// این لینک‌ها HTML هستند و به خاطر CORS و نداشتن API عمومی، از فرانت‌اند مستقیم نمی‌توانیم محتوا را بخوانیم.
// برای داده‌ی لایو باید روی سرور (مثلاً Cloudflare Worker یا Node) قیمت را از آن‌ها بگیری و به شکل JSON به این صفحه بدهی.
// در این نسخه فقط Config بالا را استفاده می‌کنیم.

document.addEventListener("DOMContentLoaded", () => {
  updateStatsFromConfig();
  drawPriceChart();
});
