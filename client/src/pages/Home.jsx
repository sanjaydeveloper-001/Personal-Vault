import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div style={{ fontFamily: "'DM Serif Display', Georgia, serif" }} className="min-h-screen bg-[#0a0e1a] text-white overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap');

        .grid-bg {
          background-image: linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 40px 40px;
        }

        .amber-glow {
          box-shadow: 0 0 40px rgba(251, 191, 36, 0.15);
        }

        .feature-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          transition: all 0.3s ease;
        }
        .feature-card:hover {
          background: rgba(251, 191, 36, 0.06);
          border-color: rgba(251, 191, 36, 0.3);
          transform: translateY(-3px);
        }

        .cta-btn {
          background: linear-gradient(135deg, #f59e0b, #d97706);
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(245, 158, 11, 0.3);
        }
        .cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(245, 158, 11, 0.45);
        }

        .vault-badge {
          background: rgba(251, 191, 36, 0.1);
          border: 1px solid rgba(251, 191, 36, 0.25);
          color: #fbbf24;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.75rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .hero-title {
          font-family: 'DM Serif Display', Georgia, serif;
          line-height: 1.1;
        }

        .divider-line {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(251,191,36,0.4), transparent);
        }

        .preview-box {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          overflow: hidden;
        }

        .preview-bar {
          background: rgba(255,255,255,0.05);
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }

        .preview-item {
          border-bottom: 1px solid rgba(255,255,255,0.05);
          transition: background 0.2s;
        }
        .preview-item:hover { background: rgba(255,255,255,0.03); }

        .lock-icon { color: #fbbf24; }

        .stat-num {
          font-family: 'DM Serif Display', serif;
          font-size: 2.5rem;
          color: #fbbf24;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        .float-anim { animation: float 5s ease-in-out infinite; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.7s ease forwards; }
        .delay-1 { animation-delay: 0.1s; opacity: 0; }
        .delay-2 { animation-delay: 0.25s; opacity: 0; }
        .delay-3 { animation-delay: 0.4s; opacity: 0; }
        .delay-4 { animation-delay: 0.55s; opacity: 0; }
      `}</style>

      {/* Background grid */}
      <div className="grid-bg fixed inset-0 pointer-events-none" />

      {/* Ambient glow blobs */}
      <div className="fixed top-[-200px] left-[-100px] w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(251,191,36,0.06) 0%, transparent 70%)" }} />
      <div className="fixed bottom-[-200px] right-[-100px] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)" }} />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-8">

        {/* NAV */}
        <nav className="flex justify-between items-center mb-20 fade-up delay-1">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </div>
            <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.4rem", letterSpacing: "-0.01em" }}>
              VaultNotes
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/login"
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem" }}
              className="px-5 py-2.5 text-gray-300 hover:text-white transition-colors rounded-lg hover:bg-white/5">
              Login
            </Link>
            <Link to="/signup" className="cta-btn px-5 py-2.5 rounded-lg text-white font-medium"
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem" }}>
              Sign Up Free
            </Link>
          </div>
        </nav>

        {/* HERO */}
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-32">
          <div className="flex-1 fade-up delay-2">
            <div className="vault-badge inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="12" r="10"/>
              </svg>
              No email required · No 2FA hassle
            </div>
            <h2 className="hero-title text-5xl lg:text-6xl font-normal text-white mb-6"
              style={{ letterSpacing: "-0.02em" }}>
              Your private vault<br />
              <em style={{ color: "#fbbf24" }}>for everything</em><br />
              that matters.
            </h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", lineHeight: 1.7 }}
              className="text-gray-400 text-lg mb-10 max-w-lg">
              Notes, links, and files — each item lockable with its own password.
              Access from any browser, anywhere, without the usual friction.
            </p>
            <div className="flex items-center gap-4 flex-wrap">
              <Link to="/signup" className="cta-btn inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-white font-medium"
                style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Get Started — It's Free
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", color: "#6b7280" }}>
                No credit card · No email
              </span>
            </div>
          </div>

          {/* PREVIEW MOCKUP */}
          <div className="flex-1 w-full fade-up delay-3">
            <div className="preview-box float-anim amber-glow">
              {/* Top bar */}
              <div className="preview-bar px-5 py-3.5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-green-500/60" />
                </div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", color: "#6b7280" }}>
                  vaultnotes.app/vault
                </div>
                <div className="w-16" />
              </div>

              {/* Vault items */}
              <div className="p-5 space-y-0">
                {[
                  { icon: "📝", title: "Q4 Launch Notes", tag: "Note", locked: false, color: "#818cf8" },
                  { icon: "🔗", title: "Design System Refs", tag: "Link", locked: false, color: "#34d399" },
                  { icon: "📁", title: "tax_2024_final.pdf", tag: "File", locked: true, color: "#fbbf24" },
                  { icon: "📝", title: "Personal Journal", tag: "Note", locked: true, color: "#f472b6" },
                  { icon: "🔗", title: "API Documentation", tag: "Link", locked: false, color: "#34d399" },
                ].map((item, i) => (
                  <div key={i} className="preview-item flex items-center justify-between px-2 py-3.5 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{item.icon}</span>
                      <div>
                        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", color: "#e2e8f0" }}>
                          {item.title}
                        </div>
                        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", color: item.color }}>
                          {item.tag}
                        </div>
                      </div>
                    </div>
                    {item.locked && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" className="lock-icon">
                        <rect x="3" y="11" width="18" height="11" rx="2"/>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                      </svg>
                    )}
                  </div>
                ))}
              </div>

              {/* Bottom stat bar */}
              <div className="preview-bar px-5 py-2.5 flex gap-6">
                {["5 Items", "2 Locked", "1 File"].map((s, i) => (
                  <span key={i} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", color: "#6b7280" }}>{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="divider-line mb-16 fade-up delay-4" />
        <div className="grid grid-cols-3 gap-8 mb-20 text-center fade-up delay-4">
          {[
            { num: "10MB", label: "Max file size" },
            { num: "∞", label: "Items stored" },
            { num: "0", label: "Emails needed" },
          ].map((s, i) => (
            <div key={i}>
              <div className="stat-num">{s.num}</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", color: "#6b7280", marginTop: "4px" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
        <div className="divider-line mb-20" />

        {/* FEATURES */}
        <div className="mb-24">
          <h3 className="hero-title text-4xl text-center mb-3" style={{ letterSpacing: "-0.02em" }}>
            Everything in one vault
          </h3>
          <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#6b7280", textAlign: "center", marginBottom: "3rem" }}>
            Designed for access, built for privacy.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { icon: "📝", title: "Rich Notes", desc: "Write and store formatted text notes with a full rich-text editor." },
              { icon: "🔗", title: "Save Links", desc: "Bookmark important URLs with titles and descriptions." },
              { icon: "📁", title: "File Uploads", desc: "Upload images, PDFs, and code files — up to 10MB each." },
              { icon: "🔒", title: "Per-Item Passwords", desc: "Lock individual items with a separate password for extra security." },
              { icon: "🗑️", title: "Trash / Bin", desc: "Deleted items go to trash — restore or permanently delete at will." },
              { icon: "🌐", title: "Access Anywhere", desc: "Just a username and password. Works in restricted labs or any browser." },
            ].map((f, i) => (
              <div key={i} className="feature-card rounded-xl p-6">
                <div className="text-2xl mb-3">{f.icon}</div>
                <h4 className="text-white mb-2" style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.1rem" }}>
                  {f.title}
                </h4>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", color: "#9ca3af", lineHeight: 1.6 }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA FOOTER */}
        <div className="text-center py-16 mb-8">
          <div className="divider-line mb-12" />
          <h3 className="hero-title text-4xl mb-4" style={{ letterSpacing: "-0.02em" }}>
            Ready to secure your notes?
          </h3>
          <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#6b7280", marginBottom: "2rem" }}>
            Free forever. No email. No nonsense.
          </p>
          <Link to="/signup" className="cta-btn inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-medium text-lg"
            style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Create Your Vault
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Home;