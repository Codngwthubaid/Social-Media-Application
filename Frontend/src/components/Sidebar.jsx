// import React from 'react'
// import { Link } from "react-router-dom"
// import {
//   Home,
//   Search,
//   CircleUser,
//   CirclePlus
// } from 'lucide-react';


// const Sidebar = () => {
//   return (
//       <nav className="flex flex-col bg-black text-white w-[20%] h-[100vh] px-4">
//         <div className='text-4xl text-blue-500 font-bold py-10'>Nusm</div>
//         <ul className='flex flex-col gap-y-4 h-[100vh]'>
//           <li><Link to="/"><div className='flex rounded-xl hover:bg-gray-900 p-2 items-center gap-x-2 text-lg font-medium'><Home/> Home</div></Link></li>
//           <li><Link to="/search"><div className='flex rounded-xl hover:bg-gray-900 p-2 items-center gap-x-2 text-lg font-medium'><Search/> Search</div></Link></li>
//           <li><Link to="/create"><div className='flex rounded-xl hover:bg-gray-900 p-2 items-center gap-x-2 text-lg font-medium'><CirclePlus/> Create</div></Link></li>
//           <li><Link to="/account"><div className='flex rounded-xl hover:bg-gray-900 p-2 items-center gap-x-2 text-lg font-medium'><CircleUser/> Account</div></Link></li>
//         </ul>
//       </nav>
   
//   )
// }

// export default Sidebar



import React, { useState } from 'react';
import { Home, Search, PlusCircle, User } from 'lucide-react';

function Sidebar() {
  const [activeTab, setActiveTab] = useState('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="p-8">
            <h2 className="text-2xl font-bold mb-4">Home</h2>
            <p>Welcome to your dashboard!</p>
          </div>
        );
      case 'search':
        return (
          <div className="p-8">
            <h2 className="text-2xl font-bold mb-4">Search</h2>
            <p>Search functionality coming soon...</p>
          </div>
        );
      case 'create':
        return (
          <div className="p-8">
            <h2 className="text-2xl font-bold mb-4">Create</h2>
            <p>Create new content here...</p>
          </div>
        );
      case 'account':
        return (
          <div className="p-8">
            <h2 className="text-2xl font-bold mb-4">Account</h2>
            <p>Your account settings and preferences...</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar Navigation */}
      <div className="w-64 bg-black text-white p-6">
        <h1 className="text-4xl font-bold text-blue-500 mb-12">Nusm</h1>
        <nav className="space-y-8">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex items-center space-x-3 w-full p-2 rounded-lg transition-colors ${
              activeTab === 'home' ? 'text-blue-500' : 'hover:text-blue-400'
            }`}
          >
            <Home size={24} />
            <span className="text-lg">Home</span>
          </button>
          
          <button
            onClick={() => setActiveTab('search')}
            className={`flex items-center space-x-3 w-full p-2 rounded-lg transition-colors ${
              activeTab === 'search' ? 'text-blue-500' : 'hover:text-blue-400'
            }`}
          >
            <Search size={24} />
            <span className="text-lg">Search</span>
          </button>
          
          <button
            onClick={() => setActiveTab('create')}
            className={`flex items-center space-x-3 w-full p-2 rounded-lg transition-colors ${
              activeTab === 'create' ? 'text-blue-500' : 'hover:text-blue-400'
            }`}
          >
            <PlusCircle size={24} />
            <span className="text-lg">Create</span>
          </button>
          
          <button
            onClick={() => setActiveTab('account')}
            className={`flex items-center space-x-3 w-full p-2 rounded-lg transition-colors ${
              activeTab === 'account' ? 'text-blue-500' : 'hover:text-blue-400'
            }`}
          >
            <User size={24} />
            <span className="text-lg">Account</span>
          </button>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-gray-100">
        {renderContent()}
      </div>
    </div>
  );
}

export default Sidebar;