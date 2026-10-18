const formatValue = (v) => {
  if (typeof v === 'boolean') return v ? 'Yes' : 'No';
  if (v === undefined || v === null || v === '') return '-';
  return String(v);
};

export default function LocationCard({ item, onSelect }) {
  return (
    <div className="locations-card" onClick={() => onSelect && onSelect(item)}>
      <h3>{formatValue(item.city)}</h3>
      <p><span>state:</span> {formatValue(item.state)}</p>
      <p><span>country:</span> {formatValue(item.country)}</p>
    </div>
  );
}
