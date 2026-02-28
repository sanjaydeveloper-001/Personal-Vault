import { useState } from "react";
import { itemService } from "../../services/itemService";
import PasswordPromptModal from "./PasswordPromptModal";
import ItemDetailModal from "./ItemDetailModal";
import EditItemModal from "./EditItemModal";
import toast from "react-hot-toast";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');

  .item-card {
    font-family: 'DM Sans', sans-serif;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 14px; padding: 18px;
    cursor: pointer; transition: all 0.25s;
    position: relative; overflow: hidden;
  }
  .item-card::before {
    content: ''; position: absolute; left: 0; top: 0; bottom: 0;
    width: 3px; border-radius: 3px 0 0 3px;
  }
  .item-card.note::before { background: #818cf8; }
  .item-card.link::before { background: #34d399; }
  .item-card.file::before { background: #f472b6; }

  .item-card:hover { transform: translateY(-2px); border-color: rgba(255,255,255,0.12); }
  .item-card.note:hover { box-shadow: 0 8px 28px rgba(129,140,248,0.1); }
  .item-card.link:hover { box-shadow: 0 8px 28px rgba(52,211,153,0.08); }
  .item-card.file:hover { box-shadow: 0 8px 28px rgba(244,114,182,0.08); }

  .type-icon-wrap {
    width: 36px; height: 36px; border-radius: 9px; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center; font-size: 1rem;
  }
  .icon-note { background: rgba(129,140,248,0.12); }
  .icon-link { background: rgba(52,211,153,0.1); }
  .icon-file { background: rgba(244,114,182,0.1); }

  .item-title { color: #e2e8f0; font-size: 0.9rem; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .item-meta  { color: #4b5563; font-size: 0.75rem; margin-top: 2px; }

  .type-chip { font-size: 0.68rem; letter-spacing: 0.05em; text-transform: uppercase; padding: 2px 9px; border-radius: 20px; font-weight: 500; }
  .chip-note { background: rgba(129,140,248,0.12); color: #818cf8; }
  .chip-link { background: rgba(52,211,153,0.1);  color: #34d399; }
  .chip-file { background: rgba(244,114,182,0.1); color: #f472b6; }

  .lock-chip { display: inline-flex; align-items: center; gap: 4px; background: rgba(251,191,36,0.1); color: #fbbf24; border-radius: 20px; padding: 2px 8px; font-size: 0.68rem; }

  .action-btn {
    width: 30px; height: 30px; border-radius: 8px; border: none;
    background: rgba(255,255,255,0.04); cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    color: #4b5563; transition: all 0.18s;
  }
  .action-btn.edit:hover { background: rgba(129,140,248,0.12); color: #818cf8; }
  .action-btn.del:hover  { background: rgba(239,68,68,0.12);   color: #f87171; }

  .preview-text {
    color: #4b5563; font-size: 0.78rem; margin-top: 10px; line-height: 1.5;
    display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
    border-top: 1px solid rgba(255,255,255,0.05); padding-top: 10px;
  }

  .confirm-overlay {
    position: absolute; inset: 0; background: rgba(10,14,26,0.94);
    border-radius: 14px; display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    gap: 12px; padding: 16px; z-index: 10;
    animation: cfIn 0.15s ease forwards;
  }
  @keyframes cfIn { from { opacity:0; } to { opacity:1; } }
  .confirm-title { color: #fca5a5; font-size: 0.875rem; font-weight: 500; text-align: center; }
  .confirm-sub   { color: #6b7280; font-size: 0.75rem; text-align: center; }
  .confirm-btns  { display: flex; gap: 8px; }
  .confirm-cancel {
    padding: 7px 16px; border-radius: 8px;
    border: 1px solid rgba(255,255,255,0.09);
    background: rgba(255,255,255,0.04); color: #9ca3af;
    font-family: 'DM Sans', sans-serif; font-size: 0.8rem; cursor: pointer; transition: all 0.18s;
  }
  .confirm-cancel:hover { background: rgba(255,255,255,0.08); }
  .confirm-delete {
    padding: 7px 16px; border-radius: 8px;
    background: rgba(239,68,68,0.15); color: #fca5a5;
    font-family: 'DM Sans', sans-serif; font-size: 0.8rem; cursor: pointer; transition: all 0.18s;
    border: 1px solid rgba(239,68,68,0.25);
  }
  .confirm-delete:hover { background: rgba(239,68,68,0.25); }

  .view-hint {
    position: absolute; bottom: 0; left: 0; right: 0;
    background: linear-gradient(to top, rgba(10,14,26,0.7), transparent);
    text-align: center; padding: 16px 12px 10px;
    font-size: 0.72rem; color: #4b5563;
    opacity: 0; transition: opacity 0.2s; pointer-events: none;
    border-radius: 0 0 14px 14px;
  }
  .item-card:hover .view-hint { opacity: 1; }
`;

const typeIcon = { note: "📝", link: "🔗", file: "📁" };
const typeWrap = { note: "icon-note", link: "icon-link", file: "icon-file" };
const typeChip = { note: "chip-note", link: "chip-link", file: "chip-file" };

/*
  pendingAction: what to do after password verification succeeds
    "view"   → open ItemDetailModal
    "edit"   → open EditItemModal  
    "delete" → show confirm overlay
*/

const ItemCard = ({ item, onDelete, onUpdate }) => {
  const [pendingAction,   setPendingAction]   = useState(null);
  const [showPassModal,   setShowPassModal]   = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showEditModal,   setShowEditModal]   = useState(false);
  const [showConfirm,     setShowConfirm]     = useState(false);
  const [unlockedItem,    setUnlockedItem]    = useState(null);

  /* ── Trigger password gate ── */
  const requirePassword = (action) => {
    setPendingAction(action);
    setShowPassModal(true);
  };

  /* ── Card body click → view ── */
  const handleCardClick = () => {
    if (item.hasPassword) {
      requirePassword("view");
    } else {
      setUnlockedItem(item);
      setShowDetailModal(true);
    }
  };

  /* ── Edit pencil click ── */
  const handleEditClick = (e) => {
    e.stopPropagation();
    if (item.hasPassword) {
      requirePassword("edit");
    } else {
      setUnlockedItem(item);
      setShowEditModal(true);
    }
  };

  /* ── Trash icon click ── */
  const handleDeleteClick = (e) => {
    e.stopPropagation();
    if (item.hasPassword) {
      requirePassword("delete");
    } else {
      setShowConfirm(true);
    }
  };

  /* ── Password verified — dispatch to the right action ── */
  const handlePasswordSubmit = async (password) => {
    try {
      const { data } = await itemService.verifyPassword(item._id, password);
      const unlocked = { ...item, ...data };
      setUnlockedItem(unlocked);
      setShowPassModal(false);

      if (pendingAction === "view") {
        setShowDetailModal(true);
      } else if (pendingAction === "edit") {
        setShowEditModal(true);
      } else if (pendingAction === "delete") {
        setShowConfirm(true);
      }

      setPendingAction(null);
    } catch (err) {
      toast.error(err.response?.data?.message || "Incorrect password");
      // keep modal open so user can retry — don't close
    }
  };

  const confirmDelete = async () => {
    try {
      await itemService.deleteItem(item._id);
      toast.success("Moved to trash");
      onDelete?.();
    } catch {
      toast.error("Failed to delete");
    }
  };

  const date = item.createdAt
    ? new Date(item.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })
    : "";

  return (
    <>
      <style>{STYLES}</style>

      <div className={`item-card ${item.type}`} onClick={handleCardClick}>

        {/* ── Confirm delete overlay ── */}
        {showConfirm && (
          <div className="confirm-overlay" onClick={(e) => e.stopPropagation()}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
              <path d="M10 11v6"/><path d="M14 11v6"/>
            </svg>
            <div>
              <div className="confirm-title">Move to Trash?</div>
              <div className="confirm-sub">You can restore it from the Bin later.</div>
            </div>
            <div className="confirm-btns">
              <button className="confirm-cancel" onClick={() => setShowConfirm(false)}>Cancel</button>
              <button className="confirm-delete" onClick={confirmDelete}>Move to Trash</button>
            </div>
          </div>
        )}

        {/* ── Top row ── */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
          <div className={`type-icon-wrap ${typeWrap[item.type]}`}>
            {typeIcon[item.type] || "📄"}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="item-title">{item.title || "Untitled"}</div>
            <div className="item-meta">{date}</div>
          </div>
          <div style={{ display: "flex", gap: 5, flexShrink: 0 }} onClick={(e) => e.stopPropagation()}>
            <button className="action-btn edit" title="Edit" onClick={handleEditClick}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
            </button>
            <button className="action-btn del" title="Delete" onClick={handleDeleteClick}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
              </svg>
            </button>
          </div>
        </div>

        {/* ── Preview snippet ── */}
        {item.type === "note" && item.content && !item.hasPassword && (
          <div className="preview-text">{item.content}</div>
        )}
        {item.type === "link" && item.content && !item.hasPassword && (
          <div className="preview-text" style={{ color: "#34d399" }}>{item.content}</div>
        )}
        {item.type === "file" && item.metadata?.originalName && !item.hasPassword && (
          <div className="preview-text" style={{ color: "#f472b6" }}>
            📎 {item.metadata.originalName}
            {item.metadata.size
              ? ` · ${item.metadata.size < 1048576
                  ? `${(item.metadata.size / 1024).toFixed(1)} KB`
                  : `${(item.metadata.size / 1048576).toFixed(1)} MB`}`
              : ""}
          </div>
        )}
        {item.hasPassword && (
          <div className="preview-text" style={{ color: "#4b5563", fontStyle: "italic" }}>
            🔒 Password protected — click to unlock
          </div>
        )}

        {/* ── Chips row ── */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 12 }}>
          <span className={`type-chip ${typeChip[item.type]}`}>{item.type}</span>
          {item.hasPassword && (
            <span className="lock-chip">
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <rect x="3" y="11" width="18" height="11" rx="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              Locked
            </span>
          )}
          {item.type === "file" && item.metadata?.size && (
            <span style={{ color: "#374151", fontSize: "0.7rem" }}>
              {item.metadata.size < 1048576
                ? `${(item.metadata.size / 1024).toFixed(1)} KB`
                : `${(item.metadata.size / 1048576).toFixed(1)} MB`}
            </span>
          )}
        </div>

        <div className="view-hint">Click to view</div>
      </div>

      {/* ── Single PasswordPromptModal, reused for all three actions ── */}
      <PasswordPromptModal
        isOpen={showPassModal}
        onClose={() => { setShowPassModal(false); setPendingAction(null); }}
        onSubmit={handlePasswordSubmit}
        action={pendingAction}
      />

      <ItemDetailModal
        isOpen={showDetailModal}
        onClose={() => { setShowDetailModal(false); setUnlockedItem(null); }}
        item={unlockedItem}
      />

      <EditItemModal
        isOpen={showEditModal}
        onClose={() => { setShowEditModal(false); setUnlockedItem(null); }}
        item={unlockedItem || item}
        onItemUpdated={() => { onUpdate?.(); onDelete?.(); }}
      />
    </>
  );
};

export default ItemCard;