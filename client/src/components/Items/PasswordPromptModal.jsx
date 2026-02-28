import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

/* ─────────────────────────────────────────────
   Portal wrapper — renders children into <body>
───────────────────────────────────────────── */
const Portal = ({ children }) => createPortal(children, document.body);

/* ─────────────────────────────────────────────
   Lock body scroll hook
───────────────────────────────────────────── */
const useLockBodyScroll = () => {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);
};

/* ─────────────────────────────────────────────
   GLOBAL STYLES
───────────────────────────────────────────── */
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');

  .ppm-backdrop {
    position: fixed;
    inset: 0;
    z-index: 9999;

    background: rgba(4, 6, 14, 0.5);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(20px);

    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    box-sizing: border-box;

    font-family: 'DM Sans', sans-serif;
    animation: ppmFadeIn 0.18s ease forwards;
  }

  @keyframes ppmFadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  .ppm-card {
    background: #0f1424;
    border: 1px solid rgba(255,255,255,0.09);
    border-radius: 22px;
    width: 100%;
    max-width: 420px;
    box-shadow:
      0 28px 70px rgba(0,0,0,0.55),
      0 0 0 1px rgba(251,191,36,0.06);
    overflow: hidden;
    animation: ppmSlideUp 0.22s cubic-bezier(0.34, 1.1, 0.64, 1) forwards;
  }

  @keyframes ppmSlideUp {
    from { opacity: 0; transform: scale(0.94) translateY(16px); }
    to   { opacity: 1; transform: scale(1) translateY(0); }
  }

  /* ── Header bar ── */
  .ppm-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 16px;
    background: rgba(255,255,255,0.022);
    border-bottom: 1px solid rgba(255,255,255,0.07);
  }

  .ppm-header-left {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .ppm-type-icon {
    width: 34px; height: 34px; border-radius: 10px;
    background: rgba(251,191,36,0.12);
    display: flex; align-items: center; justify-content: center;
    font-size: 1rem; flex-shrink: 0;
  }

  .ppm-header-title {
    font-family: 'DM Serif Display', serif;
    font-size: 1rem;
    color: #f1f5f9;
    letter-spacing: -0.01em;
  }

  .ppm-chip {
    font-size: 0.62rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    padding: 3px 9px;
    border-radius: 20px;
    font-weight: 600;
    background: rgba(251,191,36,0.1);
    color: #fbbf24;
  }

  .ppm-close-btn {
    width: 30px; height: 30px; border-radius: 8px;
    border: 1px solid rgba(255,255,255,0.08);
    background: rgba(255,255,255,0.04);
    color: #6b7280; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: all 0.18s;
    flex-shrink: 0;
  }
  .ppm-close-btn:hover {
    background: rgba(239,68,68,0.12);
    border-color: rgba(239,68,68,0.22);
    color: #f87171;
  }

  /* ── Body ── */
  .ppm-body {
    padding: 28px 24px 24px;
  }

  .ppm-icon-ring {
    width: 56px; height: 56px; border-radius: 50%;
    margin: 0 auto 18px;
    background: rgba(251,191,36,0.08);
    border: 1px solid rgba(251,191,36,0.2);
    display: flex; align-items: center; justify-content: center;
  }

  .ppm-heading {
    font-family: 'DM Serif Display', serif;
    font-size: 1.2rem;
    color: #f1f5f9;
    text-align: center;
    margin: 0 0 6px;
    letter-spacing: -0.01em;
  }

  .ppm-sub {
    color: #6b7280;
    font-size: 0.8rem;
    text-align: center;
    line-height: 1.6;
    margin: 0 0 24px;
  }

  .ppm-label {
    display: block;
    font-size: 0.72rem;
    color: #6b7280;
    margin-bottom: 7px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    font-weight: 500;
  }

  .ppm-input-wrap {
    position: relative;
    margin-bottom: 20px;
  }

  .ppm-input {
    width: 100%;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.09);
    border-radius: 10px;
    padding: 11px 44px 11px 14px;
    color: #f1f5f9;
    font-size: 0.9rem;
    font-family: 'DM Sans', sans-serif;
    outline: none;
    transition: all 0.2s;
    box-sizing: border-box;
  }
  .ppm-input:focus {
    border-color: rgba(251,191,36,0.45);
    background: rgba(251,191,36,0.04);
    box-shadow: 0 0 0 3px rgba(251,191,36,0.07);
  }
  .ppm-input::placeholder { color: #374151; }

  .ppm-eye-btn {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: #4b5563;
    cursor: pointer;
    padding: 0;
    display: flex;
    align-items: center;
    transition: color 0.2s;
  }
  .ppm-eye-btn:hover { color: #9ca3af; }

  .ppm-actions {
    display: flex;
    gap: 10px;
  }

  .ppm-cancel-btn {
    flex: 1;
    padding: 10px;
    border-radius: 10px;
    border: 1px solid rgba(255,255,255,0.09);
    background: rgba(255,255,255,0.04);
    color: #9ca3af;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.875rem;
    cursor: pointer;
    transition: all 0.2s;
  }
  .ppm-cancel-btn:hover {
    background: rgba(255,255,255,0.07);
    color: #e2e8f0;
  }

  .ppm-unlock-btn {
    flex: 1;
    padding: 10px;
    border-radius: 10px;
    border: none;
    background: linear-gradient(135deg, #f59e0b, #d97706);
    color: white;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.25s;
    box-shadow: 0 3px 12px rgba(245,158,11,0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
  }
  .ppm-unlock-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(245,158,11,0.3);
  }
`;

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
const PasswordPromptModal = ({ isOpen, onClose, onSubmit }) => {
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  useLockBodyScroll();

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(password);
    setPassword("");
    onClose();
  };

  return (
    <Portal>
      <style>{STYLES}</style>

      {/* Full-screen blurred backdrop */}
      <div
        className="ppm-backdrop"
        onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      >
        <div className="ppm-card">

          {/* Header — matches ItemDetailModal style */}
          <div className="ppm-header">
            <div className="ppm-header-left">
              <div className="ppm-type-icon">🔒</div>
              <span className="ppm-header-title">Locked Item</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span className="ppm-chip">Protected</span>
              <button className="ppm-close-btn" onClick={onClose}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="ppm-body">
            <div className="ppm-icon-ring">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </div>

            <h3 className="ppm-heading">Item is locked</h3>
            <p className="ppm-sub">Enter the item password to unlock and view its contents.</p>

            <form onSubmit={handleSubmit}>
              <label className="ppm-label">Password</label>
              <div className="ppm-input-wrap">
                <input
                  className="ppm-input"
                  type={showPass ? "text" : "password"}
                  placeholder="Enter item password…"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoFocus
                  required
                />
                <button
                  type="button"
                  className="ppm-eye-btn"
                  onClick={() => setShowPass((s) => !s)}
                >
                  {showPass ? (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>

              <div className="ppm-actions">
                <button type="button" className="ppm-cancel-btn" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className="ppm-unlock-btn">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <rect x="3" y="11" width="18" height="11" rx="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                  Unlock
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </Portal>
  );
};

export default PasswordPromptModal;