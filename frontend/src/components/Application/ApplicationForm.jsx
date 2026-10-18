import { useState } from 'react';

const empty = { coverLetter: '', status: '', expectedSalary: '' };

export default function ApplicationForm({ initial, onSubmit }) {
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
    <form className="applications-form" onSubmit={handleSubmit}>
      <label>coverLetter<textarea name="coverLetter" rows={4} value={form.coverLetter ?? ''} onChange={handleChange} required /></label>
      <label>status<input type="text" name="status" value={form.status ?? ''} onChange={handleChange} /></label>
      <label>expectedSalary<input type="number" name="expectedSalary" value={form.expectedSalary ?? ''} onChange={handleChange} /></label>
      {error && <p className="error">{error}</p>}
      <button className="btn" type="submit" disabled={saving}>{saving ? 'Saving...' : 'Save Application'}</button>
    </form>
  );
}
