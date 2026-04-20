import React, { useState } from 'react';
import { FOOD_MENU, FACILITIES } from '../data/venueData';

const CATS = ['All','Snacks','Meals','Drinks','Dessert'];

export default function FoodOrder() {
  const [cat, setCat] = useState('All');
  const [cart, setCart] = useState({});
  const [seat, setSeat] = useState('');
  const [ordered, setOrdered] = useState(false);
  const [orderId] = useState(`SS${Math.floor(Math.random()*90000)+10000}`);
  const [outlet, setOutlet] = useState(FACILITIES.food[1].id);

  const filtered = cat==='All' ? FOOD_MENU : FOOD_MENU.filter(f=>f.category===cat);
  const total = Object.entries(cart).reduce((s,[id,qty])=>{
    const item = FOOD_MENU.find(f=>f.id===Number(id));
    return s+(item?item.price*qty:0);
  },0);
  const totalItems = Object.values(cart).reduce((s,q)=>s+q,0);

  const add = (id) => setCart(p=>({...p,[id]:(p[id]||0)+1}));
  const rem = (id) => setCart(p=>{const n={...p};if(n[id]>1)n[id]--;else delete n[id];return n;});
  const placeOrder = () => { if(!seat) return; setOrdered(true); };

  if(ordered) return (
    <div style={{minHeight:'100vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:24,textAlign:'center'}}>
      <style>{`@keyframes popIn{from{transform:scale(0.5);opacity:0}to{transform:scale(1);opacity:1}}`}</style>
      <div style={{fontSize:72,animation:'popIn .5s cubic-bezier(.34,1.56,.64,1) forwards'}}>🎉</div>
      <div style={{fontFamily:'var(--font-display)',fontSize:32,color:'var(--green)',marginTop:16,letterSpacing:'.05em'}}>ORDER PLACED!</div>
      <div style={{fontFamily:'var(--font-mono)',fontSize:14,color:'var(--accent)',marginTop:8}}>#{orderId}</div>
      <div style={{marginTop:20,background:'var(--card)',border:'1px solid var(--border2)',borderRadius:20,padding:'20px 28px',maxWidth:320}}>
        <div style={{fontSize:13,color:'var(--text2)',marginBottom:12}}>Delivering to</div>
        <div style={{fontFamily:'var(--font-display)',fontSize:22,color:'var(--text)'}}>SEAT {seat.toUpperCase()}</div>
        <div style={{marginTop:16,fontSize:13,color:'var(--text2)'}}>Estimated delivery</div>
        <div style={{fontFamily:'var(--font-mono)',fontSize:28,fontWeight:700,color:'var(--accent)'}}>12 mins</div>
        <div style={{marginTop:16,display:'flex',flexDirection:'column',gap:6}}>
          {Object.entries(cart).map(([id,qty])=>{
            const item = FOOD_MENU.find(f=>f.id===Number(id));
            return item?(
              <div key={id} style={{display:'flex',justifyContent:'space-between',fontSize:13}}>
                <span>{item.emoji} {item.name} x{qty}</span>
                <span style={{color:'var(--accent)',fontFamily:'var(--font-mono)'}}>₹{item.price*qty}</span>
              </div>
            ):null;
          })}
          <div style={{borderTop:'1px solid var(--border)',paddingTop:8,marginTop:4,display:'flex',justifyContent:'space-between',fontWeight:700}}>
            <span>Total</span>
            <span style={{color:'var(--green)',fontFamily:'var(--font-mono)'}}>₹{total}</span>
          </div>
        </div>
      </div>
      <button onClick={()=>{setOrdered(false);setCart({})}}
        style={{marginTop:24,padding:'14px 32px',background:'var(--card)',border:'1px solid var(--border2)',borderRadius:14,color:'var(--text2)',cursor:'pointer',fontSize:14}}>
        Order More
      </button>
    </div>
  );

  return (
    <div className="page-wrap">
      <style>{`
        .fo-hdr{padding:16px;border-bottom:1px solid var(--border)}
        .outlet-row{
          display:flex;gap:8px;overflow-x:auto;padding:12px 16px;
          scrollbar-width:none;
        }
        .outlet-row::-webkit-scrollbar{display:none}
        .outlet-chip{
          background:var(--card);border:1px solid var(--border);
          border-radius:var(--r-md);padding:8px 12px;flex-shrink:0;
          cursor:pointer;transition:all .2s;min-width:130px;
        }
        .outlet-chip.active{border-color:var(--accent);background:rgba(0,212,255,.06)}
        .cat-bar{display:flex;gap:7px;overflow-x:auto;padding:0 16px 12px;scrollbar-width:none}
        .cat-bar::-webkit-scrollbar{display:none}
        .cat-btn{
          background:var(--card);border:1px solid var(--border);
          border-radius:100px;padding:7px 14px;font-size:12px;
          cursor:pointer;white-space:nowrap;color:var(--text2);
          transition:all .2s;flex-shrink:0;
        }
        .cat-btn.active{background:var(--accent2);color:#fff;border-color:var(--accent2);font-weight:700}
        .menu-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;padding:0 16px}
        .menu-card{
          background:var(--card);border:1px solid var(--border);
          border-radius:var(--r-lg);padding:14px;display:flex;flex-direction:column;gap:6px;
          transition:border-color .2s;
        }
        .menu-card.in-cart{border-color:rgba(0,212,255,.4);background:rgba(0,212,255,.04)}
        .menu-emoji{font-size:30px;text-align:center}
        .menu-name{font-size:12px;font-weight:600;text-align:center;line-height:1.3}
        .menu-price{font-family:var(--font-mono);font-size:14px;color:var(--accent);text-align:center}
        .popular-tag{
          background:rgba(255,107,53,.15);border:1px solid rgba(255,107,53,.3);
          border-radius:100px;padding:1px 7px;font-size:9px;color:var(--accent2);
          text-align:center;font-weight:700;
        }
        .qty-ctrl{
          display:flex;align-items:center;justify-content:center;gap:8px;margin-top:4px;
        }
        .qty-btn{
          width:26px;height:26px;border-radius:8px;border:1px solid var(--border2);
          background:var(--bg3);color:var(--text);font-size:16px;cursor:pointer;
          display:flex;align-items:center;justify-content:center;transition:all .2s;
        }
        .qty-btn:hover{border-color:var(--accent);color:var(--accent)}
        .add-btn{
          width:100%;padding:8px;background:var(--accent);border:none;
          border-radius:10px;color:#000;font-size:12px;font-weight:700;
          cursor:pointer;transition:all .2s;margin-top:4px;
        }
        .add-btn:hover{opacity:.88}
        .cart-bar{
          position:fixed;bottom:72px;left:50%;transform:translateX(-50%);
          width:calc(100% - 32px);max-width:448px;
          background:var(--accent);border-radius:var(--r-lg);
          padding:14px 20px;display:flex;justify-content:space-between;align-items:center;
          cursor:pointer;box-shadow:0 4px 24px rgba(0,212,255,.35);z-index:100;
          transition:transform .2s;
        }
        .cart-bar:hover{transform:translateX(-50%) scale(1.01)}
        .seat-inp{
          background:var(--bg3);border:1px solid var(--border2);
          border-radius:10px;padding:10px 14px;color:var(--text);
          font-size:14px;width:100%;outline:none;font-family:var(--font-mono);
          margin-top:8px;
        }
        .seat-inp:focus{border-color:var(--accent)}
        .order-sheet{
          position:fixed;bottom:0;left:50%;transform:translateX(-50%);
          width:100%;max-width:480px;z-index:200;
          background:var(--bg2);border-top:2px solid var(--accent);
          border-radius:28px 28px 0 0;padding:20px 20px max(20px,env(safe-area-inset-bottom));
          max-height:70vh;overflow-y:auto;
        }
      `}</style>

      <div className="fo-hdr">
        <div style={{fontFamily:'var(--font-display)',fontSize:26,letterSpacing:'.05em'}}>ORDER FOOD 🍔</div>
        <div style={{fontSize:11,color:'var(--text2)'}}>In-seat delivery · Skip the queue</div>
      </div>

      {/* Outlet selector */}
      <div style={{padding:'10px 16px 4px',fontSize:11,color:'var(--text2)',fontFamily:'var(--font-mono)',letterSpacing:'.1em',textTransform:'uppercase'}}>
        Choose Outlet
      </div>
      <div className="outlet-row">
        {FACILITIES.food.map(f=>(
          <div key={f.id} className={`outlet-chip ${outlet===f.id?'active':''}`} onClick={()=>setOutlet(f.id)}>
            <div style={{fontSize:12,fontWeight:600}}>{f.name}</div>
            <div style={{fontSize:10,color:f.wait<=5?'var(--green)':'var(--text2)',marginTop:2,fontFamily:'var(--font-mono)'}}>
              ~{f.wait}m wait
            </div>
          </div>
        ))}
      </div>

      {/* Seat input */}
      <div style={{padding:'4px 16px 12px'}}>
        <div style={{fontSize:11,color:'var(--text2)',fontFamily:'var(--font-mono)',letterSpacing:'.1em',textTransform:'uppercase'}}>Your Seat Number</div>
        <input className="seat-inp" placeholder="e.g. C-14, D-27, E-8..." value={seat} onChange={e=>setSeat(e.target.value)}/>
      </div>

      {/* Category filter */}
      <div className="cat-bar">
        {CATS.map(c=>(
          <button key={c} className={`cat-btn ${cat===c?'active':''}`} onClick={()=>setCat(c)}>{c}</button>
        ))}
      </div>

      {/* Menu grid */}
      <div className="menu-grid">
        {filtered.map(item=>(
          <div key={item.id} className={`menu-card ${cart[item.id]?'in-cart':''}`}>
            <div className="menu-emoji">{item.emoji}</div>
            <div className="menu-name">{item.name}</div>
            {item.popular && <div className="popular-tag">⭐ POPULAR</div>}
            <div className="menu-price">₹{item.price}</div>
            {cart[item.id] ? (
              <div className="qty-ctrl">
                <button className="qty-btn" onClick={()=>rem(item.id)}>−</button>
                <span style={{fontFamily:'var(--font-mono)',fontWeight:700,fontSize:15,minWidth:20,textAlign:'center'}}>{cart[item.id]}</span>
                <button className="qty-btn" onClick={()=>add(item.id)}>+</button>
              </div>
            ) : (
              <button className="add-btn" onClick={()=>add(item.id)}>+ ADD</button>
            )}
          </div>
        ))}
      </div>

      <div style={{height:120}}/>

      {/* Cart bar */}
      {totalItems>0 && (
        <div className="cart-bar" onClick={placeOrder}>
          <div style={{display:'flex',alignItems:'center',gap:10}}>
            <div style={{background:'rgba(0,0,0,.2)',borderRadius:8,padding:'3px 10px',fontFamily:'var(--font-mono)',fontSize:13,fontWeight:700}}>
              {totalItems} items
            </div>
            <div style={{fontWeight:700,fontSize:14,color:'#000'}}>
              {seat ? `Deliver to Seat ${seat.toUpperCase()}` : '⚠️ Enter seat number first'}
            </div>
          </div>
          <div style={{fontFamily:'var(--font-mono)',fontWeight:700,fontSize:15,color:'#000'}}>₹{total}</div>
        </div>
      )}
    </div>
  );
}
