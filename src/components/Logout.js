import React from 'react';
import {Redirect} from 'react-router-dom';
import {useGlobalContext} from '../context';

const Logout = () => {
  const {auth,setAuth} = useGlobalContext();

  const logout = () => {
    const empty = ''
    localStorage.setItem('auth-token',empty)
    setAuth(false)
  }
  return(
    <div className="logout">
      {!auth && <Redirect to="/login"/>}
      <button onClick={() => logout()}>Logout</button>
    </div>
  )
}

export default Logout;