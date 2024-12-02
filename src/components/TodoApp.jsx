import React, { useState, useEffect } from 'react';
import TodoItem from '../components/TodoItem';
import '../components/App.css';

const TodoApp = () => {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todolist');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const handleAddTodo = () => {
    if (newTitle && newDescription) {
      const newTodoItem = {
        title: newTitle,
        description: newDescription,
        completed: false
      };

      setTodos([...allTodos, newTodoItem]);
      resetFields();
    }
  };

  const resetFields = () => {
    setNewTitle('');
    setNewDescription('');
    setEditIndex(null);
  };

  const handleDeleteTodo = (index) => {
    const updatedTodos = allTodos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  const handleCompleteTodo = (index) => {
    const updatedTodos = allTodos.map((item, i) =>
      i === index ? { ...item, completed: !item.completed } : item
    );
    setTodos(updatedTodos);
  };

  const handleEditTodo = (index) => {
    setNewTitle(allTodos[index].title);
    setNewDescription(allTodos[index].description);
    setEditIndex(index);
  };

  const handleUpdateTodo = () => {
    const updatedTodos = allTodos.map((item, i) =>
      i === editIndex ? { ...item, title: newTitle, description: newDescription } : item
    );
    setTodos(updatedTodos);
    resetFields();
  };

  useEffect(() => {
    localStorage.setItem('todolist', JSON.stringify(allTodos));
  }, [allTodos]);

  return (
    <div className="todo-wrapper">
     
      <div className="todo-input">
        <div className="todo-input-item">
          <label>Title</label>
          <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="Write the title of your task" />
        </div>
        <div className="todo-input-item">
          <label>Description</label>
          <input type="text" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} placeholder="Write the  description of task" />
        </div>
        <div className="todo-input-item">
          <button type="button" onClick={editIndex !== null ? handleUpdateTodo : handleAddTodo} className="primaryBtn">
            {editIndex !== null ? 'Update' : 'Add'}
          </button>
        </div>
      </div>
      <div className="btn-area">
        <button className={`activeBtn ${!isCompleteScreen ? 'active' : ''}`} onClick={() => setIsCompleteScreen(false)}>Todo</button>
        <button className={`activeBtn ${isCompleteScreen ? 'active' : ''}`} onClick={() => setIsCompleteScreen(true)}>Completed</button>
      </div>
      <div className="todo-list">
        {allTodos.filter(todo => todo.completed === isCompleteScreen).map((item, index) => (
          <TodoItem 
            key={index} 
            item={item} 
            index={index} 
            handleDelete={handleDeleteTodo} 
            handleComplete={handleCompleteTodo} 
            handleEdit={handleEditTodo} 
          />
        ))}
      </div>
    </div>
  );
};

export default TodoApp;
