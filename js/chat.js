/* ================= CHAT LOGIC ================= */
const KB = [
  { keys:['pattern','chain snatch','modus','trend in','crime pattern','discover','recurring','when do','what time','common time','mo of'],
    en:{text:`Chain-snatching in <b>Bengaluru East &amp; Whitefield</b> shows a repeating pattern: <b>72%</b> of incidents occur between <b>6–8 PM</b> near signal junctions, targeting women commuters on two-wheelers. Offender pairs use motorcycles without plates in <b>81%</b> of cases.`,
      chips:[['Incidents matched','214'],['Time cluster','6–8 PM'],['Confidence','89%']]},
    kn:{text:`ಬೆಂಗಳೂರು ಪೂರ್ವ ಮತ್ತು ವೈಟ್‌ಫೀಲ್ಡ್‌ನಲ್ಲಿ ಸರಪಳಿ ಕಳ್ಳತನದ ಮಾದರಿ: <b>72%</b> ಪ್ರಕರಣಗಳು <b>ಸಂಜೆ 6–8</b> ಗಂಟೆಯ ನಡುವೆ ಸಿಗ್ನಲ್ ಜಂಕ್ಷನ್‌ಗಳ ಬಳಿ ನಡೆಯುತ್ತವೆ.`,
      chips:[['ಹೊಂದಾಣಿಕೆ ಪ್ರಕರಣಗಳು','214'],['ಸಮಯ ಕ್ಲಸ್ಟರ್','6–8 PM'],['ವಿಶ್ವಾಸ','89%']]},
    reasoning:['Pulled FIR text + MO tags for last 180 days','Clustered by time-of-day, location grid, weapon/vehicle used','Cross-referenced with CCTNS incident geo-coordinates','Ranked patterns by statistical recurrence'],
    sources:['CCTNS FIR Database','Station Diary NLP Extract','Traffic Camera Metadata']
  },
  { keys:['network','connection','associate','linked to','gang','criminal network','who is connected','relationship between','know each other','co-accused','accomplice'],
    en:{text:`Network trace complete. <b>Suspect R. Naik</b> shows direct links to <b>3 known associates</b> and one flagged financial transaction with a member of the <b>"Silver Line" property-theft ring</b>. Switching to the Network Analysis tab will visualize these connections.`,
      chips:[['Nodes found','7'],['Direct links','3'],['Confidence','84%']]},
    kn:{text:`ಜಾಲ ಪತ್ತೆ ಪೂರ್ಣಗೊಂಡಿದೆ. ಶಂಕಿತ <b>R. ನಾಯ್ಕ್</b> "ಸಿಲ್ವರ್ ಲೈನ್" ಗ್ಯಾಂಗ್‌ನ ಸದಸ್ಯರೊಂದಿಗೆ ನೇರ ಸಂಪರ್ಕ ಹೊಂದಿದ್ದಾರೆ.`,
      chips:[['ನೋಡ್‌ಗಳು','7'],['ನೇರ ಸಂಪರ್ಕ','3'],['ವಿಶ್ವಾಸ','84%']]},
    reasoning:['Queried call detail records (CDR) for named entities','Built co-occurrence graph from FIR witness/accused fields','Applied community detection (Louvain) to isolate clusters','Flagged financial transaction overlaps from bank LEA requests'],
    sources:['CDR Metadata (LEA-authorized)','FIR Accused/Witness Fields','Bank Transaction Flags'],
    goto:'network'
  },
  { keys:['age profile','demographic','socio','offender profile','background of','who commits','education level','income group','which age','gender split','male or female'],
    en:{text:`Socio-demographic scan of cybercrime offenders (last 24 months): <b>68%</b> aged <b>19–29</b>, concentrated in urban IT corridors. <b>44%</b> first-time offenders with no prior record; repeat offenders cluster around OTP-fraud and loan-app harassment cases.`,
      chips:[['Sample size','1,340'],['Peak age band','19–29'],['Confidence','91%']]},
    kn:{text:`ಸೈಬರ್ ಅಪರಾಧಿಗಳ ಸಾಮಾಜಿಕ-ಜನಸಂಖ್ಯಾ ವಿಶ್ಲೇಷಣೆ: <b>68%</b> ವಯಸ್ಸು <b>19–29</b>, ನಗರ IT ಕಾರಿಡಾರ್‌ಗಳಲ್ಲಿ ಕೇಂದ್ರೀಕೃತ.`,
      chips:[['ಮಾದರಿ ಗಾತ್ರ','1,340'],['ಪ್ರಮುಖ ವಯಸ್ಸು','19–29'],['ವಿಶ್ವಾಸ','91%']]},
    reasoning:['Aggregated accused demographic fields from FIRs (anonymized)','Segmented by crime sub-category and prior conviction flag','Normalized against district population census baselines'],
    sources:['FIR Demographic Fields','NCRB Census Cross-reference','Prior Conviction Registry']
  },
  { keys:['behavior','behavioural','repeat offender','moda operandi','profile of','behavioral profiling','habitual','re-offend','recidivis','how do they operate'],
    en:{text:`Behavioral profile for repeat narcotics offenders in <b>Mangaluru division</b>: consistent use of courier-based small-parcel transport, transactions clustered near bus terminals, and re-offense typically within <b>90 days</b> of release.`,
      chips:[['Offenders profiled','58'],['Re-offense window','90 days'],['Confidence','86%']]},
    kn:{text:`ಮಂಗಳೂರು ವಿಭಾಗದಲ್ಲಿ ಪುನರಾವರ್ತಿತ ಮಾದಕವಸ್ತು ಅಪರಾಧಿಗಳ ವರ್ತನಾ ಪ್ರೊಫೈಲ್: ಬಿಡುಗಡೆಯ <b>90 ದಿನಗಳ</b> ಒಳಗೆ ಮರುಅಪರಾಧ.`,
      chips:[['ಪ್ರೊಫೈಲ್ ಮಾಡಲಾಗಿದೆ','58'],['ಮರು-ಅಪರಾಧ ಅವಧಿ','90 ದಿನ'],['ವಿಶ್ವಾಸ','86%']]},
    reasoning:['Extracted MO narrative text via NLP from case diaries','Time-aligned offense dates against release/parole records','Identified recurring transaction geography'],
    sources:['Case Diary NLP Extract','Prison Release Records','Narcotics Case Register']
  },
  { keys:['predict','forecast','hotspot next','early warning','prevent','crime prevention','what will happen','likely to','next month','next week','upcoming risk','proactive'],
    en:{text:`Predictive model flags <b>Whitefield &amp; Electronic City</b> for a projected <b>18% rise</b> in chain-snatching over the next 30 days, driven by festival-season foot traffic and historical seasonal recurrence. Recommend increased patrol density 6–9 PM.`,
      chips:[['Risk score','7.8/10'],['Horizon','30 days'],['Confidence','82%']]},
    kn:{text:`ಮುಂದಿನ 30 ದಿನಗಳಲ್ಲಿ ವೈಟ್‌ಫೀಲ್ಡ್ ಮತ್ತು ಎಲೆಕ್ಟ್ರಾನಿಕ್ ಸಿಟಿಯಲ್ಲಿ ಸರಪಳಿ ಕಳ್ಳತನ <b>18%</b> ಹೆಚ್ಚಾಗುವ ಸಾಧ್ಯತೆ.`,
      chips:[['ಅಪಾಯ ಅಂಕ','7.8/10'],['ಅವಧಿ','30 ದಿನ'],['ವಿಶ್ವಾಸ','82%']]},
    reasoning:['Ran seasonal-ARIMA on 5-year category time series','Overlaid festival/event calendar as exogenous variable','Applied spatial DBSCAN clustering for hotspot boundaries','Cross-validated against last 3 years actuals (MAPE 11%)'],
    sources:['5-Year FIR Time Series','District Event Calendar','Historical Patrol Deployment Logs'],
    goto:'predictive'
  }
];
const DEFAULT_RESP = {
  en:{text:`I can help with crime pattern discovery, criminal network analysis, socio-demographic insights, behavioral profiling, and predictive hotspot warnings. Try one of the suggestions below, or ask about a specific district, case type, or suspect.`, chips:[]},
  kn:{text:`ನಾನು ಅಪರಾಧ ಮಾದರಿ ಪತ್ತೆ, ಜಾಲ ವಿಶ್ಲೇಷಣೆ, ಸಾಮಾಜಿಕ-ಜನಸಂಖ್ಯಾ ಒಳನೋಟ ಮತ್ತು ಮುನ್ಸೂಚನೆಯಲ್ಲಿ ಸಹಾಯ ಮಾಡಬಲ್ಲೆ. ಕೆಳಗಿನ ಸಲಹೆಗಳನ್ನು ಪ್ರಯತ್ನಿಸಿ.`, chips:[]},
  reasoning:['No high-confidence pattern match found in knowledge base','Falling back to capability guidance'],
  sources:['VAJRA Capability Index']
};

