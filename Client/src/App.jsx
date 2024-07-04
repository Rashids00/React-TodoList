import React, { useState, useEffect } from 'react';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';
import axios from 'axios';

const App = () => {

  const [todos, setTodos] = useState([]);

    const fetchTodos = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/tasks');
          setTodos(response.data);
      } catch (error) {
        throw new Error('Error fetching data:', error);
      }
    };

    useEffect(() => {
    fetchTodos();
  }, []);

  const handleUpdate = (updatedTodos) => {
    setTodos(updatedTodos);
  };

  const AddTodoToList = () => {
    fetchTodos();
  }

  return (
    <div className='min-h-screen bg-gray-100 py-6 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-xl mx-auto'>
        <h1 className='flex mt-6 text-3xl font-bold text-gray-800 mb-8 justify-center'>Todo List</h1>
        <AddTodo addTodoToList={AddTodoToList} />
        <TodoList todos={todos} onUpdate={handleUpdate} />
      </div>
    </div>
  );
};

export default App;
