import React from 'react'
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import Api from '../Api'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const history = useNavigate()


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Api.post('/auth/login', {
        email,
        password,
      },
        {
          withCredentials: true,
        }
      );
      if (response.status == 200) {
        history('/homepage');
      }
    } catch (err) {
      console.log(err)
      if (err.response.status === 401) setError("Invalid credentials")

    }
  }

  const handleGoogleAuth = async(response)=>{
    //
  }

  return (
    <div>
      <div className="flex justify-center items-center min-h-screen bg-slate-200">
        <div className="bg-white w-auto rounded-xl p-8 ">
          {error && <div className='text-center text-red-500'>{error}</div>}
          <h1 className="text-zinc-600 text-xl p-4">Login To Your ShopLite</h1>

          <form className="flex flex-col" onSubmit={handleSubmit}>
            <div className="p-2 flex justify-between">
              <label  htmlFor="email" className="text-zinc-600 m-2">Email</label>
              <input
                id="email"
                type="email"
                className="p-2 border border-zinc-600 rounded-md hover:border-violet-500 focus:outline-green-500"
                onChange={e => setEmail(e.target.value)}
              />
            </div>

            <div className="p-2 flex justify-between">
              <label htmlFor="password" className="text-zinc-600 m-2">Password</label>
              <input
                id="password"
                type="password"
                className="p-2 border border-zinc-600 rounded-md hover:border-violet-500 focus:outline-green-500"
                onChange={e => setPassword(e.target.value)}
              />
            </div>

            <div className="mt-2 text-center p-3">
              <button type="submit" className="text-white w-36 p-2 border rounded-full bg-green-500  active:bg-violet-600 hover:bg-violet-400 focus:bg-violet-300 focus:ring" >Sign In</button>
            </div>
          </form>
          <hr />
          <div className='pt-3'>
            <p className='text-center font-bold'>or Login with</p>
            <div className='pb-3'>
              <GoogleLogin onSuccess={credentialResponse => {
                console.log(credentialResponse);
                handleGoogleAuth(credentialResponse)
              }} />
            </div>
            <button type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Demo Accounts</button>

            <br />
            <small>Don't have an account yet  <span><a href="/register" className='text-blue-600'>Register here :)</a></span></small>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
