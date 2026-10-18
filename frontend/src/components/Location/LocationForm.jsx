import { useState } from 'react';

const empty = { city: '', state: '', country: '' };

export default function LocationForm({ initial, onSubmit }) {
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
    <form className="locations-form" onSubmit={handleSubmit}>
      <label>city<input type="text" name="city" value={form.city ?? ''} onChange={handleChange} required /></label>
      <label>state<input type="text" name="state" value={form.state ?? ''} onChange={handleChange} /></label>
      <label>country<input type="text" name="country" value={form.country ?? ''} onChange={handleChange} /></label>
      {error && <p className="error">{error}</p>}
      <button className="btn" type="submit" disabled={saving}>{saving ? 'Saving...' : 'Save Location'}</button>
    </form>
  );
}
