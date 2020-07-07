import { ChatUserstate, Client } from 'tmi.js';
import API from './api';
import {
  giveBookChatMessage,
  giveBookWhisperMessage,
  helpWhisperMessage,
} from './model/messages';
import mentions from './util';

type GiveBookCommand = {
  client: Client;
  message: string;
  reply: string | undefined;
  channel: string;
};

async function giveBook(
  message: string,
  channel: string,
  client: Client,
  state: ChatUserstate,
  api: API,
) {
  const users = mentions(message);

  if (users.length === 0) return;

  if (state.id === undefined || state['display-name'] === undefined) return;

  client.say(channel, giveBookChatMessage(state['display-name'], users));

  if (!(await api.heartbeat())) await api.authentication();

  const products = await api.getProducts(users.length);

  // eslint-disable-next-line no-restricted-syntax
  for (const [index, user] of users.entries()) {
    // eslint-disable-next-line no-await-in-loop
    const order = await api.getOrder(products[index], {
      modDisplayName: state['display-name'],
      modId: state.id,
      ownerDisplayName: user,
    });

    // TODO: tratamento caso falhe a criação de pedido.
    if (order === undefined) return;

    client.whisper(user, giveBookWhisperMessage(user, order.product.code));
    client.whisper(user, helpWhisperMessage());
  }
}

export default giveBook;
