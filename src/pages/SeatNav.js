import React, { useState } from 'react';
import { SEAT_SECTIONS } from '../data/venueData';

export default function SeatNav() {
  const [seatInput, setSeatInput] = useState('');
  const [found, setFound] = useState(null);
  const [notFound, setNotFound] = useState(false);

  const find = () => {
    const s = seatInput.trim().toUpperCase();
    if(!s) return;
    const section = SEAT_SECTIONS.find(sec => {
      const [start,end] = sec.section.split('-');
      const row = start[0];
      const num = parseInt(s.replace(/[^0-9]/g,''));
      const maxNum = parseInt(end.replace(/[^0-9]/g,''));
      return s.startsWith(row) && num>=1 && num<=maxNum;
    });
    if(section) { setFound(section); setNotFound(false); }
    else { setFound(null); setNotFound(true); }
  };

  const POPULAR = ['C-14','D-27','E-8','B-15','A-20'];

  return (
    <div className="page-wrap" style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <style>{`
        .sn-header-premium {
          padding: 24px 20px;
          border-bottom: 1px solid var(--glass-border);
        }
        .search-container {
          padding: 32px 20px;
          background: linear-gradient(180deg, rgba(34, 211, 238, 0.05) 0%, transparent 100%);
        }
        .premium-input-box {
          position: relative;
          background: var(--glass);
          border: 1px solid var(--glass-border);
          border-radius: 20px;
          padding: 24px;
          text-align: center;
        }
        .seat-inp-large {
          background: transparent;
          border: none;
          width: 100%;
          font-family: var(--font-display);
          font-size: 48px;
          color: white;
          text-align: center;
          outline: none;
          letter-spacing: 0.1em;
          margin-bottom: 16px;
        }
        .seat-inp-large::placeholder { opacity: 0.2; }
        .find-btn-premium {
          width: 100%;
          padding: 18px;
          background: white;
          color: black;
          border-radius: 16px;
          font-family: var(--font-display);
          font-size: 20px;
          font-weight: 800;
          letter-spacing: 0.1em;
          border: none;
          box-shadow: 0 10px 30px rgba(255,255,255,0.2);
          transition: 0.3s;
        }
        .find-btn-premium:active { transform: scale(0.98); }
        .result-glass-card {
          margin: 0 20px 24px;
          background: var(--glass);
          border: 1px solid var(--accent);
          border-radius: var(--r-xl);
          padding: 24px;
          animation: slideUp 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          box-shadow: 0 10px 40px var(--accent-glow);
        }
        .nav-step {
          display: flex;
          gap: 16px;
          margin-top: 20px;
          padding: 16px;
          background: rgba(255,255,255,0.03);
          border-radius: 16px;
          border: 1px solid var(--glass-border);
        }
        .step-icon {
          width: 32px;
          height: 32px;
          background: var(--accent);
          border-radius: 50%;
          color: black;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          flex-shrink: 0;
        }
        .seat-pill-glass {
          background: var(--glass);
          border: 1px solid var(--glass-border);
          padding: 8px 16px;
          border-radius: 100px;
          font-size: 13px;
          font-family: var(--font-mono);
          color: var(--text-muted);
        }
        .exit-pill {
          display: flex;
          align-items: center;
          gap: 16px;
          background: var(--glass);
          border: 1px solid var(--glass-border);
          padding: 12px 16px;
          margin: 0 20px 12px;
          border-radius: 16px;
        }
      `}</style>

        <div style={{fontSize:11,color:'var(--text2)',fontFamily:'var(--font-mono)',letterSpacing:'.1em',textTransform:'uppercase',marginBottom:8}}>Your Seat Number</div>
        <input className="sn-inp" placeholder="e.g. C-14" value={seatInput}
          onChange={e=>setSeatInput(e.target.value)}
          onKeyDown={e=>e.key==='Enter'&&find()}
        />
        <button className="find-btn" onClick={find}>FIND MY SEAT →</button>
      </div>

      {found && (
        <div className="result-card">
          <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:16}}>
            <div style={{width:48,height:48,borderRadius:14,background:found.color+'33',border:`2px solid ${found.color}`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:22}}>🪑</div>
            <div>
              <div style={{fontFamily:'var(--font-display)',fontSize:22,letterSpacing:'.05em'}}>SEAT {seatInput.toUpperCase()}</div>
              <div style={{fontSize:12,color:'var(--text2)'}}>{found.zone}</div>
            </div>
          </div>

          {[
            {l:'Section',v:found.section},
            {l:'Zone',v:found.zone},
            {l:'Enter via Gate',v:found.gate},
            {l:'Row',v:found.row},
          ].map(r=>(
            <div key={r.l} className="info-row">
              <span className="info-lbl">{r.l}</span>
              <span className="info-val" style={{color:'var(--accent)'}}>{r.v}</span>
            </div>
          ))}

          <div style={{marginTop:16,background:'rgba(0,230,118,.08)',border:'1px solid rgba(0,230,118,.3)',borderRadius:10,padding:'10px 14px'}}>
            <div style={{fontSize:12,color:'var(--green)',fontWeight:700,marginBottom:4}}>📍 Directions</div>
            <div style={{fontSize:13,color:'var(--text)',lineHeight:1.6}}>
              Enter via Gate {found.gate} → Follow signs to {found.section} → Look for Row {found.row} marker → Your seat {seatInput.toUpperCase()}
            </div>
          </div>

          <div style={{marginTop:12,display:'flex',gap:10}}>
            <div style={{flex:1,background:'var(--bg3)',borderRadius:10,padding:10,textAlign:'center'}}>
              <div style={{fontFamily:'var(--font-mono)',fontSize:18,fontWeight:700,color:'var(--accent)'}}>~5m</div>
              <div style={{fontSize:9,color:'var(--text2)',marginTop:2,textTransform:'uppercase',letterSpacing:'.06em'}}>Walk from Gate</div>
            </div>
            <div style={{flex:1,background:'var(--bg3)',borderRadius:10,padding:10,textAlign:'center'}}>
              <div style={{fontFamily:'var(--font-mono)',fontSize:18,fontWeight:700,color:'var(--green)'}}>OPEN</div>
              <div style={{fontSize:9,color:'var(--text2)',marginTop:2,textTransform:'uppercase',letterSpacing:'.06em'}}>Gate Status</div>
            </div>
          </div>
        </div>
      )}

      {notFound && (
        <div style={{margin:16,background:'rgba(255,61,87,.08)',border:'1px solid rgba(255,61,87,.3)',borderRadius:16,padding:16}}>
          <div style={{fontSize:14,fontWeight:700,color:'var(--red)',marginBottom:4}}>Seat not found</div>
          <div style={{fontSize:12,color:'var(--text2)'}}>Try format like "C-14", "D-27", "E-8", "A-20"</div>
        </div>
      )}

      {/* Quick examples */}
      <div style={{padding:'14px 16px 6px',fontSize:11,color:'var(--text2)',fontFamily:'var(--font-mono)',letterSpacing:'.1em',textTransform:'uppercase'}}>
        Try These
      </div>
      <div className="pill-row">
        {POPULAR.map(s=>(
          <button key={s} className="seat-pill" onClick={()=>{setSeatInput(s);setNotFound(false);setFound(null)}}>
            {s}
          </button>
        ))}
      </div>

      {/* Section guide */}
      <div style={{padding:'14px 16px 6px',fontSize:11,color:'var(--text2)',fontFamily:'var(--font-mono)',letterSpacing:'.1em',textTransform:'uppercase'}}>
        Section Guide
      </div>
      <div className="section-list">
        {SEAT_SECTIONS.map(s=>(
          <div key={s.section} className="section-row">
            <div className="sec-color" style={{background:s.color}}/>
            <div style={{flex:1}}>
              <div style={{fontFamily:'var(--font-mono)',fontWeight:700,fontSize:13}}>{s.section}</div>
              <div style={{fontSize:11,color:'var(--text2)',marginTop:2}}>{s.zone}</div>
            </div>
            <div style={{textAlign:'right'}}>
              <div style={{fontSize:12,color:'var(--accent)',fontFamily:'var(--font-mono)'}}>Gate {s.gate}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
