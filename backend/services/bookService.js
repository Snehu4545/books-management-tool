const express = require("express");
const router = express.Router();
const db = require("../config/database");

router.get("/books", async (req, res) => {
  try {
    const books = await db.query("SELECT * FROM books WHERE is_active = 1");
    res.json(books);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/books/:id", async (req, res) => {
  try {
    const book = await db.query("SELECT * FROM books WHERE id = ?", [req.params.id]);
    res.json(book[0]);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post("/books", async (req, res) => {
  try {
    const { title, author, type_id, genre_id, publisher, pages, price, cover_photo } = req.body;
    await db.query(
      "INSERT INTO books (title, author, type_id, genre_id, publisher, pages, price, cover_photo, is_active) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1)",
      [title, author, type_id, genre_id, publisher, pages, price, cover_photo]
    );
    res.status(201).send("Book added successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.put("/books/:id", async (req, res) => {
  try {
    const { title, author, type_id, genre_id, publisher, pages, price, cover_photo } = req.body;
    await db.query(
      "UPDATE books SET title = ?, author = ?, type_id = ?, genre_id = ?, publisher = ?, pages = ?, price = ?, cover_photo = ? WHERE id = ?",
      [title, author, type_id, genre_id, publisher, pages, price, cover_photo, req.params.id]
    );
    res.send("Book updated successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.put("/books/deactivate/:id", async (req, res) => {
  try {
    await db.query("UPDATE books SET is_active = 0 WHERE id = ?", [req.params.id]);
    res.send("Book deactivated successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/book-types", async (req, res) => {
  try {
    const types = await db.query("SELECT * FROM book_types");
    res.json(types);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/book-genres", async (req, res) => {
  try {
    const genres = await db.query("SELECT * FROM book_genres");
    res.json(genres);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
