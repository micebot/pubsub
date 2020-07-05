import { ChatUserstate, Client } from 'tmi.js';
import API from './api';
import mentions from './util/extract';
import transformPlural from './util/functions';

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

  const usersToMentions = users.map((user: string) => `@${user}`).join(', ');
  const plural = transformPlural(users);

  client.say(
    channel,
    `@${state['display-name']}, vou mandar o${plural} e-book${plural} para o${plural} usuário${plural}: ${usersToMentions}.`,
  );

  if (!(await api.heartbeat())) await api.authentication();

  const products = await api.getProducts(users.length);

  // eslint-disable-next-line no-restricted-syntax
  for (const [index, user] of users.entries()) {
    // eslint-disable-next-line no-await-in-loop

    // eslint-disable-next-line no-await-in-loop
    const order = await api.getOrder(products[index], {
      modDisplayName: state['display-name'],
      modId: state.id,
      ownerDisplayName: user,
    });

    console.log(`order: ${order}`);

    client.whisper(
      user,
      `Hey ${user}! Aqui está o seu código da casa do código: ${order?.product?.code}. Esperamos que bla bla bla...`,
    );
  }
}

export default giveBook;
