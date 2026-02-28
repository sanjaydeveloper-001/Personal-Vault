import { useState, useEffect } from 'react';
import { resumeService } from '../services/resumeService';
import {
  FiUpload, FiTrash2, FiFile, FiCopy, FiCheck,
  FiImage, FiFileText, FiRefreshCw, FiLink,
} from 'react-icons/fi';
import toast from 'react-hot-toast';
const PUBLIC_API_URL = import.meta.env.VITE_PUBLIC_API_URL;
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');

  .pf-root { font-family: 'DM Sans', sans-serif; }

  .page-title {
    font-family: 'DM Serif Display', serif;
    font-size: 2rem; color: #f1f5f9; letter-spacing: -0.02em;
  }
  .divider {
    height: 1px;
    background: linear-gradient(90deg, rgba(251,191,36,0.3), transparent);
    margin: 8px 0 20px;
  }

  /* ── Grid ── */
  .pf-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }
  @media (max-width: 900px) { .pf-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 560px) { .pf-grid { grid-template-columns: 1fr; } }

  /* ── Card ── */
  .pf-card {
    background: #0c1020;
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 16px;
    padding: 24px;
    display: flex; flex-direction: column; gap: 16px;
    position: relative; overflow: hidden;
    transition: border-color 0.25s, box-shadow 0.25s;
    min-height: 220px;
  }
  .pf-card:hover { border-color: rgba(251,191,36,0.2); box-shadow: 0 8px 32px rgba(0,0,0,0.35); }
  .pf-card::before {
    content: ''; position: absolute; top: -60px; right: -60px;
    width: 160px; height: 160px; border-radius: 50%;
    background: radial-gradient(circle, rgba(251,191,36,0.05) 0%, transparent 70%);
    pointer-events: none;
  }

  /* ── Slot badge ── */
  .slot-badge {
    display: inline-flex; align-items: center; gap: 6px;
    font-size: 0.7rem; font-weight: 600; letter-spacing: 0.1em;
    text-transform: uppercase; color: #6b7280;
  }
  .slot-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: rgba(255,255,255,0.12);
  }
  .slot-dot.filled { background: #22c55e; box-shadow: 0 0 6px rgba(34,197,94,0.5); }
  .active-pill {
    margin-left: 4px; font-size: 0.62rem; color: #22c55e;
    background: rgba(34,197,94,0.1); border: 1px solid rgba(34,197,94,0.2);
    border-radius: 20px; padding: 1px 7px;
  }

  /* ── Empty slot ── */
  .empty-slot {
    flex: 1;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: 10px; padding: 32px 16px;
    border: 1.5px dashed rgba(255,255,255,0.08); border-radius: 12px;
    text-align: center; cursor: pointer; transition: all 0.2s;
  }
  .empty-slot:hover { border-color: rgba(251,191,36,0.35); background: rgba(251,191,36,0.03); }
  .empty-slot-icon {
    width: 48px; height: 48px; border-radius: 14px;
    background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07);
    display: flex; align-items: center; justify-content: center;
    color: #4b5563; transition: all 0.2s;
  }
  .empty-slot:hover .empty-slot-icon {
    background: rgba(251,191,36,0.08); border-color: rgba(251,191,36,0.25); color: #fbbf24;
  }
  .empty-label { color: #9ca3af; font-size: 0.875rem; font-weight: 500; }
  .empty-hint  { color: #374151; font-size: 0.72rem; }

  /* ── File info block ── */
  .file-info-block {
    display: flex; align-items: center; gap: 12px;
    background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06);
    border-radius: 10px; padding: 12px;
  }
  .file-icon-wrap {
    width: 40px; height: 40px; border-radius: 10px; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
  }
  .file-icon-wrap.pdf { background: rgba(239,68,68,0.1);    border: 1px solid rgba(239,68,68,0.2);   color: #f87171; }
  .file-icon-wrap.img { background: rgba(52,211,153,0.1);   border: 1px solid rgba(52,211,153,0.2);  color: #34d399; }
  .file-icon-wrap.doc { background: rgba(129,140,248,0.12); border: 1px solid rgba(129,140,248,0.2); color: #818cf8; }
  .file-name { color: #e2e8f0; font-size: 0.85rem; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .file-meta { color: #4b5563; font-size: 0.72rem; margin-top: 2px; }
  .type-tag {
    display: inline-flex; align-items: center; font-size: 0.6rem; font-weight: 700;
    letter-spacing: 0.08em; text-transform: uppercase;
    padding: 2px 8px; border-radius: 20px; margin-left: auto; flex-shrink: 0;
  }
  .type-tag.pdf { background: rgba(239,68,68,0.1);    border: 1px solid rgba(239,68,68,0.2);   color: #f87171; }
  .type-tag.img { background: rgba(52,211,153,0.1);   border: 1px solid rgba(52,211,153,0.2);  color: #34d399; }
  .type-tag.doc { background: rgba(129,140,248,0.1);  border: 1px solid rgba(129,140,248,0.2); color: #818cf8; }

  /* ── Public link box ── */
  .link-box {
    background: rgba(52,211,153,0.04); border: 1px solid rgba(52,211,153,0.15);
    border-radius: 10px; padding: 10px 12px;
  }
  .link-label {
    font-size: 0.67rem; color: #34d399; letter-spacing: 0.09em;
    text-transform: uppercase; font-weight: 600; margin-bottom: 6px;
    display: flex; align-items: center; gap: 5px;
  }
  .link-row  { display: flex; align-items: center; gap: 8px; }
  .link-url  { flex: 1; font-size: 0.72rem; color: #6b7280; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .copy-btn  {
    flex-shrink: 0; width: 28px; height: 28px; border-radius: 7px;
    background: rgba(52,211,153,0.1); border: 1px solid rgba(52,211,153,0.2);
    color: #34d399; cursor: pointer;
    display: flex; align-items: center; justify-content: center; transition: all 0.18s;
  }
  .copy-btn:hover  { background: rgba(52,211,153,0.2); }
  .copy-btn.copied { background: rgba(34,197,94,0.15); border-color: rgba(34,197,94,0.3); color: #22c55e; }

  /* ── Action buttons ── */
  .action-row { display: flex; flex-direction: column; gap: 8px; }
  .btn {
    display: flex; align-items: center; justify-content: center; gap: 8px;
    padding: 9px 16px; border-radius: 10px; border: 1px solid transparent;
    font-family: 'DM Sans', sans-serif; font-size: 0.825rem; font-weight: 500;
    cursor: pointer; transition: all 0.18s; width: 100%;
  }
  .btn:disabled { opacity: 0.45; cursor: not-allowed; }
  .btn-replace { background: rgba(99,102,241,0.1);  border-color: rgba(99,102,241,0.2);  color: #818cf8; }
  .btn-replace:hover:not(:disabled) { background: rgba(99,102,241,0.18); border-color: rgba(99,102,241,0.38); transform: translateY(-1px); }
  .btn-delete  { background: rgba(239,68,68,0.06);  border-color: rgba(239,68,68,0.14);  color: #f87171; }
  .btn-delete:hover:not(:disabled)  { background: rgba(239,68,68,0.13);  border-color: rgba(239,68,68,0.28);  transform: translateY(-1px); }

  /* ── Uploading bar ── */
  .uploading-bar {
    flex: 1;
    display: flex; align-items: center; justify-content: center; gap: 8px;
    padding: 10px 12px; border-radius: 9px;
    background: rgba(251,191,36,0.07); border: 1px solid rgba(251,191,36,0.15);
    font-size: 0.8rem; color: #fbbf24;
  }
  @keyframes spin { to { transform: rotate(360deg); } }
  .spin { animation: spin 0.8s linear infinite; }

  /* ── Slot usage bar ── */
  .usage-bar-wrap {
    display: flex; align-items: center; gap: 8px;
    background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07);
    border-radius: 12px; padding: 10px 16px;
  }
  .usage-seg        { width: 28px; height: 6px; border-radius: 3px; transition: all 0.35s; }
  .usage-seg.filled { background: #22c55e; box-shadow: 0 0 6px rgba(34,197,94,0.4); }
  .usage-seg.empty  { background: rgba(255,255,255,0.08); }

  /* ── Animations ── */
  @keyframes fadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
  .fu  { animation: fadeUp 0.5s ease forwards; }
  .fu1 { animation-delay: 0.05s; opacity: 0; }
  .fu2 { animation-delay: 0.15s; opacity: 0; }
  .fu3 { animation-delay: 0.25s; opacity: 0; }
  .fu4 { animation-delay: 0.32s; opacity: 0; }
`;

/* ── Helpers ── */
const fileIconInfo = (file) => {
  if (!file) return { Icon: FiFile, cls: 'doc', tag: 'FILE' };
  const mime = (file.mimeType || '').toLowerCase();
  const name = (file.originalName || '').toLowerCase();
  if (mime.includes('pdf') || name.endsWith('.pdf'))
    return { Icon: FiFileText, cls: 'pdf', tag: 'PDF' };
  if (mime.startsWith('image/') || /\.(jpg|jpeg|png|gif|webp|svg)$/.test(name))
    return { Icon: FiImage, cls: 'img', tag: 'IMAGE' };
  return { Icon: FiFile, cls: 'doc', tag: (name.split('.').pop() || 'FILE').toUpperCase() };
};

const formatSize = (bytes) => {
  if (!bytes) return '';
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
};

/* ─────────────────────────────────────────────
   Component
───────────────────────────────────────────── */
const PublicFilesPage = () => {
  const [resumes, setResumes]     = useState([]);
  const [uploading, setUploading] = useState({});
  const [copied, setCopied]       = useState({});
  

  useEffect(() => { fetchResumes(); }, []);

  const fetchResumes = async () => {
    try {
      const { data } = await resumeService.getResumes();
      setResumes(data);
    } catch { toast.error('Failed to load files'); }
  };

  // Direct upload to backend — no Cloudinary
  const handleFileUpload = async (position, file) => {
    setUploading(p => ({ ...p, [position]: true }));
    try {
      const formData = new FormData();
      formData.append('position', position);
      formData.append('resume', file); // field name must match multer config on backend

      await resumeService.uploadResume(formData);
      toast.success('File uploaded!');
      fetchResumes();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Upload failed');
    } finally {
      setUploading(p => ({ ...p, [position]: false }));
    }
  };

  const handleDelete = async (position) => {
    if (!confirm('Remove this file? The slot will become empty again.')) return;
    try {
      await resumeService.deleteResume(position);
      toast.success('File removed');
      fetchResumes();
    } catch { toast.error('Delete failed'); }
  };

  const handleGenerateLink = async (position) => {
    try {
      const { data } = await resumeService.generateLink(position);
      navigator.clipboard.writeText(data.publicUrl);
      toast.success('Public link copied to clipboard!');
      fetchResumes(); // refresh to show new token
    } catch { toast.error('Failed to generate link'); }
  };

  const handleCopy = (position, token) => {
    // publicUrl comes directly from the backend response stored in resume.publicToken
    // We reconstruct it the same way the backend builds it
    const url = `${PUBLIC_API_URL}${token}`;
    navigator.clipboard.writeText(url);
    setCopied(p => ({ ...p, [position]: true }));
    toast.success('Link copied!');
    setTimeout(() => setCopied(p => ({ ...p, [position]: false })), 2000);
  };

  const filledCount = resumes.filter(r => r.file).length;

  return (
    <div className="pf-root">
      <style>{STYLES}</style>

      {/* ── Header ── */}
      <div className="fu fu1 mb-6">
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
              <div style={{ width: 6, height: 28, background: 'linear-gradient(180deg,#f59e0b,#d97706)', borderRadius: 3 }} />
              <h1 className="page-title">Public Files</h1>
            </div>
            <div className="divider" style={{ marginLeft: 18 }} />
            <p style={{ color: '#6b7280', fontSize: '0.875rem', marginLeft: 18 }}>
              upload any file to get a shareable public link
            </p>
          </div>

          {/* Slot usage bar */}
          <div className="usage-bar-wrap fu fu2">
            {[1, 2, 3].map(n => {
              const filled = !!resumes.find(r => r.position === n)?.file?.originalName;
              return <div key={n} className={`usage-seg ${filled ? 'filled' : 'empty'}`} />;
            })}
            <span style={{ color: '#4b5563', fontSize: '0.75rem', marginLeft: 4 }}>{filledCount}/3</span>
          </div>
        </div>
      </div>

      {/* ── 3 Slot cards — always rendered ── */}
      <div className="pf-grid fu fu3">
        {[1, 2, 3].map(position => {
          const resume  = resumes.find(r => r.position === position) || { position, file: null, publicToken: null };
          const hasFile = !!resume.file;
          const { Icon, cls, tag } = fileIconInfo(resume.file);

          return (
            <div key={position} className="pf-card">

              {/* Slot badge */}
              <div className="slot-badge">
                <span className={`slot-dot ${hasFile ? 'filled' : ''}`} />
                Slot {position}
                {resume?.file?.originalName && <span className="active-pill">Active</span>}
              </div>

              {/* ── UPLOADING ── */}
              {uploading[position] ? (
                <div className="uploading-bar">
                  <FiRefreshCw size={13} className="spin" /> Uploading…
                </div>

              /* ── EMPTY — no file yet ── */
              ) : !resume?.file?.originalName ? (
                <>
                  <div
                    className="empty-slot"
                    onClick={() => document.getElementById(`file-empty-${position}`)?.click()}
                  >
                    <div className="empty-slot-icon">
                      <FiUpload size={18} />
                    </div>
                    <div className="empty-label">Upload File</div>
                    <div className="empty-hint">PDF, image, doc, ZIP and more</div>
                  </div>
                  <input
                    id={`file-empty-${position}`}
                    type="file"
                    accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif,.webp,.svg,.xls,.xlsx,.ppt,.pptx,.zip"
                    style={{ display: 'none' }}
                    onChange={e => { if (e.target.files[0]) handleFileUpload(position, e.target.files[0]); }}
                  />
                </>

              /* ── FILLED — file exists ── */
              ) : (
                <>
                  {/* File info */}
                  <div className="file-info-block">
                    <div className={`file-icon-wrap ${cls}`}><Icon size={16} /></div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div className="file-name">{resume.file.originalName}</div>
                      <div className="file-meta">{formatSize(resume.file.size)}</div>
                    </div>
                    <span className={`type-tag ${cls}`}>{tag}</span>
                  </div>

                  {/* Public link — only when token exists */}
                  {resume.publicToken ? (
                    <div className="link-box">
                      <div className="link-label">
                        <FiLink size={10} /> Public Link
                      </div>
                      <div className="link-row">
                        <span className="link-url">
                          {PUBLIC_API_URL}{resume.publicToken}
                        </span>
                        <button
                          className={`copy-btn ${copied[position] ? 'copied' : ''}`}
                          onClick={() => handleCopy(position, resume.publicToken)}
                          title="Copy link"
                        >
                          {copied[position] ? <FiCheck size={12} /> : <FiCopy size={12} />}
                        </button>
                      </div>
                    </div>
                  ) : null}

                  {/* Actions */}
                  <div className="action-row">
                    {/* Replace */}
                    <button
                      className="btn btn-replace"
                      onClick={() => document.getElementById(`file-replace-${position}`)?.click()}
                    >
                      <FiUpload size={13} /> Replace File
                    </button>
                    <input
                      id={`file-replace-${position}`}
                      type="file"
                      accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif,.webp,.svg,.xls,.xlsx,.ppt,.pptx,.zip"
                      style={{ display: 'none' }}
                      onChange={e => { if (e.target.files[0]) handleFileUpload(position, e.target.files[0]); }}
                    />

                    {/* Delete */}
                    <button className="btn btn-delete" onClick={() => handleDelete(position)}>
                      <FiTrash2 size={13} /> Remove File
                    </button>
                  </div>
                </>
              )}

            </div>
          );
        })}
      </div>

      {/* ── Footer note ── */}
      <div className="fu fu4" style={{ marginTop: 28, padding: '14px 18px', borderRadius: 12, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
        <p style={{ color: '#374151', fontSize: '0.78rem', margin: 0 }}>
          💡 Upload any file — PDF, image, document, spreadsheet and more. Generate a public link for any filled slot and share it with anyone. Regenerating a link invalidates the old one.
        </p>
      </div>
    </div>
  );
};

export default PublicFilesPage;