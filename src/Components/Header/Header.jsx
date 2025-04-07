import React, { use } from 'react'

import {Container,LogoutBtn} from '../index'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import Logo from '../Logo'

const Header = () => {
  const authStatus = useSelector(state => state.auth.status) //state.auth.status bcz the name is auth and the key is also auth go and check in authSlice.js authstatus represent that user is logged in or not
  console.log(authStatus);
  
  const navigate = useNavigate()

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
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
  },
  ]

  return (
    <header className='py-3 shadow bg-gray-500'>
      <Container> {/* Container is a custom component that wraps the const first = useContext(second)*/}

        <nav className='flex'>
          <div className='mr-4'>
            <Link to='/'>
              <Logo/>
            </Link>
          </div>

          <ul className='flex ml-auto'>
            {
              navItems.map((item,index) => (
                item.active ? (
                  <li key={index}>
                    <button onClick={() => navigate(item.slug)} className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'>{item.name}</button>
                  </li>
                ) : null
              ))
            }

          </ul>
          {authStatus && (<ul><li><LogoutBtn/></li></ul>//jo user login hoy to j logout btn batavo
          )}
        </nav>
      </Container>
    </header>
  )
}

export default Header