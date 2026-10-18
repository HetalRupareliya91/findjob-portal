const formatValue = (v) => {
  if (typeof v === 'boolean') return v ? 'Yes' : 'No';
  if (v === undefined || v === null || v === '') return '-';
  return String(v);
};

export default function PaymentCard({ item, onSelect }) {
  return (
    <div className="payments-card" onClick={() => onSelect && onSelect(item)}>
      <h3>{formatValue(item.amount)}</h3>
      <p><span>currency:</span> {formatValue(item.currency)}</p>
      <p><span>status:</span> {formatValue(item.status)}</p>
    </div>
  );
}
