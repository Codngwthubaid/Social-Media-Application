import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { IoAddCircleOutline, IoAddCircleSharp } from "react-icons/io5"
import { IoHomeOutline, IoHomeSharp } from "react-icons/io5"
import { IoSearchOutline, IoSearchSharp } from "react-icons/io5"
import { MdOutlineAccountCircle, MdAccountCircle } from "react-icons/md"

const NavItem = ({ href, currentTab, setTab, children }) => (
    <li>
        <Link 
            to={href} 
            onClick={() => setTab(href)}
            className={`flex flex-col md:flex-row items-center justify-center p-2 hover:bg-gray-100 transition-colors duration-200 ${currentTab === href ? 'text-blue-600' : 'text-gray-600'}`}
        >
            {children}
        </Link>
    </li>
)

const Navbar = () => {
    const location = useLocation()
    const [tab, setTab] = useState(location.pathname)

    useEffect(() => {
        setTab(location.pathname)
    }, [location])

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg md:top-0 md:bottom-auto">
            <div className="max-w-screen-xl mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <div className="hidden md:block">
                        <Link to="/" className="text-blue-600 font-bold text-4xl">NUSM</Link>
                    </div>
                    <ul className="flex justify-around items-center w-full md:w-auto">
                        <NavItem href="/" currentTab={tab} setTab={setTab}>
                            {tab === "/" ? <IoHomeSharp className="text-2xl" /> : <IoHomeOutline className="text-2xl" />}
                            <span className="sr-only md:not-sr-only md:ml-2 md:text-sm">Home</span>
                        </NavItem>
                        <NavItem href="/create" currentTab={tab} setTab={setTab}>
                            {tab === "/create" ? <IoAddCircleSharp className="text-2xl" /> : <IoAddCircleOutline className="text-2xl" />}
                            <span className="sr-only md:not-sr-only md:ml-2 md:text-sm">Create</span>
                        </NavItem>
                        <NavItem href="/search" currentTab={tab} setTab={setTab}>
                            {tab === "/search" ? <IoSearchSharp className="text-2xl" /> : <IoSearchOutline className="text-2xl" />}
                            <span className="sr-only md:not-sr-only md:ml-2 md:text-sm">Search</span>
                        </NavItem>
                        <NavItem href="/account" currentTab={tab} setTab={setTab}>
                            {tab === "/account" ? <MdAccountCircle className="text-2xl" /> : <MdOutlineAccountCircle className="text-2xl" />}
                            <span className="sr-only md:not-sr-only md:ml-2 md:text-sm">Account</span>
                        </NavItem>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar

