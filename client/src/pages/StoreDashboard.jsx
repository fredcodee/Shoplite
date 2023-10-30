import React, { useEffect, useState } from 'react'
import DashboardNavBar from '../components/DashboardNavBar'
import Navbar from '../components/Navbar'
import Api from '../Api'

const StoreDashboard = () => {
    const [store, setStore] = useState(false)
    const [error, setError] = useState(null)
    const[storeSummary, setStoreSummary] = useState([])
    const token = localStorage.getItem('token').replace(/"/g, '');
    const storeId = `${localStorage.getItem('store')}`

    useEffect(() => {
        getUserStore(),
        dashboard()
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

    const dashboard = async()=>{
        try {
            await Api.post('/api/user/store/dashboard', {storeId:storeId},{
                headers:{
                    Authorization:token
                }
            })
            .then((response)=>{
                if(response.status == 200) setStoreSummary(response.data)
            })
        } catch (error) {
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
                            <p className='text-6xl'>$ <span>{storeSummary.total_revenue}</span></p>
                            <p>Total Revenue</p>
                        </div>
                        <div className='... p-3 border-2 border-gray-100 rounded-full'>
                            <p className='text-6xl'> <span>{storeSummary.total_orders_completed}</span></p>
                            <p>Orders Completed</p>
                        </div>
                    </div>
                </div>
                <div className='text-center pt-5'>
                    <div>
                        <h1>Today's sales</h1>
                        <div>
                            <p className='text-4xl'>$ <span>{storeSummary.today_sales}</span></p>
                        </div>
                    </div>
                    <div className='pt-3'>
                        <h1>Number of orders</h1>
                        <div>
                            <p className='text-4xl'>{storeSummary.today_orders}</p>
                        </div>
                    </div>
                </div>
                <hr />
                <div className='text-center pt-5'>
                    <div>
                        <h1>This Week </h1>
                        <div>
                            <p className='text-4xl'>$ <span>{storeSummary.week_sale}</span></p>
                        </div>
                    </div>
                    <div className='pt-3'>
                        <h1>Number of orders</h1>
                        <div>
                            <p className='text-4xl'>{storeSummary.week_orders}</p>
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