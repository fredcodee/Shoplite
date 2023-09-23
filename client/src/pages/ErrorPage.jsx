import React from 'react'
import '../assets/styles/error.css'

const ErrorPage = () => {
  return (
    <div>
      <div id="main">
        <div className="fof">
          <h1>Error 404</h1> <br />
          <small className='text-xl'>Oops Page not found</small> 
          <div className='mt-5'>
            <a href="/homepage" className='text-green-600'>go back to Hompage</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ErrorPage
