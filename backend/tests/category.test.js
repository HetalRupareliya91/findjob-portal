const { validateCategory } = require('../src/validators/category.validator');

describe('Category validator', () => {
  it('requires name', () => {
    expect(validateCategory({})).toContain('name is required');
  });

  it('accepts a valid payload', () => {
    expect(validateCategory({ name: 'Sample name', slug: 'Sample slug', description: 'Sample description' })).toEqual([]);
  });

  it('allows partial updates', () => {
    expect(validateCategory({}, { partial: true })).toEqual([]);
  });

  it('rejects a non-object body', () => {
    expect(validateCategory(null).length).toBe(1);
  });
});
