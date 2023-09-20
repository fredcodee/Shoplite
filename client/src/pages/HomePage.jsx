import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShop, faPenToSquare, faSquarePlus } from '@fortawesome/free-solid-svg-icons'
import { faSellsy } from '@fortawesome/free-brands-svg-icons'
import hompageimg1 from '../assets/images/hompage1.jpg'

const HomePage = () => {
  return (
    <div>
      <div className='text-center p-4 bg-blue-500 text-white rounded-full'>
        <div className=' font-bold'>
          <h3 className='text-3xl'> <span><FontAwesomeIcon icon={faShop} style={{ color: "#f5f5f5", }} className='pr-2' /></span>ShopLite</h3>
        </div>
        <div className='text-6xl pt-4 mb-5'>
          <h1 className='font-bold'>Build your own ecommerce store <br /> Easy shopping from other realiable sellers</h1>
        </div>
        <div className='p-4'>
          <button type="button" class="text-white text-xl bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg  px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Start Now</button>
        </div>
        <div>
          <img src={hompageimg1} alt="image" className='h-96 rounded-full' style={{ margin: 'auto' }} />
        </div>
      </div>

      <div className='mt-5 text-center pb-5'>
        <div className='grid grid-cols-3 gap-4 pb-5'>
          <div className="...">
            <div className='text-5xl'>
              <FontAwesomeIcon icon={faPenToSquare} style={{ color: "#3e7dea", }} />
            </div>
            <div>
              <h3 className='font-bold'>① Choose & customise your store details</h3>
            </div>
            <p>
              Customize the details of your shop and get started. No design experience or programming skills required.
            </p>
          </div>
          <div className="...">
            <div className='text-5xl'>
              <FontAwesomeIcon icon={faSquarePlus} style={{ color: "#3e7dea", }} />
            </div>
            <div>
              <h3 className='font-bold'>② Add products</h3>
              <p>Add your products to the shop. List your eye-catching products with the best photos, price and descriptions.</p>
            </div>
          </div>
          <div className="...">
            <div className='text-5xl'>
              <FontAwesomeIcon icon={faSellsy} style={{ color: "#3e7dea", }} />
            </div>
            <div>
              <h3 className='font-bold'>③ Start selling</h3>
              <p>Set up payments and shipping, and start selling.</p>
            </div>
          </div>
        </div>
      </div>
      <hr className='pb-5' />

      <div className='text-center text-2xl p-4 mb-5'>
        <p>comes with an Instant Site builder, which allows you to get your products online without an existing website or coding knowledge,<br />Ease of Admin and Ease of Setup. In other words, if you just want to get to work selling online</p>
        <div className='mb-5'>
          <h1>Start selling online for free</h1>
          <div className='p-4'>
            <button type="button" class="text-white text-xl bg-blue-500 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg  px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Get Started</button>
          </div>
        </div>
      </div>

      <div className='float-right font-bold text-lg p-4'>
        <a href="https://thefredcode.com"><small>By Fredcode</small></a>
      </div>

    </div>
  )
}

export default HomePage
