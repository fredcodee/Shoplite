import React, { useEffect, useState } from 'react'
import DashboardNavBar from '../components/DashboardNavBar'
import Navbar from '../components/Navbar'
import Api from '../Api'

const StoreDashboard = () => {
    const [store, setStore] = useState(false)
    const [error, setError] = useState(null)
    const token = localStorage.getItem('token').replace(/"/g, '');

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
                    if (response.status == 200) setStore(response.data)
                })

        } catch (error) {
            setStore(false)
            setError(error.message)
        }
    }
    return (
        <div>
            {store ? 
           ( <React.Fragment>
            <DashboardNavBar />
            <div className='container mx-auto pt-3'>
                <div className='text-center pt-5'>
                    <h1>Your Store Summary</h1>
                    <div className="grid grid-cols-2 pt-3">
                        <div className='... p-3 border-solid border-2 border-gray-100 rounded-full'>
                            <p className='text-6xl'>$ <span>1,999.00</span></p>
                            <p>Total Revenue</p>
                        </div>
                        <div className='... p-3 border-2 border-gray-100 rounded-full'>
                            <p className='text-6xl'> <span>899</span></p>
                            <p>Orders Completed</p>
                        </div>
                    </div>
                </div>
                <div className='text-center pt-5'>
                    <div>
                        <h1>Today's sales</h1>
                        <div>
                            <p className='text-4xl'>$ <span>1,999.00</span></p>
                        </div>
                    </div>
                    <div className='pt-3'>
                        <h1>Number of orders</h1>
                        <div>
                            <p className='text-4xl'>10</p>
                        </div>
                    </div>
                </div>
                <hr />
                <div className='text-center pt-5'>
                    <div>
                        <h1>This Week </h1>
                        <div>
                            <p className='text-4xl'>$ <span>4,000.08</span></p>
                        </div>
                    </div>
                    <div className='pt-3'>
                        <h1>Number of orders</h1>
                        <div>
                            <p className='text-4xl'>29</p>
                        </div>
                    </div>
                </div>
            </div>
           </React.Fragment>
            ):
            (
                <div>
                    <Navbar/>
                    <div className='text-center pt-4'>
                        <h1 className='font-bold text-lg'>Grow your business and Sell Any Digital Product</h1>
                        <p>No registration fees</p>
                        <div className='pt-4'>
                            <a href='/create-store' type="button" className="text-white text-xl bg-green-500 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg  px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Create Your Online Store</a>
                        </div>
                    </div>

                </div>
            )
            }

        </div>
    )
}

export default StoreDashboard