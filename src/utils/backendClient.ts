import axios from 'axios';

const backendClient = axios.create({
  baseURL: process.env.BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default backendClient;
