import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jobApi } from '../../api/jobApi';
import JobCard from '../../components/Job/JobCard';
import JobMobileCard from '../../components/Job/JobMobileCard';
import JobForm from '../../components/Job/JobForm';
import '../../styles/job.css';
import '../../styles/mobile/job.mobile.css';

export const route = '/jobs';
export const title = 'Job';

export default function JobListPage() {
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
    jobApi
      .list({ page, search })
      .then((data) => {
        setItems(data.items);
        setPages(data.pages);
        setError('');
      })
      .catch((err) => setError(err.response?.data?.message || 'Failed to load Job'))
      .finally(() => setLoading(false));
  };

  useEffect(load, [page, search]);

  const open = (item) => navigate('/jobs/' + item._id);

  const handleCreate = async (payload) => {
    await jobApi.create(payload);
    setShowForm(false);
    load();
  };

  return (
    <div className="jobs-page">
      <div className="page-header">
        <h1>Job</h1>
        <button className="btn" onClick={() => setShowForm(!showForm)}>{showForm ? 'Close' : 'Add Job'}</button>
      </div>

      {showForm && <JobForm onSubmit={handleCreate} />}

      <input
        className="search"
        placeholder="Search Job..."
        value={search}
        onChange={(ev) => {
          setPage(1);
          setSearch(ev.target.value);
        }}
      />

      {loading && <p className="muted">Loading...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && items.length === 0 && <p className="muted">No Job found.</p>}

      <div className="jobs-grid">
        {items.map((item) => <JobCard key={item._id} item={item} onSelect={open} />)}
      </div>
      <div className="jobs-mobile-list">
        {items.map((item) => <JobMobileCard key={item._id} item={item} onSelect={open} />)}
      </div>

      <div className="pagination">
        <button className="btn outline" disabled={page <= 1} onClick={() => setPage(page - 1)}>Previous</button>
        <span>Page {page} of {pages}</span>
        <button className="btn outline" disabled={page >= pages} onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
}
