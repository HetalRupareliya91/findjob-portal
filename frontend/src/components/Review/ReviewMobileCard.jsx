export default function ReviewMobileCard({ item, onSelect }) {
  return (
    <button type="button" className="reviews-mobile-card" onClick={() => onSelect && onSelect(item)}>
      <strong>{String(item.rating ?? '-')}</strong>
      <small>{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : ''}</small>
    </button>
  );
}
