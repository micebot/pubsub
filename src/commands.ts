// eslint-disable-next-line no-unused-vars
import { Client } from 'tmi.js';
import mentions from './extract';
import transformPlural from './functions';

type GiveBookCommand = {
  client: Client;
  message: string;
  reply: string | undefined;
  channel: string;
};

function giveBook(command: GiveBookCommand) {
  const users = mentions(command.message);

  if (!users) return;

  const usersTomentions = users.map((user) => `@${user}`).join(', ');
  const plural = transformPlural(users);

  command.client.say(
    command.channel,
    `@${command.reply}, vou mandar o${plural} e-book${plural} para o${plural} usuário${plural}: ${usersTomentions}.`,
  );
}

export default giveBook;
