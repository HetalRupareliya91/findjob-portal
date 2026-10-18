export default function JobMobileCard({ item, onSelect }) {
  return (
    <button type="button" className="jobs-mobile-card" onClick={() => onSelect && onSelect(item)}>
      <strong>{String(item.title ?? '-')}</strong>
      <small>{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : ''}</small>
    </button>
  );
}
