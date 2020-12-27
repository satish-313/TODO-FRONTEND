import React from 'react';
import {Link} from 'react-router-dom';
import {useGlobalContext} from '../context';

const Navbar = () => {
  const {auth,user} = useGlobalContext();

  return(
    <nav className="nav">
      <div className="nav-center">
        <div className="icon">
          {auth ? <Link to="/"><h1>Todo,{user}</h1></Link>: <h1>TODO</h1>}
        </div>
        <ul className="nav-links">
          {auth?<li><Link to="/logout">Logout</Link></li>: <Link to="/login"><li>Login</li></Link>}
        </ul>       
      </div>
    </nav>
  )
}

export default Navbar;