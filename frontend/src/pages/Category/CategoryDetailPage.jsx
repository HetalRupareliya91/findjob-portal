import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { categoryApi } from '../../api/categoryApi';
import CategoryForm from '../../components/Category/CategoryForm';
import '../../styles/category.css';
import '../../styles/mobile/category.mobile.css';

export const route = '/categories/:id';

const formatValue = (v) => {
  if (typeof v === 'boolean') return v ? 'Yes' : 'No';
  if (v === undefined || v === null || v === '') return '-';
  return String(v);
};

export default function CategoryDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    categoryApi.get(id).then(setItem).catch((err) => setError(err.response?.data?.message || 'Category not found'));
  }, [id]);

  const handleUpdate = async (payload) => {
    const updated = await categoryApi.update(id, payload);
    setItem(updated);
    setEditing(false);
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete this Category?')) return;
    try {
      await categoryApi.remove(id);
      navigate('/categories');
    } catch (err) {
      setError(err.response?.data?.message || 'Delete failed');
    }
  };

  if (error) {
    return (
      <div className="categories-page">
        <p className="error">{error}</p>
        <Link to="/categories">Back to Category</Link>
      </div>
    );
  }
  if (!item) return <div className="categories-page"><p className="muted">Loading...</p></div>;

  return (
    <div className="categories-page">
      <Link to="/categories">&larr; Back to Category</Link>
      <div className="detail-card">
        <h1>{formatValue(item.name)}</h1>
        <p><span>slug:</span> {formatValue(item.slug)}</p>
        <p><span>description:</span> {formatValue(item.description)}</p>
        <p className="muted">Created {new Date(item.createdAt).toLocaleString()}</p>
        <div className="actions">
          <button className="btn" onClick={() => setEditing(!editing)}>{editing ? 'Cancel' : 'Edit'}</button>
          <button className="btn danger" onClick={handleDelete}>Delete</button>
        </div>
      </div>
      {editing && <CategoryForm initial={item} onSubmit={handleUpdate} />}
    </div>
  );
}
