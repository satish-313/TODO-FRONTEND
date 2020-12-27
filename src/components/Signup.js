import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordAgain, setPasswordAgain] = useState('')

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
        const url = "https://mytodoslist313.herokuapp.com/user/register";
        axios.post(url,
          {
            "username": username,
            "email": email,
            "password": password
          }
        )
          .then(res => console.log(res.data, res.status))
          .catch(err => console.log(err))
        clearForm()
    }
    else{
      console.log("password didn't match")
    }
  }

  return (
    <div>
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
    </div>
  )
}

export default Signup;