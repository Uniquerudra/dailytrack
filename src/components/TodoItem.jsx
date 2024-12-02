import React from 'react';
import { MdDelete } from "react-icons/md";
import { AiOutlineCheck } from "react-icons/ai";

const TodoItem = ({ item, index, handleDelete, handleComplete, handleEdit }) => {
  return (
    <div className="todo-list-item" key={index}>
      <div>
        <h3 style={{ textDecoration: item.completed ? 'line-through' : 'none' }}>{item.title}</h3>
        <p>{item.description}</p>
      </div>
      <div>
        <MdDelete className='icon' onClick={() => handleDelete(index)} />
        <AiOutlineCheck className='check-icon' onClick={() => handleComplete(index)} />
        <button onClick={() => handleEdit(index)} className="editBtn">Edit</button>
      </div>
    </div>
  );
};

export default TodoItem;
