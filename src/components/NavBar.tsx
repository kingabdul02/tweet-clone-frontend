import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { logoutUser } from '../redux/reducers/authSlice';

const NavBar: React.FC = () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
  };

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? 'bg-black text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2'
      : 'text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2';

  return (
    <nav className='bg-indigo-700 border-b border-indigo-500'>
      <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
        <div className='flex h-20 items-center justify-between'>
          <div className='flex flex-1 items-center justify-center md:items-stretch md:justify-start'>
            <NavLink className='flex flex-shrink-0 items-center mr-4' to='/'>
              <span className='hidden md:block text-white text-2xl font-bold ml-2'>
                 Tweets
              </span>
            </NavLink>
            <div className='md:ml-auto'>
              <div className='flex space-x-2'>
                <NavLink to='/' className={linkClass}>
                  Feeds
                </NavLink>
                {isLoggedIn ? (
                  <>
                    <NavLink to='/add-tweet' className={linkClass}>
                      Post Tweet
                    </NavLink>
                    <NavLink to='/my-tweet' className={linkClass}>
                      My Tweets
                    </NavLink>
                    <NavLink to='/my-profile' className={linkClass}>
                      My Profile
                    </NavLink>
                    <button
                      onClick={handleLogout}
                      className='text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2'
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <NavLink to='/login' className={linkClass}>
                      Login
                    </NavLink>
                    <NavLink to='/register' className={linkClass}>
                      Register
                    </NavLink>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
