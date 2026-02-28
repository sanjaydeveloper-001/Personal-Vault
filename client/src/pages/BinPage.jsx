import { useState, useEffect } from "react";
import { itemService } from "../services/itemService.js";
import DeletedItemList from "../components/Bin/DeletedItemList";
import toast from "react-hot-toast";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');

  .bin-root { font-family: 'DM Sans', sans-serif; }

  .page-title {
    font-family: 'DM Serif Display', serif;
    font-size: 2rem;
    color: #f1f5f9;
    letter-spacing: -0.02em;
  }

  .divider { height: 1px; background: linear-gradient(90deg, rgba(239,68,68,0.4), transparent); margin: 8px 0 20px; }

  .bin-warning {
    background: rgba(239,68,68,0.07);
    border: 1px solid rgba(239,68,68,0.2);
    border-radius: 12px;
    padding: 14px 18px;
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 24px;
    color: #fca5a5;
    font-size: 0.875rem;
  }

  .bin-card {
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 16px;
    overflow: hidden;
  }

  .bin-header {
    background: rgba(239,68,68,0.05);
    border-bottom: 1px solid rgba(239,68,68,0.1);
    padding: 14px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.8rem;
    color: #6b7280;
  }

  .empty-state {
    text-align: center;
    padding: 64px 20px;
    color: #4b5563;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .fu { animation: fadeUp 0.5s ease forwards; }
  .fu1 { animation-delay: 0.05s; opacity: 0; }
  .fu2 { animation-delay: 0.18s; opacity: 0; }
  .fu3 { animation-delay: 0.3s; opacity: 0; }
`;

const BinPage = () => {
  const [deletedItems, setDeletedItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTrash = async () => {
    try {
      const { data } = await itemService.getTrashItems();
      setDeletedItems(data);
    } catch (error) {
      toast.error(error);
      // console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrash();
  }, []);

  return (
    <div className="bin-root">
      <style>{STYLES}</style>

      {/* Header */}
      <div className="fu fu1 mb-6">
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
          <div style={{ width: 6, height: 28, background: "linear-gradient(180deg,#ef4444,#b91c1c)", borderRadius: 3 }} />
          <h1 className="page-title">Trash</h1>
          {deletedItems.length > 0 && (
            <span style={{
              background: "rgba(239,68,68,0.15)", color: "#fca5a5",
              borderRadius: 20, padding: "3px 12px", fontSize: "0.8rem", marginLeft: 4
            }}>
              {deletedItems.length} item{deletedItems.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>
        <div className="divider" style={{ marginLeft: 18 }} />
        <p style={{ color: "#6b7280", fontSize: "0.875rem", marginLeft: 18 }}>
          Items here are soft-deleted. Restore or permanently remove them.
        </p>
      </div>

      {/* Warning bar */}
      <div className="fu fu2 bin-warning">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0, color: "#f87171" }}>
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
          <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
        </svg>
        Items in Trash are not counted toward your vault. Permanently deleted items cannot be recovered.
      </div>

      {/* Content */}
      <div className="fu fu3 bin-card">
        <div className="bin-header">
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
              <path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
            </svg>
            Deleted Items
          </span>
          <span>Swipe or use actions to restore / delete</span>
        </div>

        {loading ? (
          <div className="empty-state" style={{ color: "#4b5563" }}>Loading trash…</div>
        ) : deletedItems.length === 0 ? (
          <div className="empty-state">
            <div style={{ fontSize: "3rem", marginBottom: 12 }}>🗑️</div>
            <div style={{ color: "#6b7280", fontSize: "0.95rem" }}>Trash is empty</div>
            <div style={{ color: "#374151", fontSize: "0.8rem", marginTop: 6 }}>
              Deleted vault items will appear here
            </div>
          </div>
        ) : (
          <DeletedItemList items={deletedItems} onUpdate={fetchTrash} />
        )}
      </div>
    </div>
  );
};

export default BinPage;