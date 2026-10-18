const formatValue = (v) => {
  if (typeof v === 'boolean') return v ? 'Yes' : 'No';
  if (v === undefined || v === null || v === '') return '-';
  return String(v);
};

export default function ApplicationCard({ item, onSelect }) {
  return (
    <div className="applications-card" onClick={() => onSelect && onSelect(item)}>
      <h3>{formatValue(item.coverLetter)}</h3>
      <p><span>status:</span> {formatValue(item.status)}</p>
      <p><span>expectedSalary:</span> {formatValue(item.expectedSalary)}</p>
    </div>
  );
}
