import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { askAI } from './controllers/askController.js';
import paperRoutes from './routes/paperRoutes.js';
import db from './config/db.js';
import { securityMiddleware } from './middlewares/security.js';

dotenv.config();

const app = express();

app.use(cors({
  origin: [
    'https://auexamweb.netlify.app',
    'https://auexamapp.tech',
  ],
}));

app.use(express.json());

app.use(securityMiddleware);

app.use('/api/papers', paperRoutes);

app.get('/', (req, res) => {
  res.send('API is running');
});

app.get('/health', async (req, res) => {
  try {
    await db.raw('SELECT 1');
    res.status(200).json({
      status: 'ok',
      database: 'connected',
      message: 'Server and DB healthy'
    });
  } catch (error) {
    res.status(503).json({
      status: 'error',
      database: 'unavailable',
      message: 'Database connection failed',
      error: error.message
    });
  }
});

app.post('/api/ask', askAI);

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
