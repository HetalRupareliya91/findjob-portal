export default function ReportMobileCard({ item, onSelect }) {
  return (
    <button type="button" className="reports-mobile-card" onClick={() => onSelect && onSelect(item)}>
      <strong>{String(item.reason ?? '-')}</strong>
      <small>{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : ''}</small>
    </button>
  );
}
