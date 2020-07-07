import { internet, random } from 'faker';
import {
  giveBookChatMessage,
  giveBookWhisperMessage,
  helpWhisperMessage,
} from '../../src/model/messages';

describe('Messages', () => {
  test('it should have the correct help message for whispers', () => {
    const expected =
      'Qualquer dúvida, entre em contato conosco pelo Discord ou chame um moderador por sussurro aqui na Twitch, ok?! - https://discord.com/invite/3y4X9pm 🐭';

    expect(helpWhisperMessage()).toEqual(expected);
  });

  test('it should format the whisper message with the username and the code', () => {
    const username = internet.userName();
    const code = random.uuid();

    const expected = `Hey ${username}! Aqui está o seu código para resgatar qualquer e-book no site da casa do código: ${code}. O site é https://www.casadocodigo.com.br. Bons estudos!`;

    expect(giveBookWhisperMessage(username, code)).toEqual(expected);
  });

  test('it should format the chat message when there is one user mention', () => {
    const replyTo = internet.userName();
    const users = [internet.userName()];

    const expected = `Hey @${replyTo}, vou verificar a disponibilidade dos códigos e já entro em contato com o usuário. 🐭`;
    expect(giveBookChatMessage(replyTo, users)).toEqual(expected);
  });

  test('it should format the chat message when there are multiple user mentions', () => {
    const replyTo = internet.userName();
    const users = [internet.userName(), internet.userName()];

    const expected = `Hey @${replyTo}, vou verificar a disponibilidade dos códigos e já entro em contato com os usuários. 🐭`;
    expect(giveBookChatMessage(replyTo, users)).toEqual(expected);
  });
});
