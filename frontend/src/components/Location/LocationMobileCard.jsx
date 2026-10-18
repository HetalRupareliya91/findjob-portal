export default function LocationMobileCard({ item, onSelect }) {
  return (
    <button type="button" className="locations-mobile-card" onClick={() => onSelect && onSelect(item)}>
      <strong>{String(item.city ?? '-')}</strong>
      <small>{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : ''}</small>
    </button>
  );
}
