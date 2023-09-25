import React, { useState } from 'react'
import DashboardNavBar from '../components/DashboardNavBar'
import sample9 from '../assets/images/sample9.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar,faPenToSquare,faTrash } from '@fortawesome/free-solid-svg-icons'
import PopUp from '../components/PopUp';

const MyStore = () => {
    const [showPopUpForEditProfile, setShowPopUpForEditProfile] =useState(false)

    const togglePopUpForEditProfile= () =>{
        setShowPopUpForEditProfile(!showPopUpForEditProfile)
    }
    return (
        <div className='container mx-auto pt-3'>
            <DashboardNavBar />
            <div className=' text-xl'>
                <h1 className='pt-4'>My Profile Details</h1>
                <hr />
                <p>Name: <span>Mika dean</span></p>
                <p>Email: <span>mike@jjj.com</span></p>
            </div>
            <div className='p-3 rounded-md flex gap-5 justify-center items-center'>
                <img src={sample9} alt="image" className='w-28' />
                <div>
                    <h1 className='font-bold text-xl'>Store Name</h1>
                    <div className='w-72'>
                        <p>temporibus aliquam animi facilis nam cumque, dolorem alias saepe eligendi minus incidunt inventore laboriosam. Ut.</p>

                    </div>
                    <p><FontAwesomeIcon icon={faStar} style={{ color: "#ecc969", }} /><span>4.5/5</span></p>
                </div>
            </div>
            <div className='flex gap-4 justify-center items-cente'>
                    <p className='hover:cursor-pointer text-2xl' onClick={togglePopUpForEditProfile}><FontAwesomeIcon icon={faPenToSquare} style={{color: "#dd843c",}}/></p>
                    <p className='hover:cursor-pointer text-2xl'><FontAwesomeIcon icon={faTrash} style={{color: "#cb2a2a",}} /></p>
              </div>
              {/* for popup for editing profile*/}
       {showPopUpForEditProfile&& <PopUp
                content={<>
                    <div id="staticModal" data-modal-backdrop="static" tabIndex="-1" aria-hidden="true" className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                        <div className="relative w-full max-w-2xl max-h-full" style={{ margin: "auto" }}>
                            <div className="relative bg-gray-300 rounded-lg shadow dark:bg-gray-700">

                                <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                       Edit product
                                    </h3>
                                    <button type="button" onClick={togglePopUpForEditProfile} className="text-white bg-transparent hover:bg-white hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="staticModal">
                                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                        </svg>
                                        <span className="sr-only">Close modal</span>
                                    </button>
                                </div>
                                <div className="p-6 space-y-6">
                                    <div>
                                        <div className='pb-3'>
                                            <label htmlFor="storeName">
                                                Store Name
                                            </label>
                                            <input type="text"  id="storeName" className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"/>
                                        </div>
                                        <div className='pb-3'> 
                                            <label htmlFor="StoreDescription">
                                            Store Description
                                            </label>
                                            <textarea id="StoreDescription" rows="3" className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm" ></textarea>
                                            </div>
                                        <div className='pb-3'>
                                            <label htmlFor="Picture">
                                                Profile Picture
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

export default MyStore