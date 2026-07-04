import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  createContext,
  useContext,
} from 'react';

/* ============================================================
   APP.JS  —  Hema AI
   Single-file app: Context + Cursor + Background + Router
   + all Pages (no react-router-dom, no CSS modules)
============================================================ */

/* ──────────────────────────────────────────────────────────
   1. CONTEXT
────────────────────────────────────────────────────────── */
const AppContext = createContext(null);
const useApp = () => useContext(AppContext);

const SEED_IDEA = {
  id: 1,
  name: 'VernacularMD',
  tagline: 'AI doctor in your native language',
  industry: 'HealthTech',
  audience: 'B2C',
  description: 'AI healthcare assistant enabling rural patients in 22 Indian languages.',
  problem: 'Rural patients cannot communicate in English, causing delayed care.',
  solution: 'Voice AI diagnostic with triage, referrals, and follow-up.',
  revenue: '₹99/consultation + hospital licensing',
  market: '$4.2B rural healthcare TAM India',
  growth: 'ASHA worker distribution + state health partnerships',
  scores: { market: 85, feasibility: 78, uniqueness: 91 },
  tags: ['#HealthTech', '#NLP', '#Rural', '#India'],
  saved: 'Today',
  fav: true,
};

function AppProvider({ children }) {
  const [page, setPage]             = useState('home');
  const [savedIdeas, setSavedIdeas] = useState([SEED_IDEA]);
  const [currentIdea, setCurrentIdea]       = useState(null);
  const [currentBizPlan, setCurrentBizPlan] = useState(null);
  const [user, setUser]             = useState(null);
  const [toasts, setToasts]         = useState([]);
  const [selectedPlan, setSelectedPlan] = useState('Pro');

  const toast = useCallback((msg, type = 'info') => {
    const id = Date.now();
    setToasts((p) => [...p, { id, msg, type }]);
    setTimeout(() => setToasts((p) => p.filter((t) => t.id !== id)), 3200);
  }, []);

  const saveIdea = useCallback(
    (idea) => {
      if (savedIdeas.find((i) => i.name === idea.name)) return false;
      setSavedIdeas((p) => [
        { ...idea, id: Date.now(), saved: new Date().toLocaleDateString(), fav: false },
        ...p,
      ]);
      return true;
    },
    [savedIdeas]
  );

  const toggleFav  = useCallback((id) =>
    setSavedIdeas((p) => p.map((i) => (i.id === id ? { ...i, fav: !i.fav } : i))), []);

  const deleteIdea = useCallback((id) =>
    setSavedIdeas((p) => p.filter((i) => i.id !== id)), []);

  const login  = useCallback((u) => setUser(u), []);
  const logout = useCallback(() => setUser(null), []);

  const nav = useCallback((p) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <AppContext.Provider
      value={{
        page, nav,
        savedIdeas, saveIdea, toggleFav, deleteIdea,
        currentIdea, setCurrentIdea,
        currentBizPlan, setCurrentBizPlan,
        user, login, logout,
        toasts, toast,
        selectedPlan, setSelectedPlan,
      }}
    >
      {children}
      <ToastWrap />
    </AppContext.Provider>
  );
}

/* ──────────────────────────────────────────────────────────
   2. CURSOR
────────────────────────────────────────────────────────── */
function Cursor() {
  const curRef  = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const move = (e) => {
      if (curRef.current)  { curRef.current.style.left  = e.clientX + 'px'; curRef.current.style.top  = e.clientY + 'px'; }
      setTimeout(() => {
        if (ringRef.current) { ringRef.current.style.left = e.clientX + 'px'; ringRef.current.style.top = e.clientY + 'px'; }
      }, 80);
    };
    document.addEventListener('mousemove', move);
    return () => document.removeEventListener('mousemove', move);
  }, []);

  return (
    <>
      <div ref={curRef}  className="cursor" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}

/* ──────────────────────────────────────────────────────────
   3. BACKGROUND (orbs + grid)
────────────────────────────────────────────────────────── */
function Background() {
  return (
    <>
      <div className="grid-bg" />
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />
    </>
  );
}

