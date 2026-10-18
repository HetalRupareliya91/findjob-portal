export default function ApplicationMobileCard({ item, onSelect }) {
  return (
    <button type="button" className="applications-mobile-card" onClick={() => onSelect && onSelect(item)}>
      <strong>{String(item.coverLetter ?? '-')}</strong>
      <small>{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : ''}</small>
    </button>
  );
}
