const { validateReview } = require('../src/validators/review.validator');

describe('Review validator', () => {
  it('requires rating', () => {
    expect(validateReview({})).toContain('rating is required');
  });

  it('accepts a valid payload', () => {
    expect(validateReview({ rating: 10, comment: 'Sample comment' })).toEqual([]);
  });

  it('allows partial updates', () => {
    expect(validateReview({}, { partial: true })).toEqual([]);
  });

  it('rejects a non-object body', () => {
    expect(validateReview(null).length).toBe(1);
  });
});
