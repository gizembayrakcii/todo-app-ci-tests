let todos = [];
let id = 1;

module.exports = {
  getAll: () => todos,
  create: (text) => {
    const todo = { id: id++, text };
    todos.push(todo);
    return todo;
  },
  update: (todoId, text) => {
    const todo = todos.find(t => t.id == todoId);
    if (todo) {
      todo.text = text;
      return todo;
    }
    return null;
  },
  remove: (todoId) => {
    const index = todos.findIndex(t => t.id == todoId);
    if (index >= 0) {
      const removed = todos.splice(index, 1)[0];
      return removed;
    }
    return null;
  }
};
