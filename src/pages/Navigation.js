import React, { useState } from 'react';
import { ZONES } from '../data/venueData';

const DESTINATIONS = [
  {id:'fc2', icon:'🍔', name:'Food Court 2',  eta:'3 min', steps:['Head to East Block','Turn right at Gate 5 entrance','Food Court 2 is on your left'], dist:'120m'},
  {id:'wc',  icon:'🚻', name:'Block C Washroom',eta:'1 min',steps:['Walk towards East Block','Look for restroom signs at Row 3','Block C Washroom is on right side'], dist:'60m'},
  {id:'g5',  icon:'🚪', name:'Gate 5 Exit',   eta:'4 min', steps:['Walk towards East Block','Follow Exit signs','Gate 5 is at the far east end'], dist:'180m'},
  {id:'med', icon:'🏥', name:'Medical Aid',   eta:'5 min', steps:['Exit your section','Head towards Gate 3','Medical centre is at Ground Floor'], dist:'220m'},
  {id:'atm', icon:'🏧', name:'ATM (Gate 5)',  eta:'3 min', steps:['Head to East Block','ATM is right next to Gate 5 entrance'], dist:'130m'},
  {id:'lf',  icon:'🔍', name:'Lost & Found',  eta:'8 min', steps:['Head towards Gate 1','Lost & Found desk is at the main entrance','Look for the Help Desk sign'], dist:'310m'},
  {id:'p2',  icon:'🚗', name:'Parking P2',    eta:'12 min',steps:['Exit via Gate 5','Turn left on main road','Parking P2 is 8 min walk from Gate 5'], dist:'450m'},
  {id:'shop',icon:'🛍️', name:'Official Store',eta:'9 min', steps:['Head towards Gate 1','Store is on Level 1 inside the Gate 1 complex'], dist:'350m'},
];

