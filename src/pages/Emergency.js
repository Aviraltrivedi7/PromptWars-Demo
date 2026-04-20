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
    <div className="page-wrap" style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <style>{`
        .em-header-premium {
          padding: 24px 20px;
          border-bottom: 1px solid rgba(239, 68, 68, 0.2);
          background: linear-gradient(180deg, rgba(239, 68, 68, 0.1) 0%, transparent 100%);
        }
        .sos-container {
          padding: 32px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .sos-ring-outer {
          position: relative;
          width: 220px;
          height: 220px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .sos-ring {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 2px solid var(--red);
          opacity: 0.3;
          animation: sosPulse 2s infinite;
        }
        .sos-ring:nth-child(2) { animation-delay: 0.5s; }
        .sos-ring:nth-child(3) { animation-delay: 1s; }
        @keyframes sosPulse {
          0% { transform: scale(1); opacity: 0.3; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        .sos-button-premium {
          width: 160px;
          height: 160px;
          background: var(--red);
          border-radius: 50%;
          border: 8px solid rgba(255,255,255,0.1);
          color: white;
          font-family: var(--font-display);
          font-size: 32px;
          font-weight: 800;
          letter-spacing: 0.05em;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 0 50px rgba(239, 68, 68, 0.5);
          transition: 0.3s;
          position: relative;
          z-index: 2;
        }
        .sos-button-premium:active { transform: scale(0.95); }
        .sos-button-premium.active { animation: shake 0.1s infinite; }
        @keyframes shake {
          0% { transform: translate(1px, 1px) rotate(0deg); }
          50% { transform: translate(-1px, -2px) rotate(-1deg); }
          100% { transform: translate(1px, -1px) rotate(1deg); }
        }
        .emergency-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          padding: 0 20px 32px;
        }
        .type-glass {
          background: var(--glass);
          border: 1px solid var(--glass-border);
          border-radius: var(--r-md);
          padding: 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          transition: 0.3s;
        }
        .type-glass.selected {
          border-color: var(--red);
          background: rgba(239, 68, 68, 0.1);
        }
        .exit-pill {
          background: var(--glass);
          border: 1px solid var(--glass-border);
          border-radius: var(--r-md);
          padding: 16px 20px;
          margin: 0 20px 10px;
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .exit-pill.best { border-color: var(--green); background: rgba(34, 197, 94, 0.05); }
      `}</style>

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
