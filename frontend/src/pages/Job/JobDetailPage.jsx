import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { jobApi } from '../../api/jobApi';
import JobForm from '../../components/Job/JobForm';
import '../../styles/job.css';
import '../../styles/mobile/job.mobile.css';

export const route = '/jobs/:id';

const formatValue = (v) => {
  if (typeof v === 'boolean') return v ? 'Yes' : 'No';
  if (v === undefined || v === null || v === '') return '-';
  return String(v);
};

export default function JobDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    jobApi.get(id).then(setItem).catch((err) => setError(err.response?.data?.message || 'Job not found'));
  }, [id]);

  const handleUpdate = async (payload) => {
    const updated = await jobApi.update(id, payload);
    setItem(updated);
    setEditing(false);
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete this Job?')) return;
    try {
      await jobApi.remove(id);
      navigate('/jobs');
    } catch (err) {
      setError(err.response?.data?.message || 'Delete failed');
    }
  };

  if (error) {
    return (
      <div className="jobs-page">
        <p className="error">{error}</p>
        <Link to="/jobs">Back to Job</Link>
      </div>
    );
  }
  if (!item) return <div className="jobs-page"><p className="muted">Loading...</p></div>;

  return (
    <div className="jobs-page">
      <Link to="/jobs">&larr; Back to Job</Link>
      <div className="detail-card">
        <h1>{formatValue(item.title)}</h1>
        <p><span>description:</span> {formatValue(item.description)}</p>
        <p><span>salary:</span> {formatValue(item.salary)}</p>
        <p><span>jobType:</span> {formatValue(item.jobType)}</p>
        <p className="muted">Created {new Date(item.createdAt).toLocaleString()}</p>
        <div className="actions">
          <button className="btn" onClick={() => setEditing(!editing)}>{editing ? 'Cancel' : 'Edit'}</button>
          <button className="btn danger" onClick={handleDelete}>Delete</button>
        </div>
      </div>
      {editing && <JobForm initial={item} onSubmit={handleUpdate} />}
    </div>
  );
}
