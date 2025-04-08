import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth'

import { login, logout } from './store/authSlice'
import { Footer, Header } from './Components'
import { Outlet } from 'react-router-dom'
import Loader from './Components/Loader/Loder'
import { set } from 'mongoose'



const App = () => {


  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrUser().then((userData) => {
      if (userData) {
        // jo user present hoy to tene login karavi do
        dispatch(login({ userData }))
      }
      else {
        //nahi to logout karavi do
        dispatch(logout())
      }
    }) // finally me loading ko false kar do, chahe kuch bhi ho

    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer); // cleanup on unmount
    // Jab setTimeout ko React dekh lega, vo timer laga dega background me

    // Lekin vo 2 second tak kuch nahi karega

    // React meanwhile render kar deta hai component ko(loading is still true, so < Loader /> dikhata hai)

    // 2 second ke baad, setLoading(false) call hota hai, jisse state change hoti hai

    // React fir se render karta hai, ab actual app dikhata hai
  }, [])
  if (loading) return <Loader />;

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between'>
      <div className='w-full block'>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>) : null
}

export default App