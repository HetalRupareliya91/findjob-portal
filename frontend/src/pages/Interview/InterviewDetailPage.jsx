import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { interviewApi } from '../../api/interviewApi';
import InterviewForm from '../../components/Interview/InterviewForm';
import '../../styles/interview.css';
import '../../styles/mobile/interview.mobile.css';

export const route = '/interviews/:id';

const formatValue = (v) => {
  if (typeof v === 'boolean') return v ? 'Yes' : 'No';
  if (v === undefined || v === null || v === '') return '-';
  return String(v);
};

export default function InterviewDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    interviewApi.get(id).then(setItem).catch((err) => setError(err.response?.data?.message || 'Interview not found'));
  }, [id]);

  const handleUpdate = async (payload) => {
    const updated = await interviewApi.update(id, payload);
    setItem(updated);
    setEditing(false);
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete this Interview?')) return;
    try {
      await interviewApi.remove(id);
      navigate('/interviews');
    } catch (err) {
      setError(err.response?.data?.message || 'Delete failed');
    }
  };

  if (error) {
    return (
      <div className="interviews-page">
        <p className="error">{error}</p>
        <Link to="/interviews">Back to Interview</Link>
      </div>
    );
  }
  if (!item) return <div className="interviews-page"><p className="muted">Loading...</p></div>;

  return (
    <div className="interviews-page">
      <Link to="/interviews">&larr; Back to Interview</Link>
      <div className="detail-card">
        <h1>{formatValue(item.scheduledAt)}</h1>
        <p><span>mode:</span> {formatValue(item.mode)}</p>
        <p><span>notes:</span> {formatValue(item.notes)}</p>
        <p className="muted">Created {new Date(item.createdAt).toLocaleString()}</p>
        <div className="actions">
          <button className="btn" onClick={() => setEditing(!editing)}>{editing ? 'Cancel' : 'Edit'}</button>
          <button className="btn danger" onClick={handleDelete}>Delete</button>
        </div>
      </div>
      {editing && <InterviewForm initial={item} onSubmit={handleUpdate} />}
    </div>
  );
}
