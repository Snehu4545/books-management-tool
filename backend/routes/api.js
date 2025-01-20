
const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const upload = require('../config/multerConfig');

router.get('/books', bookController.getBooks);
router.get('/books/:id', bookController.getBook);
router.post('/books', upload.single('cover_photo'), bookController.createBook);
router.put('/books/:id', upload.single('cover_photo'), bookController.updateBook);
router.put('/books/:id/deactivate', bookController.deleteBook);
router.get('/book_types', bookController.getBookTypes);
router.get('/genres', bookController.getGenres);


module.exports = router;
