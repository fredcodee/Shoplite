import React from 'react'
import Navbar from '../components/Navbar';

const StoreDashboard = () => {
    return (
        <div>
            <Navbar />
            <div>
                <div className='border-2 border-gray-100 rounded-md p-4 text-lg flex justify-center items-center'>
                    <a href="/my-products" className='hover:text-green-600 p-2'>My Products</a> <br />
                    <a href="/store/orders" className='hover:text-green-600  p-2'>Orders</a> <br />
                    <a href="#" className='hover:text-green-600 p-2'> Reviews</a> <br />
                    <a href="#" className='hover:text-green-600 p-2'>My store Profile</a> <br />
                    <a href="/mystore" className='hover:text-green-600 p-2'> View My store</a>
                </div>
            </div>
        </div>
    )
}

export default StoreDashboard