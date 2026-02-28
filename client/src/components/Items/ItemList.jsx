import ItemCard from "./ItemCard";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500&display=swap');

  .item-list-root { font-family: 'DM Sans', sans-serif; }

  .item-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 14px;
  }

  .empty-list {
    text-align: center; padding: 56px 20px;
    background: rgba(255,255,255,0.02);
    border: 1px dashed rgba(255,255,255,0.07);
    border-radius: 16px;
  }
  .empty-icon { font-size: 2.5rem; margin-bottom: 12px; }
  .empty-text { color: #6b7280; font-size: 0.9rem; }
  .empty-sub  { color: #374151; font-size: 0.8rem; margin-top: 5px; }
`;

const ItemList = ({ items, onDelete, onEdit }) => {
  return (
    <div className="item-list-root">
      <style>{STYLES}</style>
      {items.length === 0 ? (
        <div className="empty-list">
          <div className="empty-icon">🔒</div>
          <div className="empty-text">No items found</div>
          <div className="empty-sub">Try a different filter or add your first item.</div>
        </div>
      ) : (
        <div className="item-grid">
          {items.map((item) => (
            <ItemCard key={item._id} item={item} onDelete={onDelete} onEdit={onEdit} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ItemList;