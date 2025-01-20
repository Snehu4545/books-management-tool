
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/api');  
const path = require('path');

const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: '*',  
}));  
app.use(bodyParser.json());  

app.use('/api', apiRoutes);  

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(PORT, () => {
  console.log('Server is running on http://localhost:' +PORT);
});
