import { useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import {
  FiHome, FiFileText, FiTrash2, FiSettings, FiUser, FiHelpCircle, FiLogOut, FiX,
} from "react-icons/fi";
import { LuFileBadge } from "react-icons/lu";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');

  /* ── Backdrop (mobile only) ── */
  .sidebar-backdrop {
    display: none;
    position: fixed; inset: 0; z-index: 149;
    background: rgba(5, 8, 18, 0.72);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    opacity: 0; transition: opacity 0.3s ease;
    pointer-events: none;
  }
  .sidebar-backdrop.visible {
    opacity: 1;
    pointer-events: all;
  }

  /* ── Sidebar ── */
  .sidebar {
    width: 220px; flex-shrink: 0;
    background: #0c1020;
    border-right: 1px solid rgba(255,255,255,0.06);
    display: flex; flex-direction: column;
    height: 100vh; padding: 24px 16px;
    font-family: 'DM Sans', sans-serif;
    position: relative; overflow: hidden;
    transition: transform 0.32s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 150;
  }

  /* Ambient blobs */
  .sidebar::before {
    content: ''; position: absolute; top: -80px; left: -60px;
    width: 280px; height: 280px; border-radius: 50%;
    background: radial-gradient(circle, rgba(251,191,36,0.055) 0%, transparent 70%);
    pointer-events: none;
  }
  .sidebar::after {
    content: ''; position: absolute; bottom: -80px; right: -60px;
    width: 200px; height: 200px; border-radius: 50%;
    background: radial-gradient(circle, rgba(99,102,241,0.055) 0%, transparent 70%);
    pointer-events: none;
  }

  /* ── Brand ── */
  .sidebar-brand {
    display: flex; align-items: center; gap: 10px;
    padding: 0 8px; margin-bottom: 32px;
    text-decoration: none; flex-shrink: 0;
  }
  .brand-icon {
    width: 32px; height: 32px; border-radius: 9px; flex-shrink: 0;
    background: linear-gradient(135deg, #f59e0b, #d97706);
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 3px 14px rgba(245,158,11,0.3);
  }
  .brand-name {
    font-family: 'DM Serif Display', serif;
    font-size: 1.15rem; color: #f1f5f9; letter-spacing: -0.01em;
  }

  /* Mobile close btn */
  .sidebar-close {
    display: none;
    position: absolute; top: 20px; right: 14px;
    width: 30px; height: 30px; border-radius: 9px;
    background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.09);
    color: #6b7280; cursor: pointer;
    align-items: center; justify-content: center; transition: all 0.18s;
  }
  .sidebar-close:hover { background: rgba(255,255,255,0.09); color: #e2e8f0; }

  /* ── Section label ── */
  .nav-section {
    font-size: 0.63rem; color: #374151;
    letter-spacing: 0.12em; text-transform: uppercase;
    padding: 0 8px; margin: 12px 0 5px;
    display: flex; align-items: center; gap: 8px;
  }
  .nav-section::after {
    content: ''; flex: 1; height: 1px;
    background: rgba(255,255,255,0.05);
  }

  /* ── Nav links ── */
  .nav-link {
    display: flex; align-items: center; gap: 10px;
    padding: 9px 12px; border-radius: 10px;
    text-decoration: none; color: #6b7280;
    font-size: 0.875rem; font-weight: 400;
    transition: all 0.18s; margin-bottom: 2px;
    position: relative; border: 1px solid transparent;
  }
  .nav-link:hover { background: rgba(255,255,255,0.05); color: #e2e8f0; }
  .nav-link.active {
    background: rgba(251,191,36,0.09); color: #fbbf24;
    border-color: rgba(251,191,36,0.16);
  }
  .nav-link.active .nav-dot { opacity: 1; }
  .nav-dot {
    position: absolute; right: 10px; top: 50%; transform: translateY(-50%);
    width: 5px; height: 5px; border-radius: 50%; background: #fbbf24;
    opacity: 0; transition: opacity 0.2s;
    box-shadow: 0 0 8px rgba(251,191,36,0.6);
  }
  .nav-icon { flex-shrink: 0; opacity: 0.65; transition: opacity 0.18s; }
  .nav-link.active .nav-icon,
  .nav-link:hover .nav-icon { opacity: 1; }

  /* ── Footer ── */
  .sidebar-footer {
    margin-top: auto; padding-top: 16px;
    border-top: 1px solid rgba(255,255,255,0.05); flex-shrink: 0;
  }
  .user-chip {
    display: flex; align-items: center; gap: 10px;
    padding: 10px 12px; border-radius: 10px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.06);
    margin-bottom: 8px; transition: border-color 0.2s;
  }
  .user-chip:hover { border-color: rgba(255,255,255,0.1); }
  .user-avatar {
    width: 30px; height: 30px; border-radius: 50%; flex-shrink: 0;
    background: linear-gradient(135deg, #f59e0b, #d97706);
    display: flex; align-items: center; justify-content: center;
    font-family: 'DM Serif Display', serif; font-size: 0.85rem; color: white;
    box-shadow: 0 2px 8px rgba(245,158,11,0.25);
  }
  .user-name {
    color: #e2e8f0; font-size: 0.82rem; font-weight: 500;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }
  .user-plan { display: flex; align-items: center; gap: 4px; color: #374151; font-size: 0.68rem; margin-top: 2px; }
  .status-dot { width: 5px; height: 5px; border-radius: 50%; background: #22c55e; box-shadow: 0 0 5px rgba(34,197,94,0.5); flex-shrink: 0; }

  .logout-btn {
    display: flex; align-items: center; gap: 10px;
    width: 100%; padding: 9px 12px; border-radius: 10px;
    border: 1px solid rgba(239,68,68,0.15);
    background: rgba(239,68,68,0.05); color: #f87171;
    font-family: 'DM Sans', sans-serif; font-size: 0.875rem; cursor: pointer;
    transition: all 0.18s;
  }
  .logout-btn:hover { background: rgba(239,68,68,0.13); border-color: rgba(239,68,68,0.3); transform: translateY(-1px); }

  /* ── MOBILE (<600px) ── */
  @media (max-width: 600px) {
    .sidebar-backdrop { display: block; }

    .sidebar {
      position: fixed;
      top: 0; left: 0; bottom: 0;
      width: 220px;
      transform: translateX(-100%);
      box-shadow: 12px 0 40px rgba(0,0,0,0.5);
      pointer-events: none;
      visibility: hidden;
    }

    .sidebar.open {
      transform: translateX(0);
      pointer-events: all;
      visibility: visible;
    }

    .sidebar-close { display: flex; }
  }
`;

const navItems = [
  { name: "Dashboard", path: "/dashboard", icon: FiHome },
  { name: "My Items",  path: "/items",     icon: FiFileText },
  { name: "Public Files",  path: "/public",     icon: LuFileBadge },
  { name: "Trash",     path: "/bin",       icon: FiTrash2 },
];
const accountItems = [
  { name: "Profile",   path: "/profile",   icon: FiUser },
  { name: "Settings",  path: "/settings",  icon: FiSettings },
  { name: "Help",      path: "/help",      icon: FiHelpCircle },
];

const Sidebar = ({ isOpen, onClose }) => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Close on route change on mobile
  useEffect(() => { onClose?.(); }, [location.pathname]);

  // Lock body scroll when sidebar open on mobile
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const initial = user?.username?.charAt(0).toUpperCase() || "?";

  return (
    <>
      <style>{STYLES}</style>

      {/* Backdrop */}
      <div
        className={`sidebar-backdrop ${isOpen ? "visible" : ""}`}
        onClick={onClose}
      />

      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        {/* Mobile close */}
        <button className="sidebar-close" onClick={onClose} aria-label="Close menu">
          <FiX size={14} />
        </button>

        {/* Brand */}
        <NavLink to="/dashboard" className="sidebar-brand">
          <div className="brand-icon">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <rect x="3" y="11" width="18" height="11" rx="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </div>
          <span className="brand-name">VaultNotes</span>
        </NavLink>

        {/* Main nav */}
        <div className="nav-section">Vault</div>
        <nav style={{ flex: 1 }}>
          {navItems.map(({ name, path, icon: Icon }) => (
            <NavLink key={path} to={path}
              className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            >
              <Icon size={15} className="nav-icon" />
              <span style={{ flex: 1 }}>{name}</span>
              <span className="nav-dot" />
            </NavLink>
          ))}

          <div className="nav-section" style={{ marginTop: 14 }}>Account</div>
          {accountItems.map(({ name, path, icon: Icon }) => (
            <NavLink key={path} to={path}
              className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            >
              <Icon size={15} className="nav-icon" />
              <span style={{ flex: 1 }}>{name}</span>
              <span className="nav-dot" />
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="sidebar-footer">
          <div className="user-chip">
            <div className="user-avatar">{initial}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="user-name">{user?.username || "User"}</div>
              <div className="user-plan">
                <span className="status-dot" /> Free vault
              </div>
            </div>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            <FiLogOut size={14} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;