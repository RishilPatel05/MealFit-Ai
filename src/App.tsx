import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { motion, AnimatePresence } from 'motion/react';

export const GlobalStyles = ({ theme }: any) => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Space+Grotesk:wght@400;500;600;700&display=swap');
    @import url('https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap');

    :root {
      --bg: #080c0a;
      --text: #e8f0eb;
    }
    .light-theme {
      --bg: #f5f8f6;
      --text: #080c0a;
    }
    
    * { box-sizing: border-box; }
    body {
      margin: 0; padding: 0;
      background-color: var(--bg); color: var(--text);
      font-family: 'DM Sans', sans-serif;
      overflow-x: hidden;
      transition: background-color 0.5s ease;
    }
    
    .light-theme * { border-color: rgba(0,0,0,0.06) !important; }
    .light-theme .glass, .light-theme .glass-bright, .light-theme .meal-card, .light-theme .stat-card, .light-theme .event-pill {
       background: rgba(255,255,255,0.7) !important;
       border: 1px solid rgba(0,0,0,0.08) !important;
       box-shadow: 0 4px 24px rgba(0,0,0,0.02) !important;
       color: #080c0a !important;
    }
    .light-theme .glass-bright { background: #ffffff !important; }
    
    .light-theme [style*="color: #080c0a"], .light-theme [style*="color: '#080c0a'"] { color: #f5f8f6 !important; }
    .light-theme [style*="color: #e8f0eb"], .light-theme [style*="color: '#e8f0eb'"] { color: #080c0a !important; }
    .light-theme [style*="color: #c8e8cc"], .light-theme [style*="color: '#c8e8cc'"] { color: #2a3d31 !important; }
    .light-theme [style*="color: #6b8a72"], .light-theme [style*="color: '#6b8a72'"] { color: #5a7362 !important; }
    .light-theme [style*="color: #a8ff3e"], .light-theme [style*="color: '#a8ff3e'"] { color: #008f3b !important; }

    .light-theme input, .light-theme textarea { background: rgba(0,0,0,0.03) !important; color: #080c0a !important; }
    .light-theme h1, .light-theme h2, .light-theme h3, .light-theme .clash { color: #080c0a !important; }
    .light-theme .grotesk { color: #4a6652 !important; }
    .light-theme .btn-primary { background: linear-gradient(135deg, #00c853 0%, #009688 100%) !important; color: #fff !important; box-shadow: 0 4px 12px rgba(0,200,83,0.2) !important; }
    .light-theme .btn-ghost { color: #00c853 !important; border-color: rgba(0,200,83,0.3) !important; background: transparent !important; }
    .light-theme .shimmer-text { background: linear-gradient(90deg, #00c853 0%, #009688 25%, #00c853 50%, #009688 75%, #00c853 100%) !important; background-size: 200% auto !important; -webkit-background-clip: text !important; -webkit-text-fill-color: transparent !important; }
    .light-theme .nav-item { color: #5a7362 !important; }
    .light-theme .nav-item:hover, .light-theme .nav-item.active { background: rgba(0,200,83,0.08) !important; color: #00c853 !important; }
    .light-theme .upload-zone { background: rgba(0,200,83,0.02) !important; border-color: rgba(0,200,83,0.2) !important; }
    .light-theme .upload-zone:hover { background: rgba(0,200,83,0.05) !important; border-color: #00c853 !important; }
    .light-theme .checkbox-custom { background: rgba(0,0,0,0.05) !important; }
    .light-theme .checkbox-custom.checked { background: linear-gradient(135deg, #00c853 0%, #009688 100%) !important; }
    .light-theme .checkbox-custom.checked::after { color: #fff !important; }
    .light-theme .progress-bar { background: rgba(0,0,0,0.08) !important; }
    .light-theme .tab-btn { color: #5a7362 !important; }
    .light-theme .tab-btn.active { color: #00c853 !important; }
    .light-theme .option-btn { background: rgba(0,0,0,0.03) !important; color: #5a7362 !important; }
    .light-theme .option-btn.selected { background: rgba(0,200,83,0.1) !important; border-color: #00c853 !important; color: #00c853 !important; }

    .clash { font-family: 'Clash Display', sans-serif; }
    .grotesk { font-family: 'Space Grotesk', sans-serif; }

    @keyframes pulse-ring { 0%,100%{transform:scale(0.95);box-shadow:0 0 0 0 rgba(168,255,62,0.4)} 70%{transform:scale(1);box-shadow:0 0 0 12px rgba(168,255,62,0)} }
    @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
    @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
    @keyframes spin-slow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
    @keyframes glow-pulse { 0%,100%{opacity:0.4} 50%{opacity:1} }
    @keyframes slide-up { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
    @keyframes orb-drift { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(30px,-20px) scale(1.05)} 66%{transform:translate(-20px,15px) scale(0.95)} }
    @keyframes spinner-rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    @keyframes fade-in { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }

    .animate-slide-up { animation: slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
    .animate-float { animation: float 6s ease-in-out infinite; }
    .animate-spin-slow { animation: spin-slow 12s linear infinite; }
    .animate-glow { animation: glow-pulse 3s ease-in-out infinite; }
    .animate-fade {opacity: 0; animation: fade-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }

    .shimmer-text {
      background: linear-gradient(90deg, #a8ff3e 0%, #00ffc8 25%, #a8ff3e 50%, #00ffc8 75%, #a8ff3e 100%);
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: shimmer 3s linear infinite;
    }

    .glass {
      background: rgba(255,255,255,0.025);
      border: 1px solid rgba(255,255,255,0.07);
      border-radius: 20px;
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
    }
    .glass-bright {
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(168,255,62,0.08);
      border-radius: 20px;
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
    }

    .btn-primary {
      background: linear-gradient(135deg, #a8ff3e 0%, #00ffc8 100%);
      color: #080c0a; border: none; border-radius: 12px;
      padding: 12px 24px; font-weight: bold; cursor: pointer;
      position: relative; overflow: hidden; transition: all 0.3s ease;
      display: inline-flex; align-items: center; justify-content: center; gap: 8px;
    }
    .btn-primary::after {
      content: ''; position: absolute; top:0; left:0; width:100%; height:100%;
      background: rgba(255,255,255,0.2); opacity: 0; transition: opacity 0.3s;
    }
    .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 4px 16px rgba(168,255,62,0.3); }
    .btn-primary:hover::after { opacity: 1; }
    .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; transform: none; box-shadow: none; }

    .btn-ghost {
      background: transparent; color: #a8ff3e;
      border: 1px solid rgba(168,255,62,0.5);
      border-radius: 12px; padding: 12px 24px;
      font-weight: bold; cursor: pointer; transition: all 0.3s ease;
      display: inline-flex; align-items: center; justify-content: center; gap: 8px;
    }
    .btn-ghost:hover { background: rgba(168,255,62,0.1); border-color: #a8ff3e; }
    .btn-ghost:disabled { opacity: 0.5; cursor: not-allowed; hover: none; }

    .nav-item {
      color: #6b8a72; display: flex; align-items: center; gap: 12px;
      padding: 12px 16px; border-radius: 12px; cursor: pointer; transition: all 0.2s;
      border: 1px solid transparent; font-weight: 500;
    }
    .nav-item:hover { color: #c8e8cc; background: rgba(255,255,255,0.02); }
    .nav-item.active {
      background: rgba(168,255,62,0.05); color: #a8ff3e;
      border: 1px solid rgba(168,255,62,0.1);
    }

    .meal-card {
      background: rgba(255,255,255,0.025);
      border: 1px solid rgba(255,255,255,0.07);
      border-radius: 20px; padding: 22px 24px; transition: all 0.3s;
      position: relative; overflow: hidden;
    }
    .meal-card .recipe-overlay {
      position: absolute; top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(8,12,10,0.85); backdrop-filter: blur(4px);
      display: flex; align-items: center; justify-content: center;
      opacity: 0; transition: opacity 0.3s ease; z-index: 10;
      cursor: pointer;
    }
    .meal-card:hover .recipe-overlay { opacity: 1; }
    .meal-card::before {
      content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 1px;
      background: linear-gradient(90deg, transparent, rgba(168,255,62,0.5), transparent);
      opacity: 0; transition: opacity 0.3s;
    }
    .meal-card:hover { transform: translateY(-2px); border-color: rgba(168,255,62,0.15); box-shadow: 0 8px 32px rgba(0,0,0,0.5); }
    .meal-card:hover::before { opacity: 1; animation: shimmer 2s linear infinite; background-size: 200%; }

    .tab-btn {
      background: rgba(255,255,255,0.05); border: 1px solid transparent;
      color: #6b8a72; border-radius: 99px; padding: 8px 16px;
      cursor: pointer; transition: all 0.2s; white-space: nowrap; font-weight: 500;
    }
    .tab-btn.active {
      background: rgba(168,255,62,0.1); border-color: rgba(168,255,62,0.3);
      color: #a8ff3e;
    }

    .option-btn {
      background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1);
      color: #c8e8cc; border-radius: 99px; padding: 10px 20px;
      cursor: pointer; transition: all 0.2s; font-weight: 500;
    }
    .option-btn:hover { background: rgba(255,255,255,0.06); }
    .option-btn.selected {
      background: rgba(168,255,62,0.1); border-color: #a8ff3e;
      color: #a8ff3e; box-shadow: 0 0 12px rgba(168,255,62,0.2);
    }

    .checkbox-custom {
      width: 20px; height: 20px; border-radius: 6px;
      border: 1px solid rgba(255,255,255,0.2); background: rgba(0,0,0,0.2);
      display: inline-flex; align-items: center; justify-content: center;
      transition: all 0.2s; cursor: pointer; flex-shrink: 0;
    }
    .checkbox-custom.checked {
      background: linear-gradient(135deg, #a8ff3e 0%, #00ffc8 100%);
      border-color: transparent;
    }
    .checkbox-custom.checked::after {
      content: '✓'; color: #080c0a; font-size: 14px; font-weight: bold;
    }

    .upload-zone {
      border: 2px dashed rgba(168,255,62,0.3); border-radius: 20px;
      background: rgba(168,255,62,0.02); display: flex; align-items: center;
      justify-content: center; flex-direction: column; cursor: pointer;
      transition: all 0.3s; min-height: 250px;
    }
    .upload-zone:hover { transform: scale(1.02); background: rgba(168,255,62,0.05); border-color: rgba(168,255,62,0.6); }

    .progress-bar {
      background: rgba(255,255,255,0.05); border-radius: 99px; height: 6px; width: 100%;
      position: relative; overflow: visible;
    }
    .progress-fill {
      height: 100%; border-radius: 99px;
      transition: width 0.3s ease; position: relative;
    }
    .progress-fill::after {
      content: ''; position: absolute; right: 0; top: 50%; transform: translate(50%, -50%);
      width: 10px; height: 10px; border-radius: 50%; background: #fff;
    }

    .stat-card {
      background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05);
      border-radius: 16px; padding: 20px; transition: all 0.3s; position: relative; overflow: hidden;
    }
    .stat-card:hover { border-color: rgba(168,255,62,0.3); background: rgba(168,255,62,0.02); }

    .event-pill {
      background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05);
      border-radius: 16px; padding: 16px; flex: 1; display: flex; align-items: center; gap: 16px;
    }

    ::-webkit-scrollbar { width: 4px; height: 4px; }
    ::-webkit-scrollbar-track { background: rgba(0,0,0,0.2); }
    ::-webkit-scrollbar-thumb { background: rgba(168,255,62,0.3); border-radius: 4px; }
    ::-webkit-scrollbar-thumb:hover { background: rgba(168,255,62,0.6); }

    input, textarea {
      background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1);
      color: #e8f0eb; border-radius: 12px; padding: 12px 16px; font-family: inherit;
      transition: all 0.2s; outline: none; width: 100%;
    }
    input:focus, textarea:focus {
      border-color: #a8ff3e; box-shadow: 0 0 0 1px rgba(168,255,62,0.3);
    }
  `}</style>
);

export const Orbs = ({ theme }: any) => (
  <div style={{ position:'fixed', top:0, left:0, width:'100%', height:'100%', pointerEvents:'none', overflow:'hidden', zIndex: 0 }}>
    {theme === 'light' ? (
      <>
        <div style={{ position:'absolute', top:'-20%', left:'-10%', width:'60%', height:'60%', borderRadius:'50%', background:'radial-gradient(circle, rgba(0,200,83,0.15) 0%, transparent 70%)', filter:'blur(40px)', animation:'orb-drift 15s ease-in-out infinite' }} />
        <div style={{ position:'absolute', bottom:'-20%', right:'-10%', width:'50%', height:'50%', borderRadius:'50%', background:'radial-gradient(circle, rgba(0,184,255,0.1) 0%, transparent 70%)', filter:'blur(40px)', animation:'orb-drift 18s ease-in-out infinite reverse' }} />
        <div style={{ position:'absolute', top:'30%', left:'40%', width:'40%', height:'40%', borderRadius:'50%', background:'radial-gradient(circle, rgba(255,184,48,0.08) 0%, transparent 70%)', filter:'blur(50px)', animation:'float 10s ease-in-out infinite' }} />
        <div style={{ position:'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(247,250,248,0.8) 100%)' }} />
      </>
    ) : (
      <>
        <div style={{ position:'absolute', top:'-10%', left:'-5%', width:'300px', height:'300px', borderRadius:'50%', background:'rgba(168,255,62,0.06)', filter:'blur(60px)', animation:'orb-drift 12s ease-in-out infinite' }} />
        <div style={{ position:'absolute', bottom:'-10%', right:'-5%', width:'200px', height:'200px', borderRadius:'50%', background:'rgba(0,255,200,0.05)', filter:'blur(60px)', animation:'orb-drift 12s ease-in-out infinite', animationDelay:'-4s' }} />
        <div style={{ position:'absolute', top:'40%', right:'-5%', width:'160px', height:'160px', borderRadius:'50%', background:'rgba(168,255,62,0.04)', filter:'blur(60px)', animation:'orb-drift 12s ease-in-out infinite', animationDelay:'-8s' }} />
      </>
    )}
  </div>
);

function useLocalStorage(key: string, initialValue: any) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch(err) { return initialValue; }
  });
  const setValue = (value: any) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) { console.log(error); }
  };
  return [storedValue, setValue];
}

const Card = ({ children, style = {}, className = '', bright = false, ...rest }: any) => (
  <div className={`${bright ? 'glass-bright' : 'glass'} ${className}`} style={{ padding: '22px 24px', ...style }} {...rest}>
    {children}
  </div>
);

const Btn = ({ children, variant = 'primary', size = 'md', className = '', ...rest }: any) => {
  const cls = variant === 'primary' ? 'btn-primary' : 'btn-ghost';
  const sizeStyle = size === 'sm' ? { padding: '8px 16px', fontSize: '13px' } : {};
  return <button className={`${cls} ${className}`} style={sizeStyle} {...rest}>{children}</button>;
};

const Progress = ({ value, max, color = 'lime', style={} }: any) => {
  const cmap: any = { lime: '#a8ff3e', teal: '#00ffc8', amber: '#ffb830', red: '#ff7043', blue: '#00b8ff', violet: '#c084fc', pink: '#ff7043' };
  const hex = cmap[color] || cmap.lime;
  const pct = Math.min(100, Math.max(0, (value / max) * 100)) || 0;
  return (
    <div className="progress-bar" style={style}>
      <div className="progress-fill" style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${hex}, transparent)` }}>
        <style>{`
          .progress-fill::after { box-shadow: 0 0 12px ${hex}; }
        `}</style>
      </div>
    </div>
  );
};

// --- DATA & AI FUNCTIONS ---
const calcNutrition = (u: any) => {
  const bmr = (10 * u.weight) + (6.25 * u.height) - (5 * u.age) + (u.gender === 'Male' ? 5 : -161);
  const act: any = { 'Sedentary': 1.2, 'Lightly Active': 1.375, 'Moderate': 1.55, 'Very Active': 1.725, 'Athlete': 1.9 };
  const tdee = bmr * (act[u.activity] || 1.2);
  const mod: any = { 'Fat Loss': -400, 'Muscle Gain': 300, 'Maintenance': 0, 'Recomposition': -150 };
  const cals = tdee + (mod[u.goal] || 0);
  const pMul = u.goal === 'Fat Loss' ? 2.4 : u.goal === 'Muscle Gain' ? 2.2 : 1.8;
  const p = u.weight * pMul;
  const f = (cals * 0.25) / 9;
  const c = (cals - (p*4) - (f*9)) / 4;
  const w = u.weight * 0.033;
  return { calories: Math.round(cals), protein: Math.round(p), carbs: Math.round(c), fat: Math.round(f), water: Math.round(w*10)/10 };
};

const extractJSON = (text: string) => {
  try {
    if (!text) throw new Error("Empty response");
    let cleaned = text.replace(/```json/gi, '').replace(/```/g, '').trim();
    const start = cleaned.indexOf('{');
    const end = cleaned.lastIndexOf('}');
    if (start === -1 || end === -1) throw new Error("Invalid schema format");
    return JSON.parse(cleaned.substring(start, end + 1));
  } catch(e) {
    console.error("JSON extraction error:", e, text);
    throw e;
  }
};

// --- COMPONENTS ---

const LandingPage = ({ setPage, theme }: any) => (
  <div style={{ minHeight: '100vh', position: 'relative', zIndex: 1 }}>
    <GlobalStyles theme={theme} />
    <Orbs theme={theme} />
    <nav style={{ position: 'sticky', top: 0, padding: '20px 40px', backdropFilter: 'blur(20px)', zIndex: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ width: 36, height: 36, background: 'linear-gradient(135deg, #a8ff3e, #00ffc8)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#080c0a', fontSize: '20px', fontWeight: 'bold' }}>⬡</div>
        <div className="clash" style={{ fontSize: '20px', fontWeight: 600 }}>MealFit AI</div>
      </div>
      <Btn variant="ghost" onClick={() => setPage('onboarding')}>Build My Plan ↗</Btn>
    </nav>
    <main style={{ maxWidth: '1000px', margin: '80px auto', padding: '0 20px', textAlign: 'center' }} className="animate-slide-up">
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(168,255,62,0.05)', padding: '6px 16px', borderRadius: '99px', border: '1px solid rgba(168,255,62,0.2)', marginBottom: '32px' }}>
        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#a8ff3e', animation: 'pulse-ring 2s infinite' }}></div>
        <span className="grotesk" style={{ color: '#a8ff3e', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>POWERED BY RISHFLOW</span>
      </div>
      <h1 className="clash" style={{ fontSize: '80px', fontWeight: 700, letterSpacing: '-3px', lineHeight: 1.1, margin: '0 0 24px 0' }}>
        Your body.<br/><span className="shimmer-text">Reimagined.</span>
      </h1>
      <p style={{ fontSize: '18px', color: '#6b8a72', maxWidth: '500px', margin: '0 auto 40px auto', lineHeight: 1.6 }}>
        The biopunk health OS that engineers your perfect physique. High-precision macros, intelligent scheduling, and vision-based tracking.
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '80px' }}>
        <Btn onClick={() => setPage('onboarding')} style={{ padding: '16px 32px', fontSize: '16px' }}>⬡ Build My Plan</Btn>
        <Btn variant="ghost" style={{ padding: '16px 32px', fontSize: '16px' }}>Watch Demo ↗</Btn>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-around', padding: '40px 0', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', marginBottom: '80px' }}>
        {[
          { v: '10K+', l: 'Users' },
          { v: '< 3min', l: 'Plan Gen' },
          { v: '99.2%', l: 'Accuracy' },
          { v: '7-Day', l: 'Full Plans' }
        ].map(s => (
          <div key={s.l}>
            <div className="clash" style={{ fontSize: '36px', color: '#a8ff3e', fontWeight: 600 }}>{s.v}</div>
            <div className="grotesk" style={{ fontSize: '12px', color: '#6b8a72', textTransform: 'uppercase', letterSpacing: '1px' }}>{s.l}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', textAlign: 'left', marginBottom: '80px' }}>
        {[
          { i: '◈', t: 'Precision Macros', d: 'Mifflin-St Jeor accuracy tuned to your exact biology.' },
          { i: '◷', t: 'Auto-Scheduling', d: 'Perfectly timed nutrition around your circadian rhythm.' },
          { i: '◉', t: 'Vision Tracking', d: 'Snap a photo. We extract everything instantly.' },
          { i: '◫', t: 'Dynamic Lists', d: 'Groceries compiled and categorized automatically.' },
          { i: '◯', t: 'Smart Substitutes', d: 'Don\'t like a meal? Evolve it with one tap.' },
          { i: '✦', t: 'Living OS', d: 'Your personal command center for physical supremacy.' }
        ].map(f => (
          <div key={f.t} className="meal-card" style={{ padding: '32px' }}>
            <div style={{ fontSize: '32px', color: '#a8ff3e', marginBottom: '16px', textShadow: '0 0 12px rgba(168,255,62,0)' }} className="icon-hover-glow transition">{f.i}</div>
            <h3 className="grotesk" style={{ fontSize: '18px', margin: '0 0 8px 0', color: '#e8f0eb' }}>{f.t}</h3>
            <p style={{ margin: 0, color: '#6b8a72', fontSize: '14px', lineHeight: 1.5 }}>{f.d}</p>
            <style>{`.icon-hover-glow:hover { text-shadow: 0 0 12px #a8ff3e !important; }`}</style>
          </div>
        ))}
      </div>

      <div className="glass-bright" style={{ padding: '64px 40px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-50%', left: '-20%', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(168,255,62,0.1)', filter: 'blur(80px)' }}></div>
        <h2 className="clash" style={{ fontSize: '48px', margin: '0 0 16px 0', position: 'relative', zIndex: 1 }}>Ready to evolve?</h2>
        <p style={{ color: '#6b8a72', fontSize: '18px', margin: '0 auto 32px auto', maxWidth: '400px', position: 'relative', zIndex: 1 }}>Deploy your personalized dietary matrix in seconds.</p>
        <Btn style={{ position: 'relative', zIndex: 1 }} onClick={() => setPage('onboarding')}>⬡ Initialize Protocol</Btn>
      </div>
    </main>
  </div>
);

const InputRow = ({ label, children }: any) => (
  <div style={{ marginBottom: '24px' }}>
    <label className="grotesk" style={{ display: 'block', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.5px', color: '#6b8a72', fontWeight: 500, marginBottom: '8px' }}>{label}</label>
    {children}
  </div>
);

const Onboarding = ({ setUser, onComplete, theme }: any) => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<any>({ name: '', workoutDays: 3, mealsPerDay: 3, age: '', weight: '', height: '' });
  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState('');
  const steps = ["Your Biology", "Goals & Training", "Food Preferences", "Your Schedule"];

  const setVal = (k: string, v: any) => setData({ ...data, [k]: v });

  const msgs = ["Calculating your BMR & TDEE…", "Crafting 7-day meal plan…", "Building weekly schedule…", "Compiling grocery list…", "Finalising your plan…"];

  useEffect(() => {
    let int: any;
    if (loading) {
      let i = 0;
      setLoadingMsg(msgs[0]);
      int = setInterval(() => {
        i++;
        if (i < msgs.length) setLoadingMsg(msgs[i]);
      }, 1800);
    }
    return () => clearInterval(int);
  }, [loading]);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const nut = calcNutrition({ ...data, age: Number(data.age), weight: Number(data.weight), height: Number(data.height) });
      const fullProf = { ...data, nutrition: nut };
      const mealPrompt = `You are an AI nutrition planner. Build a 7-day meal plan and grocery list for a user with these details: ${JSON.stringify(fullProf)}. Return ONLY raw JSON. Example format: { "days": [ { "day": "Monday", "meals": [ { "type": "Breakfast", "name": "...", "calories": 400, "protein": 20, "carbs": 50, "fat": 10, "prepTime": 10, "prepNote": "..." } ], "workoutNote": "Leg day" } ], "groceryList": { "Produce": [], "Protein": [], "Grains": [], "Dairy": [], "Pantry": [] }, "mealPrepTips": ["..."] }`;
      
      const mealRes = await fetch('/api/gen-meal-plan', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({prompt: mealPrompt}) });
      const mealData = await mealRes.json();
      const mealPlan = extractJSON(mealData.text);

      const schedPrompt = `Build a 7-day schedule. User details: ${JSON.stringify(fullProf)}. Return ONLY raw JSON. Format: { "schedule": { "Monday": [ { "time": "08:00", "type": "meal", "title": "Breakfast", "duration": 30, "note": "Eat" } ] } }`;
      const schedRes = await fetch('/api/gen-schedule', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({prompt: schedPrompt}) });
      let schedulePlan = { schedule: {} };
      if(schedRes.ok) {
        try { schedulePlan = extractJSON((await schedRes.json()).text); } catch(e){}
      }

      setUser({ ...fullProf, mealPlan, weeklySchedule: schedulePlan });
      onComplete();
    } catch (e: any) {
      alert(e.message || "Error generating plan.");
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#080c0a' }}>
        <GlobalStyles theme={theme} /><Orbs theme={theme} />
        <div style={{ position: 'relative', width: '80px', height: '80px', marginBottom: '32px' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', borderRadius: '50%', border: '4px solid rgba(168,255,62,0.15)' }}></div>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', borderRadius: '50%', border: '4px solid transparent', borderTopColor: '#a8ff3e', animation: 'spinner-rotate 1s linear infinite' }}></div>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: '#a8ff3e', fontSize: '24px' }}>⬡</div>
        </div>
        <h2 className="clash" style={{ fontSize: '32px', margin: '0 0 16px 0', zIndex: 1 }}>Building Your Plan</h2>
        <div style={{ color: '#6b8a72', fontSize: '14px', marginBottom: '32px', zIndex: 1 }} className="grotesk">{loadingMsg}</div>
        <div style={{ width: '280px', zIndex: 1 }}>
          <Progress value={msgs.indexOf(loadingMsg)+1} max={5} color="lime" />
        </div>
        <div style={{ display: 'flex', gap: '8px', marginTop: '16px', zIndex: 1 }}>
          {[0,1,2,3,4].map(i => <div key={i} style={{ width: '6px', height: '6px', borderRadius: '50%', background: i <= msgs.indexOf(loadingMsg) ? '#a8ff3e' : 'rgba(255,255,255,0.1)' }} />)}
        </div>
      </div>
    );
  }



  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', zIndex: 1 }}>
      <GlobalStyles /><Orbs />
      <Card style={{ width: '100%', maxWidth: '540px', padding: '40px' }}>
        <div style={{ display: 'flex', gap: '4px', marginBottom: '32px' }}>
          {[1,2,3,4].map(s => <div key={s} style={{ height: '3px', flex: 1, borderRadius: '99px', background: s <= step ? '#a8ff3e' : 'rgba(255,255,255,0.1)' }} />)}
        </div>
        <h2 className="clash" style={{ fontSize: '28px', color: '#e8f0eb', margin: '0 0 8px 0' }}>{steps[step-1]}</h2>
        <p style={{ color: '#6b8a72', fontSize: '14px', marginBottom: '32px' }}>Step {step} of 4</p>

        {step === 1 && (
          <div className="animate-slide-up">
            <div style={{ display: 'flex', gap: '20px' }}>
              <div style={{ flex: 1.5 }}><InputRow label="Name"><input type="text" value={data.name} onChange={e => setVal('name', e.target.value)} placeholder="e.g. Alex" /></InputRow></div>
              <div style={{ flex: 1 }}><InputRow label="Age"><input type="number" value={data.age} onChange={e => setVal('age', e.target.value)} placeholder="e.g. 28" /></InputRow></div>
            </div>
            <InputRow label="Gender">
              <div style={{ display: 'flex', gap: '12px' }}>
                {['Male','Female','Other'].map(g => <div key={g} className={`option-btn ${data.gender===g?'selected':''}`} onClick={() => setVal('gender', g)}>{g}</div>)}
              </div>
            </InputRow>
            <div style={{ display: 'flex', gap: '20px' }}>
              <div style={{ flex: 1 }}><InputRow label="Height (cm)"><input type="number" value={data.height} onChange={e => setVal('height', e.target.value)} /></InputRow></div>
              <div style={{ flex: 1 }}><InputRow label="Weight (kg)"><input type="number" value={data.weight} onChange={e => setVal('weight', e.target.value)} /></InputRow></div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-slide-up">
            <InputRow label="Activity Level">
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {['Sedentary','Lightly Active','Moderate','Very Active','Athlete'].map(g => <div key={g} className={`option-btn ${data.activity===g?'selected':''}`} onClick={()=>setVal('activity', g)}>{g}</div>)}
              </div>
            </InputRow>
            <InputRow label="Primary Goal">
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {['Fat Loss','Muscle Gain','Maintenance','Recomposition'].map(g => <div key={g} className={`option-btn ${data.goal===g?'selected':''}`} onClick={()=>setVal('goal', g)}>{g}</div>)}
              </div>
            </InputRow>
            <InputRow label={`Workout Days/Week: ${data.workoutDays}`}>
              <input type="range" min="0" max="7" value={data.workoutDays} onChange={e => setVal('workoutDays', e.target.value)} style={{ width: '100%', accentColor: '#a8ff3e' }}/>
            </InputRow>
          </div>
        )}

        {step === 3 && (
          <div className="animate-slide-up">
            <InputRow label="Diet Type & Preferences">
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '12px' }}>
                {['Vegetarian','Non-Veg','Both'].map(g => <div key={g} className={`option-btn ${data.diet===g?'selected':''}`} onClick={()=>setVal('diet', g)}>{g}</div>)}
              </div>
              <input type="text" value={data.diet||''} onChange={e => setVal('diet', e.target.value)} placeholder="Or specify (Keto, Indian, Vegan...)" />
            </InputRow>
            <InputRow label="Allergies"><input type="text" value={data.allergies||''} onChange={e => setVal('allergies', e.target.value)} placeholder="e.g. Peanuts, Shellfish" /></InputRow>
            <InputRow label="Dislikes"><input type="text" value={data.dislikes||''} onChange={e => setVal('dislikes', e.target.value)} placeholder="e.g. Tomatoes, Mushrooms" /></InputRow>
            <InputRow label="Budget">
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {['Budget','Moderate','Flexible'].map(g => <div key={g} className={`option-btn ${data.budget===g?'selected':''}`} onClick={()=>setVal('budget', g)}>{g}</div>)}
              </div>
            </InputRow>
          </div>
        )}
        
        {step === 4 && (
          <div className="animate-slide-up">
            <InputRow label={`Meals Per Day: ${data.mealsPerDay}`}>
              <input type="range" min="2" max="6" value={data.mealsPerDay} onChange={e => setVal('mealsPerDay', e.target.value)} style={{ width: '100%', accentColor: '#a8ff3e' }}/>
            </InputRow>
            <div style={{ display: 'flex', gap: '20px' }}>
              <div style={{ flex: 1 }}><InputRow label="Wake Time"><input type="time" value={data.wakeTime||''} onChange={e => setVal('wakeTime', e.target.value)} /></InputRow></div>
              <div style={{ flex: 1 }}><InputRow label="Sleep Time"><input type="time" value={data.sleepTime||''} onChange={e => setVal('sleepTime', e.target.value)} /></InputRow></div>
            </div>
            <InputRow label="Work Schedule"><input type="text" value={data.workSchedule||''} onChange={e => setVal('workSchedule', e.target.value)} placeholder="e.g. 9am to 5pm" /></InputRow>
            <InputRow label="Preferred Workout Time">
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {['Morning','Afternoon','Evening','Night'].map(g => <div key={g} className={`option-btn ${data.workoutTime===g?'selected':''}`} onClick={()=>setVal('workoutTime', g)}>{g}</div>)}
              </div>
            </InputRow>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '24px', marginTop: '32px' }}>
          {step > 1 ? <Btn variant="ghost" onClick={()=>setStep(s=>s-1)}>← Back</Btn> : <div></div>}
          {step < 4 ? <Btn onClick={()=>setStep(s=>s+1)}>Continue ↗</Btn> : <Btn onClick={handleGenerate}>Initialize Protocol ⬡</Btn>}
        </div>
      </Card>
    </div>
  );
};

const Sidebar = ({ page, setPage, user }: any) => {
  const navs = [
    { id: 'dashboard', i: '⬡', l: 'Dashboard' },
    { id: 'mealplan', i: '◈', l: 'Meal Plan' },
    { id: 'schedule', i: '◷', l: 'Schedule' },
    { id: 'tracker', i: '◉', l: 'Food Tracker' },
    { id: 'grocery', i: '◫', l: 'Grocery List' },
    { id: 'profile', i: '◯', l: 'Profile' }
  ];
  return (
    <div style={{ width: '220px', background: 'rgba(8,12,10,0.95)', borderRight: '1px solid rgba(168,255,62,0.08)', position: 'sticky', top: 0, height: '100vh', display: 'flex', flexDirection: 'column', padding: '32px 20px', zIndex: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '48px', paddingLeft: '8px' }}>
        <div style={{ color: '#a8ff3e', fontSize: '24px', textShadow: '0 0 12px rgba(168,255,62,0.5)' }}>⬡</div>
        <div className="clash" style={{ fontSize: '18px', fontWeight: 600, color: '#e8f0eb' }}>MealFit AI</div>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {navs.map(n => (
          <div key={n.id} className={`nav-item ${page === n.id ? 'active' : ''}`} onClick={() => setPage(n.id)}>
            <span style={{ fontSize: '18px', width: '24px', textAlign: 'center' }}>{n.i}</span>
            <span>{n.l}</span>
          </div>
        ))}
      </div>
      {user?.nutrition && (
        <div className="glass-bright" style={{ padding: '20px', marginTop: 'auto', background: 'rgba(168,255,62,0.03)' }}>
          <div className="grotesk" style={{ fontSize: '10px', textTransform: 'uppercase', color: '#6b8a72', marginBottom: '8px' }}>Daily Target</div>
          <div className="clash" style={{ fontSize: '26px', color: '#a8ff3e', margin: '0 0 12px 0' }}>{user.nutrition.calories} <span style={{fontSize:'14px', color:'#6b8a72'}}>kcal</span></div>
          <div style={{ display: 'flex', gap: '8px', fontSize: '11px', fontWeight: 600 }}>
            <span style={{ color: '#00ffc8' }}>P{user.nutrition.protein}</span>
            <span style={{ color: '#ffb830' }}>C{user.nutrition.carbs}</span>
            <span style={{ color: '#ff7043' }}>F{user.nutrition.fat}</span>
          </div>
        </div>
      )}
    </div>
  );
};

const Dashboard = ({ user, setUser, trackerLog, setPage }: any) => {
  const today = trackerLog.filter((l: any) => new Date(l.date).toDateString() === new Date().toDateString());
  const cals = today.reduce((s: number,l: any) => s + (l.totals?.calories||0), 0);
  const pro = today.reduce((s: number,l: any) => s + (l.totals?.protein||0), 0);
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good Morning' : hour < 18 ? 'Good Afternoon' : 'Good Evening';
  const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const todayMeals = user.mealPlan?.days?.find((d: any) => d.day === days[new Date().getDay()])?.meals || [];

  const [watchSync, setWatchSync] = useState(user.watchConnected || false);
  const [heartRate, setHeartRate] = useState(72);
  const activeBurn = Math.floor(user.activeBurn || 0);

  useEffect(() => {
    let int: any;
    if (watchSync) {
      int = setInterval(() => {
        setHeartRate(prev => {
          const change = Math.floor(Math.random() * 5) - 2;
          return Math.max(60, Math.min(160, prev + change));
        });
        setUser((u: any) => ({ ...u, activeBurn: (u.activeBurn || 320) + (Math.random() * 1.5) }));
      }, 2000);
    }
    return () => clearInterval(int);
  }, [watchSync, setUser]);

  const handleWatchSync = () => {
    const nextState = !watchSync;
    setWatchSync(nextState);
    setUser({...user, watchConnected: nextState, activeBurn: nextState ? (user.activeBurn || 320) : user.activeBurn });
  };

  return (
    <div className="animate-fade" style={{ padding: '40px' }}>
      <div style={{ marginBottom: '40px' }}>
        <h1 className="clash" style={{ fontSize: '36px', margin: '0 0 8px 0', color: '#e8f0eb' }}>{greeting}{user.name ? `, ${user.name}` : ''} 👋</h1>
        <div className="grotesk" style={{ fontSize: '12px', textTransform: 'uppercase', color: '#6b8a72', letterSpacing: '1px', marginBottom: '4px' }}>{new Date().toLocaleDateString(undefined, {weekday:'long', month:'long', day:'numeric'})}</div>
        <div style={{ color: '#c8e8cc', fontSize: '14px' }}>Logged {cals} of {user.nutrition.calories} kcal target today. {watchSync && <span style={{ color: '#ff7043' }}>(+{activeBurn} kcal active burn)</span>}</div>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '40px' }}>
        {[
          { l: 'Calories', v: cals, t: user.nutrition.calories, u: 'kcal', i: '⬡', c: 'lime' },
          { l: 'Protein', v: pro, t: user.nutrition.protein, u: 'g', i: '◈', c: 'teal' },
          { l: 'Water', v: 0, t: user.nutrition.water, u: 'L', i: '◯', c: 'blue' },
          { l: 'Active Burn', v: activeBurn, t: 800, u: 'kcal', i: '♥', c: 'pink' }
        ].map(s => (
          <div key={s.l} className="stat-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div className="grotesk" style={{ fontSize: '10px', textTransform: 'uppercase', color: '#6b8a72', letterSpacing: '1px' }}>{s.l}</div>
              <div style={{ color: (()=> {
                if(s.c==='lime') return '#a8ff3e'; if(s.c==='teal') return '#00ffc8';
                if(s.c==='blue') return '#00b8ff'; return '#ff7043';
              })(), fontSize: '14px' }}>{s.i}</div>
            </div>
            <div className="clash" style={{ fontSize: '32px', color: (()=> {
                if(s.c==='lime') return '#a8ff3e'; if(s.c==='teal') return '#00ffc8';
                if(s.c==='blue') return '#00b8ff'; return '#ff7043';
              })(), margin: '0 0 16px 0' }}>{s.v} <span style={{ fontSize: '14px', color: '#6b8a72' }}>/ {s.t} {s.u}</span></div>
            <Progress value={s.v} max={s.t} color={s.c} />
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '32px' }}>
        <div className="glass" style={{ padding: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h2 className="clash" style={{ fontSize: '24px', margin: 0 }}>Today's Matrix</h2>
            <Btn variant="ghost" size="sm" onClick={() => setPage('mealplan')}>View Week ↗</Btn>
          </div>
          {todayMeals.length === 0 ? <div style={{ color: '#6b8a72' }}>No meals allocated.</div> : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {todayMeals.map((m: any, i: number) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: i < todayMeals.length-1 ? '16px' : 0, borderBottom: i < todayMeals.length-1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                  <div>
                    <div className="grotesk" style={{ fontSize: '10px', color: '#6b8a72', textTransform: 'uppercase', marginBottom: '4px' }}>{m.type}</div>
                    <div style={{ fontSize: '16px', color: '#c8e8cc', fontWeight: 500 }}>{m.name}</div>
                    {m.prepNote && <div style={{ fontSize: '12px', color: '#4a6652', fontStyle: 'italic', marginTop: '4px' }}>{m.prepNote}</div>}
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div className="clash" style={{ color: '#a8ff3e', fontSize: '18px' }}>{m.calories} <span style={{ fontSize: '12px', color: '#6b8a72' }}>kcal</span></div>
                    <div style={{ fontSize: '12px', color: '#6b8a72' }}>P: {m.protein}g</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="glass-bright" style={{ padding: '32px', background: 'linear-gradient(135deg, rgba(168,255,62,0.05) 0%, transparent 100%)' }}>
            <h3 className="grotesk" style={{ fontSize: '12px', color: '#a8ff3e', textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 16px 0' }}>Macro Overview</h3>
            <div className="clash" style={{ fontSize: '42px', color: '#a8ff3e', margin: '0 0 24px 0', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '16px' }}>{user.nutrition.calories + (watchSync ? activeBurn : 0)} <span style={{fontSize:'16px', color:'#6b8a72'}}>kcal target</span></div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              <div><div className="grotesk" style={{ fontSize:'10px', color:'#6b8a72' }}>PROTEIN</div><div style={{ color:'#00ffc8', fontWeight:'bold' }}>{user.nutrition.protein}g</div></div>
              <div><div className="grotesk" style={{ fontSize:'10px', color:'#6b8a72' }}>CARBS</div><div style={{ color:'#ffb830', fontWeight:'bold' }}>{user.nutrition.carbs}g</div></div>
              <div><div className="grotesk" style={{ fontSize:'10px', color:'#6b8a72' }}>FAT</div><div style={{ color:'#ff7043', fontWeight:'bold' }}>{user.nutrition.fat}g</div></div>
            </div>
          </div>
          
          <div className="glass" style={{ padding: '32px', border: watchSync ? '1px solid rgba(255, 112, 67, 0.3)' : undefined, transition: 'all 0.3s' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 className="grotesk" style={{ fontSize: '12px', color: '#c8e8cc', textTransform: 'uppercase', margin: 0 }}>HealthKit Sync</h3>
              <Btn variant="ghost" size="sm" onClick={handleWatchSync} style={{ borderColor: watchSync ? '#ff7043' : '', color: watchSync ? '#ff7043' : '' }}>
                {watchSync ? 'Disconnect ✕' : 'Connect Watch ↗'}
              </Btn>
            </div>
            {watchSync ? (
              <div style={{ display: 'flex', gap: '24px', alignItems: 'center', marginTop: '16px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(255, 112, 67, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ff7043', fontSize: '24px' }} className="animate-glow">♥</div>
                <div>
                  <div className="clash" style={{ fontSize: '24px', color: '#ff7043' }}>{heartRate} <span style={{fontSize:'12px', color:'#6b8a72'}}>BPM</span></div>
                  <div className="grotesk" style={{ fontSize: '10px', textTransform: 'uppercase', color: '#6b8a72' }}>Live Telemetry Active</div>
                </div>
              </div>
            ) : (
              <div style={{ color: '#6b8a72', fontSize: '13px', lineHeight: 1.5 }}>Link your Apple Watch to stream realtime biometric data and dynamically adjust macro targets.</div>
            )}
          </div>

          <div className="glass" style={{ padding: '32px' }}>
            <h3 className="grotesk" style={{ fontSize: '12px', color: '#c8e8cc', textTransform: 'uppercase', margin: '0 0 16px 0' }}>Prep Directives</h3>
            {user.mealPlan?.mealPrepTips?.map((tip: string, i: number) => (
              <div key={i} style={{ display: 'flex', gap: '12px', marginBottom: '12px', color: '#6b8a72', fontSize: '13px', lineHeight: 1.5 }}>
                <span style={{ color: '#a8ff3e' }}>✦</span> <span>{tip}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const MealPlanPage = ({ user, setUser }: any) => {
  const [day, setDay] = useState(user.mealPlan?.days?.[0]?.day || 'Monday');
  const [editing, setEditing] = useState<any>(null);
  const [aiInst, setAiInst] = useState('');
  const [regenLoad, setRegenLoad] = useState(false);
  const [showAi, setShowAi] = useState(false);
  const [activeRecipe, setActiveRecipe] = useState<any>(null);
  const [recipeDetails, setRecipeDetails] = useState<any>(null);
  const [recipeLoading, setRecipeLoading] = useState(false);

  const dayIdx = user.mealPlan?.days?.findIndex((d: any) => d.day === day) || 0;
  const data = user.mealPlan?.days?.[dayIdx] || { meals: [] };

  const fetchRecipeDetails = async (meal: any) => {
    setActiveRecipe(meal);
    setRecipeLoading(true);
    setRecipeDetails(null);
    try {
      const res = await fetch('/api/gen-recipe-details', {
        method: 'POST', headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ meal, preferences: { diet: user.diet, allergies: user.allergies, dislikes: user.dislikes } })
      });
      const txt = (await res.json()).text;
      setRecipeDetails(extractJSON(txt));
    } catch(e) { 
      console.error(e);
      alert("Failed to generate recipe."); 
    }
    setRecipeLoading(false);
  };

  const handleSaveEdit = () => {
    const newUser = JSON.parse(JSON.stringify(user));
    newUser.mealPlan.days[dayIdx].meals[editing.mIdx] = editing.m;
    setUser(newUser);
    setEditing(null); setShowAi(false);
  };
  const handleDel = (i: number) => {
    if(!window.confirm("Remove this log entry?")) return;
    const n = JSON.parse(JSON.stringify(user));
    n.mealPlan.days[dayIdx].meals.splice(i, 1);
    setUser(n);
  };

  const handleAi = async () => {
    setRegenLoad(true);
    try {
      const res = await fetch('/api/regen-meal', {
        method: 'POST', headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ meal: editing.m, instructions: aiInst, preferences: { diet: user.diet, allergies: user.allergies, dislikes: user.dislikes } })
      });
      const txt = (await res.json()).text;
      setEditing({ ...editing, m: extractJSON(txt) });
      setAiInst(''); setShowAi(false);
    } catch(e) { alert("Failed mutation."); }
    setRegenLoad(false);
  };

  const cMap: any = { 'Breakfast': '#a8ff3e', 'Lunch': '#00ffc8', 'Dinner': '#ffb830', 'Snack': '#ff7043', 'Pre-Workout': '#c084fc', 'Post-Workout': '#db2777' };

  return (
    <div className="animate-fade" style={{ padding: '40px' }}>
      <h1 className="clash" style={{ fontSize: '36px', margin: '0 0 32px 0' }}>Plan Matrix</h1>
      <div style={{ display: 'flex', gap: '12px', marginBottom: '32px', overflowX: 'auto', paddingBottom: '8px' }}>
        {["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"].map(d => (
          <div key={d} className={`tab-btn ${day === d ? 'active' : ''}`} onClick={() => setDay(d)}>{d}</div>
        ))}
      </div>
      {data.workoutNote && (
        <div style={{ display: 'inline-flex', padding: '8px 16px', background: 'rgba(168,255,62,0.1)', color: '#a8ff3e', borderRadius: '12px', border: '1px solid rgba(168,255,62,0.2)', marginBottom: '32px', fontSize: '13px', fontWeight: 500 }}>
          ◉ Workout Directive: {data.workoutNote}
        </div>
      )}

      <motion.div layout style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
        <AnimatePresence>
        {data.meals.map((m: any, i: number) => {
          const mColor = cMap[m.type] || '#00b8ff';
          return (
            <motion.div 
              key={m.name + i} 
              className="meal-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              layout
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div className="grotesk" style={{ fontSize: '10px', textTransform: 'uppercase', color: mColor, letterSpacing: '1px' }}>{m.type}</div>
                <div className="clash" style={{ fontSize: '24px', color: '#e8f0eb' }}>{m.calories} <span style={{fontSize:'12px', color:'#6b8a72'}}>kcal</span></div>
              </div>
              <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', color: '#c8e8cc', fontWeight: 500 }}>{m.name}</h3>
              <div style={{ display: 'flex', gap: '16px', fontSize: '12px', fontWeight: 600, marginBottom: '20px' }}>
                <span style={{ color: '#00ffc8' }}>P:{m.protein}g</span>
                <span style={{ color: '#ffb830' }}>C:{m.carbs}g</span>
                <span style={{ color: '#ff7043' }}>F:{m.fat}g</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: '#6b8a72', marginBottom: '16px' }}>
                <span>◷ {m.prepTime}m prep</span>
                <div style={{ display: 'flex', gap: '12px', position: 'relative', zIndex: 12 }}>
                  <span style={{ cursor: 'pointer', color: '#00b8ff' }} onClick={(e) => { e.stopPropagation(); setEditing({mIdx: i, m}); }} title="Edit">Refresh ↺</span>
                  <span style={{ cursor: 'pointer', color: '#ff7043' }} onClick={(e) => { e.stopPropagation(); handleDel(i); }} title="Delete">✕</span>
                </div>
              </div>
              {m.prepNote && (
                <div style={{ background: `rgba(255,255,255,0.03)`, border: `1px solid rgba(255,255,255,0.05)`, padding: '12px', borderRadius: '12px', fontSize: '12px', color: '#6b8a72', lineHeight: 1.5 }}>
                  {m.prepNote}
                </div>
              )}
              
              <div className="recipe-overlay" onClick={() => fetchRecipeDetails(m)}>
                <Btn>View Recipe Details</Btn>
              </div>
            </motion.div>
          );
        })}
        </AnimatePresence>
      </motion.div>

      {activeRecipe && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(8,12,10,0.8)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <Card bright style={{ width: '100%', maxWidth: '600px', maxHeight: '80vh', overflowY: 'auto', padding: '32px', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '24px', right: '24px', cursor: 'pointer', fontSize: '20px', color: '#6b8a72' }} onClick={() => setActiveRecipe(null)}>✕</div>
            
            <div className="grotesk" style={{ fontSize: '12px', textTransform: 'uppercase', color: cMap[activeRecipe.type] || '#00b8ff', letterSpacing: '1px', marginBottom: '8px' }}>{activeRecipe.type}</div>
            <h2 className="clash" style={{ fontSize: '32px', margin: '0 0 16px 0' }}>{activeRecipe.name}</h2>
            
            <div style={{ display: 'flex', gap: '16px', fontSize: '14px', fontWeight: 600, marginBottom: '32px', paddingBottom: '24px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <span style={{ color: '#a8ff3e' }}>{activeRecipe.calories} kcal</span>
              <span style={{ color: '#00ffc8' }}>P: {activeRecipe.protein}g</span>
              <span style={{ color: '#ffb830' }}>C: {activeRecipe.carbs}g</span>
              <span style={{ color: '#ff7043' }}>F: {activeRecipe.fat}g</span>
              <span style={{ color: '#c084fc' }}>◷ {activeRecipe.prepTime}m</span>
            </div>

            {recipeLoading && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 0' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '2px solid transparent', borderTopColor: '#a8ff3e', animation: 'spinner-rotate 1s linear infinite', marginBottom: '16px' }}></div>
                <div className="grotesk" style={{ color: '#a8ff3e', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>Generating Recipe Instructions...</div>
              </div>
            )}

            {!recipeLoading && recipeDetails && (
              <div className="animate-fade">
                <h3 className="grotesk" style={{ fontSize: '14px', color: '#a8ff3e', textTransform: 'uppercase', marginBottom: '16px', letterSpacing: '1px' }}>Ingredients</h3>
                <ul style={{ paddingLeft: '20px', color: 'var(--text)', marginBottom: '32px', fontSize: '14px', lineHeight: 1.6 }}>
                  {recipeDetails.ingredients.map((ing: string, idx: number) => <li key={idx} style={{ marginBottom: '8px' }}>{ing}</li>)}
                </ul>

                <h3 className="grotesk" style={{ fontSize: '14px', color: '#00ffc8', textTransform: 'uppercase', marginBottom: '16px', letterSpacing: '1px' }}>Instructions</h3>
                <ol style={{ paddingLeft: '20px', color: 'var(--text)', fontSize: '14px', lineHeight: 1.6 }}>
                  {recipeDetails.instructions.map((inst: string, idx: number) => <li key={idx} style={{ marginBottom: '12px' }}>{inst}</li>)}
                </ol>
              </div>
            )}
            
            {activeRecipe.prepNote && !recipeDetails && !recipeLoading && (
              <div style={{ color: '#6b8a72', fontSize: '14px', lineHeight: 1.5, fontStyle: 'italic' }}>
                Note: {activeRecipe.prepNote}
              </div>
            )}
          </Card>
        </div>
      )}

      {editing && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(8,12,10,0.8)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <Card bright style={{ width: '100%', maxWidth: '500px', padding: '32px' }}>
            <h3 className="clash" style={{ fontSize: '24px', margin: '0 0 24px 0' }}>Mutate Meal</h3>
            <div style={{ display: 'grid', gap: '16px' }}>
              <div><label className="grotesk" style={{ fontSize:'10px', color:'#6b8a72', textTransform:'uppercase' }}>Name</label><input value={editing.m.name} onChange={e => setEditing({...editing, m: {...editing.m, name: e.target.value}})} /></div>
              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ flex: 1 }}><label className="grotesk" style={{ fontSize:'10px', color:'#6b8a72', textTransform:'uppercase' }}>Cals</label><input type="number" value={editing.m.calories} onChange={e => setEditing({...editing, m: {...editing.m, calories: Number(e.target.value)}})} /></div>
                <div style={{ flex: 1 }}><label className="grotesk" style={{ fontSize:'10px', color:'#6b8a72', textTransform:'uppercase' }}>Protein</label><input type="number" value={editing.m.protein} onChange={e => setEditing({...editing, m: {...editing.m, protein: Number(e.target.value)}})} /></div>
              </div>

              {!showAi ? (
                <div style={{ marginTop: '8px' }}>
                  <Btn variant="ghost" size="sm" onClick={() => setShowAi(true)}>✦ Mutate via AI</Btn>
                </div>
              ) : (
                <div style={{ background: 'rgba(168,255,62,0.05)', border: '1px solid rgba(168,255,62,0.1)', padding: '20px', borderRadius: '16px' }}>
                  <div className="grotesk" style={{ fontSize: '12px', color: '#a8ff3e', marginBottom: '8px', textTransform: 'uppercase' }}>AI Evolution</div>
                  <textarea value={aiInst} onChange={e => setAiInst(e.target.value)} placeholder="e.g. Make it higher protein, swap chicken for tofu..." style={{ minHeight: '60px', marginBottom: '16px' }} />
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                    <Btn variant="ghost" size="sm" onClick={() => setShowAi(false)}>Cancel</Btn>
                    <Btn size="sm" onClick={handleAi} disabled={regenLoad}>{regenLoad ? 'Evolving...' : 'Evolve ⬡'}</Btn>
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '24px', marginTop: '8px' }}>
                <Btn variant="ghost" onClick={() => { setEditing(null); setShowAi(false); setAiInst(''); }}>Abort</Btn>
                <Btn onClick={handleSaveEdit}>Commit</Btn>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

const SchedulePage = ({ user }: any) => {
  const [day, setDay] = useState('Monday');
  const sched = (user.weeklySchedule?.schedule && user.weeklySchedule.schedule[day]) || [];
  const eMap: any = { meal: {c: '#a8ff3e', i: '◈'}, workout: {c: '#ffb830', i: '◉'}, prep: {c: '#00ffc8', i: '◫'}, grocery: {c: '#c084fc', i: '◷'}, rest: {c: '#db2777', i: '◯'}, water: {c: '#00b8ff', i: '◈'}, sleep: {c: '#7e22ce', i: '⬡'} };

  const [conn, setConn] = useState(false);

  return (
    <div className="animate-fade" style={{ padding: '40px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px' }}>
        <div>
          <h1 className="clash" style={{ fontSize: '36px', margin: '0 0 16px 0' }}>Temporal Sync</h1>
          <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '8px' }}>
            {["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"].map(d => (
              <div key={d} className={`tab-btn ${day === d ? 'active' : ''}`} onClick={() => setDay(d)}>{d.substring(0,3)}</div>
            ))}
          </div>
        </div>
        <Btn variant="ghost" onClick={() => setConn(!conn)}>{conn ? '✓ Sync Active' : '↗ Connect OS Calendar'}</Btn>
      </div>

      {conn && (
        <div style={{ background: 'rgba(168,255,62,0.1)', border: '1px solid rgba(168,255,62,0.2)', padding: '16px 24px', borderRadius: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <div style={{ color: '#a8ff3e', fontSize: '14px', fontWeight: 500 }}>✦ External calendar interface authenticated.</div>
          <Btn size="sm">Sync Timeline</Btn>
        </div>
      )}

      <div style={{ display: 'flex', gap: '12px', marginBottom: '32px', flexWrap: 'wrap' }}>
        {Object.entries(eMap).map(([k, v]: any) => (
          <div key={k} className="grotesk" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '4px 12px', background: 'rgba(255,255,255,0.03)', borderRadius: '99px', fontSize: '10px', textTransform: 'uppercase', color: '#c8e8cc' }}>
            <span style={{ color: v.c }}>{v.i}</span> {k}
          </div>
        ))}
      </div>

      <div className="glass" style={{ padding: '40px' }}>
        {sched.length === 0 ? <div style={{ color: '#6b8a72' }}>No temporal data.</div> : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {sched.map((e: any, i: number) => {
              const meta = eMap[e.type] || { c: '#00b8ff', i: '◈' };
              return (
                <div key={i} style={{ display: 'flex', position: 'relative' }}>
                  <div className="grotesk" style={{ width: '44px', textAlign: 'right', fontSize: '12px', color: '#6b8a72', paddingTop: '16px', paddingRight: '16px' }}>{e.time}</div>
                  <div style={{ position: 'relative', width: '20px', display: 'flex', justifyContent: 'center' }}>
                    <div className="timeline-dot" style={{ color: meta.c, marginTop: '16px', background: '#080c0a' }}></div>
                    {i < sched.length - 1 && <div className="timeline-line"></div>}
                  </div>
                  <div style={{ flex: 1, paddingLeft: '16px' }}>
                    <div className="event-pill">
                      <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(255,255,255,0.02)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: meta.c, fontSize: '18px' }}>{meta.i}</div>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '16px', color: '#e8f0eb', marginBottom: '4px' }}>{e.title}</div>
                        <div style={{ fontSize: '12px', color: '#6b8a72' }}>◷ {e.duration} min {e.note && <span style={{ color: meta.c, fontStyle: 'italic', marginLeft: '8px' }}>• {e.note}</span>}</div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <h2 className="clash" style={{ fontSize: '24px', margin: '40px 0 24px 0' }}>Biometric Telemetry</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        <div className="glass" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ fontSize: '32px', color: '#e8f0eb' }}>🍎</div>
          <div>
            <div style={{ fontWeight: 600, fontSize: '16px', marginBottom: '4px' }}>Apple HealthKit</div>
            <div className="grotesk" style={{ fontSize: '10px', color: '#db2777', textTransform: 'uppercase' }}>Requires Native iOS OS</div>
          </div>
        </div>
        <div className="glass" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ fontSize: '32px', color: '#4285F4' }}>G</div>
          <div>
            <div style={{ fontWeight: 600, fontSize: '16px', marginBottom: '4px' }}>Google Fit API</div>
            <div className="grotesk" style={{ fontSize: '10px', color: '#6b8a72', textTransform: 'uppercase' }}>Module Offline</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TrackerPage = ({ log, setLog }: any) => {
  const fRef = useRef<any>(null);
  const [loading, setLoading] = useState(false);
  const [res, setRes] = useState<any>(null);

  const onFile = (e: any) => {
    const f = e.target.files[0];
    if(!f) return;
    const rd = new FileReader();
    rd.onload = async (ev) => {
      setLoading(true);
      try {
        const b64 = (ev.target?.result as string).split(',')[1];
        const r = await fetch('/api/analyze-food', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ imageBase64: b64 }) });
        setRes(extractJSON((await r.json()).text));
      } catch(err) { alert("Vision model failed."); }
      setLoading(false);
    };
    rd.readAsDataURL(f);
  };

  const handleLog = () => {
    setLog([...log, { date: new Date().toISOString(), ...res }]);
    setRes(null);
    alert("✦ Logged to today's tracker!");
  };

  const today = log.filter((l: any) => new Date(l.date).toDateString() === new Date().toDateString());
  const tCals = today.reduce((s: number,l: any) => s + (l.totals?.calories||0), 0);
  const tPro = today.reduce((s: number,l: any) => s + (l.totals?.protein||0), 0);

  return (
    <div className="animate-fade" style={{ padding: '40px' }}>
      <h1 className="clash" style={{ fontSize: '36px', margin: '0 0 32px 0' }}>Vision Tracker</h1>
      
      {today.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '40px' }}>
          <div className="glass" style={{ padding: '24px', border: '1px solid rgba(168,255,62,0.1)', background: 'rgba(168,255,62,0.02)' }}>
            <div className="grotesk" style={{ fontSize: '10px', color: '#6b8a72', textTransform: 'uppercase' }}>CALS SCANNED</div>
            <div className="clash" style={{ fontSize: '28px', color: '#a8ff3e' }}>{tCals}</div>
          </div>
          <div className="glass" style={{ padding: '24px', border: '1px solid rgba(0,255,200,0.1)', background: 'rgba(0,255,200,0.02)' }}>
            <div className="grotesk" style={{ fontSize: '10px', color: '#6b8a72', textTransform: 'uppercase' }}>PRO SCANNED</div>
            <div className="clash" style={{ fontSize: '28px', color: '#00ffc8' }}>{tPro}</div>
          </div>
          <div className="glass" style={{ padding: '24px', border: '1px solid rgba(255,184,48,0.1)', background: 'rgba(255,184,48,0.02)' }}>
            <div className="grotesk" style={{ fontSize: '10px', color: '#6b8a72', textTransform: 'uppercase' }}>ENTRIES</div>
            <div className="clash" style={{ fontSize: '28px', color: '#ffb830' }}>{today.length}</div>
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
        <div className="upload-zone" onClick={() => fRef.current.click()}>
          <input type="file" accept="image/*" capture="environment" ref={fRef} style={{ display: 'none' }} onChange={onFile} />
          {loading ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '2px solid transparent', borderTopColor: '#a8ff3e', animation: 'spinner-rotate 1s linear infinite', marginBottom: '16px' }}></div>
              <div className="grotesk" style={{ color: '#a8ff3e', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>Analysing your meal...</div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ fontSize: '40px', color: '#a8ff3e', marginBottom: '16px' }}>◉</div>
              <div className="grotesk">Tap to initialize scanner</div>
            </div>
          )}
        </div>

        <div className="glass" style={{ padding: '32px' }}>
          <h2 className="clash" style={{ fontSize: '20px', margin: '0 0 24px 0' }}>Analysis Feed</h2>
          {!res && <div style={{ color: '#6b8a72', fontSize: '14px' }}>Awaiting visual input.</div>}
          {res && (
            <div className="animate-slide-up">
              <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span className="grotesk" style={{ fontSize: '10px', color: '#6b8a72', textTransform: 'uppercase' }}>Vision Confidence</span>
                  <span className="grotesk" style={{ fontSize: '10px', color: '#a8ff3e' }}>{(res.confidence * 100).toFixed(0)}%</span>
                </div>
                <Progress value={res.confidence * 100} max={100} color="lime" />
              </div>

              {res.foods?.map((f: any, i: number) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px' }}>
                  <div style={{ color: '#c8e8cc' }}>{f.name} <span style={{ color: '#6b8a72' }}>({f.quantity})</span></div>
                </div>
              ))}

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '24px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '24px' }}>
                <div><label className="grotesk" style={{ fontSize:'10px', color:'#a8ff3e' }}>CALS</label><input type="number" value={res.totals?.calories} onChange={e => setRes({...res, totals: {...res.totals, calories: Number(e.target.value)}})} /></div>
                <div><label className="grotesk" style={{ fontSize:'10px', color:'#00ffc8' }}>PRO</label><input type="number" value={res.totals?.protein} onChange={e => setRes({...res, totals: {...res.totals, protein: Number(e.target.value)}})} /></div>
                <div><label className="grotesk" style={{ fontSize:'10px', color:'#ffb830' }}>CARBS</label><input type="number" value={res.totals?.carbs} onChange={e => setRes({...res, totals: {...res.totals, carbs: Number(e.target.value)}})} /></div>
                <div><label className="grotesk" style={{ fontSize:'10px', color:'#ff7043' }}>FAT</label><input type="number" value={res.totals?.fat} onChange={e => setRes({...res, totals: {...res.totals, fat: Number(e.target.value)}})} /></div>
              </div>

              {res.notes && (
                <div style={{ background: 'rgba(168,255,62,0.05)', color: '#6b8a72', padding: '12px', borderRadius: '12px', fontSize: '12px', marginTop: '16px' }}>{res.notes}</div>
              )}

              <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                <Btn variant="ghost" style={{ flex: 1 }} onClick={() => setRes(null)}>Discard</Btn>
                <Btn style={{ flex: 2 }} onClick={handleLog}>Log Data ⬡</Btn>
              </div>
            </div>
          )}
        </div>
      </div>

      {log.length > 0 && (
        <div style={{ marginTop: '40px' }}>
          <h2 className="clash" style={{ fontSize: '20px', margin: '0 0 24px 0' }}>System Log</h2>
          <div className="glass" style={{ padding: '0 24px' }}>
            {log.slice().reverse().map((l: any, i: number) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 0', borderBottom: i < log.length-1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                <div>
                  <div style={{ color: '#e8f0eb', fontWeight: 500, marginBottom: '4px' }}>{l.foods?.map((f:any)=>f.name).join(', ')}</div>
                  <div className="grotesk" style={{ color: '#6b8a72', fontSize: '12px', textTransform: 'uppercase' }}>{new Date(l.date).toLocaleString()}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div className="clash" style={{ color: '#a8ff3e', fontSize: '18px' }}>{l.totals?.calories}</div>
                  <div style={{ color: '#6b8a72', fontSize: '12px' }}>P:{l.totals?.protein}g</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const GroceryPage = ({ list, chk, setChk }: any) => {
  return (
    <div className="animate-fade" style={{ padding: '40px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <h1 className="clash" style={{ fontSize: '36px', margin: 0 }}>Provisioning</h1>
        <Btn variant="ghost" onClick={() => setChk({})}>↺ Reset Matrix</Btn>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
        {Object.entries(list).map(([cat, raw]: any) => {
          if(!raw || raw.length === 0) return null;
          const mapC: any = { Produce: 'lime', Protein: 'teal', Grains: 'amber', Dairy: 'blue', Pantry: 'violet' };
          const c = mapC[cat] || 'lime';
          const done = raw.filter((i:string) => chk[`${cat}-${i}`]).length;
          return (
            <div key={cat} className="glass" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 className="clash" style={{ margin: 0, fontSize: '20px', color: '#e8f0eb' }}>{cat}</h3>
                <span className="grotesk" style={{ fontSize: '12px', color: '#6b8a72' }}>{done} / {raw.length}</span>
              </div>
              <Progress value={done} max={raw.length} color={c} style={{ marginBottom: '24px' }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <AnimatePresence>
                {raw.map((item: string) => {
                  const k = `${cat}-${item}`;
                  const isC = !!chk[k];
                  return (
                    <motion.div 
                      key={item} 
                      style={{ display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer', opacity: isC ? 0.5 : 1, transition: 'opacity 0.2s' }} 
                      onClick={() => setChk({...chk, [k]: !isC})}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: isC ? 0.5 : 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.2 }}
                      layout
                    >
                      <div className={`checkbox-custom ${isC ? 'checked' : ''}`}></div>
                      <span style={{ fontSize: '14px', textDecoration: isC ? 'line-through' : 'none', color: isC ? '#6b8a72' : '#c8e8cc' }}>{item}</span>
                    </motion.div>
                  );
                })}
                </AnimatePresence>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const WeightChart = ({ logs }: any) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current || !logs || logs.length === 0) return;
    
    const recent = [...logs].sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime()).slice(-30);
    
    d3.select(chartRef.current).selectAll('*').remove();

    const margin = {top: 20, right: 20, bottom: 30, left: 40};
    const width = chartRef.current.clientWidth - margin.left - margin.right;
    const height = 200 - margin.top - margin.bottom;

    const svg = d3.select(chartRef.current)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleTime()
      .domain(d3.extent(recent, d => new Date(d.date)) as [Date, Date])
      .range([0, width]);

    const yMin = d3.min(recent, d => d.weight) as number;
    const yMax = d3.max(recent, d => d.weight) as number;

    const y = d3.scaleLinear()
      .domain([Math.max(0, yMin - 5), yMax + 5])
      .range([height, 0]);

    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x).ticks(5).tickFormat(d3.timeFormat('%m/%d') as any))
      .attr('color', 'var(--text)')
      .style('opacity', 0.5);

    svg.append('g')
      .call(d3.axisLeft(y).ticks(5))
      .attr('color', 'var(--text)')
      .style('opacity', 0.5);

    const line = d3.line<any>()
      .x(d => x(new Date(d.date)))
      .y(d => y(d.weight))
      .curve(d3.curveMonotoneX);

    svg.append('path')
      .datum(recent)
      .attr('fill', 'none')
      .attr('stroke', '#a8ff3e')
      .attr('stroke-width', 3)
      .attr('d', line);

    svg.selectAll('.dot')
      .data(recent)
      .enter()
      .append('circle')
      .attr('cx', d => x(new Date(d.date)))
      .attr('cy', d => y(d.weight))
      .attr('r', 4)
      .attr('fill', 'var(--bg)')
      .attr('stroke', '#a8ff3e')
      .attr('stroke-width', 2);

  }, [logs]);

  if (!logs || logs.length === 0) return <div style={{ color: 'var(--text)', opacity: 0.5, fontSize: '14px', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>No weight logs yet.</div>

  return <div ref={chartRef} style={{ width: '100%', height: '200px' }} />;
};

const ProfilePage = ({ user, setUser, setPage }: any) => {
  const [weightIn, setWeightIn] = useState('');

  const handleLogWeight = () => {
    if (!weightIn) return;
    const val = Number(weightIn);
    if (isNaN(val)) return;
    const dt = new Date().toISOString().split('T')[0];
    const prev = user.weightLogs || [];
    const nw = [...prev.filter((l: any) => l.date !== dt), { date: dt, weight: val }];
    setUser({ ...user, weight: val.toString(), weightLogs: nw });
    setWeightIn('');
  };

  return (
    <div className="animate-fade" style={{ padding: '40px' }}>
      <h1 className="clash" style={{ fontSize: '36px', margin: '0 0 40px 0' }}>Biology Profile</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '40px' }}>
        <div className="glass" style={{ padding: '24px' }}>
          <div className="grotesk" style={{ fontSize: '10px', color: '#6b8a72', textTransform: 'uppercase', marginBottom: '8px' }}>Base Metrics</div>
          <div style={{ fontSize: '16px', color: 'var(--text)' }}>Age {user.age} • {user.gender} • {user.weight}kg • {user.height}cm</div>
        </div>
        <div className="glass" style={{ padding: '24px' }}>
          <div className="grotesk" style={{ fontSize: '10px', color: '#6b8a72', textTransform: 'uppercase', marginBottom: '8px' }}>Protocol</div>
          <div style={{ fontSize: '16px', color: 'var(--text)' }}>{user.goal} ({user.activity})</div>
        </div>
      </div>

      <div className="glass" style={{ padding: '32px', marginBottom: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 className="clash" style={{ fontSize: '24px', margin: 0 }}>Weight Trends</h2>
          <div style={{ display: 'flex', gap: '12px' }}>
            <input 
              type="number" 
              placeholder="Latest Weight (kg)" 
              value={weightIn}
              onChange={e => setWeightIn(e.target.value)}
              style={{ padding: '8px 12px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--text)', borderRadius: '8px', width: '160px' }}
            />
            <Btn onClick={handleLogWeight} size="sm">Log Weight</Btn>
          </div>
        </div>
        <WeightChart logs={user.weightLogs} />
      </div>

      <h2 className="clash" style={{ fontSize: '24px', margin: '0 0 24px 0' }}>Computed Targets</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px', marginBottom: '40px' }}>
        <div className="stat-card" style={{ padding: '16px', textAlign: 'center' }}><div className="grotesk" style={{ fontSize:'10px', color:'#6b8a72', marginBottom:'8px' }}>CALS</div><div className="clash" style={{ fontSize:'24px', color:'#a8ff3e' }}>{user.nutrition.calories}</div></div>
        <div className="stat-card" style={{ padding: '16px', textAlign: 'center' }}><div className="grotesk" style={{ fontSize:'10px', color:'#6b8a72', marginBottom:'8px' }}>PRO</div><div className="clash" style={{ fontSize:'24px', color:'#00ffc8' }}>{user.nutrition.protein}</div></div>
        <div className="stat-card" style={{ padding: '16px', textAlign: 'center' }}><div className="grotesk" style={{ fontSize:'10px', color:'#6b8a72', marginBottom:'8px' }}>CARBS</div><div className="clash" style={{ fontSize:'24px', color:'#ffb830' }}>{user.nutrition.carbs}</div></div>
        <div className="stat-card" style={{ padding: '16px', textAlign: 'center' }}><div className="grotesk" style={{ fontSize:'10px', color:'#6b8a72', marginBottom:'8px' }}>FAT</div><div className="clash" style={{ fontSize:'24px', color:'#ff7043' }}>{user.nutrition.fat}</div></div>
        <div className="stat-card" style={{ padding: '16px', textAlign: 'center' }}><div className="grotesk" style={{ fontSize:'10px', color:'#6b8a72', marginBottom:'8px' }}>WATER</div><div className="clash" style={{ fontSize:'24px', color:'#00b8ff' }}>{user.nutrition.water}</div></div>
      </div>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '40px' }}>
        <Btn onClick={() => { setUser(null); setPage('landing'); }} style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', color: '#ef4444' }}>Terminate Protocol & Delete Data ✕</Btn>
      </div>
    </div>
  );
};

export default function App() {
  const [user, setUser] = useLocalStorage('mealfit-user-v4', null);
  const [trackerLog, setTrackerLog] = useLocalStorage('mealfit-tracker-v2', []);
  const [groceryChecked, setGroceryChecked] = useLocalStorage('mealfit-grocery-v2', {});
  const [page, setPage] = useState('landing');
  const [theme, setTheme] = useLocalStorage('mealfit-theme', 'dark');

  useEffect(() => {
    if (user && (page === 'landing' || page === 'onboarding')) setPage('dashboard');
    if (!user && page !== 'landing' && page !== 'onboarding') setPage('landing');
  }, [user, page]);

  return (
    <div className={`mealfit-app ${theme === 'light' ? 'light-theme' : ''}`} style={{ 
      height: '100vh', 
      overflowY: 'auto', 
      overflowX: 'hidden', 
      background: 'var(--bg)',
      transition: 'background 0.5s ease'
    }}>
      <GlobalStyles theme={theme} />
      
      {/* Theme Toggle Button */}
      <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999 }}>
        <Btn 
          onClick={() => setTheme((t: string) => t === 'dark' ? 'light' : 'dark')} 
          variant="ghost" 
          style={{ background: theme === 'light' ? 'rgba(255,255,255,0.8)' : 'rgba(8,12,10,0.8)', backdropFilter: 'blur(10px)', color: theme === 'light' ? '#00c853' : '#a8ff3e', border: theme === 'light' ? '1px solid rgba(0,200,83,0.3)' : '1px solid rgba(168,255,62,0.3)' }}
        >
          {theme === 'dark' ? '☀️ Day Phase' : '🌙 Night Phase'}
        </Btn>
      </div>

      {!user && page === 'landing' && <LandingPage setPage={setPage} theme={theme} />}
      {!user && page === 'onboarding' && <Onboarding setUser={setUser} onComplete={() => setPage('dashboard')} theme={theme} />}
      {user && (
        <div style={{ display: 'flex', minHeight: '100%', background: 'transparent', color: 'var(--text)', position: 'relative', zIndex: 1 }}>
          <Orbs theme={theme} />
          <Sidebar page={page} setPage={setPage} user={user} />
          <div style={{ flex: 1, position: 'relative', zIndex: 2 }}>
            {page === 'dashboard' && <Dashboard user={user} setUser={setUser} trackerLog={trackerLog} setPage={setPage} />}
            {page === 'mealplan' && <MealPlanPage user={user} setUser={setUser} />}
            {page === 'schedule' && <SchedulePage user={user} />}
            {page === 'tracker' && <TrackerPage log={trackerLog} setLog={setTrackerLog} />}
            {page === 'grocery' && <GroceryPage list={user.mealPlan?.groceryList||{}} chk={groceryChecked} setChk={setGroceryChecked} />}
            {page === 'profile' && <ProfilePage user={user} setUser={setUser} setPage={setPage} />}
          </div>
        </div>
      )}
    </div>
  );
}
