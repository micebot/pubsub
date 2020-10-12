/* eslint-disable no-await-in-loop */
import { ChatUserstate, Client } from 'tmi.js';
import { authentication, getOrder, getProducts, heartbeat } from '../api';
import failedToFetchProducts from '../model/messages/api-errors';
import {
  bookCommandUserWhisper,
  bookCommandNotAvailableModeratorWhisper,
  bookCommandNumberOfProductsIsLessThanRequiredWhisper,
  bookCommandFailedToCreateAOrderWhisper,
} from '../model/messages/book';

import helpWhisperMessage from '../model/messages/generic';

import { mentions, removeBotUsernameFromUsers } from '../util';

export default async (
  client: Client,
  _: string,
  tags: ChatUserstate,
  message: string,
) => {
  // Se não for o comando correto.
  if (!message.startsWith('!book')) return;

  // Ignora se não conseguir obter o ID e o nome de usuário de quem usou o comando.
  if (tags.id === undefined || tags['display-name'] === undefined) return;

  const users = removeBotUsernameFromUsers(mentions(message));

  // Nenhum usuário mencionado.
  if (users.length === 0) return;

  const moderatorDisplayName = tags['display-name'];

  if (!(await heartbeat())) await authentication();

  const products = await getProducts(users.length);

  // Se ocorrer falha na conexão com a API para obter os produtos.
  if (products === undefined || products.products === undefined) {
    await client.whisper(moderatorDisplayName, failedToFetchProducts());
    return;
  }

  // Se o número de produtos disponíveis for zero.
  if (products.total.available === 0) {
    await client.whisper(
      moderatorDisplayName,
      bookCommandNotAvailableModeratorWhisper(moderatorDisplayName),
    );
    return;
  }

  // Se o número de produtos disponíveis for menor que o solicitado.
  if (products.total.available < users.length) {
    await client.whisper(
      moderatorDisplayName,
      bookCommandNumberOfProductsIsLessThanRequiredWhisper(
        moderatorDisplayName,
        products.total.available,
        users.length,
      ),
    );
    return;
  }

  // eslint-disable-next-line no-restricted-syntax
  for (const [index, user] of users.entries()) {
    const order = await getOrder(products.products[index], {
      modDisplayName: moderatorDisplayName,
      modId: tags.id,
      ownerDisplayName: user,
    });

    // Se houver problema na criação do pedido, o moderador será informado.
    if (order === undefined) {
      await client.whisper(
        moderatorDisplayName,
        bookCommandFailedToCreateAOrderWhisper(user),
      );
    } else {
      await client.whisper(
        user,
        bookCommandUserWhisper(user, order.product.code),
      );
      await client.whisper(user, helpWhisperMessage());
    }
  }
};
