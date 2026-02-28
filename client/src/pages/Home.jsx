import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Home = () => {
  const { user } = useAuth();

  return (
    <div style={{ fontFamily: "'DM Serif Display', Georgia, serif" }} className="min-h-screen bg-[#0a0e1a] text-white overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap');

        .grid-bg {
          background-image: linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 40px 40px;
        }
        .amber-glow { box-shadow: 0 0 40px rgba(251, 191, 36, 0.15); }

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

        .dash-btn {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(251,191,36,0.08);
          border: 1px solid rgba(251,191,36,0.28);
          color: #fbbf24;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem; font-weight: 500;
          padding: 9px 18px; border-radius: 10px;
          text-decoration: none;
          transition: all 0.25s ease;
        }
        .dash-btn:hover {
          background: rgba(251,191,36,0.14);
          border-color: rgba(251,191,36,0.5);
          transform: translateY(-1px);
        }

        .user-chip {
          display: inline-flex; align-items: center; gap: 7px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 999px; padding: 4px 12px 4px 5px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.82rem; color: #cbd5e1;
        }
        .user-avatar {
          width: 24px; height: 24px; border-radius: 50%;
          background: linear-gradient(135deg, #f59e0b, #d97706);
          display: flex; align-items: center; justify-content: center;
          font-family: 'DM Serif Display', serif;
          font-size: 0.75rem; color: #0a0e1a; font-weight: 700;
        }

        .vault-badge {
          background: rgba(251, 191, 36, 0.1);
          border: 1px solid rgba(251, 191, 36, 0.25);
          color: #fbbf24;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.75rem; letter-spacing: 0.12em;
          text-transform: uppercase;
        }
        .hero-title { font-family: 'DM Serif Display', Georgia, serif; line-height: 1.1; }
        .divider-line { height: 1px; background: linear-gradient(90deg, transparent, rgba(251,191,36,0.4), transparent); }

        .preview-box {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px; overflow: hidden;
        }
        .preview-bar { background: rgba(255,255,255,0.05); border-bottom: 1px solid rgba(255,255,255,0.06); }
        .preview-item { border-bottom: 1px solid rgba(255,255,255,0.05); transition: background 0.2s; }
        .preview-item:hover { background: rgba(255,255,255,0.03); }

        .stat-num { font-family: 'DM Serif Display', serif; font-size: 2.5rem; color: #fbbf24; }

        /* Permanent link feature card */
        .plink-card {
          background: rgba(251,191,36,0.04);
          border: 1px solid rgba(251,191,36,0.18);
          border-radius: 20px; overflow: hidden;
          position: relative;
        }
        .plink-slot {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 12px; padding: 12px 16px;
          display: flex; align-items: center; gap: 10px;
          transition: border-color 0.2s;
        }
        .plink-slot:hover { border-color: rgba(251,191,36,0.25); }
        .plink-slot-num {
          width: 24px; height: 24px; border-radius: 6px; flex-shrink: 0;
          background: linear-gradient(135deg, #f59e0b, #d97706);
          display: flex; align-items: center; justify-content: center;
          font-family: 'DM Sans', sans-serif; font-size: 0.7rem;
          font-weight: 700; color: #0a0e1a;
        }
        .plink-url {
          font-family: 'JetBrains Mono', 'Courier New', monospace;
          font-size: 0.72rem; color: #fbbf24;
          letter-spacing: 0.02em; flex: 1;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .plink-badge {
          font-family: 'DM Sans', sans-serif; font-size: 0.62rem;
          background: rgba(34,197,94,0.1); border: 1px solid rgba(34,197,94,0.2);
          color: #4ade80; border-radius: 20px; padding: 2px 7px;
          white-space: nowrap;
        }

        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-8px); } }
        .float-anim { animation: float 5s ease-in-out infinite; }

        @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        .fade-up { animation: fadeUp 0.7s ease forwards; }
        .delay-1 { animation-delay: 0.1s; opacity: 0; }
        .delay-2 { animation-delay: 0.25s; opacity: 0; }
        .delay-3 { animation-delay: 0.4s; opacity: 0; }
        .delay-4 { animation-delay: 0.55s; opacity: 0; }
        .delay-5 { animation-delay: 0.65s; opacity: 0; }
      `}</style>

      <div className="grid-bg fixed inset-0 pointer-events-none" />
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
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <div className="user-chip">
                  <div className="user-avatar">{user.username?.charAt(0).toUpperCase()}</div>
                  {user.username}
                </div>
                <Link to="/dashboard" className="dash-btn">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="7" height="7" rx="1"/>
                    <rect x="14" y="3" width="7" height="7" rx="1"/>
                    <rect x="3" y="14" width="7" height="7" rx="1"/>
                    <rect x="14" y="14" width="7" height="7" rx="1"/>
                  </svg>
                  Dashboard
                </Link>
              </>
            ) : (
              <>
                <Link to="/login"
                  style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem" }}
                  className="px-5 py-2.5 text-gray-300 hover:text-white transition-colors rounded-lg hover:bg-white/5">
                  Login
                </Link>
                <Link to="/signup" className="cta-btn px-5 py-2.5 rounded-lg text-white font-medium"
                  style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem" }}>
                  Sign Up Free
                </Link>
              </>
            )}
          </div>
        </nav>

        {/* HERO */}
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-32">
          <div className="flex-1 fade-up delay-2">
            <div className="vault-badge inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg>
              No email required · No 2FA hassle
            </div>
            <h2 className="hero-title text-5xl lg:text-6xl font-normal text-white mb-6" style={{ letterSpacing: "-0.02em" }}>
              Your private vault<br />
              <em style={{ color: "#fbbf24" }}>for everything</em><br />
              that matters.
            </h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", lineHeight: 1.7 }} className="text-gray-400 text-lg mb-10 max-w-lg">
              Notes, links, and files — each item lockable with its own password.
              Access from any browser, anywhere, without the usual friction.
            </p>
            <div className="flex items-center gap-4 flex-wrap">
              {user ? (
                <Link to="/dashboard" className="cta-btn inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-white font-medium"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Go to Your Vault
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </Link>
              ) : (
                <>
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
                </>
              )}
            </div>
          </div>

          {/* PREVIEW MOCKUP */}
          <div className="flex-1 w-full fade-up delay-3">
            <div className="preview-box float-anim amber-glow">
              <div className="preview-bar px-5 py-3.5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-green-500/60" />
                </div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", color: "#6b7280" }}>vaultnotes.app/vault</div>
                <div className="w-16" />
              </div>
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
                        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", color: "#e2e8f0" }}>{item.title}</div>
                        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", color: item.color }}>{item.tag}</div>
                      </div>
                    </div>
                    {item.locked && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2">
                        <rect x="3" y="11" width="18" height="11" rx="2"/>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                      </svg>
                    )}
                  </div>
                ))}
              </div>
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
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", color: "#6b7280", marginTop: "4px" }}>{s.label}</div>
            </div>
          ))}
        </div>
        <div className="divider-line mb-20" />

        {/* PERMANENT LINK FEATURE SECTION */}
        <div className="mb-24 fade-up delay-4">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            {/* Text side */}
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-full"
                style={{ background: "rgba(251,191,36,0.08)", border: "1px solid rgba(251,191,36,0.2)" }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2.5">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                </svg>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", color: "#fbbf24", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600 }}>
                  Permanent Links
                </span>
              </div>
              <h3 className="hero-title text-4xl mb-5" style={{ letterSpacing: "-0.02em" }}>
                3 free permanent,<br />
                <em style={{ color: "#fbbf24" }}>shareable links</em>
              </h3>
              <p style={{ fontFamily: "'DM Sans', sans-serif", lineHeight: 1.75, color: "#9ca3af", fontSize: "0.95rem", marginBottom: "1.5rem" }}>
                Every free account gets <strong style={{ color: "#e2e8f0" }}>3 permanent public slots</strong>. Share a file, note, or link with anyone — no login needed on their end.
              </p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", lineHeight: 1.75, color: "#9ca3af", fontSize: "0.95rem", marginBottom: "2rem" }}>
                The best part? <strong style={{ color: "#fbbf24" }}>the URL never changes.</strong> Update your content anytime and the same link always serves the latest version — no broken links, ever.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {[
                  "Link stays the same even when you update the file",
                  "Share with anyone — no account needed to view",
                  "3 permanent slots included free, forever",
                ].map((point, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", color: "#9ca3af" }}>
                    <div style={{ width: 18, height: 18, borderRadius: 5, background: "rgba(251,191,36,0.12)", border: "1px solid rgba(251,191,36,0.25)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </div>
                    {point}
                  </div>
                ))}
              </div>
            </div>

            {/* Visual demo side */}
            <div className="flex-1 w-full">
              <div className="plink-card p-6">
                {/* Header */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
                  <div>
                    <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1rem", color: "#f1f5f9", marginBottom: 2 }}>
                      Your Permanent Slots
                    </div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", color: "#6b7280" }}>
                      3 of 3 slots used in this example
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 4 }}>
                    {[1,2,3].map(i => (
                      <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: "#f59e0b", opacity: 0.8 }} />
                    ))}
                  </div>
                </div>

                {/* Slot items */}
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "18px" }}>
                  {[
                    { num: "1", url: "vaultnotes.app/p/resume-2024", label: "resume_final_v3.pdf", updated: "Updated today" },
                    { num: "2", url: "vaultnotes.app/p/project-brief", label: "Project Brief Note", updated: "Updated 2 days ago" },
                    { num: "3", url: "vaultnotes.app/p/portfolio-links", label: "Portfolio Links", updated: "Updated last week" },
                  ].map((slot) => (
                    <div key={slot.num} className="plink-slot">
                      <div className="plink-slot-num">{slot.num}</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div className="plink-url">{slot.url}</div>
                        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem", color: "#6b7280", marginTop: 2 }}>{slot.label}</div>
                      </div>
                      <span className="plink-badge">{slot.updated}</span>
                    </div>
                  ))}
                </div>

                {/* Key point callout */}
                <div style={{
                  background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.15)",
                  borderRadius: "10px", padding: "12px 14px",
                  display: "flex", alignItems: "center", gap: "10px"
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" style={{ flexShrink: 0 }}>
                    <polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/>
                    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
                  </svg>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.77rem", color: "#d1a84a", lineHeight: 1.5 }}>
                    Replace <strong style={{ color: "#fbbf24" }}>resume_final_v3.pdf</strong> with a newer file — the link stays exactly the same.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="divider-line mb-20" />

        {/* FEATURES */}
        <div className="mb-24 fade-up delay-5">
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
              { icon: "🔗", title: "3 Permanent Links", desc: "Get 3 free permanent shareable URLs. Update the file — the link never changes." },
              { icon: "🌐", title: "Access Anywhere", desc: "Just a username and password. Works in restricted labs or any browser." },
            ].map((f, i) => (
              <div key={i} className="feature-card rounded-xl p-6">
                <div className="text-2xl mb-3">{f.icon}</div>
                <h4 className="text-white mb-2" style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.1rem" }}>{f.title}</h4>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", color: "#9ca3af", lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA FOOTER */}
        <div className="text-center py-16 mb-8">
          <div className="divider-line mb-12" />
          <h3 className="hero-title text-4xl mb-4" style={{ letterSpacing: "-0.02em" }}>
            {user ? `Welcome back, ${user.username}.` : "Ready to secure your notes?"}
          </h3>
          <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#6b7280", marginBottom: "2rem" }}>
            {user ? "Your vault is waiting." : "Free forever. No email. No nonsense."}
          </p>
          {user ? (
            <Link to="/dashboard" className="cta-btn inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-medium text-lg"
              style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Open Your Vault
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          ) : (
            <Link to="/signup" className="cta-btn inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-medium text-lg"
              style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Create Your Vault
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          )}
        </div>

      </div>
    </div>
  );
};

export default Home;