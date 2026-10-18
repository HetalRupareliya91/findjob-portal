import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { candidateApi } from '../../api/candidateApi';
import CandidateCard from '../../components/Candidate/CandidateCard';
import CandidateMobileCard from '../../components/Candidate/CandidateMobileCard';
import CandidateForm from '../../components/Candidate/CandidateForm';
import '../../styles/candidate.css';
import '../../styles/mobile/candidate.mobile.css';

export const route = '/candidates';
export const title = 'Candidate';

export default function CandidateListPage() {
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
    candidateApi
      .list({ page, search })
      .then((data) => {
        setItems(data.items);
        setPages(data.pages);
        setError('');
      })
      .catch((err) => setError(err.response?.data?.message || 'Failed to load Candidate'))
      .finally(() => setLoading(false));
  };

  useEffect(load, [page, search]);

  const open = (item) => navigate('/candidates/' + item._id);

  const handleCreate = async (payload) => {
    await candidateApi.create(payload);
    setShowForm(false);
    load();
  };

  return (
    <div className="candidates-page">
      <div className="page-header">
        <h1>Candidate</h1>
        <button className="btn" onClick={() => setShowForm(!showForm)}>{showForm ? 'Close' : 'Add Candidate'}</button>
      </div>

      {showForm && <CandidateForm onSubmit={handleCreate} />}

      <input
        className="search"
        placeholder="Search Candidate..."
        value={search}
        onChange={(ev) => {
          setPage(1);
          setSearch(ev.target.value);
        }}
      />

      {loading && <p className="muted">Loading...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && items.length === 0 && <p className="muted">No Candidate found.</p>}

      <div className="candidates-grid">
        {items.map((item) => <CandidateCard key={item._id} item={item} onSelect={open} />)}
      </div>
      <div className="candidates-mobile-list">
        {items.map((item) => <CandidateMobileCard key={item._id} item={item} onSelect={open} />)}
      </div>

      <div className="pagination">
        <button className="btn outline" disabled={page <= 1} onClick={() => setPage(page - 1)}>Previous</button>
        <span>Page {page} of {pages}</span>
        <button className="btn outline" disabled={page >= pages} onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
}
