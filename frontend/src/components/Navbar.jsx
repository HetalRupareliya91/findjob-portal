import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const modules = import.meta.glob('../pages/*/*ListPage.jsx', { eager: true });
const PRIMARY = ['/jobs', '/companies', '/candidates', '/employers', '/blogs'];

const all = Object.values(modules).filter((m) => m.route);
const primary = PRIMARY.map((r) => all.find((m) => m.route === r)).filter(Boolean);
const more = all.filter((m) => !PRIMARY.includes(m.route)).sort((a, b) => a.title.localeCompare(b.title));

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const close = () => {
    setOpen(false);
    setMoreOpen(false);
  };

  return (
    <header className="navbar">
      <Link to="/" className="brand" onClick={close}>JobPortal</Link>
      <button className="nav-toggle" aria-label="Toggle menu" onClick={() => setOpen(!open)}>Menu</button>
      <nav className={open ? 'nav-links open' : 'nav-links'}>
        {primary.map((m) => (
          <NavLink key={m.route} to={m.route} onClick={close}>{m.title}</NavLink>
        ))}
        {more.length > 0 && (
          <div className="nav-more">
            <button type="button" onClick={() => setMoreOpen(!moreOpen)}>More</button>
            {moreOpen && (
              <div className="nav-dropdown">
                {more.map((m) => (
                  <NavLink key={m.route} to={m.route} onClick={close}>{m.title}</NavLink>
                ))}
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}
