/* ================= ROLE-BASED ACCESS ================= */
const ROLE_ACCESS = {
  investigator: ['chat','network'],
  analyst: ['chat','network','trends','predictive'],
  admin: ['chat','network','trends','predictive','audit']
};
const ROLE_LABEL = { investigator:'INV-2291', analyst:'ANL-0745', admin:'SCRB-ADMIN-014' };
let currentRole = 'admin';
function setRole(role){
  currentRole = role;
  const allowed = ROLE_ACCESS[role];
  document.querySelectorAll('.nav-item').forEach(item=>{
    const v = item.dataset.view;
    const ok = allowed.includes(v);
    item.classList.toggle('locked', !ok);
    item.querySelector('.lock-ic')?.remove();
    if(!ok){
      const lock = document.createElementNS('http://www.w3.org/2000/svg','svg');
      lock.setAttribute('class','lock-ic'); lock.setAttribute('viewBox','0 0 24 24'); lock.setAttribute('fill','none');
      lock.innerHTML = '<rect x="5" y="11" width="14" height="9" rx="2" stroke="currentColor" stroke-width="1.8"/><path d="M8 11V7a4 4 0 018 0v4" stroke="currentColor" stroke-width="1.8"/>';
      item.appendChild(lock);
    }
  });
  document.getElementById('sidebarUser').innerHTML = `USER: ${ROLE_LABEL[role]}<br>STATION: HQ Bengaluru<br>SESSION: <span id="sessTime"></span>`;
  tickSession();
  // if current view no longer allowed, bounce to chat
  const activeView = document.querySelector('.view.active').id.replace('view-','');
  if(!allowed.includes(activeView)) goto('chat');
  logAudit('Role changed', `Session role switched to ${role}`, 'info');
}

/* ================= NAV ================= */
function toggleMobileMenu(){
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.getElementById('navOverlay');
  if(sidebar) sidebar.classList.toggle('open');
  if(overlay) overlay.classList.toggle('open');
}
function closeMobileMenu(){
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.getElementById('navOverlay');
  if(sidebar) sidebar.classList.remove('open');
  if(overlay) overlay.classList.remove('open');
}

function goto(view){
  closeMobileMenu();
  if(!ROLE_ACCESS[currentRole].includes(view)){
    flashDenied(view);
    return;
  }
  document.querySelectorAll('.nav-item').forEach(i=>i.classList.toggle('active', i.dataset.view===view));
  document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
  document.getElementById('view-'+view).classList.add('active');
  logAudit('View accessed', `Navigated to ${view} module`, 'info');
  if(view==='network' && !graphInit) initGraph();
  if(view==='trends' && !trendsInit) initTrends();
  if(view==='predictive' && !predInit) initPredictive();
}
function flashDenied(view){
  const item = document.querySelector(`.nav-item[data-view="${view}"]`);
  if(item) item.style.borderColor = 'var(--red)';
  logAudit('Access denied', `${currentRole} attempted to access ${view} (insufficient permissions)`, 'denied');
  setTimeout(()=>{ if(item) item.style.borderColor=''; }, 700);
}
