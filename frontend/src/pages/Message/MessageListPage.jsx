import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { messageApi } from '../../api/messageApi';
import MessageCard from '../../components/Message/MessageCard';
import MessageMobileCard from '../../components/Message/MessageMobileCard';
import MessageForm from '../../components/Message/MessageForm';
import '../../styles/message.css';
import '../../styles/mobile/message.mobile.css';

export const route = '/messages';
export const title = 'Message';

export default function MessageListPage() {
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
    messageApi
      .list({ page, search })
      .then((data) => {
        setItems(data.items);
        setPages(data.pages);
        setError('');
      })
      .catch((err) => setError(err.response?.data?.message || 'Failed to load Message'))
      .finally(() => setLoading(false));
  };

  useEffect(load, [page, search]);

  const open = (item) => navigate('/messages/' + item._id);

  const handleCreate = async (payload) => {
    await messageApi.create(payload);
    setShowForm(false);
    load();
  };

  return (
    <div className="messages-page">
      <div className="page-header">
        <h1>Message</h1>
        <button className="btn" onClick={() => setShowForm(!showForm)}>{showForm ? 'Close' : 'Add Message'}</button>
      </div>

      {showForm && <MessageForm onSubmit={handleCreate} />}

      <input
        className="search"
        placeholder="Search Message..."
        value={search}
        onChange={(ev) => {
          setPage(1);
          setSearch(ev.target.value);
        }}
      />

      {loading && <p className="muted">Loading...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && items.length === 0 && <p className="muted">No Message found.</p>}

      <div className="messages-grid">
        {items.map((item) => <MessageCard key={item._id} item={item} onSelect={open} />)}
      </div>
      <div className="messages-mobile-list">
        {items.map((item) => <MessageMobileCard key={item._id} item={item} onSelect={open} />)}
      </div>

      <div className="pagination">
        <button className="btn outline" disabled={page <= 1} onClick={() => setPage(page - 1)}>Previous</button>
        <span>Page {page} of {pages}</span>
        <button className="btn outline" disabled={page >= pages} onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
}
