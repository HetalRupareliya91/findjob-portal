const { validateSkill } = require('../src/validators/skill.validator');

describe('Skill validator', () => {
  it('requires name', () => {
    expect(validateSkill({})).toContain('name is required');
  });

  it('accepts a valid payload', () => {
    expect(validateSkill({ name: 'Sample name', level: 'Sample level' })).toEqual([]);
  });

  it('allows partial updates', () => {
    expect(validateSkill({}, { partial: true })).toEqual([]);
  });

  it('rejects a non-object body', () => {
    expect(validateSkill(null).length).toBe(1);
  });
});
