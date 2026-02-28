import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

.h-page {
  font-family: 'DM Sans', sans-serif;
  padding: 0 0 80px;
  max-width: 860px;
  color: #e2e8f0;
}

/* ── Eyebrow ── */
.h-eyebrow {
  display: inline-flex; align-items: center; gap: 6px;
  font-size: 0.67rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase;
  color: #fbbf24; background: rgba(251,191,36,0.08);
  border: 1px solid rgba(251,191,36,0.15);
  border-radius: 20px; padding: 4px 12px; margin-bottom: 12px;
}
.h-headline {
  font-family: 'DM Serif Display', serif;
  font-size: clamp(1.9rem, 4vw, 2.6rem);
  color: #f8fafc; letter-spacing: -0.03em; line-height: 1.06;
  margin-bottom: 6px;
}
.h-tagline { color: #4b5563; font-size: 0.875rem; margin-bottom: 32px; }

/* ── Layout ── */
.h-layout {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 14px;
  align-items: start;
}
@media (max-width: 720px) { .h-layout { grid-template-columns: 1fr; } }

/* ── Cards ── */
.h-card {
  background: #080d1b;
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 20px; overflow: hidden;
  transition: border-color 0.22s, box-shadow 0.22s;
  margin-bottom: 14px;
}
.h-card:last-child { margin-bottom: 0; }
.h-card:hover { border-color: rgba(255,255,255,0.11); box-shadow: 0 8px 28px rgba(0,0,0,0.3); }

.h-card-hd {
  display: flex; align-items: center; gap: 12px;
  padding: 14px 18px;
  background: rgba(255,255,255,0.02);
  border-bottom: 1px solid rgba(255,255,255,0.055);
}
.h-card-ico {
  width: 34px; height: 34px; border-radius: 10px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
}
.ico-amber  { background: rgba(251,191,36,0.1);  border: 1px solid rgba(251,191,36,0.16); }
.ico-sky    { background: rgba(56,189,248,0.1);  border: 1px solid rgba(56,189,248,0.16); }
.ico-indigo { background: rgba(129,140,248,0.1); border: 1px solid rgba(129,140,248,0.16); }

.h-card-title { font-family: 'DM Serif Display', serif; font-size: 0.97rem; color: #f1f5f9; }
.h-card-sub   { color: #4b5563; font-size: 0.7rem; margin-top: 1px; }
.h-card-bd    { padding: 18px; }

/* ── Labels ── */
.h-lbl {
  display: block; font-size: 0.67rem; color: #6b7280;
  letter-spacing: 0.08em; text-transform: uppercase; font-weight: 600;
  margin-bottom: 6px;
}
.h-req { color: #fbbf24; }
.h-opt { color: #374151; text-transform: none; letter-spacing: 0; }

/* ── Inputs ── */
.h-inp {
  width: 100%;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 10px; padding: 10px 14px;
  color: #f1f5f9; font-size: 0.875rem;
  font-family: 'DM Sans', sans-serif;
  outline: none; transition: all 0.2s;
}
.h-inp:focus {
  border-color: rgba(251,191,36,0.44);
  background: rgba(251,191,36,0.025);
  box-shadow: 0 0 0 3px rgba(251,191,36,0.055);
}
.h-inp::placeholder { color: #2d3748; }

.h-textarea {
  width: 100%; min-height: 130px; resize: vertical;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 10px; padding: 10px 14px;
  color: #f1f5f9; font-size: 0.875rem;
  font-family: 'DM Sans', sans-serif;
  outline: none; transition: all 0.2s; line-height: 1.65;
}
.h-textarea:focus {
  border-color: rgba(251,191,36,0.44);
  background: rgba(251,191,36,0.025);
  box-shadow: 0 0 0 3px rgba(251,191,36,0.055);
}
.h-textarea::placeholder { color: #2d3748; }

/* ── Select ── */
.h-select-wrap { position: relative; }
.h-select {
  width: 100%; appearance: none;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 10px; padding: 10px 36px 10px 14px;
  color: #f1f5f9; font-size: 0.875rem;
  font-family: 'DM Sans', sans-serif;
  outline: none; transition: all 0.2s; cursor: pointer;
}
.h-select:focus {
  border-color: rgba(251,191,36,0.44);
  background: rgba(251,191,36,0.025);
  box-shadow: 0 0 0 3px rgba(251,191,36,0.055);
}
.h-select-arrow {
  position: absolute; right: 12px; top: 50%; transform: translateY(-50%);
  pointer-events: none; color: #4b5563;
}

/* ── Field spacing ── */
.h-field { margin-bottom: 14px; }
.h-field:last-child { margin-bottom: 0; }
.h-row2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 14px; }
@media (max-width: 480px) { .h-row2 { grid-template-columns: 1fr; } }

/* ── Char counter ── */
.h-counter { font-size: 0.68rem; margin-top: 5px; text-align: right; }

/* ── Button ── */
.h-btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 7px;
  width: 100%; border-radius: 10px; border: none; cursor: pointer;
  font-family: 'DM Sans', sans-serif; font-size: 0.875rem; font-weight: 600;
  color: #fff; padding: 11px 18px; transition: all 0.22s;
  background: linear-gradient(135deg,#f59e0b,#c97c08);
  box-shadow: 0 4px 14px rgba(245,158,11,0.22);
}
.h-btn:hover:not(:disabled) { transform: translateY(-1px); filter: brightness(1.08); }
.h-btn:disabled { opacity: 0.42; cursor: not-allowed; }

/* ── Sidebar chips ── */
.h-rt-chip {
  display: flex; align-items: center; justify-content: space-between;
  padding: 8px 10px;
  background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05);
  border-radius: 9px; margin-bottom: 7px;
}
.h-rt-chip:last-child { margin-bottom: 0; }
.h-rt-label { font-size: 0.78rem; color: #9ca3af; }
.h-rt-val   { font-size: 0.75rem; font-weight: 600; }

/* ── Link chips ── */
.h-link-chip {
  display: flex; align-items: center; gap: 8px;
  background: rgba(255,255,255,0.025); border: 1px solid rgba(255,255,255,0.06);
  border-radius: 10px; padding: 10px 12px; margin-bottom: 8px;
  color: #9ca3af; font-size: 0.81rem; text-decoration: none;
  transition: all 0.2s;
}
.h-link-chip:last-child { margin-bottom: 0; }
.h-link-chip:hover {
  background: rgba(255,255,255,0.05); border-color: rgba(255,255,255,0.1);
  color: #e2e8f0;
}
.h-link-chip-arrow { margin-left: auto; color: #374151; }

/* ── Entrance animation ── */
@keyframes hEntrance {
  from { opacity:0; transform: translateY(16px); }
  to   { opacity:1; transform: translateY(0); }
}
.he { animation: hEntrance 0.5s ease forwards; opacity: 0; }
.he1 { animation-delay: 0s; }
.he2 { animation-delay: 0.07s; }
.he3 { animation-delay: 0.14s; }
.he4 { animation-delay: 0.21s; }

/* ── Spin ── */
@keyframes hSpin { to { transform: rotate(360deg); } }
.h-spin { animation: hSpin 0.8s linear infinite; }
`;

const ISSUE_TYPES = [
  { value: "", label: "Select a category…" },
  { value: "account", label: "Account & Login" },
  { value: "storage", label: "Storage & Files" },
  { value: "billing", label: "Billing & Plans" },
  { value: "bug", label: "Bug Report" },
  { value: "feature", label: "Feature Request" },
  { value: "other", label: "Other" },
];

const HelpCenter = () => {
  const [formData, setFormData] = useState({ name: "", email: "", issue: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const charLen = formData.message.length;
  const charOk  = charLen >= 50;
  const charColor = charLen === 0 ? "#4b5563" : charOk ? "#34d399" : "#f59e0b";

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!charOk) { toast.error("Message must be at least 50 characters"); return; }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1000));
    toast.success("Message sent — we'll get back to you soon!");
    setFormData({ name: "", email: "", issue: "", message: "" });
    setSubmitting(false);
  };

  return (
    <div className="h-page">
      <style>{STYLES}</style>

      {/* Header */}
      <div className="he he1">
        <div className="h-eyebrow">
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
          Support
        </div>
        <h1 className="h-headline">Help Center</h1>
        <p className="h-tagline">Have a question or ran into something? Drop us a message.</p>
      </div>

      <div className="h-layout">
        {/* ── Left: Form ── */}
        <div className="he he2">
          <div className="h-card">
            <div className="h-card-hd">
              <div className="h-card-ico ico-amber">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
              </div>
              <div>
                <div className="h-card-title">Contact Us</div>
                <div className="h-card-sub">We usually respond within 24 hours</div>
              </div>
            </div>

            <div className="h-card-bd">
              <form onSubmit={handleSubmit}>
                {/* Name + Email */}
                <div className="h-row2">
                  <div>
                    <label className="h-lbl">Name&ensp;<span className="h-opt">optional</span></label>
                    <input className="h-inp" type="text" name="name" placeholder="Your name"
                      value={formData.name} onChange={handleChange} />
                  </div>
                  <div>
                    <label className="h-lbl">Email&ensp;<span className="h-req">*</span></label>
                    <input className="h-inp" type="email" name="email" required placeholder="you@example.com"
                      value={formData.email} onChange={handleChange} />
                  </div>
                </div>

                {/* Category */}
                <div className="h-field">
                  <label className="h-lbl">Category&ensp;<span className="h-opt">optional</span></label>
                  <div className="h-select-wrap">
                    <select className="h-select" name="issue" value={formData.issue} onChange={handleChange}>
                      {ISSUE_TYPES.map((o) => (
                        <option key={o.value} value={o.value} style={{ background: "#080d1b" }}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                    <span className="h-select-arrow">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="6 9 12 15 18 9"/>
                      </svg>
                    </span>
                  </div>
                </div>

                {/* Message */}
                <div className="h-field">
                  <label className="h-lbl">Message&ensp;<span className="h-req">*</span></label>
                  <textarea className="h-textarea" name="message" required
                    placeholder="Describe your issue in detail…"
                    value={formData.message} onChange={handleChange} />
                  <div className="h-counter" style={{ color: charColor }}>
                    {charOk ? `✓ ${charLen} characters` : `${charLen} / 50 minimum`}
                  </div>
                </div>

                <button type="submit" className="h-btn" disabled={submitting}>
                  {submitting ? (
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-spin">
                      <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                    </svg>
                  ) : (
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                    </svg>
                  )}
                  {submitting ? "Sending…" : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* ── Right: Sidebar ── */}
        <div className="he he3">
          {/* Response times */}
          <div className="h-card">
            <div className="h-card-hd">
              <div className="h-card-ico ico-sky">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <div>
                <div className="h-card-title">Response Times</div>
                <div className="h-card-sub">What to expect</div>
              </div>
            </div>
            <div className="h-card-bd">
              {[
                { label: "General questions", time: "< 24 hrs", color: "#34d399" },
                { label: "Bug reports",        time: "< 12 hrs", color: "#fbbf24" },
                { label: "Account issues",     time: "< 6 hrs",  color: "#f87171" },
              ].map(({ label, time, color }) => (
                <div className="h-rt-chip" key={label}>
                  <span className="h-rt-label">{label}</span>
                  <span className="h-rt-val" style={{ color }}>{time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Legal links */}
          <div className="h-card">
            <div className="h-card-hd">
              <div className="h-card-ico ico-indigo">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                </svg>
              </div>
              <div>
                <div className="h-card-title">Legal Docs</div>
                <div className="h-card-sub">Policies &amp; Terms</div>
              </div>
            </div>
            <div className="h-card-bd">
              <Link to="/privacy" className="h-link-chip">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                Privacy Policy
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-link-chip-arrow">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </Link>
              <Link to="/terms" className="h-link-chip">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
                </svg>
                Terms &amp; Conditions
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-link-chip-arrow">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;