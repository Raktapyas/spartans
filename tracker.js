/* ============================================================
   SPARTANS — tracker.js
   Daily Run/Walk + Basic Exercise tracking
   Uses localStorage for persistence within the day
   ============================================================ */

/* ── Helpers ───────────────────────────────────────── */
function todayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;
}

function loadData() {
  const key  = `spartans_${todayKey()}`;
  const raw  = localStorage.getItem(key);
  if (raw) return JSON.parse(raw);
  return {
    runs:      [],   // [{km, mins, type}]
    exercises: [],   // [{name, sets, reps}]
  };
}

function saveData(data) {
  const key = `spartans_${todayKey()}`;
  localStorage.setItem(key, JSON.stringify(data));
}

/* ── Run/Walk Section ──────────────────────────────── */
function renderRuns(data) {
  const container = document.getElementById('run-list');
  const totalKm   = data.runs.reduce((s, r) => s + parseFloat(r.km || 0), 0);
  const totalMins = data.runs.reduce((s, r) => s + parseInt(r.mins || 0), 0);

  document.getElementById('run-total-km').textContent   = totalKm.toFixed(1);
  document.getElementById('run-total-mins').textContent = totalMins;

  const goalKm   = 10;
  const fillPct  = Math.min((totalKm / goalKm) * 100, 100);
  document.getElementById('run-prog-fill').style.width = fillPct + '%';

  /* update global stat bar */
  document.getElementById('stat-km').textContent    = totalKm.toFixed(1);
  document.getElementById('stat-mins').textContent  = totalMins;

  if (!container) return;
  container.innerHTML = '';
  if (data.runs.length === 0) {
    container.innerHTML = `<li class="exercise-item" style="justify-content:center;color:var(--muted);letter-spacing:2px;font-size:0.7rem;">NO ACTIVITY LOGGED YET</li>`;
    return;
  }
  data.runs.forEach((r, i) => {
    const li = document.createElement('li');
    li.className = 'exercise-item';
    li.innerHTML = `
      <span class="exercise-name">${r.type.toUpperCase()}</span>
      <span class="exercise-meta">
        <span class="exercise-count">${parseFloat(r.km).toFixed(1)} KM</span>
        <span style="color:var(--muted);font-size:0.7rem">${r.mins} MIN</span>
        <button class="del-btn" data-run="${i}" title="Remove">✕</button>
      </span>`;
    container.appendChild(li);
  });

  container.querySelectorAll('.del-btn[data-run]').forEach(btn => {
    btn.addEventListener('click', () => {
      data.runs.splice(parseInt(btn.dataset.run), 1);
      saveData(data);
      renderRuns(data);
      updateGlobalStats(data);
    });
  });
}

function initRunTracker() {
  const data    = loadData();
  const addBtn  = document.getElementById('run-add-btn');
  const kmInput = document.getElementById('run-km');
  const minInput= document.getElementById('run-mins');
  const typeEl  = document.getElementById('run-type');

  renderRuns(data);

  addBtn.addEventListener('click', () => {
    const km   = parseFloat(kmInput.value);
    const mins = parseInt(minInput.value);
    const type = typeEl.value;

    if (!km || km <= 0 || !mins || mins <= 0) {
      flashError(addBtn); return;
    }

    data.runs.push({ km, mins, type });
    saveData(data);
    kmInput.value = '';
    minInput.value = '';
    renderRuns(data);
    updateGlobalStats(data);
    flashLogged(document.getElementById('run-card'));
  });
}

/* ── Exercise Section ──────────────────────────────── */
function renderExercises(data) {
  const container = document.getElementById('ex-list');
  const total     = data.exercises.length;

  document.getElementById('ex-total').textContent = total;

  const goalEx  = 5;
  const fillPct = Math.min((total / goalEx) * 100, 100);
  document.getElementById('ex-prog-fill').style.width = fillPct + '%';

  /* global stat */
  document.getElementById('stat-ex').textContent = total;

  if (!container) return;
  container.innerHTML = '';
  if (data.exercises.length === 0) {
    container.innerHTML = `<li class="exercise-item" style="justify-content:center;color:var(--muted);letter-spacing:2px;font-size:0.7rem;">NO EXERCISES LOGGED YET</li>`;
    return;
  }
  data.exercises.forEach((e, i) => {
    const li = document.createElement('li');
    li.className = 'exercise-item';
    li.innerHTML = `
      <span class="exercise-name">${e.name.toUpperCase()}</span>
      <span class="exercise-meta">
        <span class="exercise-count">${e.sets}×${e.reps}</span>
        <button class="del-btn" data-ex="${i}" title="Remove">✕</button>
      </span>`;
    container.appendChild(li);
  });

  container.querySelectorAll('.del-btn[data-ex]').forEach(btn => {
    btn.addEventListener('click', () => {
      data.exercises.splice(parseInt(btn.dataset.ex), 1);
      saveData(data);
      renderExercises(data);
      updateGlobalStats(data);
    });
  });
}

function initExerciseTracker() {
  const data      = loadData();
  const addBtn    = document.getElementById('ex-add-btn');
  const nameInput = document.getElementById('ex-name');
  const setsInput = document.getElementById('ex-sets');
  const repsInput = document.getElementById('ex-reps');

  renderExercises(data);

  addBtn.addEventListener('click', () => {
    const name = nameInput.value.trim();
    const sets = parseInt(setsInput.value);
    const reps = parseInt(repsInput.value);

    if (!name || !sets || !reps) {
      flashError(addBtn); return;
    }

    data.exercises.push({ name, sets, reps });
    saveData(data);
    nameInput.value = '';
    setsInput.value = '';
    repsInput.value = '';
    renderExercises(data);
    updateGlobalStats(data);
    flashLogged(document.getElementById('ex-card'));
  });
}

/* ── Global stats ──────────────────────────────────── */
function updateGlobalStats(data) {
  const totalKm  = data.runs.reduce((s,r) => s + parseFloat(r.km||0), 0);
  const totalMin = data.runs.reduce((s,r) => s + parseInt(r.mins||0), 0);
  const calories = Math.round(totalKm * 60 + data.exercises.length * 40);

  document.getElementById('stat-km').textContent    = totalKm.toFixed(1);
  document.getElementById('stat-mins').textContent  = totalMin;
  document.getElementById('stat-ex').textContent    = data.exercises.length;
  document.getElementById('stat-cal').textContent   = calories;
}

/* ── UI feedback ───────────────────────────────────── */
function flashLogged(card) {
  card.classList.remove('logged');
  void card.offsetWidth;
  card.classList.add('logged');
  setTimeout(() => card.classList.remove('logged'), 1200);
}

function flashError(btn) {
  btn.style.background = 'var(--blood-red)';
  btn.style.color = '#fff';
  setTimeout(() => {
    btn.style.background = '';
    btn.style.color = '';
  }, 600);
}

/* ── Intensity mode ────────────────────────────────── */
function initIntensityMode() {
  const data = loadData();
  const totalActivity = data.runs.length + data.exercises.length;
  if (totalActivity >= 3) {
    document.body.classList.add('intense');
  }

  /* Re-evaluate every 30 seconds */
  setInterval(() => {
    const d = loadData();
    const act = d.runs.length + d.exercises.length;
    if (act >= 3) document.body.classList.add('intense');
  }, 30000);
}

export { initRunTracker, initExerciseTracker, initIntensityMode, updateGlobalStats, loadData };
