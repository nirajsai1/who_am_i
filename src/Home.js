import React from 'react'
import {Link} from 'react-router-dom';
import './Home.css';
const Home = () => {
  return (
    <div>
      <Link to='/game'><p className='myp'>Start</p></Link>
    </div>

  )
}

export default Home
