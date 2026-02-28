import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import VaultCaptcha from "../components/Layout/VaultCaptcha";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const captchaRef = useRef(null);
  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    if (!agreed) {
      alert("Please agree to the Privacy Policy and Terms & Conditions");
      return;
    }

    // Verify captcha only on submit — captcha image stays stable
    const captchaOk = captchaRef.current.verify();
    if (!captchaOk) return; // wrong — stays on page, same captcha

    setLoading(true);
    try {
      await register(username, password);
    } finally {
      setLoading(false);
      captchaRef.current.reset();
    }
  };

  const strength = password.length === 0 ? 0 : password.length < 6 ? 1 : password.length < 10 ? 2 : 3;
  const strengthLabel = ["", "Weak", "Fair", "Strong"];
  const strengthColor = ["", "#ef4444", "#f59e0b", "#22c55e"];

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }} className="min-h-screen bg-[#0a0e1a] flex items-center justify-center px-4 py-12">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap');

        .grid-bg {
          background-image: linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 40px 40px;
        }
        .auth-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          backdrop-filter: blur(12px);
        }
        .auth-input {
          width: 100%;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px;
          padding: 12px 16px;
          color: #f1f5f9;
          font-size: 0.9rem;
          font-family: 'DM Sans', sans-serif;
          outline: none;
          transition: all 0.2s;
        }
        .auth-input:focus {
          border-color: rgba(251,191,36,0.5);
          background: rgba(251,191,36,0.05);
          box-shadow: 0 0 0 3px rgba(251,191,36,0.08);
        }
        .auth-input::placeholder { color: #4b5563; }
        .auth-input:disabled { opacity: 0.6; cursor: not-allowed; }

        .auth-label {
          display: block;
          font-size: 0.8rem;
          color: #9ca3af;
          margin-bottom: 6px;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }
        .cta-btn {
          background: linear-gradient(135deg, #f59e0b, #d97706);
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(245,158,11,0.25);
          width: 100%;
          padding: 13px;
          border-radius: 10px;
          color: white;
          font-weight: 500;
          font-size: 0.95rem;
          border: none;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          position: relative;
          overflow: hidden;
        }
        .cta-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 8px 30px rgba(245,158,11,0.35);
        }
        .cta-btn:active:not(:disabled) { transform: translateY(0); }
        .cta-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none !important; }

        .back-btn {
          display: inline-flex; align-items: center; gap: 6px;
          color: #6b7280; font-size: 0.85rem;
          transition: color 0.2s; text-decoration: none;
        }
        .back-btn:hover { color: #fbbf24; }

        .eye-btn {
          position: absolute; right: 14px; top: 50%; transform: translateY(-50%);
          background: none; border: none; color: #4b5563;
          cursor: pointer; padding: 0; transition: color 0.2s;
        }
        .eye-btn:hover { color: #9ca3af; }

        .agree-row {
          display: flex; align-items: flex-start; gap: 10px;
          margin-bottom: 22px; cursor: pointer;
        }
        .agree-box {
          width: 18px; height: 18px; border-radius: 5px; flex-shrink: 0;
          border: 1.5px solid rgba(255,255,255,0.15);
          display: flex; align-items: center; justify-content: center;
          transition: all 0.2s; margin-top: 1px;
        }
        .agree-box.checked {
          background: linear-gradient(135deg, #f59e0b, #d97706);
          border-color: #f59e0b;
        }
        .agree-text { font-size: 0.82rem; color: #9ca3af; line-height: 1.5; }
        .agree-text a { color: #fbbf24; text-decoration: none; font-weight: 500; }
        .agree-text a:hover { text-decoration: underline; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.5s ease forwards; }

        @keyframes spin { to { transform: rotate(360deg); } }
        .spinner {
          width: 16px; height: 16px;
          border: 2px solid rgba(255,255,255,0.35);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          flex-shrink: 0;
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        .cta-btn.loading::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%);
          animation: shimmer 1.2s ease-in-out infinite;
        }
      `}</style>

      <div className="grid-bg fixed inset-0 pointer-events-none" />
      <div className="fixed top-[-150px] right-[-150px] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(251,191,36,0.05) 0%, transparent 70%)" }} />

      <div className="relative z-10 w-full max-w-md fade-up">
        <div className="mb-6">
          <Link to="/" className="back-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back to home
          </Link>
        </div>

        <div className="auth-card rounded-2xl p-8">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)" }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <rect x="3" y="11" width="18" height="11" rx="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </div>
            <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.25rem", color: "#f1f5f9" }}>
              VaultNotes
            </span>
          </div>

          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.75rem", color: "#f1f5f9", marginBottom: "6px" }}>
            Create your vault
          </h2>
          <p style={{ color: "#6b7280", fontSize: "0.9rem", marginBottom: "28px" }}>
            No email needed. Just a username and password.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label className="auth-label">Username</label>
              <input className="auth-input" type="text" placeholder="Choose a username"
                value={username} onChange={(e) => setUsername(e.target.value)} required disabled={loading} />
            </div>

            <div className="mb-5">
              <label className="auth-label">Password</label>
              <div style={{ position: "relative" }}>
                <input className="auth-input" style={{ paddingRight: "44px" }}
                  type={showPass ? "text" : "password"}
                  placeholder="Create a strong password"
                  value={password} onChange={(e) => setPassword(e.target.value)} required disabled={loading} />
                <button type="button" className="eye-btn" onClick={() => setShowPass(!showPass)} disabled={loading}>
                  {showPass
                    ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                    : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  }
                </button>
              </div>
              {password.length > 0 && (
                <div style={{ marginTop: "8px" }}>
                  <div style={{ display: "flex", gap: "4px", marginBottom: "4px" }}>
                    {[1,2,3].map(i => (
                      <div key={i} style={{
                        height: "3px", flex: 1, borderRadius: "2px",
                        background: i <= strength ? strengthColor[strength] : "rgba(255,255,255,0.1)",
                        transition: "background 0.3s"
                      }} />
                    ))}
                  </div>
                  <span style={{ fontSize: "0.72rem", color: strengthColor[strength] }}>{strengthLabel[strength]}</span>
                </div>
              )}
            </div>

            <div className="mb-6">
              <label className="auth-label">Confirm Password</label>
              <div style={{ position: "relative" }}>
                <input className="auth-input"
                  style={{ paddingRight: "44px", borderColor: confirmPassword && confirmPassword !== password ? "rgba(239,68,68,0.5)" : undefined }}
                  type={showConfirm ? "text" : "password"}
                  placeholder="Repeat your password"
                  value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required disabled={loading} />
                <button type="button" className="eye-btn" onClick={() => setShowConfirm(!showConfirm)} disabled={loading}>
                  {showConfirm
                    ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                    : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  }
                </button>
              </div>
              {confirmPassword && confirmPassword !== password && (
                <p style={{ fontSize: "0.75rem", color: "#ef4444", marginTop: "6px" }}>Passwords don't match</p>
              )}
            </div>

            <div
              className={`agree-row${agreed ? " checked" : ""}`}
              onClick={() => !loading && setAgreed(!agreed)}
              style={{ opacity: loading ? 0.5 : 1, pointerEvents: loading ? "none" : "auto" }}
            >
              <div className={`agree-box${agreed ? " checked" : ""}`}>
                {agreed && (
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                )}
              </div>
              <p className="agree-text">
                I agree to the{" "}
                <Link to="/privacy" onClick={(e) => e.stopPropagation()}>Privacy Policy</Link>
                {" "}and{" "}
                <Link to="/terms" onClick={(e) => e.stopPropagation()}>Terms &amp; Conditions</Link>
              </p>
            </div>

            {/* Captcha — stable until refresh clicked or reset() called */}
            <VaultCaptcha ref={captchaRef} />

            <button type="submit" className={`cta-btn${loading ? " loading" : ""}`} disabled={loading}>
              <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                {loading ? (
                  <><span className="spinner" />Creating vault…</>
                ) : (
                  "Create Account"
                )}
              </span>
            </button>
          </form>

          <p style={{ textAlign: "center", fontSize: "0.875rem", color: "#6b7280", marginTop: "20px" }}>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "#fbbf24", textDecoration: "none", fontWeight: 500 }}
              onMouseEnter={e => e.target.style.textDecoration = "underline"}
              onMouseLeave={e => e.target.style.textDecoration = "none"}>
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;