import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { savedJobApi } from '../../api/savedJobApi';
import SavedJobForm from '../../components/SavedJob/SavedJobForm';
import '../../styles/savedJob.css';
import '../../styles/mobile/savedJob.mobile.css';

export const route = '/saved-jobs/:id';

const formatValue = (v) => {
  if (typeof v === 'boolean') return v ? 'Yes' : 'No';
  if (v === undefined || v === null || v === '') return '-';
  return String(v);
};

export default function SavedJobDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    savedJobApi.get(id).then(setItem).catch((err) => setError(err.response?.data?.message || 'Saved Job not found'));
  }, [id]);

  const handleUpdate = async (payload) => {
    const updated = await savedJobApi.update(id, payload);
    setItem(updated);
    setEditing(false);
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete this Saved Job?')) return;
    try {
      await savedJobApi.remove(id);
      navigate('/saved-jobs');
    } catch (err) {
      setError(err.response?.data?.message || 'Delete failed');
    }
  };

  if (error) {
    return (
      <div className="saved-jobs-page">
        <p className="error">{error}</p>
        <Link to="/saved-jobs">Back to Saved Job</Link>
      </div>
    );
  }
  if (!item) return <div className="saved-jobs-page"><p className="muted">Loading...</p></div>;

  return (
    <div className="saved-jobs-page">
      <Link to="/saved-jobs">&larr; Back to Saved Job</Link>
      <div className="detail-card">
        <h1>{formatValue(item.jobId)}</h1>
        <p><span>note:</span> {formatValue(item.note)}</p>
        <p className="muted">Created {new Date(item.createdAt).toLocaleString()}</p>
        <div className="actions">
          <button className="btn" onClick={() => setEditing(!editing)}>{editing ? 'Cancel' : 'Edit'}</button>
          <button className="btn danger" onClick={handleDelete}>Delete</button>
        </div>
      </div>
      {editing && <SavedJobForm initial={item} onSubmit={handleUpdate} />}
    </div>
  );
}
