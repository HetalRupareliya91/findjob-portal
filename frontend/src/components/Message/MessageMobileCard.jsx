export default function MessageMobileCard({ item, onSelect }) {
  return (
    <button type="button" className="messages-mobile-card" onClick={() => onSelect && onSelect(item)}>
      <strong>{String(item.subject ?? '-')}</strong>
      <small>{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : ''}</small>
    </button>
  );
}
