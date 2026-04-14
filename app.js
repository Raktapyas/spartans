/* ============================================================
   SPARTANS — app.js
   Main orchestrator: clock, quote, init all modules
   ============================================================ */

import { getDailyQuote, getRandomQuote } from './quotes.js';
import { initRunTracker, initExerciseTracker, initIntensityMode, updateGlobalStats, loadData } from './tracker.js';
import { initMusicPlayer } from './music.js';

/* ── Live Clock ────────────────────────────────────── */
function startClock() {
  const clockEl = document.getElementById('live-clock');
  if (!clockEl) return;

  function tick() {
    const now  = new Date();
    const hh   = String(now.getHours()).padStart(2,'0');
    const mm   = String(now.getMinutes()).padStart(2,'0');
    const ss   = String(now.getSeconds()).padStart(2,'0');
    clockEl.innerHTML = `${hh}<span class="clock-sep">:</span>${mm}<span class="clock-sep">:</span>${ss}`;
  }

  tick();
  setInterval(tick, 1000);
}

/* ── Quote System ──────────────────────────────────── */
function renderQuote(q) {
  const display = document.getElementById('quote-display');
  if (!display) return;

  /* Glitch effect before swap */
  display.style.opacity = '0';
  display.style.transform = 'translateY(8px)';

  setTimeout(() => {
    display.innerHTML = `
      <span class="glitch" data-text="${q.text}">${q.text}</span>
    `;
    display.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    display.style.opacity  = '1';
    display.style.transform= 'translateY(0)';

    document.getElementById('quote-author').textContent = `— ${q.author}`;
  }, 300);
}

function initQuotes() {
  const q       = getDailyQuote();
  const refreshBtn = document.getElementById('quote-refresh');

  renderQuote(q);

  if (refreshBtn) {
    refreshBtn.addEventListener('click', () => {
      renderQuote(getRandomQuote());
    });
  }
}

/* ── Scan line element ─────────────────────────────── */
function initScanLine() {
  const sl = document.createElement('div');
  sl.className = 'scan-line';
  document.body.appendChild(sl);
}

/* ── Stats init ────────────────────────────────────── */
function initStats() {
  const data = loadData();
  updateGlobalStats(data);
}

/* ── Boot ──────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initScanLine();
  startClock();
  initQuotes();
  initRunTracker();
  initExerciseTracker();
  initStats();
  initIntensityMode();
  initMusicPlayer();

  console.log('%cSPARTANS ONLINE', 'color:#ff4500;font-size:20px;font-weight:bold;letter-spacing:4px;');
  console.log('%cStay Loyal to Your Goals.', 'color:#39ff14;font-size:12px;letter-spacing:2px;');
});
