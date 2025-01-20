
const db = require('../config/db');

const getAllBooks = async () => {
  const [rows] = await db.execute('SELECT * FROM books WHERE active = 1');
  return rows;
};

const getBookById = async (id) => {
  const [rows] = await db.execute('SELECT * FROM books WHERE book_id = ? AND active = 1', [id]);
  return rows[0];
};

const addBook = async (title, author, book_type_id, book_genre_id, publication, num_pages, price, cover_photo) => {
  const [result] = await db.execute(
    'INSERT INTO books (title, author, book_type_id, book_genre_id, publication, num_pages, price, cover_photo) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', 
    [title, author, book_type_id, book_genre_id, publication, num_pages, price, cover_photo]
  );
  return result.insertId;
};

const updateBook = async (id, title, author, book_type_id, book_genre_id, publication, num_pages, price, cover_photo) => {
  await db.execute(
    'UPDATE books SET title = ?, author = ?, book_type_id = ?, book_genre_id = ?, publication = ?, num_pages = ?, price = ?, cover_photo = ? WHERE book_id = ?',
    [title, author, book_type_id, book_genre_id, publication, num_pages, price, cover_photo, id]
  );
};

const deactivateBook = async (id) => {
  await db.execute('UPDATE books SET active = 0 WHERE book_id = ?', [id]);
};

module.exports = {
  getAllBooks,
  getBookById,
  addBook,
  updateBook,
  deactivateBook
};
