import styles from './App.module.css';
import Button from "./Button.js";
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import React, { useEffect, useState } from "react";
//import CoinTracker from './CoinTracker';
import Home from './routes/Home';
import Details from './routes/Details';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/movie/:id" element={<Details/>}/>
      </Routes>
    </Router>
  )
}

export default App;
