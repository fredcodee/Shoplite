import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Api from '../Api';

const CreateProduct = () => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [stock, setStock] = useState('')
    const [price, setPrice] = useState('')
    const [selectedImages, setSelectedImages] = useState([]);
    const storeId = `${localStorage.getItem('store')}`
    const token = localStorage.getItem('token').replace(/"/g, '');
    const [error, setError] = useState(null)
    const history = useNavigate();

    const handleImageChange = (e) => {
        const files = e.target.files;
        const imageArray = Array.from(files);

        // Update the state with the selected images
        setSelectedImages([...selectedImages, ...imageArray]);
    }

    const handleImageRemove = (index) => {
        const updatedImages = [...selectedImages];
        updatedImages.splice(index, 1);

        // Update the state with the removed image
        setSelectedImages(updatedImages);
    }

    const handleFormSubmit = async (e) => {
        try {
            e.preventDefault()
            const data = {
                name: name,
                description: description,
                stock: stock,
                price: price,
                storeId: storeId
            }

            await Api.post('/api/add-product', data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(async (response) => {
                    if (response.status == 200) {
                        const formData = new FormData();
                        for (const image of selectedImages){
                            formData.append('images', image);
                        }
                        formData.append('productId', response.data._id)
                        await Api.post('/api/store/products/images/upload', formData,
                        {
                            headers:{
                                'Content-Type': 'multipart/form-data'
                            }
                        })
                        .then((response) => {
                            if (response.status === 200) history('/my-products')
                          })
                    }
                })

        } catch (error) {
            setError(error.response.data.message)
        }
    }


    return (
        <div>
            <Navbar />
            <div className='text-center'>
            {error && <div className='text-red-500 pb-2'><p>{error}</p></div>}
                <h1 className='font-bold'>Add New Product</h1>

                <div>
                    <form onSubmit={handleFormSubmit}>
                        <div className="p-2">
                            <label htmlFor="name" className="text-zinc-600 m-2 ">Product Name</label> <br />
                            <input
                                id="name"
                                type="text"
                                className="p-2 border border-zinc-600 rounded-md hover:border-violet-500 focus:outline-green-500"
                                onChange={e => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="p-2 ">
                            <label htmlFor="info" className="text-zinc-600 m-2">Product Description</label> <br />
                            <textarea
                                onChange={e => setDescription(e.target.value)}
                                id="info"
                                rows="3"
                                className="w-96 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                                required>
                            </textarea>
                        </div>
                        <div className='pb-3'>
                            <label htmlFor="Stock" className="text-zinc-600 m-2">
                                Stock
                            </label>
                            <input
                                onChange={e => setStock(e.target.value)}
                                type="number"
                                id="Stock"
                                className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm" placeholder="Current Stock"
                                 required />
                        </div>
                        <div className='pb-3'>
                            <label htmlFor="Price" className="text-zinc-600 m-2">
                                Price
                            </label>
                            <input
                                onChange={e => setPrice(e.target.value)}
                                type="number"
                                id="Price"
                                className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm" placeholder="Product Price"
                                 required />
                        </div>
                        <div>
                            <input
                                type="file"
                                accept=".jpg, .jpeg, .png"
                                multiple
                                onChange={handleImageChange}
                                required
                                className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                            />
                            <div className="container mx-auto flex justify-center">
                                {selectedImages.map((image, index) => (
                                    <div key={index} className="d-inline-block m-2 pb-3">
                                        <img src={URL.createObjectURL(image)} alt={`Image ${index}`} className="h-40 w-52" />
                                        <button onClick={() => handleImageRemove(index)} className='text-red-900 hover:text-red-600'>Remove</button>
                                    </div>
                                ))}
                            </div>

                        </div>
                        <div className='text-center pt-4'>
                            <button type="submit" className="text-white text-xl bg-green-500 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg  px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Add</button>
                        </div>
                    </form>
                </div>
            </div>


        </div>

    )
}

export default CreateProduct