import { useState } from 'react';

const empty = { name: '', website: '', industry: '', size: '' };

export default function CompanyForm({ initial, onSubmit }) {
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
    <form className="companies-form" onSubmit={handleSubmit}>
      <label>name<input type="text" name="name" value={form.name ?? ''} onChange={handleChange} required /></label>
      <label>website<input type="text" name="website" value={form.website ?? ''} onChange={handleChange} /></label>
      <label>industry<input type="text" name="industry" value={form.industry ?? ''} onChange={handleChange} /></label>
      <label>size<input type="number" name="size" value={form.size ?? ''} onChange={handleChange} /></label>
      {error && <p className="error">{error}</p>}
      <button className="btn" type="submit" disabled={saving}>{saving ? 'Saving...' : 'Save Company'}</button>
    </form>
  );
}
