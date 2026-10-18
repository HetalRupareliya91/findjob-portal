export default function SavedJobMobileCard({ item, onSelect }) {
  return (
    <button type="button" className="saved-jobs-mobile-card" onClick={() => onSelect && onSelect(item)}>
      <strong>{String(item.jobId ?? '-')}</strong>
      <small>{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : ''}</small>
    </button>
  );
}
