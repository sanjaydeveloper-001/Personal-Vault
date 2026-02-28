import { Link } from "react-router-dom";

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

body, html { background: #0a0e1a; }

.tc-root {
  font-family: 'DM Sans', sans-serif;
  min-height: 100vh;
  background: #0a0e1a;
  padding: 48px 16px 80px;
  position: relative;
  overflow-x: hidden;
}

/* ── Background ── */
.tc-grid {
  position: fixed; inset: 0; pointer-events: none; z-index: 0;
  background-image:
    linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
  background-size: 40px 40px;
}
.tc-glow-tr {
  position: fixed; top: -150px; right: -150px;
  width: 500px; height: 500px; border-radius: 50%; pointer-events: none; z-index: 0;
  background: radial-gradient(circle, rgba(129,140,248,0.06) 0%, transparent 70%);
}
.tc-glow-bl {
  position: fixed; bottom: -200px; left: -100px;
  width: 600px; height: 600px; border-radius: 50%; pointer-events: none; z-index: 0;
  background: radial-gradient(circle, rgba(251,191,36,0.03) 0%, transparent 70%);
}

/* ── Content ── */
.tc-content {
  position: relative; z-index: 10;
  max-width: 760px; margin: 0 auto;
}

/* ── Back button ── */
.tc-back {
  display: inline-flex; align-items: center; gap: 6px;
  color: #6b7280; font-size: 0.85rem;
  text-decoration: none; transition: color 0.2s;
  margin-bottom: 28px;
}
.tc-back:hover { color: #818cf8; }

/* ── Header card ── */
.tc-header-card {
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.08);
  backdrop-filter: blur(12px);
  border-radius: 20px;
  padding: 28px 32px;
  margin-bottom: 16px;
}
.tc-logo-row {
  display: flex; align-items: center; gap: 9px;
  margin-bottom: 20px;
}
.tc-logo-ico {
  width: 32px; height: 32px; border-radius: 9px;
  background: linear-gradient(135deg, #f59e0b, #d97706);
  display: flex; align-items: center; justify-content: center;
}
.tc-logo-name {
  font-family: 'DM Serif Display', serif;
  font-size: 1.2rem; color: #f1f5f9;
}
.tc-eyebrow {
  display: inline-flex; align-items: center; gap: 6px;
  font-size: 0.67rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase;
  color: #818cf8; background: rgba(129,140,248,0.08);
  border: 1px solid rgba(129,140,248,0.16);
  border-radius: 20px; padding: 3px 10px; margin-bottom: 10px;
}
.tc-headline {
  font-family: 'DM Serif Display', serif;
  font-size: clamp(1.7rem, 4vw, 2.4rem);
  color: #f8fafc; letter-spacing: -0.03em; line-height: 1.08;
  margin-bottom: 6px;
}
.tc-tagline { color: #6b7280; font-size: 0.875rem; }

/* ── TOC card ── */
.tc-toc-card {
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.07);
  backdrop-filter: blur(12px);
  border-radius: 16px;
  padding: 16px 20px;
  margin-bottom: 12px;
}
.tc-toc-label {
  font-size: 0.67rem; font-weight: 600; color: #4b5563;
  letter-spacing: 0.08em; text-transform: uppercase;
  margin-bottom: 10px;
}
.tc-toc-links { display: flex; flex-wrap: wrap; gap: 6px; }
.tc-toc-link {
  display: inline-flex; align-items: center;
  background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.07);
  border-radius: 8px; padding: 4px 10px;
  color: #6b7280; font-size: 0.73rem; text-decoration: none;
  transition: all 0.18s;
}
.tc-toc-link:hover {
  background: rgba(129,140,248,0.08); border-color: rgba(129,140,248,0.2);
  color: #818cf8;
}

/* ── Section cards ── */
.tc-section {
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.07);
  backdrop-filter: blur(12px);
  border-radius: 16px; overflow: hidden;
  margin-bottom: 10px;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.tc-section:hover {
  border-color: rgba(255,255,255,0.11);
  box-shadow: 0 8px 30px rgba(0,0,0,0.35);
}
.tc-section-hd {
  display: flex; align-items: center; gap: 12px;
  padding: 13px 20px;
  background: rgba(255,255,255,0.025);
  border-bottom: 1px solid rgba(255,255,255,0.06);
}
.tc-num {
  width: 26px; height: 26px; border-radius: 8px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  background: rgba(129,140,248,0.08); border: 1px solid rgba(129,140,248,0.18);
  font-size: 0.7rem; font-weight: 700; color: #818cf8;
  font-family: 'DM Sans', sans-serif;
}
.tc-section-title {
  font-family: 'DM Serif Display', serif;
  font-size: 0.95rem; color: #f1f5f9;
}
.tc-section-bd {
  padding: 15px 20px;
  color: #9ca3af; font-size: 0.84rem; line-height: 1.78;
}
.tc-section-bd p { margin: 0; }
.tc-section-bd strong { color: #e2e8f0; }
.tc-section-bd a { color: #818cf8; text-decoration: none; }
.tc-section-bd a:hover { text-decoration: underline; }

/* list items */
.tc-list {
  list-style: none; padding: 0;
  display: flex; flex-direction: column; gap: 5px;
  margin-top: 10px;
}
.tc-li {
  display: flex; align-items: flex-start; gap: 9px;
  padding: 8px 11px;
  background: rgba(255,255,255,0.025); border: 1px solid rgba(255,255,255,0.05);
  border-radius: 8px; font-size: 0.82rem; color: #9ca3af;
}
.tc-dot {
  width: 5px; height: 5px; border-radius: 50%;
  background: #818cf8; flex-shrink: 0; margin-top: 7px;
}

/* ── Entrance ── */
@keyframes tcFadeUp {
  from { opacity: 0; transform: translateY(18px); }
  to   { opacity: 1; transform: translateY(0); }
}
.tc-in { animation: tcFadeUp 0.5s ease forwards; opacity: 0; }
`;

const sections = [
  {
    num: "1", title: "Acceptance of Terms",
    body: <p>By accessing or using VaultNotes ("the Service"), you agree to be bound by these Terms. If you do not agree, you may not use the Service.</p>,
  },
  {
    num: "2", title: "Eligibility",
    body: <p>You must be at least 13 years old to use the Service. By using the Service, you represent that you meet this requirement.</p>,
  },
  {
    num: "3", title: "Account Responsibility",
    body: <p>You are responsible for maintaining the confidentiality of your username and password. You are also responsible for all activities that occur under your account.</p>,
  },
  {
    num: "4", title: "Acceptable Use",
    body: (
      <>
        <p>You agree not to:</p>
        <ul className="tc-list">
          <li className="tc-li"><span className="tc-dot"/><span>Use the Service for any illegal purpose.</span></li>
          <li className="tc-li"><span className="tc-dot"/><span>Upload or share content that infringes on others' rights.</span></li>
          <li className="tc-li"><span className="tc-dot"/><span>Attempt to gain unauthorized access to other accounts.</span></li>
          <li className="tc-li"><span className="tc-dot"/><span>Use the Service to distribute malware or harmful code.</span></li>
        </ul>
      </>
    ),
  },
  {
    num: "5", title: "Content Ownership",
    body: <p>You retain all rights to the content you store. We do not claim ownership over your notes, links, or files. You grant us a license to store and display your content solely to provide the Service.</p>,
  },
  {
    num: "6", title: "Data Retention",
    body: <p>We keep your data as long as your account is active. Deleted items are moved to trash and permanently removed after 30 days unless you empty trash manually.</p>,
  },
  {
    num: "7", title: "Service Availability",
    body: <p>We strive to keep the Service available 24/7, but we do not guarantee uninterrupted access. We may temporarily suspend access for maintenance or updates.</p>,
  },
  {
    num: "8", title: "Limitation of Liability",
    body: <p>To the fullest extent permitted by law, VaultNotes shall not be liable for any indirect, incidental, or consequential damages arising out of your use of the Service.</p>,
  },
  {
    num: "9", title: "Changes to Terms",
    body: <p>We may update these Terms from time to time. Continued use of the Service after changes constitutes acceptance of the new Terms.</p>,
  },
  {
    num: "10", title: "Contact",
    body: <p>For any questions about these Terms, please <Link to="/help">contact us via the Help Center</Link>.</p>,
  },
];

const TermsConditions = () => (
  <div className="tc-root">
    <style>{STYLES}</style>

    {/* Backgrounds */}
    <div className="tc-grid" />
    <div className="tc-glow-tr" />
    <div className="tc-glow-bl" />

    <div className="tc-content">
      {/* Back */}
      <Link to="/help" className="tc-back tc-in" style={{ animationDelay: "0s" }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        Back to Help Center
      </Link>

      {/* Header card */}
      <div className="tc-header-card tc-in" style={{ animationDelay: "0.05s" }}>
        <div className="tc-logo-row">
          <div className="tc-logo-ico">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <rect x="3" y="11" width="18" height="11" rx="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </div>
          <span className="tc-logo-name">VaultNotes</span>
        </div>
        <div className="tc-eyebrow">
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
          </svg>
          Legal
        </div>
        <h1 className="tc-headline">Terms &amp; Conditions</h1>
        <p className="tc-tagline">
          Last updated:{" "}
          {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        </p>
      </div>

      {/* TOC */}
      <div className="tc-toc-card tc-in" style={{ animationDelay: "0.1s" }}>
        <div className="tc-toc-label">Jump to section</div>
        <div className="tc-toc-links">
          {sections.map((s) => (
            <a key={s.num} href={`#tc-${s.num}`} className="tc-toc-link">
              {s.num}. {s.title}
            </a>
          ))}
        </div>
      </div>

      {/* Sections */}
      {sections.map((s, i) => (
        <div
          key={s.num}
          id={`tc-${s.num}`}
          className="tc-section tc-in"
          style={{ animationDelay: `${0.13 + i * 0.05}s` }}
        >
          <div className="tc-section-hd">
            <div className="tc-num">{s.num}</div>
            <div className="tc-section-title">{s.title}</div>
          </div>
          <div className="tc-section-bd">{s.body}</div>
        </div>
      ))}
    </div>
  </div>
);

export default TermsConditions;