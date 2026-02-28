import { useState } from "react";
import toast from "react-hot-toast";
import api from "../../services/api";
import { SpinnerIcon } from "./settingsStyles";

const ProfileCard = ({ user, updateUser }) => {
  const [editing, setEditing]   = useState(false);
  const [username, setUsername] = useState(user?.username || "");
  const [saving, setSaving]     = useState(false);

  const displayName = user?.username || "—";

  const handleSave = async (e) => {
    e.preventDefault();
    const t = username.trim();
    if (!t) { toast.error("Username cannot be empty"); return; }
    if (t === user?.username) { toast("Already up to date", { icon: "ℹ️" }); setEditing(false); return; }
    setSaving(true);
    try {
      await api.put("/auth/update-username",{ ...user, newUsername: t });
      toast.success("Username updated");
      window.location.reload();
      setEditing(false);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update username");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setUsername(user?.username || "");
    setEditing(false);
  };

  return (
    <div className="s-card se se2">
      <div className="s-ch">
        <div className="s-chi chi-amber">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>
        <div>
          <div className="s-ch-title">Profile</div>
          <div className="s-ch-sub">Update your display name</div>
        </div>
      </div>

      <div className="s-cb">
        {/* Avatar row — always visible */}
        <div className="s-avatar-row">
          <div className="s-avatar">
            {displayName.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="s-avatar-name">{displayName}</div>
            <div className="s-avatar-sub">Vault member</div>
          </div>
          <span className="s-active-pill">
            <span className="s-active-dot" />Active
          </span>
        </div>

        {/* Collapsed: single CTA button */}
        {!editing && (
          <button
            type="button"
            className="s-btn s-btn-fw s-btn-amber"
            onClick={() => setEditing(true)}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
            Change Username
          </button>
        )}

        {/* Expanded: form */}
        {editing && (
          <form onSubmit={handleSave} style={{ marginTop: 0 }}>
            <label className="s-lbl">New Username</label>
            <div className="s-field" style={{ marginBottom: 10 }}>
              <input
                className="s-inp"
                placeholder="Enter new username…"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                maxLength={32}
                autoFocus
              />
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button
                type="button"
                onClick={handleCancel}
                style={{
                  flex: 1, padding: "10px", borderRadius: 10,
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
                className="s-btn s-btn-amber"
                style={{ flex: 1 }}
                disabled={saving}
              >
                {saving ? <SpinnerIcon /> : (
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v14a2 2 0 0 1-2 2z" />
                    <polyline points="17 21 17 13 7 13 7 21" />
                    <polyline points="7 3 7 8 15 8" />
                  </svg>
                )}
                {saving ? "Saving…" : "Save"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;