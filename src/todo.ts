export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}

export class TodoList {
  private todos: Map<string, Todo> = new Map();

  generateId(): string {
    return Math.random().toString(36).substring(2, 9);
  }

  addTodo(title: string): Todo {
    const todo: Todo = {
      id: this.generateId(),
      title,
      completed: false,
      createdAt: new Date(),
    };
    this.todos.set(todo.id, todo);
    return todo;
  }

  getTodo(id: string): Todo | undefined {
    return this.todos.get(id);
  }

  getAllTodos(): Todo[] {
    return Array.from(this.todos.values());
  }

  updateTodo(id: string, updates: Partial<Pick<Todo, 'title' | 'completed'>>): Todo | undefined {
    const todo = this.todos.get(id);
    if (!todo) return undefined;

    const updated = { ...todo, ...updates };
    this.todos.set(id, updated);
    return updated;
  }

  toggleTodo(id: string): Todo | undefined {
    const todo = this.todos.get(id);
    if (!todo) return undefined;

    return this.updateTodo(id, { completed: !todo.completed });
  }

  deleteTodo(id: string): boolean {
    return this.todos.delete(id);
  }

  getCompletedTodos(): Todo[] {
    return this.getAllTodos().filter((todo) => todo.completed);
  }

  getPendingTodos(): Todo[] {
    return this.getAllTodos().filter((todo) => !todo.completed);
  }

  clearCompleted(): number {
    const completed = this.getCompletedTodos();
    completed.forEach((todo) => this.todos.delete(todo.id));
    return completed.length;
  }
}
