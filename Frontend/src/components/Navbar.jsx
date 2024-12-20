import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { IoAddCircleOutline, IoAddCircleSharp } from "react-icons/io5";
import { IoHomeOutline, IoHomeSharp } from "react-icons/io5";
import { IoSearchOutline, IoSearchSharp } from "react-icons/io5";
import { MdOutlineAccountCircle, MdAccountCircle } from "react-icons/md";



const Navbar = () => {

    const [tab, setTab] = useState(window.location.pathname)

    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link to='/' onClick={() => setTab("/")}>
                            {tab === "/" ? <IoHomeOutline /> : <IoHomeSharp />}
                        </Link>
                    </li>
                    <li>
                        <Link to='/create' onClick={() => setTab("/")}>
                            {tab === "/create" ? <IoAddCircleOutline /> : <IoAddCircleSharp />}
                        </Link>
                    </li>
                    <li>
                        <Link to='/search' onClick={() => setTab("/")}>
                            {tab === "/search" ? <IoSearchOutline /> : <IoSearchSharp />}
                        </Link>
                    </li>
                    <li>
                        <Link to='/account' onClick={() => setTab("/")}>
                            {tab === "/account" ? <MdOutlineAccountCircle /> : <MdAccountCircle />}
                        </Link>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default Navbar