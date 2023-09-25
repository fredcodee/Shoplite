import React from 'react'
import DashboardNavBar from '../components/DashboardNavBar'
import ProductLists from '../components/ProductLists';

const MyProducts = () => {
  return (
    <div className='container mx-auto pt-3'>
      <DashboardNavBar/>
      <div className='text-center pt-4'>
        <button type="button" className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Add New Product</button>
      </div>
      <div>
        <h1>My Products</h1>
        < ProductLists />
      </div>
    </div>
  )
}

export default MyProducts
