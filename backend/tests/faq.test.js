const { validateFaq } = require('../src/validators/faq.validator');

describe('FAQ validator', () => {
  it('requires question', () => {
    expect(validateFaq({})).toContain('question is required');
  });

  it('accepts a valid payload', () => {
    expect(validateFaq({ question: 'Sample question', answer: 'Sample answer' })).toEqual([]);
  });

  it('allows partial updates', () => {
    expect(validateFaq({}, { partial: true })).toEqual([]);
  });

  it('rejects a non-object body', () => {
    expect(validateFaq(null).length).toBe(1);
  });
});
