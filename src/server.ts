import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { TodoList } from './todo.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const todoList = new TodoList();

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// 全Todo取得
app.get('/todos', (_req, res) => {
  res.json(todoList.getAllTodos());
});

// Todo追加
app.post('/todos', (req, res) => {
  const { title } = req.body;
  if (!title) {
    res.status(400).json({ error: 'title is required' });
    return;
  }
  const todo = todoList.addTodo(title);
  res.status(201).json(todo);
});

// 特定Todo取得
app.get('/todos/:id', (req, res) => {
  const todo = todoList.getTodo(req.params.id);
  if (!todo) {
    res.status(404).json({ error: 'Todo not found' });
    return;
  }
  res.json(todo);
});

// Todo更新
app.patch('/todos/:id', (req, res) => {
  const { title, completed } = req.body;
  const todo = todoList.updateTodo(req.params.id, { title, completed });
  if (!todo) {
    res.status(404).json({ error: 'Todo not found' });
    return;
  }
  res.json(todo);
});

// Todo完了トグル
app.post('/todos/:id/toggle', (req, res) => {
  const todo = todoList.toggleTodo(req.params.id);
  if (!todo) {
    res.status(404).json({ error: 'Todo not found' });
    return;
  }
  res.json(todo);
});

// Todo削除
app.delete('/todos/:id', (req, res) => {
  const deleted = todoList.deleteTodo(req.params.id);
  if (!deleted) {
    res.status(404).json({ error: 'Todo not found' });
    return;
  }
  res.status(204).send();
});

// 完了済み取得
app.get('/todos/filter/completed', (_req, res) => {
  res.json(todoList.getCompletedTodos());
});

// 未完了取得
app.get('/todos/filter/pending', (_req, res) => {
  res.json(todoList.getPendingTodos());
});

// 完了済み一括削除
app.delete('/todos/filter/completed', (_req, res) => {
  const count = todoList.clearCompleted();
  res.json({ deleted: count });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Todo App running at http://localhost:${PORT}`);
});
