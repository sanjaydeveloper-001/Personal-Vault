import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import api from "../services/api";
import toast from "react-hot-toast";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');

  .settings-root { font-family: 'DM Sans', sans-serif; }

  .page-title {
    font-family: 'DM Serif Display', serif;
    font-size: 2rem;
    color: #f1f5f9;
    letter-spacing: -0.02em;
  }

  .divider { height: 1px; background: linear-gradient(90deg, rgba(251,191,36,0.3), transparent); margin: 8px 0 20px; }

  .settings-section {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 20px;
    overflow: hidden;
    max-width: 560px;
    margin-bottom: 24px;
  }

  .section-header {
    padding: 18px 24px;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    display: flex; align-items: center; gap: 12px;
  }

  .section-icon {
    width: 34px; height: 34px; border-radius: 9px;
    background: rgba(251,191,36,0.08);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }

  .section-title {
    font-family: 'DM Serif Display', serif;
    font-size: 1.1rem;
    color: #f1f5f9;
  }
  .section-sub { color: #6b7280; font-size: 0.8rem; margin-top: 2px; }

  .section-body { padding: 24px; }

  .field-label {
    display: block;
    font-size: 0.78rem;
    color: #9ca3af;
    margin-bottom: 7px;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }

  .field-wrap { position: relative; margin-bottom: 16px; }

  .settings-input {
    width: 100%;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.09);
    border-radius: 10px;
    padding: 11px 44px 11px 14px;
    color: #f1f5f9; font-size: 0.9rem;
    font-family: 'DM Sans', sans-serif;
    outline: none; transition: all 0.2s;
    box-sizing: border-box;
  }
  .settings-input:focus {
    border-color: rgba(251,191,36,0.45);
    background: rgba(251,191,36,0.04);
    box-shadow: 0 0 0 3px rgba(251,191,36,0.07);
  }
  .settings-input::placeholder { color: #374151; }

  .eye-btn {
    position: absolute; right: 13px; top: 50%; transform: translateY(-50%);
    background: none; border: none; color: #4b5563; cursor: pointer; padding: 0;
    transition: color 0.2s;
  }
  .eye-btn:hover { color: #9ca3af; }

  .save-btn {
    display: inline-flex; align-items: center; gap: 8px;
    background: linear-gradient(135deg, #f59e0b, #d97706);
    color: white; font-weight: 500;
    padding: 11px 24px; border-radius: 10px; border: none; cursor: pointer;
    font-family: 'DM Sans', sans-serif; font-size: 0.9rem;
    box-shadow: 0 4px 16px rgba(245,158,11,0.22);
    transition: all 0.25s; width: 100%;
    justify-content: center;
  }
  .save-btn:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 8px 24px rgba(245,158,11,0.3); }
  .save-btn:disabled { opacity: 0.5; cursor: not-allowed; }

  .strength-bars { display: flex; gap: 4px; margin-top: 8px; }
  .strength-bar { height: 3px; flex: 1; border-radius: 2px; transition: background 0.3s; }

  .danger-section {
    max-width: 560px;
    background: rgba(239,68,68,0.04);
    border: 1px solid rgba(239,68,68,0.15);
    border-radius: 20px;
    overflow: hidden;
  }

  .danger-header {
    padding: 18px 24px;
    border-bottom: 1px solid rgba(239,68,68,0.1);
    display: flex; align-items: center; gap: 12px;
  }

  .danger-icon {
    width: 34px; height: 34px; border-radius: 9px;
    background: rgba(239,68,68,0.1);
    display: flex; align-items: center; justify-content: center;
  }

  .danger-btn {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(239,68,68,0.1);
    border: 1px solid rgba(239,68,68,0.25);
    color: #fca5a5; padding: 10px 20px; border-radius: 10px; cursor: pointer;
    font-family: 'DM Sans', sans-serif; font-size: 0.875rem;
    transition: all 0.2s;
  }
  .danger-btn:hover { background: rgba(239,68,68,0.18); border-color: rgba(239,68,68,0.4); }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .fu { animation: fadeUp 0.5s ease forwards; }
  .fu1 { animation-delay: 0.05s; opacity: 0; }
  .fu2 { animation-delay: 0.15s; opacity: 0; }
  .fu3 { animation-delay: 0.25s; opacity: 0; }
  .fu4 { animation-delay: 0.35s; opacity: 0; }
`;

const EyeIcon = ({ open }) => open
  ? <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
  : <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>;

const Settings = () => {
  const { user } = useAuth();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [show, setShow] = useState({ current: false, new: false, confirm: false });
  const [loading, setLoading] = useState(false);

  const strength = newPassword.length === 0 ? 0 : newPassword.length < 6 ? 1 : newPassword.length < 10 ? 2 : 3;
  const strengthColor = ["", "#ef4444", "#f59e0b", "#22c55e"];
  const strengthLabel = ["", "Weak", "Fair", "Strong"];

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) { toast.error("Passwords do not match"); return; }
    setLoading(true);
    try {
      await api.put("/auth/password", { currentPassword, newPassword });
      toast.success("Password updated successfully");
      setCurrentPassword(""); setNewPassword(""); setConfirmPassword("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  const toggle = (key) => setShow(s => ({ ...s, [key]: !s[key] }));

  return (
    <div className="settings-root">
      <style>{STYLES}</style>

      {/* Header */}
      <div className="fu fu1 mb-8">
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
          <div style={{ width: 6, height: 28, background: "linear-gradient(180deg,#f59e0b,#d97706)", borderRadius: 3 }} />
          <h1 className="page-title">Settings</h1>
        </div>
        <div className="divider" style={{ marginLeft: 18 }} />
        <p style={{ color: "#6b7280", fontSize: "0.875rem", marginLeft: 18 }}>Manage your account preferences</p>
      </div>

      {/* Password section */}
      <div className="fu fu2 settings-section">
        <div className="section-header">
          <div className="section-icon">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </div>
          <div>
            <div className="section-title">Change Password</div>
            <div className="section-sub">Update your vault access credentials</div>
          </div>
        </div>

        <div className="section-body">
          <form onSubmit={handleChangePassword}>
            {/* Current password */}
            <div className="field-wrap">
              <label className="field-label">Current Password</label>
              <div style={{ position: "relative" }}>
                <input className="settings-input" type={show.current ? "text" : "password"}
                  placeholder="Your current password"
                  value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} required />
                <button type="button" className="eye-btn" onClick={() => toggle("current")}><EyeIcon open={show.current} /></button>
              </div>
            </div>

            {/* New password */}
            <div className="field-wrap">
              <label className="field-label">New Password</label>
              <div style={{ position: "relative" }}>
                <input className="settings-input" type={show.new ? "text" : "password"}
                  placeholder="Choose a strong password"
                  value={newPassword} onChange={e => setNewPassword(e.target.value)} required />
                <button type="button" className="eye-btn" onClick={() => toggle("new")}><EyeIcon open={show.new} /></button>
              </div>
              {newPassword.length > 0 && (
                <div style={{ marginTop: 8 }}>
                  <div className="strength-bars">
                    {[1,2,3].map(i => (
                      <div key={i} className="strength-bar"
                        style={{ background: i <= strength ? strengthColor[strength] : "rgba(255,255,255,0.08)" }} />
                    ))}
                  </div>
                  <span style={{ fontSize: "0.72rem", color: strengthColor[strength], marginTop: 4, display: "inline-block" }}>
                    {strengthLabel[strength]}
                  </span>
                </div>
              )}
            </div>

            {/* Confirm */}
            <div className="field-wrap" style={{ marginBottom: 24 }}>
              <label className="field-label">Confirm New Password</label>
              <div style={{ position: "relative" }}>
                <input className="settings-input"
                  style={{ borderColor: confirmPassword && confirmPassword !== newPassword ? "rgba(239,68,68,0.4)" : undefined }}
                  type={show.confirm ? "text" : "password"}
                  placeholder="Repeat new password"
                  value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
                <button type="button" className="eye-btn" onClick={() => toggle("confirm")}><EyeIcon open={show.confirm} /></button>
              </div>
              {confirmPassword && confirmPassword !== newPassword && (
                <p style={{ color: "#ef4444", fontSize: "0.75rem", marginTop: 6 }}>Passwords don't match</p>
              )}
            </div>

            <button type="submit" className="save-btn" disabled={loading}>
              {loading ? (
                <>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                    style={{ animation: "spin 0.8s linear infinite" }}>
                    <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                  </svg>
                  Updating…
                </>
              ) : (
                <>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v14a2 2 0 0 1-2 2z"/>
                    <polyline points="17 21 17 13 7 13 7 21"/>
                    <polyline points="7 3 7 8 15 8"/>
                  </svg>
                  Update Password
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Account info */}
      <div className="fu fu3 settings-section">
        <div className="section-header">
          <div className="section-icon">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </div>
          <div>
            <div className="section-title">Account Info</div>
            <div className="section-sub">Read-only account details</div>
          </div>
        </div>
        <div className="section-body">
          <div style={{
            display: "flex", alignItems: "center", gap: 14,
            background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 12, padding: "14px 18px"
          }}>
            <div style={{
              width: 44, height: 44, borderRadius: "50%",
              background: "linear-gradient(135deg,#f59e0b,#d97706)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "'DM Serif Display', serif", fontSize: "1.2rem", color: "white", flexShrink: 0
            }}>
              {user?.username?.charAt(0).toUpperCase() || "?"}
            </div>
            <div>
              <div style={{ color: "#f1f5f9", fontWeight: 500 }}>{user?.username}</div>
              <div style={{ color: "#4b5563", fontSize: "0.8rem" }}>No email · Free account</div>
            </div>
            <div style={{ marginLeft: "auto" }}>
              <span style={{
                background: "rgba(34,197,94,0.1)", color: "#4ade80",
                borderRadius: 20, padding: "3px 12px", fontSize: "0.72rem", fontWeight: 500
              }}>Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Danger zone */}
      <div className="fu fu4 danger-section">
        <div className="danger-header">
          <div className="danger-icon">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
              <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
          </div>
          <div>
            <div style={{ fontFamily: "'DM Serif Display', serif", color: "#fca5a5", fontSize: "1.1rem" }}>Danger Zone</div>
            <div style={{ color: "#6b7280", fontSize: "0.8rem", marginTop: 2 }}>Irreversible actions</div>
          </div>
        </div>
        <div style={{ padding: "20px 24px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <div>
              <div style={{ color: "#e2e8f0", fontSize: "0.9rem", fontWeight: 500 }}>Delete Account</div>
              <div style={{ color: "#4b5563", fontSize: "0.8rem", marginTop: 2 }}>Permanently delete your vault and all data.</div>
            </div>
            <button className="danger-btn" type="button">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
              </svg>
              Delete Account
            </button>
          </div>
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default Settings;