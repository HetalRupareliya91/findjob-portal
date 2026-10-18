export default function SkillMobileCard({ item, onSelect }) {
  return (
    <button type="button" className="skills-mobile-card" onClick={() => onSelect && onSelect(item)}>
      <strong>{String(item.name ?? '-')}</strong>
      <small>{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : ''}</small>
    </button>
  );
}
