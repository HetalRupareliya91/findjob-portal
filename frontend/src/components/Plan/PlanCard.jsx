const formatValue = (v) => {
  if (typeof v === 'boolean') return v ? 'Yes' : 'No';
  if (v === undefined || v === null || v === '') return '-';
  return String(v);
};

export default function PlanCard({ item, onSelect }) {
  return (
    <div className="plans-card" onClick={() => onSelect && onSelect(item)}>
      <h3>{formatValue(item.name)}</h3>
      <p><span>price:</span> {formatValue(item.price)}</p>
      <p><span>durationDays:</span> {formatValue(item.durationDays)}</p>
    </div>
  );
}
