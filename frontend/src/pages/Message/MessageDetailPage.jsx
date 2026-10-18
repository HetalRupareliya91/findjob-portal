import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { messageApi } from '../../api/messageApi';
import MessageForm from '../../components/Message/MessageForm';
import '../../styles/message.css';
import '../../styles/mobile/message.mobile.css';

export const route = '/messages/:id';

const formatValue = (v) => {
  if (typeof v === 'boolean') return v ? 'Yes' : 'No';
  if (v === undefined || v === null || v === '') return '-';
  return String(v);
};

export default function MessageDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    messageApi.get(id).then(setItem).catch((err) => setError(err.response?.data?.message || 'Message not found'));
  }, [id]);

  const handleUpdate = async (payload) => {
    const updated = await messageApi.update(id, payload);
    setItem(updated);
    setEditing(false);
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete this Message?')) return;
    try {
      await messageApi.remove(id);
      navigate('/messages');
    } catch (err) {
      setError(err.response?.data?.message || 'Delete failed');
    }
  };

  if (error) {
    return (
      <div className="messages-page">
        <p className="error">{error}</p>
        <Link to="/messages">Back to Message</Link>
      </div>
    );
  }
  if (!item) return <div className="messages-page"><p className="muted">Loading...</p></div>;

  return (
    <div className="messages-page">
      <Link to="/messages">&larr; Back to Message</Link>
      <div className="detail-card">
        <h1>{formatValue(item.subject)}</h1>
        <p><span>body:</span> {formatValue(item.body)}</p>
        <p><span>read:</span> {formatValue(item.read)}</p>
        <p className="muted">Created {new Date(item.createdAt).toLocaleString()}</p>
        <div className="actions">
          <button className="btn" onClick={() => setEditing(!editing)}>{editing ? 'Cancel' : 'Edit'}</button>
          <button className="btn danger" onClick={handleDelete}>Delete</button>
        </div>
      </div>
      {editing && <MessageForm initial={item} onSubmit={handleUpdate} />}
    </div>
  );
}
