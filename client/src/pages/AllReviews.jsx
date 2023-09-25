import React from 'react'
import DashboardNavBar from '../components/DashboardNavBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

const AllReviews = () => {
    return (
        <div className='container mx-auto pt-3'>
            <DashboardNavBar />
            <div>
                <h3 className='font-bold pt-3'>All Reviews</h3>
            </div>
            <div>
                <hr />
                <div className='p-3 hover:bg-slate-200'>
                    <a href="#">
                        <p className='float-right'>20 Aug 2023</p>
                        <h1><FontAwesomeIcon icon={faStar} style={{ color: "#ecc969", }} /><span>4.5/5 </span></h1>
                        <p className='text-green-600'>Joh***@***.com</p>
                        <small className='text-blue-400'>on Product name</small>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iusto illo earum harum maiores consectetur odit cumque deleniti eius cum. Odit at placeat molestiae id architecto ex est laudantium itaque debitis!</p>
                    </a>
                   <hr />
                </div>
                <div className='p-3 hover:bg-slate-200'>
                    <a href="#">
                        <p className='float-right'>20 Aug 2023</p>
                        <h1><FontAwesomeIcon icon={faStar} style={{ color: "#ecc969", }} /><span>4.5/5 </span></h1>
                        <p className='text-green-600'>Joh***@***.com</p>
                        <small className='text-blue-400'>on Product name</small>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iusto illo earum harum maiores consectetur odit cumque deleniti eius cum. Odit at placeat molestiae id architecto ex est laudantium itaque debitis!</p>
                    </a>
                   <hr />
                </div>
                <div className='p-3 hover:bg-slate-200'>
                    <a href="#">
                        <p className='float-right'>20 Aug 2023</p>
                        <h1><FontAwesomeIcon icon={faStar} style={{ color: "#ecc969", }} /><span>4.5/5 </span></h1>
                        <p className='text-green-600'>Joh***@***.com</p>
                        <small className='text-blue-400'>on Product name</small>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iusto illo earum harum maiores consectetur odit cumque deleniti eius cum. Odit at placeat molestiae id architecto ex est laudantium itaque debitis!</p>
                    </a>
                   <hr />
                </div>
                <div className='p-3 hover:bg-slate-200'>
                    <a href="#">
                        <p className='float-right'>20 Aug 2023</p>
                        <h1><FontAwesomeIcon icon={faStar} style={{ color: "#ecc969", }} /><span>4.5/5 </span></h1>
                        <p className='text-green-600'>Joh***@***.com</p>
                        <small className='text-blue-400'>on Product name</small>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iusto illo earum harum maiores consectetur odit cumque deleniti eius cum. Odit at placeat molestiae id architecto ex est laudantium itaque debitis!</p>
                    </a>
                   <hr />
                </div>

            </div>
        </div>
    )
}

export default AllReviews