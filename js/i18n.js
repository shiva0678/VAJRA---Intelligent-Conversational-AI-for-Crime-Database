/* ================= I18N ================= */
const I18N = {
  en: {
    brandName:"VAJRA", brandSub:"SCRB Karnataka · Crime Intelligence Platform",
    liveFeed:"1,142 stations synced",
    navIntel:"Intelligence", navChat:"Chat Console", navNetwork:"Network Analysis",
    navAnalytics:"Analytics", navTrends:"Trends & Hotspots", navPredictive:"Predictive & Early Warning",
    navGov:"Governance", navAudit:"Audit Trail",
    chatTitle:"Conversational Query Console",
    chatSub:"Ask about patterns, networks, hotspots, or suspects in natural language — English or Kannada.",
    btnClear:"Clear", btnExport:"Export PDF",
    xaiTitle:"Explainable AI",
    xaiEmpty:"Ask a question — VAJRA will show its data sources, confidence, and reasoning trail here for full auditability.",
    netTitle:"Criminal Network Visualization",
    netSub:"Force-directed graph of persons, gangs, and locations linked across FIRs, call records, and case diaries. Drag nodes to explore.",
    btnReset:"Reset Layout", netLegend:"Legend",
    legPerson:"Person of interest", legGang:"Gang / organized group", legLoc:"Location cluster", legAssoc:"Associate / witness",
    netSelected:"Selected Node", netHint:"Click a node to view profile details.",
    trendTitle:"Crime Trends & Hotspot Detection", trendSub:"Statewide pattern signals across 1,142 stations — last 12 months.",
    kpi1l:"Total FIRs (30d)", kpi2l:"Active Hotspots", kpi3l:"Resolution Rate", vsLast:"vs last month", newTag:"new",
    trendChartT:"Monthly Crime Volume by Category", trendChartS:"Property crime, cybercrime & narcotics — Jan–Dec",
    districtChartT:"Top Districts by Case Volume", districtChartS:"Current quarter",
    hotspotListT:"Emerging Hotspots",
    predTitle:"Predictive Analytics & Early Warnings",
    predSub:"Forecast model: seasonal-ARIMA + spatial clustering on 5-year FIR history. Retrained weekly.",
    forecastT:"30-Day Crime Volume Forecast — Statewide", forecastS:"Shaded band = 90% confidence interval",
    warnListT:"Active Early Warnings",
    auditTitle:"Audit Trail", auditSub:"Every query, model inference, and data access is logged for accountability and legal review.",
    btnExportLog:"Export Log", thTime:"Timestamp", thUser:"User", thAction:"Action", thDetail:"Detail", thStatus:"Status",
    inputPlaceholder:"Ask VAJRA about crime patterns, suspects, or hotspots…"
  },
  kn: {
    brandName:"ವಜ್ರ", brandSub:"SCRB ಕರ್ನಾಟಕ · ಅಪರಾಧ ಗುಪ್ತಚರ ವೇದಿಕೆ",
    liveFeed:"1,142 ಠಾಣೆಗಳು ಸಿಂಕ್ ಆಗಿವೆ",
    navIntel:"ಗುಪ್ತಚರ", navChat:"ಚಾಟ್ ಕನ್ಸೋಲ್", navNetwork:"ಜಾಲ ವಿಶ್ಲೇಷಣೆ",
    navAnalytics:"ವಿಶ್ಲೇಷಣೆ", navTrends:"ಪ್ರವೃತ್ತಿ ಮತ್ತು ಹಾಟ್‌ಸ್ಪಾಟ್‌ಗಳು", navPredictive:"ಮುನ್ಸೂಚನೆ ಮತ್ತು ಎಚ್ಚರಿಕೆ",
    navGov:"ಆಡಳಿತ", navAudit:"ಆಡಿಟ್ ಟ್ರೇಲ್",
    chatTitle:"ಸಂವಾದಾತ್ಮಕ ಪ್ರಶ್ನೆ ಕನ್ಸೋಲ್",
    chatSub:"ಮಾದರಿಗಳು, ಜಾಲಗಳು, ಹಾಟ್‌ಸ್ಪಾಟ್‌ಗಳು ಅಥವಾ ಶಂಕಿತರ ಬಗ್ಗೆ ಸಹಜ ಭಾಷೆಯಲ್ಲಿ ಕೇಳಿ — ಇಂಗ್ಲಿಷ್ ಅಥವಾ ಕನ್ನಡ.",
    btnClear:"ಅಳಿಸಿ", btnExport:"PDF ರಫ್ತು",
    xaiTitle:"ವಿವರಣಾತ್ಮಕ AI",
    xaiEmpty:"ಪ್ರಶ್ನೆ ಕೇಳಿ — ವಜ್ರ ತನ್ನ ಡೇಟಾ ಮೂಲಗಳು, ವಿಶ್ವಾಸಾರ್ಹತೆ ಮತ್ತು ತಾರ್ಕಿಕತೆಯನ್ನು ಇಲ್ಲಿ ತೋರಿಸುತ್ತದೆ.",
    netTitle:"ಅಪರಾಧ ಜಾಲ ದೃಶ್ಯೀಕರಣ",
    netSub:"FIR, ಕರೆ ದಾಖಲೆಗಳು ಮತ್ತು ಕೇಸ್ ಡೈರಿಗಳ ಮೂಲಕ ಸಂಪರ್ಕಿತ ವ್ಯಕ್ತಿಗಳು, ಗ್ಯಾಂಗ್‌ಗಳು ಮತ್ತು ಸ್ಥಳಗಳ ನಕ್ಷೆ.",
    btnReset:"ಲೇಔಟ್ ಮರುಹೊಂದಿಸಿ", netLegend:"ಸೂಚಕ",
    legPerson:"ಶಂಕಿತ ವ್ಯಕ್ತಿ", legGang:"ಗ್ಯಾಂಗ್ / ಸಂಘಟಿತ ಗುಂಪು", legLoc:"ಸ್ಥಳ ಸಮೂಹ", legAssoc:"ಸಹಚರ / ಸಾಕ್ಷಿ",
    netSelected:"ಆಯ್ಕೆಮಾಡಿದ ನೋಡ್", netHint:"ವಿವರಗಳಿಗಾಗಿ ನೋಡ್ ಕ್ಲಿಕ್ ಮಾಡಿ.",
    trendTitle:"ಅಪರಾಧ ಪ್ರವೃತ್ತಿ ಮತ್ತು ಹಾಟ್‌ಸ್ಪಾಟ್ ಪತ್ತೆ", trendSub:"1,142 ಠಾಣೆಗಳಾದ್ಯಂತ ಕಳೆದ 12 ತಿಂಗಳ ಪ್ರವೃತ್ತಿ.",
    kpi1l:"ಒಟ್ಟು FIR (30 ದಿನ)", kpi2l:"ಸಕ್ರಿಯ ಹಾಟ್‌ಸ್ಪಾಟ್‌ಗಳು", kpi3l:"ಪರಿಹಾರ ದರ", vsLast:"ಕಳೆದ ತಿಂಗಳಿಗಿಂತ", newTag:"ಹೊಸ",
    trendChartT:"ವರ್ಗವಾರು ಮಾಸಿಕ ಅಪರಾಧ ಪ್ರಮಾಣ", trendChartS:"ಆಸ್ತಿ ಅಪರಾಧ, ಸೈಬರ್ ಅಪರಾಧ ಮತ್ತು ಮಾದಕವಸ್ತು",
    districtChartT:"ಪ್ರಕರಣ ಪ್ರಮಾಣದ ಪ್ರಕಾರ ಪ್ರಮುಖ ಜಿಲ್ಲೆಗಳು", districtChartS:"ಪ್ರಸ್ತುತ ತ್ರೈಮಾಸಿಕ",
    hotspotListT:"ಉದಯೋನ್ಮುಖ ಹಾಟ್‌ಸ್ಪಾಟ್‌ಗಳು",
    predTitle:"ಮುನ್ಸೂಚನಾ ವಿಶ್ಲೇಷಣೆ ಮತ್ತು ಮುಂಚಿತ ಎಚ್ಚರಿಕೆಗಳು",
    predSub:"ಮಾದರಿ: ಋತುಮಾನ-ARIMA + ಪ್ರಾದೇಶಿಕ ಕ್ಲಸ್ಟರಿಂಗ್, ವಾರಕ್ಕೊಮ್ಮೆ ಮರುತರಬೇತಿ.",
    forecastT:"30-ದಿನಗಳ ಅಪರಾಧ ಮುನ್ಸೂಚನೆ — ರಾಜ್ಯವ್ಯಾಪಿ", forecastS:"ಛಾಯೆಯ ಪಟ್ಟಿ = 90% ವಿಶ್ವಾಸ ಮಧ್ಯಂತರ",
    warnListT:"ಸಕ್ರಿಯ ಮುಂಚಿತ ಎಚ್ಚರಿಕೆಗಳು",
    auditTitle:"ಆಡಿಟ್ ಟ್ರೇಲ್", auditSub:"ಪ್ರತಿ ಪ್ರಶ್ನೆ, ಮಾದರಿ ನಿರ್ಣಯ এবং ಡೇಟಾ ಪ್ರವೇಶವನ್ನು ದಾಖಲಿಸಲಾಗಿದೆ.",
    btnExportLog:"ಲಾಗ್ ರಫ್ತು", thTime:"ಸಮಯ", thUser:"ಬಳಕೆದಾರ", thAction:"ಕ್ರಿಯೆ", thDetail:"ವಿವರ", thStatus:"ಸ್ಥಿತಿ",
    inputPlaceholder:"ಅಪರಾಧ ಮಾದರಿಗಳು, ಶಂಕಿತರು ಅಥವಾ ಹಾಟ್‌ಸ್ಪಾಟ್‌ಗಳ ಬಗ್ಗೆ ವಜ್ರವನ್ನು ಕೇಳಿ…"
  }
};
let currentLang = 'en';
function setLang(lang){
  currentLang = lang;
  document.getElementById('langEn').classList.toggle('active', lang==='en');
  document.getElementById('langKn').classList.toggle('active', lang==='kn');
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const key = el.getAttribute('data-i18n');
    if(I18N[lang][key]) el.textContent = I18N[lang][key];
  });
  document.getElementById('chatInput').placeholder = I18N[lang].inputPlaceholder;
  document.getElementById('chatInput').classList.toggle('kn', lang==='kn');
  renderSuggestions();
  logAudit('Language switched', `UI language set to ${lang==='kn'?'Kannada':'English'}`, 'info');
}
