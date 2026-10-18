import { useState } from 'react';

const empty = { scheduledAt: '', mode: '', notes: '' };

export default function InterviewForm({ initial, onSubmit }) {
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
    <form className="interviews-form" onSubmit={handleSubmit}>
      <label>scheduledAt<input type="date" name="scheduledAt" value={form.scheduledAt ? String(form.scheduledAt).slice(0, 10) : ''} onChange={handleChange} required /></label>
      <label>mode<input type="text" name="mode" value={form.mode ?? ''} onChange={handleChange} /></label>
      <label>notes<textarea name="notes" rows={4} value={form.notes ?? ''} onChange={handleChange} /></label>
      {error && <p className="error">{error}</p>}
      <button className="btn" type="submit" disabled={saving}>{saving ? 'Saving...' : 'Save Interview'}</button>
    </form>
  );
}
