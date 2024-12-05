import axios from 'axios';

const API_URL = 'http://localhost:5000/api/contracts';

export const calculateInstallments = (data) =>
  axios.post(`${API_URL}/calculate`, data);

export const getLateFees = (contractNo) =>
  axios.get(`${API_URL}/late-fees/${contractNo}`);
