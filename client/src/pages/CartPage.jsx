import React, {useState, useEffect} from 'react';
import Navbar from '../components/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import sample1 from '../assets/images/sample1.png';
import Api from '../Api';

const CartPage = () => {
  const [cart, setCart] = useState([])
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const token = localStorage.getItem('token').replace(/"/g, '')
  const imageSrc = import.meta.env.VITE_MODE == 'Production' ? import.meta.env.VITE_API_BASE_URL_PROD : import.meta.env.VITE_API_BASE_URL_DEV


  useEffect(()=>{
    getCart()
  }, [])

  const getCart= async()=>{
    try {
      await Api.get('/api/user/all/carts',{
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
      .then((response)=>{
        if(response.status == 200) setCart(response.data)
      })
      
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div className='container mx-auto pt-3'>
      <Navbar />
      <div>
        <div className="grid grid-cols-3 gap-5">
          <div className="col-span-2">
            <div className='pt-3'>
              <form>
                    <a  href="#" className='float-right'> <span><FontAwesomeIcon icon={faTrashCan} style={{color: "#bf3d1d",}}  className='pr-2'/></span>DELETE ALL</a>
                    <label htmlFor="all">
                        <input type="checkbox" id="all" name="options[]" value="all"/>
                        <span className='pl-2'>SELECT ALL (16 ITEM(S))</span>
                        
                    </label><br />
                    {cart.length > 0 ? (
                      (cart.map((cart, index)=>(
                        <div className='border-solid border-2 border-gray-100 rounded-md mb-4 '>
                        <label htmlFor="option1">
                            <input type="checkbox" id="option1" name="options[]" value="Option 1" />
                             <span className='text-green-600 pl-2'><a href="#">{cart?.product_id?.store_id?.name}</a></span>
                             <div className='... text-sm'>
                                    <p className=' text-red-600'><span><FontAwesomeIcon icon={faTrashCan} style={{color: "#bf3d1d",}}  className='pr-2'/>Remove</span></p> 
                                </div>

                            <div className="grid grid-cols-4 gap-5">
                                <div className='... p-3'>
                                <img src={`${imageSrc}/images/${cart?.product_id?.images[0]?.name}`} alt="" className='w-24' />
                                </div>
                                <div className='... text-xl'>
                                    <p>{cart?.product_id?.name}</p>
                                </div>
                                <div className='... text-xl text-green-600'>
                                    <p>$ <span>{cart?.amount}</span></p>
                                </div>
                                <div className='... text-xl'>
                                    <p>Quantity <span><input type="number" id="numberRange" name="numberRange" min="1" max="10" className='bg-gray-50 border border-gray-300' value={cart?.quantity} /></span></p>
                                </div>
                                
                                
                            </div>
                        </label><br />
                    </div>
                      )))
                    ):(<div> Nothing in your cart yet </div>)}

                    {/* <input type="submit" value="Submit" /> */}
              </form>
            </div>
          </div>
          <div className="p-4 border-solid border-2 border-gray-100 rounded-md mt-4">
            <h1 className='text-center text-2xl font-bold'>Order Summary</h1>
            <div>
              <div className='text-xl'>
                <p>Total Items: 18</p>
                <p>Shipping Fee: $<span>199.00</span></p>
                <p>Service payment: $2</p>
                <hr />
              </div>
              <p className='text-2xl font-bold'>Subtotal: $<span>2,009.00</span></p>
              <div className='pt-4 text-center'>
                <button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover-bg-green-700 dark:focus:ring-green-800">PROCEED TO CHECKOUT</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
