import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { itemService } from "../../services/itemService";
import api from "../../services/api";
import toast from "react-hot-toast";

/* ─────────────────────────────────────────────
   Portal + lock scroll
───────────────────────────────────────────── */
const Portal = ({ children }) => createPortal(children, document.body);

const useLockBodyScroll = (active) => {
  useEffect(() => {
    if (!active) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [active]);
};

/* ─────────────────────────────────────────────
   STYLES
───────────────────────────────────────────── */
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');

  /* ── Backdrop ── */
  .eim-backdrop {
    position: fixed; inset: 0; z-index: 9999;
    background: rgba(4,6,14,0.55);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    display: flex; align-items: center; justify-content: center;
    padding: 24px; box-sizing: border-box;
    font-family: 'DM Sans', sans-serif;
    animation: eimFadeIn 0.18s ease forwards;
  }
  @keyframes eimFadeIn { from { opacity:0 } to { opacity:1 } }

  /* ── Card ── */
  .eim-card {
    background: #0c101e;
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 22px;
    width: 100%; max-width: 560px;
    max-height: calc(100dvh - 48px);
    display: flex; flex-direction: column;
    overflow: hidden;
    box-shadow: 0 40px 100px rgba(0,0,0,0.75), 0 0 0 1px rgba(255,255,255,0.03);
    animation: eimSlideUp 0.24s cubic-bezier(0.34,1.1,0.64,1) forwards;
  }
  @keyframes eimSlideUp {
    from { opacity:0; transform: scale(0.94) translateY(18px); }
    to   { opacity:1; transform: scale(1) translateY(0); }
  }

  /* ── Header ── */
  .eim-header {
    display: flex; align-items: center; gap: 12px;
    padding: 14px 16px;
    background: rgba(255,255,255,0.022);
    border-bottom: 1px solid rgba(255,255,255,0.07);
    flex-shrink: 0;
  }
  .eim-type-icon {
    width: 36px; height: 36px; border-radius: 11px; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center; font-size: 1.05rem;
  }
  .eim-icon-note { background: rgba(129,140,248,0.12); border: 1px solid rgba(129,140,248,0.15); }
  .eim-icon-link { background: rgba(52,211,153,0.1);  border: 1px solid rgba(52,211,153,0.14); }
  .eim-icon-file { background: rgba(244,114,182,0.1); border: 1px solid rgba(244,114,182,0.14); }

  .eim-header-info { flex:1; min-width:0; }
  .eim-header-title {
    font-family: 'DM Serif Display', serif;
    font-size: 0.97rem; color: #f1f5f9; letter-spacing:-0.01em;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }
  .eim-header-sub { color: #4b5563; font-size: 0.7rem; margin-top: 2px; }

  .eim-chip {
    font-size: 0.6rem; letter-spacing: 0.07em; text-transform: uppercase;
    padding: 3px 9px; border-radius: 20px; font-weight: 600; flex-shrink: 0;
  }
  .eim-chip-note { background: rgba(129,140,248,0.1); color: #818cf8; }
  .eim-chip-link { background: rgba(52,211,153,0.08); color: #34d399; }
  .eim-chip-file { background: rgba(244,114,182,0.08); color: #f472b6; }

  .eim-close-btn {
    width: 30px; height: 30px; border-radius: 8px; flex-shrink: 0;
    border: 1px solid rgba(255,255,255,0.08);
    background: rgba(255,255,255,0.04); color: #6b7280; cursor: pointer;
    display: flex; align-items: center; justify-content: center; transition: all 0.18s;
  }
  .eim-close-btn:hover { background: rgba(239,68,68,0.12); border-color: rgba(239,68,68,0.22); color: #f87171; }

  /* ── Scrollable body ── */
  .eim-body {
    flex: 1; overflow-y: auto; padding: 22px 20px;
    scrollbar-width: thin; scrollbar-color: rgba(255,255,255,0.07) transparent;
  }
  .eim-body::-webkit-scrollbar { width: 4px; }
  .eim-body::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.07); border-radius: 4px; }

  /* ── Section labels ── */
  .eim-section {
    margin-bottom: 16px;
  }
  .eim-label {
    display: flex; align-items: center; gap: 6px;
    font-size: 0.7rem; color: #6b7280;
    letter-spacing: 0.07em; text-transform: uppercase; font-weight: 600;
    margin-bottom: 7px;
  }
  .eim-label-dot {
    width: 5px; height: 5px; border-radius: 50%; flex-shrink: 0;
  }
  .eim-label-dot-note { background: #818cf8; }
  .eim-label-dot-link { background: #34d399; }
  .eim-label-dot-file { background: #f472b6; }
  .eim-label-dot-neutral { background: #4b5563; }

  /* ── Inputs ── */
  .eim-input {
    width: 100%;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 11px; padding: 11px 14px;
    color: #f1f5f9; font-size: 0.875rem;
    font-family: 'DM Sans', sans-serif;
    outline: none; transition: all 0.22s; box-sizing: border-box;
  }
  .eim-input:focus {
    border-color: rgba(251,191,36,0.4);
    background: rgba(251,191,36,0.03);
    box-shadow: 0 0 0 3px rgba(251,191,36,0.06);
  }
  .eim-input::placeholder { color: #2d3748; }
  .eim-input:focus::placeholder { color: #374151; }

  .eim-input-note:focus { border-color: rgba(129,140,248,0.4); background: rgba(129,140,248,0.03); box-shadow: 0 0 0 3px rgba(129,140,248,0.06); }
  .eim-input-link:focus { border-color: rgba(52,211,153,0.4);  background: rgba(52,211,153,0.03);  box-shadow: 0 0 0 3px rgba(52,211,153,0.06);  }
  .eim-input-file:focus { border-color: rgba(244,114,182,0.4); background: rgba(244,114,182,0.03); box-shadow: 0 0 0 3px rgba(244,114,182,0.06); }

  .eim-textarea {
    width: 100%; resize: vertical; min-height: 130px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 11px; padding: 12px 14px;
    color: #f1f5f9; font-size: 0.875rem; line-height: 1.7;
    font-family: 'DM Sans', sans-serif;
    outline: none; transition: all 0.22s; box-sizing: border-box;
  }
  .eim-textarea:focus {
    border-color: rgba(129,140,248,0.4);
    background: rgba(129,140,248,0.03);
    box-shadow: 0 0 0 3px rgba(129,140,248,0.06);
  }
  .eim-textarea::placeholder { color: #2d3748; }

  /* ── Char count ── */
  .eim-char-count {
    text-align: right; font-size: 0.68rem; color: #374151; margin-top: 5px;
  }

  /* ── Current file panel ── */
  .eim-current-file {
    display: flex; align-items: center; gap: 10px;
    background: rgba(244,114,182,0.05);
    border: 1px solid rgba(244,114,182,0.14);
    border-radius: 11px; padding: 12px 14px;
    margin-bottom: 10px;
  }
  .eim-current-file-icon {
    width: 36px; height: 36px; border-radius: 9px;
    background: rgba(244,114,182,0.1);
    display: flex; align-items: center; justify-content: center;
    font-size: 1rem; flex-shrink: 0;
  }
  .eim-current-file-name { color: #e2e8f0; font-size: 0.875rem; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .eim-current-file-meta { color: #4b5563; font-size: 0.72rem; margin-top: 2px; }
  .eim-current-badge {
    font-size: 0.6rem; letter-spacing: 0.07em; text-transform: uppercase; font-weight: 600;
    padding: 3px 8px; border-radius: 20px; flex-shrink: 0;
    background: rgba(244,114,182,0.1); color: #f472b6;
  }

  /* ── File drop zone ── */
  .eim-file-drop {
    border: 2px dashed rgba(255,255,255,0.08);
    border-radius: 12px; padding: 28px 20px;
    text-align: center; cursor: pointer; transition: all 0.22s;
    background: rgba(255,255,255,0.015);
    display: block;
  }
  .eim-file-drop:hover, .eim-file-drop.drag-over {
    border-color: rgba(244,114,182,0.35);
    background: rgba(244,114,182,0.04);
    transform: translateY(-1px);
  }
  .eim-file-drop.has-file { border-color: rgba(244,114,182,0.3); background: rgba(244,114,182,0.05); }
  .eim-file-drop-icon { font-size: 2.2rem; margin-bottom: 10px; }
  .eim-file-drop-text { color: #6b7280; font-size: 0.85rem; }
  .eim-file-drop-accent { color: #f472b6; }
  .eim-file-drop-sub { color: #374151; font-size: 0.75rem; margin-top: 4px; }

  /* ── Divider ── */
  .eim-divider {
    height: 1px; background: rgba(255,255,255,0.06); margin: 18px 0;
  }

  /* ── Password section ── */
  .eim-protect-toggle {
    display: flex; align-items: center; gap: 12px;
    background: rgba(255,255,255,0.025);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 12px; padding: 13px 15px; cursor: pointer;
    transition: all 0.2s; user-select: none;
  }
  .eim-protect-toggle:hover { background: rgba(251,191,36,0.04); border-color: rgba(251,191,36,0.18); }
  .eim-protect-toggle.active { background: rgba(251,191,36,0.06); border-color: rgba(251,191,36,0.22); }

  .eim-toggle-text-title { font-size: 0.875rem; font-weight: 500; transition: color 0.2s; }
  .eim-toggle-text-sub { color: #4b5563; font-size: 0.72rem; margin-top: 2px; }

  .eim-toggle-switch {
    width: 38px; height: 21px; border-radius: 21px;
    background: rgba(255,255,255,0.1); position: relative; transition: background 0.22s; flex-shrink: 0;
  }
  .eim-toggle-switch.on { background: rgba(251,191,36,0.55); }
  .eim-toggle-switch::after {
    content: ''; position: absolute; top: 3px; left: 3px;
    width: 15px; height: 15px; border-radius: 50%; background: #fff;
    transition: transform 0.22s; box-shadow: 0 1px 5px rgba(0,0,0,0.3);
  }
  .eim-toggle-switch.on::after { transform: translateX(17px); }

  /* Password action tabs */
  .eim-pass-tabs {
    display: flex; gap: 6px; margin-bottom: 14px; margin-top: 12px;
  }
  .eim-pass-tab {
    flex: 1; padding: 8px 10px; border-radius: 9px; cursor: pointer;
    font-family: 'DM Sans', sans-serif; font-size: 0.78rem; font-weight: 500;
    border: 1px solid rgba(255,255,255,0.08);
    background: rgba(255,255,255,0.03); color: #6b7280;
    transition: all 0.18s; text-align: center;
  }
  .eim-pass-tab.active-tab {
    background: rgba(251,191,36,0.08);
    border-color: rgba(251,191,36,0.25);
    color: #fbbf24;
  }
  .eim-pass-tab:hover:not(.active-tab) { background: rgba(255,255,255,0.05); color: #9ca3af; }

  /* Input with eye btn */
  .eim-pass-wrap { position: relative; }
  .eim-eye-btn {
    position: absolute; right: 12px; top: 50%; transform: translateY(-50%);
    background: none; border: none; color: #4b5563; cursor: pointer;
    padding: 0; display: flex; align-items: center; transition: color 0.18s;
  }
  .eim-eye-btn:hover { color: #9ca3af; }

  /* ── Footer ── */
  .eim-footer {
    display: flex; gap: 10px;
    padding: 14px 20px;
    border-top: 1px solid rgba(255,255,255,0.07);
    background: rgba(255,255,255,0.015);
    flex-shrink: 0;
  }

  .eim-cancel-btn {
    flex: 1; padding: 10px; border-radius: 10px;
    border: 1px solid rgba(255,255,255,0.09);
    background: rgba(255,255,255,0.04); color: #9ca3af;
    font-family: 'DM Sans', sans-serif; font-size: 0.875rem; cursor: pointer; transition: all 0.2s;
  }
  .eim-cancel-btn:hover { background: rgba(255,255,255,0.07); color: #e2e8f0; }

  .eim-submit-btn {
    flex: 2; padding: 10px; border-radius: 10px; border: none;
    font-family: 'DM Sans', sans-serif; font-size: 0.875rem; font-weight: 600;
    cursor: pointer; transition: all 0.25s;
    display: flex; align-items: center; justify-content: center; gap: 7px;
    color: #fff;
  }
  .eim-submit-note { background: linear-gradient(135deg, #818cf8, #6366f1); box-shadow: 0 4px 16px rgba(129,140,248,0.25); }
  .eim-submit-link { background: linear-gradient(135deg, #34d399, #059669); box-shadow: 0 4px 16px rgba(52,211,153,0.2); }
  .eim-submit-file { background: linear-gradient(135deg, #f472b6, #db2777); box-shadow: 0 4px 16px rgba(244,114,182,0.25); }
  .eim-submit-btn:hover:not(:disabled) { transform: translateY(-1px); filter: brightness(1.08); }
  .eim-submit-btn:disabled { opacity: 0.45; cursor: not-allowed; transform: none; filter: none; }

  @keyframes spin { to { transform: rotate(360deg); } }
  .eim-spin { animation: spin 0.8s linear infinite; }

  /* ── Link preview strip ── */
  .eim-link-preview {
    display: flex; align-items: center; gap: 8px;
    background: rgba(52,211,153,0.04);
    border: 1px solid rgba(52,211,153,0.12);
    border-radius: 10px; padding: 10px 12px; margin-top: 8px;
    overflow: hidden;
  }
  .eim-link-preview-url {
    color: #34d399; font-size: 0.75rem;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    flex: 1;
  }
`;

/* ─────────────────────────────────────────────
   Helpers
───────────────────────────────────────────── */
const formatBytes = (b) =>
  !b ? "" : b < 1024 ? `${b} B` : b < 1048576 ? `${(b / 1024).toFixed(1)} KB` : `${(b / 1048576).toFixed(1)} MB`;

const typeConfig = {
  note: { icon: "📝", label: "Note", color: "#818cf8", dotCls: "eim-label-dot-note", chipCls: "eim-chip-note", iconCls: "eim-icon-note", inputCls: "eim-input-note", submitCls: "eim-submit-note" },
  link: { icon: "🔗", label: "Link", color: "#34d399", dotCls: "eim-label-dot-link", chipCls: "eim-chip-link", iconCls: "eim-icon-link", inputCls: "eim-input-link", submitCls: "eim-submit-link" },
  file: { icon: "📁", label: "File", color: "#f472b6", dotCls: "eim-label-dot-file", chipCls: "eim-chip-file", iconCls: "eim-icon-file", inputCls: "eim-input-file", submitCls: "eim-submit-file" },
};

const FileTypeEmoji = (mime = "") =>
  mime.startsWith("image/") ? "🖼️" : mime === "application/pdf" ? "📄" : mime.startsWith("video/") ? "🎬" : mime.startsWith("audio/") ? "🎵" : mime.startsWith("text/") ? "📃" : "📁";

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
const EditItemModal = ({ isOpen, onClose, item, onItemUpdated }) => {
  const [title, setTitle]               = useState("");
  const [content, setContent]           = useState("");
  const [linkUrl, setLinkUrl]           = useState("");
  const [linkDesc, setLinkDesc]         = useState("");
  const [file, setFile]                 = useState(null);
  const [dragOver, setDragOver]         = useState(false);
  const [uploading, setUploading]       = useState(false);
  const [protect, setProtect]           = useState(false);
  const [keepPassword, setKeepPassword] = useState(true);
  const [password, setPassword]         = useState("");
  const [showPass, setShowPass]         = useState(false);

  useLockBodyScroll(isOpen);

  useEffect(() => {
    if (!isOpen || !item) return;
    setTitle(item.title || "");
    setContent(item.content || "");
    setLinkUrl(item.type === "link" ? item.content || "" : "");
    setLinkDesc(item.metadata?.description || "");
    setProtect(item.hasPassword || false);
    setKeepPassword(true);
    setPassword("");
    setFile(null);
  }, [isOpen, item]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen || !item) return null;

  const cfg = typeConfig[item.type] || typeConfig.note;

  const uploadFile = async () => {
    const { data } = await api.get("/upload/signature");
    const { timestamp, signature, apiKey, cloudName, folder } = data;
    const fd = new FormData();
    fd.append("file", file);
    fd.append("api_key", apiKey);
    fd.append("timestamp", timestamp);
    fd.append("signature", signature);
    fd.append("folder", folder);
    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, { method: "POST", body: fd });
    const d = await res.json();
    if (!d.secure_url) throw new Error("Upload failed");
    return { public_id: d.public_id, url: d.secure_url, originalName: file.name, size: file.size, mimeType: file.type };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ── Password validation ──────────────────────────────────────────
    // Case 1: enabling protection for the first time → password required
    // Case 2: already protected + user chose "Set new" → new password required
    const needsNewPassword = protect && (!item.hasPassword || !keepPassword);
    if (needsNewPassword) {
      if (!password) {
        toast.error("Please enter a password to protect this item");
        return;
      }
      if (password.length < 4) {
        toast.error("Password must be at least 4 characters");
        return;
      }
    }
    // ────────────────────────────────────────────────────────────────

    try {
      let payload = { type: item.type, title };

      if (item.type === "note") {
        payload.content = content;
        payload.metadata = item.metadata || {};
      } else if (item.type === "link") {
        payload.content = linkUrl;
        payload.metadata = { description: linkDesc };
      } else if (item.type === "file") {
        if (file) {
          setUploading(true);
          const meta = await uploadFile();
          payload.metadata = meta;
          payload.content = meta.url;
        } else {
          payload.metadata = item.metadata;
          payload.content = item.content;
        }
      }

      if (protect) {
        if (needsNewPassword) {
          // Send the new password (covers both "first time" and "change password")
          payload.password = password;
        }
        // If keepPassword === true and item already had one → send nothing,
        // backend keeps the existing hash untouched
      } else {
        // User disabled protection → tell backend to remove it
        payload.password = "";
      }

      await itemService.updateItem(item._id, payload);
      toast.success("Item updated");
      onItemUpdated();
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    } finally {
      setUploading(false);
    }
  };

  const validUrl = (() => { try { return linkUrl ? new URL(linkUrl) : null; } catch { return null; } })();

  return (
    <Portal>
      <style>{STYLES}</style>

      <div className="eim-backdrop" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
        <div className="eim-card">

          {/* ── Header ── */}
          <div className="eim-header">
            <div className={`eim-type-icon ${cfg.iconCls}`}>{cfg.icon}</div>
            <div className="eim-header-info">
              <div className="eim-header-title">{title || item.title || "Untitled"}</div>
              <div className="eim-header-sub">Editing {cfg.label.toLowerCase()}</div>
            </div>
            <span className={`eim-chip ${cfg.chipCls}`}>{cfg.label}</span>
            <button className="eim-close-btn" onClick={onClose}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>

          {/* ── Scrollable body ── */}
          <form onSubmit={handleSubmit} style={{ display: "contents" }}>
            <div className="eim-body">

              {/* Title — shown for note + link */}
              {item.type !== "file" && (
                <div className="eim-section">
                  <div className="eim-label">
                    <span className={`eim-label-dot eim-label-dot-neutral`} />
                    Title <span style={{ color: "#374151", textTransform: "none", letterSpacing: 0, fontSize: "0.68rem" }}>(optional)</span>
                  </div>
                  <input
                    className={`eim-input ${cfg.inputCls}`}
                    placeholder={`Name this ${cfg.label.toLowerCase()}…`}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
              )}

              {/* ── NOTE fields ── */}
              {item.type === "note" && (
                <div className="eim-section">
                  <div className="eim-label">
                    <span className={`eim-label-dot ${cfg.dotCls}`} />
                    Content
                  </div>
                  <textarea
                    className="eim-textarea"
                    placeholder="What's on your mind…"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                  />
                  <div className="eim-char-count">{content.length} chars</div>
                </div>
              )}

              {/* ── LINK fields ── */}
              {item.type === "link" && (
                <>
                  <div className="eim-section">
                    <div className="eim-label">
                      <span className={`eim-label-dot ${cfg.dotCls}`} />
                      URL
                    </div>
                    <input
                      className={`eim-input ${cfg.inputCls}`}
                      type="url"
                      placeholder="https://example.com"
                      value={linkUrl}
                      onChange={(e) => setLinkUrl(e.target.value)}
                      required
                    />
                    {validUrl && (
                      <div className="eim-link-preview">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2" style={{flexShrink:0}}>
                          <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
                          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                        </svg>
                        <span className="eim-link-preview-url">{validUrl.hostname}{validUrl.pathname !== "/" ? validUrl.pathname : ""}</span>
                        <a href={linkUrl} target="_blank" rel="noopener noreferrer"
                          style={{flexShrink:0, color:"#34d399", opacity:0.6, display:"flex", alignItems:"center"}}>
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                            <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                          </svg>
                        </a>
                      </div>
                    )}
                  </div>
                  <div className="eim-section">
                    <div className="eim-label">
                      <span className={`eim-label-dot eim-label-dot-neutral`} />
                      Description <span style={{ color: "#374151", textTransform: "none", letterSpacing: 0 }}>(optional)</span>
                    </div>
                    <input
                      className={`eim-input ${cfg.inputCls}`}
                      placeholder="Briefly describe this link…"
                      value={linkDesc}
                      onChange={(e) => setLinkDesc(e.target.value)}
                    />
                  </div>
                </>
              )}

              {/* ── FILE fields ── */}
              {item.type === "file" && (
                <div className="eim-section">
                  <div className="eim-label">
                    <span className={`eim-label-dot ${cfg.dotCls}`} />
                    File
                  </div>

                  {/* Current file */}
                  {item.metadata?.originalName && !file && (
                    <div className="eim-current-file">
                      <div className="eim-current-file-icon">
                        {FileTypeEmoji(item.metadata.mimeType)}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div className="eim-current-file-name">{item.metadata.originalName}</div>
                        <div className="eim-current-file-meta">
                          {formatBytes(item.metadata.size)}
                          {item.metadata.mimeType ? ` · ${item.metadata.mimeType}` : ""}
                        </div>
                      </div>
                      <span className="eim-current-badge">Current</span>
                    </div>
                  )}

                  {/* Drop zone */}
                  <label
                    className={`eim-file-drop ${dragOver ? "drag-over" : ""} ${file ? "has-file" : ""}`}
                    onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={(e) => { e.preventDefault(); setDragOver(false); const f = e.dataTransfer.files[0]; if (f) setFile(f); }}
                  >
                    <input type="file" style={{ display: "none" }} onChange={(e) => setFile(e.target.files[0])} />
                    {file ? (
                      <>
                        <div className="eim-file-drop-icon">{FileTypeEmoji(file.type)}</div>
                        <div style={{ color: "#e2e8f0", fontSize: "0.875rem", fontWeight: 500 }}>{file.name}</div>
                        <div className="eim-file-drop-sub">{formatBytes(file.size)} · {file.type || "unknown"}</div>
                        <div style={{ color: "#f472b6", fontSize: "0.72rem", marginTop: 8 }}>Click to choose a different file</div>
                      </>
                    ) : (
                      <>
                        <div className="eim-file-drop-icon" style={{ color: "#374151" }}>📂</div>
                        <div className="eim-file-drop-text">
                          Drop a new file here or <span className="eim-file-drop-accent">browse</span> to replace
                        </div>
                        <div className="eim-file-drop-sub">Max 10 MB · Leave empty to keep current file</div>
                      </>
                    )}
                  </label>
                </div>
              )}

              {/* ── Divider ── */}
              <div className="eim-divider" />

              {/* ── Password protection ── */}
              <div className="eim-section">
                <div
                  className={`eim-protect-toggle ${protect ? "active" : ""}`}
                  onClick={() => setProtect((p) => !p)}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                    stroke={protect ? "#fbbf24" : "#4b5563"} strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                  <div style={{ flex: 1 }}>
                    <div className="eim-toggle-text-title" style={{ color: protect ? "#fbbf24" : "#9ca3af" }}>
                      Password protection
                    </div>
                    <div className="eim-toggle-text-sub">Require a password to view this item</div>
                  </div>
                  <div className={`eim-toggle-switch ${protect ? "on" : ""}`} />
                </div>

                {protect && (
                  <>
                    {/* Keep / Change tabs — only when item ALREADY has a password */}
                    {item.hasPassword && (
                      <div className="eim-pass-tabs">
                        <button type="button"
                          className={`eim-pass-tab ${keepPassword ? "active-tab" : ""}`}
                          onClick={() => { setKeepPassword(true); setPassword(""); }}>
                          🔒 Keep existing password
                        </button>
                        <button type="button"
                          className={`eim-pass-tab ${!keepPassword ? "active-tab" : ""}`}
                          onClick={() => setKeepPassword(false)}>
                          🔄 Set new password
                        </button>
                      </div>
                    )}

                    {/*
                      Show password input when:
                        (a) Item never had a password → enabling it for the first time
                        (b) Item had a password AND user clicked "Set new password"
                    */}
                    {(!item.hasPassword || !keepPassword) && (
                      <div>
                        <div className="eim-pass-wrap">
                          <input
                            className="eim-input"
                            style={{ paddingRight: 44, marginTop: item.hasPassword ? 0 : 10 }}
                            type={showPass ? "text" : "password"}
                            placeholder={item.hasPassword ? "Enter new password…" : "Create a password (min. 4 chars)…"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="new-password"
                            autoFocus={!item.hasPassword}
                          />
                          <button type="button" className="eim-eye-btn" onClick={() => setShowPass((s) => !s)}>
                            {showPass ? (
                              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                                <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                                <line x1="1" y1="1" x2="23" y2="23"/>
                              </svg>
                            ) : (
                              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                <circle cx="12" cy="12" r="3"/>
                              </svg>
                            )}
                          </button>
                        </div>

                        {/* Live min-length feedback */}
                        <div style={{
                          display: "flex", alignItems: "center", gap: 6,
                          marginTop: 7, fontSize: "0.72rem",
                          color: password.length === 0 ? "#374151"
                               : password.length < 4   ? "#f87171"
                               : "#4ade80",
                        }}>
                          {password.length >= 4 ? (
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <polyline points="20 6 9 17 4 12"/>
                            </svg>
                          ) : (
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <circle cx="12" cy="12" r="10"/>
                              <line x1="12" y1="8" x2="12" y2="12"/>
                              <line x1="12" y1="16" x2="12.01" y2="16"/>
                            </svg>
                          )}
                          {password.length === 0
                            ? "Minimum 4 characters required"
                            : password.length < 4
                            ? `${4 - password.length} more character${4 - password.length !== 1 ? "s" : ""} needed`
                            : "Password looks good"}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>

            </div>

            {/* ── Footer ── */}
            <div className="eim-footer">
              <button type="button" className="eim-cancel-btn" onClick={onClose}>Cancel</button>
              <button type="submit" className={`eim-submit-btn ${cfg.submitCls}`} disabled={uploading}>
                {uploading ? (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="eim-spin">
                      <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                    </svg>
                    Uploading…
                  </>
                ) : (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"/>
                      <polygon points="18 2 22 6 12 16 8 16 8 12 18 2"/>
                    </svg>
                    Save {cfg.label}
                  </>
                )}
              </button>
            </div>
          </form>

        </div>
      </div>
    </Portal>
  );
};

export default EditItemModal;