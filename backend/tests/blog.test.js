const { validateBlog } = require('../src/validators/blog.validator');

describe('Blog Post validator', () => {
  it('requires title', () => {
    expect(validateBlog({})).toContain('title is required');
  });

  it('accepts a valid payload', () => {
    expect(validateBlog({ title: 'Sample title', content: 'Sample content', published: true })).toEqual([]);
  });

  it('allows partial updates', () => {
    expect(validateBlog({}, { partial: true })).toEqual([]);
  });

  it('rejects a non-object body', () => {
    expect(validateBlog(null).length).toBe(1);
  });
});
