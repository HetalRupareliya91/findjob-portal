const { validateEmployer } = require('../src/validators/employer.validator');

describe('Employer validator', () => {
  it('requires fullName', () => {
    expect(validateEmployer({})).toContain('fullName is required');
  });

  it('accepts a valid payload', () => {
    expect(validateEmployer({ fullName: 'Sample fullName', designation: 'Sample designation', phone: 'Sample phone' })).toEqual([]);
  });

  it('allows partial updates', () => {
    expect(validateEmployer({}, { partial: true })).toEqual([]);
  });

  it('rejects a non-object body', () => {
    expect(validateEmployer(null).length).toBe(1);
  });
});
