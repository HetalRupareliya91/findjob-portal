import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { resumeApi } from '../../api/resumeApi';
import ResumeForm from '../../components/Resume/ResumeForm';
import '../../styles/resume.css';
import '../../styles/mobile/resume.mobile.css';

export const route = '/resumes/:id';

const formatValue = (v) => {
  if (typeof v === 'boolean') return v ? 'Yes' : 'No';
  if (v === undefined || v === null || v === '') return '-';
  return String(v);
};

export default function ResumeDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    resumeApi.get(id).then(setItem).catch((err) => setError(err.response?.data?.message || 'Resume not found'));
  }, [id]);

  const handleUpdate = async (payload) => {
    const updated = await resumeApi.update(id, payload);
    setItem(updated);
    setEditing(false);
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete this Resume?')) return;
    try {
      await resumeApi.remove(id);
      navigate('/resumes');
    } catch (err) {
      setError(err.response?.data?.message || 'Delete failed');
    }
  };

  if (error) {
    return (
      <div className="resumes-page">
        <p className="error">{error}</p>
        <Link to="/resumes">Back to Resume</Link>
      </div>
    );
  }
  if (!item) return <div className="resumes-page"><p className="muted">Loading...</p></div>;

  return (
    <div className="resumes-page">
      <Link to="/resumes">&larr; Back to Resume</Link>
      <div className="detail-card">
        <h1>{formatValue(item.title)}</h1>
        <p><span>fileUrl:</span> {formatValue(item.fileUrl)}</p>
        <p><span>summary:</span> {formatValue(item.summary)}</p>
        <p className="muted">Created {new Date(item.createdAt).toLocaleString()}</p>
        <div className="actions">
          <button className="btn" onClick={() => setEditing(!editing)}>{editing ? 'Cancel' : 'Edit'}</button>
          <button className="btn danger" onClick={handleDelete}>Delete</button>
        </div>
      </div>
      {editing && <ResumeForm initial={item} onSubmit={handleUpdate} />}
    </div>
  );
}
