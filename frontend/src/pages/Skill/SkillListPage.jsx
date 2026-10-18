import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { skillApi } from '../../api/skillApi';
import SkillCard from '../../components/Skill/SkillCard';
import SkillMobileCard from '../../components/Skill/SkillMobileCard';
import SkillForm from '../../components/Skill/SkillForm';
import '../../styles/skill.css';
import '../../styles/mobile/skill.mobile.css';

export const route = '/skills';
export const title = 'Skill';

export default function SkillListPage() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const load = () => {
    setLoading(true);
    skillApi
      .list({ page, search })
      .then((data) => {
        setItems(data.items);
        setPages(data.pages);
        setError('');
      })
      .catch((err) => setError(err.response?.data?.message || 'Failed to load Skill'))
      .finally(() => setLoading(false));
  };

  useEffect(load, [page, search]);

  const open = (item) => navigate('/skills/' + item._id);

  const handleCreate = async (payload) => {
    await skillApi.create(payload);
    setShowForm(false);
    load();
  };

  return (
    <div className="skills-page">
      <div className="page-header">
        <h1>Skill</h1>
        <button className="btn" onClick={() => setShowForm(!showForm)}>{showForm ? 'Close' : 'Add Skill'}</button>
      </div>

      {showForm && <SkillForm onSubmit={handleCreate} />}

      <input
        className="search"
        placeholder="Search Skill..."
        value={search}
        onChange={(ev) => {
          setPage(1);
          setSearch(ev.target.value);
        }}
      />

      {loading && <p className="muted">Loading...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && items.length === 0 && <p className="muted">No Skill found.</p>}

      <div className="skills-grid">
        {items.map((item) => <SkillCard key={item._id} item={item} onSelect={open} />)}
      </div>
      <div className="skills-mobile-list">
        {items.map((item) => <SkillMobileCard key={item._id} item={item} onSelect={open} />)}
      </div>

      <div className="pagination">
        <button className="btn outline" disabled={page <= 1} onClick={() => setPage(page - 1)}>Previous</button>
        <span>Page {page} of {pages}</span>
        <button className="btn outline" disabled={page >= pages} onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
}
