import React from 'react';
import Navbar from '../components/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CreateStore = () => {
  return (
    <div>
        <Navbar/>
        <div className="flex justify-center items-center min-h-screen bg-slate-200">
        <div className="bg-white w-auto rounded-xl p-8 ">
          <h1 className="text-zinc-600 text-xl p-4 text-center">Create Your Store</h1>

          <form className="flex flex-col">
          <div className="p-2 flex justify-between">
              <label for="name" className="text-zinc-600 m-2">Store Name</label>
              <input
                id="name"
                type="text"
                className="p-2 border border-zinc-600 rounded-md hover:border-violet-500 focus:outline-green-500"
              />
            </div>
            <div className="p-2 flex justify-between">
              <label for="info" className="text-zinc-600 m-2">Store Description</label>
              <input
                id="info"
                type="text"
                className="p-2 border border-zinc-600 rounded-md hover:border-violet-500 focus:outline-green-500"
              />
            </div>
            <div className="p-2 flex justify-between">
                <label for="logo" className="text-zinc-600 m-2">Logo</label>
                <input
                    id="logo"
                    type="file"
                    className="p-2 border border-zinc-600 rounded-md hover:border-violet-500 focus:outline-green-500"
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