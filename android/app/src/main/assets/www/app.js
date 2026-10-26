// Teka-teki susun angka, offline, tanpa dependensi eksternal.
// Acakan dibuat dengan menggeser ubin dari posisi selesai secara acak,
// jadi setiap papan yang dibuat SELALU bisa diselesaikan (bukan acakan
// sembarang yang bisa mustahil). Skor terbaik disimpan di perangkat ini.
let size = 3;
let board = [];
let empty = 0;
let moves = 0;
let seconds = 0;
let timerId = null;
let started = false;
let won = false;

function solvedBoard(n) {
  const b = [];
  for (let i = 1; i < n * n; i++) b.push(i);
  b.push(0);
  return b;
}
function neighbours(index, n) {
  const r = Math.floor(index / n), c = index % n;
  const out = [];
  if (r > 0) out.push(index - n);
  if (r < n - 1) out.push(index + n);
  if (c > 0) out.push(index - 1);
  if (c < n - 1) out.push(index + 1);
  return out;
}
function newGame(n) {
  size = n || size;
  board = solvedBoard(size);
  empty = board.length - 1;
  // Acak dengan langkah sah dari posisi selesai: selalu bisa diselesaikan.
  const steps = size === 3 ? 100 : 200;
  let prev = -1;
  for (let i = 0; i < steps; i++) {
    const opts = neighbours(empty, size).filter((x) => x !== prev);
    const pick = opts[Math.floor(Math.random() * opts.length)];
    prev = empty;
    board[empty] = board[pick];
    board[pick] = 0;
    empty = pick;
  }
  moves = 0; seconds = 0; started = false; won = false;
  stopTimer();
  render();
}
function isSolved() {
  for (let i = 0; i < board.length - 1; i++) {
    if (board[i] !== i + 1) return false;
  }
  return board[board.length - 1] === 0;
}
function startTimer() {
  if (timerId) return;
  timerId = setInterval(() => { seconds++; renderStats(); }, 1000);
}
function stopTimer() {
  if (timerId) clearInterval(timerId);
  timerId = null;
}
function bestKey() { return "ktt_best_" + size; }
function loadBest() {
  try { return JSON.parse(localStorage.getItem(bestKey()) || "null"); } catch (e) { return null; }
}
function saveBest() {
  const best = loadBest();
  if (!best || moves < best.moves || (moves === best.moves && seconds < best.seconds)) {
    try { localStorage.setItem(bestKey(), JSON.stringify({ moves, seconds })); } catch (e) {}
  }
}
function fmtTime(s) {
  return Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0");
}
function renderStats() {
  const m = document.getElementById("moves");
  const t = document.getElementById("time");
  const b = document.getElementById("best");
  if (m) m.textContent = moves;
  if (t) t.textContent = fmtTime(seconds);
  const best = loadBest();
  if (b) b.textContent = best ? best.moves + " langkah, " + fmtTime(best.seconds) : "—";
}
function render() {
  const el = document.getElementById("board");
  if (!el) return;
  el.style.gridTemplateColumns = "repeat(" + size + ", 1fr)";
  el.innerHTML = "";
  const movable = new Set(neighbours(empty, size));
  board.forEach((v, i) => {
    const btn = document.createElement("button");
    btn.className = "tile" + (v === 0 ? " empty" : "") + (movable.has(i) ? " movable" : "");
    btn.textContent = v === 0 ? "" : v;
    btn.setAttribute("aria-label", v === 0 ? "Kosong" : "Ubin " + v);
    btn.onclick = () => moveTile(i);
    el.appendChild(btn);
  });
  renderStats();
  const msg = document.getElementById("message");
  if (msg) msg.textContent = won ? "Menang! " + moves + " langkah dalam " + fmtTime(seconds) + ". Tekan Game Baru untuk main lagi." : "";
}
function moveTile(i) {
  if (won) return;
  if (!neighbours(empty, size).includes(i)) return;
  if (!started) { started = true; startTimer(); }
  board[empty] = board[i];
  board[i] = 0;
  empty = i;
  moves++;
  if (isSolved()) {
    won = true;
    stopTimer();
    saveBest();
  }
  render();
}
function moveEmptyTo(target) {
  // Gerakkan kotak kosong ke arah target (untuk tombol panah).
  if (target >= 0 && target < board.length) moveTile(target);
}

if (typeof document !== "undefined" && document.getElementById) {
  const sizeEl = document.getElementById("size");
  const newEl = document.getElementById("btn-new");
  if (sizeEl) sizeEl.onchange = () => newGame(parseInt(sizeEl.value, 10));
  if (newEl) newEl.onclick = () => newGame(parseInt(sizeEl.value, 10));
  document.addEventListener("keydown", (e) => {
    const r = Math.floor(empty / size), c = empty % size;
    if (e.key === "ArrowUp" && r < size - 1) moveEmptyTo(empty + size);
    if (e.key === "ArrowDown" && r > 0) moveEmptyTo(empty - size);
    if (e.key === "ArrowLeft" && c < size - 1) moveEmptyTo(empty + 1);
    if (e.key === "ArrowRight" && c > 0) moveEmptyTo(empty - 1);
  });
  newGame(3);
}
