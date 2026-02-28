import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

/* ─────────────────────────────────────────────
   Shared helpers
───────────────────────────────────────────── */
const formatBytes = (b) => {
  if (!b) return "";
  if (b < 1024) return `${b} B`;
  if (b < 1048576) return `${(b / 1024).toFixed(1)} KB`;
  return `${(b / 1048576).toFixed(1)} MB`;
};
const isImage = (mime) => mime && mime.startsWith("image/");
const isPdf   = (mime) => mime === "application/pdf";
const isVideo = (mime) => mime && mime.startsWith("video/");
const isAudio = (mime) => mime && mime.startsWith("audio/");
const isText  = (mime) => mime && (mime.startsWith("text/") || mime === "application/json");

const typeIconMap = { note: "📝", link: "🔗", file: "📁" };
const typeWrapCls = { note: "idm-type-note", link: "idm-type-link", file: "idm-type-file" };
const typeChipCls = { note: "chip-note",     link: "chip-link",     file: "chip-file" };

/* ─────────────────────────────────────────────
   GLOBAL STYLES — injected once into <head>
   Both overlays share this so classes don't clash
───────────────────────────────────────────── */
const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');

  /* ── Shared full-screen overlay backdrop ── */
  .vn-overlay-backdrop {
    /* Portal renders this directly in <body> so fixed always means viewport */
    position: fixed;
    inset: 0;
    z-index: 9999;

    background: rgba(4, 6, 14,0.5);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(20px);

    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    box-sizing: border-box;

    font-family: 'DM Sans', sans-serif;
    animation: vnFadeIn 0.18s ease forwards;
  }
  @keyframes vnFadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  /* ── NOTE / LINK card ── */
  .vn-note-card {
    background: #0f1424;
    border: 1px solid rgba(255,255,255,0.09);
    border-radius: 22px;
    width: 100%;
    max-width: 520px;
    box-shadow: 0 28px 70px rgba(0,0,0,0.55), 0 0 0 1px rgba(251,191,36,0.06);
    overflow: hidden;
    animation: vnSlideUp 0.22s cubic-bezier(0.34,1.1,0.64,1) forwards;
  }

  /* ── FILE card ── */
  .vn-file-card {
    background: #0c101e;
    border: 1px solid rgba(255,255,255,0.09);
    border-radius: 20px;
    width: 100%;
    max-width: 860px;
    height: calc(100dvh - 48px);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    box-shadow:
      0 0 0 1px rgba(244,114,182,0.05),
      0 40px 100px rgba(0,0,0,0.8),
      inset 0 1px 0 rgba(255,255,255,0.04);
    animation: vnSlideUp 0.24s cubic-bezier(0.34, 1.1, 0.64, 1) forwards;
  }

  @keyframes vnSlideUp {
    from { opacity: 0; transform: scale(0.94) translateY(16px); }
    to   { opacity: 1; transform: scale(1) translateY(0); }
  }

  /* ── Shared header ── */
  .vn-header {
    display: flex; align-items: center; gap: 12px;
    padding: 14px 16px;
    background: rgba(255,255,255,0.022);
    border-bottom: 1px solid rgba(255,255,255,0.07);
    flex-shrink: 0;
  }

  .vn-type-icon {
    width: 34px; height: 34px; border-radius: 10px; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center; font-size: 1rem;
  }
  .vn-type-note { background: rgba(129,140,248,0.12); }
  .vn-type-link { background: rgba(52,211,153,0.1);  }
  .vn-type-file { background: rgba(244,114,182,0.1); }

  .vn-title {
    font-family: 'DM Serif Display', serif;
    font-size: 1rem; color: #f1f5f9; letter-spacing: -0.01em;
    flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
  }
  .vn-meta { color: #4b5563; font-size: 0.7rem; margin-top: 2px; }

  .vn-chip {
    font-size: 0.62rem; letter-spacing: 0.06em; text-transform: uppercase;
    padding: 3px 9px; border-radius: 20px; font-weight: 600; flex-shrink: 0;
  }
  .vn-chip-note { background: rgba(129,140,248,0.12); color: #818cf8; }
  .vn-chip-link { background: rgba(52,211,153,0.1);  color: #34d399; }
  .vn-chip-file { background: rgba(244,114,182,0.1); color: #f472b6; }

  .vn-lock-badge {
    display: inline-flex; align-items: center; gap: 4px;
    background: rgba(34,197,94,0.08); border: 1px solid rgba(34,197,94,0.2);
    color: #4ade80; border-radius: 20px; padding: 3px 9px; font-size: 0.66rem; flex-shrink: 0;
  }

  .vn-icon-btn {
    width: 30px; height: 30px; border-radius: 8px; flex-shrink: 0;
    border: 1px solid rgba(255,255,255,0.08);
    background: rgba(255,255,255,0.04); color: #6b7280; cursor: pointer;
    display: flex; align-items: center; justify-content: center; transition: all 0.18s;
  }
  .vn-icon-btn:hover { background: rgba(255,255,255,0.08); color: #e2e8f0; }
  .vn-icon-btn.danger:hover {
    background: rgba(239,68,68,0.12);
    border-color: rgba(239,68,68,0.22);
    color: #f87171;
  }

  .vn-text-btn {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 6px 14px; border-radius: 8px; cursor: pointer;
    font-family: 'DM Sans', sans-serif; font-size: 0.78rem; font-weight: 500;
    text-decoration: none; transition: all 0.2s; border: 1px solid transparent;
  }
  .vn-btn-ghost {
    background: rgba(255,255,255,0.05); border-color: rgba(255,255,255,0.09); color: #9ca3af;
  }
  .vn-btn-ghost:hover { background: rgba(255,255,255,0.08); color: #e2e8f0; }
  .vn-btn-pink {
    background: rgba(244,114,182,0.1); border-color: rgba(244,114,182,0.25); color: #f472b6;
  }
  .vn-btn-pink:hover { background: rgba(244,114,182,0.18); transform: translateY(-1px); }

  /* ── NOTE body ── */
  .vn-note-body { padding: 20px; }
  .vn-note-content {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 12px; padding: 16px;
    color: #cbd5e1; font-size: 0.875rem; line-height: 1.8;
    white-space: pre-wrap; word-break: break-word;
    max-height: 320px; overflow-y: auto;
  }
  .vn-note-content::-webkit-scrollbar { width: 4px; }
  .vn-note-content::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }

  .vn-copy-btn {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 7px 14px; border-radius: 8px; cursor: pointer; border: 1px solid transparent;
    font-family: 'DM Sans', sans-serif; font-size: 0.78rem; transition: all 0.18s;
    background: rgba(255,255,255,0.04); border-color: rgba(255,255,255,0.08); color: #9ca3af;
  }
  .vn-copy-btn:hover { background: rgba(255,255,255,0.07); color: #e2e8f0; }
  .vn-copy-btn.copied { background: rgba(34,197,94,0.09); border-color: rgba(34,197,94,0.2); color: #4ade80; }

  /* ── LINK body ── */
  .vn-link-card {
    margin: 16px 20px 20px;
    background: rgba(52,211,153,0.04);
    border: 1px solid rgba(52,211,153,0.16);
    border-radius: 12px; padding: 16px;
  }
  .vn-link-url-row {
    display: flex; align-items: flex-start; gap: 9px;
    color: #34d399; font-size: 0.85rem; word-break: break-all; line-height: 1.5;
  }
  .vn-link-desc {
    color: #6b7280; font-size: 0.8rem; margin-top: 10px; line-height: 1.5;
    border-top: 1px solid rgba(52,211,153,0.1); padding-top: 10px;
  }
  .vn-link-actions { display: flex; gap: 8px; margin-top: 14px; flex-wrap: wrap; }
  .vn-btn-green {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 8px 16px; border-radius: 9px; text-decoration: none; cursor: pointer;
    font-family: 'DM Sans', sans-serif; font-size: 0.8rem; font-weight: 500;
    background: rgba(52,211,153,0.1); border: 1px solid rgba(52,211,153,0.25); color: #34d399;
    transition: all 0.2s;
  }
  .vn-btn-green:hover { background: rgba(52,211,153,0.18); transform: translateY(-1px); }

  /* ── FILE viewer ── */
  .vn-file-viewer {
    flex: 1;
    min-height: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    background: #060810;
  }

  /* IMAGE */
  .vn-img-wrap {
    width: 100%; height: 100%;
    display: flex; align-items: center; justify-content: center;
    overflow: auto; padding: 20px; box-sizing: border-box;
  }
  .vn-img-wrap img {
    max-width: 100%; max-height: 100%;
    object-fit: contain; border-radius: 8px;
    box-shadow: 0 8px 60px rgba(0,0,0,0.8);
    display: block; transition: transform 0.2s ease;
  }
  .vn-zoom-bar {
    position: absolute; bottom: 16px; left: 50%; transform: translateX(-50%);
    display: flex; align-items: center; gap: 5px;
    background: rgba(10,14,26,0.94); border: 1px solid rgba(255,255,255,0.09);
    border-radius: 28px; padding: 5px 10px;
    backdrop-filter: blur(12px); box-shadow: 0 4px 20px rgba(0,0,0,0.5);
  }
  .vn-zoom-btn {
    width: 26px; height: 26px; border-radius: 50%; border: none;
    background: rgba(255,255,255,0.07); color: #e2e8f0; cursor: pointer;
    display: flex; align-items: center; justify-content: center; transition: all 0.18s;
  }
  .vn-zoom-btn:hover { background: rgba(255,255,255,0.14); }
  .vn-zoom-label { color: #6b7280; font-size: 0.7rem; min-width: 36px; text-align: center; }

  /* PDF */
  .vn-pdf-frame { width: 100%; height: 100%; border: none; display: block; }

  /* VIDEO */
  .vn-video { max-width: 94%; max-height: 94%; border-radius: 10px; box-shadow: 0 8px 48px rgba(0,0,0,0.7); }

  /* AUDIO */
  .vn-audio-wrap { display: flex; flex-direction: column; align-items: center; gap: 20px; padding: 48px 32px; }
  .vn-audio-icon { font-size: 4.5rem; }
  .vn-audio-name { color: #9ca3af; font-size: 0.95rem; font-weight: 500; }
  .vn-audio { width: 100%; max-width: 440px; }

  /* TEXT */
  .vn-text-body {
    width: 100%; height: 100%; overflow-y: auto;
    padding: 28px 36px; box-sizing: border-box;
    color: #cbd5e1; font-size: 0.875rem; line-height: 1.8;
    white-space: pre-wrap; word-break: break-word;
    font-family: 'DM Mono', 'Fira Mono', 'Courier New', monospace;
  }
  .vn-text-body::-webkit-scrollbar { width: 4px; }
  .vn-text-body::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 4px; }

  /* NO PREVIEW */
  .vn-no-preview { text-align: center; padding: 56px 24px; }
  .vn-no-preview-icon { font-size: 4.5rem; margin-bottom: 16px; }
  .vn-no-preview-title { color: #6b7280; font-size: 1rem; margin-bottom: 6px; }
  .vn-no-preview-sub { color: #374151; font-size: 0.8rem; margin-bottom: 24px; }
`;

/* ─────────────────────────────────────────────
   Portal wrapper — renders children into <body>
   This ESCAPES any CSS stacking context in the app
───────────────────────────────────────────── */
const Portal = ({ children }) => {
  return createPortal(children, document.body);
};

/* ─────────────────────────────────────────────
   Lock body scroll hook
───────────────────────────────────────────── */
const useLockBodyScroll = () => {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);
};

/* ─────────────────────────────────────────────
   NOTE / LINK OVERLAY
───────────────────────────────────────────── */
const NoteOrLinkOverlay = ({ item, onClose }) => {
  const [copied, setCopied] = useState(false);
  useLockBodyScroll();

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const date = item.createdAt
    ? new Date(item.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
    : "";

  return (
    <Portal>
      <style>{GLOBAL_STYLES}</style>
      <div
        className="vn-overlay-backdrop"
        onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      >
        <div className="vn-note-card">
          {/* Header */}
          <div className="vn-header">
            <div className={`vn-type-icon ${typeWrapCls[item.type]}`}>{typeIconMap[item.type]}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="vn-title">{item.title || "Untitled"}</div>
              <div className="vn-meta">{date}</div>
            </div>
            <span className={`vn-chip vn-chip-${item.type}`}>{item.type}</span>
            {item.hasPassword && (
              <span className="vn-lock-badge">
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/>
                </svg>
                Unlocked
              </span>
            )}
            <button className="vn-icon-btn danger" onClick={onClose}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>

          {/* NOTE body */}
          {item.type === "note" && (
            <div className="vn-note-body">
              <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 8 }}>
                <button className={`vn-copy-btn ${copied ? "copied" : ""}`}
                  onClick={() => handleCopy(item.content || "")}>
                  {copied
                    ? <><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg> Copied</>
                    : <><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> Copy</>
                  }
                </button>
              </div>
              <div className="vn-note-content">
                {item.content || <span style={{ color: "#374151", fontStyle: "italic" }}>No content.</span>}
              </div>
            </div>
          )}

          {/* LINK body */}
          {item.type === "link" && (
            <div className="vn-link-card">
              <div className="vn-link-url-row">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0, marginTop: 2 }}>
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                </svg>
                <span>{item.content}</span>
              </div>
              {item.metadata?.description && (
                <div className="vn-link-desc">{item.metadata.description}</div>
              )}
              <div className="vn-link-actions">
                <a href={item.content} target="_blank" rel="noopener noreferrer" className="vn-btn-green">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                    <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                  </svg>
                  Open Link
                </a>
                <button className={`vn-copy-btn ${copied ? "copied" : ""}`}
                  onClick={() => handleCopy(item.content || "")}>
                  {copied
                    ? <><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg> Copied</>
                    : <><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> Copy URL</>
                  }
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Portal>
  );
};

/* ─────────────────────────────────────────────
   FILE VIEWER — portal + blurred overlay
───────────────────────────────────────────── */
const FileViewer = ({ item, onClose }) => {
  const [zoom, setZoom] = useState(1);
  const [textContent, setTextContent] = useState(null);
  useLockBodyScroll();

  const url      = item.content || item.metadata?.url || "";
  const mime     = item.metadata?.mimeType || "";
  const filename = item.metadata?.originalName || item.title || "File";
  const size     = formatBytes(item.metadata?.size);

  useEffect(() => {
    if (isText(mime) && url) {
      fetch(url)
        .then(r => r.text())
        .then(setTextContent)
        .catch(() => setTextContent("Could not load file content."));
    }
  }, [url, mime]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const fileTypeIcon = isImage(mime) ? "🖼️"
    : isPdf(mime)   ? "📄"
    : isVideo(mime) ? "🎬"
    : isAudio(mime) ? "🎵"
    : isText(mime)  ? "📃"
    : mime.includes("zip") || mime.includes("rar") ? "🗜️"
    : "📁";

  return (
    <Portal>
      <style>{GLOBAL_STYLES}</style>

      {/* Full-screen blurred backdrop — click outside card to close */}
      <div
        className="vn-overlay-backdrop"
        onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      >
        {/* Centered file card */}
        <div className="vn-file-card">

          {/* Top bar */}
          <div className="vn-header">
            <button className="vn-text-btn vn-btn-ghost" onClick={onClose}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
              </svg>
              Back
            </button>

            <div className={`vn-type-icon vn-type-file`}>{fileTypeIcon}</div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="vn-title">{filename}</div>
              <div className="vn-meta">{size}{size && mime ? " · " : ""}{mime}</div>
            </div>

            {item.hasPassword && (
              <span className="vn-lock-badge">
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/>
                </svg>
                Unlocked
              </span>
            )}

            {url && (
              <a href={url} download={filename} target="_blank" rel="noopener noreferrer"
                className="vn-text-btn vn-btn-pink">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Download
              </a>
            )}

            <button className="vn-icon-btn danger" onClick={onClose}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>

          {/* File content */}
          <div className="vn-file-viewer">

            {isImage(mime) && url && (
              <>
                <div className="vn-img-wrap">
                  <img src={url} alt={filename}
                    style={{ transform: `scale(${zoom})`, transformOrigin: "center" }} />
                </div>
                <div className="vn-zoom-bar">
                  <button className="vn-zoom-btn"
                    onClick={() => setZoom(z => Math.max(0.2, +(z - 0.25).toFixed(2)))}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/></svg>
                  </button>
                  <span className="vn-zoom-label">{Math.round(zoom * 100)}%</span>
                  <button className="vn-zoom-btn"
                    onClick={() => setZoom(z => Math.min(5, +(z + 0.25).toFixed(2)))}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                  </button>
                  <button className="vn-zoom-btn" onClick={() => setZoom(1)}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
                  </button>
                </div>
              </>
            )}

            {isPdf(mime) && url && (
              <iframe className="vn-pdf-frame"
                src={`${url}#toolbar=1&navpanes=0`} title={filename} />
            )}

            {isVideo(mime) && url && (
              <video className="vn-video" controls src={url}>
                Your browser does not support video playback.
              </video>
            )}

            {isAudio(mime) && url && (
              <div className="vn-audio-wrap">
                <div className="vn-audio-icon">🎵</div>
                <div className="vn-audio-name">{filename}</div>
                <audio className="vn-audio" controls src={url} />
              </div>
            )}

            {isText(mime) && (
              <div className="vn-text-body">
                {textContent === null
                  ? <span style={{ color: "#4b5563" }}>Loading…</span>
                  : textContent}
              </div>
            )}

            {!isImage(mime) && !isPdf(mime) && !isVideo(mime) && !isAudio(mime) && !isText(mime) && (
              <div className="vn-no-preview">
                <div className="vn-no-preview-icon">{fileTypeIcon}</div>
                <div className="vn-no-preview-title">Preview not available</div>
                <div className="vn-no-preview-sub">{mime || "Unknown file type"}</div>
                {url && (
                  <a href={url} download={filename} target="_blank" rel="noopener noreferrer"
                    className="vn-text-btn vn-btn-pink" style={{ display: "inline-flex" }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                      <polyline points="7 10 12 15 17 10"/>
                      <line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                    Download to view
                  </a>
                )}
              </div>
            )}

          </div>
        </div>
      </div>
    </Portal>
  );
};

/* ─────────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────────── */
const ItemDetailModal = ({ isOpen, onClose, item }) => {
  if (!isOpen || !item) return null;
  if (item.type === "file") return <FileViewer item={item} onClose={onClose} />;
  return <NoteOrLinkOverlay item={item} onClose={onClose} />;
};

export default ItemDetailModal;