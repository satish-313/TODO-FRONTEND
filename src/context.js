import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [auth, setAuth] = useState(false)
  const [todos, setTodos] = useState([])
  const [currentTodo, setCurrentTodo] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [currentUpdateItem, setCurrentUpdateItem] = useState(null)
  const [user,setUser] = useState('Guest')

  let url = 'http://localhost:5000/post'

  const fetchInfo = () => {
    axios.get(url, { headers: { 'auth-token': localStorage.getItem('auth-token') } })
      .then(res => {
        setAuth(res.data.auth)
        setTodos(res.data.todaData)
        console.log(res.data)
        setUser(res.data.user)
      })
      .catch(err => console.log(err))
  }

  const addTodo = (e) => {
    e.preventDefault();
    if (isEditing) {
      url = `${url}/post/${currentUpdateItem}`
      axios.post(url, { "todo": currentTodo }, { headers: { 'auth-token': localStorage.getItem('auth-token') } })
        .then(res => setTodos(res.data))
        .catch(err => console.log(err => console.log(err)))

      setCurrentUpdateItem(null)
      setIsEditing(false)
      setCurrentTodo('')
    }
    else {
      url = `${url}/post`
      axios.post(url, { "todo": currentTodo }, { headers: { 'auth-token': localStorage.getItem('auth-token') } })
        .then(res => setTodos(res.data.todaData))
        .catch(err => console.log(err))
      setCurrentTodo('')
    }

  }

  const deleteTodo = (id) => {
    url = `${url}/post/${id}`
    axios.delete(url, { headers: { 'auth-token': localStorage.getItem('auth-token') } })
      .then(res => setTodos(res.data))
      .catch(err => console.log(err))
  }

  /* const updateTodo = (id) =>{
    url = `${url}/post/${id}`
    axios.post(url,{"todo":currentTodo},{headers:{'auth-token':localStorage.getItem('auth-token')}})
    .then(res => console.log(res))
    .catch(res => console.log(err))
  } */

  const setEditing = (id) => {
    setIsEditing(true)
    const item = todos.find((i) => i._id === id);
    //console.log(item.todo)
    setCurrentTodo(item.todo)
    setCurrentUpdateItem(id)
  }

  useEffect(() => {
    fetchInfo()
  }, [])

  return <AppContext.Provider value={{
    auth, setAuth,
    todos, setTodos,
    currentTodo, setCurrentTodo,
    isEditing, setIsEditing, setEditing,
    addTodo, deleteTodo,user
  }}>
    {children}
  </AppContext.Provider>
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }