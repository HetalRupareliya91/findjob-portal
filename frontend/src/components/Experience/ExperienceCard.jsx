const formatValue = (v) => {
  if (typeof v === 'boolean') return v ? 'Yes' : 'No';
  if (v === undefined || v === null || v === '') return '-';
  return String(v);
};

export default function ExperienceCard({ item, onSelect }) {
  return (
    <div className="experiences-card" onClick={() => onSelect && onSelect(item)}>
      <h3>{formatValue(item.companyName)}</h3>
      <p><span>role:</span> {formatValue(item.role)}</p>
      <p><span>years:</span> {formatValue(item.years)}</p>
    </div>
  );
}
