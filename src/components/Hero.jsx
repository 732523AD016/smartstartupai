import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './Hero.module.css';

/* ─────────────────────────────────────────────────────────────
   Mirrors the HTML  <section id="hero"> … </section>  block
   inside  <div class="page active" id="page-hero">
───────────────────────────────────────────────────────────── */

/* reusable fade-up variant (same as HTML @keyframes fadeUp) */
const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 16 },
  animate:    { opacity: 1, y: 0  },
  transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
});

/* stats data — matches HTML .hero-stats divs */
const STATS = [
  { n: '3,200+', l: 'Ideas Generated' },
  { n: '98%',    l: 'Satisfaction'     },
  { n: '60+',    l: 'Industries'       },
  { n: '4.9★',   l: 'User Rating'      },
];

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className={styles.hero} id="home">

      {/* ── .hero-chip ── HTML: <div class="hero-chip"><div class="chip-dot"></div>…</div> */}
      <motion.div className={styles.chip} {...fadeUp(0)}>
        <span className={styles.chipDot} />
        AI Startup Intelligence Platform
      </motion.div>

      {/* ── .hero-h1 ── HTML: <h1 class="hero-h1">Turn your idea<br>into a <em class="grad">startup</em></h1> */}
      <motion.h1 className={styles.h1} {...fadeUp(0.1)}>
        Turn your idea<br />
        into a <em className={styles.grad}>startup</em>
      </motion.h1>

      {/* sub-heading — HTML inline "with AI" text styled as .hero-h2 */}
      <motion.p className={styles.h2} {...fadeUp(0.15)}>
        with AI
      </motion.p>

      {/* ── .hero-sub ── */}
      <motion.p className={styles.sub} {...fadeUp(0.2)}>
        Generate complete startup blueprints with AI — from idea to business plan,
        revenue strategy, and market analysis in minutes.
      </motion.p>

      {/* ── .hero-cta ──
            HTML: <button class="btn-hero" onclick="showPage('generator')">⚡ Generate…</button>
                  <button class="btn-outline-hero" onclick="showPage('features')">Explore Features</button>
      */}
      <motion.div className={styles.ctas} {...fadeUp(0.3)}>
        <button
          className={styles.btnHero}
          onClick={() => navigate('/generator')}
        >
          ⚡ Generate Startup Idea
        </button>
        <button
          className={styles.btnOutline}
          onClick={() =>
            document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })
          }
        >
          Explore Features
        </button>
      </motion.div>

      {/* ── .hero-stats ── */}
      <motion.div className={styles.stats} {...fadeUp(0.5)}>
        {STATS.map((s) => (
          <div key={s.l} className={styles.statItem}>
            <div className={styles.statN}>{s.n}</div>
            <div className={styles.statL}>{s.l}</div>
          </div>
        ))}
      </motion.div>

      {/* ── .scroll-ind ── HTML: <div class="scroll-ind">…</div> */}
      <motion.div className={styles.scrollInd} {...fadeUp(0.8)}>
        <div className={styles.scrollLine} />
        <span>scroll to explore</span>
      </motion.div>

    </section>
  );
};

export default Hero;
