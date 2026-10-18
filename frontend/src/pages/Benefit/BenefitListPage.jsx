import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { benefitApi } from '../../api/benefitApi';
import BenefitCard from '../../components/Benefit/BenefitCard';
import BenefitMobileCard from '../../components/Benefit/BenefitMobileCard';
import BenefitForm from '../../components/Benefit/BenefitForm';
import '../../styles/benefit.css';
import '../../styles/mobile/benefit.mobile.css';

export const route = '/benefits';
export const title = 'Benefit';

export default function BenefitListPage() {
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
    benefitApi
      .list({ page, search })
      .then((data) => {
        setItems(data.items);
        setPages(data.pages);
        setError('');
      })
      .catch((err) => setError(err.response?.data?.message || 'Failed to load Benefit'))
      .finally(() => setLoading(false));
  };

  useEffect(load, [page, search]);

  const open = (item) => navigate('/benefits/' + item._id);

  const handleCreate = async (payload) => {
    await benefitApi.create(payload);
    setShowForm(false);
    load();
  };

  return (
    <div className="benefits-page">
      <div className="page-header">
        <h1>Benefit</h1>
        <button className="btn" onClick={() => setShowForm(!showForm)}>{showForm ? 'Close' : 'Add Benefit'}</button>
      </div>

      {showForm && <BenefitForm onSubmit={handleCreate} />}

      <input
        className="search"
        placeholder="Search Benefit..."
        value={search}
        onChange={(ev) => {
          setPage(1);
          setSearch(ev.target.value);
        }}
      />

      {loading && <p className="muted">Loading...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && items.length === 0 && <p className="muted">No Benefit found.</p>}

      <div className="benefits-grid">
        {items.map((item) => <BenefitCard key={item._id} item={item} onSelect={open} />)}
      </div>
      <div className="benefits-mobile-list">
        {items.map((item) => <BenefitMobileCard key={item._id} item={item} onSelect={open} />)}
      </div>

      <div className="pagination">
        <button className="btn outline" disabled={page <= 1} onClick={() => setPage(page - 1)}>Previous</button>
        <span>Page {page} of {pages}</span>
        <button className="btn outline" disabled={page >= pages} onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
}
