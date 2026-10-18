export default function InterviewMobileCard({ item, onSelect }) {
  return (
    <button type="button" className="interviews-mobile-card" onClick={() => onSelect && onSelect(item)}>
      <strong>{String(item.scheduledAt ?? '-')}</strong>
      <small>{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : ''}</small>
    </button>
  );
}
