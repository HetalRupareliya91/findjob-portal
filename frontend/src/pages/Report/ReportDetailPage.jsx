import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { reportApi } from '../../api/reportApi';
import ReportForm from '../../components/Report/ReportForm';
import '../../styles/report.css';
import '../../styles/mobile/report.mobile.css';

export const route = '/reports/:id';

const formatValue = (v) => {
  if (typeof v === 'boolean') return v ? 'Yes' : 'No';
  if (v === undefined || v === null || v === '') return '-';
  return String(v);
};

export default function ReportDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    reportApi.get(id).then(setItem).catch((err) => setError(err.response?.data?.message || 'Report not found'));
  }, [id]);

  const handleUpdate = async (payload) => {
    const updated = await reportApi.update(id, payload);
    setItem(updated);
    setEditing(false);
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete this Report?')) return;
    try {
      await reportApi.remove(id);
      navigate('/reports');
    } catch (err) {
      setError(err.response?.data?.message || 'Delete failed');
    }
  };

  if (error) {
    return (
      <div className="reports-page">
        <p className="error">{error}</p>
        <Link to="/reports">Back to Report</Link>
      </div>
    );
  }
  if (!item) return <div className="reports-page"><p className="muted">Loading...</p></div>;

  return (
    <div className="reports-page">
      <Link to="/reports">&larr; Back to Report</Link>
      <div className="detail-card">
        <h1>{formatValue(item.reason)}</h1>
        <p><span>status:</span> {formatValue(item.status)}</p>
        <p className="muted">Created {new Date(item.createdAt).toLocaleString()}</p>
        <div className="actions">
          <button className="btn" onClick={() => setEditing(!editing)}>{editing ? 'Cancel' : 'Edit'}</button>
          <button className="btn danger" onClick={handleDelete}>Delete</button>
        </div>
      </div>
      {editing && <ReportForm initial={item} onSubmit={handleUpdate} />}
    </div>
  );
}
