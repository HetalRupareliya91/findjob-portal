export default function ResumeMobileCard({ item, onSelect }) {
  return (
    <button type="button" className="resumes-mobile-card" onClick={() => onSelect && onSelect(item)}>
      <strong>{String(item.title ?? '-')}</strong>
      <small>{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : ''}</small>
    </button>
  );
}
