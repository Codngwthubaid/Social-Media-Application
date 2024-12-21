import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import React from 'react'
import Create from './components/Create.jsx'
import Search from './components/Search.jsx'
import Account from './components/Account.jsx'
import store from './store.js'
import { Provider } from 'react-redux'
import Login from './components/Login/Login.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <><App /> <Login /></>,
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
    <Provider store={store}>
      <RouterProvider router={router}>
      </RouterProvider>
    </Provider>
  </React.StrictMode>,
)
