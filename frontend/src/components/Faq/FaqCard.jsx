const formatValue = (v) => {
  if (typeof v === 'boolean') return v ? 'Yes' : 'No';
  if (v === undefined || v === null || v === '') return '-';
  return String(v);
};

export default function FaqCard({ item, onSelect }) {
  return (
    <div className="faqs-card" onClick={() => onSelect && onSelect(item)}>
      <h3>{formatValue(item.question)}</h3>
      <p><span>answer:</span> {formatValue(item.answer)}</p>
    </div>
  );
}
