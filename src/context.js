import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import {useCookies} from 'react-cookie'
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [auth, setAuth] = useState(false)
  const [todos, setTodos] = useState([])
  const [currentTodo, setCurrentTodo] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [currentUpdateItem, setCurrentUpdateItem] = useState(null)
  const [user,setUser] = useState('Guest')
  const [loading,setLoading] = useState(true)
  const [cookies, setCookie] = useCookies(['authToken']);

  let url = 'https://mytodoslist313.herokuapp.com/post'
  //let url ="http://localhost:5000/post"
  
  const fetchInfo = () => {
    axios.get(url, { headers: { 'auth-token': cookies.authToken} })
      .then(res => {
        setTodos(res.data.todaData)
        setUser(res.data.user)
        setAuth(res.data.auth)
        setLoading(false)
      })
      .catch(err => console.log(err))
  }

  const addTodo = (e) => {
    e.preventDefault();
    if (isEditing) {
      url = `${url}/post/${currentUpdateItem}`
      axios.post(url, { "todo": currentTodo }, { headers: { 'auth-token': cookies.authToken } })
        .then(res => setTodos(res.data))
        .catch(err => console.log(err => console.log(err)))

      setCurrentUpdateItem(null)
      setIsEditing(false)
      setCurrentTodo('')
    }
    else {
      url = `${url}/post`
      axios.post(url, { "todo": currentTodo }, { headers: { 'auth-token': cookies.authToken } })
        .then(res => setTodos(res.data.todaData))
        .catch(err => console.log(err))
      setCurrentTodo('')
    }

  }

  const deleteTodo = (id) => {
    url = `${url}/post/${id}`
    axios.delete(url, { headers: { 'auth-token': cookies.authToken } })
      .then(res => setTodos(res.data))
      .catch(err => console.log(err))
  }

  const setEditing = (id) => {
    setIsEditing(true)
    const item = todos.find((i) => i._id === id);
    setCurrentTodo(item.todo)
    setCurrentUpdateItem(id)
  }

  useEffect(() => {
    fetchInfo()
  }, [])

  useEffect(()=>{
    fetchInfo()
  },[loading])

  console.log(cookies.authToken)

  return <AppContext.Provider value={{
    auth, setAuth,
    todos, setTodos,
    currentTodo, setCurrentTodo,
    isEditing, setIsEditing, setEditing,
    addTodo, deleteTodo,user,
    loading,setLoading,cookies, setCookie
  }}>
    {children}
  </AppContext.Provider>
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }