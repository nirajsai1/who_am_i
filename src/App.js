import React from "react";
import { BrowserRouter as Router, Routes, Route,Link } from "react-router-dom";
import Game from './myjs/Game';
import Home from './myjs/Home';
import Game2 from './myjs/Games2';
function App() {
  return (
      <Router>
        <nav>
        <Link to='/'></Link>
        <Link to='/game'></Link>
        <Link to='/game2'></Link>
        </nav>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/game' element={<Game/>}></Route>
          <Route path='/game2' element={<Game2/>}></Route>
        </Routes>
      </Router>
  );
}
export default App;