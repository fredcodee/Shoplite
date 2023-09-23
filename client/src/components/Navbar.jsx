import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShop} from '@fortawesome/free-solid-svg-icons'

const Navbar = () => {
  return (
    <div>
      <div className="relative border-b">
        <nav className="container mx-auto">
          <div className="max-w-4xl h-12 nd:h-16 mx-auto flex justify-between align-stretch px-4">
            <div id="logo" className="flex items-center text-green-600 font-bold">
              <a href="/homepage"><FontAwesomeIcon icon={faShop} style={{ color: "green", }} className='pr-2' /> ShopLite</a>
            </div>
            <ul id="nav-links" className="hidden md:block absolute md:relative md:flex md:align-stretch md:justify-end right-0 top-0 mt-10 md:mt-0 py-2 md:py-0 w-48 md:w-auto h-auto z-10 bg-white shadow md:shadow-none">
                <li>
                <a className="w-full h-full flex md:items-center pl-6 md:pl-4 pr-4 py-1 hover:bg-gray-100" href="#">Cart</a>
              </li>
              <li>
                <a className="w-full h-full flex md:items-center pl-6 md:pl-4 pr-4 py-1 hover:bg-gray-100" href="#">My Orders</a>
              </li>
              <li>
                <a className="w-full h-full text-green-600 flex md:items-center pl-6 md:pl-4 pr-4 py-1 hover:bg-gray-100" href="#">Store Dashboard</a>
              </li>
              <li>
                <a className="w-full h-full flex md:items-center pl-6 md:pl-4 pr-4 py-1 hover:bg-gray-100 text-red-500" href="#">Logout</a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  )
}

export default Navbar
