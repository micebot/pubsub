/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */

import { config } from 'dotenv';
import { readdirSync } from 'fs';
import { ChatUserstate, Client } from 'tmi.js';
import { authentication } from './api';

async function run() {
  config();

  await authentication();

  const client = Client({
    options: { debug: process.env.NODE_ENV !== 'production' },
    connection: {
      secure: true,
      reconnect: true,
    },
    identity: {
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
    },
    channels: process.env.CHANNEL?.split(',') || [],
  });

  readdirSync(`${__dirname}/commands`)
    .filter((file) => file.slice(-3) === '.js')
    .forEach(async (file) => {
      client.on(
        'message',
        async (
          target: string,
          tags: ChatUserstate,
          message: string,
          self: boolean,
        ) => {
          if (self) return;
          const module = await import(`./commands/${file}`);
          module.default(client, target, tags, message);
        },
      );
    });

  client.connect();
}

run();
