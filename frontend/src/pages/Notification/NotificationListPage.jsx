import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { notificationApi } from '../../api/notificationApi';
import NotificationCard from '../../components/Notification/NotificationCard';
import NotificationMobileCard from '../../components/Notification/NotificationMobileCard';
import NotificationForm from '../../components/Notification/NotificationForm';
import '../../styles/notification.css';
import '../../styles/mobile/notification.mobile.css';

export const route = '/notifications';
export const title = 'Notification';

export default function NotificationListPage() {
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
    notificationApi
      .list({ page, search })
      .then((data) => {
        setItems(data.items);
        setPages(data.pages);
        setError('');
      })
      .catch((err) => setError(err.response?.data?.message || 'Failed to load Notification'))
      .finally(() => setLoading(false));
  };

  useEffect(load, [page, search]);

  const open = (item) => navigate('/notifications/' + item._id);

  const handleCreate = async (payload) => {
    await notificationApi.create(payload);
    setShowForm(false);
    load();
  };

  return (
    <div className="notifications-page">
      <div className="page-header">
        <h1>Notification</h1>
        <button className="btn" onClick={() => setShowForm(!showForm)}>{showForm ? 'Close' : 'Add Notification'}</button>
      </div>

      {showForm && <NotificationForm onSubmit={handleCreate} />}

      <input
        className="search"
        placeholder="Search Notification..."
        value={search}
        onChange={(ev) => {
          setPage(1);
          setSearch(ev.target.value);
        }}
      />

      {loading && <p className="muted">Loading...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && items.length === 0 && <p className="muted">No Notification found.</p>}

      <div className="notifications-grid">
        {items.map((item) => <NotificationCard key={item._id} item={item} onSelect={open} />)}
      </div>
      <div className="notifications-mobile-list">
        {items.map((item) => <NotificationMobileCard key={item._id} item={item} onSelect={open} />)}
      </div>

      <div className="pagination">
        <button className="btn outline" disabled={page <= 1} onClick={() => setPage(page - 1)}>Previous</button>
        <span>Page {page} of {pages}</span>
        <button className="btn outline" disabled={page >= pages} onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
}
