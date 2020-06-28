import { Client, CommonUserstate } from 'tmi.js';
import giveBook from './commands';
import configuration from './configuration';

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

  if (message.includes('!givebook') && state.mod)
    giveBook({ channel, client, message, reply: state['display-name'] });

  // TODO: esperar a verificação do bot.
  // users.map(async (user: string) => {
  //   await client.whisper(user, 'Eu vou te dar um book!');
  // });
});

client.connect();
