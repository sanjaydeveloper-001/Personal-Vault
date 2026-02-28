import { Link } from "react-router-dom";

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

body, html { background: #0a0e1a; }

.pp-root {
  font-family: 'DM Sans', sans-serif;
  min-height: 100vh;
  background: #0a0e1a;
  padding: 48px 16px 80px;
  position: relative;
  overflow-x: hidden;
}

/* ── Background ── */
.pp-grid {
  position: fixed; inset: 0; pointer-events: none; z-index: 0;
  background-image:
    linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
  background-size: 40px 40px;
}
.pp-glow-tr {
  position: fixed; top: -150px; right: -150px;
  width: 500px; height: 500px; border-radius: 50%; pointer-events: none; z-index: 0;
  background: radial-gradient(circle, rgba(251,191,36,0.05) 0%, transparent 70%);
}
.pp-glow-bl {
  position: fixed; bottom: -200px; left: -100px;
  width: 600px; height: 600px; border-radius: 50%; pointer-events: none; z-index: 0;
  background: radial-gradient(circle, rgba(129,140,248,0.04) 0%, transparent 70%);
}

/* ── Content ── */
.pp-content {
  position: relative; z-index: 10;
  max-width: 760px; margin: 0 auto;
}

/* ── Back button ── */
.pp-back {
  display: inline-flex; align-items: center; gap: 6px;
  color: #6b7280; font-size: 0.85rem;
  text-decoration: none; transition: color 0.2s;
  margin-bottom: 28px;
}
.pp-back:hover { color: #fbbf24; }

/* ── Page header (glass card) ── */
.pp-header-card {
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.08);
  backdrop-filter: blur(12px);
  border-radius: 20px;
  padding: 28px 32px;
  margin-bottom: 16px;
}
.pp-logo-row {
  display: flex; align-items: center; gap: 9px;
  margin-bottom: 20px;
}
.pp-logo-ico {
  width: 32px; height: 32px; border-radius: 9px;
  background: linear-gradient(135deg, #f59e0b, #d97706);
  display: flex; align-items: center; justify-content: center;
}
.pp-logo-name {
  font-family: 'DM Serif Display', serif;
  font-size: 1.2rem; color: #f1f5f9;
}
.pp-eyebrow {
  display: inline-flex; align-items: center; gap: 6px;
  font-size: 0.67rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase;
  color: #fbbf24; background: rgba(251,191,36,0.08);
  border: 1px solid rgba(251,191,36,0.15);
  border-radius: 20px; padding: 3px 10px; margin-bottom: 10px;
}
.pp-headline {
  font-family: 'DM Serif Display', serif;
  font-size: clamp(1.7rem, 4vw, 2.4rem);
  color: #f8fafc; letter-spacing: -0.03em; line-height: 1.08;
  margin-bottom: 6px;
}
.pp-tagline { color: #6b7280; font-size: 0.875rem; }

/* ── TOC card ── */
.pp-toc-card {
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.07);
  backdrop-filter: blur(12px);
  border-radius: 16px;
  padding: 16px 20px;
  margin-bottom: 12px;
}
.pp-toc-label {
  font-size: 0.67rem; font-weight: 600; color: #4b5563;
  letter-spacing: 0.08em; text-transform: uppercase;
  margin-bottom: 10px;
}
.pp-toc-links { display: flex; flex-wrap: wrap; gap: 6px; }
.pp-toc-link {
  display: inline-flex; align-items: center;
  background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.07);
  border-radius: 8px; padding: 4px 10px;
  color: #6b7280; font-size: 0.73rem; text-decoration: none;
  transition: all 0.18s;
}
.pp-toc-link:hover {
  background: rgba(251,191,36,0.07); border-color: rgba(251,191,36,0.2);
  color: #fbbf24;
}

/* ── Section cards ── */
.pp-section {
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.07);
  backdrop-filter: blur(12px);
  border-radius: 16px; overflow: hidden;
  margin-bottom: 10px;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.pp-section:hover {
  border-color: rgba(255,255,255,0.11);
  box-shadow: 0 8px 30px rgba(0,0,0,0.35);
}
.pp-section-hd {
  display: flex; align-items: center; gap: 12px;
  padding: 13px 20px;
  background: rgba(255,255,255,0.025);
  border-bottom: 1px solid rgba(255,255,255,0.06);
}
.pp-num {
  width: 26px; height: 26px; border-radius: 8px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  background: rgba(251,191,36,0.08); border: 1px solid rgba(251,191,36,0.16);
  font-size: 0.7rem; font-weight: 700; color: #fbbf24;
  font-family: 'DM Sans', sans-serif;
}
.pp-section-title {
  font-family: 'DM Serif Display', serif;
  font-size: 0.95rem; color: #f1f5f9;
}
.pp-section-bd {
  padding: 15px 20px;
  color: #9ca3af; font-size: 0.84rem; line-height: 1.78;
}
.pp-section-bd p { margin: 0; }
.pp-section-bd strong { color: #e2e8f0; }
.pp-section-bd a { color: #fbbf24; text-decoration: none; }
.pp-section-bd a:hover { text-decoration: underline; }

/* list items */
.pp-list {
  list-style: none; padding: 0;
  display: flex; flex-direction: column; gap: 5px;
  margin-top: 10px;
}
.pp-li {
  display: flex; align-items: flex-start; gap: 9px;
  padding: 8px 11px;
  background: rgba(255,255,255,0.025); border: 1px solid rgba(255,255,255,0.05);
  border-radius: 8px; font-size: 0.82rem; color: #9ca3af;
}
.pp-dot {
  width: 5px; height: 5px; border-radius: 50%;
  background: #fbbf24; flex-shrink: 0; margin-top: 7px;
}

/* ── Entrance ── */
@keyframes ppFadeUp {
  from { opacity: 0; transform: translateY(18px); }
  to   { opacity: 1; transform: translateY(0); }
}
.pp-in { animation: ppFadeUp 0.5s ease forwards; opacity: 0; }
`;

const sections = [
  {
    num: "1", title: "Introduction",
    body: (
      <p>VaultNotes ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our service.</p>
    ),
  },
  {
    num: "2", title: "Information We Collect",
    body: (
      <>
        <p>We collect the following types of information:</p>
        <ul className="pp-list">
          <li className="pp-li"><span className="pp-dot"/><span><strong>Account Information:</strong> username and password (hashed). No email required.</span></li>
          <li className="pp-li"><span className="pp-dot"/><span><strong>User Content:</strong> notes, links, and files you choose to store.</span></li>
          <li className="pp-li"><span className="pp-dot"/><span><strong>Usage Data:</strong> anonymous analytics about how you interact with the service.</span></li>
        </ul>
      </>
    ),
  },
  {
    num: "3", title: "How We Use Your Information",
    body: (
      <>
        <p>We use your information to:</p>
        <ul className="pp-list">
          <li className="pp-li"><span className="pp-dot"/><span>Provide, maintain, and improve our service.</span></li>
          <li className="pp-li"><span className="pp-dot"/><span>Authenticate your access.</span></li>
          <li className="pp-li"><span className="pp-dot"/><span>Respond to your support requests.</span></li>
          <li className="pp-li"><span className="pp-dot"/><span>Ensure security and prevent abuse.</span></li>
        </ul>
      </>
    ),
  },
  {
    num: "4", title: "Data Storage & Security",
    body: <p>Your data is stored encrypted on secure servers. We use industry‑standard measures to protect your information. However, no method of transmission over the Internet is 100% secure.</p>,
  },
  {
    num: "5", title: "Sharing Your Information",
    body: <p>We do not sell, trade, or rent your personal information to others. We may share anonymized aggregated data for analytical purposes.</p>,
  },
  {
    num: "6", title: "Your Rights",
    body: <p>You can access, update, or delete your account and content at any time. Deleted items are moved to trash and permanently removed after 30 days.</p>,
  },
  {
    num: "7", title: "Changes to This Policy",
    body: <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page.</p>,
  },
  {
    num: "8", title: "Contact Us",
    body: <p>If you have questions about this Privacy Policy, please <Link to="/help">contact us via the Help Center</Link>.</p>,
  },
];

const PrivacyPolicy = () => (
  <div className="pp-root">
    <style>{STYLES}</style>

    {/* Backgrounds */}
    <div className="pp-grid" />
    <div className="pp-glow-tr" />
    <div className="pp-glow-bl" />

    <div className="pp-content">
      {/* Back */}
      <Link to="/help" className="pp-back pp-in" style={{ animationDelay: "0s" }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        Back to Help Center
      </Link>

      {/* Header card */}
      <div className="pp-header-card pp-in" style={{ animationDelay: "0.05s" }}>
        <div className="pp-logo-row">
          <div className="pp-logo-ico">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <rect x="3" y="11" width="18" height="11" rx="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </div>
          <span className="pp-logo-name">VaultNotes</span>
        </div>
        <div className="pp-eyebrow">
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
          Legal
        </div>
        <h1 className="pp-headline">Privacy Policy</h1>
        <p className="pp-tagline">
          Last updated:{" "}
          {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        </p>
      </div>

      {/* TOC */}
      <div className="pp-toc-card pp-in" style={{ animationDelay: "0.1s" }}>
        <div className="pp-toc-label">Jump to section</div>
        <div className="pp-toc-links">
          {sections.map((s) => (
            <a key={s.num} href={`#pp-${s.num}`} className="pp-toc-link">
              {s.num}. {s.title}
            </a>
          ))}
        </div>
      </div>

      {/* Sections */}
      {sections.map((s, i) => (
        <div
          key={s.num}
          id={`pp-${s.num}`}
          className="pp-section pp-in"
          style={{ animationDelay: `${0.13 + i * 0.05}s` }}
        >
          <div className="pp-section-hd">
            <div className="pp-num">{s.num}</div>
            <div className="pp-section-title">{s.title}</div>
          </div>
          <div className="pp-section-bd">{s.body}</div>
        </div>
      ))}
    </div>
  </div>
);

export default PrivacyPolicy;