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
    <div className="page-wrap">
      <style>{`
        .nav-hdr{padding:16px;border-bottom:1px solid var(--border)}
        .nav-form{padding:14px 16px;background:var(--bg2);border-bottom:1px solid var(--border)}
        .nav-inp{
          background:var(--card);border:1px solid var(--border2);
          border-radius:var(--r-md);padding:12px 14px;color:var(--text);
          font-size:13px;width:100%;outline:none;
          transition:border-color .2s;
        }
        .nav-inp:focus{border-color:var(--accent)}
        .nav-select{
          background:var(--card);border:1px solid var(--border2);
          border-radius:var(--r-md);padding:12px 14px;color:var(--text);
          font-size:13px;width:100%;outline:none;cursor:pointer;
          appearance:none;
        }
        .nav-select:focus{border-color:var(--accent)}
        .nav-btn{
          width:100%;padding:15px;background:var(--accent);border:none;
          border-radius:var(--r-md);color:#000;font-size:14px;font-weight:700;
          cursor:pointer;margin-top:12px;transition:opacity .2s;
          font-family:var(--font-display);letter-spacing:.08em;font-size:18px;
        }
        .nav-btn:hover{opacity:.88}
        .nav-btn:disabled{opacity:.4;cursor:not-allowed}
        .dest-grid{display:grid;grid-template-columns:1fr 1fr;gap:9px;padding:14px 16px}
        .dest-card{
          background:var(--card);border:1px solid var(--border);
          border-radius:var(--r-md);padding:13px;cursor:pointer;transition:all .2s;
        }
        .dest-card:hover,.dest-card.sel{border-color:var(--accent);background:rgba(0,212,255,.05)}
        .active-nav{
          margin:14px 16px;background:linear-gradient(135deg,var(--card),#162035);
          border:2px solid var(--accent);border-radius:var(--r-xl);padding:20px;
        }
        .step-indicator{
          display:flex;gap:5px;margin-bottom:16px;
        }
        .step-dot{
          height:4px;flex:1;border-radius:2px;background:var(--border);transition:background .4s;
        }
        .step-dot.done{background:var(--accent)}
        .step-box{
          background:var(--bg3);border-radius:var(--r-md);padding:14px;margin-bottom:14px;
        }
        .step-num{
          width:28px;height:28px;border-radius:50%;background:var(--accent);
          display:flex;align-items:center;justify-content:center;
          font-weight:700;font-size:13px;color:#000;flex-shrink:0;
        }
        .step-btn{
          flex:1;padding:13px;border:none;border-radius:var(--r-md);
          font-size:14px;font-weight:600;cursor:pointer;transition:all .2s;
        }
      `}</style>

      <div className="nav-hdr">
        <div style={{fontFamily:'var(--font-display)',fontSize:26,letterSpacing:'.05em'}}>INDOOR NAV 🗺️</div>
        <div style={{fontSize:11,color:'var(--text2)'}}>Turn-by-turn venue navigation</div>
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
