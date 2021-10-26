import React from 'react';

import ToDoList from './ToDoList';
import InputBar from './InputBar';

function App() {
  return (
    <>
      <h1>오늘 할 일</h1>
      <InputBar />
      <ToDoList />
    </>
  );
}

export default App;
