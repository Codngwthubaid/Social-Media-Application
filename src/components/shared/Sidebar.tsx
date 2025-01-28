import { sidebarLinks } from '@/constants';
import { useUserContext } from '@/context/AuthContext';
import { useSignOutAccount } from '@/lib/react-query/queriesAndMutations';
import { INavLink } from '@/types';
import React, { useEffect } from 'react'
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'


const Sidebar: React.FC = () => {

    const pathName = useLocation();
    const { user } = useUserContext()
    const navigate = useNavigate();
    const { mutate: signOut, isSuccess } = useSignOutAccount()


    useEffect(() => {
        if (isSuccess) navigate(0);
    }, [isSuccess])

    return (
        <section>
            <div className='hidden w-[30vw] lg:w-[25vw] fixed h-full bg-black sm:flex flex-col justify-between'>
                <div>
                    <Link to="/" className='flex gap-3 items-center justify-start m-5'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" className='border-2 rounded-2xl border-[#877EFF] animate-border-glow shadow-glow ' viewBox="0 0 300 300">

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

                    <Link to={`/profile/${user.id}`} className='flex items-center m-5 gap-x-4'>
                        <img
                            className='rounded-full h-10 w-10'
                            src={user.imageUrl || "/assets/images/profile-placeholder.svg"}
                            alt="profile" />
                        <div className='flex flex-col'>
                            <p className='font-bold text-lg'>{user.name}</p>
                            <p className='text-slate-400 text-sm'>@{user.username}</p>
                        </div>
                    </Link>

                    <ul className='flex flex-col gap-3 mx-5'>
                        {sidebarLinks.map((link: INavLink) => {

                            const isActive = pathName.pathname === link.route;

                            return (
                                <li key={link.label}>
                                    <NavLink to={link.route} className={`w-full p-3 font-semibold flex gap-3 rounded-xl transition-colors duration-200
                                            ${isActive
                                            ? "bg-slate-900 text-white"
                                            : "hover:bg-slate-900"
                                        }`
                                    }>
                                        <img src={link.imgURL} alt={link.label} />
                                        {link.label}
                                    </NavLink>
                                </li>
                            )
                        })}
                    </ul>
                </div>

                <button onClick={() => { signOut }} className='w-48 font-semibold flex items-center cursor-pointer p-3 gap-x-3 rounded-xl ml-5 mb-6'>
                    <img
                        src="/assets/icons/logout.svg"
                        alt="logout"
                    />
                    <p className='font-bold'>Logout</p>
                </button>
            </div>
        </section>
    )
}

export default Sidebar
