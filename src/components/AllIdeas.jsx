import React, { useState } from 'react';

/* ─────────────────────────────────────────────────────────────
   TRENDING DATA
───────────────────────────────────────────────────────────── */
const TRENDING_DATA = [
  {
    id: 1,
    name: 'VernacularMD',
    sub: 'AI doctor in local language for rural India',
    ind: 'HealthTech',
    hot: true,
    problem: 'Rural patients struggle to communicate symptoms accurately in English, causing delayed and incorrect diagnoses.',
    solution: 'Voice-powered AI diagnostic tool supporting 22 Indian languages with intelligent triage and specialist referrals.',
    revenue: '₹99/consultation + hospital API licensing + insurance commissions',
    market: '$4.2B rural healthcare TAM India',
    tags: ['#HealthTech', '#NLP', '#Rural', '#B2C'],
  },
  {
    id: 2,
    name: 'KiranaIQ',
    sub: 'Smart inventory AI for neighbourhood stores',
    ind: 'RetailTech',
    hot: true,
    problem: 'Kirana stores lose 30% revenue annually due to stockouts and overstock from manual ordering.',
    solution: 'WhatsApp-integrated AI that predicts demand, automates reordering, and optimises supplier relationships.',
    revenue: 'SaaS ₹999/mo + supplier referral commission',
    market: '$120B kirana retail market India',
    tags: ['#RetailTech', '#SMB', '#AI', '#WhatsApp'],
  },
  {
    id: 3,
    name: 'AgriSense',
    sub: 'Crop disease detection via smartphone camera',
    ind: 'AgriTech',
    hot: false,
    problem: 'Farmers lose 25% of crops annually from late or incorrect disease detection and treatment.',
    solution: 'Computer vision AI detecting 50+ crop diseases from smartphone photos in seconds with vernacular treatment advice.',
    revenue: 'Freemium + insurance partnerships + agri-input advertising',
    market: '$8.3B precision farming TAM India',
    tags: ['#AgriTech', '#ComputerVision', '#Farmers'],
  },
  {
    id: 4,
    name: 'SkillBridge AI',
    sub: 'Career coach for first-gen job seekers',
    ind: 'EdTech',
    hot: true,
    problem: 'First-generation graduates lack professional networks and career guidance, reducing employment by 40%.',
    solution: 'AI mentor providing personalised career paths, resume review, mock interviews, and job matching.',
    revenue: '$9/mo subscription + placement success fee + B2B employer partnerships',
    market: '$6B career coaching market globally',
    tags: ['#EdTech', '#CareerTech', '#AI'],
  },
  {
    id: 5,
    name: 'LegalEase',
    sub: 'Plain-language contract AI for MSMEs',
    ind: 'LegalTech',
    hot: false,
    problem: 'MSMEs sign contracts without understanding legal risks, costing billions in avoidable disputes annually.',
    solution: 'AI reads contracts, flags risks, and suggests safer alternatives in Tamil, Hindi, and English.',
    revenue: '₹99/document + monthly SaaS subscription',
    market: '$3.2B SME legal services market',
    tags: ['#LegalTech', '#NLP', '#MSME'],
  },
  {
    id: 6,
    name: 'CarbonTrace',
    sub: 'Supply chain carbon footprint tracker',
    ind: 'CleanTech',
    hot: true,
    problem: 'Companies cannot accurately measure Scope 3 emissions across fragmented supply chains.',
    solution: 'IoT sensor network + AI platform providing real-time supply chain carbon monitoring and reporting.',
    revenue: 'Enterprise SaaS $2K/mo + ESG audit integration',
    market: '$12B carbon management market globally',
    tags: ['#CleanTech', '#ESG', '#Enterprise'],
  },
];

