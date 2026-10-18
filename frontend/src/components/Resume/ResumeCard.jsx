const formatValue = (v) => {
  if (typeof v === 'boolean') return v ? 'Yes' : 'No';
  if (v === undefined || v === null || v === '') return '-';
  return String(v);
};

export default function ResumeCard({ item, onSelect }) {
  return (
    <div className="resumes-card" onClick={() => onSelect && onSelect(item)}>
      <h3>{formatValue(item.title)}</h3>
      <p><span>fileUrl:</span> {formatValue(item.fileUrl)}</p>
      <p><span>summary:</span> {formatValue(item.summary)}</p>
    </div>
  );
}
