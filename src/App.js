import React from "react";
import { BrowserRouter as Router, Routes, Route,Link } from "react-router-dom";
import Game from './Game';
import Home from './Home';
function App() {
  return (
      <Router>
        <nav>
        <Link to='/'></Link>
        </nav>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/game' element={<Game/>}></Route>
        </Routes>
      </Router>
  );
}
export default App;