import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { interviewApi } from '../../api/interviewApi';
import InterviewCard from '../../components/Interview/InterviewCard';
import InterviewMobileCard from '../../components/Interview/InterviewMobileCard';
import InterviewForm from '../../components/Interview/InterviewForm';
import '../../styles/interview.css';
import '../../styles/mobile/interview.mobile.css';

export const route = '/interviews';
export const title = 'Interview';

export default function InterviewListPage() {
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
    interviewApi
      .list({ page, search })
      .then((data) => {
        setItems(data.items);
        setPages(data.pages);
        setError('');
      })
      .catch((err) => setError(err.response?.data?.message || 'Failed to load Interview'))
      .finally(() => setLoading(false));
  };

  useEffect(load, [page, search]);

  const open = (item) => navigate('/interviews/' + item._id);

  const handleCreate = async (payload) => {
    await interviewApi.create(payload);
    setShowForm(false);
    load();
  };

  return (
    <div className="interviews-page">
      <div className="page-header">
        <h1>Interview</h1>
        <button className="btn" onClick={() => setShowForm(!showForm)}>{showForm ? 'Close' : 'Add Interview'}</button>
      </div>

      {showForm && <InterviewForm onSubmit={handleCreate} />}

      <input
        className="search"
        placeholder="Search Interview..."
        value={search}
        onChange={(ev) => {
          setPage(1);
          setSearch(ev.target.value);
        }}
      />

      {loading && <p className="muted">Loading...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && items.length === 0 && <p className="muted">No Interview found.</p>}

      <div className="interviews-grid">
        {items.map((item) => <InterviewCard key={item._id} item={item} onSelect={open} />)}
      </div>
      <div className="interviews-mobile-list">
        {items.map((item) => <InterviewMobileCard key={item._id} item={item} onSelect={open} />)}
      </div>

      <div className="pagination">
        <button className="btn outline" disabled={page <= 1} onClick={() => setPage(page - 1)}>Previous</button>
        <span>Page {page} of {pages}</span>
        <button className="btn outline" disabled={page >= pages} onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
}
