import React from 'react'
import { Link } from 'react-router-dom'
import Home from './Home'
import Create from './Create'
import Search from './Search'
import Account from './Account'


const Navbar = () => {
    return (
        <>
            <nav>
                <ul>
                    <li><Link to='/'><Home /></Link></li>
                    <li><Link to='/create'><Create /></Link></li>
                    <li><Link to='/search'><Search /></Link></li>
                    <li><Link to='/account'><Account /></Link></li>
                </ul>
            </nav>
        </>
    )
}

export default Navbar