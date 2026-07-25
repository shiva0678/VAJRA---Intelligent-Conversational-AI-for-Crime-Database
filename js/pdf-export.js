/* ================= PDF EXPORT ================= */
function exportPDF(){
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({unit:'pt', format:'a4'});
  const margin = 48; let y = margin;
  doc.setFont('helvetica','bold'); doc.setFontSize(16);
  doc.text('VAJRA — SCRB Crime Intelligence Conversation Log', margin, y); y+=22;
  doc.setFont('helvetica','normal'); doc.setFontSize(9); doc.setTextColor(100);
  doc.text(`Exported: ${new Date().toLocaleString('en-IN')}  ·  Role: ${currentRole}  ·  Session: ${ROLE_LABEL[currentRole]}`, margin, y); y+=24;
  doc.setDrawColor(200); doc.line(margin, y, 547, y); y+=18;
  doc.setTextColor(20);
  document.querySelectorAll('#messages .msg').forEach(m=>{
    const isUser = m.classList.contains('user');
    const label = isUser ? 'INVESTIGATOR' : 'VAJRA';
    const text = m.querySelector('.bubble').innerText.trim();
    doc.setFont('helvetica','bold'); doc.setFontSize(9.5);
    doc.setTextColor(isUser? 20:20);
    if(y>760){ doc.addPage(); y=margin; }
    doc.text(label, margin, y); y+=13;
    doc.setFont('helvetica','normal'); doc.setFontSize(10); doc.setTextColor(50);
    const lines = doc.splitTextToSize(text, 499);
    lines.forEach(line=>{
      if(y>770){ doc.addPage(); y=margin; }
      doc.text(line, margin, y); y+=13;
    });
    y+=10;
  });
  doc.save('VAJRA_conversation_log.pdf');
  logAudit('PDF exported', 'Conversation transcript exported to PDF', 'ok');
}
function exportAuditPDF(){
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({unit:'pt', format:'a4'});
  const margin = 40; let y = margin;
  doc.setFont('helvetica','bold'); doc.setFontSize(15);
  doc.text('VAJRA — System Audit Trail', margin, y); y+=20;
  doc.setFont('helvetica','normal'); doc.setFontSize(9); doc.setTextColor(110);
  doc.text(`Exported: ${new Date().toLocaleString('en-IN')}`, margin, y); y+=20;
  doc.setDrawColor(210); doc.line(margin, y, 555, y); y+=14;
  doc.setFontSize(8.5); doc.setTextColor(30);
  document.querySelectorAll('#auditBody tr').forEach(tr=>{
    const cells = [...tr.children].map(td=>td.innerText);
    const line = cells.join('   |   ');
    if(y>780){ doc.addPage(); y=margin; }
    const wrapped = doc.splitTextToSize(line, 515);
    wrapped.forEach(l=>{ doc.text(l, margin, y); y+=11; });
  });
  doc.save('VAJRA_audit_trail.pdf');
}
