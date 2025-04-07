// mechanism to protect pages and routes

import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Protected({children,authentication = true}) {//authentication is a prop that is passed by user.

    const navigate = useNavigate()
    const [loader,setLoader] = useState(true)

    const authStatus = useSelector(state => state.auth.status) //authStatus represent that user is logged in or not

    useEffect(() => {
        //authentiacation ni val ahi true chhe menas user want to render the page and authStatus is false means user is not logged in so redirect to login page
        //true && false != true means true && true to aa case ma login page par redirect karo
        if(authentication && authStatus !== authentication){
            navigate('/login')
        }

        //now if authentication is false and authStatus is true means user is logged in and he is trying to access the login page so redirect to home page
        //false && true != false means false && false to aa case ma home page par redirect karo

        
        else if(!authentication && authStatus !== authentication){
            navigate('/')

        }
        setLoader(false)

    },[authStatus,navigate,authentication])

  return (
    loader ? <h1>loading...</h1> : <>{children}</>
  )
}

export default Protected