import React from 'react'
import { useDispatch,useSelector } from 'react-redux'
import authService from '../appwrite/auth'
import {logout} from '../store/authSlice'

const LogoutBtn = () => {
    const dispatch = useDispatch()
    function logoutHandler(){
        authService.logout().then(() => {
            dispatch(logout())
        })
    }
  return (
    <button
    className='block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
    onClick={logoutHandler}
    >Logout</button>
  )
}

export default LogoutBtn