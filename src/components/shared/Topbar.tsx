import { useUserContext } from '@/context/AuthContext';
import { useSignOutAccount } from '@/lib/react-query/queriesAndMutations';
import React, { useEffect } from 'react'
import { IoLogOut } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom'

const Topbar: React.FC = () => {

    const { user } = useUserContext()
    const navigate = useNavigate();
    const { mutate: signOut, isSuccess } = useSignOutAccount()


    useEffect(() => {
        if (isSuccess) navigate(0);
    }, [isSuccess])


    return (
        <section>
            <div className='flex justify-between p-2'>
                <Link to="/" className='flex gap-3 items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-8 w-auto" x="0px" y="0px" width="24" height="24" viewBox="0,0,256,256">
                        <g fill="#4f39f6" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" >
                            <g transform="scale(10.66667,10.66667)">
                                <path d="M19,3c-1.654,0 -3,1.346 -3,3c0,0.46176 0.11355,0.89399 0.30078,1.28516l-3.71484,3.71484h-4.76953c-0.41427,-1.16125 -1.5148,-2 -2.81641,-2c-1.654,0 -3,1.346 -3,3c0,1.654 1.346,3 3,3c1.30161,0 2.40214,-0.83875 2.81641,-2h4.76953l3.71484,3.71484c-0.18723,0.39116 -0.30078,0.8234 -0.30078,1.28516c0,1.654 1.346,3 3,3c1.654,0 3,-1.346 3,-3c0,-1.654 -1.346,-3 -3,-3c-0.46176,0 -0.89399,0.11355 -1.28516,0.30078l-3.30078,-3.30078l3.30078,-3.30078c0.39116,0.18723 0.8234,0.30078 1.28516,0.30078c1.654,0 3,-1.346 3,-3c0,-1.654 -1.346,-3 -3,-3z"></path>
                            </g>
                        </g>
                    </svg>
                    <h2 className='font-bold text-2xl font-serif'>NUSM</h2>
                </Link>

                <div className='flex items-center justify-center gap-x-1'>
                    <button onClick={() => { signOut }} className='cursor-pointer'>
                        <IoLogOut className='hover:text-white text-indigo-500 drop-shadow-2xl text-4xl' />
                    </button>
                    <Link to={`/profile/${user.id}`}>
                        <img
                            className='rounded-full h-8 w-8'
                            src={user.imageUrl || "/assets/images/profile-placeholder.svg"}
                            alt="profile" />
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default Topbar
