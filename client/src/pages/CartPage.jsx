import React from 'react';
import Navbar from '../components/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import sample1 from '../assets/images/sample1.png';

const CartPage = () => {
  return (
    <div className='container mx-auto pt-3'>
      <Navbar />
      <div>
        <div className="grid grid-cols-3 gap-5">
          <div className="col-span-2">
            <div className='pt-3'>
              <form>
                    <a  href="#" className='float-right'> <span><FontAwesomeIcon icon={faTrashCan} style={{color: "#bf3d1d",}}  className='pr-2'/></span>DELETE ALL</a>
                    <label htmlFor="all">
                        <input type="checkbox" id="all" name="options[]" value="all"/>
                        <span className='pl-2'>SELECT ALL (16 ITEM(S))</span>
                        
                    </label><br />

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
                                    <p>Quantity <span><input type="number" id="numberRange" name="numberRange" min="1" max="10" className='bg-gray-50 border border-gray-300' /></span></p>
                                </div>
                                
                            </div>
                        </label><br />

                    </div>

                    <div className='border-solid border-2 border-gray-100 rounded-md mb-4'>
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
                                    <p>Quantity <span><input type="number" id="numberRange" name="numberRange" min="1" max="10" className='bg-gray-50 border border-gray-300' /></span></p>
                                </div>
                                
                            </div>
                        </label><br />

                    </div>

                    <div className='border-solid border-2 border-gray-100 rounded-md mb-4'>
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
                                    <p>Quantity <span><input type="number" id="numberRange" name="numberRange" min="1" max="10" className='bg-gray-50 border border-gray-300' /></span></p>
                                </div>
                                
                            </div>
                        </label><br />

                    </div>

                    {/* <input type="submit" value="Submit" /> */}
              </form>
            </div>
          </div>
          <div className="p-4 border-solid border-2 border-gray-100 rounded-md mt-4">
            <h1 className='text-center text-2xl font-bold'>Order Summary</h1>
            <div>
              <div className='text-xl'>
                <p>Total Items: 18</p>
                <p>Shipping Fee: $<span>199.00</span></p>
                <hr />
              </div>
              <p className='text-2xl font-bold'>Subtotal: $<span>2,009.00</span></p>
              <div className='pt-4 text-center'>
                <button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover-bg-green-700 dark:focus:ring-green-800">PROCEED TO CHECKOUT</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
