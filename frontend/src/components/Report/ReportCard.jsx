const formatValue = (v) => {
  if (typeof v === 'boolean') return v ? 'Yes' : 'No';
  if (v === undefined || v === null || v === '') return '-';
  return String(v);
};

export default function ReportCard({ item, onSelect }) {
  return (
    <div className="reports-card" onClick={() => onSelect && onSelect(item)}>
      <h3>{formatValue(item.reason)}</h3>
      <p><span>status:</span> {formatValue(item.status)}</p>
    </div>
  );
}
