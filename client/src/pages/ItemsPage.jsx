import { useState, useEffect } from "react";
import { itemService } from "../services/itemService";
import ItemList from "../components/Items/ItemList";
import CreateItemModal from "../components/Items/CreateItemModal";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');

  .items-root { font-family: 'DM Sans', sans-serif; }

  .page-title {
    font-family: 'DM Serif Display', serif;
    font-size: 2rem;
    color: #f1f5f9;
    letter-spacing: -0.02em;
  }

  .divider { height: 1px; background: linear-gradient(90deg, rgba(251,191,36,0.3), transparent); margin: 8px 0 20px; }

  .new-btn {
    display: inline-flex; align-items: center; gap: 8px;
    background: linear-gradient(135deg, #f59e0b, #d97706);
    color: white; font-weight: 500;
    padding: 10px 20px; border-radius: 10px; border: none; cursor: pointer;
    font-family: 'DM Sans', sans-serif; font-size: 0.9rem;
    box-shadow: 0 4px 16px rgba(245,158,11,0.25);
    transition: all 0.25s;
  }
  .new-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(245,158,11,0.35); }
  .new-btn:active { transform: translateY(0); }

  .filter-row { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 24px; }

  .filter-pill {
    padding: 7px 18px; border-radius: 20px; border: 1px solid transparent;
    font-size: 0.82rem; font-weight: 500; cursor: pointer; transition: all 0.2s;
    font-family: 'DM Sans', sans-serif; letter-spacing: 0.02em;
  }
  .filter-pill.inactive {
    background: rgba(255,255,255,0.04);
    border-color: rgba(255,255,255,0.08);
    color: #9ca3af;
  }
  .filter-pill.inactive:hover { background: rgba(255,255,255,0.07); color: #e2e8f0; }
  .filter-pill.all.active    { background: rgba(251,191,36,0.15); border-color: rgba(251,191,36,0.35); color: #fbbf24; }
  .filter-pill.note.active   { background: rgba(129,140,248,0.15); border-color: rgba(129,140,248,0.35); color: #818cf8; }
  .filter-pill.link.active   { background: rgba(52,211,153,0.12); border-color: rgba(52,211,153,0.3); color: #34d399; }
  .filter-pill.file.active   { background: rgba(244,114,182,0.12); border-color: rgba(244,114,182,0.3); color: #f472b6; }

  .count-badge {
    display: inline-flex; align-items: center; justify-content: center;
    min-width: 20px; height: 18px; border-radius: 20px;
    font-size: 0.68rem; font-weight: 600; padding: 0 5px;
    background: rgba(255,255,255,0.08); color: #9ca3af; margin-left: 4px;
  }

  .search-wrap { position: relative; flex: 1; max-width: 320px; }
  .search-input {
    width: 100%;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 10px;
    padding: 9px 14px 9px 38px;
    color: #e2e8f0; font-size: 0.875rem;
    font-family: 'DM Sans', sans-serif;
    outline: none; transition: all 0.2s;
  }
  .search-input:focus { border-color: rgba(251,191,36,0.4); background: rgba(251,191,36,0.04); }
  .search-input::placeholder { color: #4b5563; }
  .search-icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: #4b5563; pointer-events: none; }

  .empty-state {
    text-align: center; padding: 64px 20px; color: #4b5563;
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(255,255,255,0.05);
    border-radius: 16px;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .fu { animation: fadeUp 0.5s ease forwards; }
  .fu1 { animation-delay: 0.05s; opacity: 0; }
  .fu2 { animation-delay: 0.15s; opacity: 0; }
  .fu3 { animation-delay: 0.25s; opacity: 0; }
`;

const filterMeta = [
  { key: "all",  label: "All",   icon: "🗂️" },
  { key: "note", label: "Notes", icon: "📝" },
  { key: "link", label: "Links", icon: "🔗" },
  { key: "file", label: "Files", icon: "📁" },
];

const ItemsPage = () => {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);

  const fetchItems = async () => {
    try {
      const { data } = await itemService.getItems();
      setItems(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const filtered = items
    .filter((i) => filter === "all" || i.type === filter)
    .filter((i) => !search || (i.title || "").toLowerCase().includes(search.toLowerCase()));

  const countFor = (key) => key === "all" ? items.length : items.filter(i => i.type === key).length;

  return (
    <div className="items-root">
      <style>{STYLES}</style>

      {/* Header row */}
      <div className="fu fu1 mb-6">
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
              <div style={{ width: 6, height: 28, background: "linear-gradient(180deg,#f59e0b,#d97706)", borderRadius: 3 }} />
              <h1 className="page-title">My Items</h1>
            </div>
            <div className="divider" style={{ marginLeft: 18 }} />
            <p style={{ color: "#6b7280", fontSize: "0.875rem", marginLeft: 18 }}>
              {items.length} item{items.length !== 1 ? "s" : ""} in your vault
            </p>
          </div>
          <button className="new-btn" style={{ marginTop: 4 }} onClick={() => setShowCreateModal(true)}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 5v14M5 12h14"/>
            </svg>
            New Item
          </button>
        </div>
      </div>

      {/* Filter + Search row */}
      <div className="fu fu2" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 24 }}>
        <div className="filter-row" style={{ margin: 0 }}>
          {filterMeta.map(({ key, label, icon }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`filter-pill ${key} ${filter === key ? "active" : "inactive"}`}
            >
              {icon} {label}
              <span className="count-badge">{countFor(key)}</span>
            </button>
          ))}
        </div>
        <div className="search-wrap">
          <svg className="search-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
          </svg>
          <input
            className="search-input"
            placeholder="Search items…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* List */}
      <div className="fu fu3">
        {filtered.length === 0 ? (
          <div className="empty-state">
            <div style={{ fontSize: "2.5rem", marginBottom: 12 }}>
              {search ? "🔍" : "🔒"}
            </div>
            <div style={{ color: "#6b7280", fontSize: "0.95rem" }}>
              {search ? `No results for "${search}"` : "No items yet"}
            </div>
            {!search && (
              <button className="new-btn" style={{ marginTop: 20 }} onClick={() => setShowCreateModal(true)}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 5v14M5 12h14"/>
                </svg>
                Add First Item
              </button>
            )}
          </div>
        ) : (
          <ItemList items={filtered} onDelete={fetchItems} />
        )}
      </div>

      {showCreateModal && (
        <CreateItemModal
          onClose={() => setShowCreateModal(false)}
          onItemCreated={() => { fetchItems(); setShowCreateModal(false); }}
        />
      )}
    </div>
  );
};

export default ItemsPage;