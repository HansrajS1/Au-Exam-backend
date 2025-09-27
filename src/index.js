const express = require('express');
const cors = require('cors');
require('dotenv').config();

const paperRoutes = require('./routes/paperRoutes');
const db = require('./config/db');

const app = express();

app.use(cors({
  origin: ['http://localhost:5173', 'https://auexamweb.netlify.app']
}));

app.use(express.json());

app.use('/api/papers', paperRoutes);

app.get('/', (req, res) => {
  res.send('API is running');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
