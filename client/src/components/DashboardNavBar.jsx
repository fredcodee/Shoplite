import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import Api from '../Api';

const StoreDashboard = () => {
    const token = localStorage.getItem('token').replace(/"/g, '');
    const [storeName, setStoreName] = useState('')

    useEffect(() => {
        getUserStore()
    }, [])

    const getUserStore = async () => {
        try {
            await Api.get('/api/user/my-store', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((response) => {
                    if (response.status == 200) setStoreName(response.data.name)
                })

        } catch (error) {
            setStoreName('')
        }
    }

    return (
        <div>
            <Navbar />
            <div>
                <div className='border-2 border-gray-100 rounded-md p-4 text-lg flex justify-center items-center'>
                    <a href="/my-products" className='hover:text-green-600 p-2'>My Products</a> <br />
                    <a href="/store/orders" className='hover:text-green-600  p-2'>Orders</a> <br />
                    <a href="/all-reviews" className='hover:text-green-600 p-2'> Reviews</a> <br />
                    <a href="/my-store/profile" className='hover:text-green-600 p-2'>My store Profile</a> <br />
                    <a href={`/store/${storeName}`}className='hover:text-green-600 p-2'> View My store</a>
                </div>
            </div>
        </div>
    )
}

export default StoreDashboard