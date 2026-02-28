import { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Sidebar from "./Sidebar";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap');

  /* ── Loading screen ── */
  .layout-loading {
    display: flex; align-items: center; justify-content: center;
    height: 100vh; background: #0a0e1a;
    font-family: 'DM Sans', sans-serif;
    flex-direction: column; gap: 16px;
  }
  .loading-logo {
    width: 48px; height: 48px; border-radius: 14px;
    background: linear-gradient(135deg, #f59e0b, #d97706);
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 0 30px rgba(245,158,11,0.25);
  }
  .loading-text { color: #4b5563; font-size: 0.875rem; }
  @keyframes pulse { 0%,100% { opacity: 0.35; transform: scale(0.97); } 50% { opacity: 1; transform: scale(1); } }
  .pulse { animation: pulse 1.6s ease-in-out infinite; }

  /* ── Root layout ── */
  .layout-root { display: flex; height: 100vh; background: #0a0e1a; overflow: hidden; }

  /* ── Main content area ── */
  .layout-main {
    flex: 1;
    min-width: 0;
    overflow-y: auto; padding: 36px 40px;
    background: #0a0e1a;
    background-image:
      linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px);
    background-size: 40px 40px;
    position: relative;
  }

  /* ── Mobile top bar ── */
  .mobile-topbar {
    display: none;
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    height: 56px;
    background: rgba(10, 14, 26, 0.92);
    border-bottom: 1px solid rgba(255,255,255,0.07);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    align-items: center; justify-content: space-between;
    padding: 0 16px;
    font-family: 'DM Sans', sans-serif;
  }

  .topbar-brand {
    display: flex; align-items: center; gap: 9px; text-decoration: none;
  }
  .topbar-brand-icon {
    width: 28px; height: 28px; border-radius: 8px; flex-shrink: 0;
    background: linear-gradient(135deg, #f59e0b, #d97706);
    display: flex; align-items: center; justify-content: center;
  }
  .topbar-brand-name {
    font-family: 'DM Serif Display', serif;
    font-size: 1rem; color: #f1f5f9;
  }

  .hamburger-btn {
    width: 38px; height: 38px; border-radius: 10px;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.09);
    color: #e2e8f0; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: all 0.2s;
  }
  .hamburger-btn:hover {
    background: rgba(251,191,36,0.1);
    border-color: rgba(251,191,36,0.28);
    color: #fbbf24;
  }
  .hamburger-btn.is-open {
    background: rgba(251,191,36,0.12);
    border-color: rgba(251,191,36,0.3);
    color: #fbbf24;
  }

  /* ── Responsive ── */
  @media (max-width: 600px) {
    .mobile-topbar { display: flex; }
    .layout-main { padding: 76px 18px 24px; }

    /*
      ✅ FIX: Only zero out the sidebar's flex space when it is CLOSED.
      When .open is present, the sidebar is position:fixed at 220px wide
      and should not be collapsed.
    */
    .layout-root > aside.sidebar:not(.open) {
      width: 0 !important;
      flex: none !important;
      padding: 0 !important;
      border: none !important;
    }
  }

  @media (min-width: 601px) and (max-width: 900px) {
    .layout-main { padding: 28px 28px; }
  }
`;

const ProtectedLayout = () => {
  const { user, loading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (loading) {
    return (
      <div className="layout-loading">
        <style>{STYLES}</style>
        <div className="loading-logo pulse">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
            <rect x="3" y="11" width="18" height="11" rx="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
        </div>
        <div className="loading-text">Loading your vault…</div>
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="layout-root">
      <style>{STYLES}</style>

      {/* Mobile top bar */}
      <div className="mobile-topbar">
        <a href="/dashboard" className="topbar-brand">
          <div className="topbar-brand-icon">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <rect x="3" y="11" width="18" height="11" rx="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </div>
          <span className="topbar-brand-name">VaultNotes</span>
        </a>

        <button
          className={`hamburger-btn ${sidebarOpen ? "is-open" : ""}`}
          onClick={() => setSidebarOpen(o => !o)}
          aria-label="Toggle menu"
        >
          {sidebarOpen ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="3" y1="6"  x2="21" y2="6"/>
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          )}
        </button>
      </div>

      {/* Sidebar (desktop: always visible, mobile: slide-in) */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main content */}
      <main className="layout-main">
        <Outlet />
      </main>
    </div>
  );
};

export default ProtectedLayout;