import { useState } from 'react';

const empty = { keyword: '', frequency: '', active: false };

export default function JobAlertForm({ initial, onSubmit }) {
  const [form, setForm] = useState({ ...empty, ...(initial || {}) });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (ev) => {
    const { name, value, type, checked } = ev.target;
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setSaving(true);
    setError('');
    try {
      await onSubmit(form);
    } catch (err) {
      setError(err.response?.data?.errors?.join(', ') || err.response?.data?.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className="job-alerts-form" onSubmit={handleSubmit}>
      <label>keyword<input type="text" name="keyword" value={form.keyword ?? ''} onChange={handleChange} required /></label>
      <label>frequency<input type="text" name="frequency" value={form.frequency ?? ''} onChange={handleChange} /></label>
      <label className="checkbox"><input type="checkbox" name="active" checked={!!form.active} onChange={handleChange} /> active</label>
      {error && <p className="error">{error}</p>}
      <button className="btn" type="submit" disabled={saving}>{saving ? 'Saving...' : 'Save Job Alert'}</button>
    </form>
  );
}
