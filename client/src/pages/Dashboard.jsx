import { useEffect, useState } from "react";
import { itemService } from "../services/itemService";
import toast from "react-hot-toast";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');

  .dash-root { font-family: 'DM Sans', sans-serif; }

  .grid-bg {
    background-image:
      linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
    background-size: 40px 40px;
  }

  .stat-card {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 16px;
    padding: 24px;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }
  .stat-card::before {
    content: '';
    position: absolute;
    inset: 0;
    opacity: 0;
    transition: opacity 0.3s;
    border-radius: 16px;
  }
  .stat-card:hover { transform: translateY(-3px); border-color: rgba(251,191,36,0.25); }
  .stat-card:hover::before { opacity: 1; }

  .stat-card.total::before  { background: radial-gradient(circle at top left, rgba(251,191,36,0.06), transparent 70%); }
  .stat-card.notes::before  { background: radial-gradient(circle at top left, rgba(129,140,248,0.08), transparent 70%); }
  .stat-card.links::before  { background: radial-gradient(circle at top left, rgba(52,211,153,0.08), transparent 70%); }
  .stat-card.files::before  { background: radial-gradient(circle at top left, rgba(244,114,182,0.08), transparent 70%); }

  .stat-num {
    font-family: 'DM Serif Display', serif;
    font-size: 3rem;
    line-height: 1;
  }

  .recent-card {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 16px;
    overflow: hidden;
  }

  .recent-row {
    border-bottom: 1px solid rgba(255,255,255,0.05);
    transition: background 0.2s;
    padding: 14px 20px;
    display: flex;
    align-items: center;
    gap: 14px;
    cursor: pointer;
  }
  .recent-row:last-child { border-bottom: none; }
  .recent-row:hover { background: rgba(251,191,36,0.04); }

  .type-badge {
    font-size: 0.68rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    padding: 3px 10px;
    border-radius: 20px;
    font-weight: 500;
  }
  .badge-note { background: rgba(129,140,248,0.15); color: #818cf8; }
  .badge-link { background: rgba(52,211,153,0.12); color: #34d399; }
  .badge-file { background: rgba(244,114,182,0.12); color: #f472b6; }

  .icon-wrap {
    width: 38px; height: 38px;
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    font-size: 1.1rem;
    flex-shrink: 0;
  }
  .icon-note { background: rgba(129,140,248,0.12); }
  .icon-link { background: rgba(52,211,153,0.1); }
  .icon-file { background: rgba(244,114,182,0.1); }

  .section-title {
    font-family: 'DM Serif Display', serif;
    font-size: 1.5rem;
    color: #f1f5f9;
  }

  .page-title {
    font-family: 'DM Serif Display', serif;
    font-size: 2rem;
    color: #f1f5f9;
    letter-spacing: -0.02em;
  }

  .divider { height: 1px; background: linear-gradient(90deg, rgba(251,191,36,0.3), transparent); margin: 8px 0 20px; }

  .empty-state {
    text-align: center;
    padding: 48px 20px;
    color: #4b5563;
    font-size: 0.9rem;
  }

  .lock-chip {
    display: inline-flex; align-items: center; gap: 4px;
    background: rgba(251,191,36,0.1); color: #fbbf24;
    border-radius: 20px; padding: 2px 9px; font-size: 0.7rem;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .fu { animation: fadeUp 0.5s ease forwards; }
  .fu1 { animation-delay: 0.05s; opacity: 0; }
  .fu2 { animation-delay: 0.15s; opacity: 0; }
  .fu3 { animation-delay: 0.25s; opacity: 0; }
  .fu4 { animation-delay: 0.35s; opacity: 0; }
`;

const typeIcon = { note: "📝", link: "🔗", file: "📁" };
const typeBadge = { note: "badge-note", link: "badge-link", file: "badge-file" };
const typeIconWrap = { note: "icon-note", link: "icon-link", file: "icon-file" };

const Dashboard = () => {
  const [stats, setStats] = useState({ total: 0, notes: 0, links: 0, files: 0 });
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await itemService.getItems();
        const notes = data.filter((i) => i.type === "note").length;
        const links = data.filter((i) => i.type === "link").length;
        const files = data.filter((i) => i.type === "file").length;
        setStats({ total: data.length, notes, links, files });
        setRecent(data.slice(0, 5));
      } catch (error) {
        toast.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const statCards = [
    { key: "total", label: "Total Items", value: stats.total, icon: "🗂️", color: "#fbbf24", cls: "total" },
    { key: "notes", label: "Notes",       value: stats.notes, icon: "📝", color: "#818cf8", cls: "notes" },
    { key: "links", label: "Links",       value: stats.links, icon: "🔗", color: "#34d399", cls: "links" },
    { key: "files", label: "Files",       value: stats.files, icon: "📁", color: "#f472b6", cls: "files" },
  ];

  return (
    <div className="dash-root">
      <style>{STYLES}</style>

      {/* Header */}
      <div className="fu fu1 mb-8">
        <div className="flex items-center gap-3 mb-1">
          <div style={{ width: 6, height: 28, background: "linear-gradient(180deg,#f59e0b,#d97706)", borderRadius: 3 }} />
          <h1 className="page-title">Dashboard</h1>
        </div>
        <div className="divider" style={{ marginLeft: 18 }} />
        <p style={{ color: "#6b7280", fontSize: "0.9rem", marginLeft: 18 }}>
          Overview of everything in your vault
        </p>
      </div>

      {/* Stat cards */}
      <div className="fu fu2" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16, marginBottom: 36 }}>
        {statCards.map((s) => (
          <div key={s.key} className={`stat-card ${s.cls}`}>
            <div style={{ fontSize: "1.6rem", marginBottom: 12 }}>{s.icon}</div>
            <div className="stat-num" style={{ color: s.color }}>{loading ? "—" : s.value}</div>
            <div style={{ color: "#9ca3af", fontSize: "0.8rem", marginTop: 6, letterSpacing: "0.04em", textTransform: "uppercase" }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Recent Items */}
      <div className="fu fu3">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <h2 className="section-title">Recent Items</h2>
          <a href="/items" style={{ fontSize: "0.8rem", color: "#fbbf24", textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}>
            View all
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>

        <div className="recent-card">
          {loading ? (
            <div className="empty-state">Loading your vault…</div>
          ) : recent.length === 0 ? (
            <div className="empty-state">
              <div style={{ fontSize: "2rem", marginBottom: 10 }}>🔒</div>
              Your vault is empty. Add your first item.
            </div>
          ) : (
            recent.map((item, i) => (
              <div key={item._id || i} className="recent-row">
                <div className={`icon-wrap ${typeIconWrap[item.type]}`}>
                  {typeIcon[item.type] || "📄"}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ color: "#e2e8f0", fontSize: "0.9rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {item.title || "Untitled"}
                  </div>
                  <div style={{ color: "#4b5563", fontSize: "0.75rem", marginTop: 2 }}>
                    {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : ""}
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                  <span className={`type-badge ${typeBadge[item.type]}`}>{item.type}</span>
                  {item.isLocked && (
                    <span className="lock-chip">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                      Locked
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;