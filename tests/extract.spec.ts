import { internet, lorem } from 'faker';
import mentions from '../src/extract';

describe('extact', () => {
  test('it should extract one mention from message', () => {
    const username = internet.userName();
    const message = `${lorem.sentence()} @${username} ${lorem.sentence()}`;

    expect([username]).toStrictEqual(mentions(message));
  });

  test('it should extract multiple mentions from message', () => {
    const username1 = internet.userName();
    const username2 = internet.userName();
    const message = `${lorem.sentence()} @${username1} ${lorem.sentence()} @${username2}`;

    expect([username1, username2]).toStrictEqual(mentions(message));
  });
});
