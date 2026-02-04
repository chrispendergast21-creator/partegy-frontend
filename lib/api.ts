import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getPartnerships = () => api.get('/partnerships');
export const getPartnership = (id: string) => api.get(`/partnerships/${id}`);
