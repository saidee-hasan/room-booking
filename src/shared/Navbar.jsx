import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';
import Logo from "../assets/Logo.png"
function Navbar({ isAuthenticated }) {
  const { user, signOutUser  } = useContext(AuthContext);

  const handleSignOut = () => {
      signOutUser ()
          .then(res => console.log(res))
          .catch(err => console.error(err));
  };
  return (
    <div>
      <div className="navbar bg-base-100 z-50 fixed">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              <li>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? 'text-orange-400' : '')}
              >
               Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/rooms"
                className={({ isActive }) => (isActive ? 'text-orange-400' : '')}
              >
                Rooms
              </NavLink>
            </li>
            {isAuthenticated && (
              <li>
                <NavLink
                  to="/my-bookings"
                  className={({ isActive }) => (isActive ? 'text-orange-400' : '')}
                >
                  My Bookings
                </NavLink>
              </li>

            )}
                <li>
              <NavLink
                to="/about"
                className={({ isActive }) => (isActive ? 'text-orange-400' : '')}
              >
                About US
              </NavLink>
            </li>
            </ul>
          </div>
          <NavLink to="/" className=" flex text-xl font-bold">
          <img className='w-10' src={Logo} alt="" />
          <p className='sm:block hidden '>   Room <span className='text-red-500'> Booking</span></p>

          </NavLink>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
          <li>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? 'text-orange-400' : '')}
              >
               Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/rooms"
                className={({ isActive }) => (isActive ? 'text-orange-400' : '')}
              >
                Rooms
              </NavLink>
            </li>
            {isAuthenticated && (
              <li>
                <NavLink
                  to="/my-bookings"
                  className={({ isActive }) => (isActive ? 'text-orange-400' : '')}
                >
                  My Bookings
                </NavLink>
              </li>

            )}
                <li>
              <NavLink
                to="/about"
                className={({ isActive }) => (isActive ? 'text-orange-400' : '')}
              >
                About US
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="navbar-end">
                {
                    user ? (
                        <button
                            className='bg-red-600 text-white p-2 rounded-md hover:bg-red-700 transition duration-200'
                            onClick={handleSignOut}
                            aria-label="Sign Out"
                        >
                            Sign Out
                        </button>
                    ) : (
                        <Link to={'/register'}>
                            <button
                                className='bg-green-600 text-white p-2 rounded-md hover:bg-green-700 transition duration-200'
                                aria-label="Login"
                            >
                                Login
                            </button>
                        </Link>
                    )
                }
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full overflow-hidden border-2 border-gray-300">
                            <Link to={'/profile'}>
                                <img
                                    alt="User  Avatar"
                                    src={user?.photoURL || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKKOdmJz8Z2pDtYgFgR2u9spABvNNPKYYtGw&s'} // Provide a default image path
                                />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
      </div>
      <hr />
      
    </div>
  );
}

export default Navbar;
