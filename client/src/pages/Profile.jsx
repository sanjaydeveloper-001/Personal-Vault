import { useAuth } from "../contexts/AuthContext";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');

  .profile-root { font-family: 'DM Sans', sans-serif; }

  .page-title {
    font-family: 'DM Serif Display', serif;
    font-size: 2rem;
    color: #f1f5f9;
    letter-spacing: -0.02em;
  }

  .divider { height: 1px; background: linear-gradient(90deg, rgba(251,191,36,0.3), transparent); margin: 8px 0 20px; }

  .profile-card {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 20px;
    overflow: hidden;
    max-width: 560px;
  }

  .profile-banner {
    height: 90px;
    background: linear-gradient(135deg, rgba(251,191,36,0.12) 0%, rgba(99,102,241,0.1) 100%);
    border-bottom: 1px solid rgba(255,255,255,0.06);
    position: relative;
  }

  .avatar-ring {
    position: absolute;
    bottom: -28px;
    left: 28px;
    width: 60px; height: 60px;
    border-radius: 50%;
    background: linear-gradient(135deg, #f59e0b, #d97706);
    border: 3px solid #0a0e1a;
    display: flex; align-items: center; justify-content: center;
    font-family: 'DM Serif Display', serif;
    font-size: 1.5rem;
    color: white;
    box-shadow: 0 4px 20px rgba(245,158,11,0.3);
  }

  .profile-body { padding: 44px 28px 28px; }

  .profile-username {
    font-family: 'DM Serif Display', serif;
    font-size: 1.5rem;
    color: #f1f5f9;
    letter-spacing: -0.02em;
  }

  .profile-meta { color: #6b7280; font-size: 0.85rem; margin-top: 4px; }

  .info-row {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 14px 0;
    border-bottom: 1px solid rgba(255,255,255,0.05);
  }
  .info-row:last-child { border-bottom: none; }

  .info-icon {
    width: 36px; height: 36px; border-radius: 9px;
    background: rgba(251,191,36,0.08);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }

  .info-label { color: #4b5563; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; }
  .info-value { color: #e2e8f0; font-size: 0.9rem; margin-top: 2px; }

  .status-dot {
    display: inline-block;
    width: 8px; height: 8px; border-radius: 50%;
    background: #22c55e;
    box-shadow: 0 0 6px rgba(34,197,94,0.5);
    margin-right: 6px;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .fu { animation: fadeUp 0.5s ease forwards; }
  .fu1 { animation-delay: 0.05s; opacity: 0; }
  .fu2 { animation-delay: 0.18s; opacity: 0; }
`;

const Profile = () => {
  const { user } = useAuth();
  const initial = user?.username?.charAt(0).toUpperCase() || "?";
  const memberSince = user?.createdAt ? new Date(user.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : "—";

  return (
    <div className="profile-root">
      <style>{STYLES}</style>

      {/* Header */}
      <div className="fu fu1 mb-8">
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
          <div style={{ width: 6, height: 28, background: "linear-gradient(180deg,#f59e0b,#d97706)", borderRadius: 3 }} />
          <h1 className="page-title">Profile</h1>
        </div>
        <div className="divider" style={{ marginLeft: 18 }} />
        <p style={{ color: "#6b7280", fontSize: "0.875rem", marginLeft: 18 }}>Your account information</p>
      </div>

      {/* Card */}
      <div className="fu fu2 profile-card">
        {/* Banner + Avatar */}
        <div className="profile-banner">
          {/* Decorative grid lines on banner */}
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.08 }} xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
          <div className="avatar-ring">{initial}</div>
        </div>

        <div className="profile-body">
          {/* Name row */}
          <div style={{ marginBottom: 24 }}>
            <h2 className="profile-username">{user?.username || "Unknown"}</h2>
            <p className="profile-meta">
              <span className="status-dot" />
              Active account
            </p>
          </div>

          {/* Info rows */}
          <div>
            <div className="info-row">
              <div className="info-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
              <div>
                <div className="info-label">Username</div>
                <div className="info-value">{user?.username || "—"}</div>
              </div>
            </div>

            <div className="info-row">
              <div className="info-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
              </div>
              <div>
                <div className="info-label">Member Since</div>
                <div className="info-value">{memberSince}</div>
              </div>
            </div>

            <div className="info-row">
              <div className="info-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </div>
              <div>
                <div className="info-label">Account Type</div>
                <div className="info-value" style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  Free Vault
                  <span style={{
                    background: "rgba(251,191,36,0.12)", color: "#fbbf24",
                    borderRadius: 20, padding: "2px 9px", fontSize: "0.7rem", fontWeight: 500
                  }}>FREE</span>
                </div>
              </div>
            </div>

            <div className="info-row">
              <div className="info-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="12"/>
                  <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
              </div>
              <div>
                <div className="info-label">Authentication</div>
                <div className="info-value">Username &amp; password — no email required</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;