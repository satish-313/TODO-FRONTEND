import React, { useState } from 'react';
import axios from 'axios';
import {useGlobalContext} from '../context';
import {Redirect,Link} from 'react-router-dom';

import ShowError from './ShowError'

const Signup = () => {
  const {setLoading,auth} = useGlobalContext()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordAgain, setPasswordAgain] = useState('')
  const [err,setErr] = useState({type:false,msg:''})

  //signup form
  const clearForm = () => {
    setUsername('')
    setEmail('')
    setPassword('')
    setPasswordAgain('')
  }
  const signupForm = (e) => {
    if (passwordAgain === password) {
      e.preventDefault();
      //const local_url = "http://localhost:5000/user/register"
      const url = "https://mytodoslist313.herokuapp.com/user/register";
      axios.post(url,
        {
          "username": username,
          "email": email,
          "password": password
        }
      )
        .then(res => {
          console.log(res)
          if (res.data.auth) {
            localStorage.setItem('auth-token', res.headers['auth-token'])
            setLoading(true)
          }
          else{
            setErr({type:true,msg:res.data.err})
          }
        })
        .catch(err => console.log(err))
      clearForm()
    }
    else {
      e.preventDefault();
      setErr({type:true,msg:"Password didn't match "})
      setPassword('')
      setPasswordAgain('')
    }
  }

  return (
    <div>
      {auth && <Redirect to="/"/>}
      <div className="login-page">
        <form onSubmit={signupForm} autoComplete="off">
          <h3>signup....</h3>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="username" />
          <input autoComplete="off" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" />
          <input type="password" value={passwordAgain} onChange={(e) => setPasswordAgain(e.target.value)} placeholder="password" />
          <button type="submit">submit</button>
        </form>
      </div>
      {err.type && <ShowError error={err} setError={setErr}/>}
    </div>
  )
}

export default Signup;