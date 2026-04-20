import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AreaChart, Area, ResponsiveContainer, XAxis, Tooltip } from 'recharts';
import { VENUE, ZONES, CROWD_HISTORY } from '../data/venueData';

const ALERTS = [
  { icon:'⚠️', msg:'North Stand Gate 1 at 92% — use Gate 5 instead', time:'1m ago', color:'var(--red)',    urgent:true  },
  { icon:'✅', msg:'East Block open — fastest entry right now',          time:'3m ago', color:'var(--green)', urgent:false },
  { icon:'🍔', msg:'Food Court 2 wait only 3 min — near Gate 5',        time:'6m ago', color:'var(--accent)',urgent:false },
  { icon:'🚗', msg:'P1 parking full — P2 has 120 slots available',      time:'12m ago',color:'var(--yellow)',urgent:false },
  { icon:'⏰', msg:'Halftime in ~18 minutes — order food now!',          time:'live',   color:'var(--orange)',urgent:true  },
];

function CrowdColor(c){
  if(c>=85) return {bg:'rgba(255,61,87,.18)',border:'rgba(255,61,87,.4)',txt:'var(--red)',lbl:'PACKED'};
  if(c>=60) return {bg:'rgba(255,214,0,.12)',border:'rgba(255,214,0,.35)',txt:'var(--yellow)',lbl:'BUSY'};
  return      {bg:'rgba(0,230,118,.1)', border:'rgba(0,230,118,.35)',txt:'var(--green)',lbl:'OPEN'};
}

