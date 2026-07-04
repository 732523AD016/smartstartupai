import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Features.module.css';

/* ─────────────────────────────────────────────────────────────
   featData  →  exact object from HTML JS block `const featData = {…}`
───────────────────────────────────────────────────────────── */
const FEAT_DATA = {
  ai: {
    icon: '🧠',
    title: 'Real AI Generation',
    body: 'Our core engine uses frontier LLMs to generate startup ideas grounded in real market data, emerging trends, and proven business models. Every idea is unique — no templates.',
    list: [
      'Contextual generation based on your inputs',
      'Market-aware suggestions using live signals',
      'Unique ideas — zero pre-written content',
      'Complete blueprint in seconds',
    ],
  },
  analytics: {
    icon: '📊',
    title: 'Market Analytics',
    body: "Don't just get an idea — understand the opportunity. Our analytics validates your concept before you spend a rupee.",
    list: [
      'TAM/SAM/SOM estimation',
      'Competitor landscape mapping',
      'VC funding activity in your sector',
      'Growth rate and trend signals',
    ],
  },
  blueprint: {
    icon: '🗺️',
    title: 'Business Blueprint',
    body: 'Every idea comes with a complete execution roadmap — from MVP features to go-to-market strategy.',
    list: [
      '90-day MVP launch plan',
      'Go-to-market strategy',
      'Revenue model breakdown',
      'Key metrics and KPIs to track',
    ],
  },
  collab: {
    icon: '🤝',
    title: 'Collaboration',
    body: 'Build with your co-founders. Share ideas, leave comments, vote on concepts, and assign tasks.',
    list: [
      'Real-time idea sharing',
      'Comment and feedback threads',
      'Voting and prioritization',
      'Role-based access control',
    ],
  },
  vault: {
    icon: '☁️',
    title: 'Idea Vault',
    body: 'Never lose a great idea. Save unlimited concepts, organize by project, and export in multiple formats.',
    list: [
      'Unlimited storage (Pro+)',
      'Tags and collections',
      'Export to PDF, Notion, Google Docs',
      'Version history',
    ],
  },
  pitch: {
    icon: '🎯',
    title: 'Pitch Deck AI',
    body: 'Turn your idea into an investor presentation in 5 minutes. AI generates slide content, structure, and talking points.',
    list: [
      '10-slide investor deck',
      'AI-written slide content',
      'Market visuals and traction charts',
      'Editable in Google Slides',
    ],
  },
  trend: {
    icon: '🔥',
    title: 'Trend Radar',
    body: 'Stay ahead with daily trend signals. Know which sectors are hot, what VCs are funding, and where opportunity lies.',
    list: [
      'Daily trending sector reports',
      'VC funding activity alerts',
      'Policy and regulation tracker',
      'Emerging technology signals',
    ],
  },
  lang: {
    icon: '🌐',
    title: 'Multi-language',
    body: 'Ideate in your native language. Hema AI supports Tamil, Hindi, English and 50+ languages.',
    list: [
      'Generate ideas in Tamil/Hindi/English',
      'Platform UI in 12 languages',
      'Localized market insights',
      'Voice input coming soon',
    ],
  },
  score: {
    icon: '⭐',
    title: 'AI Idea Scoring',
    body: "Every idea gets a multi-dimensional score — market fit, feasibility, and uniqueness — so you can prioritize the best opportunities.",
    list: [
      'Market fit score (0–100)',
      'Feasibility assessment',
      'Uniqueness rating vs competitors',
      'Improvement suggestions',
    ],
  },
};

