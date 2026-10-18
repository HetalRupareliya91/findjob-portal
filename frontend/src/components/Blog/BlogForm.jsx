import { useState } from 'react';

const empty = { title: '', content: '', published: false };

export default function BlogForm({ initial, onSubmit }) {
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
    <form className="blogs-form" onSubmit={handleSubmit}>
      <label>title<input type="text" name="title" value={form.title ?? ''} onChange={handleChange} required /></label>
      <label>content<textarea name="content" rows={4} value={form.content ?? ''} onChange={handleChange} /></label>
      <label className="checkbox"><input type="checkbox" name="published" checked={!!form.published} onChange={handleChange} /> published</label>
      {error && <p className="error">{error}</p>}
      <button className="btn" type="submit" disabled={saving}>{saving ? 'Saving...' : 'Save Blog Post'}</button>
    </form>
  );
}
