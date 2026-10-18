export default function EmployerMobileCard({ item, onSelect }) {
  return (
    <button type="button" className="employers-mobile-card" onClick={() => onSelect && onSelect(item)}>
      <strong>{String(item.fullName ?? '-')}</strong>
      <small>{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : ''}</small>
    </button>
  );
}
