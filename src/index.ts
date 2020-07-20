import { config } from 'dotenv';
import { ChatUserstate, Client } from 'tmi.js';
import { authentication } from './api';
import giveBook from './commands';


config() // TODO: ver porque o .env não está sendo carregado em process.env.*

async function run() {

  await authentication();

  const client = Client({
    options: { debug: process.env.NODE_ENV !== 'production' },
    identity: {
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
    },
    channels: [process.env.CHANNEL || ''],
  });

  client.on(
    'message',
    (
      channel: string,
      userstate: ChatUserstate,
      message: string,
      self: boolean,
    ) => {
      if (self) return;

      if (
        message.includes('!book') &&
        (userstate.mod || userstate.badges?.broadcaster)
      )
        giveBook(message, channel, client, userstate);
    },
  );

  client.connect();
}

run();