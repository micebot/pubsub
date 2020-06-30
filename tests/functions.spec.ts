import { lorem } from 'faker';
import transformPlural from '../src/functions';

describe('functions', () => {
  describe('transformPlural', () => {
    test('it should return s when the array has more then one element', () => {
      expect(transformPlural([lorem.words(), lorem.words()])).toBe('s');
    });
    test('it should return s when the array has more then one element', () => {
      expect(transformPlural([lorem.words()])).toBe('');
    });
    test('it should return s when the array has more then one element', () => {
      expect(() => transformPlural([])).toThrowError('The array cannot be empty');
    });
  });
});
