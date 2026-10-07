const express = require('express');
const path = require('node:path');
const pool = require('./db/database');
const initializeDatabase = require('./db/schema');

const app = express();
const port = Number(process.env.PORT || 3000);

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/health', async (req, res, next) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'ok', database: 'connected' });
  } catch (error) {
    next(error);
  }
});

async function startServer() {
  await initializeDatabase();
  app.listen(port, () => {
    console.log(`Server avviato su http://localhost:${port}`);
  });
}

startServer().catch(async (error) => {
  console.error('Avvio non riuscito: impossibile connettersi o inizializzare il database.', error);
  await pool.end();
  process.exitCode = 1;
});