import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { applicationApi } from '../../api/applicationApi';
import ApplicationForm from '../../components/Application/ApplicationForm';
import '../../styles/application.css';
import '../../styles/mobile/application.mobile.css';

export const route = '/applications/:id';

const formatValue = (v) => {
  if (typeof v === 'boolean') return v ? 'Yes' : 'No';
  if (v === undefined || v === null || v === '') return '-';
  return String(v);
};

export default function ApplicationDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    applicationApi.get(id).then(setItem).catch((err) => setError(err.response?.data?.message || 'Application not found'));
  }, [id]);

  const handleUpdate = async (payload) => {
    const updated = await applicationApi.update(id, payload);
    setItem(updated);
    setEditing(false);
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete this Application?')) return;
    try {
      await applicationApi.remove(id);
      navigate('/applications');
    } catch (err) {
      setError(err.response?.data?.message || 'Delete failed');
    }
  };

  if (error) {
    return (
      <div className="applications-page">
        <p className="error">{error}</p>
        <Link to="/applications">Back to Application</Link>
      </div>
    );
  }
  if (!item) return <div className="applications-page"><p className="muted">Loading...</p></div>;

  return (
    <div className="applications-page">
      <Link to="/applications">&larr; Back to Application</Link>
      <div className="detail-card">
        <h1>{formatValue(item.coverLetter)}</h1>
        <p><span>status:</span> {formatValue(item.status)}</p>
        <p><span>expectedSalary:</span> {formatValue(item.expectedSalary)}</p>
        <p className="muted">Created {new Date(item.createdAt).toLocaleString()}</p>
        <div className="actions">
          <button className="btn" onClick={() => setEditing(!editing)}>{editing ? 'Cancel' : 'Edit'}</button>
          <button className="btn danger" onClick={handleDelete}>Delete</button>
        </div>
      </div>
      {editing && <ApplicationForm initial={item} onSubmit={handleUpdate} />}
    </div>
  );
}