/* ─────────────────────────────────────────────────────────────
   STYLES  (converted from AllIdeas.module.css → JS objects)
───────────────────────────────────────────────────────────── */
const S = {
  /* .section */
  section: {
    padding: '6rem 2rem',
    background: 'var(--surface)',
    position: 'relative',
    zIndex: 1,
  },

  /* .header */
  header: {
    maxWidth: 1100,
    margin: '0 auto 3rem',
  },

  /* .eyebrow */
  eyebrow: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.68rem',
    color: 'var(--accent)',
    letterSpacing: 3,
    textTransform: 'uppercase',
    marginBottom: '0.8rem',
  },

  /* .sectionH */
  sectionH: {
    fontFamily: "'Instrument Serif', serif",
    fontSize: 'clamp(2rem, 4vw, 3.2rem)',
    fontStyle: 'italic',
    lineHeight: 1.1,
    letterSpacing: '-1px',
  },

  /* .sectionSub */
  sectionSub: {
    color: 'var(--muted2)',
    fontSize: '0.95rem',
    lineHeight: 1.8,
    marginTop: '0.5rem',
    maxWidth: 500,
  },

  /* .layout */
  layout: {
    maxWidth: 1100,
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: '1fr 380px',
    gap: '2rem',
    alignItems: 'start',
  },

  /* .feed */
  feed: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.8px',
    background: 'var(--border)',
    border: '1.5px solid var(--border)',
    borderRadius: 14,
    overflow: 'hidden',
  },

  /* .trendRow */
  trendRow: (active) => ({
    background: active ? 'rgba(124, 92, 252, 0.05)' : 'var(--card)',
    display: 'flex',
    alignItems: 'center',
    gap: '1.2rem',
    padding: '1.3rem 1.8rem',
    cursor: 'pointer',
    transition: 'all 0.2s',
    borderLeft: active ? '3px solid var(--accent)' : '3px solid transparent',
  }),

  /* .trendRank */
  trendRank: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.65rem',
    color: 'var(--muted)',
    minWidth: '2rem',
  },

  /* .trendInfo */
  trendInfo: { flex: 1 },

  /* .trendName */
  trendName: {
    fontWeight: 800,
    fontSize: '0.92rem',
    marginBottom: '0.2rem',
  },

  /* .trendSub */
  trendSub: {
    fontSize: '0.75rem',
    color: 'var(--muted2)',
  },

  /* .trendBadge */
  trendBadge: (hot) => ({
    padding: '0.2rem 0.6rem',
    borderRadius: 100,
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.62rem',
    border: hot
      ? '1px solid rgba(255, 209, 102, 0.3)'
      : '1px solid var(--border2)',
    color: hot ? 'var(--gold)' : 'var(--muted2)',
    whiteSpace: 'nowrap',
  }),

  /* .detailPanel */
  detailPanel: {
    background: 'var(--card)',
    border: '1.5px solid var(--border2)',
    borderRadius: 14,
    padding: '2rem',
    position: 'sticky',
    top: 80,
    minHeight: 300,
    transition: 'all 0.3s',
  },

  /* .panelEmpty */
  panelEmpty: {
    textAlign: 'center',
    padding: '3rem 1rem',
    color: 'var(--muted)',
    fontSize: '0.85rem',
  },

  /* .panelTag */
  panelTag: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.62rem',
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: 'var(--accent)',
    marginBottom: '0.7rem',
  },

  /* .panelName */
  panelName: {
    fontFamily: "'Instrument Serif', serif",
    fontSize: '1.7rem',
    fontStyle: 'italic',
    color: 'var(--accent)',
    marginBottom: '0.5rem',
  },

  /* .panelTagline */
  panelTagline: {
    color: 'var(--muted2)',
    fontSize: '0.85rem',
    lineHeight: 1.7,
    marginBottom: '1.5rem',
  },

  /* .panelSection */
  panelSection: { marginBottom: '1.1rem' },

  /* .panelSectionLabel */
  panelSectionLabel: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.6rem',
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: 'var(--muted)',
    marginBottom: '0.4rem',
  },

  /* .panelSectionVal */
  panelSectionVal: {
    fontSize: '0.87rem',
    color: 'var(--text)',
    lineHeight: 1.6,
  },

  /* .panelTags */
  panelTags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
    marginTop: '1rem',
  },

  /* .ptag */
  ptag: {
    padding: '0.22rem 0.65rem',
    borderRadius: 100,
    background: 'rgba(0, 245, 200, 0.06)',
    border: '1px solid rgba(0, 245, 200, 0.2)',
    color: 'var(--accent3)',
    fontSize: '0.65rem',
    fontFamily: "'Space Mono', monospace",
  },

  /* .panelBtn */
  panelBtn: {
    width: '100%',
    marginTop: '1.5rem',
    padding: '0.9rem',
    borderRadius: 8,
    border: '1.5px solid rgba(124, 92, 252, 0.3)',
    background: 'rgba(124, 92, 252, 0.08)',
    color: 'var(--accent)',
    fontFamily: "'Syne', sans-serif",
    fontWeight: 800,
    fontSize: '0.8rem',
    letterSpacing: 2,
    textTransform: 'uppercase',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
};

