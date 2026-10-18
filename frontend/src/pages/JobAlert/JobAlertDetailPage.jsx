import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { jobAlertApi } from '../../api/jobAlertApi';
import JobAlertForm from '../../components/JobAlert/JobAlertForm';
import '../../styles/jobAlert.css';
import '../../styles/mobile/jobAlert.mobile.css';

export const route = '/job-alerts/:id';

const formatValue = (v) => {
  if (typeof v === 'boolean') return v ? 'Yes' : 'No';
  if (v === undefined || v === null || v === '') return '-';
  return String(v);
};

export default function JobAlertDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    jobAlertApi.get(id).then(setItem).catch((err) => setError(err.response?.data?.message || 'Job Alert not found'));
  }, [id]);

  const handleUpdate = async (payload) => {
    const updated = await jobAlertApi.update(id, payload);
    setItem(updated);
    setEditing(false);
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete this Job Alert?')) return;
    try {
      await jobAlertApi.remove(id);
      navigate('/job-alerts');
    } catch (err) {
      setError(err.response?.data?.message || 'Delete failed');
    }
  };

  if (error) {
    return (
      <div className="job-alerts-page">
        <p className="error">{error}</p>
        <Link to="/job-alerts">Back to Job Alert</Link>
      </div>
    );
  }
  if (!item) return <div className="job-alerts-page"><p className="muted">Loading...</p></div>;

  return (
    <div className="job-alerts-page">
      <Link to="/job-alerts">&larr; Back to Job Alert</Link>
      <div className="detail-card">
        <h1>{formatValue(item.keyword)}</h1>
        <p><span>frequency:</span> {formatValue(item.frequency)}</p>
        <p><span>active:</span> {formatValue(item.active)}</p>
        <p className="muted">Created {new Date(item.createdAt).toLocaleString()}</p>
        <div className="actions">
          <button className="btn" onClick={() => setEditing(!editing)}>{editing ? 'Cancel' : 'Edit'}</button>
          <button className="btn danger" onClick={handleDelete}>Delete</button>
        </div>
      </div>
      {editing && <JobAlertForm initial={item} onSubmit={handleUpdate} />}
    </div>
  );
}
