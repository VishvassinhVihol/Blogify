import React from 'react'
import { useState,useEffect } from 'react'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth'

import {login,logout} from './store/authSlice'
import { Footer, Header } from './Components'
import { Outlet } from 'react-router-dom'


const App = () => {


  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrUser().then((userData) => {
      if(userData){
        // jo user present hoy to tene login karavi do
        dispatch(login({userData}))
      }
      else{
        //nahi to logout karavi do
        dispatch(logout())
      }
    }).finally(() => setLoading(false))
  },[])

  return !loading ? (
  <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
    <div className='w-full block'>
      <Header/>
      <main>
         <Outlet/>
      </main>
      <Footer/>
    </div>
  </div>) : null
}

export default App