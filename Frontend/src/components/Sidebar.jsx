import React from 'react'
import { Link } from "react-router-dom"
import {
  Home,
  Search,
  CircleUser,
  CirclePlus
} from 'lucide-react';


const Sidebar = () => {

  const menuItems = [
    { icon: Home, label: 'Home' },
    { icon: Search, label: 'Search' },
    { icon: CirclePlus, label: 'Create' },
    { icon: CircleUser, label: 'Account' }
  ];

  return (
    <div>
      <nav className="flex-1">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.label.toLowerCase()}
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-800 transition-colors duration-200"
              >
                <item.icon className="w-6 h-6" />
                <span className="text-lg">{item.label}</span>
                {item.notifications && (
                  <span className="ml-auto bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {item.notifications}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

export default Sidebar