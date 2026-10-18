import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { reviewApi } from '../../api/reviewApi';
import ReviewForm from '../../components/Review/ReviewForm';
import '../../styles/review.css';
import '../../styles/mobile/review.mobile.css';

export const route = '/reviews/:id';

const formatValue = (v) => {
  if (typeof v === 'boolean') return v ? 'Yes' : 'No';
  if (v === undefined || v === null || v === '') return '-';
  return String(v);
};

export default function ReviewDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    reviewApi.get(id).then(setItem).catch((err) => setError(err.response?.data?.message || 'Review not found'));
  }, [id]);

  const handleUpdate = async (payload) => {
    const updated = await reviewApi.update(id, payload);
    setItem(updated);
    setEditing(false);
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete this Review?')) return;
    try {
      await reviewApi.remove(id);
      navigate('/reviews');
    } catch (err) {
      setError(err.response?.data?.message || 'Delete failed');
    }
  };

  if (error) {
    return (
      <div className="reviews-page">
        <p className="error">{error}</p>
        <Link to="/reviews">Back to Review</Link>
      </div>
    );
  }
  if (!item) return <div className="reviews-page"><p className="muted">Loading...</p></div>;

  return (
    <div className="reviews-page">
      <Link to="/reviews">&larr; Back to Review</Link>
      <div className="detail-card">
        <h1>{formatValue(item.rating)}</h1>
        <p><span>comment:</span> {formatValue(item.comment)}</p>
        <p className="muted">Created {new Date(item.createdAt).toLocaleString()}</p>
        <div className="actions">
          <button className="btn" onClick={() => setEditing(!editing)}>{editing ? 'Cancel' : 'Edit'}</button>
          <button className="btn danger" onClick={handleDelete}>Delete</button>
        </div>
      </div>
      {editing && <ReviewForm initial={item} onSubmit={handleUpdate} />}
    </div>
  );
}
