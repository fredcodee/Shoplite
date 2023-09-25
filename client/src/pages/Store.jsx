import React from 'react'
import NavBar from '../components/Navbar';
import ProductLists from '../components/ProductLists';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import sample9 from '../assets/images/sample9.jpg'

const Store = () => {
    return (
        <div>
            <NavBar />
            <div className='container mx-auto pt-3'>
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
                <hr />

                <div className='p-3'>
                    <form>
                        <label for="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <input type="search" id="default-search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-green-500 focus:border-green-500 dark:bg-green-700 dark:border-green-600 dark:placeholder-green-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="Search in store" required />
                            <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-green-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                        </div>
                    </form>
                </div>

                <div>
                    < ProductLists />
                </div>

            </div>

        </div>
    )
}

export default Store