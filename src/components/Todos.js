import React, { useState } from 'react';
import DeleteIcon from "@material-ui/icons/Delete";
import { Radio } from '@material-ui/core';

const Todos = ({todos, deleteTodo, moveToDone, listType ,startEditing, finishEditing}) => {
const [updatedTodo, setUpdatedTodo] = useState("");
const [editingId, setEditingId] = useState("");
function clearAnyUnfinishedEditing () {
    if(Number.isInteger(editingId)) finishEditing(editingId, updatedTodo); 
    setUpdatedTodo("");
    setEditingId("");
}
  const todoList = todos.length ? (
    todos.map((todo, index) => {
      return (
        <div className={todo.completed_at ?  todo.isNew ? "collection-item done animate-me" : "collection-item done" : todo.isNew ?  "collection-item  animate-me" : "collection-item" } key={todo.id}>
        <Radio
            checked={listType !== "todos"}
            value={true}
            name="radio"
            inputProps={{ 'aria-label': 'A' }}
            onClick={() => {
              if(!todo.completed_at) clearAnyUnfinishedEditing();                
              moveToDone(index)}
            }
        />
          {!todo.isEditing ? <span onClick={() => {
              if(!todo.completed_at) clearAnyUnfinishedEditing();                
              setEditingId(index); setUpdatedTodo(todo.description); startEditing(index);
            }}>{todo.description}</span> :
         <form style={{display: "contents"}} noValidate autoComplete="off" onSubmit={() => {finishEditing(index, updatedTodo); setUpdatedTodo(""); setEditingId("")}}> <input className="standard-input" onChange={(event) => setUpdatedTodo(event.target.value)} value={updatedTodo} variant="standard" onBlur={() => {finishEditing(index, updatedTodo); setUpdatedTodo(""); setEditingId("")}} /></form>}
          <DeleteIcon className="DeleteIcon" onClick={() => {deleteTodo(todo.id)}}/>
        </div>
      ) 
    })
  ) : (
    <p>{listType === "todos" ? "Looks like all is done for the day!" : "Completed tasks will appear here!"}</p>
  );

  return (
    <div>
      {todoList}
    </div>
  )
}

export default Todos;