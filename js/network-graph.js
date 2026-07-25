/* ================= NETWORK GRAPH (D3) ================= */
let graphInit=false;
const graphData = {
  nodes:[
    {id:'R. Naik', type:'person', tag:'Person of interest · 3 open cases'},
    {id:'Silver Line Gang', type:'gang', tag:'Organized property-theft ring'},
    {id:'K. Prasad', type:'person', tag:'Associate · 1 prior conviction'},
    {id:'M. Iqbal', type:'associate', tag:'Financial handler · flagged'},
    {id:'Whitefield Hub', type:'location', tag:'Location cluster · 14 linked FIRs'},
    {id:'S. Reddy', type:'person', tag:'Suspect · absconding'},
    {id:'Electronic City Hub', type:'location', tag:'Location cluster · 9 linked FIRs'},
    {id:'Golden Chain Buyers', type:'gang', tag:'Fencing network · pawn shops'},
    {id:'A. Thomas', type:'associate', tag:'Witness · statement recorded'},
    {id:'V. Kumar', type:'person', tag:'Person of interest · parole violation'}
  ],
  links:[
    {source:'R. Naik', target:'Silver Line Gang'},
    {source:'R. Naik', target:'K. Prasad'},
    {source:'K. Prasad', target:'M. Iqbal'},
    {source:'Silver Line Gang', target:'Whitefield Hub'},
    {source:'Silver Line Gang', target:'S. Reddy'},
    {source:'S. Reddy', target:'Electronic City Hub'},
    {source:'M. Iqbal', target:'Golden Chain Buyers'},
    {source:'Golden Chain Buyers', target:'Electronic City Hub'},
    {source:'R. Naik', target:'A. Thomas'},
    {source:'V. Kumar', target:'Whitefield Hub'},
    {source:'V. Kumar', target:'Silver Line Gang'}
  ]
};
const typeColor = { person:'#EA5B5B', gang:'#F0A94E', location:'#33D6C7', associate:'#6B7A9A' };
let simulation;
function initGraph(){
  graphInit = true;
  const svg = d3.select('#networkSvg');
  const container = document.getElementById('networkSvg').parentElement;
  const width = container.clientWidth, height = container.clientHeight;
  svg.attr('viewBox', [0,0,width,height]);
  const g = svg.append('g');
  svg.call(d3.zoom().scaleExtent([0.4,2.5]).on('zoom', (e)=> g.attr('transform', e.transform)));

  const nodes = graphData.nodes.map(d=>({...d}));
  const links = graphData.links.map(d=>({...d}));

  simulation = d3.forceSimulation(nodes)
    .force('link', d3.forceLink(links).id(d=>d.id).distance(110).strength(0.6))
    .force('charge', d3.forceManyBody().strength(-320))
    .force('center', d3.forceCenter(width/2, height/2))
    .force('collide', d3.forceCollide(38));

  const link = g.append('g').selectAll('line').data(links).join('line')
    .attr('stroke','#233047').attr('stroke-width',1.6);

  const node = g.append('g').selectAll('g').data(nodes).join('g')
    .attr('cursor','pointer')
    .call(d3.drag()
      .on('start', (event,d)=>{ if(!event.active) simulation.alphaTarget(0.3).restart(); d.fx=d.x; d.fy=d.y; })
      .on('drag', (event,d)=>{ d.fx=event.x; d.fy=event.y; })
      .on('end', (event,d)=>{ if(!event.active) simulation.alphaTarget(0); d.fx=null; d.fy=null; }));

  node.append('circle')
    .attr('r', d=> d.type==='gang' ? 20 : d.type==='location' ? 17 : 14)
    .attr('fill', d=>typeColor[d.type])
    .attr('fill-opacity', 0.18)
    .attr('stroke', d=>typeColor[d.type])
    .attr('stroke-width', 2);

  node.append('text')
    .text(d=>d.id)
    .attr('x', 0).attr('y', d=> (d.type==='gang'?20:d.type==='location'?17:14) + 14)
    .attr('text-anchor','middle')
    .attr('fill','#9FADC7')
    .attr('font-size', 10.5)
    .attr('font-family', 'Inter, sans-serif');

  node.on('click', (event,d)=>{
    document.getElementById('nodeDetail').innerHTML = `
      <div class="nd-name">${d.id}</div>
      <span class="nd-tag" style="color:${typeColor[d.type]};border:1px solid ${typeColor[d.type]}44;background:${typeColor[d.type]}18;">${d.type.toUpperCase()}</span>
      <div>${d.tag}</div>`;
    logAudit('Network node inspected', d.id, 'info');
  });

  simulation.on('tick', ()=>{
    link.attr('x1',d=>d.source.x).attr('y1',d=>d.source.y).attr('x2',d=>d.target.x).attr('y2',d=>d.target.y);
    node.attr('transform', d=>`translate(${d.x},${d.y})`);
  });
}
function resetGraph(){
  if(simulation){ simulation.alpha(1).restart(); }
  logAudit('Network layout reset', 'Force simulation re-initialized', 'info');
}
