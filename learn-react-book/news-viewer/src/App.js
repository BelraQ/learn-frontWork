import axios from 'axios';
import { useState } from 'react';
import Main from './routes/Main';
import { Routes, Route } from 'react-router-dom';
function App() {
  
  return (
    <Routes>
      <Route path="/" element={<Main/>}></Route>
      <Route path="/:category" element={<Main/>}></Route>
    </Routes>
  );
}

export default App;
