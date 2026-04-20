import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const TABS = [
  { path: '/dashboard', icon: '⚡', label: 'Home'    },
  { path: '/crowd',     icon: '🗺️', label: 'Map'     },
  { path: '/ai',        icon: '🧠', label: 'AI'      },
  { path: '/food',      icon: '🍔', label: 'Order'   },
  { path: '/waits',     icon: '⏱️', label: 'Waits'   },
  { path: '/emergency', icon: '🚨', label: 'SOS'     },
];

export default function BottomNav() {
  const nav = useNavigate();
  const loc = useLocation();
  
  return (
    <>
      <style>{`
        .bnav-container {
          position: fixed;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          width: 90%;
          max-width: 440px;
          z-index: 1000;
        }
        
        .bnav {
          background: var(--glass);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid var(--glass-border);
          border-radius: 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 12px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.4);
        }
        
        .bnav-tab {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 4px;
          cursor: pointer;
          padding: 10px 0;
          border: none;
          background: none;
          border-radius: 16px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          color: var(--text-dim);
          position: relative;
        }
        
        .bnav-tab .ico {
          font-size: 20px;
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        .bnav-tab .lbl {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }
        
        .bnav-tab.active {
          color: var(--accent);
          background: rgba(34, 211, 238, 0.1);
        }
        
        .bnav-tab.active .ico {
          transform: translateY(-4px) scale(1.1);
          filter: drop-shadow(0 0 8px var(--accent-glow));
        }
        
        .bnav-tab.sos {
          color: var(--red);
        }
        
        .bnav-tab.sos.active {
          background: rgba(248, 113, 113, 0.1);
        }

        .ai-glow {
          position: absolute;
          inset: 0;
          border-radius: 16px;
          box-shadow: 0 0 15px var(--accent-glow);
          opacity: 0;
          transition: opacity 0.3s;
          pointer-events: none;
        }
        
        .bnav-tab.active .ai-glow {
          opacity: 0.5;
        }

        .page-wrap {
          padding-bottom: 120px;
        }
      `}</style>
      <div className="bnav-container">
        <nav className="bnav">
          {TABS.map(t => {
            const active = loc.pathname === t.path;
            const isSOS  = t.path === '/emergency';
            const isAI   = t.path === '/ai';
            return (
              <button key={t.path}
                className={`bnav-tab ${active?'active':''} ${isSOS?'sos':''}`}
                onClick={() => nav(t.path)}
              >
                {isAI && active && <div className="ai-glow"/>}
                <span className="ico">{t.icon}</span>
                <span className="lbl">{t.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </>
  );
}

