import React, {useEffect, useState} from 'react';
import Navbar from '../components/Navbar';
import MyOrderLists from '../components/MyOrderLists';
import Api from '../Api';


const OrdersPage = () => {
   const [orders, setOrders] = useState([])
   const [ordersCopy, setOrdersCopy] = useState([])
   const imageSrc = import.meta.env.VITE_MODE == 'Production' ? import.meta.env.VITE_API_BASE_URL_PROD : import.meta.env.VITE_API_BASE_URL_DEV
    const token = localStorage.getItem('token').replace(/"/g, '')

   useEffect(()=>{
    getOrders()
   }, [])

   const getOrders = async()=>{
      Api.get('/api/user/my-orders',{
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
      .then((response)=>{
        setOrders(response.data)
        setOrdersCopy(response.data)
      })
   }

   const filterOrders = (data)=>{
      const filteredOrders = orders.filter((order)=>{ return order.status === data})
      setOrdersCopy(filteredOrders)

   }

  return (
    <div className='container mx-auto pt-3'>
      <Navbar />
      <div>
        <h1 className='text-xl'>My Orders</h1>
      </div>
      <div className='text-center pt-4 mb-4'>
        <ul className='flex gap-4'>
          <li><a href="#" className='hover:text-green-600' onClick={()=> getOrders()}>All</a></li>
          <li><a href="#" className='hover:text-green-600'  onClick={()=> filterOrders('shipped')}>To Ship</a></li>
          <li><a href="#" className='hover:text-green-600' onClick={()=> filterOrders('completed')}>Received</a></li>
          <li><a href="#" className='hover:text-green-600' onClick={()=> filterOrders('cancelled')}>Cancelled</a></li>
        </ul>
        <hr />
      </div>
      <div>
        <MyOrderLists orders={ordersCopy}/>
      </div>

    </div>
  )
}

export default OrdersPage