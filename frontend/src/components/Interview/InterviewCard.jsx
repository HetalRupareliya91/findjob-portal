const formatValue = (v) => {
  if (typeof v === 'boolean') return v ? 'Yes' : 'No';
  if (v === undefined || v === null || v === '') return '-';
  return String(v);
};

export default function InterviewCard({ item, onSelect }) {
  return (
    <div className="interviews-card" onClick={() => onSelect && onSelect(item)}>
      <h3>{formatValue(item.scheduledAt)}</h3>
      <p><span>mode:</span> {formatValue(item.mode)}</p>
      <p><span>notes:</span> {formatValue(item.notes)}</p>
    </div>
  );
}
