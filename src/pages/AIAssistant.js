import React, { useState, useRef, useEffect } from 'react';

// ⚠️  REPLACE WITH YOUR GEMINI API KEY
const GEMINI_API_KEY = 'YOUR_GEMINI_API_KEY';

const SYSTEM = `You are StadiumSense AI — the smart assistant for Wankhede Stadium, Mumbai during IPL 2025 Match 42 (MI vs CSK).

You have LIVE access to all venue data:

MATCH: MI 186/4 (18.2 ov) vs CSK 142/6 (16.0 ov) | CSK batting | Halftime in ~18 mins
ATTENDEES: 28,420 / 33,108 capacity (86%)

ZONES & GATES:
- North Stand (Gate 1, 2): 92% full — PACKED — 14 min wait — AVOID
- South Stand (Gate 3): 64% full — BUSY — 5 min wait
- East Block (Gate 4, 5): 38% full — OPEN ✅ — 2 min wait — BEST
- West VIP (Gate 6): 51% full — MODERATE — 4 min wait
- Upper Tier (Gate 2, 4): 77% full — BUSY — 8 min wait

FOOD:
- Food Court 1 (Near Gate 2): 88% full — 16 min wait — AVOID
- Food Court 2 (Near Gate 5): 28% full — 3 min wait ✅ BEST
- Snack Bar A (West Block): 62% — 9 min wait
- Snack Bar B (South Exit): 71% — 11 min wait
- KFC (Gate 3 Mall): 55% — 7 min wait
- Domino's (Gate 5 Plaza): 35% — 4 min wait ✅ GOOD

WASHROOMS:
- Block A (North Stand): 8 min wait
- Block C (East Block): 1 min wait ✅ BEST
- Block E (West VIP): 6 min wait
- Block G (South Stand): 4 min wait

PARKING:
- P1: FULL | P2: 120 slots (8 min walk) ✅ | P3: 340 slots (15 min walk) | Shuttle: Running

EMERGENCY: Medical at Gate 3 | Police 100 | Ambulance 108
ATMs: Near Gate 2 and Gate 5
Lost & Found: Gate 1 Help Desk

HALFTIME PREDICTION: Food queues will spike to 24 min in ~18 mins. Recommend ordering NOW via the app.

PERSONALITY: Friendly, helpful, concise. Use emojis sparingly. Always give the BEST option first. If emergency — direct to Gate 3 Medical or dial 100.`;

const QUICK = [
  "Best food option right now?",
  "Which gate is least crowded?",
  "Nearest washroom near East Block?",
  "When is halftime?",
  "Where can I park?",
  "How do I get to my seat?",
  "Emergency help needed!",
  "What's the match score?",
];

const SUGGESTIONS_POST = [
  "Tell me more",
  "Any alternatives?",
  "How far is it?",
  "What about food?",
];

