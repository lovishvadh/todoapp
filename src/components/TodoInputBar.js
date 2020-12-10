import React, { useState } from 'react';
// import { TextField, InputAdornment, Input} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const TodoInputBar = ({ addNewTodo }) => {
  const [todo, setTodo] = useState("");
  return (
    <form noValidate autoComplete="off" onSubmit={(event) => { 
      addNewTodo(event, todo);
      setTodo("");
      }}>
       <div className="input-container">
        <AddIcon className="add-icon"/>
        <input value={todo} onChange={(event) => setTodo(event.target.value)} className="Todo-input" variant="standard" placeholder="What needs to be done?"/>
        </div>
    </form>
  )
}

export default TodoInputBar;