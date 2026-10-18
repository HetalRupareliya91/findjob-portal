import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { companyApi } from '../../api/companyApi';
import CompanyForm from '../../components/Company/CompanyForm';
import '../../styles/company.css';
import '../../styles/mobile/company.mobile.css';

export const route = '/companies/:id';

const formatValue = (v) => {
  if (typeof v === 'boolean') return v ? 'Yes' : 'No';
  if (v === undefined || v === null || v === '') return '-';
  return String(v);
};

export default function CompanyDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    companyApi.get(id).then(setItem).catch((err) => setError(err.response?.data?.message || 'Company not found'));
  }, [id]);

  const handleUpdate = async (payload) => {
    const updated = await companyApi.update(id, payload);
    setItem(updated);
    setEditing(false);
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete this Company?')) return;
    try {
      await companyApi.remove(id);
      navigate('/companies');
    } catch (err) {
      setError(err.response?.data?.message || 'Delete failed');
    }
  };

  if (error) {
    return (
      <div className="companies-page">
        <p className="error">{error}</p>
        <Link to="/companies">Back to Company</Link>
      </div>
    );
  }
  if (!item) return <div className="companies-page"><p className="muted">Loading...</p></div>;

  return (
    <div className="companies-page">
      <Link to="/companies">&larr; Back to Company</Link>
      <div className="detail-card">
        <h1>{formatValue(item.name)}</h1>
        <p><span>website:</span> {formatValue(item.website)}</p>
        <p><span>industry:</span> {formatValue(item.industry)}</p>
        <p><span>size:</span> {formatValue(item.size)}</p>
        <p className="muted">Created {new Date(item.createdAt).toLocaleString()}</p>
        <div className="actions">
          <button className="btn" onClick={() => setEditing(!editing)}>{editing ? 'Cancel' : 'Edit'}</button>
          <button className="btn danger" onClick={handleDelete}>Delete</button>
        </div>
      </div>
      {editing && <CompanyForm initial={item} onSubmit={handleUpdate} />}
    </div>
  );
}
