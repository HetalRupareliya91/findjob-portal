const { validateJob } = require('../src/validators/job.validator');

describe('Job validator', () => {
  it('requires title', () => {
    expect(validateJob({})).toContain('title is required');
  });

  it('accepts a valid payload', () => {
    expect(validateJob({ title: 'Sample title', description: 'Sample description', salary: 10, jobType: 'Sample jobType' })).toEqual([]);
  });

  it('allows partial updates', () => {
    expect(validateJob({}, { partial: true })).toEqual([]);
  });

  it('rejects a non-object body', () => {
    expect(validateJob(null).length).toBe(1);
  });
});
