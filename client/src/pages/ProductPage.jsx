import React from 'react'
import Navbar from '../components/Navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import sample1 from '../assets/images/sample1.png'

const ProductPage = () => {
    const { id } = useParams();
    return (
        <div className='container mx-auto pt-3'>
            <Navbar />
            <div>
                <p> <span> <a href="#"  className='text-green-600'>Store name</a></span> - product name</p>
            </div>

            <div className='grid grid-cols-2 gap-4 pb-5 border-solid border-2 border-grey-100  rounded-md'>
                <div className="... p-4">
                    <img src={sample1} alt="" />
                </div>
                <div className="...">
                    <h3 className='font-bold text-lg'>Product title</h3>
                    <p><FontAwesomeIcon icon={faStar} style={{ color: "#ecc969", }} /><span>4.5/5   </span><a href="#" className='text-red-600 pl-2'>100 ratings ...</a></p>
                    <h1 className='text-green-600 text-2xl pt-5 pb-4'>$ <span>10.88</span></h1>
                    <hr />
                    <div className='pt-4'>
                        <label for="numberRange" className='text-xl'>Quantity </label>
                        <input type="number" id="numberRange" name="numberRange" min="1" max="10" className='bg-gray-50 border border-gray-300' />
                        <div className='pt-4'>
                        <button type="button" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Order Now</button>
                        <button type="button" class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900">Add to Cart</button>
                        </div>
                    </div>

                    <div>
                        <small>Sold by <span><a href="#" className='text-green-600 pr-2'>Store Name</a></span></small>
                        <small><FontAwesomeIcon icon={faStar} style={{ color: "#ecc969", }} />4.5/5  </small>
                    </div>
                </div>
            </div>

            <div className='border-solid border-2 border-grey-100 mt-5 p-4 rounded-md'>
                <h3 className='font-bold text-lg'>Product details of  Product title</h3>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe hic, suscipit culpa debitis veniam, nihil totam autem commodi, dolor magnam sint. Minus, optio labore! Harum quaerat repudiandae repellendus quas nostrum?
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur exercitationem quam iste neque esse tenetur incidunt perspiciatis quas? Consequuntur explicabo esse qui numquam necessitatibus ipsam beatae nesciunt, illum at quae?
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nobis quas facilis maiores blanditiis est quae numquam ullam, eum cum dignissimos magni saepe? In doloremque repudiandae numquam voluptas obcaecati nihil eaque!
                </p>

            </div>

            <div className='border-solid border-2 border-grey-100 mt-5 p-4 rounded-md'>
                <h3 className='font-bold text-lg'>Ratings & Reviews of Product title</h3>
                <h1><FontAwesomeIcon icon={faStar} style={{ color: "#ecc969", }} className='text-4xl'/><span className='text-4xl'>4.5/5 </span></h1>
                <small>100 ratings</small>
                <hr />
                <div>
                    <div className='pt-3 pb-3'>
                        <h3 className='font-bold'>Product Reviews</h3>
                        <hr />
                    </div>
                    <div className='p-3'>
                        <p className='float-right'>20 Aug 2023</p>
                        <h1><FontAwesomeIcon icon={faStar} style={{ color: "#ecc969", }} /><span>4.5/5 </span></h1>
                        <p className='text-green-600'>Joh***@***.com</p>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iusto illo earum harum maiores consectetur odit cumque deleniti eius cum. Odit at placeat molestiae id architecto ex est laudantium itaque debitis!</p>
                        <hr />
                    </div>
                    <div className='p-3'>
                        <p className='float-right'>20 Aug 2023</p>
                        <h1><FontAwesomeIcon icon={faStar} style={{ color: "#ecc969", }} /><span>3.5/5 </span></h1>
                        <p className='text-green-600'>Joh***@***.com</p>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iusto illo earum harum maiores consectetur odit cumque deleniti eius cum. Odit at placeat molestiae id architecto ex est laudantium itaque debitis!</p>
                        <hr />
                    </div>
                    <div className='p-3'>
                        <p className='float-right'>20 Aug 2023</p>
                        <h1><FontAwesomeIcon icon={faStar} style={{ color: "#ecc969", }} /><span>1.5/5 </span></h1>
                        <p className='text-green-600'>Joh***@***.com</p>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iusto illo earum harum maiores consectetur odit cumque deleniti eius cum. Odit at placeat molestiae id architecto ex est laudantium itaque debitis!</p>
                        <hr />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ProductPage
