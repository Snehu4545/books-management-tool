// /app.js
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const bookRoutes = require('./routes/api'); // Ensure the path is correct
const errorMiddleware = require('./middlewares/errorMiddleware');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/api/books', bookRoutes);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
