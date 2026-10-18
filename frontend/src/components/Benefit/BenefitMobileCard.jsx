export default function BenefitMobileCard({ item, onSelect }) {
  return (
    <button type="button" className="benefits-mobile-card" onClick={() => onSelect && onSelect(item)}>
      <strong>{String(item.title ?? '-')}</strong>
      <small>{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : ''}</small>
    </button>
  );
}
