import React from 'react'
import './index.css'
import App from './App.jsx'
import Home from './components/Home.jsx'
import About from './components/About.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { createRoot } from 'react-dom/client'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <App />
        <Home />
      </>
    ),
  },
  {
    path: '/about',
    element: (
      <>
        <App />
        <About />
      </>
    ),
  },
]);

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
