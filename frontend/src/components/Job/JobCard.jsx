const formatValue = (v) => {
  if (typeof v === 'boolean') return v ? 'Yes' : 'No';
  if (v === undefined || v === null || v === '') return '-';
  return String(v);
};

export default function JobCard({ item, onSelect }) {
  return (
    <div className="jobs-card" onClick={() => onSelect && onSelect(item)}>
      <h3>{formatValue(item.title)}</h3>
      <p><span>description:</span> {formatValue(item.description)}</p>
      <p><span>salary:</span> {formatValue(item.salary)}</p>
      <p><span>jobType:</span> {formatValue(item.jobType)}</p>
    </div>
  );
}
