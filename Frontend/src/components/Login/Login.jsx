import React, { useState } from 'react'
import img3 from "../../assets/Images/img3.jpg"
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '../../Actions/User'

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()


    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(email, password)
        dispatch(login(email, password))
    }

    return (

        <form className="container mx-auto flex justify-around items-center h-screen" onSubmit={handleSubmit}>
            <div className='w-[40vw]'>
                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@nusm.com"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                        required
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Your password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                        required
                    />
                </div>

                <button type="submit" className="text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm  px-5 py-2.5 text-center w-full">Log In</button>

                <div className='text-center hover:underline text-blue-500 my-5'>
                    <Link to="/forgot/password">Forgot Password ?</Link>
                </div>
                <button className='p-4 text-white rounded-xl bg-[#4dac1d] hover:bg-[#55a32e] text-center flex justify-center items-center mx-auto px-10'>
                    <Link to="/register">Create new account</Link>
                </button>
            </div>
            <div className='w-[40vw] rounded-3xl mt-14'>
                <img src={img3} alt="Hero-Img" />
            </div>
        </form>

    )
}

export default Login