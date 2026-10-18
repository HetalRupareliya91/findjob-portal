const { validateSavedJob } = require('../src/validators/savedJob.validator');

describe('Saved Job validator', () => {
  it('requires jobId', () => {
    expect(validateSavedJob({})).toContain('jobId is required');
  });

  it('accepts a valid payload', () => {
    expect(validateSavedJob({ jobId: 'Sample jobId', note: 'Sample note' })).toEqual([]);
  });

  it('allows partial updates', () => {
    expect(validateSavedJob({}, { partial: true })).toEqual([]);
  });

  it('rejects a non-object body', () => {
    expect(validateSavedJob(null).length).toBe(1);
  });
});
