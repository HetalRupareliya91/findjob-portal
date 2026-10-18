import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { locationApi } from '../../api/locationApi';
import LocationForm from '../../components/Location/LocationForm';
import '../../styles/location.css';
import '../../styles/mobile/location.mobile.css';

export const route = '/locations/:id';

const formatValue = (v) => {
  if (typeof v === 'boolean') return v ? 'Yes' : 'No';
  if (v === undefined || v === null || v === '') return '-';
  return String(v);
};

export default function LocationDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    locationApi.get(id).then(setItem).catch((err) => setError(err.response?.data?.message || 'Location not found'));
  }, [id]);

  const handleUpdate = async (payload) => {
    const updated = await locationApi.update(id, payload);
    setItem(updated);
    setEditing(false);
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete this Location?')) return;
    try {
      await locationApi.remove(id);
      navigate('/locations');
    } catch (err) {
      setError(err.response?.data?.message || 'Delete failed');
    }
  };

  if (error) {
    return (
      <div className="locations-page">
        <p className="error">{error}</p>
        <Link to="/locations">Back to Location</Link>
      </div>
    );
  }
  if (!item) return <div className="locations-page"><p className="muted">Loading...</p></div>;

  return (
    <div className="locations-page">
      <Link to="/locations">&larr; Back to Location</Link>
      <div className="detail-card">
        <h1>{formatValue(item.city)}</h1>
        <p><span>state:</span> {formatValue(item.state)}</p>
        <p><span>country:</span> {formatValue(item.country)}</p>
        <p className="muted">Created {new Date(item.createdAt).toLocaleString()}</p>
        <div className="actions">
          <button className="btn" onClick={() => setEditing(!editing)}>{editing ? 'Cancel' : 'Edit'}</button>
          <button className="btn danger" onClick={handleDelete}>Delete</button>
        </div>
      </div>
      {editing && <LocationForm initial={item} onSubmit={handleUpdate} />}
    </div>
  );
}
