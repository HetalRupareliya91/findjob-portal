import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { experienceApi } from '../../api/experienceApi';
import ExperienceCard from '../../components/Experience/ExperienceCard';
import ExperienceMobileCard from '../../components/Experience/ExperienceMobileCard';
import ExperienceForm from '../../components/Experience/ExperienceForm';
import '../../styles/experience.css';
import '../../styles/mobile/experience.mobile.css';

export const route = '/experiences';
export const title = 'Experience';

export default function ExperienceListPage() {
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
    experienceApi
      .list({ page, search })
      .then((data) => {
        setItems(data.items);
        setPages(data.pages);
        setError('');
      })
      .catch((err) => setError(err.response?.data?.message || 'Failed to load Experience'))
      .finally(() => setLoading(false));
  };

  useEffect(load, [page, search]);

  const open = (item) => navigate('/experiences/' + item._id);

  const handleCreate = async (payload) => {
    await experienceApi.create(payload);
    setShowForm(false);
    load();
  };

  return (
    <div className="experiences-page">
      <div className="page-header">
        <h1>Experience</h1>
        <button className="btn" onClick={() => setShowForm(!showForm)}>{showForm ? 'Close' : 'Add Experience'}</button>
      </div>

      {showForm && <ExperienceForm onSubmit={handleCreate} />}

      <input
        className="search"
        placeholder="Search Experience..."
        value={search}
        onChange={(ev) => {
          setPage(1);
          setSearch(ev.target.value);
        }}
      />

      {loading && <p className="muted">Loading...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && items.length === 0 && <p className="muted">No Experience found.</p>}

      <div className="experiences-grid">
        {items.map((item) => <ExperienceCard key={item._id} item={item} onSelect={open} />)}
      </div>
      <div className="experiences-mobile-list">
        {items.map((item) => <ExperienceMobileCard key={item._id} item={item} onSelect={open} />)}
      </div>

      <div className="pagination">
        <button className="btn outline" disabled={page <= 1} onClick={() => setPage(page - 1)}>Previous</button>
        <span>Page {page} of {pages}</span>
        <button className="btn outline" disabled={page >= pages} onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
}
