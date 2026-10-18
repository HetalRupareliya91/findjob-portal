const formatValue = (v) => {
  if (typeof v === 'boolean') return v ? 'Yes' : 'No';
  if (v === undefined || v === null || v === '') return '-';
  return String(v);
};

export default function CandidateCard({ item, onSelect }) {
  return (
    <div className="candidates-card" onClick={() => onSelect && onSelect(item)}>
      <h3>{formatValue(item.fullName)}</h3>
      <p><span>headline:</span> {formatValue(item.headline)}</p>
      <p><span>experienceYears:</span> {formatValue(item.experienceYears)}</p>
    </div>
  );
}