/* ─────────────────────────────────────────────────────────────
   Feature cards — matches HTML .feat-grid .feat-box divs
───────────────────────────────────────────────────────────── */
const FEAT_BOXES = [
  { key: 'ai',        icon: '🧠', title: 'Real AI Generation', desc: 'Frontier AI generates unique, validated startup ideas based on your inputs.'       },
  { key: 'analytics', icon: '📊', title: 'Market Analytics',   desc: 'Real-time market sizing, competition mapping, and opportunity scoring.'            },
  { key: 'blueprint', icon: '🗺️', title: 'Business Blueprint', desc: 'Complete go-to-market strategy, revenue model, and MVP roadmap.'                   },
  { key: 'collab',    icon: '🤝', title: 'Collaboration',      desc: 'Share ideas, comment, vote, and build with your co-founders.'                      },
  { key: 'vault',     icon: '☁️', title: 'Idea Vault',         desc: 'Save, organize, and export all your ideas in multiple formats.'                    },
  { key: 'pitch',     icon: '🎯', title: 'Pitch Deck AI',      desc: 'Auto-generate investor-ready decks from your startup idea.'                        },
  { key: 'trend',     icon: '🔥', title: 'Trend Radar',        desc: 'Daily trending sectors, VC funding news, and market signals.'                      },
  { key: 'lang',      icon: '🌐', title: 'Multi-language',     desc: 'Generate ideas in Tamil, Hindi, English and 50+ languages.'                        },
  { key: 'score',     icon: '⭐', title: 'AI Idea Scoring',    desc: 'Every idea gets scored for market fit, feasibility, and uniqueness.'               },
];

/* ─────────────────────────────────────────────────────────────
   Modal  →  mirrors HTML .modal-overlay + .modal-box
             and JS openFeatModal() / closeFeatModal()
───────────────────────────────────────────────────────────── */
const FeatureModal = ({ data, onClose }) => {
  if (!data) return null;
  return (
    <AnimatePresence>
      <motion.div
        className={styles.overlay}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        /* HTML: onclick = if(e.target === modal) closeFeatModal() */
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          className={styles.modalBox}
          initial={{ opacity: 0, scale: 0.94, y: 16 }}
          animate={{ opacity: 1, scale: 1,    y: 0  }}
          exit={{   opacity: 0, scale: 0.94         }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* HTML: <button class="modal-close" onclick="closeFeatModal()">✕</button> */}
          <button className={styles.modalClose} onClick={onClose}>✕</button>

          {/* HTML: <span class="modal-big-icon" id="mIcon"></span> */}
          <span className={styles.modalIcon}>{data.icon}</span>

          {/* HTML: <div class="modal-title" id="mTitle"></div> */}
          <div className={styles.modalTitle}>{data.title}</div>

          {/* HTML: <div class="modal-body" id="mBody"></div> */}
          <div className={styles.modalBody}>{data.body}</div>

          {/* HTML: <div class="modal-list" id="mList"></div>  →  .ml-item each */}
          <div className={styles.modalList}>
            {data.list.map((item) => (
              <div key={item} className={styles.mlItem}>{item}</div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

/* ─────────────────────────────────────────────────────────────
   Features section
   →  mirrors HTML  <div class="page" id="page-features">
                       <section id="features"> … </section>
───────────────────────────────────────────────────────────── */
const Features = () => {
  const [activeKey, setActiveKey] = useState(null);

  /* HTML: function openFeatModal(key) { … } */
  const openModal  = (key) => setActiveKey(key);
  /* HTML: function closeFeatModal() { … } */
  const closeModal = () => setActiveKey(null);

  return (
    <section className={styles.section} id="features">

      {/* header */}
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* HTML: <div class="section-eyebrow">// Platform Capabilities</div> */}
        <p className={styles.eyebrow}>// Platform Capabilities</p>
        {/* HTML: <div class="section-h">Everything to launch</div> */}
        <h2 className={styles.sectionH}>Everything to launch</h2>
        {/* HTML: <p class="section-sub">Click any feature card…</p> */}
        <p className={styles.sectionSub}>Click any feature card to explore what it does</p>
      </motion.div>

      {/* ── .feat-grid ── */}
      <div className={styles.grid}>
        {FEAT_BOXES.map((f, i) => (
          <motion.div
            key={f.key}
            className={styles.featBox}
            /* HTML: onclick="openFeatModal('ai')" etc. */
            onClick={() => openModal(f.key)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
          >
            {/* bottom-line hover glow (HTML .feat-box::after) */}
            <div className={styles.hoverLine} />

            {/* HTML: <div class="fb-icon">🧠</div> */}
            <div className={styles.fbIcon}>{f.icon}</div>
            {/* HTML: <div class="fb-title">Real AI Generation</div> */}
            <div className={styles.fbTitle}>{f.title}</div>
            {/* HTML: <div class="fb-desc">…</div> */}
            <div className={styles.fbDesc}>{f.desc}</div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <FeatureModal
        data={activeKey ? FEAT_DATA[activeKey] : null}
        onClose={closeModal}
      />
    </section>
  );
};

export default Features;