export default function Navigation() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [active, setActive] = useState(null);
  const [step, setStep] = useState(0);

  const dest = DESTINATIONS.find(d=>d.id===to);

  const startNav = () => {
    if(to) { setActive(dest); setStep(0); }
  };

  return (
    <div className="page-wrap" style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <style>{`
        .nav-header-premium {
          padding: 24px 20px;
          border-bottom: 1px solid var(--glass-border);
        }
        .nav-setup-box {
          padding: 24px 20px;
          background: linear-gradient(180deg, rgba(34, 211, 238, 0.05) 0%, transparent 100%);
        }
        .premium-select-box {
          background: var(--glass);
          border: 1px solid var(--glass-border);
          border-radius: 16px;
          padding: 16px;
          margin-bottom: 12px;
        }
        .nav-select-large {
          background: transparent;
          border: none;
          width: 100%;
          color: white;
          font-family: var(--font-display);
          font-size: 18px;
          outline: none;
        }
        .nav-select-large option { background: #0a0f1e; color: white; }
        .active-nav-pane {
          margin: 20px;
          background: var(--glass);
          border: 1px solid var(--accent);
          border-radius: var(--r-xl);
          padding: 24px;
          box-shadow: 0 10px 40px var(--accent-glow);
          animation: slideUp 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .step-progress-bar {
          display: flex;
          height: 4px;
          background: rgba(255,255,255,0.05);
          border-radius: 100px;
          overflow: hidden;
          margin-bottom: 24px;
        }
        .progress-segment {
          flex: 1;
          height: 100%;
          border-right: 1px solid rgba(0,0,0,0.5);
          transition: background 0.4s;
        }
        .progress-segment.active { background: var(--accent); }
        .current-instruction-box {
          background: rgba(255,255,255,0.03);
          border-radius: 20px;
          padding: 20px;
          border: 1px solid var(--glass-border);
          margin-bottom: 24px;
        }
        .step-badge {
          display: inline-flex;
          padding: 4px 12px;
          background: var(--accent);
          color: black;
          border-radius: 100px;
          font-size: 10px;
          font-weight: 800;
          font-family: var(--font-mono);
          text-transform: uppercase;
          margin-bottom: 12px;
        }
        .dest-card-premium {
          background: var(--glass);
          border: 1px solid var(--glass-border);
          border-radius: var(--r-md);
          padding: 16px;
          transition: 0.3s;
        }
        .dest-card-premium.selected {
          border-color: var(--accent);
          background: rgba(34, 211, 238, 0.15);
        }
        .find-btn-premium {
          width: 100%;
          padding: 16px;
          border: none;
          border-radius: 16px;
          font-weight: 800;
          font-family: var(--font-display);
          cursor: pointer;
        }
      `}</style>

      <div className="nav-header-premium">
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, letterSpacing: '0.05em', color: 'white' }}>INDOOR NAV</h2>
        <div style={{ fontSize: 11, color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>LIVE SPATIAL TRACKING ACTIVE</div>
      </div>

      {/* Active navigation */}
      {active ? (
        <div style={{padding:16}}>
          <div className="active-nav">
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
              <div>
                <div style={{fontFamily:'var(--font-display)',fontSize:22,color:'var(--accent)',letterSpacing:'.05em'}}>
                  {active.icon} {active.name}
                </div>
                <div style={{fontSize:12,color:'var(--text2)',marginTop:2}}>{active.dist} · {active.eta} walk</div>
              </div>
              <button onClick={()=>setActive(null)}
                style={{background:'rgba(255,61,87,.15)',border:'1px solid rgba(255,61,87,.3)',borderRadius:8,padding:'6px 12px',color:'var(--red)',cursor:'pointer',fontSize:12}}>
                STOP
              </button>
            </div>

            {/* Step progress */}
            <div className="step-indicator">
              {active.steps.map((_,i)=>(
                <div key={i} className={`step-dot ${i<=step?'done':''}`}/>
              ))}
            </div>

            {/* Current step */}
            <div className="step-box">
              <div style={{display:'flex',alignItems:'flex-start',gap:12}}>
                <div className="step-num">{step+1}</div>
                <div>
                  <div style={{fontSize:11,color:'var(--text3)',letterSpacing:'.08em',fontFamily:'var(--font-mono)',marginBottom:4}}>
                    STEP {step+1} OF {active.steps.length}
                  </div>
                  <div style={{fontSize:16,fontWeight:600,lineHeight:1.45}}>{active.steps[step]}</div>
                </div>
              </div>
            </div>

            {/* Navigation controls */}
            <div style={{display:'flex',gap:10}}>
              {step>0 && (
                <button className="step-btn"
                  style={{background:'var(--bg3)',border:'1px solid var(--border)',color:'var(--text2)'}}
                  onClick={()=>setStep(s=>s-1)}>
                  ← Back
                </button>
              )}
              {step < active.steps.length-1 ? (
                <button className="step-btn"
                  style={{background:'var(--accent)',color:'#000'}}
                  onClick={()=>setStep(s=>s+1)}>
                  Next Step →
                </button>
              ) : (
                <button className="step-btn"
                  style={{background:'var(--green)',color:'#000'}}
                  onClick={()=>setActive(null)}>
                  ✅ Arrived!
                </button>
              )}
            </div>
          </div>

          {/* Mini map placeholder */}
          <div style={{margin:'14px 0',background:'var(--card)',border:'1px solid var(--border)',borderRadius:var(--r-lg)||20,padding:16,textAlign:'center'}}>
            <div style={{fontSize:13,color:'var(--text2)',marginBottom:8}}>📍 Live Map</div>
            <div style={{
              width:'100%',height:160,background:'var(--bg3)',borderRadius:12,
              display:'flex',alignItems:'center',justifyContent:'center',
              flexDirection:'column',gap:8,
              backgroundImage:'linear-gradient(var(--border) 1px,transparent 1px),linear-gradient(90deg,var(--border) 1px,transparent 1px)',
              backgroundSize:'30px 30px',
            }}>
              <div style={{fontSize:28}}>🏟️</div>
              <div style={{fontSize:11,color:'var(--text3)',fontFamily:'var(--font-mono)'}}>Google Maps Indoor Navigation</div>
              <div style={{fontSize:10,color:'var(--text3)'}}>Integrated with Google Maps Platform</div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Route setup */}
          <div className="nav-form">
            <div style={{marginBottom:10}}>
              <div style={{fontSize:11,color:'var(--text2)',marginBottom:6,fontFamily:'var(--font-mono)',letterSpacing:'.08em',textTransform:'uppercase'}}>From (Your seat)</div>
              <input className="nav-inp" placeholder="e.g. Seat C-14, Gate 5 area..." value={from} onChange={e=>setFrom(e.target.value)}/>
            </div>
            <div>
              <div style={{fontSize:11,color:'var(--text2)',marginBottom:6,fontFamily:'var(--font-mono)',letterSpacing:'.08em',textTransform:'uppercase'}}>Destination</div>
              <select className="nav-select" value={to} onChange={e=>setTo(e.target.value)}>
                <option value="">— Select destination —</option>
                {DESTINATIONS.map(d=>(
                  <option key={d.id} value={d.id}>{d.icon} {d.name} ({d.eta})</option>
                ))}
              </select>
            </div>
            <button className="nav-btn" disabled={!to} onClick={startNav}>
              START NAVIGATION →
            </button>
          </div>

          {/* Quick destinations */}
          <div style={{padding:'14px 16px 6px',fontSize:11,color:'var(--text2)',fontFamily:'var(--font-mono)',letterSpacing:'.1em',textTransform:'uppercase'}}>
            Popular Destinations
          </div>
          <div className="dest-grid">
            {DESTINATIONS.map(d=>(
              <div key={d.id} className={`dest-card ${to===d.id?'sel':''}`} onClick={()=>setTo(d.id)}>
                <div style={{fontSize:22,marginBottom:6}}>{d.icon}</div>
                <div style={{fontSize:12,fontWeight:600,marginBottom:3}}>{d.name}</div>
                <div style={{fontSize:11,color:'var(--accent)',fontFamily:'var(--font-mono)'}}>{d.eta}</div>
                <div style={{fontSize:10,color:'var(--text3)'}}>{d.dist}</div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
