export default function ExperienceMobileCard({ item, onSelect }) {
  return (
    <button type="button" className="experiences-mobile-card" onClick={() => onSelect && onSelect(item)}>
      <strong>{String(item.companyName ?? '-')}</strong>
      <small>{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : ''}</small>
    </button>
  );
}
