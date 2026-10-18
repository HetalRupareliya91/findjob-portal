const { validateExperience } = require('../src/validators/experience.validator');

describe('Experience validator', () => {
  it('requires companyName', () => {
    expect(validateExperience({})).toContain('companyName is required');
  });

  it('accepts a valid payload', () => {
    expect(validateExperience({ companyName: 'Sample companyName', role: 'Sample role', years: 10 })).toEqual([]);
  });

  it('allows partial updates', () => {
    expect(validateExperience({}, { partial: true })).toEqual([]);
  });

  it('rejects a non-object body', () => {
    expect(validateExperience(null).length).toBe(1);
  });
});
