import axios from 'axios';

const API_URL = 'http://localhost:3000/api/books';

const getBooks = async () => {
  return await axios.get(API_URL);
};

const getBookById = async (id) => {
  return await axios.get(`${API_URL}/${id}`);
};

const createBook = async (bookData) => {
  return await axios.post(API_URL, bookData);
};

const updateBook = async (id, bookData) => {
  return await axios.put(`${API_URL}/${id}`, bookData);
};

const deleteBook = async (id) => {
  return await axios.delete(`${API_URL}/${id}`);
};

export { getBooks, getBookById, createBook, updateBook, deleteBook };
