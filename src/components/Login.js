import React,{useState} from 'react';
import {Redirect,Link} from 'react-router-dom';
import axios from 'axios';
import {useGlobalContext} from '../context';

const Login = () => {
  const {auth,setAuth} = useGlobalContext();
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const clearForm = () => {
    setUsername('')
    setPassword('')
  }
  const LoginForm = (e) => {
    e.preventDefault();
    const url = "https://mytodoslist313.herokuapp.com/user/login";
    axios.post(url,
      {
        "username": username,
        "password": password
      }
    )
      .then(res => {
        console.log(res.data)
        localStorage.setItem('auth-token',res.headers['auth-token'])
        if(res.data.auth){
          setAuth(true)
        }
      })
      .catch(err => console.log(err))
    clearForm()
  }

  return (
    <div>
      {auth && <Redirect to="/"/>}
      <div className="login-page">
        <form onSubmit={LoginForm}>
          <h3>login...</h3>
          <input required type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="username"/>
          <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password"/>
          <button type="submit">submit</button>
        </form>
      </div>
      <div className="signup">
        <p>if you new signup?</p>
        <Link to="/signup">Signup</Link>
      </div>
    </div>
  )
}

export default Login;