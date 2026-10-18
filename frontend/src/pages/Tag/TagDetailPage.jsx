import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { tagApi } from '../../api/tagApi';
import TagForm from '../../components/Tag/TagForm';
import '../../styles/tag.css';
import '../../styles/mobile/tag.mobile.css';

export const route = '/tags/:id';

const formatValue = (v) => {
  if (typeof v === 'boolean') return v ? 'Yes' : 'No';
  if (v === undefined || v === null || v === '') return '-';
  return String(v);
};

export default function TagDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    tagApi.get(id).then(setItem).catch((err) => setError(err.response?.data?.message || 'Tag not found'));
  }, [id]);

  const handleUpdate = async (payload) => {
    const updated = await tagApi.update(id, payload);
    setItem(updated);
    setEditing(false);
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete this Tag?')) return;
    try {
      await tagApi.remove(id);
      navigate('/tags');
    } catch (err) {
      setError(err.response?.data?.message || 'Delete failed');
    }
  };

  if (error) {
    return (
      <div className="tags-page">
        <p className="error">{error}</p>
        <Link to="/tags">Back to Tag</Link>
      </div>
    );
  }
  if (!item) return <div className="tags-page"><p className="muted">Loading...</p></div>;

  return (
    <div className="tags-page">
      <Link to="/tags">&larr; Back to Tag</Link>
      <div className="detail-card">
        <h1>{formatValue(item.name)}</h1>
        <p><span>color:</span> {formatValue(item.color)}</p>
        <p className="muted">Created {new Date(item.createdAt).toLocaleString()}</p>
        <div className="actions">
          <button className="btn" onClick={() => setEditing(!editing)}>{editing ? 'Cancel' : 'Edit'}</button>
          <button className="btn danger" onClick={handleDelete}>Delete</button>
        </div>
      </div>
      {editing && <TagForm initial={item} onSubmit={handleUpdate} />}
    </div>
  );
}
