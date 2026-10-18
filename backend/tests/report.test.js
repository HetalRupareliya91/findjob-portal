const { validateReport } = require('../src/validators/report.validator');

describe('Report validator', () => {
  it('requires reason', () => {
    expect(validateReport({})).toContain('reason is required');
  });

  it('accepts a valid payload', () => {
    expect(validateReport({ reason: 'Sample reason', status: 'Sample status' })).toEqual([]);
  });

  it('allows partial updates', () => {
    expect(validateReport({}, { partial: true })).toEqual([]);
  });

  it('rejects a non-object body', () => {
    expect(validateReport(null).length).toBe(1);
  });
});
