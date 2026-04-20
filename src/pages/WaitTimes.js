import React, { useState, useEffect } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { FACILITIES, HALFTIME_FORECAST } from '../data/venueData';

function wColor(w){ return w<=4?'var(--green)':w<=9?'var(--yellow)':'var(--red)'; }

export default function WaitTimes() {
  const [tab, setTab] = useState('food');
  const [data, setData] = useState(FACILITIES);
  const [countdown, setCountdown] = useState(18*60);

  useEffect(()=>{
    const t1 = setInterval(()=>{
      setData(prev=>({
        ...prev,
        food: prev.food.map(x=>({...x,wait:Math.max(1,x.wait+(Math.random()>.5?1:-1)),capacity:Math.max(5,Math.min(98,x.capacity+(Math.random()-.5)*3))})),
        restrooms: prev.restrooms.map(x=>({...x,wait:Math.max(0,x.wait+(Math.random()>.5?1:-1))})),
        merchandise: prev.merchandise.map(x=>({...x,wait:Math.max(1,x.wait+(Math.random()>.5?1:-1))})),
      }));
    },4000);
    const t2 = setInterval(()=>setCountdown(c=>Math.max(0,c-1)),1000);
    return ()=>{clearInterval(t1);clearInterval(t2)};
  },[]);

  const mmss = `${String(Math.floor(countdown/60)).padStart(2,'0')}:${String(countdown%60).padStart(2,'0')}`;
  const items = tab==='food'?data.food:tab==='restroom'?data.restrooms:tab==='parking'?data.parking:data.merchandise;
  const best = [...items].sort((a,b)=>(a.wait||0)-(b.wait||0))[0];

  const TABS = [
    {id:'food',icon:'🍔',label:'Food'},
    {id:'restroom',icon:'🚻',label:'Washrooms'},
    {id:'parking',icon:'🚗',label:'Parking'},
    {id:'merchandise',icon:'🛍️',label:'Merch'},
  ];

  return (
    <div className="page-wrap">
      <style>{`
        .wt-hdr{padding:16px;border-bottom:1px solid var(--border)}
        .ht-card{
          margin:14px 16px;background:linear-gradient(135deg,rgba(255,149,0,.08),rgba(255,61,53,.05));
          border:1px solid rgba(255,149,0,.3);border-radius:var(--r-xl);padding:16px;
        }
        .ht-timer{font-family:var(--font-mono);font-size:32px;font-weight:700;color:var(--orange)}
        .tab-row{
          display:flex;gap:8px;overflow-x:auto;padding:0 16px 12px;
          scrollbar-width:none;
        }
        .tab-row::-webkit-scrollbar{display:none}
        .wt-tab{
          background:var(--card);border:1px solid var(--border);
          border-radius:100px;padding:8px 16px;font-size:12px;
          cursor:pointer;white-space:nowrap;color:var(--text2);
          transition:all .2s;flex-shrink:0;
        }
        .wt-tab.active{background:var(--accent);color:#000;border-color:var(--accent);font-weight:700}
        .best-banner{
          margin:0 16px 10px;
          background:rgba(0,230,118,.07);border:1px solid rgba(0,230,118,.3);
          border-radius:var(--r-md);padding:10px 14px;
          display:flex;align-items:center;gap:10;
        }
        .wait-row{
          display:flex;align-items:stretch;gap:0;
          background:var(--card);border:1px solid var(--border);
          border-radius:var(--r-md);margin:0 16px 8px;overflow:hidden;
          cursor:default;
        }
        .wait-row.best{border-color:rgba(0,230,118,.45)}
        .wait-accent-bar{width:4px;flex-shrink:0}
        .wait-body{flex:1;padding:13px}
        .wait-bar-track{height:4px;background:var(--bg3);border-radius:2px;margin-top:7px}
        .wait-bar-fill{height:100%;border-radius:2px;transition:width 1s}
        .chart-box{
          margin:0 16px 16px;background:var(--card);border:1px solid var(--border);
          border-radius:var(--r-lg);padding:14px 6px 6px;
        }
        .best-badge{
          background:rgba(0,230,118,.18);border:1px solid rgba(0,230,118,.4);
          border-radius:100px;padding:2px 9px;font-size:9px;color:var(--green);font-weight:700;
          flex-shrink:0;
        }
        .park-status{
          border-radius:100px;padding:3px 10px;font-size:10px;font-weight:700;
        }
      `}</style>

      <div className="wt-hdr">
        <div style={{fontFamily:'var(--font-display)',fontSize:26,letterSpacing:'.05em'}}>WAIT TIMES</div>
        <div style={{fontSize:11,color:'var(--text2)',fontFamily:'var(--font-mono)'}}>AI-predicted · live updates</div>
      </div>

      {/* Halftime countdown */}
      <div className="ht-card">
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
          <div>
            <div style={{fontSize:11,color:'var(--orange)',letterSpacing:'.1em',fontFamily:'var(--font-mono)',marginBottom:4}}>⏰ HALFTIME COUNTDOWN</div>
            <div className="ht-timer">{mmss}</div>
            <div style={{fontSize:12,color:'var(--text2)',marginTop:6,maxWidth:200}}>
              Food queues will spike <b style={{color:'var(--red)'}}>3x</b> at halftime. Pre-order now to skip!
            </div>
          </div>
          <div style={{textAlign:'right'}}>
            <div style={{fontSize:10,color:'var(--text3)',marginBottom:4,fontFamily:'var(--font-mono)'}}>SURGE FORECAST</div>
            <div style={{fontSize:22,fontWeight:700,fontFamily:'var(--font-mono)',color:'var(--red)'}}>24m</div>
            <div style={{fontSize:10,color:'var(--text2)'}}>peak wait</div>
          </div>
        </div>

        {/* Forecast chart */}
        <div style={{marginTop:12}}>
          <div style={{fontSize:10,color:'var(--text3)',fontFamily:'var(--font-mono)',marginBottom:6,letterSpacing:'.08em'}}>FOOD WAIT FORECAST</div>
          <ResponsiveContainer width="100%" height={75}>
            <BarChart data={HALFTIME_FORECAST} barCategoryGap="22%">
              <XAxis dataKey="label" tick={{fill:'var(--text3)',fontSize:9}} axisLine={false} tickLine={false}/>
              <YAxis hide/>
              <Tooltip
                contentStyle={{background:'var(--card)',border:'1px solid var(--border)',borderRadius:8,fontSize:11}}
                formatter={v=>[`${v} min`,'Wait']}
              />
              <Bar dataKey="food" radius={3}>
                {HALFTIME_FORECAST.map((e,i)=>(
                  <Cell key={i} fill={i===3?'var(--red)':i>3?'var(--yellow)':'var(--accent)'}/>
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Category tabs */}
      <div className="tab-row">
        {TABS.map(t=>(
          <button key={t.id} className={`wt-tab ${tab===t.id?'active':''}`} onClick={()=>setTab(t.id)}>
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {/* Best option */}
      {best && (
        <div className="best-banner" style={{gap:10}}>
          <span style={{fontSize:18}}>✅</span>
          <div>
            <div style={{fontSize:13,fontWeight:700,color:'var(--green)'}}>Best: {best.name}</div>
            <div style={{fontSize:11,color:'var(--text2)'}}>{best.location} · ~{best.wait??0}m wait right now</div>
          </div>
        </div>
      )}

      {/* Items */}
      {tab==='parking' ? (
        data.parking.map(p=>(
          <div key={p.id} className="wait-row" style={{borderColor:p.status==='AVAILABLE'?'rgba(0,230,118,.4)':p.status==='FULL'?'rgba(255,61,87,.35)':'rgba(0,212,255,.3)'}}>
            <div className="wait-accent-bar" style={{background:p.status==='AVAILABLE'?'var(--green)':p.status==='FULL'?'var(--red)':'var(--accent)'}}/>
            <div className="wait-body">
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <div style={{fontWeight:600,fontSize:14}}>{p.name}</div>
                <span className="park-status" style={{
                  background:p.status==='AVAILABLE'?'rgba(0,230,118,.15)':p.status==='FULL'?'rgba(255,61,87,.15)':'rgba(0,212,255,.15)',
                  color:p.status==='AVAILABLE'?'var(--green)':p.status==='FULL'?'var(--red)':'var(--accent)',
                  border:`1px solid ${p.status==='AVAILABLE'?'rgba(0,230,118,.4)':p.status==='FULL'?'rgba(255,61,87,.4)':'rgba(0,212,255,.4)'}`,
                }}>{p.status}</span>
              </div>
              <div style={{fontSize:12,color:'var(--text2)',marginTop:3}}>{p.distance}</div>
              {p.slots>0 && p.slots<999 && (
                <div style={{fontSize:11,color:'var(--green)',marginTop:3}}>{p.slots} slots available</div>
              )}
            </div>
          </div>
        ))
      ) : items.map((item,i)=>{
        const isBest = item.id===best?.id;
        const w = item.wait ?? 0;
        return (
          <div key={item.id} className={`wait-row ${isBest?'best':''}`}>
            <div className="wait-accent-bar" style={{background:wColor(w)}}/>
            <div className="wait-body">
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <div style={{display:'flex',alignItems:'center',gap:7}}>
                  <span style={{fontSize:13,fontWeight:600}}>{item.name}</span>
                  {isBest && <span className="best-badge">BEST</span>}
                </div>
                <span style={{fontSize:16,fontWeight:700,fontFamily:'var(--font-mono)',color:wColor(w)}}>{w}m</span>
              </div>
              <div style={{fontSize:11,color:'var(--text2)',marginTop:2}}>{item.location}</div>
              <div className="wait-bar-track">
                <div className="wait-bar-fill" style={{width:`${item.capacity??50}%`,background:wColor(w)}}/>
              </div>
              <div style={{display:'flex',justifyContent:'space-between',marginTop:4}}>
                <span style={{fontSize:10,color:'var(--text2)'}}>{Math.round(item.capacity??50)}% full</span>
                <span style={{fontSize:10,color:'rgba(255,149,0,.8)'}}>📊 HT est: ~{Math.round((item.wait??0)*1.6)}m</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
