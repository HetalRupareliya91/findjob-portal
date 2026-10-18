import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { faqApi } from '../../api/faqApi';
import FaqForm from '../../components/Faq/FaqForm';
import '../../styles/faq.css';
import '../../styles/mobile/faq.mobile.css';

export const route = '/faqs/:id';

const formatValue = (v) => {
  if (typeof v === 'boolean') return v ? 'Yes' : 'No';
  if (v === undefined || v === null || v === '') return '-';
  return String(v);
};

export default function FaqDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    faqApi.get(id).then(setItem).catch((err) => setError(err.response?.data?.message || 'FAQ not found'));
  }, [id]);

  const handleUpdate = async (payload) => {
    const updated = await faqApi.update(id, payload);
    setItem(updated);
    setEditing(false);
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete this FAQ?')) return;
    try {
      await faqApi.remove(id);
      navigate('/faqs');
    } catch (err) {
      setError(err.response?.data?.message || 'Delete failed');
    }
  };

  if (error) {
    return (
      <div className="faqs-page">
        <p className="error">{error}</p>
        <Link to="/faqs">Back to FAQ</Link>
      </div>
    );
  }
  if (!item) return <div className="faqs-page"><p className="muted">Loading...</p></div>;

  return (
    <div className="faqs-page">
      <Link to="/faqs">&larr; Back to FAQ</Link>
      <div className="detail-card">
        <h1>{formatValue(item.question)}</h1>
        <p><span>answer:</span> {formatValue(item.answer)}</p>
        <p className="muted">Created {new Date(item.createdAt).toLocaleString()}</p>
        <div className="actions">
          <button className="btn" onClick={() => setEditing(!editing)}>{editing ? 'Cancel' : 'Edit'}</button>
          <button className="btn danger" onClick={handleDelete}>Delete</button>
        </div>
      </div>
      {editing && <FaqForm initial={item} onSubmit={handleUpdate} />}
    </div>
  );
}
