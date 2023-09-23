import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'

const RegisterPage = () => {
  return (
    <div>
      <div className="flex justify-center items-center min-h-screen bg-slate-200">
        <div className="bg-white w-auto rounded-xl p-8 ">
          <h1 className="text-zinc-600 text-xl p-4">Register your Account</h1>

          <form className="flex flex-col">
          <div className="p-2 flex justify-between">
              <label for="name" className="text-zinc-600 m-2">Full Name</label>
              <input
                id="name"
                type="text"
                className="p-2 border border-zinc-600 rounded-md hover:border-violet-500 focus:outline-green-500"
              />
            </div>

            <div className="p-2 flex justify-between">
              <label for="email" className="text-zinc-600 m-2">Email</label>
              <input
                id="email"
                type="email"
                className="p-2 border border-zinc-600 rounded-md hover:border-violet-500 focus:outline-green-500"
              />
            </div>

            <div className="p-2 flex justify-between">
              <label for="password" className="text-zinc-600 m-2">Password</label>
              <input
                id="password"
                type="password"
                className="p-2 border border-zinc-600 rounded-md hover:border-violet-500 focus:outline-green-500"
              />
            </div>

            <div className="mt-2 text-center p-3">
              <button type="submit" className="text-white w-36 p-2 border rounded-full bg-green-500  active:bg-violet-600 hover:bg-violet-400 focus:bg-violet-300 focus:ring" >Sign Up</button>
            </div>
          </form>
          <hr />
          <div className='text-center pt-3'>
            <p>or Register with</p>
            <button type="button" className=" mt-3 py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-400 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"> <span className='pr-2'><FontAwesomeIcon icon={faGoogle} style={{color: "#d71919",}} /></span>Google</button>
            <br />
            <small>I already have an account <span><a href="/login" className='text-blue-600'>click here :)</a></span></small>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
