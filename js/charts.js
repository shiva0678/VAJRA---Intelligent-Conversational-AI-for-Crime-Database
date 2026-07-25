/* ================= TRENDS CHARTS ================= */
let trendsInit=false;
function initTrends(){
  trendsInit = true;
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const ctx1 = document.getElementById('trendChart');
  new Chart(ctx1, {
    type:'line',
    data:{ labels:months, datasets:[
      { label:'Property Crime', data:[1200,1150,1300,1280,1400,1550,1500,1620,1580,1700,1750,1820], borderColor:'#33D6C7', backgroundColor:'rgba(51,214,199,0.08)', tension:0.35, fill:true, pointRadius:0, borderWidth:2 },
      { label:'Cybercrime', data:[600,650,700,720,780,850,900,980,1020,1100,1180,1260], borderColor:'#F0A94E', backgroundColor:'rgba(240,169,78,0.08)', tension:0.35, fill:true, pointRadius:0, borderWidth:2 },
      { label:'Narcotics', data:[300,310,290,320,340,360,350,380,400,410,430,450], borderColor:'#EA5B5B', backgroundColor:'rgba(234,91,91,0.08)', tension:0.35, fill:true, pointRadius:0, borderWidth:2 }
    ]},
    options: chartOpts(true)
  });
  const ctx2 = document.getElementById('districtChart');
  new Chart(ctx2, {
    type:'bar',
    data:{ labels:['Bengaluru Urban','Mysuru','Belagavi','Mangaluru','Hubballi-Dharwad','Kalaburagi','Tumakuru'],
      datasets:[{ label:'Cases', data:[4820,1640,1390,1220,1105,980,860], backgroundColor:'#33D6C7', borderRadius:4, barThickness:16 }]},
    options: {...chartOpts(false), indexAxis:'y'}
  });

  const hotspots = [
    {name:'Whitefield, Bengaluru East', cat:'Chain snatching · Two-wheeler theft', count:214, pct:100},
    {name:'Electronic City', cat:'Cybercrime · OTP fraud', count:187, pct:87},
    {name:'Mysuru City', cat:'Residential burglary', count:142, pct:66},
    {name:'Hubballi Market Area', cat:'Pickpocketing', count:98, pct:46},
    {name:'Mangaluru Port Zone', cat:'Narcotics transit', count:76, pct:35}
  ];
  document.getElementById('hotspotList').innerHTML = hotspots.map((h,i)=>`
    <div class="hotspot-row">
      <div class="hs-rank">#${i+1}</div>
      <div><div class="hs-name">${h.name}</div><div class="hs-cat">${h.cat}</div></div>
      <div class="hs-bar-track"><div class="hs-bar-fill" style="width:${h.pct}%"></div></div>
      <div class="hs-count">${h.count}</div>
    </div>`).join('');
}
function chartOpts(showLegend){
  return {
    responsive:true, maintainAspectRatio:false,
    plugins:{ legend:{ display:showLegend, labels:{ color:'#9FADC7', font:{size:11}, boxWidth:10 } } },
    scales:{
      x:{ ticks:{ color:'#6B7A9A', font:{size:10} }, grid:{ color:'#1B2740' } },
      y:{ ticks:{ color:'#6B7A9A', font:{size:10} }, grid:{ color:'#1B2740' } }
    }
  };
}

/* ================= PREDICTIVE ================= */
let predInit=false;
function initPredictive(){
  predInit = true;
  const days = Array.from({length:10}, (_,i)=>`D+${(i+1)*3}`);
  const base = [610,625,640,660,700,730,760,800,840,880];
  const upper = base.map(v=>v+45);
  const lower = base.map(v=>v-45);
  new Chart(document.getElementById('forecastChart'), {
    data:{ labels:days, datasets:[
      { type:'line', label:'Upper bound', data:upper, borderColor:'transparent', backgroundColor:'rgba(51,214,199,0.12)', fill:'+1', pointRadius:0 },
      { type:'line', label:'Lower bound', data:lower, borderColor:'transparent', pointRadius:0, fill:false },
      { type:'line', label:'Forecast', data:base, borderColor:'#33D6C7', backgroundColor:'#33D6C7', borderWidth:2.4, pointRadius:2, tension:0.3 }
    ]},
    options: {...chartOpts(true), plugins:{legend:{display:false}}}
  });

  const warnings = [
    { level:'high', title:'Whitefield & Electronic City — Chain snatching', desc:'Projected 18% rise over next 30 days driven by festival-season foot traffic. Recommend increased patrol density 6–9 PM.', meta:'Model: seasonal-ARIMA · Retrained 2 days ago', score:'7.8' },
    { level:'high', title:'Mangaluru Port Zone — Narcotics transit', desc:'Spike in courier-parcel movement correlated with two prior seizure patterns. Recommend coordination with Coastal Security Police.', meta:'Model: spatial-DBSCAN · Retrained 2 days ago', score:'7.2' },
    { level:'medium', title:'Mysuru City — Residential burglary', desc:'Moderate uptick expected during upcoming long-weekend travel period based on 3-year seasonal recurrence.', meta:'Model: seasonal-ARIMA · Retrained 5 days ago', score:'5.6' },
    { level:'medium', title:'Hubballi Market Area — Pickpocketing', desc:'Crowd-density correlation flagged ahead of scheduled public events; low-severity but high-frequency risk.', meta:'Model: event-calendar overlay · Retrained 5 days ago', score:'4.9' }
  ];
  document.getElementById('warnList').innerHTML = warnings.map(w=>`
    <div class="warn-card ${w.level}">
      <div class="warn-ic">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 9v4M12 17h.01M10.3 3.9L2.5 17a2 2 0 001.7 3h15.6a2 2 0 001.7-3L13.7 3.9a2 2 0 00-3.4 0z"/></svg>
      </div>
      <div>
        <div class="warn-title">${w.title}</div>
        <div class="warn-desc">${w.desc}</div>
        <div class="warn-meta">${w.meta}</div>
      </div>
      <div class="warn-score"><div class="n">${w.score}</div><div class="l">Risk /10</div></div>
    </div>`).join('');
}
