import { lorem, name } from 'faker';
import {
  mentions,
  removeAdditionalSpaces,
  transformPlural,
} from '../../src/util';

describe('Utilities', () => {
  describe('Transform plural', () => {
    test('it should return s when the array has more then one element', () => {
      expect(transformPlural([lorem.words(), lorem.words()])).toBe('s');
    });
    test('it should return s when the array has more then one element', () => {
      expect(transformPlural([lorem.words()])).toBe('');
    });
    test('it should return s when the array has more then one element', () => {
      expect(() => transformPlural([])).toThrowError(
        'The array cannot be empty',
      );
    });
  });
  describe('Remove additional spaces', () => {
    test('it should additional spaces from string', () => {
      const text = lorem.sentence(10);
      const textWithSpaces = text.replace(/\s+/g, '          ');

      expect(removeAdditionalSpaces(textWithSpaces)).toEqual(text);
    });
  });
  describe('Extract mentions', () => {
    test('it should extract one mention from sentence', () => {
      const expected = name.firstName();
      const sentence = `${lorem.sentence()} @${expected} ${lorem.sentence()}`;
      expect(mentions(sentence)).toEqual([expected]);
    });

    test('it should extract multiples mentions from sentence', () => {
      const firstMention = name.firstName();
      const secondMention = name.firstName();

      const sentence = `${lorem.sentence()} @${firstMention} ${lorem.sentence()} @${secondMention}`;
      expect(mentions(sentence)).toEqual([firstMention, secondMention]);
    });

    test('it should remove duplicated mentions from a sentence', () => {
      const expected = name.firstName();

      const sentence = `${lorem.sentence()} @${expected} ${lorem.sentence()} @${expected}`;
      expect(mentions(sentence)).toEqual([expected]);
    });
  });
});
