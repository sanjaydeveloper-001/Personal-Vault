import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Syne:wght@400;500;600;700&family=JetBrains+Mono:wght@300;400&display=swap');

  :root {
    --gold: #c9a84c;
    --gold-light: #e8c97a;
    --gold-dim: rgba(201,168,76,0.15);
    --gold-border: rgba(201,168,76,0.2);
    --surface: #0d1117;
    --surface-2: rgba(255,255,255,0.025);
    --surface-3: rgba(255,255,255,0.04);
    --text-primary: #f0ece4;
    --text-secondary: #6b7280;
    --text-muted: #374151;
    --red: #e05555;
    --red-dim: rgba(224,85,85,0.08);
    --red-border: rgba(224,85,85,0.18);
    --green: #3fb87a;
  }

  .p-root {
    font-family: 'Syne', sans-serif;
    min-height: 100vh;
    color: var(--text-primary);
  }

  /* ── Page header ── */
  .p-header {
    display: flex; align-items: flex-end; justify-content: space-between;
    margin-bottom: 32px;
    padding-bottom: 20px;
    border-bottom: 1px solid rgba(255,255,255,0.05);
    position: relative;
  }
  .p-header::after {
    content: '';
    position: absolute; bottom: -1px; left: 0;
    width: 80px; height: 1px;
    background: var(--gold);
  }
  .p-header-label {
    font-size: 0.65rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 4px;
    font-weight: 600;
  }
  .p-header-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2.8rem;
    font-weight: 900;
    color: var(--text-primary);
    line-height: 1;
    letter-spacing: -0.01em;
  }
  .p-header-id {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.7rem;
    color: var(--text-muted);
    letter-spacing: 0.1em;
  }

  /* ── Main grid ── */
  .p-grid {
    display: grid;
    grid-template-columns: 280px 1fr;
    gap: 16px;
    align-items: start;
  }
  @media (max-width: 760px) {
    .p-grid { grid-template-columns: 1fr; }
  }

  /* ── Identity panel (left) ── */
  .p-identity {
    background: var(--surface-2);
    border: 1px solid var(--gold-border);
    border-radius: 20px;
    overflow: hidden;
    position: relative;
  }
  .p-id-glow {
    position: absolute; top: -60px; left: -60px;
    width: 220px; height: 220px; border-radius: 50%;
    background: radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 70%);
    pointer-events: none;
  }
  .p-id-top {
    padding: 28px 24px 20px;
    border-bottom: 1px solid rgba(255,255,255,0.05);
    position: relative;
  }
  .p-avatar-wrap {
    position: relative;
    width: 72px; height: 72px;
    margin-bottom: 16px;
  }
  .p-avatar {
    width: 72px; height: 72px; border-radius: 18px;
    background: linear-gradient(135deg, #c9a84c 0%, #8b6914 100%);
    display: flex; align-items: center; justify-content: center;
    font-family: 'Cormorant Garamond', serif;
    font-size: 2rem; font-weight: 600;
    color: #0d1117;
    position: relative; z-index: 1;
  }
  .p-avatar-ring {
    position: absolute; inset: -3px; border-radius: 20px;
    background: linear-gradient(135deg, rgba(201,168,76,0.6), transparent, rgba(201,168,76,0.3));
    z-index: 0;
  }
  .p-online {
    position: absolute; bottom: 2px; right: 2px;
    width: 12px; height: 12px; border-radius: 50%;
    background: var(--green);
    border: 2px solid #0d1117;
    box-shadow: 0 0 8px rgba(63,184,122,0.6);
    z-index: 2;
  }
  .p-id-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.6rem; font-weight: 400;
    color: var(--text-primary);
    line-height: 1.1; margin-bottom: 5px;
  }
  .p-id-status {
    display: inline-flex; align-items: center; gap: 6px;
    background: rgba(63,184,122,0.08);
    border: 1px solid rgba(63,184,122,0.2);
    border-radius: 20px; padding: 3px 10px;
    font-size: 0.68rem; color: var(--green);
    letter-spacing: 0.06em; font-weight: 600;
    text-transform: uppercase;
  }
  .p-status-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: var(--green);
    box-shadow: 0 0 6px rgba(63,184,122,0.8);
    animation: pulse-green 2s infinite;
  }
  @keyframes pulse-green {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
  }

  /* Identity items */
  .p-id-items { padding: 0 24px 20px; }
  .p-id-item {
    display: flex; align-items: center; gap: 10px;
    padding: 11px 0;
    border-bottom: 1px solid rgba(255,255,255,0.04);
  }
  .p-id-item:last-child { border-bottom: none; }
  .p-id-ico {
    width: 28px; height: 28px; border-radius: 7px; flex-shrink: 0;
    background: var(--gold-dim);
    border: 1px solid var(--gold-border);
    display: flex; align-items: center; justify-content: center;
  }
  .p-id-lbl {
    font-size: 0.63rem; color: var(--text-muted);
    text-transform: uppercase; letter-spacing: 0.08em;
    font-weight: 600; margin-bottom: 1px;
  }
  .p-id-val {
    font-size: 0.82rem; color: var(--text-primary);
    font-family: 'JetBrains Mono', monospace;
  }

  /* Vault badge at bottom of identity */
  .p-vault-badge {
    margin: 0 24px 20px;
    background: var(--gold-dim);
    border: 1px solid var(--gold-border);
    border-radius: 12px;
    padding: 12px 14px;
    display: flex; align-items: center; gap: 10px;
  }
  .p-vault-badge-label {
    font-size: 0.65rem; color: var(--gold);
    text-transform: uppercase; letter-spacing: 0.1em; font-weight: 700;
    margin-bottom: 1px;
  }
  .p-vault-badge-val {
    font-size: 0.78rem; color: var(--text-secondary);
  }

  /* ── Right panel ── */
  .p-right { display: flex; flex-direction: column; gap: 14px; }

  /* Stats row */
  .p-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
  }
  .p-stat {
    background: var(--surface-2);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 14px;
    padding: 16px 18px;
    position: relative; overflow: hidden;
    transition: border-color 0.2s, transform 0.2s;
  }
  .p-stat:hover { border-color: var(--gold-border); transform: translateY(-2px); }
  .p-stat-accent {
    position: absolute; top: 0; left: 0; right: 0; height: 2px;
  }
  .p-stat-label {
    font-size: 0.62rem; color: var(--text-muted);
    text-transform: uppercase; letter-spacing: 0.1em;
    font-weight: 600; margin-bottom: 8px;
  }
  .p-stat-value {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.5rem; font-weight: 400;
    color: var(--text-primary); line-height: 1;
  }
  .p-stat-sub {
    font-size: 0.68rem; color: var(--text-secondary);
    margin-top: 4px;
  }

  /* Detail card */
  .p-detail-card {
    background: var(--surface-2);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 16px;
    overflow: hidden;
  }
  .p-detail-header {
    padding: 14px 20px;
    border-bottom: 1px solid rgba(255,255,255,0.05);
    display: flex; align-items: center; gap: 8px;
  }
  .p-detail-header-title {
    font-size: 0.7rem; color: var(--text-secondary);
    text-transform: uppercase; letter-spacing: 0.12em; font-weight: 600;
  }
  .p-detail-row {
    display: flex; align-items: center; justify-content: space-between;
    padding: 13px 20px;
    border-bottom: 1px solid rgba(255,255,255,0.04);
    transition: background 0.15s;
  }
  .p-detail-row:last-child { border-bottom: none; }
  .p-detail-row:hover { background: rgba(255,255,255,0.02); }
  .p-detail-key {
    display: flex; align-items: center; gap: 10px;
    font-size: 0.78rem; color: var(--text-secondary);
  }
  .p-detail-dot {
    width: 5px; height: 5px; border-radius: 50%; flex-shrink: 0;
  }
  .p-detail-val {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.75rem; color: var(--text-primary);
    text-align: right;
  }

  /* Security banner */
  .p-sq-banner {
    background: var(--red-dim);
    border: 1px solid var(--red-border);
    border-radius: 16px;
    overflow: hidden;
  }
  .p-sq-banner-top {
    padding: 14px 20px;
    background: rgba(224,85,85,0.06);
    border-bottom: 1px solid var(--red-border);
    display: flex; align-items: center; gap: 10px;
  }
  .p-sq-pulse {
    width: 8px; height: 8px; border-radius: 50%;
    background: var(--red);
    box-shadow: 0 0 10px rgba(224,85,85,0.7);
    animation: pulse-red 1.5s infinite;
    flex-shrink: 0;
  }
  @keyframes pulse-red {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(0.8); }
  }
  .p-sq-banner-title {
    font-size: 0.72rem; font-weight: 700;
    color: #f87171; letter-spacing: 0.08em;
    text-transform: uppercase;
  }
  .p-sq-banner-body {
    padding: 14px 20px;
    display: flex; align-items: center; gap: 16px;
  }
  .p-sq-banner-text {
    font-size: 0.8rem; color: var(--text-secondary);
    line-height: 1.6; flex: 1;
  }
  .p-sq-banner-cta {
    display: inline-flex; align-items: center; gap: 7px;
    background: rgba(224,85,85,0.14);
    border: 1px solid rgba(224,85,85,0.3);
    border-radius: 9px; padding: 9px 16px;
    font-size: 0.75rem; font-weight: 600;
    color: #fca5a5; text-decoration: none;
    letter-spacing: 0.04em;
    transition: all 0.2s;
    white-space: nowrap; flex-shrink: 0;
  }
  .p-sq-banner-cta:hover {
    background: rgba(224,85,85,0.22);
    border-color: rgba(224,85,85,0.5);
    color: #fecaca;
    transform: translateX(2px);
  }

  /* Animations */
  @keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .anim-1 { animation: fadeSlideUp 0.5s 0.05s ease both; }
  .anim-2 { animation: fadeSlideUp 0.5s 0.15s ease both; }
  .anim-3 { animation: fadeSlideUp 0.5s 0.22s ease both; }
  .anim-4 { animation: fadeSlideUp 0.5s 0.3s ease both; }
  .anim-5 { animation: fadeSlideUp 0.5s 0.38s ease both; }
