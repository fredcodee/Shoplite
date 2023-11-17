import React from 'react'
import Navbar from '../components/Navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react'
import { useParams, useNavigate} from 'react-router-dom'
import sample1 from '../assets/images/sample1.png'
import Api from '../Api'

const ProductPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState([])
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const token = localStorage.getItem('token') || false
    const imageSrc = import.meta.env.VITE_MODE == 'Production' ? import.meta.env.VITE_API_BASE_URL_PROD : import.meta.env.VITE_API_BASE_URL_DEV
    const [imageSlides, setImageSlide] = useState([])
    const history = useNavigate();
    const [quantity, setQuantity] =  useState('')

    useEffect(() => {
        getProduct()
    }, [])

    const getProduct = async () => {
        try {
            await Api.post('/api/store/product', { productId: id }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((response) => {
                    if (response.status == 200) {
                        setProduct(response.data)
                        setImageSlide(response.data.product.images)
                    }
                })
        } catch (error) {
            setError(error.message)
        }
    }

    const [currentIndex, setCurrentIndex] = useState(0)
    const prevSlide =()=>{
        const isFirstSlide = currentIndex === 0;
        const newIndex =  isFirstSlide ? imageSlides.length -1 : currentIndex - 1;
        setCurrentIndex(newIndex)
    }
    const nextSlide =()=>{
        const isLastSlide = currentIndex === imageSlides.length -1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex)
    }

    const addToCart = async()=>{
        try{
            if(!token) history('/login')
            const data = {
                productId: product.product._id,
                storeId:product.product.store_id._id,
                amount:  product.product.price * parseInt(quantity == "" ? 1: quantity ),
                quantity: quantity == "" ? 1 : parseInt(quantity)
            }
            await Api.post('/api/user/add/cart',data,{
                headers:{
                    Authorization: `Bearer ${token.replace(/"/g, '')}`
                }
            })
            .then((response)=>{
                if (response.status === 200) {
                    setError(null)
                    setSuccess("Added to you cart")
                }
            })
        }catch(error){
            setSuccess(null)
            setError("error.message")
        }
    }
    return (
        <div className='container mx-auto pt-3'>
            <Navbar />
            {error && <div className='text-red-500 pb-2 text-center font-bold'><p>{error}</p></div>}
            {success && <div className='text-green-500 pb-2 text-center font-bold text-lg'>{success}</div>}
            <div>
                <p> <span> <a href={`/store/${product?.product?.store_id?.name || "unknown"}`} className='text-green-600'>{product?.product?.store_id?.name || "Unknown Store"}</a></span> - {product?.product?.name}</p>
            </div>

            <div className='grid grid-cols-2 gap-4 pb-5 border-solid border-2 border-grey-100  rounded-md'>
                <div className="relative p-4">
                    <div id="default-carousel" className="relative" data-carousel="slide">
                        <div className="overflow-hidden relative h-56 rounded-lg sm:h-64 xl:h-80 2xl:h-96">
                                    <div className="duration-700 ease-in-out" data-carousel-item>
                                        <img
                                            src={`${imageSrc}/images/${product?.product?.images[currentIndex]?.name}` || sample1}
                                            className="block absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2"
                                            alt="..." />
                                    </div>
                        </div>
                        <button type="button" 
                            onClick={prevSlide}
                            className="flex absolute top-0 left-0 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none" data-carousel-prev>
                                <span className="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                                    <svg className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                                    <span className="hidden">Previous</span>
                                </span>
                        </button>
                        <button type="button" 
                            onClick={nextSlide}
                            className="flex absolute top-0 right-0 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none" data-carousel-next>
                                <span className="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                                    <svg className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                                    <span className="hidden">Next</span>
                                </span>
                        </button>
                    </div>

                </div>
                <div className="...">
                    <h3 className='font-bold text-lg'>{product?.product?.name}</h3>
                    <p><FontAwesomeIcon icon={faStar} style={{ color: "#ecc969", }} /><span>4.5/5   </span><a href="#" className='text-red-600 pl-2'>{product?.totat_reviews} ratings ...</a></p>
                    <h1 className='text-green-600 text-2xl pt-5 pb-4'>$ <span>{product?.product?.price}</span></h1>
                    <hr />
                    <div className='pt-4'>
                            <label htmlFor="numberRange" className='text-xl'>Quantity </label>
                            <input type="number" id="numberRange" name="numberRange" min="1" max={product?.product?.stock}
                                className='bg-gray-50 border border-gray-300'  
                                required
                                onChange={e => setQuantity(e.target.value)}
                            />
                            <div className='pt-4'>
                                <button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Order Now</button>
                                <button type="button" onClick={addToCart} className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900">Add to Cart</button>
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
                <h1><FontAwesomeIcon icon={faStar} style={{ color: "#ecc969", }} className='text-4xl' /><span className='text-4xl'>4.5/5 </span></h1>
                <small>{product?.totat_reviews} ratings</small>
                <hr />
                <div>
                    <div className='pt-3 pb-3'>
                        <h3 className='font-bold'>Product Reviews</h3>
                        <hr />
                    </div>
                    {
                        product?.totat_reviews > 0 ? (
                            (product?.reviews?.map((review, index) => (
                                <div className='p-3' key={index}>
                                    <p className='float-right'>{review.date}</p>
                                    <h1><FontAwesomeIcon icon={faStar} style={{ color: "#ecc969", }} /><span>{review.rating}</span>/5</h1>
                                    <p className='text-green-600'>{review.user_id.email}</p>
                                    <p>{review.comment}</p>
                                    <hr />
                                </div>
                            )))
                        ) : (<div>No Reviews ...</div>)
                    }
                </div>
            </div>
        </div>
    )
}

export default ProductPage
