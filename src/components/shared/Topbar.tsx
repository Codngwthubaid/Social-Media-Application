import { useUserContext } from '@/context/AuthContext';
import { useSignOutAccount } from '@/lib/react-query/queriesAndMutations';
import React, { useEffect } from 'react'
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
            <div className='sm:hidden flex justify-between p-2'>
                <Link to="/" className='flex gap-3 items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" className='border-2 rounded-2xl border-[#877EFF] animate-border-glow shadow-glow ' viewBox="0 0 300 300">

                        <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" />
                                <stop offset="100%" />
                            </linearGradient>
                        </defs>

                        <circle cx="150" cy="150" r="140" fill="url(#gradient)" />

                        <ellipse cx="100" cy="100" rx="30" ry="40" fill="#FFF" />
                        <ellipse cx="200" cy="100" rx="30" ry="40" fill="#FFF" />
                        <circle cx="100" cy="100" r="15" fill="#000" />
                        <circle cx="200" cy="100" r="15" fill="#000" />

                        <path d="M70,70 Q90,50 110,70" stroke="#000" strokeWidth="8" fill="transparent" strokeLinecap="round" />
                        <path d="M190,70 Q210,50 230,70" stroke="#000" strokeWidth="8" fill="transparent" strokeLinecap="round" />

                        <path d="M80,180 Q150,250 220,180" stroke="#000" strokeWidth="10" fill="transparent" strokeLinecap="round" />
                        <rect x="100" y="180" width="20" height="20" fill="#FFF" />
                        <rect x="130" y="180" width="20" height="20" fill="#FFF" />
                        <rect x="160" y="180" width="20" height="20" fill="#FFF" />
                        <rect x="190" y="180" width="20" height="20" fill="#FFF" />
                    </svg>
                    <h2 className="font-bold text-4xl bg-gradient-to-r from-white to-[#877EFF] bg-clip-text text-transparent animate-gradient bg-300% bg-left font-mono">NUSM</h2>
                </Link>

                <div className='flex items-center justify-center gap-x-1'>
                    <button onClick={() => { signOut }} className='cursor-pointer'>
                        <img
                            src="/assets/icons/logout.svg"
                            alt="logout"
                        />
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
