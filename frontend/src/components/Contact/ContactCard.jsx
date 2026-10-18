const formatValue = (v) => {
  if (typeof v === 'boolean') return v ? 'Yes' : 'No';
  if (v === undefined || v === null || v === '') return '-';
  return String(v);
};

export default function ContactCard({ item, onSelect }) {
  return (
    <div className="contacts-card" onClick={() => onSelect && onSelect(item)}>
      <h3>{formatValue(item.name)}</h3>
      <p><span>email:</span> {formatValue(item.email)}</p>
      <p><span>message:</span> {formatValue(item.message)}</p>
    </div>
  );
}
