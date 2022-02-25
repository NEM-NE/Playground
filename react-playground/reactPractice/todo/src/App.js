import React from 'react';
import { Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';

function App() {
  return (
    <div>
    <Route path='/' component={Home} exact/>
    <Route path='/about' component={About} />
    </div>
  );
}

export default App;