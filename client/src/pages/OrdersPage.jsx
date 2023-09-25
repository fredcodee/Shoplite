import React from 'react';
import Navbar from '../components/Navbar';
import MyOrderLists from '../components/MyOrderLists';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';


const OrdersPage = () => {
  return (
    <div className='container mx-auto pt-3'>
      <Navbar />
      <div>
        <h1 className='text-xl'>My Orders</h1>
      </div>
      <div className='text-center pt-4 mb-4'>
        <ul className='flex gap-4'>
          <li><a href="#" className='hover:text-green-600'>All</a></li>
          <li><a href="#" className='hover:text-green-600'>To Ship</a></li>
          <li><a href="#" className='hover:text-green-600'>Received</a></li>
          <li><a href="#" className='hover:text-green-600'>Cancelled</a></li>
        </ul>
        <hr />
      </div>
      <div>
        <MyOrderLists/>
      </div>

    </div>
  )
}

export default OrdersPage