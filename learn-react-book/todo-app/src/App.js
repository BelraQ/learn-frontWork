import React, { useState, useRef, useCallback, useReducer } from 'react';
import TodoTemplate from './components/TodoTemplate.jsx';
import TodoInsert from './components/TodoInsert.jsx';
import TodoList from './components/TodoList.jsx';

export const INSERT = 'INSERT';
export const CHECK = 'CHECK';
export const REMOVE = 'REMOVE';

const reducer = (state, action) => {
  switch(action.type) {
    case INSERT:
      const {id, text, checked} = action;
      const todo = {
        id, 
        text, 
        checked
      };
      console.log(todo);
      return [...state, todo];
    case CHECK:

      const todos = state.map((todo) => {
        console.log('todo con: ',{...todo, checked: !todo.checked}, todo.id, action.id);
        
        return todo.id === action.id ? {...todo, checked: !todo.checked} : todo;
      });
      console.log('todos: ',todos);
      return todos;
    case REMOVE:
      const removeValue = state.filter((todo) => action.id !== todo.id);
      return removeValue;
    default: 
      return state;
  }
}

const state100 = () => {
  const state = Array(100).fill().map((v, i) => {
    return {
      id: i + 1,
      text: `할 일 ${i+1}`,
      checked: false,
    }
  });
  
  return state;
};

function App() {
  const initialState = state100();
  const nextId = useRef(101);
  const [state, dispatch] = useReducer(reducer, initialState);
  
  console.log('nextId:', nextId);
  console.log('state:', state);

  return (
    <TodoTemplate>
      <TodoInsert dispatch={dispatch} nextId={nextId}/>
      <TodoList todos={state} dispatch={dispatch}/>
    </TodoTemplate>
  );
}

export default App;
