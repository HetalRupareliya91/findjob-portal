import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { resumeApi } from '../../api/resumeApi';
import ResumeCard from '../../components/Resume/ResumeCard';
import ResumeMobileCard from '../../components/Resume/ResumeMobileCard';
import ResumeForm from '../../components/Resume/ResumeForm';
import '../../styles/resume.css';
import '../../styles/mobile/resume.mobile.css';

export const route = '/resumes';
export const title = 'Resume';

export default function ResumeListPage() {
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
    resumeApi
      .list({ page, search })
      .then((data) => {
        setItems(data.items);
        setPages(data.pages);
        setError('');
      })
      .catch((err) => setError(err.response?.data?.message || 'Failed to load Resume'))
      .finally(() => setLoading(false));
  };

  useEffect(load, [page, search]);

  const open = (item) => navigate('/resumes/' + item._id);

  const handleCreate = async (payload) => {
    await resumeApi.create(payload);
    setShowForm(false);
    load();
  };

  return (
    <div className="resumes-page">
      <div className="page-header">
        <h1>Resume</h1>
        <button className="btn" onClick={() => setShowForm(!showForm)}>{showForm ? 'Close' : 'Add Resume'}</button>
      </div>

      {showForm && <ResumeForm onSubmit={handleCreate} />}

      <input
        className="search"
        placeholder="Search Resume..."
        value={search}
        onChange={(ev) => {
          setPage(1);
          setSearch(ev.target.value);
        }}
      />

      {loading && <p className="muted">Loading...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && items.length === 0 && <p className="muted">No Resume found.</p>}

      <div className="resumes-grid">
        {items.map((item) => <ResumeCard key={item._id} item={item} onSelect={open} />)}
      </div>
      <div className="resumes-mobile-list">
        {items.map((item) => <ResumeMobileCard key={item._id} item={item} onSelect={open} />)}
      </div>

      <div className="pagination">
        <button className="btn outline" disabled={page <= 1} onClick={() => setPage(page - 1)}>Previous</button>
        <span>Page {page} of {pages}</span>
        <button className="btn outline" disabled={page >= pages} onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
}
