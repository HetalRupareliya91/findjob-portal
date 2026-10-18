import { useState } from 'react';

const empty = { companyName: '', role: '', years: '' };

export default function ExperienceForm({ initial, onSubmit }) {
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
    <form className="experiences-form" onSubmit={handleSubmit}>
      <label>companyName<input type="text" name="companyName" value={form.companyName ?? ''} onChange={handleChange} required /></label>
      <label>role<input type="text" name="role" value={form.role ?? ''} onChange={handleChange} /></label>
      <label>years<input type="number" name="years" value={form.years ?? ''} onChange={handleChange} /></label>
      {error && <p className="error">{error}</p>}
      <button className="btn" type="submit" disabled={saving}>{saving ? 'Saving...' : 'Save Experience'}</button>
    </form>
  );
}
