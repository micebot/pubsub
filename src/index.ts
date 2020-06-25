import { Client, CommonUserstate } from 'tmi.js';
import configuration from './configuration';
import mentions from './extract';

const config = configuration();

const client = Client({
  options: { debug: true },
  connection: {
    reconnect: true,
    secure: true,
  },
  identity: {
    username: config.username,
    password: config.password,
  },
  channels: config.channels,
});

client.on('message', (channel: string, state: CommonUserstate, message: string, self: boolean) => {
  if (self) return;

  if (!message.includes('!givebook') || !state.mod) return;

  const users = mentions(message);

  if (!users) return;

  const usersTomentions = users.map((user) => `@${user}`).join(', ');
  const xpto = `${users.length === 1 ? 'o' : 'os'}`;
  const xptoS = users.length === 1 ? '' : 's';

  client.say(
    channel,
    `@${state['display-name']}, vou mandar ${xpto} e-book${xptoS} para ${xpto} usuári${xpto}: ${usersTomentions}.`,
  );

  // TODO: esperar a verificação do bot.
  // users.map(async (user: string) => {
  //   await client.whisper(user, 'Eu vou te dar um book!');
  // });
});

client.connect();
