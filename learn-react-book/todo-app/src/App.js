import React, { useState, useRef, useCallback } from 'react';
import TodoTemplate from './components/TodoTemplate.jsx';
import TodoInsert from './components/TodoInsert.jsx';
import TodoList from './components/TodoList.jsx';

function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: '첫 번째', checked: false },
  ]);
  const nextId = useRef(2);

  

  return (
    <TodoTemplate>
      <TodoInsert state={[todos, setTodos]} nextId={nextId}/>
      <TodoList todos={todos} />
    </TodoTemplate>
  );
}

export default App;
