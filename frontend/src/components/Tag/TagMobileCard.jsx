export default function TagMobileCard({ item, onSelect }) {
  return (
    <button type="button" className="tags-mobile-card" onClick={() => onSelect && onSelect(item)}>
      <strong>{String(item.name ?? '-')}</strong>
      <small>{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : ''}</small>
    </button>
  );
}
