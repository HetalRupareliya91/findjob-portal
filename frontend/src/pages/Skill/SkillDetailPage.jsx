import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { skillApi } from '../../api/skillApi';
import SkillForm from '../../components/Skill/SkillForm';
import '../../styles/skill.css';
import '../../styles/mobile/skill.mobile.css';

export const route = '/skills/:id';

const formatValue = (v) => {
  if (typeof v === 'boolean') return v ? 'Yes' : 'No';
  if (v === undefined || v === null || v === '') return '-';
  return String(v);
};

export default function SkillDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    skillApi.get(id).then(setItem).catch((err) => setError(err.response?.data?.message || 'Skill not found'));
  }, [id]);

  const handleUpdate = async (payload) => {
    const updated = await skillApi.update(id, payload);
    setItem(updated);
    setEditing(false);
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete this Skill?')) return;
    try {
      await skillApi.remove(id);
      navigate('/skills');
    } catch (err) {
      setError(err.response?.data?.message || 'Delete failed');
    }
  };

  if (error) {
    return (
      <div className="skills-page">
        <p className="error">{error}</p>
        <Link to="/skills">Back to Skill</Link>
      </div>
    );
  }
  if (!item) return <div className="skills-page"><p className="muted">Loading...</p></div>;

  return (
    <div className="skills-page">
      <Link to="/skills">&larr; Back to Skill</Link>
      <div className="detail-card">
        <h1>{formatValue(item.name)}</h1>
        <p><span>level:</span> {formatValue(item.level)}</p>
        <p className="muted">Created {new Date(item.createdAt).toLocaleString()}</p>
        <div className="actions">
          <button className="btn" onClick={() => setEditing(!editing)}>{editing ? 'Cancel' : 'Edit'}</button>
          <button className="btn danger" onClick={handleDelete}>Delete</button>
        </div>
      </div>
      {editing && <SkillForm initial={item} onSubmit={handleUpdate} />}
    </div>
  );
}
