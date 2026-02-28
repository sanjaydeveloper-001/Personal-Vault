import { useState } from "react";
import Modal from "../UI/Modal";
import { itemService } from "../../services/itemService";
import api from "../../services/api";
import toast from "react-hot-toast";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');
  .cim-root { font-family: 'DM Sans', sans-serif; }

  .type-tab {
    flex: 1; padding: 9px 0; border-radius: 9px; border: 1px solid transparent;
    font-size: 0.82rem; font-weight: 500; cursor: pointer; transition: all 0.2s;
    font-family: 'DM Sans', sans-serif; display: flex; align-items: center; justify-content: center; gap: 6px;
    background: rgba(255,255,255,0.03); color: #6b7280;
    border-color: rgba(255,255,255,0.07);
  }
  .type-tab:hover { color: #e2e8f0; background: rgba(255,255,255,0.06); }
  .type-tab.note.active  { background: rgba(129,140,248,0.12); border-color: rgba(129,140,248,0.3); color: #818cf8; }
  .type-tab.link.active  { background: rgba(52,211,153,0.1);  border-color: rgba(52,211,153,0.28); color: #34d399; }
  .type-tab.file.active  { background: rgba(244,114,182,0.1); border-color: rgba(244,114,182,0.28); color: #f472b6; }

  .cim-label {
    display: block; font-size: 0.77rem; color: #9ca3af;
    margin-bottom: 6px; letter-spacing: 0.05em; text-transform: uppercase;
  }

  .cim-input {
    width: 100%;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.09);
    border-radius: 10px; padding: 10px 14px;
    color: #f1f5f9; font-size: 0.875rem;
    font-family: 'DM Sans', sans-serif;
    outline: none; transition: all 0.2s; box-sizing: border-box;
  }
  .cim-input:focus {
    border-color: rgba(251,191,36,0.45);
    background: rgba(251,191,36,0.04);
    box-shadow: 0 0 0 3px rgba(251,191,36,0.07);
  }
  .cim-input::placeholder { color: #374151; }

  .cim-textarea {
    width: 100%; resize: vertical; min-height: 110px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.09);
    border-radius: 10px; padding: 10px 14px;
    color: #f1f5f9; font-size: 0.875rem; line-height: 1.6;
    font-family: 'DM Sans', sans-serif;
    outline: none; transition: all 0.2s; box-sizing: border-box;
  }
  .cim-textarea:focus {
    border-color: rgba(251,191,36,0.45);
    background: rgba(251,191,36,0.04);
    box-shadow: 0 0 0 3px rgba(251,191,36,0.07);
  }
  .cim-textarea::placeholder { color: #374151; }

  .file-drop {
    border: 2px dashed rgba(255,255,255,0.1);
    border-radius: 12px; padding: 28px 20px;
    text-align: center; cursor: pointer; transition: all 0.2s;
    background: rgba(255,255,255,0.02);
  }
  .file-drop:hover, .file-drop.drag-over {
    border-color: rgba(244,114,182,0.35);
    background: rgba(244,114,182,0.04);
  }
  .file-drop.has-file { border-color: rgba(244,114,182,0.3); background: rgba(244,114,182,0.05); }

  .protect-toggle {
    display: flex; align-items: center; gap: 10px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 10px; padding: 12px 14px; cursor: pointer;
    transition: all 0.2s; user-select: none;
  }
  .protect-toggle:hover { background: rgba(251,191,36,0.05); border-color: rgba(251,191,36,0.2); }
  .protect-toggle.active { background: rgba(251,191,36,0.07); border-color: rgba(251,191,36,0.25); }

  .toggle-switch {
    width: 36px; height: 20px; border-radius: 20px;
    background: rgba(255,255,255,0.1); position: relative; transition: background 0.2s; flex-shrink: 0;
  }
  .toggle-switch.on { background: rgba(251,191,36,0.5); }
  .toggle-switch::after {
    content: ''; position: absolute; top: 3px; left: 3px;
    width: 14px; height: 14px; border-radius: 50%; background: white;
    transition: transform 0.2s; box-shadow: 0 1px 4px rgba(0,0,0,0.3);
  }
  .toggle-switch.on::after { transform: translateX(16px); }

  .cancel-btn {
    flex: 1; padding: 10px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.09);
    background: rgba(255,255,255,0.04); color: #9ca3af;
    font-family: 'DM Sans', sans-serif; font-size: 0.875rem; cursor: pointer; transition: all 0.2s;
  }
  .cancel-btn:hover { background: rgba(255,255,255,0.07); color: #e2e8f0; }

  .submit-btn {
    flex: 1; padding: 10px; border-radius: 10px; border: none;
    background: linear-gradient(135deg, #f59e0b, #d97706); color: white;
    font-family: 'DM Sans', sans-serif; font-size: 0.875rem; font-weight: 500;
    cursor: pointer; transition: all 0.25s;
    box-shadow: 0 3px 12px rgba(245,158,11,0.2);
    display: flex; align-items: center; justify-content: center; gap: 6px;
  }
  .submit-btn:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(245,158,11,0.3); }
  .submit-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

  .field-wrap { margin-bottom: 14px; }

  @keyframes spin { to { transform: rotate(360deg); } }
  .spin { animation: spin 0.8s linear infinite; }
`;

const CreateItemModal = ({ onClose, onItemCreated }) => {
  const [type, setType] = useState("note");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [linkDescription, setLinkDescription] = useState("");
  const [file, setFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [password, setPassword] = useState("");
  const [protect, setProtect] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleDrop = (e) => {
    e.preventDefault(); setDragOver(false);
    const f = e.dataTransfer.files[0];
    if (f) setFile(f);
  };

  const uploadFileToCloudinary = async () => {
    try {
      const { data } = await api.get("/upload/signature");
      const { timestamp, signature, apiKey, cloudName, folder } = data;
      const formData = new FormData(); 
      formData.append("file", file);
      formData.append("api_key", apiKey);
      formData.append("timestamp", timestamp);
      formData.append("signature", signature);
      formData.append("folder", folder);
      const uploadRes = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, { method: "POST", body: formData });
      const uploadData = await uploadRes.json();

      if (uploadData.secure_url) {
        return { public_id: uploadData.public_id, url: uploadData.secure_url, originalName: file.name, size: file.size, mimeType: file.type };
      }
      throw new Error("Upload failed");
    } catch (error) {
      toast.error("File upload failed");
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let itemData = { type, title: title || (type === "file" ? file?.name : ""), password: protect ? password : undefined };
      if (type === "note") { itemData.content = content; itemData.metadata = {}; }
      else if (type === "link") { itemData.content = linkUrl; itemData.metadata = { description: linkDescription }; }
      else if (type === "file") {
        if (!file) { toast.error("Please select a file"); return; }
        setUploading(true);
        const fileMeta = await uploadFileToCloudinary();
        itemData.metadata = fileMeta;
        itemData.content = fileMeta.url;
      }
      await itemService.createItem(itemData);
      toast.success("Item created");
      onItemCreated();
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || "Creation failed");
    } finally {
      setUploading(false);
    }
  };

  const typeConfig = {
    note: { icon: "📝", label: "Note",  color: "#818cf8" },
    link: { icon: "🔗", label: "Link",  color: "#34d399" },
    file: { icon: "📁", label: "File",  color: "#f472b6" },
  };

  const formatBytes = (b) => b < 1024 ? `${b}B` : b < 1048576 ? `${(b/1024).toFixed(1)}KB` : `${(b/1048576).toFixed(1)}MB`;

  return (
    <Modal isOpen={true} onClose={onClose} title="New Vault Item">
      <style>{STYLES}</style>
      <div className="cim-root">

        {/* Type tabs */}
        <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
          {Object.entries(typeConfig).map(([key, { icon, label }]) => (
            <button
              key={key} type="button"
              onClick={() => setType(key)}
              className={`type-tab ${key} ${type === key ? "active" : ""}`}
            >
              <span>{icon}</span> {label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          {/* Title */}
          {type !== "file" && (
            <div className="field-wrap">
              <label className="cim-label">Title <span style={{ color: "#374151" }}>(optional)</span></label>
              <input className="cim-input" placeholder={`Give this ${type} a name…`} value={title} onChange={e => setTitle(e.target.value)} />
            </div>
          )}

          {/* Note */}
          {type === "note" && (
            <div className="field-wrap">
              <label className="cim-label">Content</label>
              <textarea className="cim-textarea" placeholder="Write your note here…" value={content} onChange={e => setContent(e.target.value)} required />
            </div>
          )}

          {/* Link */}
          {type === "link" && (
            <>
              <div className="field-wrap">
                <label className="cim-label">URL</label>
                <input className="cim-input" type="url" placeholder="https://example.com" value={linkUrl} onChange={e => setLinkUrl(e.target.value)} required />
              </div>
              <div className="field-wrap">
                <label className="cim-label">Description <span style={{ color: "#374151" }}>(optional)</span></label>
                <input className="cim-input" placeholder="What is this link about?" value={linkDescription} onChange={e => setLinkDescription(e.target.value)} />
              </div>
            </>
          )}

          {/* File */}
          {type === "file" && (
            <div className="field-wrap">
              <label className="cim-label">File</label>
              <label
                className={`file-drop ${dragOver ? "drag-over" : ""} ${file ? "has-file" : ""}`}
                onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
              >
                <input type="file" style={{ display: "none" }} onChange={handleFileChange} required={!file} />
                {file ? (
                  <div>
                    <div style={{ fontSize: "2rem", marginBottom: 8 }}>📁</div>
                    <div style={{ color: "#e2e8f0", fontSize: "0.875rem", fontWeight: 500 }}>{file.name}</div>
                    <div style={{ color: "#4b5563", fontSize: "0.75rem", marginTop: 4 }}>
                      {formatBytes(file.size)} · {file.type || "unknown type"}
                    </div>
                    <div style={{ color: "#f472b6", fontSize: "0.72rem", marginTop: 8 }}>Click to change file</div>
                  </div>
                ) : (
                  <div>
                    <div style={{ fontSize: "2rem", marginBottom: 8, color: "#374151" }}>📂</div>
                    <div style={{ color: "#6b7280", fontSize: "0.875rem" }}>Drop file here or <span style={{ color: "#f472b6" }}>browse</span></div>
                    <div style={{ color: "#374151", fontSize: "0.75rem", marginTop: 4 }}>Max 10MB</div>
                  </div>
                )}
              </label>
            </div>
          )}

          {/* Divider */}
          <div style={{ height: 1, background: "rgba(255,255,255,0.06)", margin: "16px 0" }} />

          {/* Password protect toggle */}
          <div className="field-wrap">
            <div className={`protect-toggle ${protect ? "active" : ""}`} onClick={() => setProtect(p => !p)}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={protect ? "#fbbf24" : "#6b7280"} strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              <div style={{ flex: 1 }}>
                <div style={{ color: protect ? "#fbbf24" : "#9ca3af", fontSize: "0.875rem", fontWeight: 500 }}>
                  Password protect this item
                </div>
                <div style={{ color: "#4b5563", fontSize: "0.75rem", marginTop: 1 }}>
                  Require a password to view
                </div>
              </div>
              <div className={`toggle-switch ${protect ? "on" : ""}`} />
            </div>
          </div>

          {protect && (
            <div className="field-wrap">
              <label className="cim-label">Item Password</label>
              <div style={{ position: "relative" }}>
                <input
                  className="cim-input"
                  style={{ paddingRight: 42 }}
                  type={showPass ? "text" : "password"}
                  placeholder="Set a password for this item"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
                <button type="button" onClick={() => setShowPass(s => !s)} style={{
                  position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
                  background: "none", border: "none", color: "#4b5563", cursor: "pointer", padding: 0, transition: "color 0.2s"
                }}>
                  {showPass
                    ? <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                    : <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  }
                </button>
              </div>
            </div>
          )}

          {/* Actions */}
          <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="submit-btn" disabled={uploading}>
              {uploading ? (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="spin">
                    <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                  </svg>
                  Uploading…
                </>
              ) : (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M12 5v14M5 12h14"/>
                  </svg>
                  Create {typeConfig[type].label}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default CreateItemModal;