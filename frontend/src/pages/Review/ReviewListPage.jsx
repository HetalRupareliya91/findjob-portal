import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { reviewApi } from '../../api/reviewApi';
import ReviewCard from '../../components/Review/ReviewCard';
import ReviewMobileCard from '../../components/Review/ReviewMobileCard';
import ReviewForm from '../../components/Review/ReviewForm';
import '../../styles/review.css';
import '../../styles/mobile/review.mobile.css';

export const route = '/reviews';
export const title = 'Review';

export default function ReviewListPage() {
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
    reviewApi
      .list({ page, search })
      .then((data) => {
        setItems(data.items);
        setPages(data.pages);
        setError('');
      })
      .catch((err) => setError(err.response?.data?.message || 'Failed to load Review'))
      .finally(() => setLoading(false));
  };

  useEffect(load, [page, search]);

  const open = (item) => navigate('/reviews/' + item._id);

  const handleCreate = async (payload) => {
    await reviewApi.create(payload);
    setShowForm(false);
    load();
  };

  return (
    <div className="reviews-page">
      <div className="page-header">
        <h1>Review</h1>
        <button className="btn" onClick={() => setShowForm(!showForm)}>{showForm ? 'Close' : 'Add Review'}</button>
      </div>

      {showForm && <ReviewForm onSubmit={handleCreate} />}

      <input
        className="search"
        placeholder="Search Review..."
        value={search}
        onChange={(ev) => {
          setPage(1);
          setSearch(ev.target.value);
        }}
      />

      {loading && <p className="muted">Loading...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && items.length === 0 && <p className="muted">No Review found.</p>}

      <div className="reviews-grid">
        {items.map((item) => <ReviewCard key={item._id} item={item} onSelect={open} />)}
      </div>
      <div className="reviews-mobile-list">
        {items.map((item) => <ReviewMobileCard key={item._id} item={item} onSelect={open} />)}
      </div>

      <div className="pagination">
        <button className="btn outline" disabled={page <= 1} onClick={() => setPage(page - 1)}>Previous</button>
        <span>Page {page} of {pages}</span>
        <button className="btn outline" disabled={page >= pages} onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
}
