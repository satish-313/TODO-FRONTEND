import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import { useGlobalContext } from './context';


// local import 
import Nav from './components/Navbar'
import Signup from './components/Signup'
import Login from './components/Login'
import Post from './components/Post'
import Logout from './components/Logout'

const App = () => {
  const { auth } = useGlobalContext();
  return (
    <main>
      <Router>
        <Nav />
        <Switch>
          <Route exact path="/">
            {auth ? <Post /> : <Redirect to="/login" />}
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/logout">
            <Logout />
          </Route>
        </Switch>
      </Router>
    </main>

  )
}

export default App;