import { useState } from 'react';

const empty = { title: '', body: '', read: false };

export default function NotificationForm({ initial, onSubmit }) {
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
    <form className="notifications-form" onSubmit={handleSubmit}>
      <label>title<input type="text" name="title" value={form.title ?? ''} onChange={handleChange} required /></label>
      <label>body<textarea name="body" rows={4} value={form.body ?? ''} onChange={handleChange} /></label>
      <label className="checkbox"><input type="checkbox" name="read" checked={!!form.read} onChange={handleChange} /> read</label>
      {error && <p className="error">{error}</p>}
      <button className="btn" type="submit" disabled={saving}>{saving ? 'Saving...' : 'Save Notification'}</button>
    </form>
  );
}
