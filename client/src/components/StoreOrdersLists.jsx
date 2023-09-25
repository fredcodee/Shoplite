import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser,faTruckFast } from '@fortawesome/free-solid-svg-icons'

const StoreOrdersLists = () => {
  return (
    <div>
        <div>
                <div className='border-solid border-2 border-gray-100 rounded-md mb-2 '>
                    <div className="grid grid-cols-5 gap-5">
                        <div className='... text-xl'>
                            <p><span><FontAwesomeIcon icon={faUser} style={{color: "#3e7a24",}} className='pr-2' /></span>jason@kskk.com ordered</p>
                        </div>
                        <div className='... text-xl'>
                            <p>product name</p>
                        </div>
                        <div className='... text-xl text-green-600'>
                            <p>$ <span>800.00</span></p>
                        </div>
                        <div className='... text-xl'>
                            <p>Quantity <span> 5</span></p>
                        </div>
                        <div>
                            <span><FontAwesomeIcon icon={faTruckFast} style={{color: "#31511f",}} /></span>
                            <select name="" id="">
                                <option value="">Update status</option>
                                <option value=""> Shipping</option>
                                <option value=""> Completed</option>
                                <option value=""> Cancelled</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className='border-solid border-2 border-gray-100 rounded-md mb-2 '>
                    <div className="grid grid-cols-5 gap-5">
                        <div className='... text-xl'>
                            <p><span><FontAwesomeIcon icon={faUser} style={{color: "#3e7a24",}} className='pr-2' /></span>jason@kskk.com ordered</p>
                        </div>
                        <div className='... text-xl'>
                            <p>product name</p>
                        </div>
                        <div className='... text-xl text-green-600'>
                            <p>$ <span>800.00</span></p>
                        </div>
                        <div className='... text-xl'>
                            <p>Quantity <span> 1</span></p>
                        </div>
                        <div>
                            <span><FontAwesomeIcon icon={faTruckFast} style={{color: "#31511f",}} /></span>
                            <select name="" id="">
                                <option value="">Update status</option>
                                <option value=""> Shipping</option>
                                <option value=""> Completed</option>
                                <option value=""> Cancelled</option>
                            </select>
                        </div>
                    </div>
                </div>

            </div>
    </div>
  )
}

export default StoreOrdersLists