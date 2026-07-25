/* ================= INIT ================= */
window.addEventListener('load', ()=>{
  setRole('admin');
  seedGreeting();
  renderSuggestions();
  logAudit('Session started', 'Console initialized', 'ok');
});
