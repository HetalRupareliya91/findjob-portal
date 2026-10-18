export default function PaymentMobileCard({ item, onSelect }) {
  return (
    <button type="button" className="payments-mobile-card" onClick={() => onSelect && onSelect(item)}>
      <strong>{String(item.amount ?? '-')}</strong>
      <small>{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : ''}</small>
    </button>
  );
}
