import React from 'react'
import Navbar from '../components/Navbar'
import { useState, useEffect } from 'react'
import { useParams, useNavigate} from 'react-router-dom'
import sample1 from '../assets/images/sample1.png';
import Api from '../Api'

const Review = () => {
    const { id } = useParams();
    const [product, setProduct] = useState([])
    const [error, setError] = useState(null)
    const [review , setReview] = useState('')
    const [rating, setRating]= useState('')
    const token = localStorage.getItem('token').replace(/"/g, '')
    const imageSrc = import.meta.env.VITE_MODE == 'Production' ? import.meta.env.VITE_API_BASE_URL_PROD : import.meta.env.VITE_API_BASE_URL_DEV
    const history = useNavigate();

    useEffect(() => {
        getProduct()
    }, [])


    const getProduct = async () => {
        try {
            await Api.post('/api/store/product', { productId: id })
                .then((response) => {
                    if (response.status == 200) {
                        setProduct(response.data)
                    }
                })
        } catch (error) {
            setError(error.message)
        }
    }

    const reviewProduct = async (e)=>{
        try{
            e.preventDefault();
            const data = {
                review,
                rating,
                productId:product.product._id,
                storeId:product.product.store_id._id
            }
            await Api.post('/api/user/review/product', data, {
                headers:{
                    Authorization: `Bearer ${token}`
                  }
            }).then((response)=>{
                if(response.status == 200){
                    history('/orders')
                }
            })
        } catch (error) {
            setError(error.message)
        }
    }



  return (
    <div className='container mx-auto pt-3'>
      <Navbar />
      {error && <div className='text-red-500 pb-2 text-center font-bold'><p>{error}</p></div>}
      <div>
        <h3 className='text-center font-bold pt-4'>Write Review</h3>
        <div className='flex pt-4 justify-center'>
            <div>
                <img src={`${imageSrc}/images/${product?.product?.images[0]?.name}` || sample1} alt="" className='w-24' />
            </div>
            <div className='pl-3'>
                <h3 className='font-bold'>{product?.product?.name}</h3>
            </div>
        </div>
              <div className='pt-4 text-center'>
                  <form onSubmit={reviewProduct}>
                      <label htmlFor="numberRange" className='text-xl'>Overall Rating</label>
                      <input type="number" id="numberRange" name="numberRange" min="1" max="5"
                          className='bg-gray-50 border border-gray-300 mb-3'
                          required
                          onChange={e => setRating(e.target.value)}
                      /> <br />

                      <input
                          id="review"
                          type="text"
                          className="p-2 border border-zinc-600 rounded-md hover:border-violet-500 focus:outline-green-500 w-96"
                          onChange={e => setReview(e.target.value)}
                          placeholder='What do you think of this product'
                          required
                      />
                      <div className='pt-3'>
                          <button type="submit" className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"> Submit </button>
                      </div>

                  </form>
              </div>



      </div>
    </div>
  )
}

export default Review