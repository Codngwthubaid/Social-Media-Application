import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './components/Home/Home.jsx'
import Create from './components/Create/Create.jsx'
import Search from './components/Search/Search.jsx'
import Account from './components/Account/Account.jsx'
import Login from './components/Login/Login.jsx'
import Navbar from './components/Header/Navbar.jsx'
import { loadUser } from './Actions/User.js'

const App = () => {
  const dispatch = useDispatch()
  const { isAuthenticate } = useSelector(state => state.user)

  useEffect(() => {
    dispatch(loadUser())
  }, [dispatch])


  return (
    <Router>
      {isAuthenticate && <Navbar />}
      <Routes>
        <Route path="/" element={isAuthenticate ? <Home /> : <Login />} />
        <Route path="/create" element={isAuthenticate ? <Create /> : <Login />} />
        <Route path="/search" element={isAuthenticate ? <Search /> : <Login />} />
        <Route path="/account" element={isAuthenticate ? <Account /> : <Login />} />
      </Routes>
    </Router>
  )
}

export default App