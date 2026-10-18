import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { companyApi } from '../../api/companyApi';
import CompanyCard from '../../components/Company/CompanyCard';
import CompanyMobileCard from '../../components/Company/CompanyMobileCard';
import CompanyForm from '../../components/Company/CompanyForm';
import '../../styles/company.css';
import '../../styles/mobile/company.mobile.css';

export const route = '/companies';
export const title = 'Company';

export default function CompanyListPage() {
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
    companyApi
      .list({ page, search })
      .then((data) => {
        setItems(data.items);
        setPages(data.pages);
        setError('');
      })
      .catch((err) => setError(err.response?.data?.message || 'Failed to load Company'))
      .finally(() => setLoading(false));
  };

  useEffect(load, [page, search]);

  const open = (item) => navigate('/companies/' + item._id);

  const handleCreate = async (payload) => {
    await companyApi.create(payload);
    setShowForm(false);
    load();
  };

  return (
    <div className="companies-page">
      <div className="page-header">
        <h1>Company</h1>
        <button className="btn" onClick={() => setShowForm(!showForm)}>{showForm ? 'Close' : 'Add Company'}</button>
      </div>

      {showForm && <CompanyForm onSubmit={handleCreate} />}

      <input
        className="search"
        placeholder="Search Company..."
        value={search}
        onChange={(ev) => {
          setPage(1);
          setSearch(ev.target.value);
        }}
      />

      {loading && <p className="muted">Loading...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && items.length === 0 && <p className="muted">No Company found.</p>}

      <div className="companies-grid">
        {items.map((item) => <CompanyCard key={item._id} item={item} onSelect={open} />)}
      </div>
      <div className="companies-mobile-list">
        {items.map((item) => <CompanyMobileCard key={item._id} item={item} onSelect={open} />)}
      </div>

      <div className="pagination">
        <button className="btn outline" disabled={page <= 1} onClick={() => setPage(page - 1)}>Previous</button>
        <span>Page {page} of {pages}</span>
        <button className="btn outline" disabled={page >= pages} onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
}
