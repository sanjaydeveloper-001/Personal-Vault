import DeletedItemCard from "./DeletedItemCard";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500&display=swap');

  .dil-root { font-family: 'DM Sans', sans-serif; }

  .dil-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 14px;
  }

  .dil-empty {
    text-align: center;
    padding: 64px 20px;
    background: rgba(255,255,255,0.02);
    border: 1px dashed rgba(255,255,255,0.07);
    border-radius: 16px;
  }
  .dil-empty-icon { font-size: 2.8rem; margin-bottom: 14px; }
  .dil-empty-text { color: #6b7280; font-size: 0.9rem; font-weight: 500; }
  .dil-empty-sub  { color: #374151; font-size: 0.8rem; margin-top: 5px; }
`;

const DeletedItemList = ({ items, onUpdate }) => {
  return (
    <div className="dil-root">
      <style>{STYLES}</style>

      {items.length === 0 ? (
        <div className="dil-empty">
          <div className="dil-empty-icon">🗑️</div>
          <div className="dil-empty-text">Trash is empty</div>
          <div className="dil-empty-sub">Deleted items will appear here.</div>
        </div>
      ) : (
        <div className="dil-grid">
          {items.map((item) => (
            <DeletedItemCard key={item._id} item={item} onUpdate={onUpdate} />
          ))}
        </div>
      )}
    </div>
  );
};

export default DeletedItemList;