export default function AIAssistant() {
  const [msgs, setMsgs] = useState([{
    role:'ai',
    content:"Hey! I'm your StadiumSense AI 👋\n\nI have live data on crowd density, wait times, food, parking and facilities across the entire venue.\n\nHow can I help you right now?",
    time: new Date(),
  }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(()=>{ bottomRef.current?.scrollIntoView({behavior:'smooth'}); },[msgs]);

  const send = async(text) => {
    const msg = text || input.trim();
    if(!msg || loading) return;
    setInput('');
    setShowSuggestions(false);
    const userMsg = {role:'user', content:msg, time:new Date()};
    setMsgs(prev=>[...prev, userMsg]);
    setLoading(true);

    try {
      const history = msgs.map(m=>({
        role: m.role==='ai'?'model':'user',
        parts:[{text:m.content}]
      }));

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({
            system_instruction:{parts:[{text:SYSTEM}]},
            contents:[...history, {role:'user',parts:[{text:msg}]}],
            generationConfig:{temperature:.75, maxOutputTokens:350, topP:.9}
          })
        }
      );
      const data = await res.json();
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text
        || (data.error ? `API Error: ${data.error.message}` : "I'm having trouble right now. Please try again!");
      setMsgs(prev=>[...prev,{role:'ai',content:reply,time:new Date()}]);
      setShowSuggestions(true);
    } catch(e) {
      setMsgs(prev=>[...prev,{role:'ai',content:`⚠️ Connection issue.\n\nMake sure you've added your Gemini API key in AIAssistant.js line 5.\n\nGet a free key at: aistudio.google.com`,time:new Date()}]);
    }
    setLoading(false);
  };

  const fmt = (t) => t.toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'});

  return (
    <div style={{display:'flex',flexDirection:'column',height:'100vh',maxHeight:'100vh'}}>
      <style>{`
        .ai-header{
          background:var(--bg2);border-bottom:1px solid var(--border);
          padding:14px 16px;display:flex;align-items:center;gap:12;
          flex-shrink:0;
        }
        .ai-avatar{
          width:42px;height:42px;border-radius:14px;flex-shrink:0;
          background:linear-gradient(135deg,var(--accent),#0077cc);
          display:flex;align-items:center;justify-content:center;font-size:22px;
          box-shadow:0 0 16px rgba(0,212,255,.3);
        }
        .msgs{flex:1;overflow-y:auto;padding:14px;display:flex;flex-direction:column;gap:10}
        .msg-user{
          align-self:flex-end;max-width:82%;
          background:linear-gradient(135deg,var(--accent),#0088cc);
          color:#000;border-radius:18px 18px 4px 18px;
          padding:11px 15px;font-size:13.5px;font-weight:500;
          box-shadow:0 2px 12px rgba(0,212,255,.25);
        }
        .msg-ai{
          align-self:flex-start;max-width:92%;
          background:var(--card);border:1px solid var(--border2);
          color:var(--text);border-radius:4px 18px 18px 18px;
          padding:12px 15px;font-size:13.5px;line-height:1.65;
          white-space:pre-wrap;
        }
        .msg-time{font-size:9px;color:var(--text3);margin-top:4px;text-align:right}
        .typing{display:flex;gap:5px;align-items:center;padding:3px 0}
        .typing span{
          width:7px;height:7px;border-radius:50%;background:var(--accent);
          animation:tbounce 1s infinite;
        }
        .typing span:nth-child(2){animation-delay:.2s}
        .typing span:nth-child(3){animation-delay:.4s}
        @keyframes tbounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
        .quick-strip{
          display:flex;gap:7px;overflow-x:auto;padding:10px 14px 6px;
          scrollbar-width:none;-webkit-overflow-scrolling:touch;flex-shrink:0;
        }
        .quick-strip::-webkit-scrollbar{display:none}
        .qpill{
          background:var(--card);border:1px solid var(--border2);
          border-radius:100px;padding:8px 14px;
          font-size:12px;white-space:nowrap;cursor:pointer;
          color:var(--text2);transition:all .2s;flex-shrink:0;
        }
        .qpill:hover{border-color:var(--accent);color:var(--accent);background:rgba(0,212,255,.06)}
        .input-zone{
          padding:10px 14px;
          background:var(--bg2);border-top:1px solid var(--border);
          display:flex;gap:10px;align-items:flex-end;flex-shrink:0;
          padding-bottom:max(12px,env(safe-area-inset-bottom));
        }
        .inp{
          flex:1;background:var(--card);border:1px solid var(--border2);
          border-radius:14px;padding:11px 14px;color:var(--text);
          font-size:14px;resize:none;outline:none;
          min-height:44px;max-height:110px;line-height:1.45;
          transition:border-color .2s;
        }
        .inp:focus{border-color:var(--accent)}
        .inp::placeholder{color:var(--text3)}
        .send{
          width:44px;height:44px;border-radius:13px;flex-shrink:0;
          background:var(--accent);border:none;cursor:pointer;
          display:flex;align-items:center;justify-content:center;
          font-size:19px;transition:all .2s;
        }
        .send:hover:not(:disabled){transform:scale(1.07);box-shadow:0 0 16px rgba(0,212,255,.4)}
        .send:disabled{opacity:.45;cursor:not-allowed}
        .live-badge{
          display:inline-flex;align-items:center;gap:5px;
          background:rgba(0,230,118,.1);border:1px solid rgba(0,230,118,.25);
          border-radius:100px;padding:3px 10px;font-size:10px;
          color:var(--green);font-family:var(--font-mono);margin-left:8px;
        }
      `}</style>

      {/* Header */}
      <div className="ai-header" style={{gap:12}}>
        <div className="ai-avatar">🧠</div>
        <div style={{flex:1}}>
          <div style={{fontWeight:700,fontSize:15}}>StadiumSense AI</div>
          <div style={{display:'flex',alignItems:'center'}}>
            <div className="live-badge">
              <div style={{width:5,height:5,borderRadius:'50%',background:'var(--green)',animation:'ldot 1.4s infinite'}}/>
              Live data
            </div>
            <span style={{fontSize:11,color:'var(--text3)',marginLeft:8,fontFamily:'var(--font-mono)'}}>Gemini 1.5 Flash</span>
          </div>
        </div>
        <div style={{textAlign:'right',fontSize:11,color:'var(--text2)',fontFamily:'var(--font-mono)'}}>
          <div style={{color:'var(--accent)'}}>86% full</div>
          <div style={{color:'var(--text3)'}}>28,420 here</div>
        </div>
      </div>

      {/* Quick prompts */}
      <div className="quick-strip">
        {(showSuggestions ? SUGGESTIONS_POST : QUICK).map(p=>(
          <button key={p} className="qpill" onClick={()=>send(p)}>{p}</button>
        ))}
      </div>

      {/* Messages */}
      <div className="msgs">
        {msgs.map((m,i)=>(
          <div key={i}>
            <div className={m.role==='user'?'msg-user':'msg-ai'}>{m.content}</div>
            <div className="msg-time">{fmt(m.time)}</div>
          </div>
        ))}
        {loading && (
          <div className="msg-ai">
            <div className="typing"><span/><span/><span/></div>
          </div>
        )}
        <div ref={bottomRef}/>
      </div>

      {/* Input bar */}
      <div className="input-zone">
        <textarea className="inp" ref={inputRef}
          placeholder="Ask about queues, food, navigation, score..."
          value={input}
          onChange={e=>setInput(e.target.value)}
          onKeyDown={e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();send()}}}
          rows={1}
        />
        <button className="send" onClick={()=>send()} disabled={loading||!input.trim()}>↑</button>
      </div>
      <style>{`@keyframes ldot{0%,100%{opacity:1}50%{opacity:.3}}`}</style>
    </div>
  );
}
