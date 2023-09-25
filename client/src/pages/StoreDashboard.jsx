import React from 'react'
import DashboardNavBar from '../components/DashboardNavBar'

const StoreDashboard = () => {
    return (
        <div>
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

        </div>
    )
}

export default StoreDashboard