/* ─────────────────────────────────────────────────────────────
   DETAIL PANEL
───────────────────────────────────────────────────────────── */
const DetailPanel = ({ idea, onGenerate }) => {
  if (!idea) {
    return (
      <div style={S.panelEmpty}>
        <div style={{ fontSize: '2.5rem', opacity: 0.3, marginBottom: '1rem' }}>🚀</div>
        <div>Select an idea to see full details</div>
      </div>
    );
  }

  const SECTIONS = [
    { label: 'Problem',  val: idea.problem  },
    { label: 'Solution', val: idea.solution },
    { label: 'Revenue',  val: idea.revenue  },
    { label: 'Market',   val: idea.market   },
  ];

  return (
    <div key={idea.id} style={{ animation: 'slideUp 0.25s ease' }}>
      {/* .panel-tag */}
      <div style={S.panelTag}>✦ {idea.ind}</div>

      {/* .panel-name */}
      <div style={S.panelName}>{idea.name}</div>

      {/* .panel-tagline */}
      <div style={S.panelTagline}>{idea.sub}</div>

      {/* .panel-section × 4 */}
      {SECTIONS.map(({ label, val }) => (
        <div key={label} style={S.panelSection}>
          <div style={S.panelSectionLabel}>{label}</div>
          <div style={S.panelSectionVal}>{val}</div>
        </div>
      ))}

      {/* .panel-tags */}
      <div style={S.panelTags}>
        {idea.tags.map((t) => (
          <span key={t} style={S.ptag}>{t}</span>
        ))}
      </div>

      {/* .panel-btn */}
      <button
        style={S.panelBtn}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(124, 92, 252, 0.15)';
          e.currentTarget.style.borderColor = 'var(--accent)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(124, 92, 252, 0.08)';
          e.currentTarget.style.borderColor = 'rgba(124, 92, 252, 0.3)';
        }}
        onClick={onGenerate}
      >
        Generate Similar →
      </button>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────────────────── */
const AllIdeas = ({ onNavigate }) => {
  const [selected, setSelected] = useState(null);
  const [hovered, setHovered] = useState(null);

  return (
    <>
      {/* slideUp keyframe injected once */}
      <style>{`@keyframes slideUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}`}</style>

      <section style={S.section} id="ideas">

        {/* Header */}
        <div style={S.header}>
          <p style={S.eyebrow}>// Community Feed</p>
          <h2 style={S.sectionH}>Trending Ideas</h2>
          <p style={S.sectionSub}>
            Real startup ideas generated on Hema AI — click any to explore
          </p>
        </div>

        {/* Layout: feed + detail panel */}
        <div style={S.layout}>

          {/* ── Feed ── */}
          <div style={S.feed}>
            {TRENDING_DATA.map((idea, i) => {
              const isActive  = selected?.id === idea.id;
              const isHovered = hovered === idea.id;
              return (
                <div
                  key={idea.id}
                  style={{
                    ...S.trendRow(isActive),
                    background: isActive
                      ? 'rgba(124, 92, 252, 0.05)'
                      : isHovered
                      ? 'var(--card2)'
                      : 'var(--card)',
                  }}
                  onClick={() => setSelected(idea)}
                  onMouseEnter={() => setHovered(idea.id)}
                  onMouseLeave={() => setHovered(null)}
                >
                  {/* rank */}
                  <span style={S.trendRank}>
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  {/* name + sub */}
                  <div style={S.trendInfo}>
                    <div style={S.trendName}>{idea.name}</div>
                    <div style={S.trendSub}>{idea.sub}</div>
                  </div>

                  {/* hot badge */}
                  <span style={S.trendBadge(idea.hot)}>
                    {idea.hot ? '🔥 Hot' : idea.ind}
                  </span>
                </div>
              );
            })}
          </div>

          {/* ── Detail Panel ── */}
          <div style={S.detailPanel}>
            <DetailPanel
              idea={selected}
              onGenerate={() =>
                onNavigate ? onNavigate('generator') : console.log('navigate to generator')
              }
            />
          </div>

        </div>
      </section>
    </>
  );
};

export default AllIdeas;
