import React from 'react'
import DashboardNavBar from '../components/DashboardNavBar'
import StoreOrdersLists from '../components/StoreOrdersLists'

const StoreOrders = () => {
    return (
        <div className='container mx-auto pt-3'>
            <DashboardNavBar />
            <h3 className='font-bold pt-2'>My Store Orders</h3>
            <div className='text-center pt-4 mb-4'>
                <ul className='flex gap-4'>
                    <li><a href="#" className='hover:text-green-600'>Orders</a></li>
                    <li><a href="#" className='hover:text-green-600'>To Ship</a></li>
                    <li><a href="#" className='hover:text-green-600'>Completed</a></li>
                    <li><a href="#" className='hover:text-green-600'>Cancelled</a></li>
                </ul>
                <hr />
            </div>
            <StoreOrdersLists/>

            
        </div>
    )
}

export default StoreOrders