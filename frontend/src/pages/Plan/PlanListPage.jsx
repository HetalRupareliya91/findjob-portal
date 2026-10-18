import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { planApi } from '../../api/planApi';
import PlanCard from '../../components/Plan/PlanCard';
import PlanMobileCard from '../../components/Plan/PlanMobileCard';
import PlanForm from '../../components/Plan/PlanForm';
import '../../styles/plan.css';
import '../../styles/mobile/plan.mobile.css';

export const route = '/plans';
export const title = 'Subscription Plan';

export default function PlanListPage() {
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
    planApi
      .list({ page, search })
      .then((data) => {
        setItems(data.items);
        setPages(data.pages);
        setError('');
      })
      .catch((err) => setError(err.response?.data?.message || 'Failed to load Subscription Plan'))
      .finally(() => setLoading(false));
  };

  useEffect(load, [page, search]);

  const open = (item) => navigate('/plans/' + item._id);

  const handleCreate = async (payload) => {
    await planApi.create(payload);
    setShowForm(false);
    load();
  };

  return (
    <div className="plans-page">
      <div className="page-header">
        <h1>Subscription Plan</h1>
        <button className="btn" onClick={() => setShowForm(!showForm)}>{showForm ? 'Close' : 'Add Subscription Plan'}</button>
      </div>

      {showForm && <PlanForm onSubmit={handleCreate} />}

      <input
        className="search"
        placeholder="Search Subscription Plan..."
        value={search}
        onChange={(ev) => {
          setPage(1);
          setSearch(ev.target.value);
        }}
      />

      {loading && <p className="muted">Loading...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && items.length === 0 && <p className="muted">No Subscription Plan found.</p>}

      <div className="plans-grid">
        {items.map((item) => <PlanCard key={item._id} item={item} onSelect={open} />)}
      </div>
      <div className="plans-mobile-list">
        {items.map((item) => <PlanMobileCard key={item._id} item={item} onSelect={open} />)}
      </div>

      <div className="pagination">
        <button className="btn outline" disabled={page <= 1} onClick={() => setPage(page - 1)}>Previous</button>
        <span>Page {page} of {pages}</span>
        <button className="btn outline" disabled={page >= pages} onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
}
