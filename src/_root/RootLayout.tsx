import Bottombar from '@/components/shared/Bottombar'
import Sidebar from '@/components/shared/Sidebar'
import Topbar from '@/components/shared/Topbar'
import React from 'react'
import { Outlet } from 'react-router-dom'

const RootLayout: React.FC = () => {
    return (
        <div className='w-full md:flex'>
            <Topbar />
            <Sidebar />
            <section className='h-full flex'>
                <Outlet />
            </section>
            <Bottombar />
        </div>
    )
}

export default RootLayout
