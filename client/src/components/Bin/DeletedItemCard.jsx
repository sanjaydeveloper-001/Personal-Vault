import { useState } from "react";
import { itemService } from "../../services/itemService.js";
import toast from "react-hot-toast";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');

  .dic-card {
    font-family: 'DM Sans', sans-serif;
    position: relative;
    background: #0f1424;
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 16px;
    padding: 18px;
    display: flex;
    flex-direction: column;
    gap: 14px;
    transition: border-color 0.2s, box-shadow 0.2s;
    overflow: hidden;
  }
  .dic-card::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 16px;
    background: linear-gradient(135deg, rgba(239,68,68,0.03) 0%, transparent 60%);
    pointer-events: none;
  }
  .dic-card:hover {
    border-color: rgba(239,68,68,0.18);
    box-shadow: 0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(239,68,68,0.06);
  }

  /* ── Deleted ribbon ── */
  .dic-ribbon {
    position: absolute;
    top: 12px; right: -22px;
    background: rgba(239,68,68,0.12);
    color: #f87171;
    font-size: 0.58rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 3px 28px;
    transform: rotate(35deg);
  }

  /* ── Top row ── */
  .dic-top {
    display: flex;
    align-items: flex-start;
    gap: 12px;
  }

  .dic-type-icon {
    width: 38px; height: 38px;
    border-radius: 11px;
    display: flex; align-items: center; justify-content: center;
    font-size: 1.1rem;
    flex-shrink: 0;
  }
  .dic-icon-note { background: rgba(129,140,248,0.1); border: 1px solid rgba(129,140,248,0.14); }
  .dic-icon-link { background: rgba(52,211,153,0.08); border: 1px solid rgba(52,211,153,0.14); }
  .dic-icon-file { background: rgba(244,114,182,0.08); border: 1px solid rgba(244,114,182,0.14); }

  .dic-info { flex: 1; min-width: 0; }
  .dic-title {
    font-family: 'DM Serif Display', serif;
    font-size: 0.97rem;
    color: #94a3b8;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 4px;
    text-decoration: line-through;
    text-decoration-color: rgba(148,163,184,0.3);
  }

  .dic-badges {
    display: flex; align-items: center; gap: 5px; flex-wrap: wrap;
  }
  .dic-chip {
    font-size: 0.6rem; font-weight: 600;
    letter-spacing: 0.07em; text-transform: uppercase;
    padding: 2px 8px; border-radius: 20px;
  }
  .dic-chip-note { background: rgba(129,140,248,0.1); color: #818cf8; }
  .dic-chip-link { background: rgba(52,211,153,0.08); color: #34d399; }
  .dic-chip-file { background: rgba(244,114,182,0.08); color: #f472b6; }

  .dic-lock {
    display: inline-flex; align-items: center; gap: 3px;
    background: rgba(34,197,94,0.07); border: 1px solid rgba(34,197,94,0.15);
    color: #4ade80; border-radius: 20px;
    padding: 2px 7px; font-size: 0.6rem; font-weight: 500;
  }

  /* ── Preview snippet ── */
  .dic-preview {
    background: rgba(255,255,255,0.025);
    border: 1px solid rgba(255,255,255,0.05);
    border-radius: 9px;
    padding: 10px 12px;
    color: #4b5563;
    font-size: 0.78rem;
    line-height: 1.6;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-style: italic;
  }

  /* ── Meta row ── */
  .dic-meta {
    display: flex; align-items: center; gap: 6px;
    color: #374151; font-size: 0.7rem;
  }
  .dic-meta-dot {
    width: 3px; height: 3px; border-radius: 50%;
    background: #374151; flex-shrink: 0;
  }

  /* ── Divider ── */
  .dic-divider {
    height: 1px;
    background: rgba(255,255,255,0.05);
  }

  /* ── Actions ── */
  .dic-actions {
    display: flex; gap: 8px;
  }

  .dic-btn {
    flex: 1; padding: 8px 10px; border-radius: 9px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.775rem; font-weight: 500;
    cursor: pointer; transition: all 0.2s;
    display: flex; align-items: center; justify-content: center; gap: 5px;
    border: 1px solid transparent;
  }
  .dic-btn:disabled {
    opacity: 0.45; cursor: not-allowed; transform: none !important;
  }

  .dic-btn-restore {
    background: rgba(52,211,153,0.08);
    border-color: rgba(52,211,153,0.2);
    color: #34d399;
  }
  .dic-btn-restore:hover:not(:disabled) {
    background: rgba(52,211,153,0.15);
    transform: translateY(-1px);
    box-shadow: 0 4px 14px rgba(52,211,153,0.12);
  }

  .dic-btn-delete {
    background: rgba(239,68,68,0.07);
    border-color: rgba(239,68,68,0.18);
    color: #f87171;
  }
  .dic-btn-delete:hover:not(:disabled) {
    background: rgba(239,68,68,0.14);
    transform: translateY(-1px);
    box-shadow: 0 4px 14px rgba(239,68,68,0.12);
  }

  /* ── Confirm delete overlay ── */
  .dic-confirm {
    background: rgba(10,14,24,0.97);
    border: 1px solid rgba(239,68,68,0.22);
    border-radius: 11px;
    padding: 14px;
    display: flex; flex-direction: column; gap: 10px;
    animation: dicFadeIn 0.15s ease;
  }
  @keyframes dicFadeIn {
    from { opacity: 0; transform: scale(0.97); }
    to   { opacity: 1; transform: scale(1); }
  }
  .dic-confirm-text {
    color: #9ca3af; font-size: 0.78rem; line-height: 1.5; text-align: center;
  }
  .dic-confirm-text strong { color: #f87171; }
  .dic-confirm-actions { display: flex; gap: 7px; }
`;

const typeIconMap = { note: "📝", link: "🔗", file: "📁" };
const typeIconCls = { note: "dic-icon-note", link: "dic-icon-link", file: "dic-icon-file" };
const typeChipCls = { note: "dic-chip-note", link: "dic-chip-link", file: "dic-chip-file" };

const DeletedItemCard = ({ item, onUpdate }) => {
  const [restoring, setRestoring] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [confirming, setConfirming] = useState(false);

  const deletedDate = item.deletedAt
    ? new Date(item.deletedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    : item.updatedAt
    ? new Date(item.updatedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    : "Unknown date";

  const preview = item.type === "note"
    ? item.content
    : item.type === "link"
    ? item.content
    : item.metadata?.originalName || null;

  const handleRestore = async () => {
    setRestoring(true);
    try {
      await itemService.restoreItem(item._id);
      toast.success("Item restored");
      onUpdate();
    } catch {
      toast.error("Restore failed");
    } finally {
      setRestoring(false);
    }
  };

  const handlePermanentDelete = async () => {
    setDeleting(true);
    try {
      await itemService.permanentDelete(item._id);
      toast.success("Permanently deleted");
      onUpdate();
    } catch {
      toast.error("Deletion failed");
    } finally {
      setDeleting(false);
      setConfirming(false);
    }
  };

  return (
    <div className="dic-card">
      <style>{STYLES}</style>

      {/* Deleted ribbon watermark */}
      <div className="dic-ribbon">Deleted</div>

      {/* Top: icon + title + badges */}
      <div className="dic-top">
        <div className={`dic-type-icon ${typeIconCls[item.type] || "dic-icon-file"}`}>
          {typeIconMap[item.type] || "📁"}
        </div>
        <div className="dic-info">
          <div className="dic-title">{item.title || "Untitled"}</div>
          <div className="dic-badges">
            <span className={`dic-chip ${typeChipCls[item.type] || "dic-chip-file"}`}>
              {item.type}
            </span>
            {item.hasPassword && (
              <span className="dic-lock">
                <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <rect x="3" y="11" width="18" height="11" rx="2"/>
                  <path d="M7 11V7a5 5 0 0 1 9.9-1"/>
                </svg>
                Locked
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Content preview */}
      {preview && (
        <div className="dic-preview">
          {preview}
        </div>
      )}

      {/* Meta */}
      <div className="dic-meta">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
          <path d="M10 11v6"/><path d="M14 11v6"/>
          <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
        </svg>
        Deleted {deletedDate}
      </div>

      <div className="dic-divider" />

      {/* Actions or confirm */}
      {confirming ? (
        <div className="dic-confirm">
          <p className="dic-confirm-text">
            <strong>Permanently delete?</strong><br />This cannot be undone.
          </p>
          <div className="dic-confirm-actions">
            <button className="dic-btn dic-btn-restore" onClick={() => setConfirming(false)} disabled={deleting}>
              Cancel
            </button>
            <button className="dic-btn dic-btn-delete" onClick={handlePermanentDelete} disabled={deleting}>
              {deleting ? "Deleting…" : "Yes, delete"}
            </button>
          </div>
        </div>
      ) : (
        <div className="dic-actions">
          <button className="dic-btn dic-btn-restore" onClick={handleRestore} disabled={restoring || deleting}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
              <path d="M3 3v5h5"/>
            </svg>
            {restoring ? "Restoring…" : "Restore"}
          </button>
          <button className="dic-btn dic-btn-delete" onClick={() => setConfirming(true)} disabled={restoring || deleting}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
              <path d="M10 11v6"/><path d="M14 11v6"/>
            </svg>
            Delete Forever
          </button>
        </div>
      )}
    </div>
  );
};

export default DeletedItemCard;