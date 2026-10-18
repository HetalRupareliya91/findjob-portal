import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { educationApi } from '../../api/educationApi';
import EducationForm from '../../components/Education/EducationForm';
import '../../styles/education.css';
import '../../styles/mobile/education.mobile.css';

export const route = '/educations/:id';

const formatValue = (v) => {
  if (typeof v === 'boolean') return v ? 'Yes' : 'No';
  if (v === undefined || v === null || v === '') return '-';
  return String(v);
};

export default function EducationDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    educationApi.get(id).then(setItem).catch((err) => setError(err.response?.data?.message || 'Education not found'));
  }, [id]);

  const handleUpdate = async (payload) => {
    const updated = await educationApi.update(id, payload);
    setItem(updated);
    setEditing(false);
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete this Education?')) return;
    try {
      await educationApi.remove(id);
      navigate('/educations');
    } catch (err) {
      setError(err.response?.data?.message || 'Delete failed');
    }
  };

  if (error) {
    return (
      <div className="educations-page">
        <p className="error">{error}</p>
        <Link to="/educations">Back to Education</Link>
      </div>
    );
  }
  if (!item) return <div className="educations-page"><p className="muted">Loading...</p></div>;

  return (
    <div className="educations-page">
      <Link to="/educations">&larr; Back to Education</Link>
      <div className="detail-card">
        <h1>{formatValue(item.institute)}</h1>
        <p><span>degree:</span> {formatValue(item.degree)}</p>
        <p><span>passingYear:</span> {formatValue(item.passingYear)}</p>
        <p className="muted">Created {new Date(item.createdAt).toLocaleString()}</p>
        <div className="actions">
          <button className="btn" onClick={() => setEditing(!editing)}>{editing ? 'Cancel' : 'Edit'}</button>
          <button className="btn danger" onClick={handleDelete}>Delete</button>
        </div>
      </div>
      {editing && <EducationForm initial={item} onSubmit={handleUpdate} />}
    </div>
  );
}
