import React, { useState } from 'react';
import { Todo } from '../types';
import TodoItem from './TodoItem';

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoText, setNewTodoText] = useState<string>('');

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodoText.trim() === '') return;

    const newTodo: Todo = {
      id: Date.now().toString(), // Simple unique ID
      text: newTodoText.trim(),
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setNewTodoText('');
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="w-full max-w-md md:max-w-lg lg:max-w-xl bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-2xl p-6 sm:p-8">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-white text-center mb-6 drop-shadow-lg">
        My Todo List
      </h1>
      <form onSubmit={addTodo} className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          placeholder="Add a new todo..."
          className="flex-grow p-3 rounded-lg border-2 border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent text-gray-800 text-base sm:text-lg transition-all duration-200"
          aria-label="New todo text"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-white text-indigo-700 font-semibold rounded-lg shadow-md hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-75 transition-all duration-200 transform hover:scale-105"
        >
          Add Todo
        </button>
      </form>
      <div className="bg-indigo-100 p-4 rounded-lg shadow-inner max-h-96 overflow-y-auto custom-scrollbar">
        {todos.length === 0 ? (
          <p className="text-center text-indigo-700 text-lg py-4">No todos yet! Add one above.</p>
        ) : (
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TodoList;
