import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { candidateApi } from '../../api/candidateApi';
import CandidateForm from '../../components/Candidate/CandidateForm';
import '../../styles/candidate.css';
import '../../styles/mobile/candidate.mobile.css';

export const route = '/candidates/:id';

const formatValue = (v) => {
  if (typeof v === 'boolean') return v ? 'Yes' : 'No';
  if (v === undefined || v === null || v === '') return '-';
  return String(v);
};

export default function CandidateDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    candidateApi.get(id).then(setItem).catch((err) => setError(err.response?.data?.message || 'Candidate not found'));
  }, [id]);

  const handleUpdate = async (payload) => {
    const updated = await candidateApi.update(id, payload);
    setItem(updated);
    setEditing(false);
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete this Candidate?')) return;
    try {
      await candidateApi.remove(id);
      navigate('/candidates');
    } catch (err) {
      setError(err.response?.data?.message || 'Delete failed');
    }
  };

  if (error) {
    return (
      <div className="candidates-page">
        <p className="error">{error}</p>
        <Link to="/candidates">Back to Candidate</Link>
      </div>
    );
  }
  if (!item) return <div className="candidates-page"><p className="muted">Loading...</p></div>;

  return (
    <div className="candidates-page">
      <Link to="/candidates">&larr; Back to Candidate</Link>
      <div className="detail-card">
        <h1>{formatValue(item.fullName)}</h1>
        <p><span>headline:</span> {formatValue(item.headline)}</p>
        <p><span>experienceYears:</span> {formatValue(item.experienceYears)}</p>
        <p className="muted">Created {new Date(item.createdAt).toLocaleString()}</p>
        <div className="actions">
          <button className="btn" onClick={() => setEditing(!editing)}>{editing ? 'Cancel' : 'Edit'}</button>
          <button className="btn danger" onClick={handleDelete}>Delete</button>
        </div>
      </div>
      {editing && <CandidateForm initial={item} onSubmit={handleUpdate} />}
    </div>
  );
}