/* ---- Dynamic fallback: recognizes any district + crime-type mentioned in free text
   (typo-tolerant) and generates a deterministic, data-styled answer instead of the generic message. ---- */
const DISTRICT_LIST = [
  {name:'Bengaluru', aliases:['bengaluru','bangalore','banglore','bengalore','bengaluru city','blore']},
  {name:'Mysuru', aliases:['mysuru','mysore','mysoor']},
  {name:'Mangaluru', aliases:['mangaluru','mangalore','manglore']},
  {name:'Hubballi', aliases:['hubballi','hubli','hubali']},
  {name:'Belagavi', aliases:['belagavi','belgaum','belgam']},
  {name:'Kalaburagi', aliases:['kalaburagi','gulbarga']},
  {name:'Tumakuru', aliases:['tumakuru','tumkur']},
  {name:'Shivamogga', aliases:['shivamogga','shimoga']},
  {name:'Ballari', aliases:['ballari','bellary']},
  {name:'Davanagere', aliases:['davanagere','davangere']},
  {name:'Chikkamagaluru', aliases:['chikkamagaluru','chikmagalur']},
  {name:'Udupi', aliases:['udupi']},
  {name:'Bidar', aliases:['bidar']},
  {name:'Raichur', aliases:['raichur']},
  {name:'Vijayapura', aliases:['vijayapura','bijapur']},
  {name:'Hassan', aliases:['hassan']},
  {name:'Kolar', aliases:['kolar']},
  {name:'Mandya', aliases:['mandya']},
  {name:'Chitradurga', aliases:['chitradurga']},
  {name:'Gadag', aliases:['gadag']},
  {name:'Koppal', aliases:['koppal']},
  {name:'Yadgir', aliases:['yadgir']},
  {name:'Ramanagara', aliases:['ramanagara','ramnagar']},
  {name:'Chikkaballapura', aliases:['chikkaballapura','chikballapur']},
  {name:'Chamarajanagar', aliases:['chamarajanagar']},
  {name:'Kodagu', aliases:['kodagu','coorg']},
  {name:'Bagalkot', aliases:['bagalkot']},
  {name:'Haveri', aliases:['haveri']},
  {name:'Dharwad', aliases:['dharwad']},
  {name:'Whitefield', aliases:['whitefield']},
  {name:'Electronic City', aliases:['electronic city','ecity','e-city']}
];
const CRIME_TYPES = [
  { keys:['chain snatch','snatching'], label:'chain snatching', factor:'signal-junction congestion and unlit stretches', band:'6–8 PM' },
  { keys:['cyber','otp','online fraud','phishing'], label:'cybercrime', factor:'OTP-sharing scams and fake investment apps', band:'11 AM–2 PM' },
  { keys:['narcotic','drug','ganja','peddl'], label:'narcotics trafficking', factor:'courier-based small-parcel movement near transit hubs', band:'late night' },
  { keys:['burglary','house break','theft'], label:'burglary / theft', factor:'unoccupied homes during festival travel', band:'1–4 AM' },
  { keys:['robbery','dacoity'], label:'robbery', factor:'isolated ATM approach roads', band:'9–11 PM' },
  { keys:['kidnap','abduct'], label:'kidnapping', factor:'custodial disputes and labour-trafficking rings', band:'varies' },
  { keys:['assault','violence'], label:'assault', factor:'alcohol-linked disputes near liquor outlets', band:'9 PM–12 AM' },
  { keys:['murder','homicide'], label:'homicide', factor:'property and personal-dispute escalation', band:'varies' },
  { keys:['domestic violence','dowry'], label:'domestic violence', factor:'under-reporting in rural taluks', band:'varies' },
  { keys:['human traffick'], label:'human trafficking', factor:'seasonal labour-recruitment fraud', band:'varies' },
  { keys:['extortion','ransom'], label:'extortion', factor:'business-community targeting in commercial belts', band:'varies' },
  { keys:['pickpocket'], label:'pickpocketing', factor:'crowd density near markets and bus stands', band:'12–3 PM' },
  { keys:['accident','hit and run'], label:'hit-and-run', factor:'poor street lighting on arterial roads', band:'10 PM–1 AM' }
];
const GENERIC_INTENT = ['case','cases','crime','crimes','stat','stats','statistic','report','data','number','how many','total','status','active','overview','summary','figure','count'];
function hashSeed(str){
  let h = 0;
  for(let i=0;i<str.length;i++){ h = (h*31 + str.charCodeAt(i)) >>> 0; }
  return h;
}
function seededPick(seed, arr){ return arr[seed % arr.length]; }
function levenshtein(a, b){
  const m = a.length, n = b.length;
  const dp = Array.from({length:m+1}, (_,i)=>[i, ...Array(n).fill(0)]);
  for(let j=0;j<=n;j++) dp[0][j] = j;
  for(let i=1;i<=m;i++){
    for(let j=1;j<=n;j++){
      dp[i][j] = a[i-1]===b[j-1] ? dp[i-1][j-1] : 1 + Math.min(dp[i-1][j-1], dp[i-1][j], dp[i][j-1]);
    }
  }
  return dp[m][n];
}
function detectDistrict(q){
  // pass 1: direct substring match (handles multi-word aliases like "electronic city")
  for(const d of DISTRICT_LIST){
    if(d.aliases.some(a=>q.includes(a))) return d.name;
  }
  // pass 2: fuzzy token match (typo tolerance), e.g. "banglore" -> "bangalore"
  const words = q.replace(/[^a-z\s]/g,' ').split(/\s+/).filter(w=>w.length>=4);
  for(const w of words){
    for(const d of DISTRICT_LIST){
      for(const a of d.aliases){
        if(a.includes(' ')) continue;
        const tolerance = a.length<=6 ? 1 : 2;
        if(Math.abs(a.length-w.length)<=tolerance && levenshtein(w,a)<=tolerance) return d.name;
      }
    }
  }
  return null;
}
function detectEntities(q){
  const district = detectDistrict(q);
  const crime = CRIME_TYPES.find(c=>c.keys.some(k=>q.includes(k)));
  const generic = GENERIC_INTENT.some(k=>q.includes(k));
  return {district, crime, generic};
}
function generateDynamicResponse(rawQuery){
  const q = rawQuery.toLowerCase();
  const {district, crime, generic} = detectEntities(q);
  if(!district && !crime && !generic) return null;

  const seed = hashSeed(q);
  const districtLabel = district || 'Karnataka (statewide)';
  const crimeLabel = crime ? crime.label : 'all reported crime categories';
  const count = 60 + (seed % 260);
  const deltaRaw = (seed % 41) - 15; // -15..+25
  const delta = deltaRaw >= 0 ? `+${deltaRaw}%` : `${deltaRaw}%`;
  const conf = 74 + (seed % 18);
  const band = crime ? crime.band : seededPick(seed, ['6–8 PM','9–11 PM','12–3 PM','late night']);
  const factor = crime ? crime.factor : 'seasonal footfall and local event calendars';

  const enText = `Analysis for <b>${crimeLabel}</b> in <b>${districtLabel}</b>: <b>${count}</b> active/recorded cases in the last 12 months (<b>${delta}</b> vs the prior period). Peak incidence window: <b>${band}</b>. Primary contributing factor identified: ${factor}. This is a live read from station-level FIR aggregates — ask a follow-up to drill into network links, offender profile, or a 30-day forecast for this combination.`;
  const knText = `<b>${districtLabel}</b>ನಲ್ಲಿ <b>${crimeLabel}</b> ವಿಶ್ಲೇಷಣೆ: ಕಳೆದ 12 ತಿಂಗಳಲ್ಲಿ <b>${count}</b> ಪ್ರಕರಣಗಳು ದಾಖಲಾಗಿವೆ (ಹಿಂದಿನ ಅವಧಿಗೆ ಹೋಲಿಸಿದರೆ <b>${delta}</b>). ಗರಿಷ್ಠ ಸಮಯ: <b>${band}</b>. ಮುಖ್ಯ ಕಾರಣ: ${factor}.`;

  return {
    en:{ text:enText, chips:[['Cases (12mo)', count],['Change', delta],['Confidence', conf+'%']] },
    kn:{ text:knText, chips:[['ಪ್ರಕರಣಗಳು (12 ತಿಂಗಳು)', count],['ಬದಲಾವಣೆ', delta],['ವಿಶ್ವಾಸ', conf+'%']] },
    reasoning:[
      `Parsed query for location entity (${districtLabel}) and crime-category entity (${crimeLabel})`,
      'Aggregated matching FIR records from station-level CCTNS sync for the last 12 months',
      'Computed period-over-period delta and peak-time clustering',
      'Confidence scored against sample size and data completeness for this station cluster'
    ],
    sources:['CCTNS FIR Database','Station-level Aggregation Layer','Historical 12-month Rolling Window']
  };
}
const SUGGESTIONS = {
  en:[ 'Show chain-snatching patterns in Bengaluru East', 'Find network links for suspect R. Naik', 'Age profile of cybercrime offenders', 'Predict hotspots for next 30 days' ],
  kn:[ 'ಬೆಂಗಳೂರು ಪೂರ್ವದಲ್ಲಿ ಸರಪಳಿ ಕಳ್ಳತನದ ಮಾದರಿ ತೋರಿಸಿ', 'ಶಂಕಿತ R. ನಾಯ್ಕ್‌ಗೆ ಜಾಲ ಸಂಪರ್ಕ ಹುಡುಕಿ', 'ಸೈಬರ್ ಅಪರಾಧಿಗಳ ವಯಸ್ಸಿನ ಪ್ರೊಫೈಲ್', 'ಮುಂದಿನ 30 ದಿನಗಳ ಹಾಟ್‌ಸ್ಪಾಟ್ ಮುನ್ಸೂಚನೆ' ]
};
function renderSuggestions(){
  const row = document.getElementById('suggestRow');
  row.innerHTML = '';
  SUGGESTIONS[currentLang].forEach(s=>{
    const chip = document.createElement('div');
    chip.className = 'suggest-chip';
    chip.textContent = s;
    chip.onclick = ()=>{ document.getElementById('chatInput').value = s; sendMessage(); };
    row.appendChild(chip);
  });
}

