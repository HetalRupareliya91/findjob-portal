const formatValue = (v) => {
  if (typeof v === 'boolean') return v ? 'Yes' : 'No';
  if (v === undefined || v === null || v === '') return '-';
  return String(v);
};

export default function NotificationCard({ item, onSelect }) {
  return (
    <div className="notifications-card" onClick={() => onSelect && onSelect(item)}>
      <h3>{formatValue(item.title)}</h3>
      <p><span>body:</span> {formatValue(item.body)}</p>
      <p><span>read:</span> {formatValue(item.read)}</p>
    </div>
  );
}
