import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { paymentApi } from '../../api/paymentApi';
import PaymentForm from '../../components/Payment/PaymentForm';
import '../../styles/payment.css';
import '../../styles/mobile/payment.mobile.css';

export const route = '/payments/:id';

const formatValue = (v) => {
  if (typeof v === 'boolean') return v ? 'Yes' : 'No';
  if (v === undefined || v === null || v === '') return '-';
  return String(v);
};

export default function PaymentDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    paymentApi.get(id).then(setItem).catch((err) => setError(err.response?.data?.message || 'Payment not found'));
  }, [id]);

  const handleUpdate = async (payload) => {
    const updated = await paymentApi.update(id, payload);
    setItem(updated);
    setEditing(false);
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete this Payment?')) return;
    try {
      await paymentApi.remove(id);
      navigate('/payments');
    } catch (err) {
      setError(err.response?.data?.message || 'Delete failed');
    }
  };

  if (error) {
    return (
      <div className="payments-page">
        <p className="error">{error}</p>
        <Link to="/payments">Back to Payment</Link>
      </div>
    );
  }
  if (!item) return <div className="payments-page"><p className="muted">Loading...</p></div>;

  return (
    <div className="payments-page">
      <Link to="/payments">&larr; Back to Payment</Link>
      <div className="detail-card">
        <h1>{formatValue(item.amount)}</h1>
        <p><span>currency:</span> {formatValue(item.currency)}</p>
        <p><span>status:</span> {formatValue(item.status)}</p>
        <p className="muted">Created {new Date(item.createdAt).toLocaleString()}</p>
        <div className="actions">
          <button className="btn" onClick={() => setEditing(!editing)}>{editing ? 'Cancel' : 'Edit'}</button>
          <button className="btn danger" onClick={handleDelete}>Delete</button>
        </div>
      </div>
      {editing && <PaymentForm initial={item} onSubmit={handleUpdate} />}
    </div>
  );
}
