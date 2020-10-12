import { AxiosInstance } from 'axios';
import { config } from 'dotenv';
import querystring from 'querystring';
import OrderCreation, {
  Order,
  Product,
  ProductResponse,
} from '../model/models';
import AxiosClient from './client';

config();

let client: AxiosInstance;

/**
 * Realiza a autenticação do client.
 */
export async function authentication(): Promise<boolean> {
  try {
    client = AxiosClient();

    const res = await client.post(
      '/auth/',
      querystring.stringify({
        username: process.env.PUBSUB_USER,
        password: process.env.PUBSUB_PASS,
      }),
    );

    if (res.status !== 200)
      throw Error(
        `Fail to authenticate the application: ${res.status} - ${res.data}`,
      );

    const token = res.data.access_token;
    if (!token)
      throw new Error(
        `Fail to get access token! Response: ${JSON.stringify(res.data)}.`,
      );
    else {
      Object.assign(client.defaults, {
        headers: { authorization: `Bearer ${token}` },
      });
    }
    return true;
  } catch (err) {
    return false;
  }
}

/**
 * Verifica se o token e aplicação é válida.
 */
export async function heartbeat(): Promise<boolean> {
  try {
    const res = await client.get('/hb/');
    return res.status === 200 && res.data?.valid;
  } catch (err) {
    return false;
  }
}

/**
 * Obtém a lista de produtos disponíveis.
 * @param quantity qualidade de produtos a serem buscados.
 */
export async function getProducts(
  quantity: number,
): Promise<ProductResponse | undefined> {
  try {
    if (!(await heartbeat()) || !(await authentication())) {
      return undefined;
    }

    const res = await client.get(
      `/products/?limit=${quantity}&taken=false&desc=true`,
    );

    if (res.status === 200) {
      return res.data as ProductResponse;
    }
  } catch (err) {
    return undefined;
  }

  return undefined;
}

/**
 * Cria um novo pedido para um produto existente.
 * @param product produto para se criar o pedido.
 * @param creation dados para criação do pedido.
 */
export async function getOrder(
  product: Product,
  creation: OrderCreation,
): Promise<Order | undefined> {
  try {
    if (!(await heartbeat()) || !(await authentication())) {
      return undefined;
    }

    const res = await client.post(
      `/orders/${product.uuid}`,
      {
        mod_id: creation.modId,
        mod_display_name: creation.modDisplayName,
        owner_display_name: creation.ownerDisplayName,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
        },
      },
    );

    if (res.status === 201) {
      return {
        modId: res.data.mod_id,
        modDisplayName: res.data.mod_display_name,
        ownerDisplayName: res.data.owner_display_name,
        requestedAt: res.data.requested_at,
        uuid: res.data.uuid,
        product: {
          code: res.data.product.code,
          summary: res.data.product.summary,
          created_at: res.data.product.create_at,
          updated_at: res.data.product.updated_at,
          uuid: res.data.product.uuid,
        },
      };
    }
  } catch (err) {
    return undefined;
  }

  return undefined;
}
