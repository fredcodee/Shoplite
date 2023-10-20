import React from 'react'
import { useContext, useState } from "react";
import AuthContext from '../context/AuthContext';
import { GoogleLogin } from '@react-oauth/google';

const RegisterPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const { registerUser , handleGoogleAuth,  error } = useContext(AuthContext);


  const handleSubmit = async (e) => {
    e.preventDefault();
    await registerUser (name, email, password);
  }

  return (
    <div>
      <div className="flex justify-center items-center min-h-screen bg-slate-200">
        <div className="bg-white w-auto rounded-xl p-8 ">
        {error && <div className='text-center text-red-500'>{error}</div>}
          <h1 className="text-zinc-600 text-xl p-4">Register your Account</h1>

          <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className="p-2 flex justify-between">
              <label for="name" className="text-zinc-600 m-2">Full Name</label>
              <input
                id="name"
                type="text"
                className="p-2 border border-zinc-600 rounded-md hover:border-violet-500 focus:outline-green-500"
                onChange={e => setName(e.target.value)}
              />
            </div>

            <div className="p-2 flex justify-between">
              <label for="email" className="text-zinc-600 m-2">Email</label>
              <input
                id="email"
                type="email"
                className="p-2 border border-zinc-600 rounded-md hover:border-violet-500 focus:outline-green-500"
                onChange={e => setEmail(e.target.value)}
              />
            </div>

            <div className="p-2 flex justify-between">
              <label for="password" className="text-zinc-600 m-2">Password</label>
              <input
                id="password"
                type="password"
                className="p-2 border border-zinc-600 rounded-md hover:border-violet-500 focus:outline-green-500"
                onChange={e => setPassword(e.target.value)}
              />
            </div>

            <div className="mt-2 text-center p-3">
              <button type="submit" className="text-white w-36 p-2 border rounded-full bg-green-500  active:bg-violet-600 hover:bg-violet-400 focus:bg-violet-300 focus:ring" >Sign Up</button>
            </div>
          </form>
          <hr />
          <div className='text-center pt-3'>
            <p>or Register with</p>
            <div className='pb-3'>
              <GoogleLogin onSuccess={credentialResponse => {
                handleGoogleAuth(credentialResponse.credential)
              }} />
            </div>
            <br />
            <small>I already have an account <span><a href="/login" className='text-blue-600'>click here :)</a></span></small>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
