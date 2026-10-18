import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { employerApi } from '../../api/employerApi';
import EmployerForm from '../../components/Employer/EmployerForm';
import '../../styles/employer.css';
import '../../styles/mobile/employer.mobile.css';

export const route = '/employers/:id';

const formatValue = (v) => {
  if (typeof v === 'boolean') return v ? 'Yes' : 'No';
  if (v === undefined || v === null || v === '') return '-';
  return String(v);
};

export default function EmployerDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    employerApi.get(id).then(setItem).catch((err) => setError(err.response?.data?.message || 'Employer not found'));
  }, [id]);

  const handleUpdate = async (payload) => {
    const updated = await employerApi.update(id, payload);
    setItem(updated);
    setEditing(false);
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete this Employer?')) return;
    try {
      await employerApi.remove(id);
      navigate('/employers');
    } catch (err) {
      setError(err.response?.data?.message || 'Delete failed');
    }
  };

  if (error) {
    return (
      <div className="employers-page">
        <p className="error">{error}</p>
        <Link to="/employers">Back to Employer</Link>
      </div>
    );
  }
  if (!item) return <div className="employers-page"><p className="muted">Loading...</p></div>;

  return (
    <div className="employers-page">
      <Link to="/employers">&larr; Back to Employer</Link>
      <div className="detail-card">
        <h1>{formatValue(item.fullName)}</h1>
        <p><span>designation:</span> {formatValue(item.designation)}</p>
        <p><span>phone:</span> {formatValue(item.phone)}</p>
        <p className="muted">Created {new Date(item.createdAt).toLocaleString()}</p>
        <div className="actions">
          <button className="btn" onClick={() => setEditing(!editing)}>{editing ? 'Cancel' : 'Edit'}</button>
          <button className="btn danger" onClick={handleDelete}>Delete</button>
        </div>
      </div>
      {editing && <EmployerForm initial={item} onSubmit={handleUpdate} />}
    </div>
  );
}
