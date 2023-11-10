import React from 'react'
import Navbar from '../components/Navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import sample1 from '../assets/images/sample1.png'
import Api from '../Api'

const ProductPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState([])
    const [error, setError] = useState(null)
    const token = localStorage.getItem('token').replace(/"/g, '');
    const imageSrc = import.meta.env.VITE_MODE == 'Production' ? import.meta.env.VITE_API_BASE_URL_PROD : import.meta.env.VITE_API_BASE_URL_DEV

    useEffect(()=>{
        getProduct()
    }, [])

    const getProduct = async()=>{
        try {
            await Api.post('/api/store/product',{productId:id},{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            .then((response)=>{
                if(response.status ==200) setProduct(response.data)
            })
        } catch (error) {
            setError(error.message)
        }
    }
    return (
        <div className='container mx-auto pt-3'>
            <Navbar />
            {error && <div className='text-red-500 pb-2'><p>{error}</p></div>}
            <div>
                <p> <span> <a href={`/store/${product?.product?.store_id?.name || "unknown"}`}  className='text-green-600'>{product?.product?.store_id?.name || "Unknown Store"}</a></span> - {product?.product?.name}</p>
            </div>

            <div className='grid grid-cols-2 gap-4 pb-5 border-solid border-2 border-grey-100  rounded-md'>
                <div className="... p-4">
                    <img src={`${imageSrc}/images/${product?.product?.images[0].name}` || sample1} alt="" />
                </div>
                <div className="...">
                    <h3 className='font-bold text-lg'>{product?.product?.name}</h3>
                    <p><FontAwesomeIcon icon={faStar} style={{ color: "#ecc969", }} /><span>4.5/5   </span><a href="#" className='text-red-600 pl-2'>{product?.totat_reviews} ratings ...</a></p>
                    <h1 className='text-green-600 text-2xl pt-5 pb-4'>$ <span>{product?.product?.price}</span></h1>
                    <hr />
                    <div className='pt-4'>
                        <label htmlFor="numberRange" className='text-xl'>Quantity </label>
                        <input type="number" id="numberRange" name="numberRange" min="1" max="10" className='bg-gray-50 border border-gray-300' />
                        <div className='pt-4'>
                        <button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Order Now</button>
                        <button type="button" className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900">Add to Cart</button>
                        </div>
                    </div>

                    <div>
                        <small>Sold by <span><a href={`/store/${product?.product?.store_id?.name || "unknown"}`} className='text-green-600 pr-2'>{product?.product?.store_id?.name || "Unknown Store"}</a></span></small>
                        <small><FontAwesomeIcon icon={faStar} style={{ color: "#ecc969", }} />4.5/5  </small>
                    </div>
                </div>
            </div>

            <div className='border-solid border-2 border-grey-100 mt-5 p-4 rounded-md'>
                <h3 className='font-bold text-lg'>Product details</h3>
                <p>{product?.product?.description}</p>

            </div>

            <div className='border-solid border-2 border-grey-100 mt-5 p-4 rounded-md'>
                <h3 className='font-bold text-lg'>Ratings & Reviews</h3>
                <h1><FontAwesomeIcon icon={faStar} style={{ color: "#ecc969", }} className='text-4xl'/><span className='text-4xl'>4.5/5 </span></h1>
                <small>{product?.totat_reviews} ratings</small>
                <hr />
                <div>
                <div className='pt-3 pb-3'>
                        <h3 className='font-bold'>Product Reviews</h3>
                        <hr />
                    </div>
                    {
                        product?.totat_reviews > 0? (
                            (product?.reviews?.map((review, index)=>(
                                <div className='p-3'>
                                    <p className='float-right'>{review.date}</p>
                                    <h1><FontAwesomeIcon icon={faStar} style={{ color: "#ecc969", }} /><span>{review.rating}</span>/5</h1>
                                    <p className='text-green-600'>{review.user_id.email}</p>
                                    <p>{review.comment}</p>
                            <hr />
                                </div>
                            )))
                        )  : (<div>No Reviews ...</div>)
                    }
                </div>
            </div>
        </div>
    )
}

export default ProductPage
