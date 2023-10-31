import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import DashboardNavBar from '../components/DashboardNavBar'
import sample9 from '../assets/images/sample9.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar,faPenToSquare,faTrash } from '@fortawesome/free-solid-svg-icons'
import PopUp from '../components/PopUp';
import Api from '../Api'

const MyStore = () => {
    const [showPopUpForEditProfile, setShowPopUpForEditProfile] =useState(false)
    const [showPopUpForDeleteStore, setShowPopUpForDeleteStore] = useState(false);
    const [store, setStore] = useState([])
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [selectedImage, setSelectedImage] = useState(null);
    const storeId = `${localStorage.getItem('store')}`
    const token = localStorage.getItem('token').replace(/"/g, '');
    const [error, setError] = useState(null)
    const imageSrc = import.meta.env.VITE_MODE == 'Production' ? import.meta.env.VITE_API_BASE_URL_PROD : import.meta.env.VITE_API_BASE_URL_DEV
    const history = useNavigate();

    const togglePopUpForEditProfile= () =>{
        setShowPopUpForEditProfile(!showPopUpForEditProfile)
    }

    const togglePopUpForDeleteStore = ()=>{
        setShowPopUpForDeleteStore(!showPopUpForDeleteStore)
    }
    useEffect(()=>{
        getUserStore()
    },[])

    const getUserStore = async () => {
        await Api.get('/api/user/my-store', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
          .then((response) => {
            if (response.status == 200) {
                setStore(response.data)
                setName(response.data.name)
                setDescription(response.data.bio)
            }
          })
      }

    const deleteStore = async()=>{
        try {
            await Api.post('/api/store/delete', {storeId:storeId},{
                headers:{
                    Authorization: token
                }
            })
            .then((response)=>{
                if(response.status == 200) history('/hompage')
            })
        } catch (error) {
            setError(error.response.data.message);
        }
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
    
        if (file) {
          setSelectedImage(file);
        }
      };


    const editStore = async()=>{
        try {
            const data = {
                storeId:storeId,
                name:name,
                bio:description
            }
            await Api.post('/api/user/store/profile/edit', data,{
                headers:{
                    Authorization:token
                }
            })
            .then(async(response)=>{
                if(response.status ==200){
                    if(selectedImage){
                        const formData = new FormData();
                        formData.append('image', selectedImage);
                        formData.append('storeId', response.data._id)
                        await Api.post('/api/user/store/profile/image/upload', formData, {
                            headers: {
                              'Content-Type': 'multipart/form-data'
                            }
                          })
                            .then(() => {
                                getUserStore()
                                togglePopUpForEditProfile()
                            })
                    }
                    getUserStore()
                    togglePopUpForEditProfile()
                }
            })
        } catch (error) {
            setError(error.response.data.message);
        }
    }
    

    

    return (
        <div className='container mx-auto pt-3'>
            <DashboardNavBar />
            <div className=' text-xl'>
            {error && <div className='text-red-500 p-2 text-center'><p>{error}</p></div>}
                <h1 className='pt-4'>My Profile Details</h1>
                <hr />
                {store.user_id ? (
                    <>
                        <p>Name: <span>{store.user_id.name}</span></p>
                        <p>Email: <span>{store.user_id.email}</span></p>
                    </>
                ) : (
                    <p>User data not available</p>
                )}
            </div>
            <div className='p-3 rounded-md flex gap-5 justify-center items-center'>
                <img src={`${imageSrc}/images/${store.image?.name}`|| sample9 } alt="image" className='w-28' />
                <div>
                    <h1 className='font-bold text-xl'>{store.name}</h1>
                    <div className='w-72'>
                        <p>{store.bio}</p>

                    </div>
                    <p><FontAwesomeIcon icon={faStar} style={{ color: "#ecc969", }} /><span>{store.rating}</span>/5</p>
                </div>
            </div>
            <div className='flex gap-4 justify-center items-cente'>
                    <p className='hover:cursor-pointer text-2xl' onClick={togglePopUpForEditProfile}><FontAwesomeIcon icon={faPenToSquare} style={{color: "#dd843c",}}/></p>
                    <p className='hover:cursor-pointer text-2xl' onClick={togglePopUpForDeleteStore}><FontAwesomeIcon icon={faTrash} style={{color: "#cb2a2a",}} /></p>
              </div>
              {/* for popup for editing profile*/}
              {showPopUpForEditProfile&& <PopUp
                content={<>
                    <div id="staticModal" data-modal-backdrop="static" tabIndex="-1" aria-hidden="true" className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                        <div className="relative w-full max-w-2xl max-h-full" style={{ margin: "auto" }}>
                            <div className="relative bg-gray-300 rounded-lg shadow dark:bg-gray-700">

                                <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                       Edit product
                                    </h3>
                                    <button type="button" onClick={togglePopUpForEditProfile} className="text-white bg-transparent hover:bg-white hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="staticModal">
                                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                        </svg>
                                        <span className="sr-only">Close modal</span>
                                    </button>
                                </div>
                                <div className="p-6 space-y-6">
                                    <div>
                                        <div className='pb-3'>
                                            <label htmlFor="storeName">
                                                Store Name
                                            </label>
                                            <input type="text"  
                                                value={name} onChange={(e) => setName(e.target.value)} 
                                                id="storeName" 
                                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"/>
                                        </div>
                                        <div className='pb-3'> 
                                            <label htmlFor="StoreDescription">
                                            Store Description
                                            </label>
                                            <textarea 
                                                id="StoreDescription" 
                                                rows="3" 
                                                value={description} onChange={(e) => setDescription(e.target.value)} 
                                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm" ></textarea>
                                            </div>
                                        <div className='pb-3'>
                                            <label htmlFor="Picture">
                                                Change Profile Picture
                                            </label>
                                            <input 
                                                type="file" 
                                                id="Picture"
                                                accept=".jpg, .jpeg, .png"
                                                onChange={handleImageChange}
                                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"/>
                                        </div>
                                        <div className='text-center'>
                                          <button type="button" onClick={editStore} className="text-white text-xl bg-green-500 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg  px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Save Changes</button>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>}
            />}
            {/* delete product */}
      {showPopUpForDeleteStore && <PopUp
        content={<>
          <div id="staticModal" data-modal-backdrop="static" tabIndex="-1" aria-hidden="true" className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div className="relative w-full max-w-2xl max-h-full" style={{ margin: "auto" }}>
              <div className="relative bg-gray-200  rounded-lg shadow dark:bg-gray-700">

                <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600 text-center">
                  <h3 className="text-xl font-semibold text-red-700 dark:text-white">
                    Delete your Store <br />
                  </h3>
                  <button type="button" onClick={togglePopUpForDeleteStore} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="staticModal">
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
                  <button type="button" onClick={deleteStore} className="text-white bg-red-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Yes</button>
                  <button type="button" onClick={togglePopUpForDeleteStore} className="text-white bg-green-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">No</button>
                </div>
              </div>
            </div>
          </div>
        </>}
      />}
        </div>
    )
}

export default MyStore