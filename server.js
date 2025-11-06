import express from 'express';
import dotenv from 'dotenv';
import pool from './db.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// GET all tasks
app.get('/tasks', async (req, res, next) => {
  try {
    const result = await pool.query('SELECT * FROM tasks ORDER BY id ASC');
    res.status(200).json(result.rows);
  } catch (err) {
    next(err);
  }
});

// POST create a task
app.post('/tasks', async (req, res, next) => {
  try {
    const { title } = req.body;
    if (!title) return res.status(400).json({ error: 'Title is required' });

    const result = await pool.query(
      'INSERT INTO tasks (title) VALUES ($1) RETURNING *',
      [title]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

// PUT update task by ID
app.put('/tasks/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;

    const result = await pool.query(
      'UPDATE tasks SET title=$1, completed=$2 WHERE id=$3 RETURNING *',
      [title, completed, id]
    );

    if (result.rowCount === 0) return res.status(404).json({ error: 'Task not found' });
    res.status(200).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

// PATCH toggle completed
app.patch('/tasks/:id/completed', async (req, res, next) => {
  try {
    const { id } = req.params;

    const existing = await pool.query('SELECT * FROM tasks WHERE id=$1', [id]);
    if (existing.rowCount === 0) return res.status(404).json({ error: 'Task not found' });

    const newStatus = !existing.rows[0].completed;
    const result = await pool.query(
      'UPDATE tasks SET completed=$1 WHERE id=$2 RETURNING *',
      [newStatus, id]
    );

    res.status(200).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

// DELETE task by ID
app.delete('/tasks/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM tasks WHERE id=$1 RETURNING *', [id]);
    if (result.rowCount === 0) return res.status(404).json({ error: 'Task not found' });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
