import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import React from 'react'
import Home from './components/Home.jsx'
import Create from './components/Create.jsx'
import Search from './components/Search.jsx'
import Account from './components/Account.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <><App /> <Home /></>,
  },
  {
    path: '/create',
    element: <><App /> <Create /></>,
  },
  {
    path: '/search',
    element: <><App /> <Search /></>,
  },
  {
    path: '/account',
    element: <><App /> <Account /></>,
  }
])

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}>
    </RouterProvider>
  </React.StrictMode>,
)
