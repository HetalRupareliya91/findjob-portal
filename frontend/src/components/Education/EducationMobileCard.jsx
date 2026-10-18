export default function EducationMobileCard({ item, onSelect }) {
  return (
    <button type="button" className="educations-mobile-card" onClick={() => onSelect && onSelect(item)}>
      <strong>{String(item.institute ?? '-')}</strong>
      <small>{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : ''}</small>
    </button>
  );
}
