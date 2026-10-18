import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { contactApi } from '../../api/contactApi';
import ContactCard from '../../components/Contact/ContactCard';
import ContactMobileCard from '../../components/Contact/ContactMobileCard';
import ContactForm from '../../components/Contact/ContactForm';
import '../../styles/contact.css';
import '../../styles/mobile/contact.mobile.css';

export const route = '/contacts';
export const title = 'Contact Request';

export default function ContactListPage() {
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
    contactApi
      .list({ page, search })
      .then((data) => {
        setItems(data.items);
        setPages(data.pages);
        setError('');
      })
      .catch((err) => setError(err.response?.data?.message || 'Failed to load Contact Request'))
      .finally(() => setLoading(false));
  };

  useEffect(load, [page, search]);

  const open = (item) => navigate('/contacts/' + item._id);

  const handleCreate = async (payload) => {
    await contactApi.create(payload);
    setShowForm(false);
    load();
  };

  return (
    <div className="contacts-page">
      <div className="page-header">
        <h1>Contact Request</h1>
        <button className="btn" onClick={() => setShowForm(!showForm)}>{showForm ? 'Close' : 'Add Contact Request'}</button>
      </div>

      {showForm && <ContactForm onSubmit={handleCreate} />}

      <input
        className="search"
        placeholder="Search Contact Request..."
        value={search}
        onChange={(ev) => {
          setPage(1);
          setSearch(ev.target.value);
        }}
      />

      {loading && <p className="muted">Loading...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && items.length === 0 && <p className="muted">No Contact Request found.</p>}

      <div className="contacts-grid">
        {items.map((item) => <ContactCard key={item._id} item={item} onSelect={open} />)}
      </div>
      <div className="contacts-mobile-list">
        {items.map((item) => <ContactMobileCard key={item._id} item={item} onSelect={open} />)}
      </div>

      <div className="pagination">
        <button className="btn outline" disabled={page <= 1} onClick={() => setPage(page - 1)}>Previous</button>
        <span>Page {page} of {pages}</span>
        <button className="btn outline" disabled={page >= pages} onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
}
