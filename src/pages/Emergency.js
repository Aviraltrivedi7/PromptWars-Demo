import React, { useState, useEffect } from 'react';

const TYPES = [
  {id:'medical', icon:'🚑', label:'Medical Emergency',    color:'var(--red)',    loc:'Gate 3, Ground Floor',    res:'< 2 min'},
  {id:'fire',    icon:'🔥', label:'Fire / Smoke Detected',color:'var(--orange)', loc:'Alert staff immediately',  res:'< 1 min'},
  {id:'lost',    icon:'👶', label:'Lost Child / Person',  color:'var(--yellow)', loc:'Gate 1 Help Desk',         res:'< 3 min'},
  {id:'crowd',   icon:'🚷', label:'Crowd Crush / Surge',  color:'var(--red)',    loc:'Move to East Block',        res:'< 2 min'},
  {id:'security',icon:'🛡️', label:'Security Threat',     color:'var(--red)',    loc:'Dial 100 immediately',      res:'IMMEDIATE'},
  {id:'other',   icon:'ℹ️', label:'Other Emergency',      color:'var(--accent)', loc:'Stadium Control Room',      res:'< 5 min'},
];

const EXITS = [
  {name:'Gate 5 Exit',  time:'2 min', dist:'120m',  crowd:'Low',    dir:'East Block → Gate 5',   best:true},
  {name:'Gate 6 Exit',  time:'3 min', dist:'180m',  crowd:'Low',    dir:'West Block → Gate 6',   best:false},
  {name:'Gate 3 Exit',  time:'4 min', dist:'200m',  crowd:'Medium', dir:'South Stand → Gate 3',  best:false},
  {name:'Gate 1 Exit',  time:'6 min', dist:'260m',  crowd:'High',   dir:'North Stand → Gate 1',  best:false},
];

const LINES = [
  {label:'Stadium Control',  num:'1800-222-0001', icon:'📞', color:'var(--accent)'},
  {label:'Medical / 108',    num:'108',           icon:'🚑', color:'var(--red)'},
  {label:'Police / 100',     num:'100',           icon:'🚔', color:'var(--yellow)'},
  {label:'Fire Brigade/101', num:'101',           icon:'🔥', color:'var(--orange)'},
];

