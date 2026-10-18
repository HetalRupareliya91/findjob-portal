import { useState } from 'react';

const empty = { subject: '', body: '', read: false };

export default function MessageForm({ initial, onSubmit }) {
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
    <form className="messages-form" onSubmit={handleSubmit}>
      <label>subject<input type="text" name="subject" value={form.subject ?? ''} onChange={handleChange} required /></label>
      <label>body<textarea name="body" rows={4} value={form.body ?? ''} onChange={handleChange} /></label>
      <label className="checkbox"><input type="checkbox" name="read" checked={!!form.read} onChange={handleChange} /> read</label>
      {error && <p className="error">{error}</p>}
      <button className="btn" type="submit" disabled={saving}>{saving ? 'Saving...' : 'Save Message'}</button>
    </form>
  );
}
