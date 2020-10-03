import Axios from 'axios';
import { config } from 'dotenv';

config();

export default () => {
  return Axios.create({
    baseURL: process.env.API_ENDPOINT,
  });
};
