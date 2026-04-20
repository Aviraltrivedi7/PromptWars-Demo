import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { VENUE } from '../data/venueData';

const VENUES = ['Wankhede Stadium','Eden Gardens','Narendra Modi Stadium','M. Chinnaswamy'];

export default function Splash() {
  const nav = useNavigate();
  const [vIdx, setVIdx] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const t = setInterval(() => setVIdx(i => (i+1)%VENUES.length), 2200);
    return () => clearInterval(t);
  }, []);

  const pct = Math.round((VENUE.currentAttendees / VENUE.capacity) * 100);

  return (
    <div style={{
      minHeight:'100vh', background:'var(--bg)',
      display:'flex', flexDirection:'column', alignItems:'center',
      justifyContent:'center', padding:'24px', position:'relative', overflow:'hidden',
    }}>
      <style>{`
        .splash-grid{
          position:absolute;inset:0;
          background-image:linear-gradient(var(--border) 1px,transparent 1px),
            linear-gradient(90deg,var(--border) 1px,transparent 1px);
          background-size:48px 48px;opacity:.35;
        }
        .splash-orb1{
          position:absolute;width:560px;height:560px;border-radius:50%;
          background:radial-gradient(circle,rgba(0,212,255,.13) 0%,transparent 70%);
          top:-180px;left:-180px;pointer-events:none;
        }
        .splash-orb2{
          position:absolute;width:420px;height:420px;border-radius:50%;
          background:radial-gradient(circle,rgba(162,89,255,.10) 0%,transparent 70%);
          bottom:-120px;right:-120px;pointer-events:none;
        }
        .splash-orb3{
          position:absolute;width:300px;height:300px;border-radius:50%;
          background:radial-gradient(circle,rgba(255,107,53,.08) 0%,transparent 70%);
          bottom:100px;left:-80px;pointer-events:none;
        }
        .splash-in{
          opacity:0;transform:translateY(32px);
          transition:opacity .9s ease,transform .9s ease;
          position:relative;z-index:1;text-align:center;width:100%;max-width:420px;
        }
        .splash-in.show{opacity:1;transform:translateY(0)}
        .live-pill{
          display:inline-flex;align-items:center;gap:8px;
          background:rgba(0,212,255,.08);border:1px solid rgba(0,212,255,.25);
          border-radius:100px;padding:7px 18px;margin-bottom:28px;
          font-size:11px;letter-spacing:.12em;color:var(--accent);
          font-family:var(--font-mono);
        }
        .live-dot{width:6px;height:6px;border-radius:50%;background:var(--accent);animation:ldot 1.4s infinite}
        @keyframes ldot{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.3;transform:scale(.7)}}
        .splash-title{
          font-family:var(--font-display);
          font-size:clamp(78px,22vw,130px);
          line-height:.88;letter-spacing:.02em;
          background:linear-gradient(140deg,#fff 20%,var(--accent) 80%);
          -webkit-background-clip:text;-webkit-text-fill-color:transparent;
          margin-bottom:6px;
        }
        .splash-sub{
          font-family:var(--font-display);
          font-size:clamp(16px,4.5vw,24px);
          color:var(--accent2);letter-spacing:.24em;margin-bottom:28px;
        }
        .splash-desc{font-size:14px;color:var(--text2);line-height:1.7;margin-bottom:40px}
        .venue-ticker{
          display:inline-block;
          font-family:var(--font-mono);font-size:12px;color:var(--accent);
          transition:opacity .4s;
        }
        .stats-row{
          display:flex;gap:10px;margin-bottom:36px;justify-content:center;
        }
        .stat-pill{
          background:var(--card);border:1px solid var(--border2);
          border-radius:12px;padding:10px 16px;text-align:center;
          min-width:90px;
        }
        .stat-num{font-family:var(--font-mono);font-size:18px;font-weight:700;color:var(--accent)}
        .stat-lbl{font-size:9px;color:var(--text2);letter-spacing:.08em;text-transform:uppercase;margin-top:2px}
        .btn-enter{
          width:100%;padding:18px;
          background:linear-gradient(135deg,var(--accent),#0099cc);
          border:none;border-radius:16px;
          font-family:var(--font-display);font-size:26px;letter-spacing:.12em;
          color:#000;cursor:pointer;
          transition:transform .2s,box-shadow .2s;
          box-shadow:0 0 0 0 rgba(0,212,255,.4);
          margin-bottom:12px;
        }
        .btn-enter:hover{transform:scale(1.02);box-shadow:0 0 32px rgba(0,212,255,.35)}
        .btn-ai{
          width:100%;padding:14px;
          background:transparent;border:1px solid var(--border2);
          border-radius:16px;color:var(--text2);cursor:pointer;
          font-size:14px;transition:all .2s;
        }
        .btn-ai:hover{border-color:var(--accent3);color:var(--accent3)}
        .feat-row{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-top:36px}
        .feat-chip{
          background:var(--card);border:1px solid var(--border);
          border-radius:20px;padding:7px 14px;
          font-size:12px;color:var(--text2);display:flex;align-items:center;gap:6px;
        }
        .powered{margin-top:24px;font-family:var(--font-mono);font-size:10px;color:var(--text3);letter-spacing:.08em}
      `}</style>
      <div className="splash-grid"/>
      <div className="splash-orb1"/><div className="splash-orb2"/><div className="splash-orb3"/>

      <div className={`splash-in ${mounted?'show':''}`}>
        <div className="live-pill">
          <div className="live-dot"/>
          NOW AT <span className="venue-ticker">{VENUES[vIdx].toUpperCase()}</span>
        </div>

        <div className="splash-title">STADIUM<br/>SENSE</div>
        <div className="splash-sub">POWERED BY GEMINI AI</div>
        <p className="splash-desc">
          Real-time crowd intelligence · Zero-wait navigation<br/>
          AI-powered assistance for every moment at the venue
        </p>

        <div className="stats-row">
          <div className="stat-pill">
            <div className="stat-num">{VENUE.currentAttendees.toLocaleString()}</div>
            <div className="stat-lbl">Live Now</div>
          </div>
          <div className="stat-pill">
            <div className="stat-num" style={{color:'var(--yellow)'}}>{pct}%</div>
            <div className="stat-lbl">Capacity</div>
          </div>
          <div className="stat-pill">
            <div className="stat-num" style={{color:'var(--green)'}}>2m</div>
            <div className="stat-lbl">Avg Wait</div>
          </div>
        </div>

        <button className="btn-enter" onClick={() => nav('/dashboard')}>
          ENTER STADIUM →
        </button>
        <button className="btn-ai" onClick={() => nav('/ai')}>
          🧠 Ask AI Assistant
        </button>

        <div className="feat-row">
          {['🗺️ Live Crowd Map','⏱️ Wait Predictor','🍔 Seat Ordering','🧠 Gemini AI','🚨 SOS System','🪑 Seat Navigator'].map(f=>(
            <div key={f} className="feat-chip">{f}</div>
          ))}
        </div>

        <div className="powered">BUILT ON GOOGLE GEMINI · MAPS · FIREBASE · CLOUD</div>
      </div>
    </div>
  );
}
