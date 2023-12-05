import React, {useEffect, useState} from 'react'
import Navbar from '../components/Navbar'
import SearchResults from '../components/SearchResults'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import sample1 from '../assets/images/sample1.png'
import sample9 from '../assets/images/sample9.jpg'
import Api from '../Api'


const ViewPage = () => {
  const [search, setSearch] = useState('')
  const [searchItems, setSearchItems] = useState([])
  const [classShow, setClassShow] =useState(false)
  const [products, setProducts] = useState([])
  const [stores, setStores] = useState([])
  const imageSrc = import.meta.env.VITE_MODE == 'Production' ? import.meta.env.VITE_API_BASE_URL_PROD : import.meta.env.VITE_API_BASE_URL_DEV

  useEffect(()=>{
    getFeatured()
  }, [])


  const getFeatured = async ()=>{
    await Api.get('/api/featured')
    .then((response)=>{
      setProducts(response.data.products)
      setStores(response.data.stores)
    })
  }
  

  const handleSearch = async (e) => {
    e.preventDefault()
    if (search != "") {


      await Api.post('/api/search', { search: search })
        .then((response) => {
          setSearchItems(response.data)
          setClassShow(true)
        })
    }
  }

  return (
    <div className='container mx-auto pt-3'>
      <Navbar />
      <div>
        {/*
        create your own store */}
        <div className='p-3'>
          <form onSubmit={handleSearch}>
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
              </div>
              <input type="search"  onChange={e => setSearch(e.target.value)} id="default-search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-green-500 focus:border-green-500 dark:bg-green-700 dark:border-green-600 dark:placeholder-green-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="Search Products, Stores..." required />
              <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-green-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
            </div>
          </form>

          {/* add condition to only show if data > 0 */}
          <div className={classShow ? " " : "hidden" }>
            <SearchResults items={searchItems}/>
          </div>
          
        </div>

        <div className='mb-5'>
          <h3 className='font-bold text-2xl'>
            Featured Products
          </h3>
          <div className='grid grid-cols-6 gap-4 pt-5'>
            {products.map((product, index)=>(
              <div className="... border-solid border-2 border-grey-100 p-3 rounded-md hover:text-green-600" key={index}>
                <a href={`/product/${product._id}`}>
                  <img src={`${imageSrc}/images/${product?.images[0]?.name}` || sample1} alt="" className='h-40 w-52' />
                  <div>
                    <h3 className='font-bold text-lg'>{product.name}</h3>
                    <p>$ <span>{product.price}</span></p>
                  </div>
                </a>
              </div>
            ))}
          </div>
          <div>

          </div>
        </div>

        <div className='pt-5'>
          <h3 className='font-bold text-2xl '>
            Featured Stores
          </h3>
          <div className='grid grid-cols-3 gap-4 pt-5'>
            { stores.map((store, index)=>(
              <div className="... border-solid border-2 border-grey-100 p-3 rounded-md hover:text-green-600" key={index}>
                <a href="#">
                  <img src={`${imageSrc}/images/${store.image?.name}`|| sample9 }  alt="" />
                  <h3 className='font-bold text-lg'>{store.name}</h3>
                  <p><FontAwesomeIcon icon={faStar} style={{ color: "#ecc969", }} /><span>{store.rating}/5</span></p>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewPage
