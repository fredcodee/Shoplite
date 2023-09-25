import React, { useState } from 'react'
import DashboardNavBar from '../components/DashboardNavBar'
import ProductLists from '../components/ProductLists';
import PopUp from '../components/PopUp';

const MyProducts = () => {
    const [showPopUpForAddProduct, setShowPopUpForAddProduct] =useState(false)

    const togglePopUpForAddProduct= () =>{
        setShowPopUpForAddProduct(!showPopUpForAddProduct)
    }

  return (
    <div className='container mx-auto pt-3'>
      <DashboardNavBar/>
      <div className='text-center pt-4'>
        <button type="button"  onClick={togglePopUpForAddProduct} className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Add New Product</button>
      </div>
       {/* for popup for adding product*/}
       {showPopUpForAddProduct&& <PopUp
                content={<>
                    <div id="staticModal" data-modal-backdrop="static" tabIndex="-1" aria-hidden="true" className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                        <div className="relative w-full max-w-2xl max-h-full" style={{ margin: "auto" }}>
                            <div className="relative bg-gray-300 rounded-lg shadow dark:bg-gray-700">

                                <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                       Add a new product
                                    </h3>
                                    <button type="button" onClick={togglePopUpForAddProduct} className="text-white bg-transparent hover:bg-white hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="staticModal">
                                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                        </svg>
                                        <span className="sr-only">Close modal</span>
                                    </button>
                                </div>
                                <div className="p-6 space-y-6">
                                    <div>
                                        <div className='pb-3'>
                                            <label htmlFor="productName">
                                                Product Name
                                            </label>
                                            <input type="text"  id="productName" className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm" placeholder="Product Name eg. excel course" required/>
                                        </div>
                                        <div className='pb-3'> 
                                            <label htmlFor="productDescription">
                                                Product Description
                                            </label>
                                            <textarea id="productDescription" rows="3" className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm" placeholder="Product Description" required></textarea>
                                            </div>
                                        <div className='pb-3'>
                                            <label htmlFor="Stock">
                                                Stock
                                            </label>
                                            <input type="number" id="Stock" className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm" placeholder="Current Stock" required/>
                                        </div>
                                        <div className='pb-3'>
                                            <label htmlFor="Price">
                                                Price
                                            </label>
                                            <input type="number" id="Price" className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm" placeholder="Product Price" required/>
                                        </div>
                                        <div className='pb-3'>
                                            <label htmlFor="Picture">
                                                Picture
                                            </label>
                                            <input type="file" id="Picture" className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"/>
                                        </div>
                                        <div className='text-center'>
                                          <button type="button" class="text-white text-xl bg-green-500 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg  px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Add</button>
                                        </div>
                                        

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>}
            />}
      <div>
        <h1>My Products</h1>
        < ProductLists />
      </div>
    </div>
  )
}

export default MyProducts
