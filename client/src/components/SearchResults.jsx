import React from 'react'
import sample1 from '../assets/images/sample1.png'
import sample2 from '../assets/images/sample2.jpg'

const SearchPage = () => {
  return (
    <div>
      <div className='pt-4'>
        <hr />
        <h1>Search Name</h1>
        <p>1055 items found for "Search Name"</p>
        <hr />
      </div>

      <div className='pb-4'>
        <h1>Products</h1>
        <div className='grid grid-cols-4 gap-4 pt-5'>
          <div className="... border-solid border-2 border-grey-100 p-3 rounded-md hover:text-green-600">
            <a href="/product/11">
              <img src={sample1} alt="" className='h-40 w-52' />
              <div>
                <h3 className='font-bold text-lg'>Title</h3>
                <p>$ <span>122</span></p>
              </div>
            </a>
          </div>
          <div className="... border-solid border-2 border-grey-100 p-3 rounded-md hover:text-green-600">
            <a href="">
              <img src={sample2} alt="" className='h-40 w-52' />
              <div>
                <h3 className='font-bold text-lg'>Title</h3>
                <p>$ <span>122</span></p>
              </div>
            </a>
          </div>
        </div>
      </div>
      <hr />
      <div className='pb-4'>
        <h1>Stores</h1>
        <div className='grid grid-cols-4 gap-4 pt-5'>
          <div className="... border-solid border-2 border-grey-100 p-3 rounded-md hover:text-green-600">
            <a href="/product/11">
              <img src={sample1} alt="" className='h-40 w-52' />
              <div>
                <h3 className='font-bold text-lg'>Title</h3>
                <p>$ <span>122</span></p>
              </div>
            </a>
          </div>
          <div className="... border-solid border-2 border-grey-100 p-3 rounded-md hover:text-green-600">
            <a href="">
              <img src={sample2} alt="" className='h-40 w-52' />
              <div>
                <h3 className='font-bold text-lg'>Title</h3>
                <p>$ <span>122</span></p>
              </div>
            </a>
          </div>
        </div>
      </div>
      <hr />
    </div>
  )
}

export default SearchPage