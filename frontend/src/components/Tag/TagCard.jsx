const formatValue = (v) => {
  if (typeof v === 'boolean') return v ? 'Yes' : 'No';
  if (v === undefined || v === null || v === '') return '-';
  return String(v);
};

export default function TagCard({ item, onSelect }) {
  return (
    <div className="tags-card" onClick={() => onSelect && onSelect(item)}>
      <h3>{formatValue(item.name)}</h3>
      <p><span>color:</span> {formatValue(item.color)}</p>
    </div>
  );
}
