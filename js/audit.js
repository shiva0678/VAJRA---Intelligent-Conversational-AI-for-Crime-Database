/* ================= AUDIT LOG ================= */
function logAudit(action, detail, status){
  const tbody = document.getElementById('auditBody');
  const tr = document.createElement('tr');
  const now = new Date();
  const time = now.toLocaleTimeString('en-IN', {hour12:false}) + '.' + String(now.getMilliseconds()).padStart(3,'0');
  const statusTag = status==='ok' ? '<span class="tag ok">VERIFIED</span>'
                   : status==='denied' ? '<span class="tag" style="color:var(--red);border-color:rgba(234,91,91,.3);background:rgba(234,91,91,.08)">DENIED</span>'
                   : '<span class="tag info">LOGGED</span>';
  tr.innerHTML = `<td class="mono">${time}</td><td>${ROLE_LABEL[currentRole]}</td><td>${action}</td><td>${detail}</td><td>${statusTag}</td>`;
  tbody.prepend(tr);
}
