import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { benefitApi } from '../../api/benefitApi';
import BenefitForm from '../../components/Benefit/BenefitForm';
import '../../styles/benefit.css';
import '../../styles/mobile/benefit.mobile.css';

export const route = '/benefits/:id';

const formatValue = (v) => {
  if (typeof v === 'boolean') return v ? 'Yes' : 'No';
  if (v === undefined || v === null || v === '') return '-';
  return String(v);
};

export default function BenefitDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    benefitApi.get(id).then(setItem).catch((err) => setError(err.response?.data?.message || 'Benefit not found'));
  }, [id]);

  const handleUpdate = async (payload) => {
    const updated = await benefitApi.update(id, payload);
    setItem(updated);
    setEditing(false);
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete this Benefit?')) return;
    try {
      await benefitApi.remove(id);
      navigate('/benefits');
    } catch (err) {
      setError(err.response?.data?.message || 'Delete failed');
    }
  };

  if (error) {
    return (
      <div className="benefits-page">
        <p className="error">{error}</p>
        <Link to="/benefits">Back to Benefit</Link>
      </div>
    );
  }
  if (!item) return <div className="benefits-page"><p className="muted">Loading...</p></div>;

  return (
    <div className="benefits-page">
      <Link to="/benefits">&larr; Back to Benefit</Link>
      <div className="detail-card">
        <h1>{formatValue(item.title)}</h1>
        <p><span>description:</span> {formatValue(item.description)}</p>
        <p className="muted">Created {new Date(item.createdAt).toLocaleString()}</p>
        <div className="actions">
          <button className="btn" onClick={() => setEditing(!editing)}>{editing ? 'Cancel' : 'Edit'}</button>
          <button className="btn danger" onClick={handleDelete}>Delete</button>
        </div>
      </div>
      {editing && <BenefitForm initial={item} onSubmit={handleUpdate} />}
    </div>
  );
}
