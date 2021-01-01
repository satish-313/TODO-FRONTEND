import React from 'react';
import {Redirect} from 'react-router-dom';
import {useGlobalContext} from '../context';

const Logout = () => {
  const {auth,setAuth,setCookie} = useGlobalContext();

  const logout = () => {
    const empty = ''
    setCookie('authToken',empty)
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