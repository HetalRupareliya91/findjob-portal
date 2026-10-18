import { useState } from 'react';

const empty = { fullName: '', headline: '', experienceYears: '' };

export default function CandidateForm({ initial, onSubmit }) {
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
    <form className="candidates-form" onSubmit={handleSubmit}>
      <label>fullName<input type="text" name="fullName" value={form.fullName ?? ''} onChange={handleChange} required /></label>
      <label>headline<input type="text" name="headline" value={form.headline ?? ''} onChange={handleChange} /></label>
      <label>experienceYears<input type="number" name="experienceYears" value={form.experienceYears ?? ''} onChange={handleChange} /></label>
      {error && <p className="error">{error}</p>}
      <button className="btn" type="submit" disabled={saving}>{saving ? 'Saving...' : 'Save Candidate'}</button>
    </form>
  );
}
