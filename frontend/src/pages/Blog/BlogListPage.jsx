import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { blogApi } from '../../api/blogApi';
import BlogCard from '../../components/Blog/BlogCard';
import BlogMobileCard from '../../components/Blog/BlogMobileCard';
import BlogForm from '../../components/Blog/BlogForm';
import '../../styles/blog.css';
import '../../styles/mobile/blog.mobile.css';

export const route = '/blogs';
export const title = 'Blog Post';

export default function BlogListPage() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const load = () => {
    setLoading(true);
    blogApi
      .list({ page, search })
      .then((data) => {
        setItems(data.items);
        setPages(data.pages);
        setError('');
      })
      .catch((err) => setError(err.response?.data?.message || 'Failed to load Blog Post'))
      .finally(() => setLoading(false));
  };

  useEffect(load, [page, search]);

  const open = (item) => navigate('/blogs/' + item._id);

  const handleCreate = async (payload) => {
    await blogApi.create(payload);
    setShowForm(false);
    load();
  };

  return (
    <div className="blogs-page">
      <div className="page-header">
        <h1>Blog Post</h1>
        <button className="btn" onClick={() => setShowForm(!showForm)}>{showForm ? 'Close' : 'Add Blog Post'}</button>
      </div>

      {showForm && <BlogForm onSubmit={handleCreate} />}

      <input
        className="search"
        placeholder="Search Blog Post..."
        value={search}
        onChange={(ev) => {
          setPage(1);
          setSearch(ev.target.value);
        }}
      />

      {loading && <p className="muted">Loading...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && items.length === 0 && <p className="muted">No Blog Post found.</p>}

      <div className="blogs-grid">
        {items.map((item) => <BlogCard key={item._id} item={item} onSelect={open} />)}
      </div>
      <div className="blogs-mobile-list">
        {items.map((item) => <BlogMobileCard key={item._id} item={item} onSelect={open} />)}
      </div>

      <div className="pagination">
        <button className="btn outline" disabled={page <= 1} onClick={() => setPage(page - 1)}>Previous</button>
        <span>Page {page} of {pages}</span>
        <button className="btn outline" disabled={page >= pages} onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
}
