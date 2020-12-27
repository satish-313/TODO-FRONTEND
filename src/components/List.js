import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa'
import { useGlobalContext} from '../context';

const List = ({ todo,_id }) => {
  const {deleteTodo, setEditing} = useGlobalContext();
  return (
    <div className="todo-list">
      <h5>{todo}</h5>
      <div className="btn-container">
        <button type="button" className="edit" onClick={() => setEditing(_id)}><FaEdit /></button>
        <button type="button" className="delete" onClick={() => deleteTodo(_id)}><FaTrash /></button>
      </div>
    </div>
  )
}

export default List;