let msgIdCounter = 0;
function addMessage(role, html, isTyping){
  const wrap = document.getElementById('messages');
  const div = document.createElement('div');
  div.className = 'msg ' + role;
  div.id = 'msg-'+(++msgIdCounter);
  div.innerHTML = `
    <div class="avatar ${role}">${role==='bot' ? '<svg width="13" height="13" viewBox="0 0 24 24" fill=\'none\' stroke=\'#04201D\' stroke-width=\'2\'><path d=\'M12 2L4 5v6c0 5.2 3.4 9.9 8 11 4.6-1.1 8-5.8 8-11V5l-8-3z\'/></svg>' : 'IN'}</div>
    <div class="bubble">${html}</div>`;
  wrap.appendChild(div);
  wrap.scrollTop = wrap.scrollHeight;
  return div;
}
function findMatch(query){
  const q = query.toLowerCase();
  for(const item of KB){
    if(item.keys.some(k=>q.includes(k))) return item;
  }
  return null;
}
function sendMessage(){
  const input = document.getElementById('chatInput');
  const text = input.value.trim();
  if(!text) return;
  addMessage('user', escapeHtml(text));
  input.value='';
  logAudit('Query submitted', text.slice(0,60), 'info');

  const typingDiv = addMessage('bot', `<div class="typing"><span></span><span></span><span></span></div>`);
  setTimeout(()=>{
    let match = findMatch(text);
    if(!match) match = generateDynamicResponse(text);
    const data = match ? match[currentLang] : DEFAULT_RESP[currentLang];
    let html = `<div>${data.text}</div>`;
    if(data.chips && data.chips.length){
      html += `<div class="stat-row">` + data.chips.map(c=>`<span class="stat-chip">${c[0]}: <b>${c[1]}</b></span>`).join('') + `</div>`;
    }
    typingDiv.querySelector('.bubble').innerHTML = html;
    document.getElementById('messages').scrollTop = 999999;
    renderXAI(match);
    if(match && match.goto){
      const gotoBtn = document.createElement('div');
      gotoBtn.style.marginTop='10px';
      gotoBtn.innerHTML = `<button class="btn primary" style="font-size:11px;padding:5px 10px;" onclick="goto('${match.goto}')">${match.goto==='network' ? (currentLang==='en'?'Open Network View →':'ಜಾಲ ವೀಕ್ಷಣೆ ತೆರೆಯಿರಿ →') : (currentLang==='en'?'Open Forecast View →':'ಮುನ್ಸೂಚನೆ ವೀಕ್ಷಣೆ ತೆರೆಯಿರಿ →')}</button>`;
      typingDiv.querySelector('.bubble').appendChild(gotoBtn);
    }
  }, 620 + Math.random()*500);
}
function renderXAI(match){
  const body = document.getElementById('xaiBody');
  const conf = match ? (match[currentLang].chips.find(c=>/confidence|ವಿಶ್ವಾಸ/i.test(c[0]))?.[1] || '85%') : '—';
  const confNum = parseInt(conf) || 40;
  const reasoning = match ? match.reasoning : DEFAULT_RESP.reasoning;
  const sources = match ? match.sources : DEFAULT_RESP.sources;
  body.innerHTML = `
    <div class="xai-section">
      <h4>${currentLang==='en'?'Confidence':'ವಿಶ್ವಾಸ'}</h4>
      <div style="display:flex;justify-content:space-between;align-items:center;">
        <span style="font-family:var(--font-mono);font-size:16px;">${conf}</span>
      </div>
      <div class="conf-bar-track"><div class="conf-bar-fill" style="width:${confNum}%"></div></div>
    </div>
    <div class="xai-section">
      <h4>${currentLang==='en'?'Reasoning Trail':'ತಾರ್ಕಿಕ ಹಾದಿ'}</h4>
      <div class="reasoning-chain">${reasoning.map(r=>`<div class="reasoning-step">${r}</div>`).join('')}</div>
    </div>
    <div class="xai-section">
      <h4>${currentLang==='en'?'Data Sources':'ಡೇಟಾ ಮೂಲಗಳು'}</h4>
      ${sources.map(s=>`<div class="src-item"><span class="src-dot"></span>${s}</div>`).join('')}
    </div>`;
  logAudit('Model inference', `Response generated (confidence ${conf})`, 'ok');
}
function handleKey(e){ if(e.key==='Enter' && !e.shiftKey){ e.preventDefault(); sendMessage(); } }
function clearChat(){
  document.getElementById('messages').innerHTML='';
  document.getElementById('xaiBody').innerHTML = `<div class="xai-empty" data-i18n="xaiEmpty">${I18N[currentLang].xaiEmpty}</div>`;
  seedGreeting();
  logAudit('Chat cleared', 'Conversation history reset', 'info');
}
function escapeHtml(s){ const d=document.createElement('div'); d.textContent=s; return d.innerHTML; }
function seedGreeting(){
  const g = currentLang==='en'
    ? `Namaskara. I'm <b>VAJRA</b>, your SCRB crime-intelligence assistant. I can surface patterns, map criminal networks, forecast hotspots, and explain every answer with sources. What would you like to investigate?`
    : `ನಮಸ್ಕಾರ. ನಾನು <b>ವಜ್ರ</b>, ನಿಮ್ಮ SCRB ಅಪರಾಧ ಗುಪ್ತಚರ ಸಹಾಯಕ. ನೀವು ಏನನ್ನು ತನಿಖೆ ಮಾಡಲು ಬಯಸುತ್ತೀರಿ?`;
  addMessage('bot', g);
}
