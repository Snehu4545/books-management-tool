const db = require('../config/database');
const multer = require('multer');
const path = require('path');


exports.getBooks = async (req, res) => {
  const query = 'SELECT * FROM books WHERE active = 1';  
  try {
    const [results] = await db.query(query);
    res.json(results);
  } catch (err) {
    console.log('errror,', err)
    return res.status(500).json({ error: 'Database error', details: err.message });
  }
};


exports.getBook = async (req, res) => {
  const { id } = req.params; 
  if (isNaN(id)) {
    return res.status(400).json({ message: 'Invalid book ID' });
  }
  const query = 'SELECT * FROM books WHERE id = ? ';
  try {
    const [results] = await db.query(query, [id]); 
    if (results.length === 0) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(results[0]);
  } catch (err) {
    console.error('Database error:', err);
    return res.status(500).json({ error: 'Database error', details: err.message });
  }
};


exports.getBookTypes = async (req, res) => {
  const query = 'SELECT * FROM 	book_type';
  try {
    const [results] = await db.query(query);
    res.json(results);
  } catch (err) {
    console.log('Error:', err);
    return res.status(500).json({ error: 'Database error', details: err.message });
  }
};


exports.getGenres = async (req, res) => {
  const query = 'SELECT * FROM 	genre_master';
  try {
    const [results] = await db.query(query);
    res.json(results);
  } catch (err) {
    console.log('Error:', err);
    return res.status(500).json({ error: 'Database error', details: err.message });
  }
};


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); 
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); 
    },
});

const upload = multer({ storage: storage });

exports.createBook = async (req, res) => {
    try {
        const { title, author, book_type_id, book_genre_id, publication, num_pages, price } = req.body;
        
        const cover_photo = req.file ? req.file.path : '';  

        // Insert data into the database
        const query = 'INSERT INTO books (title, author, book_type_id, book_genre_id, publication, num_pages, price, cover_photo, active) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
        const [result] = await db.query(query, [title, author, book_type_id, book_genre_id, publication, num_pages, price, cover_photo, 1]);

        res.status(201).json({ message: 'Book created successfully', book_id: result.insertId });
    } catch (err) {
        console.error('Error during book creation:', err);
        res.status(500).json({ error: 'Database error', details: err.message });
    }
};

exports.updateBook = async (req, res) => {
  const { id } = req.params;
  const { title, author, book_type_id, book_genre_id, publication, num_pages, price } = req.body;
  let cover_photo = req.file ? req.file.path : null;
  try {
    const [existingBook] = await db.query('SELECT cover_photo FROM books WHERE id = ?', [id]);

    if (existingBook.length === 0) {
      return res.status(404).json({ message: 'Book not found' });
    }

    if (!cover_photo) {
      cover_photo = existingBook[0].cover_photo;
    }
    const query = `
      UPDATE books
      SET title = ?, author = ?, book_type_id = ?, book_genre_id = ?, publication = ?, num_pages = ?, price = ?, cover_photo = ?
      WHERE id = ?
    `;

    const [result] = await db.query(query, [title, author, book_type_id, book_genre_id, publication, num_pages, price, cover_photo, id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json({ message: 'Book updated successfully' });
  } catch (err) {
    console.error('Database error:', err); 
    return res.status(500).json({ error: 'Database error', details: err.message });
  }
};

exports.deleteBook = async (req, res) => {
  const { id } = req.params; 
  
  const query = 'UPDATE books SET active = 0 WHERE id = ?'; 
  try {
    const [result] = await db.query(query, [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json({ message: 'Book deactivated successfully' });
  } catch (err) {
    console.error('Database error:', err); 
    return res.status(500).json({ error: 'Database error', details: err.message });
  }
};
