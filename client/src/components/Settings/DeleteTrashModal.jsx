import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import toast from "react-hot-toast";
import { fmtBytes, SpinnerIcon, STYLES } from "./settingsStyles";

const Portal = ({ children }) => createPortal(children, document.body);

const CONFIRM_PHRASE = "DeleteAllTrash";

const DeleteTrashModal = ({ isOpen, onClose, onConfirm, trashCount, trashSize }) => {
  const [phrase, setPhrase] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  const isMatch = phrase === CONFIRM_PHRASE;

  useEffect(() => {
    if (isOpen) {
      setPhrase("");
      setTimeout(() => inputRef.current?.focus(), 100);
    }
    const onKey = (e) => {
      if (isOpen && e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isMatch) {
      toast.error(`Type "${CONFIRM_PHRASE}" exactly to confirm`);
      return;
    }
    setLoading(true);
    try {
      await onConfirm();
      onClose();
    } catch {
      toast.error("Failed to empty trash");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Portal>
      <style>{STYLES}</style>
      <div
        className="s-backdrop"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <div className="s-modal">
          {/* Header */}
          <div className="s-modal-hd">
            <div className="s-modal-ico">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                <path d="M10 11v6" /><path d="M14 11v6" />
              </svg>
            </div>
            <div>
              <div className="s-modal-t">Empty Trash</div>
              <div className="s-modal-s">
                {trashCount} item{trashCount !== 1 ? "s" : ""} · {fmtBytes(trashSize)} will be freed
              </div>
            </div>
            <button className="s-modal-x" onClick={onClose}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Body */}
          <div className="s-modal-bd">
            <div className="s-modal-warn">
              <svg
                width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="#f87171" strokeWidth="2"
                style={{ flexShrink: 0, marginTop: 1 }}
              >
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              <span>
                <strong>Permanently deletes</strong> all {trashCount} item
                {trashCount !== 1 ? "s" : ""}. Files are removed and{" "}
                <strong>cannot be recovered</strong>.
              </span>
            </div>

            <form onSubmit={handleSubmit}>
              <label className="s-lbl" style={{ marginBottom: 8 }}>
                Type the phrase below to confirm
              </label>

              {/* Phrase display */}
              <div className="s-confirm-phrase">{CONFIRM_PHRASE}</div>

              <div className="s-field" style={{ marginBottom: 0 }}>
                <input
                  ref={inputRef}
                  className="s-inp fr"
                  type="text"
                  placeholder={`Type "${CONFIRM_PHRASE}" to confirm…`}
                  value={phrase}
                  onChange={(e) => setPhrase(e.target.value)}
                  autoComplete="off"
                  spellCheck={false}
                  style={{
                    borderColor: phrase && !isMatch
                      ? "rgba(239,68,68,0.45)"
                      : isMatch
                      ? "rgba(52,211,153,0.45)"
                      : undefined,
                  }}
                />
              </div>

              {phrase && !isMatch && (
                <div className="s-mismatch" style={{ marginTop: 5 }}>
                  Phrase doesn't match — check for typos
                </div>
              )}
              {isMatch && (
                <div style={{ color: "#34d399", fontSize: "0.69rem", marginTop: 5 }}>
                  ✓ Phrase confirmed
                </div>
              )}

              <div className="s-modal-acts">
                <button type="button" className="s-modal-cancel" onClick={onClose}>
                  Cancel
                </button>
                <button
                  type="submit"
                  className="s-btn s-btn-red"
                  style={{ flex: 1 }}
                  disabled={loading || !isMatch}
                >
                  {loading ? (
                    <SpinnerIcon />
                  ) : (
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                    </svg>
                  )}
                  {loading ? "Deleting…" : "Empty Trash"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default DeleteTrashModal;