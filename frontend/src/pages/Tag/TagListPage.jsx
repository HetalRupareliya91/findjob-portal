import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { tagApi } from '../../api/tagApi';
import TagCard from '../../components/Tag/TagCard';
import TagMobileCard from '../../components/Tag/TagMobileCard';
import TagForm from '../../components/Tag/TagForm';
import '../../styles/tag.css';
import '../../styles/mobile/tag.mobile.css';

export const route = '/tags';
export const title = 'Tag';

export default function TagListPage() {
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
    tagApi
      .list({ page, search })
      .then((data) => {
        setItems(data.items);
        setPages(data.pages);
        setError('');
      })
      .catch((err) => setError(err.response?.data?.message || 'Failed to load Tag'))
      .finally(() => setLoading(false));
  };

  useEffect(load, [page, search]);

  const open = (item) => navigate('/tags/' + item._id);

  const handleCreate = async (payload) => {
    await tagApi.create(payload);
    setShowForm(false);
    load();
  };

  return (
    <div className="tags-page">
      <div className="page-header">
        <h1>Tag</h1>
        <button className="btn" onClick={() => setShowForm(!showForm)}>{showForm ? 'Close' : 'Add Tag'}</button>
      </div>

      {showForm && <TagForm onSubmit={handleCreate} />}

      <input
        className="search"
        placeholder="Search Tag..."
        value={search}
        onChange={(ev) => {
          setPage(1);
          setSearch(ev.target.value);
        }}
      />

      {loading && <p className="muted">Loading...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && items.length === 0 && <p className="muted">No Tag found.</p>}

      <div className="tags-grid">
        {items.map((item) => <TagCard key={item._id} item={item} onSelect={open} />)}
      </div>
      <div className="tags-mobile-list">
        {items.map((item) => <TagMobileCard key={item._id} item={item} onSelect={open} />)}
      </div>

      <div className="pagination">
        <button className="btn outline" disabled={page <= 1} onClick={() => setPage(page - 1)}>Previous</button>
        <span>Page {page} of {pages}</span>
        <button className="btn outline" disabled={page >= pages} onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
}
