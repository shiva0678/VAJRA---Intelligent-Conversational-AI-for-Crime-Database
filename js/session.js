/* ================= SESSION CLOCK ================= */
let sessionStart = new Date();
function tickSession(){
  const el = document.getElementById('sessTime');
  if(!el) return;
  const diff = Math.floor((new Date()-sessionStart)/1000);
  const m = String(Math.floor(diff/60)).padStart(2,'0'), s = String(diff%60).padStart(2,'0');
  el.textContent = `${m}:${s}`;
}
setInterval(tickSession, 1000);
