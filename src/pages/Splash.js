import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const VENUES = ['Wankhede Stadium','Eden Gardens','Narendra Modi Stadium','M. Chinnaswamy'];

export default function Splash() {
  const nav = useNavigate();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div style={{
      minHeight:'100vh', 
      background:'var(--bg)',
      display:'flex', 
      flexDirection:'column', 
      alignItems:'center',
      justifyContent:'center', 
      padding:'24px', 
      position:'relative', 
      overflow:'hidden',
    }}>
      <style>{`
        .splash-bg {
          position: absolute;
          inset: 0;
          background: url('/stadium-bg.png') center/cover no-repeat;
          filter: brightness(0.4) saturate(1.2);
          transform: scale(1.1);
          animation: zoomOut 20s infinite alternate;
        }
        @keyframes zoomOut {
          from { transform: scale(1.1); }
          to { transform: scale(1.0); }
        }
        .splash-overlay {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, transparent 0%, var(--bg) 90%);
        }
        .splash-content {
          position: relative;
          z-index: 10;
          text-align: center;
          opacity: 0;
          transform: translateY(20px);
          transition: all 1.2s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .splash-content.show {
          opacity: 1;
          transform: translateY(0);
        }
        .premium-tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(34, 211, 238, 0.1);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(34, 211, 238, 0.3);
          border-radius: 100px;
          padding: 8px 20px;
          margin-bottom: 32px;
          font-size: 11px;
          letter-spacing: 0.2em;
          color: var(--accent);
          font-family: var(--font-mono);
          text-transform: uppercase;
        }
        .main-title {
          font-family: var(--font-display);
          font-size: clamp(64px, 18vw, 110px);
          line-height: 0.85;
          letter-spacing: -0.02em;
          margin-bottom: 20px;
          text-shadow: 0 0 30px rgba(34, 211, 238, 0.3);
        }
        .main-title span {
          display: block;
        }
        .desc-text {
          font-size: 16px;
          color: var(--text-muted);
          max-width: 320px;
          margin: 0 auto 48px;
          line-height: 1.6;
        }
        .btn-premium {
          width: 100%;
          max-width: 320px;
          padding: 20px;
          background: white;
          color: black;
          border: none;
          border-radius: 20px;
          font-family: var(--font-display);
          font-size: 24px;
          letter-spacing: 0.05em;
          box-shadow: 0 10px 30px rgba(255,255,255,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
        }
        .btn-premium:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 15px 40px rgba(255,255,255,0.3);
        }
        .btn-secondary {
          margin-top: 16px;
          background: transparent;
          color: var(--text-muted);
          border: 1px solid var(--glass-border);
          padding: 14px 40px;
          border-radius: 20px;
          font-size: 14px;
          backdrop-filter: blur(8px);
        }
        .feat-chips {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 8px;
          margin-top: 56px;
        }
        .f-chip {
          background: var(--glass);
          border: 1px solid var(--glass-border);
          padding: 8px 16px;
          border-radius: 100px;
          font-size: 12px;
          color: var(--text-dim);
        }
      `}</style>
      
      <div className="splash-bg" />
      <div className="splash-overlay" />

      <div className={`splash-content ${mounted ? 'show' : ''}`}>
        <div className="premium-tag">
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 10px var(--accent)' }} />
          Official Match Experience
        </div>

        <h1 className="main-title">
          <span className="text-gradient">STADIUM</span>
          <span style={{ color: 'white' }}>SENSE</span>
        </h1>

        <p className="desc-text">
          Experience the game like never before with real-time AI intelligence.
        </p>

        <button className="btn-premium" onClick={() => nav('/dashboard')}>
           GO LIVE NOW <span style={{ fontSize: 28 }}>→</span>
        </button>
        
        <button className="btn-secondary" onClick={() => nav('/ai')}>
          🧠 ASK ASSISTANT
        </button>

        <div className="feat-chips">
          {['Crowd Flow','Seat Nav','Pre-orders','AI Help'].map(f => (
            <div key={f} className="f-chip">{f}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
