import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { notificationApi } from '../../api/notificationApi';
import NotificationForm from '../../components/Notification/NotificationForm';
import '../../styles/notification.css';
import '../../styles/mobile/notification.mobile.css';

export const route = '/notifications/:id';

const formatValue = (v) => {
  if (typeof v === 'boolean') return v ? 'Yes' : 'No';
  if (v === undefined || v === null || v === '') return '-';
  return String(v);
};

export default function NotificationDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    notificationApi.get(id).then(setItem).catch((err) => setError(err.response?.data?.message || 'Notification not found'));
  }, [id]);

  const handleUpdate = async (payload) => {
    const updated = await notificationApi.update(id, payload);
    setItem(updated);
    setEditing(false);
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete this Notification?')) return;
    try {
      await notificationApi.remove(id);
      navigate('/notifications');
    } catch (err) {
      setError(err.response?.data?.message || 'Delete failed');
    }
  };

  if (error) {
    return (
      <div className="notifications-page">
        <p className="error">{error}</p>
        <Link to="/notifications">Back to Notification</Link>
      </div>
    );
  }
  if (!item) return <div className="notifications-page"><p className="muted">Loading...</p></div>;

  return (
    <div className="notifications-page">
      <Link to="/notifications">&larr; Back to Notification</Link>
      <div className="detail-card">
        <h1>{formatValue(item.title)}</h1>
        <p><span>body:</span> {formatValue(item.body)}</p>
        <p><span>read:</span> {formatValue(item.read)}</p>
        <p className="muted">Created {new Date(item.createdAt).toLocaleString()}</p>
        <div className="actions">
          <button className="btn" onClick={() => setEditing(!editing)}>{editing ? 'Cancel' : 'Edit'}</button>
          <button className="btn danger" onClick={handleDelete}>Delete</button>
        </div>
      </div>
      {editing && <NotificationForm initial={item} onSubmit={handleUpdate} />}
    </div>
  );
}
