import { useState } from 'react';
import { BrowserRouter, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import client from './api/client';
import './styles/admin.css';

// Every *Management page exporting `route` and `title` is added to the sidebar.
const modules = import.meta.glob('./pages/*Management.jsx', { eager: true });
const pages = Object.values(modules)
  .filter((m) => m.route && m.default)
  .sort((a, b) => a.title.localeCompare(b.title));

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const submit = async (ev) => {
    ev.preventDefault();
    setError('');
    try {
      const { data } = await client.post('/auth/login', { email, password });
      if (data.data.user.role !== 'admin') {
        setError('This account does not have admin access');
        return;
      }
      localStorage.setItem('adminToken', data.data.token);
      onLogin();
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="login-wrap">
      <form className="login-card" onSubmit={submit}>
        <h2>Admin Login</h2>
        <input type="email" placeholder="Email" value={email} onChange={(ev) => setEmail(ev.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(ev) => setPassword(ev.target.value)} required />
        {error && <p className="error">{error}</p>}
        <button className="btn" type="submit">Sign in</button>
      </form>
    </div>
  );
}

function Dashboard() {
  return (
    <section>
      <h1>Dashboard</h1>
      <div className="stat-grid">
        {pages.map((p) => (
          <NavLink key={p.route} to={p.route} className="stat-card">{p.title}</NavLink>
        ))}
      </div>
    </section>
  );
}

export default function App() {
  const [authed, setAuthed] = useState(() => !!localStorage.getItem('adminToken'));
  const [menuOpen, setMenuOpen] = useState(false);

  if (!authed) return <Login onLogin={() => setAuthed(true)} />;

  const logout = () => {
    localStorage.removeItem('adminToken');
    setAuthed(false);
  };

  return (
    <BrowserRouter>
      <div className={'admin-layout' + (menuOpen ? ' menu-open' : '')}>
        <header className="admin-topbar">
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>Menu</button>
          <strong>Job Portal Admin</strong>
          <button className="btn outline" onClick={logout}>Logout</button>
        </header>
        <aside className="admin-sidebar" onClick={() => setMenuOpen(false)}>
          <NavLink to="/" end>Dashboard</NavLink>
          {pages.map((p) => (
            <NavLink key={p.route} to={p.route}>{p.title}</NavLink>
          ))}
        </aside>
        <main className="admin-main">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            {pages.map((p) => {
              const Page = p.default;
              return <Route key={p.route} path={p.route} element={<Page />} />;
            })}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
