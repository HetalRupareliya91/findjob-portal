const { validateMessage } = require('../src/validators/message.validator');

describe('Message validator', () => {
  it('requires subject', () => {
    expect(validateMessage({})).toContain('subject is required');
  });

  it('accepts a valid payload', () => {
    expect(validateMessage({ subject: 'Sample subject', body: 'Sample body', read: true })).toEqual([]);
  });

  it('allows partial updates', () => {
    expect(validateMessage({}, { partial: true })).toEqual([]);
  });

  it('rejects a non-object body', () => {
    expect(validateMessage(null).length).toBe(1);
  });
});
