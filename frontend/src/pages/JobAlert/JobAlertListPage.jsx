import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jobAlertApi } from '../../api/jobAlertApi';
import JobAlertCard from '../../components/JobAlert/JobAlertCard';
import JobAlertMobileCard from '../../components/JobAlert/JobAlertMobileCard';
import JobAlertForm from '../../components/JobAlert/JobAlertForm';
import '../../styles/jobAlert.css';
import '../../styles/mobile/jobAlert.mobile.css';

export const route = '/job-alerts';
export const title = 'Job Alert';

export default function JobAlertListPage() {
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
    jobAlertApi
      .list({ page, search })
      .then((data) => {
        setItems(data.items);
        setPages(data.pages);
        setError('');
      })
      .catch((err) => setError(err.response?.data?.message || 'Failed to load Job Alert'))
      .finally(() => setLoading(false));
  };

  useEffect(load, [page, search]);

  const open = (item) => navigate('/job-alerts/' + item._id);

  const handleCreate = async (payload) => {
    await jobAlertApi.create(payload);
    setShowForm(false);
    load();
  };

  return (
    <div className="job-alerts-page">
      <div className="page-header">
        <h1>Job Alert</h1>
        <button className="btn" onClick={() => setShowForm(!showForm)}>{showForm ? 'Close' : 'Add Job Alert'}</button>
      </div>

      {showForm && <JobAlertForm onSubmit={handleCreate} />}

      <input
        className="search"
        placeholder="Search Job Alert..."
        value={search}
        onChange={(ev) => {
          setPage(1);
          setSearch(ev.target.value);
        }}
      />

      {loading && <p className="muted">Loading...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && items.length === 0 && <p className="muted">No Job Alert found.</p>}

      <div className="job-alerts-grid">
        {items.map((item) => <JobAlertCard key={item._id} item={item} onSelect={open} />)}
      </div>
      <div className="job-alerts-mobile-list">
        {items.map((item) => <JobAlertMobileCard key={item._id} item={item} onSelect={open} />)}
      </div>

      <div className="pagination">
        <button className="btn outline" disabled={page <= 1} onClick={() => setPage(page - 1)}>Previous</button>
        <span>Page {page} of {pages}</span>
        <button className="btn outline" disabled={page >= pages} onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
}
