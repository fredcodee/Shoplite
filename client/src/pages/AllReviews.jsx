import React ,{ useEffect , useState}from 'react'
import DashboardNavBar from '../components/DashboardNavBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import Api from '../Api'

const AllReviews = () => {
    const [reviews, setReviews] = useState([])
    const [error, setError] = useState(null)
    const storeId = `${localStorage.getItem('store')}`
    const token = localStorage.getItem('token').replace(/"/g, '');

    useEffect(()=>{
        getReviews()
    }, [])


    const getReviews = async()=>{
        try {
            await Api.post('/api/store/all/reviews', {storeId:storeId},{
                headers:{
                    Authorization:token
                }
            })
            .then((response)=>{
                if(response.status == 200){
                    setReviews(response.data)
                }
            })
        } catch (error) {
            setError(error.response.data.message)
        }
    }

    return (
        <div className='container mx-auto pt-3'>
            <DashboardNavBar />
            <div>
                <h3 className='font-bold pt-3'>All Reviews</h3>
            </div>
            <div>
                <hr />
                {reviews.length > 0 ? 
                (reviews.map((review, index)=>(
                    <div className='p-3 hover:bg-slate-200'>
                        <a href={`/product/${review.product_id}`}>
                            <p className='float-right'>20 Aug 2023- {review.date}</p>
                            <h1><FontAwesomeIcon icon={faStar} style={{ color: "#ecc969", }} /><span>{review.rating}</span>/5</h1>
                            <p className='text-green-600'>{review.user_id.email}</p>
                            <small className='text-blue-400'>on <span>{review.product_id.name}</span></small>
                            <p>{review.comment}</p>
                        </a>
                        <hr />
                     </div>
                ))) : 
                (<div> <h1 className='text-center pt-6 text-cyan-800 text-lg'>No reviews yet ...</h1></div>)
                }
            </div>
        </div>
    )
}

export default AllReviews