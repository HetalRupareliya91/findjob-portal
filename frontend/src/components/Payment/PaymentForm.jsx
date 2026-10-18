import { useState } from 'react';

const empty = { amount: '', currency: '', status: '' };

export default function PaymentForm({ initial, onSubmit }) {
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
    <form className="payments-form" onSubmit={handleSubmit}>
      <label>amount<input type="number" name="amount" value={form.amount ?? ''} onChange={handleChange} required /></label>
      <label>currency<input type="text" name="currency" value={form.currency ?? ''} onChange={handleChange} /></label>
      <label>status<input type="text" name="status" value={form.status ?? ''} onChange={handleChange} /></label>
      {error && <p className="error">{error}</p>}
      <button className="btn" type="submit" disabled={saving}>{saving ? 'Saving...' : 'Save Payment'}</button>
    </form>
  );
}