export default function Emergency() {
  const [sosActive, setSosActive] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [sent, setSent] = useState(false);
  const [selType, setSelType] = useState(null);

  const pressSOS = () => { setSosActive(true); setCountdown(5); };

  useEffect(()=>{
    if(!sosActive || sent) return;
    if(countdown<=0){ setSent(true); return; }
    const t = setTimeout(()=>setCountdown(c=>c-1),1000);
    return ()=>clearTimeout(t);
  },[sosActive,countdown,sent]);

  const cancelSOS = () => { setSosActive(false); setSent(false); setCountdown(5); };

  return (
    <div className="page-wrap">
      <style>{`
        .em-hdr{
          padding:16px;background:rgba(255,61,87,.04);
          border-bottom:1px solid rgba(255,61,87,.2);
        }
        .sos-btn{
          width:calc(100% - 32px);margin:16px;padding:22px;
          background:linear-gradient(135deg,#ff1744,#c62828);
          border:none;border-radius:var(--r-xl);
          font-family:var(--font-display);font-size:36px;letter-spacing:.12em;
          color:#fff;cursor:pointer;transition:all .2s;
          box-shadow:0 0 0 0 rgba(255,23,68,.5);
          animation:sosPulse 2s infinite;
        }
        @keyframes sosPulse{
          0%,100%{box-shadow:0 0 0 0 rgba(255,23,68,.5)}
          50%{box-shadow:0 0 0 18px rgba(255,23,68,0)}
        }
        .sos-btn.sent{
          background:linear-gradient(135deg,#00c853,#1b5e20);
          animation:none;
        }
        .sos-btn.counting{
          animation:countPulse .5s infinite;
        }
        @keyframes countPulse{
          0%,100%{transform:scale(1)}50%{transform:scale(1.02)}
        }
        .cancel-btn{
          width:calc(100% - 32px);margin:-8px 16px 16px;
          padding:12px;background:transparent;border:1px solid var(--border2);
          border-radius:var(--r-md);color:var(--text2);cursor:pointer;
          font-size:13px;transition:all .2s;
        }
        .cancel-btn:hover{border-color:var(--red);color:var(--red)}
        .em-type{
          display:flex;align-items:center;gap:12px;
          background:var(--card);border:1px solid var(--border);
          border-radius:var(--r-md);padding:13px;margin:0 16px 8px;
          cursor:pointer;transition:all .2s;
        }
        .em-type.sel{border-color:var(--red);background:rgba(255,61,87,.05)}
        .em-type:hover{transform:translateX(4px)}
        .exit-card{
          background:var(--card);border:1px solid var(--border);
          border-radius:var(--r-md);margin:0 16px 8px;overflow:hidden;
        }
        .exit-card.best{border-color:rgba(0,230,118,.4)}
        .exit-body{padding:13px;display:flex;justify-content:space-between;align-items:center}
        .helpline{
          display:flex;justify-content:space-between;align-items:center;
          background:var(--card);border:1px solid var(--border);
          border-radius:var(--r-md);padding:13px;margin:0 16px 8px;
        }
        .call-btn{
          background:rgba(0,212,255,.1);border:1px solid rgba(0,212,255,.3);
          border-radius:8px;padding:7px 16px;font-size:12px;
          color:var(--accent);cursor:pointer;font-weight:700;transition:all .2s;
        }
        .call-btn:hover{background:var(--accent);color:#000}
        .first-aid{
          display:flex;justify-content:space-between;align-items:center;
          padding:10px 14px;background:var(--card);border:1px solid var(--border);
          border-radius:var(--r-md);margin:0 16px 7px;
        }
        .sec-hdr{
          padding:16px 16px 8px;
          font-size:11px;color:var(--text2);font-family:var(--font-mono);
          letter-spacing:.1em;text-transform:uppercase;
        }
      `}</style>

      <div className="em-hdr">
        <div style={{fontFamily:'var(--font-display)',fontSize:26,color:'var(--red)',letterSpacing:'.05em'}}>🚨 EMERGENCY</div>
        <div style={{fontSize:11,color:'var(--text2)'}}>Tap SOS to instantly alert stadium security</div>
      </div>

      {/* SOS Button */}
      {!sent ? (
        <button
          className={`sos-btn ${sosActive?'counting':''}`}
          onClick={pressSOS}
          style={{display:'block'}}
        >
          {sosActive ? `ALERTING IN ${countdown}...` : '🆘 HOLD FOR SOS'}
        </button>
      ) : (
        <div style={{margin:'16px',background:'var(--card)',border:'2px solid var(--green)',borderRadius:20,padding:20,textAlign:'center'}}>
          <div style={{fontSize:36}}>✅</div>
          <div style={{fontFamily:'var(--font-display)',fontSize:24,color:'var(--green)',marginTop:8}}>HELP IS COMING</div>
          <div style={{fontSize:13,color:'var(--text2)',marginTop:8}}>Security alerted · Medical team dispatched · Your location: East Block, Row 14</div>
          <div style={{marginTop:12,fontFamily:'var(--font-mono)',fontSize:12,color:'var(--accent)'}}>ETA: &lt; 2 minutes</div>
        </div>
      )}
      {sosActive && !sent && (
        <button className="cancel-btn" onClick={cancelSOS}>✕ Cancel SOS</button>
      )}

      {/* Emergency types */}
      <div className="sec-hdr">What's the emergency?</div>
      {TYPES.map(t=>(
        <div key={t.id} className={`em-type ${selType===t.id?'sel':''}`}
          onClick={()=>setSelType(selType===t.id?null:t.id)}
          style={{borderColor:selType===t.id?t.color:'var(--border)'}}>
          <span style={{fontSize:24,flexShrink:0}}>{t.icon}</span>
          <div style={{flex:1}}>
            <div style={{fontWeight:600,fontSize:13}}>{t.label}</div>
            <div style={{fontSize:11,color:'var(--text2)',marginTop:2}}>📍 {t.loc}</div>
          </div>
          <div style={{textAlign:'right',flexShrink:0}}>
            <div style={{fontSize:9,color:t.color,fontWeight:700,letterSpacing:'.06em'}}>RESPONSE</div>
            <div style={{fontSize:12,color:t.color,fontFamily:'var(--font-mono)',fontWeight:700}}>{t.res}</div>
          </div>
        </div>
      ))}

      {/* Evacuation routes */}
      <div className="sec-hdr">Nearest Exits</div>
      {EXITS.map(e=>(
        <div key={e.name} className={`exit-card ${e.best?'best':''}`}>
          {e.best && <div style={{background:'rgba(0,230,118,.12)',padding:'4px 14px',fontSize:10,color:'var(--green)',fontWeight:700,letterSpacing:'.08em'}}>⭐ FASTEST EXIT RIGHT NOW</div>}
          <div className="exit-body">
            <div>
              <div style={{fontWeight:600,fontSize:13}}>{e.name}</div>
              <div style={{fontSize:11,color:'var(--text2)',marginTop:3}}>→ {e.dir}</div>
            </div>
            <div style={{textAlign:'right'}}>
              <div style={{fontFamily:'var(--font-mono)',fontWeight:700,fontSize:16,color:e.crowd==='Low'?'var(--green)':e.crowd==='High'?'var(--red)':'var(--yellow)'}}>{e.time}</div>
              <div style={{fontSize:10,color:'var(--text2)'}}>{e.dist} · {e.crowd} crowd</div>
            </div>
          </div>
        </div>
      ))}

      {/* Helplines */}
      <div className="sec-hdr">Emergency Helplines</div>
      {LINES.map(l=>(
        <div key={l.label} className="helpline">
          <div style={{display:'flex',alignItems:'center',gap:10}}>
            <span style={{fontSize:22}}>{l.icon}</span>
            <div>
              <div style={{fontSize:13,fontWeight:600}}>{l.label}</div>
              <div style={{fontSize:14,color:l.color,fontFamily:'var(--font-mono)',fontWeight:700}}>{l.num}</div>
            </div>
          </div>
          <button className="call-btn" onClick={()=>window.open(`tel:${l.num}`)}>CALL</button>
        </div>
      ))}

      {/* First aid posts */}
      <div className="sec-hdr">First Aid Posts</div>
      {[
        {loc:'Gate 3 — Ground Floor', open:true},
        {loc:'East Block — Section C', open:true},
        {loc:'North Stand — Row 1',   open:true},
      ].map((f,i)=>(
        <div key={i} className="first-aid">
          <div style={{display:'flex',alignItems:'center',gap:10}}>
            <span style={{fontSize:18}}>➕</span>
            <span style={{fontSize:13}}>{f.loc}</span>
          </div>
          <span style={{fontSize:10,color:'var(--green)',fontWeight:700,background:'rgba(0,230,118,.12)',border:'1px solid rgba(0,230,118,.3)',borderRadius:6,padding:'3px 8px'}}>OPEN 24/7</span>
        </div>
      ))}
    </div>
  );
}
