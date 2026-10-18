import { useState } from 'react';

const empty = { name: '', slug: '', description: '' };

export default function CategoryForm({ initial, onSubmit }) {
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
    <form className="categories-form" onSubmit={handleSubmit}>
      <label>name<input type="text" name="name" value={form.name ?? ''} onChange={handleChange} required /></label>
      <label>slug<input type="text" name="slug" value={form.slug ?? ''} onChange={handleChange} /></label>
      <label>description<textarea name="description" rows={4} value={form.description ?? ''} onChange={handleChange} /></label>
      {error && <p className="error">{error}</p>}
      <button className="btn" type="submit" disabled={saving}>{saving ? 'Saving...' : 'Save Category'}</button>
    </form>
  );
}
