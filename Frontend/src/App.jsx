import React from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './components/Home/Home.jsx'
import Create from './components/Create/Create.jsx'
import Search from './components/Search/Search.jsx'
import Account from './components/Account/Account.jsx'
import Login from './components/Login/Login.jsx'
import Navbar from './components/Header/Navbar.jsx'

const App = () => {
  const { isAuthenticate } = useSelector(state => state.user)

  return (
    <Router>
      {isAuthenticate && <Navbar />}
      <Routes>
        <Route path="/" element={isAuthenticate ? <Home /> : <Login />} />
        <Route path="/create" element={<Create />} />
        <Route path="/search" element={<Search />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </Router>
  )
}

export default App