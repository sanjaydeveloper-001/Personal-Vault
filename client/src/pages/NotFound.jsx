import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }} className="min-h-screen bg-[#0a0e1a] flex items-center justify-center px-4">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap');

        .grid-bg {
          background-image:
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 40px 40px;
        }

        .big-404 {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(8rem, 20vw, 14rem);
          line-height: 1;
          background: linear-gradient(135deg, rgba(251,191,36,0.8), rgba(251,191,36,0.2));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: -0.04em;
          user-select: none;
        }

        .not-found-title {
          font-family: 'DM Serif Display', serif;
          color: #f1f5f9;
          font-size: 1.75rem;
          letter-spacing: -0.02em;
        }

        .home-btn {
          display: inline-flex; align-items: center; gap: 8px;
          background: linear-gradient(135deg, #f59e0b, #d97706);
          color: white; font-weight: 500;
          padding: 12px 28px; border-radius: 12px; text-decoration: none;
          font-family: 'DM Sans', sans-serif; font-size: 0.9rem;
          box-shadow: 0 4px 20px rgba(245,158,11,0.25);
          transition: all 0.3s;
        }
        .home-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(245,158,11,0.35); }

        .glitch-line {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(251,191,36,0.4), transparent);
          margin: 20px auto;
          width: 160px;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fu { animation: fadeUp 0.6s ease forwards; }
        .fu1 { animation-delay: 0.1s; opacity: 0; }
        .fu2 { animation-delay: 0.25s; opacity: 0; }
        .fu3 { animation-delay: 0.4s; opacity: 0; }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-10px); }
        }
        .float { animation: float 4s ease-in-out infinite; }
      `}</style>

      <div className="grid-bg fixed inset-0 pointer-events-none" />
      <div className="fixed top-0 left-0 right-0 h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(251,191,36,0.05), transparent 70%)" }} />

      <div className="relative z-10 text-center">
        {/* Logo back link */}
        <div className="fu fu1" style={{ marginBottom: 32 }}>
          <Link to="/" style={{ display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
            <div style={{
              width: 32, height: 32, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
              background: "linear-gradient(135deg,#f59e0b,#d97706)"
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <rect x="3" y="11" width="18" height="11" rx="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </div>
            <span style={{ fontFamily: "'DM Serif Display', serif", color: "#9ca3af", fontSize: "1.1rem" }}>VaultNotes</span>
          </Link>
        </div>

        {/* 404 number */}
        <div className="fu fu1 float">
          <div className="big-404">404</div>
        </div>

        <div className="glitch-line fu fu2" />

        {/* Message */}
        <div className="fu fu2">
          <h2 className="not-found-title mb-3">This vault door doesn't exist</h2>
          <p style={{ color: "#6b7280", fontSize: "0.9rem", maxWidth: 360, margin: "0 auto 28px" }}>
            The page you're looking for has been moved, deleted, or never existed. Let's get you back on track.
          </p>
        </div>

        {/* CTA */}
        <div className="fu fu3" style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link to="/" className="home-btn">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back to Home
          </Link>
          <Link to="/dashboard" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)",
            color: "#9ca3af", padding: "12px 28px", borderRadius: 12, textDecoration: "none",
            fontSize: "0.9rem", transition: "all 0.2s"
          }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; e.currentTarget.style.color = "#e2e8f0"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.color = "#9ca3af"; }}
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;