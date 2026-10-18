const formatValue = (v) => {
  if (typeof v === 'boolean') return v ? 'Yes' : 'No';
  if (v === undefined || v === null || v === '') return '-';
  return String(v);
};

export default function SkillCard({ item, onSelect }) {
  return (
    <div className="skills-card" onClick={() => onSelect && onSelect(item)}>
      <h3>{formatValue(item.name)}</h3>
      <p><span>level:</span> {formatValue(item.level)}</p>
    </div>
  );
}
