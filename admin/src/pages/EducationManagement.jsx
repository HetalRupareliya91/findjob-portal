import { useEffect, useState } from 'react';
import { educationAdminApi } from '../api/educationAdminApi';
import EducationTable from '../components/EducationTable';

export const route = '/educations';
export const title = 'Education';

export default function EducationManagement() {
  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    educationAdminApi
      .list({ page, search, limit: 20 })
      .then((data) => {
        setRows(data.items);
        setTotal(data.total);
        setPages(data.pages);
        setError('');
      })
      .catch((err) => setError(err.response?.data?.message || 'Failed to load'))
      .finally(() => setLoading(false));
  };

  useEffect(load, [page, search]);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this Education record?')) return;
    try {
      await educationAdminApi.remove(id);
      load();
    } catch (err) {
      setError(err.response?.data?.message || 'Delete failed');
    }
  };

  return (
    <section>
      <div className="section-header">
        <h1>Education Management</h1>
        <span className="badge">{total} total</span>
      </div>
      <input
        className="search"
        placeholder="Search Education..."
        value={search}
        onChange={(ev) => {
          setPage(1);
          setSearch(ev.target.value);
        }}
      />
      {error && <p className="error">{error}</p>}
      {loading ? <p className="muted">Loading...</p> : <EducationTable rows={rows} onDelete={handleDelete} />}
      <div className="pagination">
        <button className="btn outline" disabled={page <= 1} onClick={() => setPage(page - 1)}>Previous</button>
        <span>Page {page} of {pages}</span>
        <button className="btn outline" disabled={page >= pages} onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </section>
  );
}
