import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { employerApi } from '../../api/employerApi';
import EmployerCard from '../../components/Employer/EmployerCard';
import EmployerMobileCard from '../../components/Employer/EmployerMobileCard';
import EmployerForm from '../../components/Employer/EmployerForm';
import '../../styles/employer.css';
import '../../styles/mobile/employer.mobile.css';

export const route = '/employers';
export const title = 'Employer';

export default function EmployerListPage() {
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
    employerApi
      .list({ page, search })
      .then((data) => {
        setItems(data.items);
        setPages(data.pages);
        setError('');
      })
      .catch((err) => setError(err.response?.data?.message || 'Failed to load Employer'))
      .finally(() => setLoading(false));
  };

  useEffect(load, [page, search]);

  const open = (item) => navigate('/employers/' + item._id);

  const handleCreate = async (payload) => {
    await employerApi.create(payload);
    setShowForm(false);
    load();
  };

  return (
    <div className="employers-page">
      <div className="page-header">
        <h1>Employer</h1>
        <button className="btn" onClick={() => setShowForm(!showForm)}>{showForm ? 'Close' : 'Add Employer'}</button>
      </div>

      {showForm && <EmployerForm onSubmit={handleCreate} />}

      <input
        className="search"
        placeholder="Search Employer..."
        value={search}
        onChange={(ev) => {
          setPage(1);
          setSearch(ev.target.value);
        }}
      />

      {loading && <p className="muted">Loading...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && items.length === 0 && <p className="muted">No Employer found.</p>}

      <div className="employers-grid">
        {items.map((item) => <EmployerCard key={item._id} item={item} onSelect={open} />)}
      </div>
      <div className="employers-mobile-list">
        {items.map((item) => <EmployerMobileCard key={item._id} item={item} onSelect={open} />)}
      </div>

      <div className="pagination">
        <button className="btn outline" disabled={page <= 1} onClick={() => setPage(page - 1)}>Previous</button>
        <span>Page {page} of {pages}</span>
        <button className="btn outline" disabled={page >= pages} onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
}
