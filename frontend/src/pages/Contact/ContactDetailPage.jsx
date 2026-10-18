import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { contactApi } from '../../api/contactApi';
import ContactForm from '../../components/Contact/ContactForm';
import '../../styles/contact.css';
import '../../styles/mobile/contact.mobile.css';

export const route = '/contacts/:id';

const formatValue = (v) => {
  if (typeof v === 'boolean') return v ? 'Yes' : 'No';
  if (v === undefined || v === null || v === '') return '-';
  return String(v);
};

export default function ContactDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    contactApi.get(id).then(setItem).catch((err) => setError(err.response?.data?.message || 'Contact Request not found'));
  }, [id]);

  const handleUpdate = async (payload) => {
    const updated = await contactApi.update(id, payload);
    setItem(updated);
    setEditing(false);
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete this Contact Request?')) return;
    try {
      await contactApi.remove(id);
      navigate('/contacts');
    } catch (err) {
      setError(err.response?.data?.message || 'Delete failed');
    }
  };

  if (error) {
    return (
      <div className="contacts-page">
        <p className="error">{error}</p>
        <Link to="/contacts">Back to Contact Request</Link>
      </div>
    );
  }
  if (!item) return <div className="contacts-page"><p className="muted">Loading...</p></div>;

  return (
    <div className="contacts-page">
      <Link to="/contacts">&larr; Back to Contact Request</Link>
      <div className="detail-card">
        <h1>{formatValue(item.name)}</h1>
        <p><span>email:</span> {formatValue(item.email)}</p>
        <p><span>message:</span> {formatValue(item.message)}</p>
        <p className="muted">Created {new Date(item.createdAt).toLocaleString()}</p>
        <div className="actions">
          <button className="btn" onClick={() => setEditing(!editing)}>{editing ? 'Cancel' : 'Edit'}</button>
          <button className="btn danger" onClick={handleDelete}>Delete</button>
        </div>
      </div>
      {editing && <ContactForm initial={item} onSubmit={handleUpdate} />}
    </div>
  );
}
