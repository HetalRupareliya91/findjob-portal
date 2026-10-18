import { useState } from 'react';

const empty = { name: '', price: '', durationDays: '' };

export default function PlanForm({ initial, onSubmit }) {
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
    <form className="plans-form" onSubmit={handleSubmit}>
      <label>name<input type="text" name="name" value={form.name ?? ''} onChange={handleChange} required /></label>
      <label>price<input type="number" name="price" value={form.price ?? ''} onChange={handleChange} /></label>
      <label>durationDays<input type="number" name="durationDays" value={form.durationDays ?? ''} onChange={handleChange} /></label>
      {error && <p className="error">{error}</p>}
      <button className="btn" type="submit" disabled={saving}>{saving ? 'Saving...' : 'Save Subscription Plan'}</button>
    </form>
  );
}
