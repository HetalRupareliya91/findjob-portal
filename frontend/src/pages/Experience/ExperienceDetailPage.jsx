import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { experienceApi } from '../../api/experienceApi';
import ExperienceForm from '../../components/Experience/ExperienceForm';
import '../../styles/experience.css';
import '../../styles/mobile/experience.mobile.css';

export const route = '/experiences/:id';

const formatValue = (v) => {
  if (typeof v === 'boolean') return v ? 'Yes' : 'No';
  if (v === undefined || v === null || v === '') return '-';
  return String(v);
};

export default function ExperienceDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    experienceApi.get(id).then(setItem).catch((err) => setError(err.response?.data?.message || 'Experience not found'));
  }, [id]);

  const handleUpdate = async (payload) => {
    const updated = await experienceApi.update(id, payload);
    setItem(updated);
    setEditing(false);
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete this Experience?')) return;
    try {
      await experienceApi.remove(id);
      navigate('/experiences');
    } catch (err) {
      setError(err.response?.data?.message || 'Delete failed');
    }
  };

  if (error) {
    return (
      <div className="experiences-page">
        <p className="error">{error}</p>
        <Link to="/experiences">Back to Experience</Link>
      </div>
    );
  }
  if (!item) return <div className="experiences-page"><p className="muted">Loading...</p></div>;

  return (
    <div className="experiences-page">
      <Link to="/experiences">&larr; Back to Experience</Link>
      <div className="detail-card">
        <h1>{formatValue(item.companyName)}</h1>
        <p><span>role:</span> {formatValue(item.role)}</p>
        <p><span>years:</span> {formatValue(item.years)}</p>
        <p className="muted">Created {new Date(item.createdAt).toLocaleString()}</p>
        <div className="actions">
          <button className="btn" onClick={() => setEditing(!editing)}>{editing ? 'Cancel' : 'Edit'}</button>
          <button className="btn danger" onClick={handleDelete}>Delete</button>
        </div>
      </div>
      {editing && <ExperienceForm initial={item} onSubmit={handleUpdate} />}
    </div>
  );
}
