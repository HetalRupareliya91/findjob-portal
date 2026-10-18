const { validateContact } = require('../src/validators/contact.validator');

describe('Contact Request validator', () => {
  it('requires name', () => {
    expect(validateContact({})).toContain('name is required');
  });

  it('accepts a valid payload', () => {
    expect(validateContact({ name: 'Sample name', email: 'Sample email', message: 'Sample message' })).toEqual([]);
  });

  it('allows partial updates', () => {
    expect(validateContact({}, { partial: true })).toEqual([]);
  });

  it('rejects a non-object body', () => {
    expect(validateContact(null).length).toBe(1);
  });
});
