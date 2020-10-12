import Axios from 'axios';
import { config } from 'dotenv';

export default () => {
  config();

  return Axios.create({
    baseURL: process.env.API_ENDPOINT,
  });
};