/* ──────────────────────────────────────────────────────────
   4. TOAST
────────────────────────────────────────────────────────── */
function ToastWrap() {
  const { toasts } = useApp();
  const color  = { success: 'var(--accent3)', error: 'var(--accent2)', info: 'var(--accent)' };
  const border = { success: 'rgba(0,245,200,.3)', error: 'rgba(255,107,157,.3)', info: 'rgba(124,92,252,.3)' };
  const icon   = { success: '✅', error: '❌', info: '💡' };

  return (
    <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 900,
      display: 'flex', flexDirection: 'column', gap: '.6rem' }}>
      {toasts.map((t) => (
        <div key={t.id} style={{
          background: 'var(--card)', border: `1.5px solid ${border[t.type]}`,
          borderRadius: 10, padding: '.9rem 1.5rem', fontSize: '.84rem', fontWeight: 700,
          display: 'flex', alignItems: 'center', gap: '.8rem', color: color[t.type],
          boxShadow: '0 8px 30px rgba(0,0,0,.5)', minWidth: 260,
          animation: 'toastIn .35s ease both',
        }}>
          <span>{icon[t.type]}</span><span>{t.msg}</span>
        </div>
      ))}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   5. SHARED UI ATOMS
────────────────────────────────────────────────────────── */
function PrimaryBtn({ children, onClick, style = {} }) {
  return (
    <button onClick={onClick} style={{
      background: 'linear-gradient(135deg,var(--accent),var(--accent2))',
      color: '#fff', border: 'none', borderRadius: 8,
      fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: '.9rem',
      letterSpacing: '1.5px', textTransform: 'uppercase', cursor: 'none',
      padding: '1rem 2.5rem', boxShadow: '0 0 30px var(--glow)',
      transition: 'all .2s', ...style,
    }}>
      {children}
    </button>
  );
}

function GhostBtn({ children, onClick, style = {} }) {
  return (
    <button onClick={onClick} style={{
      background: 'transparent', border: '1.5px solid var(--border2)',
      color: 'var(--muted2)', borderRadius: 8, fontFamily: 'var(--font-sans)',
      fontWeight: 700, fontSize: '.85rem', letterSpacing: '1.5px',
      textTransform: 'uppercase', cursor: 'none', padding: '.85rem 2rem',
      transition: 'all .2s', ...style,
    }}>
      {children}
    </button>
  );
}

function Spinner({ msg = '' }) {
  const ring = {
    position: 'absolute', inset: 0, borderRadius: '50%',
    border: '2px solid transparent', animation: 'spinRing 2s linear infinite',
  };
  return (
    <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
      <div style={{ width: 80, height: 80, position: 'relative', margin: '0 auto 2rem' }}>
        <div style={{ ...ring, borderTopColor: 'var(--accent)',  animationDuration: '1.5s' }} />
        <div style={{ ...ring, borderRightColor: 'var(--accent2)', animationDuration: '2s', animationDirection: 'reverse' }} />
        <div style={{ ...ring, borderBottomColor: 'var(--accent3)', animationDuration: '2.5s', inset: 8 }} />
      </div>
      {msg && <p style={{ fontFamily: 'var(--font-mono)', fontSize: '.78rem', color: 'var(--muted2)', letterSpacing: 2 }}>{msg}</p>}
    </div>
  );
}

