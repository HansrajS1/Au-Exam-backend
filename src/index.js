const express = require('express');
const cors = require('cors');
require('dotenv').config();

const paperRoutes = require('./routes/paperRoutes');

const app = express();
app.use(cors({ origin: ['http://localhost:5173', 'https://auexamweb.netlify.app'] }));
app.use(express.json());

app.use('/api/papers', paperRoutes);

app.listen(3000, () => console.log('Server running on port 3000'));

const db = require('./config/db');


app.get('/', (req, res) => {
  res.send(' API is running');
});
