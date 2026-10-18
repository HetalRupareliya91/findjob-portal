import { useState } from 'react';

const empty = { title: '', fileUrl: '', summary: '' };

export default function ResumeForm({ initial, onSubmit }) {
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
    <form className="resumes-form" onSubmit={handleSubmit}>
      <label>title<input type="text" name="title" value={form.title ?? ''} onChange={handleChange} required /></label>
      <label>fileUrl<input type="text" name="fileUrl" value={form.fileUrl ?? ''} onChange={handleChange} /></label>
      <label>summary<textarea name="summary" rows={4} value={form.summary ?? ''} onChange={handleChange} /></label>
      {error && <p className="error">{error}</p>}
      <button className="btn" type="submit" disabled={saving}>{saving ? 'Saving...' : 'Save Resume'}</button>
    </form>
  );
}
