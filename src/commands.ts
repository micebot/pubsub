import { ChatUserstate, Client } from 'tmi.js';
import { authentication, getOrder, getProducts, heartbeat } from './api';
import {
  giveBookChatMessage,
  giveBookWhisperMessage,
  helpWhisperMessage,
  noPruductAvailableMessage,
  unavailableProductMessage,
} from './model/messages';
import { mentions } from './util';

async function giveBook(
  message: string,
  channel: string,
  client: Client,
  state: ChatUserstate,
) {
  const users = mentions(message);

  if (users.length === 0) return;

  if (state.id === undefined || state['display-name'] === undefined) return;

  client.say(channel, giveBookChatMessage(state['display-name'], users));

  if (!(await heartbeat())) await authentication();

  const products = await getProducts(users.length);

  // TODO: dar feedback para o moderador em caso de falha para obter os produtos.
  if (products === undefined || products.products === undefined) return;

  if (products.total.available === 0) {
    client.whisper(
      state['display-name'],
      noPruductAvailableMessage(state['display-name']),
    );
    return;
  }

  if (products.total.available < users.length) {
    client.whisper(
      state['display-name'],
      unavailableProductMessage(
        state['display-name'],
        products.total.available,
        users.length,
      ),
    );
    return;
  }

  // eslint-disable-next-line no-restricted-syntax
  for (const [index, user] of users.entries()) {
    // eslint-disable-next-line no-await-in-loop
    const order = await getOrder(products.products[index], {
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
