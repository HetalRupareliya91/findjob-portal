import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { blogApi } from '../../api/blogApi';
import BlogForm from '../../components/Blog/BlogForm';
import '../../styles/blog.css';
import '../../styles/mobile/blog.mobile.css';

export const route = '/blogs/:id';

const formatValue = (v) => {
  if (typeof v === 'boolean') return v ? 'Yes' : 'No';
  if (v === undefined || v === null || v === '') return '-';
  return String(v);
};

export default function BlogDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    blogApi.get(id).then(setItem).catch((err) => setError(err.response?.data?.message || 'Blog Post not found'));
  }, [id]);

  const handleUpdate = async (payload) => {
    const updated = await blogApi.update(id, payload);
    setItem(updated);
    setEditing(false);
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete this Blog Post?')) return;
    try {
      await blogApi.remove(id);
      navigate('/blogs');
    } catch (err) {
      setError(err.response?.data?.message || 'Delete failed');
    }
  };

  if (error) {
    return (
      <div className="blogs-page">
        <p className="error">{error}</p>
        <Link to="/blogs">Back to Blog Post</Link>
      </div>
    );
  }
  if (!item) return <div className="blogs-page"><p className="muted">Loading...</p></div>;

  return (
    <div className="blogs-page">
      <Link to="/blogs">&larr; Back to Blog Post</Link>
      <div className="detail-card">
        <h1>{formatValue(item.title)}</h1>
        <p><span>content:</span> {formatValue(item.content)}</p>
        <p><span>published:</span> {formatValue(item.published)}</p>
        <p className="muted">Created {new Date(item.createdAt).toLocaleString()}</p>
        <div className="actions">
          <button className="btn" onClick={() => setEditing(!editing)}>{editing ? 'Cancel' : 'Edit'}</button>
          <button className="btn danger" onClick={handleDelete}>Delete</button>
        </div>
      </div>
      {editing && <BlogForm initial={item} onSubmit={handleUpdate} />}
    </div>
  );
}
