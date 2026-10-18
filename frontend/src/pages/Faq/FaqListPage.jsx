import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { faqApi } from '../../api/faqApi';
import FaqCard from '../../components/Faq/FaqCard';
import FaqMobileCard from '../../components/Faq/FaqMobileCard';
import FaqForm from '../../components/Faq/FaqForm';
import '../../styles/faq.css';
import '../../styles/mobile/faq.mobile.css';

export const route = '/faqs';
export const title = 'FAQ';

export default function FaqListPage() {
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
    faqApi
      .list({ page, search })
      .then((data) => {
        setItems(data.items);
        setPages(data.pages);
        setError('');
      })
      .catch((err) => setError(err.response?.data?.message || 'Failed to load FAQ'))
      .finally(() => setLoading(false));
  };

  useEffect(load, [page, search]);

  const open = (item) => navigate('/faqs/' + item._id);

  const handleCreate = async (payload) => {
    await faqApi.create(payload);
    setShowForm(false);
    load();
  };

  return (
    <div className="faqs-page">
      <div className="page-header">
        <h1>FAQ</h1>
        <button className="btn" onClick={() => setShowForm(!showForm)}>{showForm ? 'Close' : 'Add FAQ'}</button>
      </div>

      {showForm && <FaqForm onSubmit={handleCreate} />}

      <input
        className="search"
        placeholder="Search FAQ..."
        value={search}
        onChange={(ev) => {
          setPage(1);
          setSearch(ev.target.value);
        }}
      />

      {loading && <p className="muted">Loading...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && items.length === 0 && <p className="muted">No FAQ found.</p>}

      <div className="faqs-grid">
        {items.map((item) => <FaqCard key={item._id} item={item} onSelect={open} />)}
      </div>
      <div className="faqs-mobile-list">
        {items.map((item) => <FaqMobileCard key={item._id} item={item} onSelect={open} />)}
      </div>

      <div className="pagination">
        <button className="btn outline" disabled={page <= 1} onClick={() => setPage(page - 1)}>Previous</button>
        <span>Page {page} of {pages}</span>
        <button className="btn outline" disabled={page >= pages} onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
}
