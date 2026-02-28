import { useState } from "react";
import toast from "react-hot-toast";
import api from "../../services/api";
import { EyeIcon, SpinnerIcon } from "./settingsStyles";

const ChangePasswordCard = () => {
  const [editing, setEditing] = useState(false);
  const [curPw, setCurPw]     = useState("");
  const [newPw, setNewPw]     = useState("");
  const [confPw, setConfPw]   = useState("");
  const [showPw, setShowPw]   = useState({ cur: false, nw: false, conf: false });
  const [saving, setSaving]   = useState(false);

  const tpw = (k) => setShowPw((s) => ({ ...s, [k]: !s[k] }));

  const pwStr    = newPw.length === 0 ? 0 : newPw.length < 6 ? 1 : newPw.length < 10 ? 2 : 3;
  const pwColors = ["", "#ef4444", "#f59e0b", "#22c55e"];
  const pwLabels = ["", "Weak", "Fair", "Strong"];

  const handleCancel = () => {
    setCurPw(""); setNewPw(""); setConfPw("");
    setShowPw({ cur: false, nw: false, conf: false });
    setEditing(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPw !== confPw) { toast.error("Passwords don't match"); return; }
    if (newPw.length < 6) { toast.error("Minimum 6 characters"); return; }
    setSaving(true);
    try {
      await api.put("/auth/password", { currentPassword: curPw, newPassword: newPw });
      toast.success("Password updated");
      handleCancel();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update password");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="s-card s-span2 se se3">
      <div className="s-ch">
        <div className="s-chi chi-indigo">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>
        <div>
          <div className="s-ch-title">Change Password</div>
          <div className="s-ch-sub">Update your vault access credentials</div>
        </div>
      </div>

      <div className="s-cb">
        {/* Collapsed state */}
        {!editing && (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
            <div>
              <div style={{ color: "#9ca3af", fontSize: "0.84rem", fontWeight: 500 }}>
                Password
              </div>
              <div style={{ color: "#4b5563", fontSize: "0.72rem", marginTop: 2 }}>
                Last changed: unknown · ••••••••••••
              </div>
            </div>
            <button
              type="button"
              className="s-btn s-btn-indigo"
              style={{ flexShrink: 0 }}
              onClick={() => setEditing(true)}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              Change Password
            </button>
          </div>
        )}

        {/* Expanded form */}
        {editing && (
          <form onSubmit={handleSubmit}>
            <div className="s-pw-cols">
              {/* Current */}
              <div>
                <label className="s-lbl">Current Password</label>
                <div className="s-field">
                  <input
                    className="s-inp pr"
                    type={showPw.cur ? "text" : "password"}
                    placeholder="Current password"
                    value={curPw}
                    onChange={(e) => setCurPw(e.target.value)}
                    autoFocus
                    required
                  />
                  <button type="button" className="s-eye" onClick={() => tpw("cur")}>
                    <EyeIcon open={showPw.cur} />
                  </button>
                </div>
              </div>

              {/* New */}
              <div>
                <label className="s-lbl">New Password</label>
                <div className="s-field">
                  <input
                    className="s-inp pr fi"
                    type={showPw.nw ? "text" : "password"}
                    placeholder="New password"
                    value={newPw}
                    onChange={(e) => setNewPw(e.target.value)}
                    required
                  />
                  <button type="button" className="s-eye" onClick={() => tpw("nw")}>
                    <EyeIcon open={showPw.nw} />
                  </button>
                </div>
                {newPw.length > 0 && (
                  <>
                    <div className="s-strength-row">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="s-sbar"
                          style={{ background: i <= pwStr ? pwColors[pwStr] : "rgba(255,255,255,0.07)" }}
                        />
                      ))}
                    </div>
                    <div className="s-slbl" style={{ color: pwColors[pwStr] }}>
                      {pwLabels[pwStr]}
                    </div>
                  </>
                )}
              </div>

              {/* Confirm */}
              <div>
                <label className="s-lbl">Confirm Password</label>
                <div className="s-field">
                  <input
                    className="s-inp pr fi"
                    style={{
                      borderColor: confPw && confPw !== newPw ? "rgba(239,68,68,0.4)" : undefined,
                    }}
                    type={showPw.conf ? "text" : "password"}
                    placeholder="Repeat new password"
                    value={confPw}
                    onChange={(e) => setConfPw(e.target.value)}
                    required
                  />
                  <button type="button" className="s-eye" onClick={() => tpw("conf")}>
                    <EyeIcon open={showPw.conf} />
                  </button>
                </div>
                {confPw && confPw !== newPw && (
                  <div className="s-mismatch">Passwords don't match</div>
                )}
              </div>
            </div>

            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <button
                type="button"
                onClick={handleCancel}
                style={{
                  padding: "10px 18px", borderRadius: 10,
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: "rgba(255,255,255,0.04)",
                  color: "#9ca3af",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.875rem", cursor: "pointer", transition: "all 0.18s",
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="s-btn s-btn-indigo"
                style={{ minWidth: 170 }}
                disabled={saving}
              >
                {saving ? (
                  <SpinnerIcon />
                ) : (
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <rect x="3" y="11" width="18" height="11" rx="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                )}
                {saving ? "Updating…" : "Update Password"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ChangePasswordCard;