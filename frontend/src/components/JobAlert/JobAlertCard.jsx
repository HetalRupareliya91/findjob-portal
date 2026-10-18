const formatValue = (v) => {
  if (typeof v === 'boolean') return v ? 'Yes' : 'No';
  if (v === undefined || v === null || v === '') return '-';
  return String(v);
};

export default function JobAlertCard({ item, onSelect }) {
  return (
    <div className="job-alerts-card" onClick={() => onSelect && onSelect(item)}>
      <h3>{formatValue(item.keyword)}</h3>
      <p><span>frequency:</span> {formatValue(item.frequency)}</p>
      <p><span>active:</span> {formatValue(item.active)}</p>
    </div>
  );
}
