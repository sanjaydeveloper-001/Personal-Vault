import { useState, useEffect, useRef } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";

const DeleteTrashModal = ({ isOpen, onClose, onConfirm, trashCount, trashSize }) => {
  const [pw, setPw]           = useState("");
  const [show, setShow]       = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRef              = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setPw(""); setShow(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
    const onKey = (e) => { if (isOpen && e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!pw) { toast.error("Enter your password"); return; }
    setLoading(true);
    try {
      await api.post("/auth/verify-password", { password: pw });
      await onConfirm();
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || "Incorrect password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Portal>
      <style>{STYLES}</style>
      <div className="s-backdrop" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
        <div className="s-modal">
          <div className="s-modal-hd">
            <div className="s-modal-ico">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                <path d="M10 11v6"/><path d="M14 11v6"/>
              </svg>
            </div>
            <div>
              <div className="s-modal-t">Empty Trash</div>
              <div className="s-modal-s">{trashCount} item{trashCount !== 1 ? "s" : ""} · {fmtBytes(trashSize)} freed</div>
            </div>
            <button className="s-modal-x" onClick={onClose}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>

          <div className="s-modal-bd">
            <div className="s-modal-warn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2" style={{flexShrink:0,marginTop:1}}>
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
              <span>
                <strong>Permanently deletes</strong> all {trashCount} item{trashCount !== 1 ? "s" : ""}. Files are removed from Cloudinary and cannot be recovered.
              </span>
            </div>

            <form onSubmit={handleSubmit}>
              <label className="s-lbl" style={{marginBottom:7}}>Verify with your sign-in password</label>
              <div className="s-field">
                <input
                  ref={inputRef}
                  className="s-inp pr fr"
                  type={show ? "text" : "password"}
                  placeholder="Your account password…"
                  value={pw}
                  onChange={(e) => setPw(e.target.value)}
                  required
                />
                <button type="button" className="s-eye" onClick={() => setShow(s => !s)}>
                  <EyeIcon open={show} />
                </button>
              </div>

              <div className="s-modal-acts">
                <button type="button" className="s-modal-cancel" onClick={onClose}>Cancel</button>
                <button type="submit" className="s-btn s-btn-red" style={{flex:1}} disabled={loading || !pw}>
                  {loading
                    ? <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="s-spin"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                    : <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>
                  }
                  {loading ? "Verifying…" : "Empty Trash"}
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