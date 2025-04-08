import React, { use, useState } from 'react'

import {Container,LogoutBtn} from '../index'
import { useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import Logo from '../Logo'
import blogifyLogo from '../../assets/blogify-high-resolution-logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBlog } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'

const Header = () => {
  const authStatus = useSelector(state => state.auth.status) //state.auth.status bcz the name is auth and the key is also auth go and check in authSlice.js authstatus represent that user is logged in or not
  console.log(authStatus);
  
  const navigate = useNavigate()
  let [menuOpen,setMenuOpen] = useState(false)
  const location = useLocation()

  const toggleMenu = () => {
    setMenuOpen(prev => !prev)
  }

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
  },
  {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
  },
  {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
  },
  {
      name: "Your Posts",
      slug: "/your-posts",
      active: authStatus,
  },
  {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
  },
  ]

  return (
    <header className=' shadow'>
      <Container> {/* Container is a custom component that wraps the const first = useContext(second)*/}

        {/* <nav className='flex'>
          <div className='mr-4'>
            <Link to='/'>
              <Logo/>
            </Link>
          </div>

          
          
        </nav> */}

        

        <nav className="bg-white border-gray-200 dark:bg-gray-900">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
               {/* <i class="fa-solid fa-blog" style="color: #74C0FC;"></i> */}
               {/* <FontAwesomeIcon icon="fa-solid fa-blog" style={{color: "#74C0FC",}} /> */}
               <FontAwesomeIcon icon={faBlog} style={{ color: "#74C0FC", fontSize: '1.5rem' }} />

                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Blogify</span>
            </Link>
            <button onClick={toggleMenu}  data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" >
                <span className="sr-only">Open main menu</span>
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
                </svg>
            </button>
            <div className={`${menuOpen ? 'block' : 'hidden'}  w-full md:block md:w-auto`} id="navbar-default">
            <ul className='font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700'>
            {
              navItems.map((item,index) => (
                item.active ? (
                  <NavLink
                  to={item.slug}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `block py-2 px-3 rounded-sm ${isActive ? 'text-purple-600' : 'text-white'} hover:bg-purple-400`
                  }
                >
                  {item.name}
                </NavLink>
                ) : null
              ))
            }
            {authStatus && (<NavLink
                 
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `block py-2 px-3 rounded-sm ${isActive ? 'text-purple-600' : 'text-white'} hover:bg-purple-400`
                  }
                >
                  <LogoutBtn/>
                </NavLink>)}  {/*jo user login hoy to j logout btn batavo*/}

          </ul>


            </div>
          </div>
        </nav>

      </Container>
    </header>
  )
}

export default Header