const formatValue = (v) => {
  if (typeof v === 'boolean') return v ? 'Yes' : 'No';
  if (v === undefined || v === null || v === '') return '-';
  return String(v);
};

export default function ReviewCard({ item, onSelect }) {
  return (
    <div className="reviews-card" onClick={() => onSelect && onSelect(item)}>
      <h3>{formatValue(item.rating)}</h3>
      <p><span>comment:</span> {formatValue(item.comment)}</p>
    </div>
  );
}
