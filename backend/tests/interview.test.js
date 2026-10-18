const { validateInterview } = require('../src/validators/interview.validator');

describe('Interview validator', () => {
  it('requires scheduledAt', () => {
    expect(validateInterview({})).toContain('scheduledAt is required');
  });

  it('accepts a valid payload', () => {
    expect(validateInterview({ scheduledAt: '2026-01-15', mode: 'Sample mode', notes: 'Sample notes' })).toEqual([]);
  });

  it('allows partial updates', () => {
    expect(validateInterview({}, { partial: true })).toEqual([]);
  });

  it('rejects a non-object body', () => {
    expect(validateInterview(null).length).toBe(1);
  });
});
