import React, { useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'

const Login = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role,setRole] = useState("")
  const [currentState, setCurrentState] = useState('Login')

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    if (currentState === 'Sign Up') {
      // Registration
      try {
        await axios.post('http://localhost:4000/api/user', {
          name,
          email,
          password,
          role
        })
        toast.success("Registration Successful")
        setCurrentState('Login')
      } catch (err) {
        console.log(err)
        toast.error(err?.response?.data?.error || "Registration Failed")
      }
    } else {
      // Login
      try {
        await axios.post('http://localhost:4000/api/user/login', {
          email,
          password
        })
        toast.success("Login Successful")
      } catch (err) {
        toast.error(err?.response?.data?.error || "Login Failed")
      }
    }
  }

  return (
    <div>
      <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-black'>
        <div className='inline-flex items-center gap-2 mb-2 mt-10'>
          <p className='prata-regular text-3xl'>{currentState}</p>
          <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
        </div>

        {currentState === "Login" ? null : (
          <>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='w-full px-3 py-2 border border-gray-800'
            placeholder='Name'
            required
          />
          <input
            type='text'
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className='w-full px-3 py-2 border border-gray-800'
            placeholder='Role'
            required
          />
          </>
        )}
        <input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='w-full px-3 py-2 border border-gray-800'
          placeholder='Email'
          required
        />
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='w-full px-3 py-2 border border-gray-800'
          placeholder='Password'
          required
        />

        <div className='w-full flex justify-between text-sm mt-[-8px]'>
          <p className='cursor-pointer'>Forgot Your Password</p>
          {currentState === 'Login' ? (
            <p className='cursor-pointer' onClick={() => setCurrentState('Sign Up')}>Create Account</p>
          ) : (
            <p className='cursor-pointer' onClick={() => setCurrentState('Login')}>Login Here</p>
          )}
        </div>

        <button className='bg-black text-white font-light px-8 py-2 mt-4'>
          {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
        </button>
      </form>
    </div>
  )
}

export default Login
