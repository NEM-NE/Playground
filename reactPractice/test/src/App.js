import React, { useState } from 'react';
import './App.css';
import List from './List.jsx'

const App = () => {
 
  return (
    <>
    <h1>todo 애플리케이션</h1>

    <form action="">
      <input type="text" name="" />
      <button>할일추가</button>
    </form>

    <List />
    </>
  )
}

export default App;
