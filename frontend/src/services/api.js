import axios from "axios";

const API_URL = "https://super-duper-memory-jjrvp6vr5qg9cp6q9-5000.app.github.dev/api"; 

export const getFicha = () => axios.get(`${API_URL}/fichas`);
export const createFicha = (ficha) => axios.post(`${API_URL}/fichas`, ficha);
export const deleteFicha = (id) => axios.delete(`${API_URL}/fichas/${id}`);
