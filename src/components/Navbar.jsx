import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import styles from './Navbar.module.css';

/* ─────────────────────────────────────────────────────────────
   Matches the HTML <nav> block exactly:
   .nav-logo | .nav-links a | .nav-actions (.btn-ghost / .btn-nav)
───────────────────────────────────────────────────────────── */
const NAV_LINKS = [
  { to: '/generator', label: 'Generator' },
  { to: '/trending',  label: 'Trending'  },
  { to: '/#features', label: 'Features'  },
  { to: '/pricing',   label: 'Pricing'   },
  { to: '/contact',   label: 'Contact'   },
];

const Navbar = () => {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const { user, logout }          = useApp();
  const location                  = useLocation();
  const navigate                  = useNavigate();

  /* scroll listener → adds backdrop when page scrolls (like HTML nav blur) */
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  /* close mobile menu on route change */
  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  return (
    <>
      {/* ── Main nav bar ── */}
      <motion.nav
        className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Logo — .nav-logo from HTML */}
        <Link to="/" className={styles.logo}>Hema AI</Link>

        {/* Desktop links — .nav-links from HTML */}
        <ul className={styles.links}>
          {NAV_LINKS.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                className={`${styles.link} ${location.pathname === l.to ? styles.active : ''}`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Actions — .nav-actions (.btn-ghost / .btn-nav) from HTML */}
        <div className={styles.actions}>
          {user ? (
            <>
              <button
                className={styles.btnGhost}
                onClick={() => navigate('/dashboard')}
              >
                Dashboard
              </button>
              <button
                className={styles.btnNav}
                onClick={() => { logout(); navigate('/'); }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {/* HTML: <button class="btn-ghost" onclick="showPage('auth')">Login</button> */}
              <button
                className={styles.btnGhost}
                onClick={() => navigate('/auth')}
              >
                Login
              </button>
              {/* HTML: <button class="btn-nav" onclick="showPage('dashboard')">Dashboard</button> */}
              <button
                className={styles.btnNav}
                onClick={() => navigate('/generator')}
              >
                Get Started
              </button>
            </>
          )}
        </div>

        {/* Hamburger — mobile only */}
        <button
          className={styles.hamburger}
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span className={menuOpen ? styles.barOpen : ''} />
          <span className={menuOpen ? styles.barOpen : ''} />
          <span className={menuOpen ? styles.barOpen : ''} />
        </button>
      </motion.nav>

      {/* ── Mobile slide-down menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0  }}
            exit={{   opacity: 0, y: -8  }}
            transition={{ duration: 0.22 }}
          >
            {NAV_LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={styles.mobileLink}
              >
                {l.label}
              </Link>
            ))}
            <button
              className={styles.btnNav}
              style={{ width: '100%', marginTop: '1rem' }}
              onClick={() => navigate('/generator')}
            >
              Get Started
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
