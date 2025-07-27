import { useEffect, useState } from 'react';
import { getTodos, createTodo, updateTodo, deleteTodo } from '../services/api';

export default function Todo() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const [editing, setEditing] = useState(null);

  const fetchTodos = async () => {
    const res = await getTodos();
    setTodos(res.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) {
      await updateTodo(editing.id, text);
    } else {
      await createTodo(text);
    }
    setText('');
    setEditing(null);
    fetchTodos();
  };

  const handleEdit = (todo) => {
    setEditing(todo);
    setText(todo.text);
  };

  const handleDelete = async (id) => {
    await deleteTodo(id);
    fetchTodos();
  };

  return (
    <div>
      <h2>Todo List</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Enter todo"
          value={text}
          onChange={(e) => setText(e.target.value)}
          data-testid="todo-input"
        />
        <button type="submit">{editing ? 'Update' : 'Add'}</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text}{' '}
            <button onClick={() => handleEdit(todo)}>Edit</button>
            <button onClick={() => handleDelete(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
