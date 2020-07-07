import Axios, { AxiosInstance } from 'axios';
import querystring from 'querystring';
import Order from '../model/order';
import OrderCreation from '../model/order-creation';
import Product from '../model/product';

export default class API {
  private client: AxiosInstance;

  constructor() {
    this.client = Axios.create({
      baseURL: process.env.API_ENDPOINT,
    });
  }

  public async authentication() {
    const res = await this.client.post(
      '/auth/',
      querystring.stringify({
        username: process.env.PS_USER,
        password: process.env.PS_PASS,
      }),
    );

    if (res.status === 200) {
      const token = res.data.access_token;
      if (!token)
        throw new Error(`Fail to get access token! Response: ${res.data}.`);
      else {
        Object.assign(this.client.defaults, {
          headers: { authorization: `Bearer ${token}` },
        });
      }
    }
  }

  public async heartbeat(): Promise<boolean> {
    const res = await this.client.get('/hb');
    return res.status === 200 && res.data.valid;
  }

  public async getProducts(quantity: number): Promise<Array<Product>> {
    const res = await this.client.get(
      `/products?limit=${quantity}&taken=false`,
    );

    if (res.status === 200) {
      return res.data as Array<Product>;
    }

    return [];
  }

  public async getOrder(
    product: Product,
    creation: OrderCreation,
  ): Promise<Order | undefined> {
    const params = {
      mod_id: creation.modId,
      mod_display_name: creation.modDisplayName,
      owner_display_name: creation.ownerDisplayName,
    };
    const res = await this.client.post(`/orders/${product.uuid}`, params, {
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
    });
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
          taken: res.data.product.taken,
          uuid: res.data.product.uuid,
          takenAt: res.data.product.taken_at,
        },
      };
    }

    return undefined;
  }
}
