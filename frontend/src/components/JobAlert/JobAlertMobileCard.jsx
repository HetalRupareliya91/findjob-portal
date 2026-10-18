export default function JobAlertMobileCard({ item, onSelect }) {
  return (
    <button type="button" className="job-alerts-mobile-card" onClick={() => onSelect && onSelect(item)}>
      <strong>{String(item.keyword ?? '-')}</strong>
      <small>{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : ''}</small>
    </button>
  );
}
