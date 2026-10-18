const formatValue = (v) => {
  if (typeof v === 'boolean') return v ? 'Yes' : 'No';
  if (v === undefined || v === null || v === '') return '-';
  return String(v);
};

export default function EmployerCard({ item, onSelect }) {
  return (
    <div className="employers-card" onClick={() => onSelect && onSelect(item)}>
      <h3>{formatValue(item.fullName)}</h3>
      <p><span>designation:</span> {formatValue(item.designation)}</p>
      <p><span>phone:</span> {formatValue(item.phone)}</p>
    </div>
  );
}
