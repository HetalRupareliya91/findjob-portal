import { useState } from 'react';

const empty = { fullName: '', designation: '', phone: '' };

export default function EmployerForm({ initial, onSubmit }) {
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
    <form className="employers-form" onSubmit={handleSubmit}>
      <label>fullName<input type="text" name="fullName" value={form.fullName ?? ''} onChange={handleChange} required /></label>
      <label>designation<input type="text" name="designation" value={form.designation ?? ''} onChange={handleChange} /></label>
      <label>phone<input type="text" name="phone" value={form.phone ?? ''} onChange={handleChange} /></label>
      {error && <p className="error">{error}</p>}
      <button className="btn" type="submit" disabled={saving}>{saving ? 'Saving...' : 'Save Employer'}</button>
    </form>
  );
}