function ScoreBar({ label, value, color }) {
  const [w, setW] = useState(0);
  useEffect(() => { const t = setTimeout(() => setW(value), 200); return () => clearTimeout(t); }, [value]);
  return (
    <div style={{ flex: 1, minWidth: 140, background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 10, padding: '1rem 1.2rem' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.6rem', letterSpacing: 2, textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '.5rem' }}>{label}</div>
      <div style={{ height: 4, background: 'var(--border2)', borderRadius: 2, overflow: 'hidden', marginBottom: '.4rem' }}>
        <div style={{ height: '100%', borderRadius: 2, background: color, width: w + '%', transition: 'width 1.2s cubic-bezier(.16,1,.3,1)' }} />
      </div>
      <div style={{ fontWeight: 800, fontSize: '.9rem', color }}>{value}/100</div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   6. NAVBAR
────────────────────────────────────────────────────────── */
function Navbar() {
  const { nav, page, user, logout } = useApp();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  const links = [
    ['Generator', 'generator'],
    ['Trending',  'trending'],
    ['Features',  'features'],
    ['Pricing',   'pricing'],
    ['Contact',   'contact'],
  ];

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 600,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: scrolled ? '1rem 3rem' : '1.3rem 3rem',
      background: scrolled ? 'rgba(4,4,12,.9)' : 'transparent',
      backdropFilter: scrolled ? 'blur(24px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
      transition: 'all .3s',
    }}>
      {/* Logo */}
      <div onClick={() => nav('home')} style={{
        fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '1.6rem',
        background: 'linear-gradient(135deg,var(--accent),var(--accent2))',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        cursor: 'none',
      }}>
        Hema AI
      </div>

      {/* Links */}
      <ul style={{ display: 'flex', gap: '2.5rem', listStyle: 'none' }}>
        {links.map(([label, id]) => (
          <li key={id}>
            <span onClick={() => nav(id)} style={{
              color: page === id ? 'var(--accent)' : 'var(--muted2)',
              fontSize: '.8rem', fontWeight: 700, letterSpacing: '1.5px',
              textTransform: 'uppercase', cursor: 'none', transition: 'color .2s',
            }}>
              {label}
            </span>
          </li>
        ))}
      </ul>

      {/* Actions */}
      <div style={{ display: 'flex', gap: '.8rem', alignItems: 'center' }}>
        {user ? (
          <>
            <GhostBtn style={{ padding: '.55rem 1.2rem', fontSize: '.78rem' }} onClick={() => nav('dashboard')}>Dashboard</GhostBtn>
            <PrimaryBtn style={{ padding: '.6rem 1.4rem', fontSize: '.78rem' }} onClick={() => { logout(); nav('home'); }}>Logout</PrimaryBtn>
          </>
        ) : (
          <>
            <GhostBtn style={{ padding: '.55rem 1.2rem', fontSize: '.78rem' }} onClick={() => nav('auth')}>Login</GhostBtn>
            <PrimaryBtn style={{ padding: '.6rem 1.4rem', fontSize: '.78rem' }} onClick={() => nav('generator')}>Get Started</PrimaryBtn>
          </>
        )}
      </div>
    </nav>
  );
}

/* ──────────────────────────────────────────────────────────
   7. HOME PAGE
────────────────────────────────────────────────────────── */
function HomePage() {
  const { nav } = useApp();
  return (
    <section style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '8rem 2rem 4rem', textAlign: 'center', position: 'relative', zIndex: 1,
    }}>
      {/* chip */}
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: '.5rem',
        background: 'rgba(124,92,252,.1)', border: '1px solid rgba(124,92,252,.3)',
        color: 'var(--accent)', padding: '.35rem 1rem', borderRadius: 100,
        fontFamily: 'var(--font-mono)', fontSize: '.68rem', letterSpacing: 2,
        textTransform: 'uppercase', marginBottom: '2rem',
        animation: 'fadeDown .7s ease both',
      }}>
        <span style={{ width: 6, height: 6, background: 'var(--accent)', borderRadius: '50%', animation: 'blink 1.5s infinite' }} />
        AI Startup Intelligence Platform
      </div>

      {/* h1 */}
      <h1 style={{
        fontFamily: 'var(--font-serif)', fontSize: 'clamp(3rem,10vw,7rem)',
        lineHeight: .95, letterSpacing: -2, marginBottom: '.8rem',
        animation: 'fadeUp .8s .1s ease both',
      }}>
        Turn your idea<br />
        into a{' '}
        <em style={{
          fontStyle: 'italic',
          background: 'linear-gradient(135deg,var(--accent) 0%,var(--accent2) 50%,var(--gold) 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        }}>startup</em>
      </h1>

      <p style={{
        fontFamily: 'var(--font-sans)', fontWeight: 800,
        fontSize: 'clamp(1.5rem,4vw,3rem)', letterSpacing: 6,
        textTransform: 'uppercase', color: 'var(--muted2)',
        marginBottom: '2rem', animation: 'fadeUp .8s .15s ease both',
      }}>
        with AI
      </p>

      <p style={{
        maxWidth: 560, color: 'var(--muted2)', fontSize: '1.05rem', lineHeight: 1.8,
        margin: '0 auto 3.5rem', animation: 'fadeUp .8s .2s ease both',
      }}>
        Generate complete startup blueprints with AI — from idea to business plan,
        revenue strategy, and market analysis in minutes.
      </p>

      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', animation: 'fadeUp .8s .3s ease both' }}>
        <PrimaryBtn style={{ fontSize: '1rem', padding: '1.1rem 2.8rem', boxShadow: '0 0 50px rgba(124,92,252,.35)' }} onClick={() => nav('generator')}>
          ⚡ Generate Startup Idea
        </PrimaryBtn>
        <GhostBtn onClick={() => nav('features')}>Explore Features</GhostBtn>
      </div>

      {/* stats */}
      <div style={{
        display: 'flex', gap: '5rem', marginTop: '6rem', paddingTop: '3rem',
        borderTop: '1px solid var(--border)', flexWrap: 'wrap', justifyContent: 'center',
        animation: 'fadeUp .8s .5s ease both',
      }}>
        {[['3,200+','Ideas Generated'],['98%','Satisfaction'],['60+','Industries'],['4.9★','User Rating']].map(([n, l]) => (
          <div key={l} style={{ textAlign: 'center' }}>
            <div style={{
              fontFamily: 'var(--font-serif)', fontSize: '2.8rem', fontStyle: 'italic',
              background: 'linear-gradient(135deg,var(--accent),var(--accent2))',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>{n}</div>
            <div style={{ fontSize: '.72rem', letterSpacing: 2, textTransform: 'uppercase', color: 'var(--muted)', marginTop: '.3rem' }}>{l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────
   8. GENERATOR PAGE
────────────────────────────────────────────────────────── */
const INDUSTRIES = [
  ['HealthTech','🏥'],['EdTech','📚'],['FinTech','💰'],['AgriTech','🌾'],
  ['RetailTech','🛍️'],['CleanTech','♻️'],['LegalTech','⚖️'],['HRTech','👥'],
  ['Logistics','🚚'],['FoodTech','🍱'],['PropTech','🏠'],['SocialImpact','💡'],
];
const AI_FEATURES = [
  '🤖 AI Personalization','📊 Predictive Analytics','💬 NLP Chatbot',
  '👁️ Computer Vision','🔊 Voice AI','🗺️ Recommendation Engine',
  '🔒 Fraud Detection','🌐 Multi-language AI','🧬 Generative AI',
  '📱 Edge AI','⚡ AutoML','🔍 Semantic Search',
];
const AUDIENCES = [
  ['B2C','👤','End consumers'],['B2B','🏢','Businesses'],
  ['B2B2C','🔄','Hybrid model'],['Enterprise','🏛️','Large corps'],
  ['Government','🏛️','Public sector'],['SMBs','🛍️','Small businesses'],
];
const STATUS_MSGS = [
  'Analysing market trends...','Researching competitors...',
  'Crafting unique positioning...','Building revenue model...',
  'Finalising your blueprint...',
];

function GeneratorPage() {
  const { nav, setCurrentIdea, saveIdea, toast } = useApp();
  const [step,      setStep]      = useState(1);
  const [industry,  setIndustry]  = useState('HealthTech');
  const [features,  setFeatures]  = useState(['🤖 AI Personalization']);
  const [audience,  setAudience]  = useState('B2C');
  const [loading,   setLoading]   = useState(false);
  const [statusIdx, setStatusIdx] = useState(0);
  const [idea,      setIdea]      = useState(null);

  const toggleFeat = (f) => setFeatures((p) => p.includes(f) ? p.filter((x) => x !== f) : [...p, f]);

  const generate = async () => {
    setLoading(true); setIdea(null); setStatusIdx(0);
    const ticker = setInterval(() => setStatusIdx((i) => (i + 1) % STATUS_MSGS.length), 1200);
    const prompt = `Generate a creative AI startup idea for ${industry} industry, target: ${audience}, AI features: ${features.join(', ')}.
Reply ONLY in this exact format:
NAME: [name]
TAGLINE: [tagline]
DESCRIPTION: [2-3 sentences]
PROBLEM: [1-2 sentences]
SOLUTION: [2-3 sentences]
REVENUE: [revenue model]
MARKET: [TAM estimate]
GROWTH: [strategy]
SCORE_MARKET: [0-100]
SCORE_FEASIBILITY: [0-100]
SCORE_UNIQUENESS: [0-100]
TAGS: #tag1 #tag2 #tag3 #tag4
Be specific and creative. No generic ideas.`;
    try {
      const res  = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: 'claude-sonnet-4-20250514', max_tokens: 1000,
          messages: [{ role: 'user', content: prompt }] }),
      });
      const data = await res.json();
      const text = data.content[0].text;
      const g = (k) => { const m = text.match(new RegExp(k + ':\\s*([^\\n]+)')); return m ? m[1].trim() : ''; };
      const parsed = {
        name: g('NAME'), tagline: g('TAGLINE'), description: g('DESCRIPTION'),
        problem: g('PROBLEM'), solution: g('SOLUTION'), revenue: g('REVENUE'),
        market: g('MARKET'), growth: g('GROWTH'),
        scores: { market: parseInt(g('SCORE_MARKET')) || 82, feasibility: parseInt(g('SCORE_FEASIBILITY')) || 75, uniqueness: parseInt(g('SCORE_UNIQUENESS')) || 88 },
        tags: g('TAGS').split(' ').filter((t) => t.startsWith('#')),
        industry, audience,
      };
      setIdea(parsed); setCurrentIdea(parsed);
    } catch {
      const demo = { name: 'VernacularMD', tagline: 'AI doctor in your native language',
        description: 'AI healthcare assistant enabling rural patients in 22 Indian languages.',
        problem: 'Rural patients cannot communicate in English, causing delayed care.',
        solution: 'Voice AI diagnostic with triage, referrals, and follow-up.',
        revenue: '₹99/consultation + hospital licensing', market: '$4.2B rural healthcare TAM India',
        growth: 'ASHA worker distribution',
        scores: { market: 85, feasibility: 78, uniqueness: 91 },
        tags: ['#HealthTech', '#NLP', '#Rural'], industry, audience };
      setIdea(demo); setCurrentIdea(demo);
    }
    clearInterval(ticker); setLoading(false);
  };

  const goStep = (n) => { setStep(n); if (n === 4) generate(); };

  const card = (active) => ({
    background: active ? 'rgba(124,92,252,.1)' : 'var(--card)',
    border: active ? '1.5px solid var(--accent)' : '1.5px solid var(--border)',
    borderRadius: 10, padding: '1.2rem', textAlign: 'center', cursor: 'none',
    transition: 'all .25s', transform: active ? 'translateY(-3px)' : 'none',
    boxShadow: active ? '0 8px 30px var(--glow)' : 'none',
  });

  return (
    <section style={{ maxWidth: 900, margin: '0 auto', padding: '7rem 2rem 4rem', minHeight: '100vh', position: 'relative', zIndex: 1 }}>
      {/* header */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <p className="eyebrow">// AI Idea Engine</p>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem,4vw,3rem)', fontStyle: 'italic' }}>Build Your Startup</h1>
      </div>

      {/* step bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '3rem' }}>
        {[1, 2, 3, 4].map((n, i) => (
          <React.Fragment key={n}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '.4rem', flex: 1, maxWidth: 120 }}>
              <div style={{
                width: 42, height: 42, borderRadius: '50%', display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontWeight: 800, fontSize: '.85rem',
                background: n < step ? 'linear-gradient(135deg,var(--accent),var(--accent2))' : 'var(--card)',
                border: n === step ? '2px solid var(--accent)' : n < step ? '2px solid transparent' : '2px solid var(--border2)',
                color: n < step ? '#fff' : n === step ? 'var(--accent)' : 'var(--muted)',
                boxShadow: n === step ? '0 0 20px var(--glow)' : 'none', transition: 'all .4s',
              }}>
                {n < step ? '✓' : n}
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.65rem', letterSpacing: '1.5px', textTransform: 'uppercase', color: n === step ? 'var(--accent)' : 'var(--muted)' }}>
                {['Industry', 'Features', 'Audience', 'Generate'][n - 1]}
              </span>
            </div>
            {i < 3 && (
              <div style={{ flex: 1, height: 2, maxWidth: 80, background: n < step ? 'linear-gradient(90deg,var(--accent),var(--accent2))' : 'var(--border)', transition: 'background .4s' }} />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* STEP 1 — Industry */}
      {step === 1 && (
        <div style={{ animation: 'slideUp .4s ease' }}>
          <p style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--muted2)', marginBottom: '1.5rem' }}>Select your industry</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(130px,1fr))', gap: '.8rem', marginBottom: '2rem' }}>
            {INDUSTRIES.map(([name, emoji]) => (
              <div key={name} onClick={() => setIndustry(name)} style={card(industry === name)}>
                <div style={{ fontSize: '2rem', marginBottom: '.5rem' }}>{emoji}</div>
                <div style={{ fontSize: '.78rem', fontWeight: 700, color: industry === name ? 'var(--accent)' : 'var(--muted2)' }}>{name}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <PrimaryBtn onClick={() => setStep(2)}>Next: AI Features →</PrimaryBtn>
          </div>
        </div>
      )}

      {/* STEP 2 — Features */}
      {step === 2 && (
        <div style={{ animation: 'slideUp .4s ease' }}>
          <p style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--muted2)', marginBottom: '1.5rem' }}>Choose AI features</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.7rem', marginBottom: '2rem' }}>
            {AI_FEATURES.map((f) => (
              <div key={f} onClick={() => toggleFeat(f)} style={{
                padding: '.55rem 1.1rem', borderRadius: 100, userSelect: 'none',
                border: features.includes(f) ? '1.5px solid var(--accent)' : '1.5px solid var(--border2)',
                background: features.includes(f) ? 'rgba(124,92,252,.12)' : 'var(--card)',
                color: features.includes(f) ? 'var(--accent)' : 'var(--muted2)',
                fontSize: '.82rem', fontWeight: 700, cursor: 'none', transition: 'all .2s',
                boxShadow: features.includes(f) ? '0 0 12px var(--glow)' : 'none',
              }}>{f}</div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <GhostBtn onClick={() => setStep(1)}>← Back</GhostBtn>
            <PrimaryBtn onClick={() => setStep(3)}>Next: Audience →</PrimaryBtn>
          </div>
        </div>
      )}

      {/* STEP 3 — Audience */}
      {step === 3 && (
        <div style={{ animation: 'slideUp .4s ease' }}>
          <p style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--muted2)', marginBottom: '1.5rem' }}>Target audience?</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(160px,1fr))', gap: '.8rem', marginBottom: '2rem' }}>
            {AUDIENCES.map(([name, icon, desc]) => (
              <div key={name} onClick={() => setAudience(name)} style={{
                background: audience === name ? 'rgba(255,107,157,.08)' : 'var(--card)',
                border: audience === name ? '1.5px solid var(--accent2)' : '1.5px solid var(--border)',
                borderRadius: 10, padding: '1.5rem 1rem', textAlign: 'center', cursor: 'none',
                transition: 'all .25s', boxShadow: audience === name ? '0 8px 30px var(--glow-pink)' : 'none',
              }}>
                <div style={{ fontSize: '1.8rem', marginBottom: '.5rem' }}>{icon}</div>
                <div style={{ fontSize: '.85rem', fontWeight: 800, marginBottom: '.2rem', color: audience === name ? 'var(--accent2)' : 'var(--text)' }}>{name}</div>
                <div style={{ fontSize: '.72rem', color: 'var(--muted)' }}>{desc}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <GhostBtn onClick={() => setStep(2)}>← Back</GhostBtn>
            <PrimaryBtn onClick={() => goStep(4)}>⚡ Generate Idea</PrimaryBtn>
          </div>
        </div>
      )}

      {/* STEP 4 — Result */}
      {step === 4 && (
        <div style={{ animation: 'slideUp .4s ease' }}>
          {loading && <Spinner msg={STATUS_MSGS[statusIdx]} />}
          {!loading && idea && (
            <div style={{
              background: 'linear-gradient(135deg,rgba(124,92,252,.08),rgba(255,107,157,.05))',
              border: '1.5px solid rgba(124,92,252,.3)', borderRadius: 16, padding: '2.5rem',
              position: 'relative', overflow: 'hidden', boxShadow: '0 0 60px rgba(124,92,252,.12)',
              animation: 'scaleIn .5s ease',
            }}>
              <div style={{ position: 'absolute', top: -1, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,var(--accent),var(--accent2),transparent)' }} />
              <div style={{ display: 'inline-block', background: 'rgba(124,92,252,.15)', border: '1px solid rgba(124,92,252,.3)', color: 'var(--accent)', padding: '.3rem .9rem', borderRadius: 100, fontFamily: 'var(--font-mono)', fontSize: '.65rem', letterSpacing: 2, marginBottom: '1.2rem' }}>
                ✦ AI GENERATED · {idea.industry}
              </div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', fontStyle: 'italic', background: 'linear-gradient(135deg,var(--accent),var(--accent2))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '.4rem' }}>{idea.name}</div>
              <div style={{ color: 'var(--muted2)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '1rem' }}>{idea.tagline}</div>
              <p style={{ color: 'var(--muted2)', fontSize: '.9rem', lineHeight: 1.8, marginBottom: '1.8rem' }}>{idea.description}</p>
              <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                <ScoreBar label="Market Fit"  value={idea.scores.market}      color="var(--accent)" />
                <ScoreBar label="Feasibility" value={idea.scores.feasibility}  color="var(--accent3)" />
                <ScoreBar label="Uniqueness"  value={idea.scores.uniqueness}   color="var(--accent2)" />
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.5rem', marginBottom: '1.8rem' }}>
                {idea.tags.map((t) => (
                  <span key={t} style={{ padding: '.22rem .65rem', borderRadius: 100, background: 'rgba(0,245,200,.06)', border: '1px solid rgba(0,245,200,.2)', color: 'var(--accent3)', fontSize: '.65rem', fontFamily: 'var(--font-mono)' }}>{t}</span>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '.8rem', flexWrap: 'wrap' }}>
                <PrimaryBtn style={{ fontSize: '.8rem', padding: '.7rem 1.5rem' }} onClick={() => nav('bizplan')}>📋 Business Plan</PrimaryBtn>
                <GhostBtn style={{ fontSize: '.8rem', padding: '.7rem 1.5rem' }} onClick={() => { const ok = saveIdea(idea); toast(ok ? `"${idea.name}" saved!` : 'Already saved!', ok ? 'success' : 'info'); }}>💾 Save Idea</GhostBtn>
                <button onClick={() => { setStep(1); setIdea(null); }} style={{ background: 'transparent', border: '1.5px solid rgba(255,107,157,.3)', color: 'var(--accent2)', padding: '.7rem 1.5rem', borderRadius: 8, fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '.8rem', letterSpacing: '1.5px', textTransform: 'uppercase', cursor: 'none', transition: 'all .2s' }}>🔄 Regenerate</button>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

/* ──────────────────────────────────────────────────────────
   9. FOOTER
────────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--border)', padding: '2.5rem 3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', position: 'relative', zIndex: 1 }}>
      <div style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '1.3rem', background: 'linear-gradient(135deg,var(--accent),var(--accent2))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Hema AI</div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.68rem', color: 'var(--muted)' }}>© 2026 Hema AI · Smart Startup Builder · All Rights Reserved</div>
    </footer>
  );
}

/* ──────────────────────────────────────────────────────────
   10. APP ROOT
────────────────────────────────────────────────────────── */
const PAGES = {
  home:      HomePage,
  generator: GeneratorPage,
};

function AppInner() {
  const { page } = useApp();
  const Page = PAGES[page] || HomePage;
  return (
    <>
      <Navbar />
      <div className="app-wrapper" style={{ animation: 'fadeUp .45s ease' }}>
        <Page />
      </div>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Cursor />
      <Background />
      <AppInner />
    </AppProvider>
  );
}
