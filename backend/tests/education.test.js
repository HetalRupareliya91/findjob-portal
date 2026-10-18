const { validateEducation } = require('../src/validators/education.validator');

describe('Education validator', () => {
  it('requires institute', () => {
    expect(validateEducation({})).toContain('institute is required');
  });

  it('accepts a valid payload', () => {
    expect(validateEducation({ institute: 'Sample institute', degree: 'Sample degree', passingYear: 10 })).toEqual([]);
  });

  it('allows partial updates', () => {
    expect(validateEducation({}, { partial: true })).toEqual([]);
  });

  it('rejects a non-object body', () => {
    expect(validateEducation(null).length).toBe(1);
  });
});
