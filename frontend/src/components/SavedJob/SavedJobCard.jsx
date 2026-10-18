const formatValue = (v) => {
  if (typeof v === 'boolean') return v ? 'Yes' : 'No';
  if (v === undefined || v === null || v === '') return '-';
  return String(v);
};

export default function SavedJobCard({ item, onSelect }) {
  return (
    <div className="saved-jobs-card" onClick={() => onSelect && onSelect(item)}>
      <h3>{formatValue(item.jobId)}</h3>
      <p><span>note:</span> {formatValue(item.note)}</p>
    </div>
  );
}
