const { validateTag } = require('../src/validators/tag.validator');

describe('Tag validator', () => {
  it('requires name', () => {
    expect(validateTag({})).toContain('name is required');
  });

  it('accepts a valid payload', () => {
    expect(validateTag({ name: 'Sample name', color: 'Sample color' })).toEqual([]);
  });

  it('allows partial updates', () => {
    expect(validateTag({}, { partial: true })).toEqual([]);
  });

  it('rejects a non-object body', () => {
    expect(validateTag(null).length).toBe(1);
  });
});
