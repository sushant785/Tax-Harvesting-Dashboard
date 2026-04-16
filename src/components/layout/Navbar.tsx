import React from 'react';
import konixLogo from '../../assets/koinx.svg'
import ThemeToggle from '../widgets/ThemeToggle';

const Navbar: React.FC = () => {
  return (
    <nav className="w-full bg-white dark:bg-brand-bg border-b border-gray-200 dark:border-brand-border py-4 flex items-center justify-between sticky top-0 z-50 transition-colors duration-200">

      <div className='px-10 sm:px-16 lg:px-20 flex items-center'>
        <img 
          src={konixLogo} 
          alt="KoinX Logo" 
          className="h-7 w-auto" 
          onError={(e) => {
            e.currentTarget.style.display = 'none';
            e.currentTarget.parentElement?.insertAdjacentHTML(
              'beforeend', 
              '<span class="font-bold text-xl text-gray-900 dark:text-white tracking-tight">Koin<span class="text-blue-600 dark:text-brand-blue">X</span></span>'
            );
          }} 
        />
      </div>

      <div className='px-10 sm:px-16 lg:px-20'>
        <ThemeToggle/>
      </div>
      
    </nav>
  );
};

export default Navbar;