import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';

// Every page exporting `route` is registered automatically.
const modules = import.meta.glob('./pages/*/*Page.jsx', { eager: true });
const routes = Object.values(modules).filter((m) => m.route && m.default);

function Home() {
  return (
    <section className="hero">
      <h1>Find your next job</h1>
      <p>Browse openings from top companies, apply in minutes and track every application.</p>
      <div className="hero-actions">
        <Link className="btn" to="/jobs">Browse jobs</Link>
        <Link className="btn outline" to="/companies">Explore companies</Link>
      </div>
    </section>
  );
}

function NotFound() {
  return (
    <div style={{ padding: 48, textAlign: 'center' }}>
      <h1>Page not found</h1>
      <Link to="/">Go home</Link>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          {routes.map((m) => {
            const Page = m.default;
            return <Route key={m.route} path={m.route} element={<Page />} />;
          })}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
