export default function FaqMobileCard({ item, onSelect }) {
  return (
    <button type="button" className="faqs-mobile-card" onClick={() => onSelect && onSelect(item)}>
      <strong>{String(item.question ?? '-')}</strong>
      <small>{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : ''}</small>
    </button>
  );
}
