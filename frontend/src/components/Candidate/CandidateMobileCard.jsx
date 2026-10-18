export default function CandidateMobileCard({ item, onSelect }) {
  return (
    <button type="button" className="candidates-mobile-card" onClick={() => onSelect && onSelect(item)}>
      <strong>{String(item.fullName ?? '-')}</strong>
      <small>{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : ''}</small>
    </button>
  );
}
