export const fmtBytes = (b = 0) => {
  if (b === 0) return "0 B";
  if (b < 1024) return `${b} B`;
  if (b < 1_048_576) return `${(b / 1024).toFixed(1)} KB`;
  if (b < 1_073_741_824) return `${(b / 1_048_576).toFixed(2)} MB`;
  return `${(b / 1_073_741_824).toFixed(2)} GB`;
};

export const MAX_STORAGE_BYTES = 512 * 1024 * 1024;

export const EyeIcon = ({ open }) =>
  open ? (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  ) : (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );

export const SpinnerIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="s-spin">
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);

export const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

.s-page {
  font-family: 'DM Sans', sans-serif;
  padding: 0 0 80px;
  max-width: 100%;
  color: #e2e8f0;
}

/* ── Page header ── */
.s-eyebrow {
  display: inline-flex; align-items: center; gap: 6px;
  font-size: 0.67rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase;
  color: #fbbf24; background: rgba(251,191,36,0.08);
  border: 1px solid rgba(251,191,36,0.15);
  border-radius: 20px; padding: 4px 12px; margin-bottom: 12px;
}
.s-headline {
  font-family: 'DM Serif Display', serif;
  font-size: clamp(1.9rem, 4vw, 2.6rem);
  color: #f8fafc; letter-spacing: -0.03em; line-height: 1.06;
  margin-bottom: 6px;
}
.s-tagline { color: #4b5563; font-size: 0.875rem; margin-bottom: 36px; }

/* ── Layout ── */
.s-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}
.s-span2 { grid-column: 1 / -1; }
@media (max-width: 620px) {
  .s-grid { grid-template-columns: 1fr; }
  .s-span2 { grid-column: 1; }
}

/* ── Card ── */
.s-card {
  background: #080d1b;
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 20px; overflow: hidden;
  transition: border-color 0.22s, box-shadow 0.22s;
  
}
.s-card:hover { border-color: rgba(255,255,255,0.1); box-shadow: 0 8px 28px rgba(0,0,0,0.28); }
.s-card-danger { border-color: rgba(239,68,68,0.13); background: #0c0808; }
.s-card-danger:hover { border-color: rgba(239,68,68,0.22); }

/* Card header */
.s-ch {
  display: flex; align-items: center; gap: 12px;
  padding: 14px 18px;
  background: rgba(255,255,255,0.02);
  border-bottom: 1px solid rgba(255,255,255,0.055);
}
.s-card-danger .s-ch {
  background: rgba(239,68,68,0.035);
  border-bottom-color: rgba(239,68,68,0.09);
}
.s-chi {
  width: 34px; height: 34px; border-radius: 10px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
}
.chi-amber  { background: rgba(251,191,36,0.1);  border: 1px solid rgba(251,191,36,0.16); }
.chi-indigo { background: rgba(129,140,248,0.1); border: 1px solid rgba(129,140,248,0.16); }
.chi-sky    { background: rgba(56,189,248,0.1);  border: 1px solid rgba(56,189,248,0.16); }
.chi-red    { background: rgba(239,68,68,0.1);   border: 1px solid rgba(239,68,68,0.16); }
.chi-ghost  { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); }
.chi-green  { background: rgba(52,211,153,0.1);  border: 1px solid rgba(52,211,153,0.16); }

