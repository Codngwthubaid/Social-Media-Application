import { bottombarLinks } from '@/constants';
import { INavLink } from '@/types';
import React from 'react'
import { Link, useLocation } from 'react-router-dom';

const Bottombar: React.FC = () => {

  const pathName = useLocation();

  return (
    <section>
      <div className='sm:hidden'>
          <ul className="fixed bottom-0 left-0 right-0 bg-slate-800 flex justify-around items-center p-2 border-t border-slate-700 z-50">
            {bottombarLinks.map((link: INavLink) => {
              const isActive = pathName.pathname === link.route;
              return (
                <li key={link.label} className="flex-1">
                  <Link
                    to={link.route}
                    className={`flex flex-col items-center justify-center p-2 gap-1 rounded-lg transition-colors duration-200
            ${isActive
                        ? "bg-slate-900 text-white"
                        : "text-slate-400 hover:bg-slate-900 hover:text-white"
                      }`
                    }
                  >
                    <img
                      src={link.imgURL}
                      alt={link.label}
                      className="w-6 h-6" 
                    />
                    <span className="text-xs hidden sm:block">{link.label}</span>
                  </Link>
                </li>
              );
            })}
        </ul>
      </div>
    </section>
  )
}

export default Bottombar
