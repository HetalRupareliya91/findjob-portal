import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { categoryApi } from '../../api/categoryApi';
import CategoryCard from '../../components/Category/CategoryCard';
import CategoryMobileCard from '../../components/Category/CategoryMobileCard';
import CategoryForm from '../../components/Category/CategoryForm';
import '../../styles/category.css';
import '../../styles/mobile/category.mobile.css';

export const route = '/categories';
export const title = 'Category';

export default function CategoryListPage() {
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
    categoryApi
      .list({ page, search })
      .then((data) => {
        setItems(data.items);
        setPages(data.pages);
        setError('');
      })
      .catch((err) => setError(err.response?.data?.message || 'Failed to load Category'))
      .finally(() => setLoading(false));
  };

  useEffect(load, [page, search]);

  const open = (item) => navigate('/categories/' + item._id);

  const handleCreate = async (payload) => {
    await categoryApi.create(payload);
    setShowForm(false);
    load();
  };

  return (
    <div className="categories-page">
      <div className="page-header">
        <h1>Category</h1>
        <button className="btn" onClick={() => setShowForm(!showForm)}>{showForm ? 'Close' : 'Add Category'}</button>
      </div>

      {showForm && <CategoryForm onSubmit={handleCreate} />}

      <input
        className="search"
        placeholder="Search Category..."
        value={search}
        onChange={(ev) => {
          setPage(1);
          setSearch(ev.target.value);
        }}
      />

      {loading && <p className="muted">Loading...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && items.length === 0 && <p className="muted">No Category found.</p>}

      <div className="categories-grid">
        {items.map((item) => <CategoryCard key={item._id} item={item} onSelect={open} />)}
      </div>
      <div className="categories-mobile-list">
        {items.map((item) => <CategoryMobileCard key={item._id} item={item} onSelect={open} />)}
      </div>

      <div className="pagination">
        <button className="btn outline" disabled={page <= 1} onClick={() => setPage(page - 1)}>Previous</button>
        <span>Page {page} of {pages}</span>
        <button className="btn outline" disabled={page >= pages} onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
}
