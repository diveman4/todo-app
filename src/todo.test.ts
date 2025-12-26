import { describe, it, expect, beforeEach } from 'vitest';
import { TodoList } from './todo';

describe('TodoList', () => {
  let todoList: TodoList;

  beforeEach(() => {
    todoList = new TodoList();
  });

  describe('addTodo', () => {
    it('should add a new todo with correct properties', () => {
      const todo = todoList.addTodo('Buy milk');

      expect(todo.title).toBe('Buy milk');
      expect(todo.completed).toBe(false);
      expect(todo.id).toBeDefined();
      expect(todo.createdAt).toBeInstanceOf(Date);
    });

    it('should generate unique IDs for each todo', () => {
      const todo1 = todoList.addTodo('Task 1');
      const todo2 = todoList.addTodo('Task 2');

      expect(todo1.id).not.toBe(todo2.id);
    });
  });

  describe('getTodo', () => {
    it('should return the todo by ID', () => {
      const added = todoList.addTodo('Test todo');
      const found = todoList.getTodo(added.id);

      expect(found).toEqual(added);
    });

    it('should return undefined for non-existent ID', () => {
      const found = todoList.getTodo('non-existent');

      expect(found).toBeUndefined();
    });
  });

  describe('getAllTodos', () => {
    it('should return empty array when no todos exist', () => {
      expect(todoList.getAllTodos()).toEqual([]);
    });

    it('should return all todos', () => {
      todoList.addTodo('Task 1');
      todoList.addTodo('Task 2');
      todoList.addTodo('Task 3');

      expect(todoList.getAllTodos()).toHaveLength(3);
    });
  });

  describe('updateTodo', () => {
    it('should update todo title', () => {
      const todo = todoList.addTodo('Original title');
      const updated = todoList.updateTodo(todo.id, { title: 'Updated title' });

      expect(updated?.title).toBe('Updated title');
    });

    it('should update todo completed status', () => {
      const todo = todoList.addTodo('Task');
      const updated = todoList.updateTodo(todo.id, { completed: true });

      expect(updated?.completed).toBe(true);
    });

    it('should return undefined for non-existent ID', () => {
      const updated = todoList.updateTodo('non-existent', { title: 'New' });

      expect(updated).toBeUndefined();
    });
  });

  describe('toggleTodo', () => {
    it('should toggle completed from false to true', () => {
      const todo = todoList.addTodo('Task');
      const toggled = todoList.toggleTodo(todo.id);

      expect(toggled?.completed).toBe(true);
    });

    it('should toggle completed from true to false', () => {
      const todo = todoList.addTodo('Task');
      todoList.updateTodo(todo.id, { completed: true });
      const toggled = todoList.toggleTodo(todo.id);

      expect(toggled?.completed).toBe(false);
    });

    it('should return undefined for non-existent ID', () => {
      const toggled = todoList.toggleTodo('non-existent');

      expect(toggled).toBeUndefined();
    });
  });

  describe('deleteTodo', () => {
    it('should delete existing todo and return true', () => {
      const todo = todoList.addTodo('Task to delete');
      const result = todoList.deleteTodo(todo.id);

      expect(result).toBe(true);
      expect(todoList.getTodo(todo.id)).toBeUndefined();
    });

    it('should return false for non-existent ID', () => {
      const result = todoList.deleteTodo('non-existent');

      expect(result).toBe(false);
    });
  });

  describe('getCompletedTodos', () => {
    it('should return only completed todos', () => {
      const todo1 = todoList.addTodo('Task 1');
      todoList.addTodo('Task 2');
      const todo3 = todoList.addTodo('Task 3');

      todoList.toggleTodo(todo1.id);
      todoList.toggleTodo(todo3.id);

      const completed = todoList.getCompletedTodos();

      expect(completed).toHaveLength(2);
      expect(completed.every((t) => t.completed)).toBe(true);
    });
  });

  describe('getPendingTodos', () => {
    it('should return only pending todos', () => {
      const todo1 = todoList.addTodo('Task 1');
      todoList.addTodo('Task 2');
      todoList.addTodo('Task 3');

      todoList.toggleTodo(todo1.id);

      const pending = todoList.getPendingTodos();

      expect(pending).toHaveLength(2);
      expect(pending.every((t) => !t.completed)).toBe(true);
    });
  });

  describe('clearCompleted', () => {
    it('should remove all completed todos and return count', () => {
      const todo1 = todoList.addTodo('Task 1');
      todoList.addTodo('Task 2');
      const todo3 = todoList.addTodo('Task 3');

      todoList.toggleTodo(todo1.id);
      todoList.toggleTodo(todo3.id);

      const removed = todoList.clearCompleted();

      expect(removed).toBe(2);
      expect(todoList.getAllTodos()).toHaveLength(1);
      expect(todoList.getCompletedTodos()).toHaveLength(0);
    });

    it('should return 0 when no completed todos exist', () => {
      todoList.addTodo('Task 1');
      todoList.addTodo('Task 2');

      const removed = todoList.clearCompleted();

      expect(removed).toBe(0);
    });
  });
});
