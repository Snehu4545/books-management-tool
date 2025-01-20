import axios from "axios";

const API_BASE = "http://localhost:3000/api"; 
export const fetchBooks = async () => {
  const response = await axios.get(`${API_BASE}/books`);
  return response.data;
};

export const fetchBookById = async (id) => {
  const response = await axios.get(`${API_BASE}/books/${id}`);
  return response.data;
};

export const addBook = async (book) => {
  const response = await axios.post(`${API_BASE}/books`, book);
  return response.data;
};

export const updateBook = async (id, book) => {
  const response = await axios.put(`${API_BASE}/books/${id}`, book);
  return response.data;
};

export const deactivateBook = async (id) => {
  const response = await axios.put(`${API_BASE}/books/deactivate/${id}`);
  return response.data;
};

export const fetchBookTypes = async () => {
  const response = await axios.get(`${API_BASE}/book-types`);
  return response.data;
};

export const fetchBookGenres = async () => {
  const response = await axios.get(`${API_BASE}/book-genres`);
  return response.data;
};
