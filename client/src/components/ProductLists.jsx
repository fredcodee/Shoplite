import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import Api from '../Api';
import PopUp from '../components/PopUp';
import sample3 from '../assets/images/sample3.jpg'

const ProductLists = () => {
  const [showPopUpForEditProduct, setShowPopUpForEditProduct] = useState(false)
  const [showPopUpForDeleteProduct, setShowPopUpForDeleteProduct] = useState(false);
  const storeId = `${localStorage.getItem('store')}`
  const token = localStorage.getItem('token').replace(/"/g, '');
  const [products, setProducts] = useState([])
  const [selectedProduct, setSelectedProduct] = useState([])
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [stock, setStock] = useState('')
  const [price, setPrice] = useState('')
  const [selectedImages, setSelectedImages] = useState([]);
  const [newImages, setNewImages] = useState([])
  const [owner, setOwner] = useState(false)
  const [error, setError] = useState(null)
  const imageSrc = import.meta.env.VITE_MODE == 'Production' ? import.meta.env.VITE_API_BASE_URL_PROD : import.meta.env.VITE_API_BASE_URL_DEV

  useEffect(() => {
    getProducts(),
      getUserStore()
  }, [])



  const togglePopUpForEditProduct = () => {
    setShowPopUpForEditProduct(!showPopUpForEditProduct)
  }

  const togglePopUpForDeleteProduct = () => {
    setShowPopUpForDeleteProduct(!showPopUpForDeleteProduct);
  }

  const getUserStore = async () => {
    await Api.get('/api/user/my-store', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        if (response.status == 200) {
          if (response.data._id == storeId) setOwner(true)
        }
      })
  }

  const getProducts = async () => {
    try {
      await Api.post('/api/store/all-products', { storeId: storeId }, {
        headers: {
          Authorization: token
        }
      })
        .then((response) => {
          if (response.status == 200) setProducts(response.data)
        })
    } catch (error) {
      setError(error.response.data.message)
    }
  }

  const deleteProduct = async () => {
    try {
      await Api.post('/api/remove-product', { productId: selectedProduct._id, storeId: storeId }, {
        headers: {
          Authorization: token
        }
      })
        .then(async (response) => {
          if (response.status == 200) {
            getProducts()
            togglePopUpForDeleteProduct()
            setSelectedProduct('')
          }
        })

    } catch (error) {
      setError(error.response.data.message);
    }
  }

  const getProductDetails = async (productId) => {
    try {
      await Api.post('api/store/product', { productId: productId })
        .then((response) => {
          if (response.status == 200) {
            setSelectedProduct(response.data)
            setName(response.data.name);
            setDescription(response.data.description);
            setPrice(response.data.price);
            setStock(response.data.stock);
            setSelectedImages(response.data.images);
          }
        })

    } catch (error) {
      setError(error.response.data.message)
    }
  }
  const editProduct = async () => {
    try {
      const data = {
        storeId: storeId,
        productId: selectedProduct._id,
        name: name || selectedProduct.name,
        description: description || selectedProduct.description,
        stock: parseInt(stock, 10) || selectedProduct.stock,
        price: parseInt(price, 10) || selectedProduct.price,
        images: selectedImages
      }
      await Api.post('/api/store/product/edit', data, {
        headers: {
          Authorization: token
        }
      })
        .then(async (response) => {
          if (response.status == 200) {
            if (newImages.length > 0) {
              //add new images
              const formData = new FormData();
              for (const image of newImages) {
                formData.append('images', image);
              }
              formData.append('productId', response.data._id)
              await Api.post('/api/store/products/images/upload', formData,
                {
                  headers: {
                    'Content-Type': 'multipart/form-data'
                  }
                })
                .then((response) => {
                  if (response.status === 200) {
                    getProducts()
                    togglePopUpForEditProduct()
                    setNewImages([])
                    setSelectedProduct([])
                  }
                })
            }
            getProducts()
            togglePopUpForEditProduct()
            setSelectedProduct('')
          }
        })
    } catch (error) {
      setError(error.message);
      setNewImages('')
      togglePopUpForEditProduct()
    }
  }

  const handleImageRemove = (index) => {
    const updatedImages = [...selectedImages];
    updatedImages.splice(index, 1);

    // Update the state with the removed image
    setSelectedImages(updatedImages);
  }

  const handleImageChange = (e) => {
    const files = e.target.files;
    const imageArray = Array.from(files);

    // Update the state with the selected images
    setNewImages([...newImages, ...imageArray]);
  }

  const handleImageRemoveFromNew = (index) => {
    const updatedImages = [...newImages];
    updatedImages.splice(index, 1);

    // Update the state with the removed image
    setNewImages(updatedImages);
  }



  return (
    <div>
      {error && <div className='text-red-500 p-2 text-center'><p>{error}</p></div>}
      <div className='grid grid-cols-6 gap-4 pt-5'>
        {products.length > 1 ? (
          (products.map((product, index) => (
            <div key={index} className="... border-solid border-2 border-grey-100 p-3 rounded-md hover:text-green-600">
              <a href={`/product/${product._id}`}>
                <img src={`${imageSrc}/images/${product.images[0].name}` || sample3} alt="" className='h-40 w-52' />
                <div>
                  <h3 className='font-bold text-lg'>{product.name}</h3>
                  <p>$ <span>{product.price}</span></p>
                </div>
              </a>
              {owner ? (<div className='flex gap-4'>
                <p className='hover:cursor-pointer hover:text-xl'
                  onClick={() => {
                    togglePopUpForEditProduct();
                    getProductDetails(product._id)
                  }}>
                  <FontAwesomeIcon icon={faPenToSquare} style={{ color: "#dd843c", }} /></p>
                <p className='hover:cursor-pointer hover:text-xl'
                  onClick={() => {
                    togglePopUpForDeleteProduct();
                    getProductDetails(product._id)
                  }}>
                  <FontAwesomeIcon icon={faTrash} style={{ color: "#cb2a2a", }} /></p>
              </div>) :
                (<div></div>)}

            </div>
          )))
        ) : (<div> <h1 className='text-center pt-6 text-cyan-800 text-lg'>No Products yet ...</h1></div>)}
      </div>

      {/* for popup for editing product*/}
      {showPopUpForEditProduct && <PopUp
        content={<>
          <div id="staticModal" data-modal-backdrop="static" tabIndex="-1" aria-hidden="true" className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div className="relative w-full max-w-2xl max-h-full" style={{ margin: "auto" }}>
              <div className="relative bg-gray-300 rounded-lg shadow dark:bg-gray-700">

                <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Edit product
                  </h3>
                  <button type="button" onClick={togglePopUpForEditProduct} className="text-white bg-transparent hover:bg-white hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="staticModal">
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                <div className="p-6 space-y-6">
                  <div>
                    <div className='pb-3'>
                      <label htmlFor="productName">
                        Product Name
                      </label>
                      <input type="text" value={name} onChange={(e) => setName(e.target.value)} id="productName" className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm" placeholder="Product Name eg. excel course" required />
                    </div>
                    <div className='pb-3'>
                      <label htmlFor="productDescription">
                        Product Description
                      </label>
                      <textarea id="productDescription"
                        value={description} onChange={(e) => setDescription(e.target.value)}
                        rows="3" className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm" placeholder="Product Description" required></textarea>
                    </div>
                    <div className='pb-3'>
                      <label htmlFor="Stock">
                        Stock
                      </label>
                      <input type="number"
                        value={stock} onChange={(e) => setStock(e.target.value)}
                        id="Stock" className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm" placeholder="Current Stock" required />
                    </div>
                    <div className='pb-3'>
                      <label htmlFor="Price">
                        Price
                      </label>
                      <input type="number"
                        value={price} onChange={(e) => setPrice(e.target.value)}
                        id="Price" className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm" placeholder="Product Price" required />
                    </div>
                    <div className='pb-3'>
                      <label htmlFor="Picture">
                        Picture
                      </label>
                      <input
                        type="file"
                        accept=".jpg, .jpeg, .png"
                        multiple
                        id="Picture"
                        onChange={handleImageChange}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm" />
                    </div>
                    <div className="container mx-auto flex justify-center">
                      {selectedImages.map((image, index) => (
                        <div key={index} className="d-inline-block m-2 pb-3">
                          <img src={`${imageSrc}/images/${image.name}` || URL.createObjectURL(image)} alt={`Image ${index}`} className="h-40 w-52" />
                          <button onClick={() => handleImageRemove(index)} className='text-red-900 hover:text-red-600'>Remove</button>
                        </div>
                      ))}
                      {newImages.map((image, index) => (
                        <div key={index} className="d-inline-block m-2 pb-3">
                          <img src={URL.createObjectURL(image)} alt={`Image ${index}`} className="h-40 w-52" />
                          <button onClick={() => handleImageRemoveFromNew(index)} className='text-red-900 hover:text-red-600'>Remove</button>
                        </div>
                      ))}

                    </div>
                    <div className='text-center'>
                      <button onClick={editProduct} className="text-white text-xl bg-green-500 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg  px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Save Changes</button>
                    </div>


                  </div>
                </div>
              </div>
            </div>
          </div>
        </>}
      />}

      {/* delete product */}
      {showPopUpForDeleteProduct && <PopUp
        content={<>
          <div id="staticModal" data-modal-backdrop="static" tabIndex="-1" aria-hidden="true" className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div className="relative w-full max-w-2xl max-h-full" style={{ margin: "auto" }}>
              <div className="relative bg-gray-200  rounded-lg shadow dark:bg-gray-700">

                <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600 text-center">
                  <h3 className="text-xl font-semibold text-red-700 dark:text-white">
                    Delete this Product <br />
                  </h3>
                  <button type="button" onClick={togglePopUpForDeleteProduct} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="staticModal">
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                <div className="pt-6 space-y-6 text-center font-bold ">
                  <div>
                    <p>Confirm Action ?</p>
                  </div>
                </div>
                <div style={{ textAlign: 'center', paddingTop: '1rem' }}>
                  <button type="button" onClick={deleteProduct} className="text-white bg-red-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Yes</button>
                  <button type="button" onClick={togglePopUpForDeleteProduct} className="text-white bg-green-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">No</button>
                </div>
              </div>
            </div>
          </div>
        </>}
      />}
    </div>
  )
}

export default ProductLists