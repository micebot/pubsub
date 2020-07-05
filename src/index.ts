import { config } from 'dotenv';
import { ChatUserstate, Client } from 'tmi.js';
import API from './api';
import giveBook from './commands';

async function run() {
  config();

  const api = new API();
  await api.authentication();

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
        giveBook(message, channel, client, userstate, api);
    },
  );

  client.connect();
}

run();

// async function test() {
//   const api = new API();
//   await api.authentication();

//   const products = await api.getProducts(10);
//   const orders: Array<OrderCreation> = [
//     {
//       mod_display_name: 'rn4n',
//       owner_display_name: 'milaxd',
//       mod_id: 'dsdjkasjdkjaskldj',
//     },
//   ];

//   orders.map(async (order, index) => {
//     const createdOrder = await api.getOrder(products[index], order);
//     console.log(`Pedido criado: ${createdOrder}`);
//   });
// }

// test();
