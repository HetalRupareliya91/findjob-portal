const { validateResume } = require('../src/validators/resume.validator');

describe('Resume validator', () => {
  it('requires title', () => {
    expect(validateResume({})).toContain('title is required');
  });

  it('accepts a valid payload', () => {
    expect(validateResume({ title: 'Sample title', fileUrl: 'Sample fileUrl', summary: 'Sample summary' })).toEqual([]);
  });

  it('allows partial updates', () => {
    expect(validateResume({}, { partial: true })).toEqual([]);
  });

  it('rejects a non-object body', () => {
    expect(validateResume(null).length).toBe(1);
  });
});
