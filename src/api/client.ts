import Axios from 'axios';
import { config } from 'dotenv';

config();

export default Axios.create({
  baseURL: process.env.API_ENDPOINT,
});
