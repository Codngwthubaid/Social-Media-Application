import React from 'react'
import SignInForm from './_auth/forms/SignInForm'
import SignUpForm from './_auth/forms/SignUpForm'
import AuthLayout from './_auth/AuthLayout'
import RootLayout from './_root/RootLayout'
import { Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import { AllUser, CreatePost, EditPost, Explore, Home, PostDetails, Profile, Saved } from './_root/pages'
import UpdateProfile from './_root/pages/UpdateProfile'

const App: React.FC = () => {
  return (
    <main>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/sign-in" element={<SignInForm />} />
            <Route path="/sign-up" element={<SignUpForm />} />
          </Route>

          <Route element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path='/explore' element={<Explore />}/>
            <Route path='/saved' element={<Saved />}/>
            <Route path='/all-users' element={<AllUser />}/>
            <Route path='/create-post' element={<CreatePost />}/>
            <Route path='/update-post/:id' element={<EditPost />}/>
            <Route path='/posts/:id' element={<PostDetails />}/>
            <Route path='/profile/:id' element={<Profile />}/>
            <Route path='/update-profile/:id' element={<UpdateProfile />}/>
          </Route>
        </Routes>

      <Toaster />
    </main>
  )
}

export default App