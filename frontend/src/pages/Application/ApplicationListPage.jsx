import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { applicationApi } from '../../api/applicationApi';
import ApplicationCard from '../../components/Application/ApplicationCard';
import ApplicationMobileCard from '../../components/Application/ApplicationMobileCard';
import ApplicationForm from '../../components/Application/ApplicationForm';
import '../../styles/application.css';
import '../../styles/mobile/application.mobile.css';

export const route = '/applications';
export const title = 'Application';

export default function ApplicationListPage() {
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
    applicationApi
      .list({ page, search })
      .then((data) => {
        setItems(data.items);
        setPages(data.pages);
        setError('');
      })
      .catch((err) => setError(err.response?.data?.message || 'Failed to load Application'))
      .finally(() => setLoading(false));
  };

  useEffect(load, [page, search]);

  const open = (item) => navigate('/applications/' + item._id);

  const handleCreate = async (payload) => {
    await applicationApi.create(payload);
    setShowForm(false);
    load();
  };

  return (
    <div className="applications-page">
      <div className="page-header">
        <h1>Application</h1>
        <button className="btn" onClick={() => setShowForm(!showForm)}>{showForm ? 'Close' : 'Add Application'}</button>
      </div>

      {showForm && <ApplicationForm onSubmit={handleCreate} />}

      <input
        className="search"
        placeholder="Search Application..."
        value={search}
        onChange={(ev) => {
          setPage(1);
          setSearch(ev.target.value);
        }}
      />

      {loading && <p className="muted">Loading...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && items.length === 0 && <p className="muted">No Application found.</p>}

      <div className="applications-grid">
        {items.map((item) => <ApplicationCard key={item._id} item={item} onSelect={open} />)}
      </div>
      <div className="applications-mobile-list">
        {items.map((item) => <ApplicationMobileCard key={item._id} item={item} onSelect={open} />)}
      </div>

      <div className="pagination">
        <button className="btn outline" disabled={page <= 1} onClick={() => setPage(page - 1)}>Previous</button>
        <span>Page {page} of {pages}</span>
        <button className="btn outline" disabled={page >= pages} onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
}
