import React from 'react'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import Search from './components/Search.jsx'
import Create from './components/Create.jsx'
import Account from './components/Account.jsx'
import Home from './components/Home.jsx'

const router = createBrowserRouter([

  {
    path: '/',
    element: (
      <>
        <App />
        <Home/>
      </>
    ),
  },
  {
    path: '/search',
    element: (
      <>
        <App />
        <Search/>
      </>
    ),
  },
  {
    path: '/create',
    element: (
      <>
        <App />
        <Create/>
      </>
    ),
  },
  {
    path: '/account',
    element: (
      <>
        <App />
        <Account/>
      </>
    ),
  },
]);

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
