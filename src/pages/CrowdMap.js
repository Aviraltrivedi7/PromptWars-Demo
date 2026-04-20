import React, { useState, useEffect } from 'react';
import { ZONES } from '../data/venueData';

function clr(c){
  if(c>=85) return {fill:'rgba(255,61,87,.45)',stroke:'#ff3d57',txt:'#ff6b7a',lbl:'PACKED'};
  if(c>=60) return {fill:'rgba(255,214,0,.30)',stroke:'#ffd600',txt:'#ffd600',lbl:'BUSY'};
  return           {fill:'rgba(0,230,118,.28)',stroke:'#00e676',txt:'#00e676',lbl:'OPEN'};
}

const GATES = [
  {x:44,y:0,label:'G1'},{x:56,y:0,label:'G2'},
  {x:50,y:99,label:'G3'},
  {x:99,y:42,label:'G4'},{x:99,y:58,label:'G5'},
  {x:0,y:50,label:'G6'},
];

export default function CrowdMap() {
  const [selected, setSelected] = useState(null);
  const [live, setLive] = useState(ZONES.map(z=>z.crowd));

  useEffect(()=>{
    const t = setInterval(()=>{
      setLive(prev=>prev.map(c=>Math.min(99,Math.max(10,c+(Math.random()-.48)*2.5))));
    },3500);
    return ()=>clearInterval(t);
  },[]);

  const sel = selected!=null ? {...ZONES[selected], crowd:Math.round(live[selected])} : null;

  const overallPct = Math.round(live.filter((_,i)=>ZONES[i].w>0).reduce((s,c)=>s+c,0)/live.filter((_,i)=>ZONES[i].w>0).length);

  return (
    <div className="page-wrap">
      <style>{`
        .map-hdr{padding:16px;border-bottom:1px solid var(--border)}
        .map-card{
          margin:14px 16px;background:var(--card);border:1px solid var(--border2);
          border-radius:var(--r-xl);padding:16px;
        }
        .zone-svg-rect{cursor:pointer;transition:opacity .25s}
        .zone-svg-rect:hover{opacity:.75}
        .legend{display:flex;gap:14px;justify-content:center;margin-top:10px}
        .leg-item{display:flex;align-items:center;gap:6px;font-size:11px;color:var(--text2)}
        .leg-dot{width:10px;height:10px;border-radius:3px}
        .detail-card{
          margin:0 16px 14px;background:var(--card);border:1px solid var(--border2);
          border-radius:var(--r-lg);padding:16px;animation:fadeUp .3s ease;
        }
        @keyframes fadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        .mini-stats{display:flex;gap:8px;margin-top:12px}
        .mini-stat{flex:1;background:var(--bg3);border-radius:10px;padding:10px;text-align:center}
        .mini-num{font-family:var(--font-mono);font-size:18px;font-weight:700}
        .mini-lbl{font-size:9px;color:var(--text2);text-transform:uppercase;letter-spacing:.07em;margin-top:2px}
        .zone-list{padding:0 16px}
        .zone-row{
          display:flex;align-items:center;gap:10px;
          background:var(--card);border:1px solid var(--border);
          border-radius:var(--r-md);padding:13px;margin-bottom:7px;
          cursor:pointer;transition:border-color .2s;
        }
        .zone-row:hover{border-color:var(--accent)}
        .zone-row.sel{border-color:var(--accent);background:rgba(0,212,255,.04)}
        .z-bar{flex:1;height:4px;background:var(--bg3);border-radius:2px}
        .z-bar-fill{height:100%;border-radius:2px;transition:width 1s}
        .rec-badge{
          background:rgba(0,230,118,.15);border:1px solid rgba(0,230,118,.35);
          border-radius:100px;padding:2px 9px;font-size:9px;color:var(--green);font-weight:700;
        }
      `}</style>

      {/* Header */}
      <div className="map-hdr">
        <div style={{fontFamily:'var(--font-display)',fontSize:26,letterSpacing:'.05em'}}>CROWD MAP</div>
        <div style={{display:'flex',alignItems:'center',gap:10,marginTop:4}}>
          <div style={{fontSize:11,color:'var(--text2)',fontFamily:'var(--font-mono)'}}>Live · updates every 3.5s</div>
          <div style={{marginLeft:'auto',fontFamily:'var(--font-mono)',fontSize:13,color:overallPct>80?'var(--red)':overallPct>60?'var(--yellow)':'var(--green)'}}>
            Avg {overallPct}%
          </div>
        </div>
      </div>

      {/* SVG Map */}
      <div className="map-card">
        <svg viewBox="0 0 100 100" style={{width:'100%',height:'auto',maxHeight:270,display:'block'}}>
          {/* Field */}
          <ellipse cx="50" cy="50" rx="27" ry="23" fill="rgba(0,120,60,.18)" stroke="rgba(0,200,80,.3)" strokeWidth=".5"/>
          <ellipse cx="50" cy="50" rx="17" ry="13" fill="rgba(0,120,60,.1)" stroke="rgba(0,200,80,.2)" strokeWidth=".3"/>
          <text x="50" y="48.5" textAnchor="middle" fill="rgba(0,220,100,.5)" fontSize="3.2" fontFamily="sans-serif">PITCH</text>
          <text x="50" y="52.5" textAnchor="middle" fill="rgba(0,220,100,.35)" fontSize="2.5" fontFamily="sans-serif">IPL 2025</text>

          {/* Zones */}
          {ZONES.filter(z=>z.w>0).map((z,i)=>{
            const c = clr(Math.round(live[i]));
            const isSel = selected===i;
            return (
              <g key={z.id} className="zone-svg-rect" onClick={()=>setSelected(i===selected?null:i)}>
                <rect x={z.x} y={z.y} width={z.w} height={z.h} rx="2.5"
                  fill={c.fill} stroke={isSel?'#fff':c.stroke} strokeWidth={isSel?.9:.4}/>
                <text x={z.x+z.w/2} y={z.y+z.h/2-2} textAnchor="middle"
                  fill={c.txt} fontSize="3.2" fontWeight="bold" fontFamily="sans-serif">
                  {Math.round(live[i])}%
                </text>
                <text x={z.x+z.w/2} y={z.y+z.h/2+2.8} textAnchor="middle"
                  fill="rgba(255,255,255,.65)" fontSize="2.3" fontFamily="sans-serif">
                  {z.name.split(' ')[0]}
                </text>
                {z.recommended && (
                  <text x={z.x+z.w/2} y={z.y+z.h/2+5.8} textAnchor="middle"
                    fill="var(--green)" fontSize="2.5" fontFamily="sans-serif">★</text>
                )}
              </g>
            );
          })}

          {/* Gates */}
          {GATES.map(g=>(
            <text key={g.label} x={g.x} y={g.y+2.5} fontSize="2.8"
              fill="rgba(0,212,255,.7)" fontFamily="monospace" textAnchor="middle">{g.label}</text>
          ))}
        </svg>

        {/* Legend */}
        <div className="legend">
          {[{color:'#00e676',label:'Open <60%'},{color:'#ffd600',label:'Busy 60-85%'},{color:'#ff3d57',label:'Packed >85%'}].map(l=>(
            <div key={l.label} className="leg-item">
              <div className="leg-dot" style={{background:l.color}}/>
              {l.label}
            </div>
          ))}
        </div>
        <div style={{textAlign:'center',marginTop:8,fontSize:10,color:'var(--text3)'}}>
          ★ = Recommended zone
        </div>
      </div>

      {/* Selected zone detail */}
      {sel && (
        <div className="detail-card">
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
            <div>
              <div style={{fontWeight:700,fontSize:16}}>{sel.name}</div>
              <div style={{fontSize:12,color:'var(--text2)',marginTop:2}}>Gate {sel.gate}</div>
            </div>
            <div style={{fontSize:26,fontWeight:700,fontFamily:'var(--font-mono)',color:clr(sel.crowd).txt}}>
              {sel.crowd}%
            </div>
          </div>
          <div className="mini-stats">
            <div className="mini-stat">
              <div className="mini-num" style={{color:'var(--accent)'}}>{sel.wait}m</div>
              <div className="mini-lbl">Wait Now</div>
            </div>
            <div className="mini-stat">
              <div className="mini-num" style={{color:clr(sel.crowd).txt}}>{clr(sel.crowd).lbl}</div>
              <div className="mini-lbl">Status</div>
            </div>
            <div className="mini-stat">
              <div className="mini-num" style={{color:'var(--yellow)'}}>{(sel.capacity/1000).toFixed(1)}k</div>
              <div className="mini-lbl">Seats</div>
            </div>
          </div>
          {sel.recommended && (
            <div style={{marginTop:12,background:'rgba(0,230,118,.08)',border:'1px solid rgba(0,230,118,.3)',borderRadius:10,padding:'9px 12px',fontSize:12,color:'var(--green)'}}>
              ✅ This is the <b>recommended zone</b> — least crowded right now!
            </div>
          )}
        </div>
      )}

      {/* Zone list */}
      <div style={{padding:'0 16px 8px',fontSize:11,letterSpacing:'.1em',color:'var(--text2)',textTransform:'uppercase',fontFamily:'var(--font-mono)'}}>
        All Zones
      </div>
      <div className="zone-list">
        {ZONES.filter(z=>z.w>0).map((z,i)=>{
          const c = clr(Math.round(live[i]));
          return (
            <div key={z.id} className={`zone-row ${selected===i?'sel':''}`}
              onClick={()=>setSelected(i===selected?null:i)}>
              <div style={{width:10,height:10,borderRadius:'50%',background:c.txt,flexShrink:0}}/>
              <div style={{flex:1,minWidth:0}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:5}}>
                  <div style={{display:'flex',alignItems:'center',gap:7}}>
                    <span style={{fontSize:13,fontWeight:600}}>{z.name}</span>
                    {z.recommended && <span className="rec-badge">BEST</span>}
                  </div>
                  <span style={{fontSize:13,fontWeight:700,fontFamily:'var(--font-mono)',color:c.txt}}>
                    {Math.round(live[i])}%
                  </span>
                </div>
                <div className="z-bar">
                  <div className="z-bar-fill" style={{width:`${live[i]}%`,background:c.txt}}/>
                </div>
              </div>
              <div style={{textAlign:'right',minWidth:55}}>
                <div style={{fontSize:12,color:'var(--text2)',fontFamily:'var(--font-mono)'}}>~{z.wait}m</div>
                <div style={{fontSize:9,color:'var(--text3)'}}>Gate {z.gate}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
