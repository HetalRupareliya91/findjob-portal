import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { savedJobApi } from '../../api/savedJobApi';
import SavedJobCard from '../../components/SavedJob/SavedJobCard';
import SavedJobMobileCard from '../../components/SavedJob/SavedJobMobileCard';
import SavedJobForm from '../../components/SavedJob/SavedJobForm';
import '../../styles/savedJob.css';
import '../../styles/mobile/savedJob.mobile.css';

export const route = '/saved-jobs';
export const title = 'Saved Job';

export default function SavedJobListPage() {
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
    savedJobApi
      .list({ page, search })
      .then((data) => {
        setItems(data.items);
        setPages(data.pages);
        setError('');
      })
      .catch((err) => setError(err.response?.data?.message || 'Failed to load Saved Job'))
      .finally(() => setLoading(false));
  };

  useEffect(load, [page, search]);

  const open = (item) => navigate('/saved-jobs/' + item._id);

  const handleCreate = async (payload) => {
    await savedJobApi.create(payload);
    setShowForm(false);
    load();
  };

  return (
    <div className="saved-jobs-page">
      <div className="page-header">
        <h1>Saved Job</h1>
        <button className="btn" onClick={() => setShowForm(!showForm)}>{showForm ? 'Close' : 'Add Saved Job'}</button>
      </div>

      {showForm && <SavedJobForm onSubmit={handleCreate} />}

      <input
        className="search"
        placeholder="Search Saved Job..."
        value={search}
        onChange={(ev) => {
          setPage(1);
          setSearch(ev.target.value);
        }}
      />

      {loading && <p className="muted">Loading...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && items.length === 0 && <p className="muted">No Saved Job found.</p>}

      <div className="saved-jobs-grid">
        {items.map((item) => <SavedJobCard key={item._id} item={item} onSelect={open} />)}
      </div>
      <div className="saved-jobs-mobile-list">
        {items.map((item) => <SavedJobMobileCard key={item._id} item={item} onSelect={open} />)}
      </div>

      <div className="pagination">
        <button className="btn outline" disabled={page <= 1} onClick={() => setPage(page - 1)}>Previous</button>
        <span>Page {page} of {pages}</span>
        <button className="btn outline" disabled={page >= pages} onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
}
