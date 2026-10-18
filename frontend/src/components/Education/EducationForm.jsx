import { useState } from 'react';

const empty = { institute: '', degree: '', passingYear: '' };

export default function EducationForm({ initial, onSubmit }) {
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
    <form className="educations-form" onSubmit={handleSubmit}>
      <label>institute<input type="text" name="institute" value={form.institute ?? ''} onChange={handleChange} required /></label>
      <label>degree<input type="text" name="degree" value={form.degree ?? ''} onChange={handleChange} /></label>
      <label>passingYear<input type="number" name="passingYear" value={form.passingYear ?? ''} onChange={handleChange} /></label>
      {error && <p className="error">{error}</p>}
      <button className="btn" type="submit" disabled={saving}>{saving ? 'Saving...' : 'Save Education'}</button>
    </form>
  );
}
