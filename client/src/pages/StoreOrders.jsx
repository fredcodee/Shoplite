import React, { useEffect, useState } from 'react'
import DashboardNavBar from '../components/DashboardNavBar'
import StoreOrdersLists from '../components/StoreOrdersLists'
import Api from '../Api'

const StoreOrders = () => {
    const storeId = `${localStorage.getItem('store')}`
    const token = localStorage.getItem('token').replace(/"/g, '');
    const [orders, setOrders] = useState([])
    const [ordersCopy, setOrdersCopy] = useState([])
    const [selectedFilter, setSelectedFilter] = useState('all');


    useEffect(() => {
        getOrders()
    }, [])


    const getOrders = async () => {
        await Api.post('/api/store/all/orders', { storeId: storeId }, {
            headers: {
                Authorization: token
            }
        })
            .then((response) => {
                setOrders(response.data)
                setOrdersCopy(response.data)
                setSelectedFilter('all')
            })
    }

    const filterOrders = (data) => {
        const filteredOrders = orders.filter((order) => { return order.status === data })
        setOrdersCopy(filteredOrders)
        setSelectedFilter(data)
    }


    return (
        <div className='container mx-auto pt-3'>
            <DashboardNavBar />
            <h3 className='font-bold pt-2'>My Store Orders</h3>
            <div className='text-center pt-4 mb-4'>
                <ul className='flex gap-4'>
                    <li><a href="#" className={`hover:text-green-600 ${selectedFilter === 'all' ? 'text-orange-800' : ''}`} onClick={() => getOrders()}>All</a></li>
                    <li><a href="#" className={`hover:text-green-600 ${selectedFilter === 'shipped' ? 'text-orange-800' : ''}`} onClick={() => filterOrders('shipped')}>To Ship</a></li>
                    <li><a href="#" className={`hover:text-green-600 ${selectedFilter === 'completed' ? 'text-orange-800' : ''}`} onClick={() => filterOrders('completed')}>Received</a></li>
                    <li><a href="#" className={`hover:text-green-600 ${selectedFilter === 'cancelled' ? 'text-orange-800' : ''}`} onClick={() => filterOrders('cancelled')}>Cancelled</a></li>
                </ul>
                <hr />
            </div>
            <StoreOrdersLists ordersList={ordersCopy} />


        </div>
    )
}

export default StoreOrders