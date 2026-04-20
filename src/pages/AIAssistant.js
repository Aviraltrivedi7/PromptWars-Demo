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
    role: 'ai',
    content: "Greetings! I am StadiumSense AI, your holographic venue assistant. I have live access to crowd density, gate wait times, and facility maps. How can I enhance your match experience today?",
    time: new Date(),
  }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [msgs]);

  const send = async (text) => {
    const msg = text || input.trim();
    if (!msg || loading) return;
    setInput('');
    setShowSuggestions(false);
    const userMsg = { role: 'user', content: msg, time: new Date() };
    setMsgs(prev => [...prev, userMsg]);
    setLoading(true);

    try {
      const history = msgs.map(m => ({
        role: m.role === 'ai' ? 'model' : 'user',
        parts: [{ text: m.content }]
      }));

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            system_instruction: { parts: [{ text: SYSTEM }] },
            contents: [...history, { role: 'user', parts: [{ text: msg }] }],
            generationConfig: { temperature: .75, maxOutputTokens: 350, topP: .9 }
          })
        }
      );
      const data = await res.json();
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text
        || (data.error ? `API Error: ${data.error.message}` : "I'm having trouble right now. Please try again!");
      setMsgs(prev => [...prev, { role: 'ai', content: reply, time: new Date() }]);
      setShowSuggestions(true);
    } catch (e) {
      setMsgs(prev => [...prev, { role: 'ai', content: `⚠️ Connection issue.\n\nMake sure you've added your Gemini API key in AIAssistant.js line 5.\n\nGet a free key at: aistudio.google.com`, time: new Date() }]);
    }
    setLoading(false);
  };

  const fmt = (t) => t.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: 'var(--bg)' }}>
      <style>{`
        .ai-header-premium {
          background: linear-gradient(180deg, rgba(34, 211, 238, 0.1) 0%, transparent 100%);
          padding: 24px 20px;
          display: flex;
          align-items: center;
          gap: 16px;
          border-bottom: 1px solid var(--glass-border);
        }
        .ai-orb-container {
          width: 56px;
          height: 56px;
          position: relative;
        }
        .ai-orb-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
          box-shadow: 0 0 20px var(--accent-glow);
          animation: orbFloat 3s ease-in-out infinite;
        }
        @keyframes orbFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .ai-title {
          font-family: var(--font-display);
          font-size: 22px;
          letter-spacing: 0.05em;
          color: white;
        }
        .ai-status {
          font-size: 10px;
          font-family: var(--font-mono);
          color: var(--accent);
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .chat-msgs {
          flex: 1;
          padding: 20px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .m-user {
          align-self: flex-end;
          max-width: 80%;
          background: var(--accent);
          color: black;
          padding: 12px 18px;
          border-radius: 20px 20px 4px 20px;
          font-size: 14px;
          font-weight: 600;
          box-shadow: 0 4px 15px var(--accent-glow);
        }
        .m-ai {
          align-self: flex-start;
          max-width: 85%;
          background: var(--glass);
          backdrop-filter: blur(10px);
          border: 1px solid var(--glass-border);
          color: var(--text);
          padding: 14px 18px;
          border-radius: 4px 20px 20px 20px;
          font-size: 14px;
          line-height: 1.6;
        }
        .m-time {
          font-size: 9px;
          color: var(--text-dim);
          margin-top: 6px;
          font-family: var(--font-mono);
        }
        .ai-input-zone {
          padding: 16px 20px calc(24px + env(safe-area-inset-bottom));
          background: var(--bg);
          border-top: 1px solid var(--glass-border);
          display: flex;
          gap: 12px;
        }
        .ai-inp {
          flex: 1;
          background: var(--glass);
          border: 1px solid var(--glass-border);
          border-radius: 16px;
          padding: 12px 16px;
          color: white;
          font-size: 14px;
          outline: none;
          resize: none;
          transition: 0.3s;
        }
        .ai-inp:focus { border-color: var(--accent); box-shadow: 0 0 10px var(--accent-glow); }
        .ai-send {
          width: 48px;
          height: 44px;
          background: var(--accent);
          border: none;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          font-weight: 800;
        }
        .ai-send:disabled { opacity: 0.4; }
        .suggestions {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          padding: 0 20px 12px;
          scrollbar-width: none;
        }
        .suggestions::-webkit-scrollbar { display: none; }
        .sug-pill {
          background: var(--glass);
          border: 1px solid var(--glass-border);
          padding: 8px 16px;
          border-radius: 100px;
          font-size: 12px;
          color: var(--text-muted);
          white-space: nowrap;
        }
      `}</style>

      {/* Header */}
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
