const formatValue = (v) => {
  if (typeof v === 'boolean') return v ? 'Yes' : 'No';
  if (v === undefined || v === null || v === '') return '-';
  return String(v);
};

export default function CompanyCard({ item, onSelect }) {
  return (
    <div className="companies-card" onClick={() => onSelect && onSelect(item)}>
      <h3>{formatValue(item.name)}</h3>
      <p><span>website:</span> {formatValue(item.website)}</p>
      <p><span>industry:</span> {formatValue(item.industry)}</p>
      <p><span>size:</span> {formatValue(item.size)}</p>
    </div>
  );
}
