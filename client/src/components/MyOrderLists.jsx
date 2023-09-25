import React from 'react'
import sample1 from '../assets/images/sample1.png';

const MyOrderLists = () => {
  return (
    <div>
         <div className='border-solid border-2 border-gray-100 rounded-md mb-4 '>
                        <label htmlFor="option1">
                            <input type="checkbox" id="option1" name="options[]" value="Option 1" />
                             <span className='text-green-600 pl-2'><a href="#">Store Name</a></span>

                            <div className="grid grid-cols-4 gap-5">
                                <div className='... p-3'>
                                <img src={sample1} alt="" className='w-24' />
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
                                
                            </div>
                        </label><br />

                    </div>

                    <div className='border-solid border-2 border-gray-100 rounded-md mb-4 '>
                        <label htmlFor="option1">
                            <input type="checkbox" id="option1" name="options[]" value="Option 1" />
                             <span className='text-green-600 pl-2'><a href="#">Store Name</a></span>

                            <div className="grid grid-cols-4 gap-5">
                                <div className='... p-3'>
                                <img src={sample1} alt="" className='w-24' />
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
                                
                            </div>
                        </label><br />

                    </div>
    </div>
  )
}

export default MyOrderLists