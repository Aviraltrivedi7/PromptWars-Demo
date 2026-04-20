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
    <div style={{minHeight:'100vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:24,textAlign:'center', background: 'var(--bg)' }}>
      <style>{`
        @keyframes popIn{from{transform:scale(0.5);opacity:0}to{transform:scale(1);opacity:1}}
        .order-success-card {
          background: var(--glass);
          border: 1px solid var(--glass-border);
          border-radius: var(--r-xl);
          padding: 32px 24px;
          max-width: 340px;
          width: 100%;
          animation: popIn 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        }
      `}</style>
      <div className="order-success-card">
        <div style={{fontSize:72, marginBottom: 16}}>🎉</div>
        <h2 style={{fontFamily:'var(--font-display)',fontSize:28,color:'var(--accent)',letterSpacing:'.05em'}}>SUCCESS!</h2>
        <div style={{fontFamily:'var(--font-mono)',fontSize:12,color:'var(--text-dim)',marginTop:4}}>ORDER ID: {orderId}</div>
        
        <div style={{marginTop:24, textAlign: 'left'}}>
          <div style={{fontSize:11, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4}}>Delivery To</div>
          <div style={{fontFamily:'var(--font-display)',fontSize:22,color:'white'}}>SEAT {seat.toUpperCase()}</div>
        </div>

        <div style={{marginTop:24, padding: '16px', background: 'rgba(0,0,0,0.2)', borderRadius: '12px'}}>
          <div style={{fontSize:10, color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: 10}}>Items</div>
          {Object.entries(cart).map(([id,qty])=>{
            const item = FOOD_MENU.find(f=>f.id===Number(id));
            return item?(
              <div key={id} style={{display:'flex',justifyContent:'space-between',fontSize:13, marginBottom: 6}}>
                <span style={{ color: 'var(--text-muted)' }}>{item.emoji} {item.name} x{qty}</span>
                <span style={{color:'var(--accent)',fontFamily:'var(--font-mono)'}}>₹{item.price*qty}</span>
              </div>
            ):null;
          })}
          <div style={{borderTop:'1px solid var(--glass-border)',paddingTop:10,marginTop:10,display:'flex',justifyContent:'space-between',fontWeight:700}}>
            <span style={{ color: 'white' }}>Total</span>
            <span style={{color:'var(--green)',fontFamily:'var(--font-mono)', fontSize: 16}}>₹{total}</span>
          </div>
        </div>

        <button onClick={()=>{setOrdered(false);setCart({})}}
          style={{marginTop:32, width: '100%', padding:'16px', background:'white', color: 'black', border:'none', borderRadius:16, fontWeight: 700, cursor:'pointer', fontSize:14}}>
          NEW ORDER
        </button>
      </div>
    </div>
  );

  return (
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