export default function Dashboard() {
  const nav = useNavigate();
  const [now, setNow] = useState(new Date());
  const [zones, setZones] = useState(ZONES);

  useEffect(()=>{
    const t1 = setInterval(()=>setNow(new Date()),1000);
    const t2 = setInterval(()=>setZones(prev=>prev.map(z=>({
      ...z,
      crowd: Math.min(99,Math.max(10,z.crowd+(Math.random()-.48)*2))
    }))),4000);
    return ()=>{clearInterval(t1);clearInterval(t2)};
  },[]);

  const pct = Math.round((VENUE.currentAttendees/VENUE.capacity)*100);

  return (
    <div className="page-wrap" style={{ padding: '20px 0' }}>
      <style>{`
        .dash-container {
          padding: 0 20px;
        }
        .live-match-header {
          position: relative;
          background: linear-gradient(180deg, rgba(34, 211, 238, 0.1) 0%, transparent 100%);
          padding: 24px 20px;
          border-radius: var(--r-lg);
          border: 1px solid var(--glass-border);
          overflow: hidden;
          margin-bottom: 24px;
        }
        .match-bg {
          position: absolute;
          inset: 0;
          background: url('/team-logos.png') center/cover no-repeat;
          opacity: 0.2;
          filter: blur(20px);
        }
        .match-content {
          position: relative;
          z-index: 1;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .team-box {
          text-align: center;
          width: 80px;
        }
        .team-logo {
          width: 56px;
          height: 56px;
          margin: 0 auto 10px;
          background: var(--glass);
          border-radius: 50%;
          border: 1px solid var(--glass-border);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          box-shadow: 0 0 20px rgba(0,0,0,0.3);
        }
        .score-box {
          text-align: center;
        }
        .live-badge-premium {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: var(--red);
          color: white;
          padding: 2px 8px;
          border-radius: 4px;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.1em;
          margin-bottom: 8px;
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        .grid-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-bottom: 24px;
        }
        .stat-card {
          background: var(--glass);
          border: 1px solid var(--glass-border);
          border-radius: var(--r-md);
          padding: 16px 10px;
          text-align: center;
        }
        .stat-val {
          font-family: var(--font-mono);
          font-size: 20px;
          font-weight: 700;
          color: var(--accent);
          display: block;
        }
        .stat-label {
          font-size: 10px;
          color: var(--text-dim);
          text-transform: uppercase;
          margin-top: 4px;
          letter-spacing: 0.05em;
        }
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }
        .section-title {
          font-family: var(--font-display);
          font-size: 22px;
          letter-spacing: 0.05em;
          color: white;
        }
        .glass-btn {
          background: var(--glass);
          border: 1px solid var(--glass-border);
          color: var(--accent);
          padding: 6px 12px;
          border-radius: 100px;
          font-size: 12px;
          text-transform: uppercase;
          font-weight: 600;
        }
        .quick-actions-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
          margin-bottom: 32px;
        }
        .action-card {
          background: var(--glass);
          border: 1px solid var(--glass-border);
          border-radius: var(--r-md);
          padding: 16px 8px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          transition: all 0.3s;
        }
        .action-card:hover {
          background: rgba(34, 211, 238, 0.1);
          border-color: var(--accent);
        }
        .action-icon {
          font-size: 24px;
        }
        .action-label {
          font-size: 11px;
          font-weight: 600;
          color: var(--text-muted);
          text-align: center;
        }
        .zone-pill {
          background: var(--glass);
          border: 1px solid var(--glass-border);
          border-radius: var(--r-md);
          padding: 14px 16px;
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 10px;
          transition: transform 0.2s;
        }
        .zone-pill:active { transform: scale(0.98); }
        .zone-info { flex: 1; }
        .zone-name { font-size: 15px; font-weight: 700; color: white; display: block; }
        .zone-sub { font-size: 12px; color: var(--text-dim); }
        .zone-status { text-align: right; }
        .zone-density { font-family: var(--font-mono); font-size: 16px; font-weight: 700; }
      `}</style>

      <div className="dash-container">
        {/* Top Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <div>
            <div style={{fontFamily:'var(--font-display)',fontSize:26,color:'var(--accent)',letterSpacing:'.05em'}}>STADIUMSENSE</div>
            <div style={{fontSize:11,color:'var(--text2)',fontFamily:'var(--font-mono)'}}>
              {now.toLocaleTimeString()} · {VENUE.name}
            </div>
          </div>
          <div style={{display:'flex',alignItems:'center',gap:8}}>
            <div style={{background:'rgba(0,230,118,.12)',border:'1px solid rgba(0,230,118,.35)',borderRadius:100,padding:'5px 12px',fontSize:10,color:'var(--green)',fontWeight:700,display:'flex',alignItems:'center',gap:5}}>
              <div style={{width:5,height:5,borderRadius:'50%',background:'var(--green)',animation:'ldot 1.4s infinite'}}/>
              LIVE
            </div>
          </div>
        </div>
      </div>

      {/* Match Card */}
      <div className="match-card">
        <div style={{fontSize:10,color:'var(--text2)',letterSpacing:'.1em',marginBottom:12}}>{VENUE.match.title}</div>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',position:'relative',zIndex:1}}>
          <div style={{textAlign:'center'}}>
            <div style={{fontFamily:'var(--font-display)',fontSize:20,letterSpacing:'.05em',color:'#4a9eff'}}>{VENUE.match.team1.name}</div>
            <div className="team-score" style={{color:'var(--accent)'}}>{VENUE.match.team1.score}</div>
            <div style={{fontSize:10,color:'var(--text2)'}}>{VENUE.match.team1.overs} ov</div>
          </div>
          <div style={{textAlign:'center'}}>
            <div className="vs-badge">INNING {VENUE.match.inning}</div>
            <div style={{fontSize:10,color:'var(--text2)',marginTop:6,fontFamily:'var(--font-mono)'}}>NRR REQ: 15.2</div>
          </div>
          <div style={{textAlign:'center'}}>
            <div style={{fontFamily:'var(--font-display)',fontSize:20,letterSpacing:'.05em',color:'#f5c518'}}>{VENUE.match.team2.name}</div>
            <div className="team-score" style={{color:'var(--yellow)'}}>{VENUE.match.team2.score}</div>
            <div style={{fontSize:10,color:'var(--text2)'}}>{VENUE.match.team2.overs} ov</div>
          </div>
        </div>
        <div style={{marginTop:14,background:'rgba(255,149,0,.1)',border:'1px solid rgba(255,149,0,.3)',borderRadius:10,padding:'8px 12px',display:'flex',alignItems:'center',gap:8}}>
          <span style={{fontSize:14}}>⏰</span>
          <span style={{fontSize:12,color:'var(--orange)'}}>Halftime in <b>~18 mins</b> — Pre-order food now to skip queues!</span>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <div className="scard">
          <div className="scard-num" style={{color:'var(--accent)'}}>{VENUE.currentAttendees.toLocaleString()}</div>
          <div className="scard-lbl">Attendees</div>
        </div>
        <div className="scard">
          <div className="scard-num" style={{color:'var(--yellow)'}}>{pct}%</div>
          <div className="scard-lbl">Capacity</div>
        </div>
        <div className="scard">
          <div className="scard-num" style={{color:'var(--green)'}}>2m</div>
          <div className="scard-lbl">Avg Wait</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="section-hdr">
        <span className="section-ttl">Quick Access</span>
      </div>
      <div className="quick-actions">
        {[
          {icon:'🗺️',label:'Crowd\nMap',    path:'/crowd'},
          {icon:'🍔',label:'Order\nFood',   path:'/food'},
          {icon:'🪑',label:'My\nSeat',      path:'/seat'},
          {icon:'🧠',label:'Ask\nGemini',   path:'/ai'},
        ].map(a=>(
          <button key={a.path} className="qa-btn" onClick={()=>nav(a.path)}>
            <span className="qi">{a.icon}</span>
            <span className="ql" style={{whiteSpace:'pre-line'}}>{a.label}</span>
          </button>
        ))}
      </div>

      {/* Crowd Chart */}
      <div className="section-hdr">
        <span className="section-ttl">Crowd Flow Today</span>
      </div>
      <div className="chart-wrap">
        <ResponsiveContainer width="100%" height={110}>
          <AreaChart data={CROWD_HISTORY}>
            <defs>
              <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="var(--accent)" stopOpacity={.3}/>
                <stop offset="95%" stopColor="var(--accent)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="time" tick={{fill:'var(--text3)',fontSize:9}} axisLine={false} tickLine={false}/>
            <Tooltip
              contentStyle={{background:'var(--card)',border:'1px solid var(--border)',borderRadius:8,fontSize:11}}
              formatter={v=>[`${v}%`,'Crowd']}
            />
            <Area type="monotone" dataKey="crowd" stroke="var(--accent)" fill="url(#cg)" strokeWidth={2} dot={false}/>
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Zone Status */}
      <div className="section-hdr">
        <span className="section-ttl">Zone Status</span>
        <button className="see-all" onClick={()=>nav('/crowd')}>See Map →</button>
      </div>
      <div className="zones-grid">
        {zones.filter(z=>z.w>0).map(z=>{
          const c = CrowdColor(z.crowd);
          return (
            <div key={z.id} className="zone-card" style={{background:c.bg,border:`1px solid ${c.border}`}}
              onClick={()=>nav('/crowd')}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
                <div style={{fontSize:12,fontWeight:600}}>{z.name}</div>
                <div style={{fontSize:9,fontWeight:700,color:c.txt,letterSpacing:'.06em'}}>{c.lbl}</div>
              </div>
              <div style={{fontSize:18,fontWeight:700,fontFamily:'var(--font-mono)',color:c.txt,marginTop:4}}>
                {Math.round(z.crowd)}%
              </div>
              <div className="zone-pct-bar">
                <div className="zone-pct-fill" style={{width:`${z.crowd}%`,background:c.txt}}/>
              </div>
              <div style={{fontSize:10,color:'var(--text2)',marginTop:5}}>Gate {z.gate} · ~{z.wait}m wait</div>
            </div>
          );
        })}
      </div>

      {/* Alerts */}
      <div className="section-hdr"><span className="section-ttl">Live Alerts</span></div>
      {ALERTS.map((a,i)=>(
        <div key={i} className={`alert-item ${a.urgent?'urgent':''}`}>
          <span style={{fontSize:18,flexShrink:0}}>{a.icon}</span>
          <div style={{flex:1}}>
            <div style={{fontSize:12,lineHeight:1.5}}>{a.msg}</div>
            <div style={{fontSize:10,color:'var(--text2)',marginTop:2}}>{a.time}</div>
          </div>
          {a.urgent && <div style={{width:7,height:7,borderRadius:'50%',background:'var(--red)',animation:'ldot 1.4s infinite',flexShrink:0,marginTop:5}}/>}
        </div>
      ))}
      <style>{`@keyframes ldot{0%,100%{opacity:1}50%{opacity:.3}}`}</style>
    </div>
  );
}
