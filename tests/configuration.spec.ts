import { lorem } from 'faker';
import configuration from '../src/configuration';

describe('configuration', () => {
  const ORIGINAL_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...ORIGINAL_ENV };
    delete process.env.NODE_ENV;
  });

  afterEach(() => {
    process.env = ORIGINAL_ENV;
  });

  test('it should throw error when username is missing', () => {
    process.env = {
      USERNAME: undefined,
      PASSWORD: lorem.word(),
      CHANNEL: lorem.word(),
    };

    expect(() => configuration()).toThrowError('No username provided for client.');
  });

  test('it should throw error when password is missing', () => {
    process.env = {
      USERNAME: lorem.word(),
      PASSWORD: undefined,
      CHANNEL: lorem.word(),
    };

    expect(() => configuration()).toThrowError('No password provided for client.');
  });

  test('it should throw error when channel is missing', () => {
    process.env = {
      PASSWORD: lorem.word(),
      USERNAME: lorem.word(),
      CHANNEL: undefined,
    };

    expect(() => configuration()).toThrowError('No channel provided for client.');
  });
});