`;

const Profile = () => {
  const { user } = useAuth();
  const initial = user?.username?.charAt(0).toUpperCase() || "?";

  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        year: "numeric", month: "short", day: "numeric",
      })
    : "—";

  const memberYear = user?.createdAt
    ? new Date(user.createdAt).getFullYear()
    : "—";

  const hasSecurityQuestions = !!(user?.placeAnswerHash && user?.friendAnswerHash);
  const birthYear = user?.birthYear || null;

  // Short user ID from username
  const shortId = user?.username
    ? `VLT-${user.username.toUpperCase().slice(0, 3)}-${String(user.username.length * 137 % 9999).padStart(4, "0")}`
    : "VLT-???-0000";

  return (
    <div className="p-root">
      <style>{STYLES}</style>

      {/* Page header */}
      <div className="p-header anim-1">
        <div>
          <div className="p-header-label">Account</div>
          <h1 className="p-header-title">Profile</h1>
        </div>
        <div className="p-header-id">{shortId}</div>
      </div>

      <div className="p-grid">

        {/* ── Left: Identity panel ── */}
        <div className="p-identity anim-2">
          <div className="p-id-glow" />

          <div className="p-id-top">
            <div className="p-avatar-wrap">
              <div className="p-avatar-ring" />
              <div className="p-avatar">{initial}</div>
              <div className="p-online" />
            </div>
            <div className="p-id-name">{user?.username || "Unknown"}</div>
            <div style={{ marginTop: 8 }}>
              <span className="p-id-status">
                <span className="p-status-dot" />
                Active
              </span>
            </div>
          </div>

          <div className="p-id-items">
            {/* Member since */}
            <div className="p-id-item">
              <div className="p-id-ico">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
              </div>
              <div>
                <div className="p-id-lbl">Joined</div>
                <div className="p-id-val">{memberSince}</div>
              </div>
            </div>

            {/* Birth year */}
            <div className="p-id-item">
              <div className="p-id-ico">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2">
                  <path d="M20 12V22H4V12"/>
                  <path d="M22 7H2v5h20V7z"/>
                  <path d="M12 22V7"/>
                  <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/>
                  <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>
                </svg>
              </div>
              <div>
                <div className="p-id-lbl">Birth Year</div>
                <div className="p-id-val" style={{ color: birthYear ? "var(--text-primary)" : "var(--text-muted)", fontStyle: birthYear ? "normal" : "italic" }}>
                  {birthYear || "Not set"}
                </div>
              </div>
            </div>

            {/* Auth */}
            <div className="p-id-item">
              <div className="p-id-ico">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </div>
              <div>
                <div className="p-id-lbl">Auth</div>
                <div className="p-id-val">Password</div>
              </div>
            </div>
          </div>

          {/* Vault plan badge */}
          <div className="p-vault-badge">
            <div style={{
              width: 32, height: 32, borderRadius: 9,
              background: "linear-gradient(135deg, var(--gold), #8b6914)",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0d1117" strokeWidth="2.5">
                <ellipse cx="12" cy="5" rx="9" ry="3"/>
                <path d="M21 12c0 1.66-4.03 3-9 3S3 13.66 3 12"/>
                <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/>
              </svg>
            </div>
            <div>
              <div className="p-vault-badge-label">Free Vault</div>
              <div className="p-vault-badge-val">512 MB · No expiry</div>
            </div>
          </div>
        </div>

        {/* ── Right panel ── */}
        <div className="p-right">

          {/* Stats row */}
          <div className="p-stats anim-3">
            <div className="p-stat">
              <div className="p-stat-accent" style={{ background: "linear-gradient(90deg, var(--gold), transparent)" }} />
              <div className="p-stat-label">Member for</div>
              <div className="p-stat-value">
                {user?.createdAt ? `${new Date().getFullYear() - new Date(user.createdAt).getFullYear() || "<1"}` : "—"}
              </div>
              <div className="p-stat-sub">year{(new Date().getFullYear() - new Date(user?.createdAt).getFullYear()) !== 1 ? "s" : ""}</div>
            </div>
            <div className="p-stat">
              <div className="p-stat-accent" style={{ background: "linear-gradient(90deg, #818cf8, transparent)" }} />
              <div className="p-stat-label">Security</div>
              <div className="p-stat-value" style={{ color: hasSecurityQuestions ? "var(--green)" : "var(--red)", fontSize: "1rem", paddingTop: 4 }}>
                {hasSecurityQuestions ? "Protected" : "At Risk"}
              </div>
              <div className="p-stat-sub">{hasSecurityQuestions ? "Questions set" : "No questions"}</div>
            </div>
            <div className="p-stat">
              <div className="p-stat-accent" style={{ background: "linear-gradient(90deg, var(--green), transparent)" }} />
              <div className="p-stat-label">Since</div>
              <div className="p-stat-value">{memberYear}</div>
              <div className="p-stat-sub">Account created</div>
            </div>
          </div>

          {/* Detail card */}
          <div className="p-detail-card anim-4">
            <div className="p-detail-header">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              <span className="p-detail-header-title">Account Details</span>
            </div>

            <div className="p-detail-row">
              <span className="p-detail-key">
                <span className="p-detail-dot" style={{ background: "var(--gold)" }} />
                Username
              </span>
              <span className="p-detail-val">{user?.username || "—"}</span>
            </div>
            <div className="p-detail-row">
              <span className="p-detail-key">
                <span className="p-detail-dot" style={{ background: "#818cf8" }} />
                Account ID
              </span>
              <span className="p-detail-val" style={{ color: "var(--text-secondary)" }}>{shortId}</span>
            </div>
            <div className="p-detail-row">
              <span className="p-detail-key">
                <span className="p-detail-dot" style={{ background: "var(--green)" }} />
                Encryption
              </span>
              <span className="p-detail-val">End-to-end</span>
            </div>
            <div className="p-detail-row">
              <span className="p-detail-key">
                <span className="p-detail-dot" style={{ background: "#38bdf8" }} />
                Storage
              </span>
              <span className="p-detail-val">512 MB free</span>
            </div>
            <div className="p-detail-row">
              <span className="p-detail-key">
                <span className="p-detail-dot" style={{ background: "var(--gold)" }} />
                Security Questions
              </span>
              <span className="p-detail-val" style={{ color: hasSecurityQuestions ? "var(--green)" : "var(--red)" }}>
                {hasSecurityQuestions ? "✓ Configured" : "✗ Not set"}
              </span>
            </div>
            <div className="p-detail-row">
              <span className="p-detail-key">
                <span className="p-detail-dot" style={{ background: "var(--text-muted)" }} />
                Email
              </span>
              <span className="p-detail-val" style={{ color: "var(--text-muted)", fontStyle: "italic" }}>Not required</span>
            </div>
          </div>

          {/* Security prompt */}
          {!hasSecurityQuestions && (
            <div className="p-sq-banner anim-5">
              <div className="p-sq-banner-top">
                <span className="p-sq-pulse" />
                <span className="p-sq-banner-title">Account Recovery Disabled</span>
              </div>
              <div className="p-sq-banner-body">
                <p className="p-sq-banner-text">
                  Security questions are the <strong style={{ color: "var(--text-primary)" }}>only way to recover your account</strong> if you forget your password. Without them your vault is permanently inaccessible.
                </p>
                <Link to="/security-questions" className="p-sq-banner-cta">
                  Secure now
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </Link>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Profile;