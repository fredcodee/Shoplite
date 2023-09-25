import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare,faTrash} from '@fortawesome/free-solid-svg-icons'
import PopUp from '../components/PopUp';
import sample1 from '../assets/images/sample1.png'
import sample2 from '../assets/images/sample2.jpg'
import sample3 from '../assets/images/sample3.jpg'
import sample4 from '../assets/images/sample4.jpg'
import sample5 from '../assets/images/sample5.jpg'
import sample6 from '../assets/images/sample6.jpg'

const ProductLists = () => {
  const [showPopUpForEditProduct, setShowPopUpForEditProduct] =useState(false)

    const togglePopUpForEditProduct= () =>{
        setShowPopUpForEditProduct(!showPopUpForEditProduct)
    }
  return (
    <div>
        <div className='grid grid-cols-6 gap-4 pt-5'>
            <div className="... border-solid border-2 border-grey-100 p-3 rounded-md hover:text-green-600">
              <a href="/product/11">
              <img src={sample1} alt="" className='h-40 w-52'/>
              <div>
                <h3 className='font-bold text-lg'>Title</h3>
                <p>$ <span>122</span></p>
              </div>
              </a>
            </div>
            <div className="... border-solid border-2 border-grey-100 p-3 rounded-md hover:text-green-600">
              <a href="">
              <img src={sample2} alt="" className='h-40 w-52'/>
              <div>
                <h3 className='font-bold text-lg'>Title</h3>
                <p>$ <span>122</span></p>
              </div>
              </a>
            </div>
            <div className="... border-solid border-2 border-grey-100 p-3 rounded-md hover:text-green-600">
              <a href="">
              <img src={sample3} alt="" className='h-40 w-52'/>
              <div>
                <h3 className='font-bold text-lg'>Title</h3>
                <p>$ <span>122</span></p>
              </div>
              </a>
            </div>
            <div className="... border-solid border-2 border-grey-100 p-3 rounded-md hover:text-green-600">
              <a href="">
              <img src={sample4} alt="" className='h-40 w-52'/>
              <div>
                <h3 className='font-bold text-lg'>Title</h3>
                <p>$ <span>122</span></p>
              </div>
              </a>
            </div>
            <div className="... border-solid border-2 border-grey-100 p-3 rounded-md hover:text-green-600">
              <a href="">
              <img src={sample5} alt=""  className='h-40 w-52'/>
              <div>
                <h3 className='font-bold text-lg'>Title</h3>
                <p>$ <span>122</span></p>
              </div>
              </a>
            </div>
            <div className="... border-solid border-2 border-grey-100 p-3 rounded-md hover:text-green-600">
              <a href="">
              <img src={sample6} alt="" className='h-40 w-52' />
              <div>
                <h3 className='font-bold text-lg'>Title</h3>
                <p>$ <span>122</span></p>
              </div>
              </a>
              {/* if user == store owner show this */}
              <div className='flex gap-4'>
                <p className='hover:cursor-pointer hover:text-xl' onClick={togglePopUpForEditProduct}><FontAwesomeIcon icon={faPenToSquare} style={{color: "#dd843c",}}/></p>
                <p className='hover:cursor-pointer hover:text-xl'><FontAwesomeIcon icon={faTrash} style={{color: "#cb2a2a",}} /></p>
              </div>
            </div>
          </div>

          {/* for popup for editing product*/}
       {showPopUpForEditProduct&& <PopUp
                content={<>
                    <div id="staticModal" data-modal-backdrop="static" tabIndex="-1" aria-hidden="true" className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                        <div className="relative w-full max-w-2xl max-h-full" style={{ margin: "auto" }}>
                            <div className="relative bg-gray-300 rounded-lg shadow dark:bg-gray-700">

                                <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                       Edit product
                                    </h3>
                                    <button type="button" onClick={togglePopUpForEditProduct} className="text-white bg-transparent hover:bg-white hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="staticModal">
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
                                          <button type="button" class="text-white text-xl bg-green-500 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg  px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Save Changes</button>
                                        </div>
                                        

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>}
            />}
    </div>
  )
}

export default ProductLists