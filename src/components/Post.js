import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useGlobalContext } from '../context';

//local import
import List from './List';

const Post = () => {
  const { auth, todos, addTodo, currentTodo, setCurrentTodo ,loading } = useGlobalContext();

  if(loading){
    <loading/>
  }

  return (
    <div>
      {!auth && <Redirect to="/login" />}
      <section className="section-center">
        <form className="todo-form" onSubmit={addTodo}>
          <h3>TODO bud</h3>
          <div className="form-control">
            <input type="text" placeholder="todo" value={currentTodo} onChange={(e) => setCurrentTodo(e.target.value)} />
            <button type="submit" className="submit-btn">sumbit</button>
          </div>
        </form>
        <div>
          {todos.length === 0 ? <h3>empty list</h3> : <div className="todo-container">
            {todos.map((todo, index) => {
              return <List key={index} {...todo} />
            })}
            {/* <button className="clear-btn" >clear all</button> */}
          </div>}
        </div>
      </section>
    </div>
  )
}

export default Post;