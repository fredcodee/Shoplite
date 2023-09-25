import React from 'react'
import sample1 from '../assets/images/sample1.png'
import sample2 from '../assets/images/sample2.jpg'
import sample3 from '../assets/images/sample3.jpg'
import sample4 from '../assets/images/sample4.jpg'
import sample5 from '../assets/images/sample5.jpg'
import sample6 from '../assets/images/sample6.jpg'

const ProductLists = () => {
  return (
    <div>
        <div className='grid grid-cols-6 gap-4 pt-5'>
            <div className="... border-solid border-2 border-grey-100 p-3 rounded-md hover:text-green-600">
              <a href="/product/11">
              <img src={sample1} alt="" className='h-40 w-52'/>
              <div>
                <h3 className='font-bold text-lg'>Title</h3>
                <p>$ <span>122</span></p>
              </div>
              </a>
            </div>
            <div className="... border-solid border-2 border-grey-100 p-3 rounded-md hover:text-green-600">
              <a href="">
              <img src={sample2} alt="" className='h-40 w-52'/>
              <div>
                <h3 className='font-bold text-lg'>Title</h3>
                <p>$ <span>122</span></p>
              </div>
              </a>
            </div>
            <div className="... border-solid border-2 border-grey-100 p-3 rounded-md hover:text-green-600">
              <a href="">
              <img src={sample3} alt="" className='h-40 w-52'/>
              <div>
                <h3 className='font-bold text-lg'>Title</h3>
                <p>$ <span>122</span></p>
              </div>
              </a>
            </div>
            <div className="... border-solid border-2 border-grey-100 p-3 rounded-md hover:text-green-600">
              <a href="">
              <img src={sample4} alt="" className='h-40 w-52'/>
              <div>
                <h3 className='font-bold text-lg'>Title</h3>
                <p>$ <span>122</span></p>
              </div>
              </a>
            </div>
            <div className="... border-solid border-2 border-grey-100 p-3 rounded-md hover:text-green-600">
              <a href="">
              <img src={sample5} alt=""  className='h-40 w-52'/>
              <div>
                <h3 className='font-bold text-lg'>Title</h3>
                <p>$ <span>122</span></p>
              </div>
              </a>
            </div>
            <div className="... border-solid border-2 border-grey-100 p-3 rounded-md hover:text-green-600">
              <a href="">
              <img src={sample6} alt="" className='h-40 w-52' />
              <div>
                <h3 className='font-bold text-lg'>Title</h3>
                <p>$ <span>122</span></p>
              </div>
              </a>
            </div>
          </div>
    </div>
  )
}

export default ProductLists