import React, { useEffect, useState } from 'react'
import NavBar from '../components/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import sample9 from '../assets/images/sample9.jpg'
import { useParams } from 'react-router-dom'
import Api from '../Api';
import { useNavigate } from 'react-router-dom';

const Store = () => {
    const { storeName } = useParams();
    const [store, setStore] = useState([])
    const [products, setProducts] = useState([])
    const history = useNavigate();
    const token = localStorage.getItem('token').replace(/"/g, '');
    const imageSrc = import.meta.env.VITE_MODE == 'Production' ? import.meta.env.VITE_API_BASE_URL_PROD : import.meta.env.VITE_API_BASE_URL_DEV


    useEffect(() => {
        getStore()
    }, [])

    const getStore = async () => {
        await Api.post('/api/get/store', { name: storeName })
            .then(async (response) => {
                if (response.status == 200) {
                    setStore(response.data)
                    await getProducts(response.data._id)
                }
            })
            .catch((err) => {
                history('/')
            })
    }

    const getProducts = async (storeId) => {
        await Api.post('/api/store/all-products', { storeId: storeId }, {
            headers: {
                Authorization: token
            }
        })
            .then((response) => {
                if (response.status == 200) setProducts(response.data)
            })
    }

    return (
        <div>
            <NavBar />
            <div className='container mx-auto pt-3'>
                <div className='p-3 rounded-md flex gap-5 justify-center items-center'>
                    <img src={sample9} alt="image" className='w-28' />
                    <div>
                        <h1 className='font-bold text-xl'>{store?.name}</h1>
                        <div className='w-72'>
                            <p>{store?.bio}</p>

                        </div>
                        <p><FontAwesomeIcon icon={faStar} style={{ color: "#ecc969", }} /><span>{store?.rating}</span>/5</p>
                    </div>
                </div>
                <hr />

                <div className='p-3'>
                    <form>
                        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <input type="search" id="default-search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-green-500 focus:border-green-500 dark:bg-green-700 dark:border-green-600 dark:placeholder-green-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="Search in store" required />
                            <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-green-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                        </div>
                    </form>
                </div>

                <div>
                    <div className='grid grid-cols-6 gap-4 pt-5'>
                        {products.length > 1 ? (
                            (products.map((product, index) => (
                                <div key={index} className="... border-solid border-2 border-grey-100 p-3 rounded-md hover:text-green-600">
                                    <a href={`/product/${product._id}`}>
                                        <img src={`${imageSrc}/images/${product.images[0].name}` || sample3} alt="" className='h-40 w-52' />
                                        <div>
                                            <h3 className='font-bold text-lg'>{product.name}</h3>
                                            <p>$ <span>{product.price}</span></p>
                                        </div>
                                    </a>
                                </div>
                            )))
                        ) : (<div> <h1 className='text-center pt-6 text-cyan-800 text-lg'>No Products yet ...</h1></div>)}
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Store