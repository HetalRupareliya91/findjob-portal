const { validateCandidate } = require('../src/validators/candidate.validator');

describe('Candidate validator', () => {
  it('requires fullName', () => {
    expect(validateCandidate({})).toContain('fullName is required');
  });

  it('accepts a valid payload', () => {
    expect(validateCandidate({ fullName: 'Sample fullName', headline: 'Sample headline', experienceYears: 10 })).toEqual([]);
  });

  it('allows partial updates', () => {
    expect(validateCandidate({}, { partial: true })).toEqual([]);
  });

  it('rejects a non-object body', () => {
    expect(validateCandidate(null).length).toBe(1);
  });
});
