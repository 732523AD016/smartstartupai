import React, { createContext, useContext, useState, useCallback } from 'react';

/* ─────────────────────────────────────────────────────────────
   Context object
───────────────────────────────────────────────────────────── */
const AppContext = createContext(null);

/* ─────────────────────────────────────────────────────────────
   Seed idea — mirrors the HTML's DOMContentLoaded push:
     savedIdeas.push({ name:'VernacularMD', … fav:true });
───────────────────────────────────────────────────────────── */
const SEED_IDEA = {
  id: 1,
  name: 'VernacularMD',
  tagline: 'AI doctor in local language',
  description:
    'Hyperlocal AI healthcare assistant enabling rural patients to describe symptoms in 22 Indian languages.',
  problem:
    'Rural patients struggle to communicate medical symptoms in English, causing delayed care.',
  solution:
    'Voice-powered AI diagnostic tool supporting local languages with triage, referrals, and follow-up.',
  revenue: 'Per-consultation ₹99 + hospital API licensing + insurance commissions',
  market: '$4.2B rural healthcare TAM India',
  growth: 'ASHA worker distribution + state health dept partnerships',
  scores: { market: 85, feasibility: 78, uniqueness: 91 },
  tags: ['#HealthTech', '#NLP', '#Rural', '#India', '#B2C'],
  industry: 'HealthTech',
  audience: 'B2C',
  saved: 'Today',
  fav: true,
};

/* ─────────────────────────────────────────────────────────────
   Provider
───────────────────────────────────────────────────────────── */
export const AppProvider = ({ children }) => {

  /* ── savedIdeas  →  HTML: let savedIdeas = [] + DOMContentLoaded push ── */
  const [savedIdeas, setSavedIdeas] = useState([SEED_IDEA]);

  /* ── currentIdea  →  HTML: let currentIdea = null ── */
  const [currentIdea, setCurrentIdea] = useState(null);

  /* ── currentBizPlan  →  HTML: let currentBizPlan = null ── */
  const [currentBizPlan, setCurrentBizPlan] = useState(null);

  /* ── user / auth ── */
  const [user, setUser] = useState(null);

  /* ── trialActive  →  HTML: let trialActive = true ── */
  const [trialActive] = useState(true);

  /* ── selectedPlan  →  contact page plan picker, default "Pro" ── */
  const [selectedPlan, setSelectedPlan] = useState('Pro');

  /* ── stepper  →  HTML: let currentStep=1, selectedIndustry, selectedAudience ── */
  const [currentStep,       setCurrentStep]       = useState(1);
  const [selectedIndustry,  setSelectedIndustry]  = useState('HealthTech');
  const [selectedAudience,  setSelectedAudience]  = useState('B2C');

  /* ── selectedFeatures  →  HTML: .feat-chip.sel chips ── */
  const [selectedFeatures, setSelectedFeatures] = useState(['🤖 AI Personalization']);

  /* ── saveCurrentIdea()  →  HTML function saveCurrentIdea() ── */
  const saveIdea = useCallback((idea) => {
    const exists = savedIdeas.find((i) => i.name === idea.name);
    if (exists) return false;                      // already saved → return false
    setSavedIdeas((prev) => [
      { ...idea, id: Date.now(), saved: new Date().toLocaleDateString(), fav: false },
      ...prev,
    ]);
    return true;
  }, [savedIdeas]);

  /* ── toggleFav()  →  HTML function toggleFav(id) ── */
  const toggleFav = useCallback((id) => {
    setSavedIdeas((prev) =>
      prev.map((i) => (i.id === id ? { ...i, fav: !i.fav } : i))
    );
  }, []);

  /* ── deleteIdea()  →  HTML: savedIdeas = savedIdeas.filter(…) ── */
  const deleteIdea = useCallback((id) => {
    setSavedIdeas((prev) => prev.filter((i) => i.id !== id));
  }, []);

  /* ── loadIdea()  →  HTML function loadIdea(id) ── */
  const loadIdea = useCallback((id, navigateFn) => {
    const idea = savedIdeas.find((i) => i.id === id);
    if (idea) {
      setCurrentIdea(idea);
      if (navigateFn) navigateFn('/generator');
    }
    return idea || null;
  }, [savedIdeas]);

  /* ── doAuth()  →  HTML function doAuth() ── */
  const login  = useCallback((userData) => setUser(userData), []);
  const logout = useCallback(() => setUser(null), []);

  /* ── toggleChip()  →  HTML function toggleChip(el) ── */
  const toggleFeature = useCallback((feat) => {
    setSelectedFeatures((prev) =>
      prev.includes(feat)
        ? prev.filter((f) => f !== feat)
        : [...prev, feat]
    );
  }, []);

  /* ── resetStepper()  →  HTML function resetStepper() ── */
  const resetStepper = useCallback(() => {
    setCurrentStep(1);
    setSelectedIndustry('HealthTech');
    setSelectedAudience('B2C');
    setSelectedFeatures(['🤖 AI Personalization']);
  }, []);

  return (
    <AppContext.Provider
      value={{
        /* vault */
        savedIdeas,
        saveIdea,
        toggleFav,
        deleteIdea,
        loadIdea,

        /* working idea & plan */
        currentIdea,
        setCurrentIdea,
        currentBizPlan,
        setCurrentBizPlan,

        /* auth */
        user,
        login,
        logout,

        /* trial / billing */
        trialActive,
        selectedPlan,
        setSelectedPlan,

        /* stepper */
        currentStep,
        setCurrentStep,
        selectedIndustry,
        setSelectedIndustry,
        selectedAudience,
        setSelectedAudience,
        selectedFeatures,
        toggleFeature,
        resetStepper,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

/* ─────────────────────────────────────────────────────────────
   Hook
───────────────────────────────────────────────────────────── */
export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside <AppProvider>');
  return ctx;
};
