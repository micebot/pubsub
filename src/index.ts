/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */

import { config } from 'dotenv';
import { readdirSync } from 'fs';
import { ChatUserstate, Client } from 'tmi.js';
import { authentication } from './api';

async function run() {
  config();

  if (!(await authentication())) {
    // eslint-disable-next-line no-console
    console.error('Fail to establish connection to API. Killing the mice!');
    return;
  }

  // eslint-disable-next-line no-console
  console.log(
    'Established connection to Micebot API, connection to Twitch IRC...',
  );

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
          // Ignora se for mensagem enviada por um bot.
          if (self) return;

          if (tags.badges?.broadcaster || tags.mod) {
            // Carrega o comando somente para o broadcaster e moderadores.
            const module = await import(`./commands/${file}`);
            await module.default(client, target, tags, message);
          }
        },
      );
    });

  client.connect();
}

run();
