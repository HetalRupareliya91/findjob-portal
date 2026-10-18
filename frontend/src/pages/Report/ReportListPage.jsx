import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { reportApi } from '../../api/reportApi';
import ReportCard from '../../components/Report/ReportCard';
import ReportMobileCard from '../../components/Report/ReportMobileCard';
import ReportForm from '../../components/Report/ReportForm';
import '../../styles/report.css';
import '../../styles/mobile/report.mobile.css';

export const route = '/reports';
export const title = 'Report';

export default function ReportListPage() {
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
    reportApi
      .list({ page, search })
      .then((data) => {
        setItems(data.items);
        setPages(data.pages);
        setError('');
      })
      .catch((err) => setError(err.response?.data?.message || 'Failed to load Report'))
      .finally(() => setLoading(false));
  };

  useEffect(load, [page, search]);

  const open = (item) => navigate('/reports/' + item._id);

  const handleCreate = async (payload) => {
    await reportApi.create(payload);
    setShowForm(false);
    load();
  };

  return (
    <div className="reports-page">
      <div className="page-header">
        <h1>Report</h1>
        <button className="btn" onClick={() => setShowForm(!showForm)}>{showForm ? 'Close' : 'Add Report'}</button>
      </div>

      {showForm && <ReportForm onSubmit={handleCreate} />}

      <input
        className="search"
        placeholder="Search Report..."
        value={search}
        onChange={(ev) => {
          setPage(1);
          setSearch(ev.target.value);
        }}
      />

      {loading && <p className="muted">Loading...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && items.length === 0 && <p className="muted">No Report found.</p>}

      <div className="reports-grid">
        {items.map((item) => <ReportCard key={item._id} item={item} onSelect={open} />)}
      </div>
      <div className="reports-mobile-list">
        {items.map((item) => <ReportMobileCard key={item._id} item={item} onSelect={open} />)}
      </div>

      <div className="pagination">
        <button className="btn outline" disabled={page <= 1} onClick={() => setPage(page - 1)}>Previous</button>
        <span>Page {page} of {pages}</span>
        <button className="btn outline" disabled={page >= pages} onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
}
