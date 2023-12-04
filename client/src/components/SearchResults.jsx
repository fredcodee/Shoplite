import React from 'react'
import sample1 from '../assets/images/sample1.png'

const SearchPage = ({items}) => {
  const imageSrc = import.meta.env.VITE_MODE == 'Production' ? import.meta.env.VITE_API_BASE_URL_PROD : import.meta.env.VITE_API_BASE_URL_DEV

  return (
    <div>
      <div className='pt-4'>
        <hr />
        <h1>Search Name</h1>
        <p>{items.products ? items.products.length : '0'} products found for {items.word ? items.word : 'nothing'} </p>
        <hr />
      </div>

      <div className='pb-4'>
        <h1>Products</h1>
        <div className='grid grid-cols-4 gap-4 pt-5'>
          {items.products && items.products.length > 0 ? 
          (items.products.map((product, index)=>(
            <div className="... border-solid border-2 border-grey-100 p-3 rounded-md hover:text-green-600"  key={index}>
            <a href={`/product/${product._id}`}>
              <img src={`${imageSrc}/images/${product?.images[0]?.name}` || sample1}alt="" className='h-40 w-52' />
              <div>
                <h3 className='font-bold text-lg'>{product.name}</h3>
                <p>$ <span>{product.price}</span></p>
              </div>
            </a>
          </div>
          )))
          : 
            <div> no Products Found</div>
          }
        </div>
      </div>
      <hr />
      <div className='pb-4'>
        <h1>Stores</h1>
        <div className='grid grid-cols-4 gap-4 pt-5'>
          {items.stores && items.stores.length > 0 ? 
          (items.stores.map((store, index)=>(
            <div className="... border-solid border-2 border-grey-100 p-3 rounded-md hover:text-green-600" key={index}>
            <a href={`/store/${store.name}`}>
              <img src={`${imageSrc}/images/${store.image?.name}`|| sample1 } alt="" className='h-40 w-52' />
              <div>
                <h3 className='font-bold text-lg'>{store.name}</h3>
              </div>
            </a>
          </div>
          ))) : 
            <div> no Stores Found</div>}
        </div>
      </div>
      <hr />
    </div>
  )
}

export default SearchPage