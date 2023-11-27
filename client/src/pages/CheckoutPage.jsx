import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import sample1 from '../assets/images/sample1.png';
import Api from '../Api';

const CheckoutPage = ({ orderObjects}) => {
    const [myOrders, setmyOrders] = useState(orderObjects || []);
    const [shippingAddress, setShippingAddress] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] =  useState(null)
    const history = useNavigate()
    const imageSrc = import.meta.env.VITE_MODE == 'Production' ? import.meta.env.VITE_API_BASE_URL_PROD : import.meta.env.VITE_API_BASE_URL_DEV
    const token = localStorage.getItem('token').replace(/"/g, '')


    useEffect(() => {
        checkObjects()
    }, [myOrders]);

    const checkObjects =  ()=>{
        if(myOrders.length == 0){
            history('/orders')
        }
    }


    const handleCheckout = async () => {
        try {
            const data =  {
                email:email,
                address:shippingAddress,
                cartIds: myOrders.map((cart)=>{ return cart._id})
            }
            await Api.post('/api/user/order',data, {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            history('/orders');
        } catch (error) {
            setError(error.message)
        }
    };

    return (
        <div>
            <div className='container mx-auto pt-3'>
                <Navbar />
                <div>
                    <div className='grid grid-cols-2 gap-4 pt-5'>
                        <div>
                            <h2 className='font-bold text-center'>Billing Address</h2>
                            <div className='text-center'>
                                <form onSubmit={handleCheckout}>
                                    <div className="p-2 justify-between">
                                        <label htmlFor="email" className="text-zinc-600 m-2">Email</label> <br />
                                        <input
                                            id="email"
                                            type="email"
                                            className="p-2 border border-zinc-600 rounded-md hover:border-violet-500 focus:outline-green-500"
                                            onChange={e => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="p-2 justify-between">
                                        <label htmlFor="address" className="text-zinc-600 m-2">Address</label> <br />
                                        <input
                                            id="address"
                                            type="address"
                                            className="p-2 border border-zinc-600 rounded-md hover:border-violet-500 focus:outline-green-500"
                                            onChange={e => setShippingAddress(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <hr />
                                    <div>
                                        <h2 className='font-bold'>Payment</h2>
                                        <input type="radio" className="htmlForm-check-input " id="credit" name="payment-method" defaultChecked/>
                                            <label htmlFor="credit" className="htmlForm-check-label pr-4">Credit Card</label>

                                        <input type="radio" className="htmlForm-check-input" id="debit" name="payment-method"/>
                                            <label htmlFor="debit" className="htmlForm-check-label">Debit Card</label>
                                    </div>
                                    <div className='pt-4 pb-4'>
                                        <div className='grid grid-cols-2 gap-4'>
                                            <div>
                                                <label htmlFor="card-name">Name on card</label>
                                                <input type="text" className="p-2 border border-zinc-600 rounded-md hover:border-violet-500 focus:outline-green-500" id="card-name" placeholder='Mark Spence' required/>
                                            </div>
                                            <div>
                                                <label htmlFor="card-no">Card Number</label>
                                                <input type="text" className="p-2 border border-zinc-600 rounded-md hover:border-violet-500 focus:outline-green-500" id="card-no" placeholder='2342 2333 2321' required />
                                            </div>
                                            <div>
                                                <label htmlFor="expiration">Expire Date</label>
                                                <input type="text" className="p-2 border border-zinc-600 rounded-md hover:border-violet-500 focus:outline-green-500" id="card-name" placeholder='eg. 5/24' required/>
                                            </div>
                                            <div>
                                                <label htmlFor="ccv-no">Security Number</label>
                                                <input type="text" className="p-2 border border-zinc-600 rounded-md hover:border-violet-500 focus:outline-green-500" id="sec-no" placeholder='eg. 332' required/>
                                            </div>
                                        </div>
                                    </div>


                                    <div className='text-center'>
                                    <button type="submit" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Place Order</button>
                                    </div>

                                </form>
                            </div>
                             
                        </div>
                        <div>
                            <h2 className='font-bold text-center'>Selected Products</h2>
                            <div>
                                    {myOrders.map((cart, index) => (
                                        <div className='border-solid border-2 border-gray-100 rounded-md mb-4 ' key={index}>
                                          <span className='text-green-600 pl-2'><a href={`/store/${cart?.product_id?.store_id?.name}`}>{cart?.product_id?.store_id?.name}</a></span>
                                          <div className="grid grid-cols-4 gap-5">
                                            <div className='... p-3'>
                                              <img src={`${imageSrc}/images/${cart?.product_id?.images[0]?.name}` || sample1} alt="" className='w-24' />
                                            </div>
                                            <div className='... text-xl'>
                                              <p>{cart?.product_id?.name}</p>
                                            </div>
                                            <div className='... text-xl text-green-600'>
                                              <p>$ <span>{cart?.amount}</span></p>
                                            </div>
                                            <div className='... text-xl'>
                                              <p>Quantity: <span>
                                              {cart?.quantity}</span></p>
                                            </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckoutPage