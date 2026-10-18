const formatValue = (v) => {
  if (typeof v === 'boolean') return v ? 'Yes' : 'No';
  if (v === undefined || v === null || v === '') return '-';
  return String(v);
};

export default function CategoryCard({ item, onSelect }) {
  return (
    <div className="categories-card" onClick={() => onSelect && onSelect(item)}>
      <h3>{formatValue(item.name)}</h3>
      <p><span>slug:</span> {formatValue(item.slug)}</p>
      <p><span>description:</span> {formatValue(item.description)}</p>
    </div>
  );
}
