import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(username, password);
    } finally {
      setLoading(false);
    }
  };

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
        .cta-btn:disabled {
          opacity: 0.75;
          cursor: not-allowed;
          transform: none !important;
        }

        .back-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: #6b7280;
          font-size: 0.85rem;
          transition: color 0.2s;
          text-decoration: none;
        }
        .back-btn:hover { color: #fbbf24; }

        .eye-btn {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: #4b5563;
          cursor: pointer;
          padding: 0;
          transition: color 0.2s;
        }
        .eye-btn:hover { color: #9ca3af; }

        .divider-line {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(251,191,36,0.3), transparent);
          margin: 24px 0;
        }

        .forgot-link {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          color: #4b5563;
          font-size: 0.8rem;
          text-decoration: none;
          transition: color 0.2s;
          letter-spacing: 0.01em;
        }
        .forgot-link:hover { color: #fbbf24; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.5s ease forwards; }

        /* Spinner */
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255,255,255,0.35);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          flex-shrink: 0;
        }

        /* Shimmer sweep on loading button */
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        .cta-btn.loading::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%);
          animation: shimmer 1.2s ease-in-out infinite;
        }
      `}</style>

      <div className="grid-bg fixed inset-0 pointer-events-none" />
      <div className="fixed bottom-[-150px] left-[-150px] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(251,191,36,0.05) 0%, transparent 70%)" }} />

      <div className="relative z-10 w-full max-w-md fade-up">
        {/* Back button */}
        <div className="mb-6">
          <Link to="/" className="back-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back to home
          </Link>
        </div>

        <div className="auth-card rounded-2xl p-8">
          {/* Logo */}
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
            Welcome back
          </h2>
          <p style={{ color: "#6b7280", fontSize: "0.9rem", marginBottom: "28px" }}>
            Enter your credentials to access your vault.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label className="auth-label">Username</label>
              <input
                className="auth-input"
                type="text"
                placeholder="Your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
                disabled={loading}
              />
            </div>

            <div className="mb-2">
              <label className="auth-label">Password</label>
              <div style={{ position: "relative" }}>
                <input
                  className="auth-input"
                  style={{ paddingRight: "44px" }}
                  type={showPass ? "text" : "password"}
                  placeholder="Your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  disabled={loading}
                />
                <button type="button" className="eye-btn" onClick={() => setShowPass(!showPass)} disabled={loading}>
                  {showPass
                    ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                    : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  }
                </button>
              </div>
            </div>

            {/* Forgot password link */}
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "24px" }}>
              <Link to="/forgot-password" className="forgot-link">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
                Forgot password?
              </Link>
            </div>

            <button type="submit" className={`cta-btn${loading ? " loading" : ""}`} disabled={loading}>
              <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                {loading ? (
                  <>
                    <span className="spinner" />
                    Unlocking…
                  </>
                ) : (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="11" width="18" height="11" rx="2"/>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                    Unlock Vault
                  </>
                )}
              </span>
            </button>
          </form>

          <div className="divider-line" />

          <p style={{ textAlign: "center", fontSize: "0.875rem", color: "#6b7280" }}>
            Don't have an account?{" "}
            <Link to="/signup" style={{ color: "#fbbf24", textDecoration: "none", fontWeight: 500 }}
              onMouseEnter={e => e.target.style.textDecoration = "underline"}
              onMouseLeave={e => e.target.style.textDecoration = "none"}>
              Sign up free
            </Link>
          </p>
        </div>

        {/* Trust note */}
        <p style={{ textAlign: "center", fontSize: "0.75rem", color: "#374151", marginTop: "20px" }}>
          🔒 Your data is stored locally and never shared.
        </p>
      </div>
    </div>
  );
};

export default Login;