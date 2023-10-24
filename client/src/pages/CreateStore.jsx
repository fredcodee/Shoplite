import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Api from '../Api';

const CreateStore = () => {
  const history = useNavigate();
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [selectedImage, setSelectedImage] = useState(null);
  const [error, setError] = useState(null)
  const token = localStorage.getItem('token').replace(/"/g, '');

  useEffect(() => {
    getUserStore()
  }, [])

  const getUserStore = async () => {
    await Api.get('/api/user/my-store', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        if (response.status == 200) history('/homepage')
      })
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setSelectedImage(file);
    }
  };

  const handleFormSubmit = async (e) => {
    try {
      e.preventDefault();
      const data = {
        name: name,
        bio: description
      }
      await Api.post('/api/create-store', data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(async(response) => {
          if (response.status == 200 || response.status == 201 && selectedImage) {
            const formData = new FormData();
            formData.append('image', selectedImage);
            formData.append('storeId', response.data._id)
            await Api.post('/api/user/store/profile/image/upload', formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            })
              .then((response) => {
                if (response.status === 200) history('/dashboard')
              })
          }
        })

    } catch (error) {
      console.log(error)
      setError(error.data.message)
    }
  }

  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-slate-200">
        <div className="bg-white w-auto rounded-xl p-8 ">
          <h1 className="text-zinc-600 text-xl p-4 text-center">Create Your Store</h1>

          <form className="flex flex-col" onSubmit={handleFormSubmit}>
            <div className="p-2 flex justify-between">
              <label for="name" className="text-zinc-600 m-2">Store Name</label>
              <input
                id="name"
                type="text"
                className="p-2 border border-zinc-600 rounded-md hover:border-violet-500 focus:outline-green-500"
                onChange={e => setName(e.target.value)}
                required
              />
            </div>
            <div className="p-2 flex justify-between">
              <label for="info" className="text-zinc-600 m-2">Store Description</label>
              <input
                id="info"
                type="text"
                className="p-2 border border-zinc-600 rounded-md hover:border-violet-500 focus:outline-green-500"
                onChange={e => setDescription(e.target.value)}
              />
            </div>
            <div className="p-2 flex justify-between">
              <label for="logo" className="text-zinc-600 m-2">Logo</label>
              <input
                id="logo"
                type="file"
                accept=".jpg, .jpeg, .png"
                onChange={handleImageChange}
                className="p-2 border border-zinc-600 rounded-md hover:border-violet-500 focus:outline-green-500"
                required
              />
            </div>

            <div className="mt-2 text-center p-3">
              <button type="submit" className="text-white w-36 p-2 border rounded-full bg-green-500  active:bg-violet-600 hover:bg-violet-400 focus:bg-violet-300 focus:ring"> Create</button>
            </div>
          </form>
          <hr />
        </div>
      </div>
    </div>
  )
}

export default CreateStore