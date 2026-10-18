import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { educationApi } from '../../api/educationApi';
import EducationCard from '../../components/Education/EducationCard';
import EducationMobileCard from '../../components/Education/EducationMobileCard';
import EducationForm from '../../components/Education/EducationForm';
import '../../styles/education.css';
import '../../styles/mobile/education.mobile.css';

export const route = '/educations';
export const title = 'Education';

export default function EducationListPage() {
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
    educationApi
      .list({ page, search })
      .then((data) => {
        setItems(data.items);
        setPages(data.pages);
        setError('');
      })
      .catch((err) => setError(err.response?.data?.message || 'Failed to load Education'))
      .finally(() => setLoading(false));
  };

  useEffect(load, [page, search]);

  const open = (item) => navigate('/educations/' + item._id);

  const handleCreate = async (payload) => {
    await educationApi.create(payload);
    setShowForm(false);
    load();
  };

  return (
    <div className="educations-page">
      <div className="page-header">
        <h1>Education</h1>
        <button className="btn" onClick={() => setShowForm(!showForm)}>{showForm ? 'Close' : 'Add Education'}</button>
      </div>

      {showForm && <EducationForm onSubmit={handleCreate} />}

      <input
        className="search"
        placeholder="Search Education..."
        value={search}
        onChange={(ev) => {
          setPage(1);
          setSearch(ev.target.value);
        }}
      />

      {loading && <p className="muted">Loading...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && items.length === 0 && <p className="muted">No Education found.</p>}

      <div className="educations-grid">
        {items.map((item) => <EducationCard key={item._id} item={item} onSelect={open} />)}
      </div>
      <div className="educations-mobile-list">
        {items.map((item) => <EducationMobileCard key={item._id} item={item} onSelect={open} />)}
      </div>

      <div className="pagination">
        <button className="btn outline" disabled={page <= 1} onClick={() => setPage(page - 1)}>Previous</button>
        <span>Page {page} of {pages}</span>
        <button className="btn outline" disabled={page >= pages} onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
}
