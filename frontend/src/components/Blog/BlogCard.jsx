const formatValue = (v) => {
  if (typeof v === 'boolean') return v ? 'Yes' : 'No';
  if (v === undefined || v === null || v === '') return '-';
  return String(v);
};

export default function BlogCard({ item, onSelect }) {
  return (
    <div className="blogs-card" onClick={() => onSelect && onSelect(item)}>
      <h3>{formatValue(item.title)}</h3>
      <p><span>content:</span> {formatValue(item.content)}</p>
      <p><span>published:</span> {formatValue(item.published)}</p>
    </div>
  );
}
