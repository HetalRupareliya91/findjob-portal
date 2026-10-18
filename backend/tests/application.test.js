const { validateApplication } = require('../src/validators/application.validator');

describe('Application validator', () => {
  it('requires coverLetter', () => {
    expect(validateApplication({})).toContain('coverLetter is required');
  });

  it('accepts a valid payload', () => {
    expect(validateApplication({ coverLetter: 'Sample coverLetter', status: 'Sample status', expectedSalary: 10 })).toEqual([]);
  });

  it('allows partial updates', () => {
    expect(validateApplication({}, { partial: true })).toEqual([]);
  });

  it('rejects a non-object body', () => {
    expect(validateApplication(null).length).toBe(1);
  });
});
