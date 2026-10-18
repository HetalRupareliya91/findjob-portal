import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { planApi } from '../../api/planApi';
import PlanForm from '../../components/Plan/PlanForm';
import '../../styles/plan.css';
import '../../styles/mobile/plan.mobile.css';

export const route = '/plans/:id';

const formatValue = (v) => {
  if (typeof v === 'boolean') return v ? 'Yes' : 'No';
  if (v === undefined || v === null || v === '') return '-';
  return String(v);
};

export default function PlanDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    planApi.get(id).then(setItem).catch((err) => setError(err.response?.data?.message || 'Subscription Plan not found'));
  }, [id]);

  const handleUpdate = async (payload) => {
    const updated = await planApi.update(id, payload);
    setItem(updated);
    setEditing(false);
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete this Subscription Plan?')) return;
    try {
      await planApi.remove(id);
      navigate('/plans');
    } catch (err) {
      setError(err.response?.data?.message || 'Delete failed');
    }
  };

  if (error) {
    return (
      <div className="plans-page">
        <p className="error">{error}</p>
        <Link to="/plans">Back to Subscription Plan</Link>
      </div>
    );
  }
  if (!item) return <div className="plans-page"><p className="muted">Loading...</p></div>;

  return (
    <div className="plans-page">
      <Link to="/plans">&larr; Back to Subscription Plan</Link>
      <div className="detail-card">
        <h1>{formatValue(item.name)}</h1>
        <p><span>price:</span> {formatValue(item.price)}</p>
        <p><span>durationDays:</span> {formatValue(item.durationDays)}</p>
        <p className="muted">Created {new Date(item.createdAt).toLocaleString()}</p>
        <div className="actions">
          <button className="btn" onClick={() => setEditing(!editing)}>{editing ? 'Cancel' : 'Edit'}</button>
          <button className="btn danger" onClick={handleDelete}>Delete</button>
        </div>
      </div>
      {editing && <PlanForm initial={item} onSubmit={handleUpdate} />}
    </div>
  );
}
