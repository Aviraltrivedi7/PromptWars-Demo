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
        .bnav{
          position:fixed;bottom:0;left:50%;transform:translateX(-50%);
          width:100%;max-width:480px;z-index:999;
          background:rgba(6,10,18,0.97);
          border-top:1px solid var(--border2);
          backdrop-filter:blur(24px);
          display:flex;justify-content:space-around;align-items:stretch;
          padding:6px 0 max(10px,env(safe-area-inset-bottom));
        }
        .bnav-tab{
          flex:1;display:flex;flex-direction:column;align-items:center;
          justify-content:center;gap:3px;cursor:pointer;
          padding:6px 2px;border:none;background:none;
          border-radius:10px;transition:all .2s;position:relative;
          -webkit-tap-highlight-color:transparent;
        }
        .bnav-tab .ico{font-size:20px;line-height:1;transition:transform .2s}
        .bnav-tab .lbl{font-size:9px;font-weight:600;letter-spacing:.06em;color:var(--text3);transition:color .2s;text-transform:uppercase}
        .bnav-tab.active .lbl{color:var(--accent)}
        .bnav-tab.active .ico{transform:scale(1.18)}
        .bnav-tab.sos .lbl{color:var(--red)!important}
        .bnav-tab.sos.active{background:rgba(255,61,87,.12)!important;border-radius:12px}
        .bnav-tab.active{background:rgba(0,212,255,.08);border-radius:12px}
        .bnav-pip{
          position:absolute;top:4px;right:calc(50% - 14px);
          width:7px;height:7px;border-radius:50%;background:var(--red);
          border:2px solid var(--bg);animation:pipPulse 2s infinite;
        }
        @keyframes pipPulse{0%,100%{opacity:1}50%{opacity:.3}}
        .page-wrap{padding-bottom:80px}
      `}</style>
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
              {isAI && <div className="bnav-pip"/>}
              <span className="ico">{t.icon}</span>
              <span className="lbl">{t.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
}
