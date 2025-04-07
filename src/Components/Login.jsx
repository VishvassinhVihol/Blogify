import React, { useState } from 'react'
import {Logo} from '../Components/index'
import {login as authLogin} from '../store/authSlice' //login method as authLogin
import authService from '../appwrite/auth' //for login and All
import {useForm} from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import {Input,Button} from '../Components/index'

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {register,handleSubmit} = useForm()//register and handlesubmit both are event

    const [error,setError] = useState('')

    const login = async (data) => {//aa data ma form no badho data hase
        setError('')//clean error

        try {
            let session =  await authService.login(data)

            if (session) {//means user is logged in
                let userData = await authService.getCurrUser()//get data
                if(userData){
                    dispatch(authLogin(userData))
                }
                navigate('/')
                
            }
            
        } catch (error) {
            console.log("Login error:", error);  // This will help debugging
            const message = error?.message || error?.response?.message || "Login failed";
            setError(message);
        }
    }

  return (
    <div className='flex items-center justify-center w-full'>
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
            <div className="mb-2 flex justify-center">
                        <span className="inline-block w-full max-w-[100px]">
                            <Logo width="100%" />
                        </span>
            </div>

            <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>

            <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
            </p>
            {error && <p className="text-red-600 mt-8 text-center">{error}</p>}


            {/* handle submit is keyword of react-hook-form and it is an event and it expect a method */}

            {/* register: is se tum input fields ko React Hook Form ke under register karte ho taaki woh validation aur tracking ka part ban jaayein.

handleSubmit: ye ek function hota hai jo form submit hone par tumhare diye gaye method ko call karta hai (jaise login method yaha). */}
            <form onSubmit={handleSubmit(login)} className='mt-8'> {/*Jab user form submit karega, handleSubmit pehle validation karega.
Agar validation pass ho jaata hai, toh tumhara login(data) function call hoga — jisme data me form ke sare field ka value hota hai. */}
            <div className='space-y-5'>
                <Input
                label="Email: "
                placeholder="Enter your email"
                type="email"
                {...register("email", {
                    required: true,
                    validate: {
                          //this pattern is rajax online mali jay
                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                    }

                        // register("email"): email naam se form field ko track kar raha hai.

                        // required: true: bol raha hai ki yeh field bharna zaroori hai.

                        // validate: yeh ek function deta hai jisse tum custom validation likh sakte ho. Jaise yaha email pattern check ho raha hai.
                })}
                />
                <Input
                label="Password: "
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                    required: true,
                })}
                />
                <Button
                type="submit"
                className="w-full"
                >Sign in</Button>
            </div>
        </form>
        </div>
    </div>
  )
}

export default Login



//react-hook-form ek library hai jo React me form banana aur handle karna bahut aasan aur efficient bana deti hai.

// Ye mainly teen cheezon ke liye use hoti hai:

// Form input ko register karna (track karna)

// Form validate karna (jaise email sahi hai ya nahi)

// Submit hone par data handle karna

//React Hook Form ek tarika hai form inputs ko handle karne ka — jisme tum register() se inputs ko track karte ho, handleSubmit() se data bhejte ho, aur asaani se validation lagate ho.