.s-ch-title { font-family: 'DM Serif Display', serif; font-size: 0.97rem; color: #f1f5f9; }
.s-ch-sub { color: #4b5563; font-size: 0.7rem; margin-top: 1px; }

/* Card body */
.s-cb { padding: 18px; }

/* ── Labels & inputs ── */
.s-lbl {
  display: block; font-size: 0.67rem; color: #6b7280;
  letter-spacing: 0.08em; text-transform: uppercase; font-weight: 600;
  margin-bottom: 6px;
}
.s-field { position: relative; margin-bottom: 13px; }
.s-field:last-child { margin-bottom: 0; }

.s-inp {
  width: 100%;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 10px; padding: 10px 14px;
  color: #f1f5f9; font-size: 0.875rem;
  font-family: 'DM Sans', sans-serif;
  outline: none; transition: all 0.2s;
}
.s-inp.pr { padding-right: 42px; }
.s-inp:focus {
  border-color: rgba(251,191,36,0.44);
  background: rgba(251,191,36,0.025);
  box-shadow: 0 0 0 3px rgba(251,191,36,0.055);
}
.s-inp.fi:focus {
  border-color: rgba(129,140,248,0.44);
  background: rgba(129,140,248,0.025);
  box-shadow: 0 0 0 3px rgba(129,140,248,0.055);
}
.s-inp.fr:focus {
  border-color: rgba(239,68,68,0.38);
  background: rgba(239,68,68,0.025);
  box-shadow: 0 0 0 3px rgba(239,68,68,0.055);
}
.s-inp::placeholder { color: #2d3748; }

.s-eye {
  position: absolute; right: 11px; top: 50%; transform: translateY(-50%);
  background: none; border: none; color: #4b5563; cursor: pointer;
  padding: 0; display: flex; align-items: center; transition: color 0.16s;
}
.s-eye:hover { color: #9ca3af; }

/* ── Buttons ── */
.s-btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 7px;
  border-radius: 10px; border: none; cursor: pointer;
  font-family: 'DM Sans', sans-serif; font-size: 0.875rem; font-weight: 600;
  transition: all 0.22s; color: #fff; padding: 10px 18px;
}
.s-btn-fw { width: 100%; }
.s-btn:disabled { opacity: 0.42; cursor: not-allowed; transform: none !important; filter: none !important; }
.s-btn:hover:not(:disabled) { transform: translateY(-1px); filter: brightness(1.08); }

.s-btn-amber  { background: linear-gradient(135deg,#f59e0b,#c97c08); box-shadow: 0 4px 14px rgba(245,158,11,0.2); }
.s-btn-indigo { background: linear-gradient(135deg,#818cf8,#5b5fef); box-shadow: 0 4px 14px rgba(129,140,248,0.22); }
.s-btn-red    { background: linear-gradient(135deg,#ef4444,#c91c1c); box-shadow: 0 4px 14px rgba(239,68,68,0.22); }
.s-btn-ghost {
  background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.09);
  color: #9ca3af; box-shadow: none;
}
.s-btn-ghost:hover:not(:disabled) { background: rgba(255,255,255,0.07); color: #e2e8f0; transform: none; }
.s-btn-trash {
  background: rgba(239,68,68,0.07); border: 1px solid rgba(239,68,68,0.2);
  color: #fca5a5; box-shadow: none;
}
.s-btn-trash:hover:not(:disabled) { background: rgba(239,68,68,0.14); border-color: rgba(239,68,68,0.36); transform: translateY(-1px); }

/* ── Avatar row ── */
.s-avatar-row {
  display: flex; align-items: center; gap: 13px;
  background: rgba(255,255,255,0.022); border: 1px solid rgba(255,255,255,0.055);
  border-radius: 12px; padding: 13px 15px; margin-bottom: 14px;
}
.s-avatar {
  width: 46px; height: 46px; border-radius: 50%; flex-shrink: 0;
  background: linear-gradient(135deg,#f59e0b,#b45309);
  display: flex; align-items: center; justify-content: center;
  font-family: 'DM Serif Display', serif; font-size: 1.25rem; color: #fff;
  box-shadow: 0 0 0 3px rgba(245,158,11,0.16);
}
.s-avatar-name { color: #f1f5f9; font-size: 0.92rem; font-weight: 600; }
.s-avatar-sub  { color: #4b5563; font-size: 0.72rem; margin-top: 1px; }
.s-active-pill {
  margin-left: auto; flex-shrink: 0;
  display: inline-flex; align-items: center; gap: 5px;
  background: rgba(34,197,94,0.07); border: 1px solid rgba(34,197,94,0.18);
  color: #4ade80; border-radius: 20px; padding: 3px 10px;
  font-size: 0.65rem; font-weight: 600; letter-spacing: 0.03em;
}
.s-active-dot { width: 5px; height: 5px; border-radius: 50%; background: #4ade80; }

/* ── Strength ── */
.s-strength-row { display: flex; gap: 4px; margin-top: 7px; }
.s-sbar { height: 3px; flex: 1; border-radius: 3px; transition: background 0.28s; }
.s-slbl { font-size: 0.67rem; margin-top: 3px; }

/* ── Password grid ── */
.s-pw-cols { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; margin-bottom: 14px; }
@media (max-width: 620px) { .s-pw-cols { grid-template-columns: 1fr; } }

/* ── Storage ── */
.s-sto-top { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 8px; }
.s-sto-pct { font-size: 0.77rem; font-weight: 600; }
.s-sto-of  { font-size: 0.72rem; color: #4b5563; }

.s-sto-track { height: 7px; border-radius: 7px; background: rgba(255,255,255,0.05); overflow: hidden; margin-bottom: 6px; }
.s-sto-bar { height: 100%; border-radius: 7px; transition: width 1s cubic-bezier(0.34,1.1,0.64,1); }
.sto-safe    { background: linear-gradient(90deg,#34d399,#059669); }
.sto-warning { background: linear-gradient(90deg,#f59e0b,#d97706); }
.sto-danger  { background: linear-gradient(90deg,#ef4444,#dc2626); }

.s-sto-msg { font-size: 0.71rem; margin-bottom: 14px; }

.s-sto-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; padding-top: 14px; border-top: 1px solid rgba(255,255,255,0.05); }
.s-sto-chip {
  display: flex; align-items: center; gap: 8px;
  background: rgba(255,255,255,0.022); border: 1px solid rgba(255,255,255,0.05);
  border-radius: 9px; padding: 9px 11px;
}
.s-sto-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }
.s-sto-lbl { font-size: 0.68rem; color: #6b7280; }
.s-sto-val { font-size: 0.79rem; color: #e2e8f0; font-weight: 500; margin-top: 1px; }

/* ── Trash stats ── */
.s-trash-row { display: flex; gap: 9px; margin-bottom: 13px; }
.s-trash-stat {
  flex: 1; background: rgba(239,68,68,0.04); border: 1px solid rgba(239,68,68,0.1);
  border-radius: 11px; padding: 11px; text-align: center;
}
.s-trash-v { font-family: 'DM Serif Display', serif; font-size: 1.4rem; color: #fca5a5; line-height: 1; }
.s-trash-l { font-size: 0.66rem; color: #6b7280; margin-top: 4px; text-transform: uppercase; letter-spacing: 0.04em; }

/* ── Session card ── */
.s-so-row { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; }
.s-so-user { color: #f1f5f9; font-size: 0.9rem; font-weight: 500; margin-bottom: 3px; }
.s-so-hint { color: #4b5563; font-size: 0.77rem; line-height: 1.5; }

/* ── Security info card ── */
.s-sec-item {
  display: flex; align-items: flex-start; gap: 10px;
  padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.04);
}
.s-sec-item:last-child { border-bottom: none; padding-bottom: 0; }
.s-sec-ico {
  width: 28px; height: 28px; border-radius: 8px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  background: rgba(52,211,153,0.07); border: 1px solid rgba(52,211,153,0.13);
}
.s-sec-label { font-size: 0.79rem; color: #9ca3af; }
.s-sec-val { font-size: 0.84rem; color: #e2e8f0; font-weight: 500; margin-top: 2px; }

/* ── Modal ── */
.s-backdrop {
  position: fixed; inset: 0; z-index: 9999;
  background: rgba(2,4,14,0.68);
  backdrop-filter: blur(22px); -webkit-backdrop-filter: blur(22px);
  display: flex; align-items: center; justify-content: center;
  padding: 24px; box-sizing: border-box;
  animation: sFadeIn 0.17s ease forwards;
}
@keyframes sFadeIn { from { opacity:0 } to { opacity:1 } }
.s-modal {
  background: #080c1a; border: 1px solid rgba(239,68,68,0.18);
  border-radius: 22px; width: 100%; max-width: 440px; overflow: hidden;
  box-shadow: 0 40px 100px rgba(0,0,0,0.75);
  animation: sUp 0.22s cubic-bezier(0.34,1.1,0.64,1) forwards;
}
@keyframes sUp {
  from { opacity:0; transform: scale(0.93) translateY(18px); }
  to   { opacity:1; transform: scale(1) translateY(0); }
}
.s-modal-hd {
  display: flex; align-items: center; gap: 12px;
  padding: 14px 16px;
  background: rgba(239,68,68,0.045);
  border-bottom: 1px solid rgba(239,68,68,0.11);
}
.s-modal-ico {
  width: 34px; height: 34px; border-radius: 10px; flex-shrink: 0;
  background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.18);
  display: flex; align-items: center; justify-content: center;
}
.s-modal-t { font-family: 'DM Serif Display', serif; font-size: 0.97rem; color: #f1f5f9; }
.s-modal-s { font-size: 0.69rem; color: #4b5563; margin-top: 1px; }
.s-modal-x {
  margin-left: auto; flex-shrink: 0;
  width: 26px; height: 26px; border-radius: 7px;
  border: 1px solid rgba(255,255,255,0.08); background: rgba(255,255,255,0.04);
  color: #6b7280; cursor: pointer;
  display: flex; align-items: center; justify-content: center; transition: all 0.16s;
}
.s-modal-x:hover { background: rgba(239,68,68,0.12); color: #f87171; border-color: rgba(239,68,68,0.22); }
.s-modal-bd { padding: 18px; }
.s-modal-warn {
  display: flex; gap: 10px; align-items: flex-start;
  background: rgba(239,68,68,0.055); border: 1px solid rgba(239,68,68,0.13);
  border-radius: 10px; padding: 12px; margin-bottom: 16px;
  font-size: 0.79rem; color: #fca5a5; line-height: 1.55;
}
.s-modal-acts { display: flex; gap: 8px; margin-top: 16px; }
.s-modal-cancel {
  flex: 1; padding: 10px; border-radius: 9px;
  border: 1px solid rgba(255,255,255,0.08); background: rgba(255,255,255,0.04);
  color: #9ca3af; font-family: 'DM Sans', sans-serif; font-size: 0.875rem; cursor: pointer; transition: all 0.18s;
}
.s-modal-cancel:hover { background: rgba(255,255,255,0.07); color: #e2e8f0; }

/* confirm phrase input */
.s-confirm-phrase {
  font-family: 'DM Sans', monospace;
  letter-spacing: 0.05em;
  font-size: 0.8rem;
  background: rgba(239,68,68,0.04);
  border: 1px dashed rgba(239,68,68,0.25);
  color: #f87171;
  border-radius: 8px;
  padding: 7px 12px;
  margin-bottom: 10px;
  text-align: center;
  font-weight: 600;
}

/* ── Spinner ── */
@keyframes sSpin { to { transform: rotate(360deg); } }
.s-spin { animation: sSpin 0.8s linear infinite; }

/* ── Staggered entrance ── */
@keyframes sEntrance {
  from { opacity:0; transform: translateY(18px); }
  to   { opacity:1; transform: translateY(0); }
}
.se { animation: sEntrance 0.52s ease forwards; opacity: 0; }
.se1 { animation-delay: 0s; }
.se2 { animation-delay: 0.08s; }
.se3 { animation-delay: 0.16s; }
.se4 { animation-delay: 0.24s; }
.se5 { animation-delay: 0.32s; }
.se6 { animation-delay: 0.40s; }

/* ── Mismatch ── */
.s-mismatch { color: #ef4444; font-size: 0.69rem; margin-top: 3px; }
`;