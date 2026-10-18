import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { locationApi } from '../../api/locationApi';
import LocationCard from '../../components/Location/LocationCard';
import LocationMobileCard from '../../components/Location/LocationMobileCard';
import LocationForm from '../../components/Location/LocationForm';
import '../../styles/location.css';
import '../../styles/mobile/location.mobile.css';

export const route = '/locations';
export const title = 'Location';

export default function LocationListPage() {
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
    locationApi
      .list({ page, search })
      .then((data) => {
        setItems(data.items);
        setPages(data.pages);
        setError('');
      })
      .catch((err) => setError(err.response?.data?.message || 'Failed to load Location'))
      .finally(() => setLoading(false));
  };

  useEffect(load, [page, search]);

  const open = (item) => navigate('/locations/' + item._id);

  const handleCreate = async (payload) => {
    await locationApi.create(payload);
    setShowForm(false);
    load();
  };

  return (
    <div className="locations-page">
      <div className="page-header">
        <h1>Location</h1>
        <button className="btn" onClick={() => setShowForm(!showForm)}>{showForm ? 'Close' : 'Add Location'}</button>
      </div>

      {showForm && <LocationForm onSubmit={handleCreate} />}

      <input
        className="search"
        placeholder="Search Location..."
        value={search}
        onChange={(ev) => {
          setPage(1);
          setSearch(ev.target.value);
        }}
      />

      {loading && <p className="muted">Loading...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && items.length === 0 && <p className="muted">No Location found.</p>}

      <div className="locations-grid">
        {items.map((item) => <LocationCard key={item._id} item={item} onSelect={open} />)}
      </div>
      <div className="locations-mobile-list">
        {items.map((item) => <LocationMobileCard key={item._id} item={item} onSelect={open} />)}
      </div>

      <div className="pagination">
        <button className="btn outline" disabled={page <= 1} onClick={() => setPage(page - 1)}>Previous</button>
        <span>Page {page} of {pages}</span>
        <button className="btn outline" disabled={page >= pages} onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
}
