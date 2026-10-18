const formatValue = (v) => {
  if (typeof v === 'boolean') return v ? 'Yes' : 'No';
  if (v === undefined || v === null || v === '') return '-';
  return String(v);
};

export default function EducationCard({ item, onSelect }) {
  return (
    <div className="educations-card" onClick={() => onSelect && onSelect(item)}>
      <h3>{formatValue(item.institute)}</h3>
      <p><span>degree:</span> {formatValue(item.degree)}</p>
      <p><span>passingYear:</span> {formatValue(item.passingYear)}</p>
    </div>
  );
}
