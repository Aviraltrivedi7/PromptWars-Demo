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

  const POPULAR = ['C-14','D-27','E-8','B-15','A-20','F-5'];

  return (
    <div className="page-wrap">
      <style>{`
        .sn-hdr{padding:16px;border-bottom:1px solid var(--border)}
        .sn-form{padding:16px;background:var(--bg2);border-bottom:1px solid var(--border)}
        .sn-inp{
          background:var(--card);border:1px solid var(--border2);
          border-radius:var(--r-md);padding:14px;color:var(--text);
          font-size:18px;font-family:var(--font-mono);width:100%;outline:none;
          text-transform:uppercase;letter-spacing:.1em;text-align:center;
          transition:border-color .2s;
        }
        .sn-inp:focus{border-color:var(--accent)}
        .find-btn{
          width:100%;padding:15px;background:var(--accent);border:none;
          border-radius:var(--r-md);color:#000;font-family:var(--font-display);
          font-size:20px;letter-spacing:.1em;cursor:pointer;margin-top:12px;
          transition:opacity .2s;
        }
        .find-btn:hover{opacity:.88}
        .result-card{
          margin:16px;background:var(--card);border:2px solid var(--accent);
          border-radius:var(--r-xl);padding:20px;animation:fadeUp .3s ease;
        }
        @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        .info-row{display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid var(--border)}
        .info-lbl{font-size:12px;color:var(--text2)}
        .info-val{font-size:13px;font-weight:600;fontFamily:var(--font-mono)}
        .pill-row{display:flex;flex-wrap:wrap;gap:8px;padding:14px 16px}
        .seat-pill{
          background:var(--card);border:1px solid var(--border);
          border-radius:8px;padding:7px 14px;font-size:13px;font-family:var(--font-mono);
          cursor:pointer;transition:all .2s;color:var(--text2);
        }
        .seat-pill:hover{border-color:var(--accent);color:var(--accent)}
        .section-list{padding:14px 16px}
        .section-row{
          display:flex;align-items:center;gap:12px;
          background:var(--card);border:1px solid var(--border);
          border-radius:var(--r-md);padding:13px;margin-bottom:8px;
        }
        .sec-color{width:12px;height:40px;border-radius:3px;flex-shrink:0}
      `}</style>

      <div className="sn-hdr">
        <div style={{fontFamily:'var(--font-display)',fontSize:26,letterSpacing:'.05em'}}>FIND MY SEAT 🪑</div>
        <div style={{fontSize:11,color:'var(--text2)'}}>Enter seat number for directions</div>
      </div>

      <div className="sn-form">
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
