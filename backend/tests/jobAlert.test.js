const { validateJobAlert } = require('../src/validators/jobAlert.validator');

describe('Job Alert validator', () => {
  it('requires keyword', () => {
    expect(validateJobAlert({})).toContain('keyword is required');
  });

  it('accepts a valid payload', () => {
    expect(validateJobAlert({ keyword: 'Sample keyword', frequency: 'Sample frequency', active: true })).toEqual([]);
  });

  it('allows partial updates', () => {
    expect(validateJobAlert({}, { partial: true })).toEqual([]);
  });

  it('rejects a non-object body', () => {
    expect(validateJobAlert(null).length).toBe(1);
  });
});
