import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

const AuthLayout: React.FC = () => {

  const isAuthenticate = false;

  return (
    <>
      {isAuthenticate ? (
        <Navigate to="/" />
      ) : (
        <>
          <section className='flex flex-1 justify-between items-center'>
            <Outlet />

            <div className='opacity-60 hidden lg:block w-1/2'>
              <img
                className='h-screen object-cover w-full'
                src="/assets/images/signup-NUSM.jpg"
                alt="signup-NUSM-LOGO"
              />
              <p className='absolute bottom-2 right-2'>CodngWthUbaid</p>
            </div>
          </section>
        </>
      )}
    </>
  )
}

export default AuthLayout
