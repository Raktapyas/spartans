/* ============================================================
   SPARTANS — music.js
   Underground Tempo music player
   Toggles hidden YouTube iframes as audio sources
   ============================================================ */

const TRACKS = [
  {
    id:     'track-1',
    name:   'UNDERGROUND TEMPO — VOL. I',
    sub:    'Dark Workout Mix',
    iframe: 'iframe-1',
  },
  {
    id:     'track-2',
    name:   'UNDERGROUND TEMPO — VOL. II',
    sub:    'Aggressive Drill Session',
    iframe: 'iframe-2',
  },
];

let currentTrack = null;

function buildTrackList() {
  const list = document.getElementById('track-list');
  if (!list) return;

  TRACKS.forEach((track, idx) => {
    const div = document.createElement('div');
    div.className = 'track-item';
    div.id        = track.id;
    div.dataset.idx = idx;
    div.innerHTML = `
      <span class="track-num">${String(idx + 1).padStart(2,'0')}</span>
      <div class="track-info">
        <span class="track-name">${track.name}</span>
        <span class="track-sub">${track.sub}</span>
      </div>
      <span class="track-action">▶</span>`;

    div.addEventListener('click', () => toggleTrack(idx));
    list.appendChild(div);
  });
}

function toggleTrack(idx) {
  const track    = TRACKS[idx];
  const iframeEl = document.getElementById(track.iframe);
  const itemEl   = document.getElementById(track.id);

  if (!iframeEl || !itemEl) return;

  /* If same track clicked again — stop */
  if (currentTrack === idx) {
    stopAll();
    return;
  }

  stopAll();

  /* Activate track */
  currentTrack = idx;
  itemEl.classList.add('active');
  itemEl.querySelector('.track-action').innerHTML = `
    <div class="eq-anim">
      <span></span><span></span><span></span>
    </div>`;

  /* Reload iframe src to trigger autoplay */
  const baseSrc = iframeEl.dataset.src;
  iframeEl.src  = baseSrc + '&autoplay=1';
}

function stopAll() {
  currentTrack = null;
  TRACKS.forEach(t => {
    const iframe = document.getElementById(t.iframe);
    const item   = document.getElementById(t.id);
    if (iframe) iframe.src = '';
    if (item) {
      item.classList.remove('active');
      item.querySelector('.track-action').textContent = '▶';
    }
  });
}

function initMusicPlayer() {
  buildTrackList();

  /* Expose stop function globally for cleanup */
  window.spartansStopMusic = stopAll;
}

export { initMusicPlayer };
