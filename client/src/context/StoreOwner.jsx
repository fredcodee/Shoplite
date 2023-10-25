import React from 'react'
import { useContext, useEffect, useState } from 'react'
import AuthContext from './AuthContext'
import { Navigate } from 'react-router-dom'
import Api from '../Api'


const StoreOwner = ({children, ...rest})=>{
    const [authenticated, setAuthenticated] = useState(false)
    const [store, setStore] = useState(
      localStorage.getItem('store') ? true : false
    )
    const token = localStorage.getItem('token') || false
    let {user} = useContext(AuthContext)

    useEffect(()=>{
        checkToken(),
        getUserStore()
    },[])

    const checkToken = async()=>{
        try {
          await Api.get('/auth/check-token', {
            headers: {
              Authorization: `Bearer ${token.replace(/"/g, '')}`
            }
          })
          .then((response)=>{
              if(response.status == 200)  setAuthenticated(true) 
          })
        } catch (error) {
          setAuthenticated(false)
        }
      }

      const getUserStore = async () => {
        await Api.get('/api/user/my-store', {
          headers: {
            Authorization: `Bearer ${token.replace(/"/g, '')}`
          }
        })
          .then((response) => {
            if (response.status == 200) {
              setStore(true)
              localStorage.setItem('store', response.data._id)
            }
          })
      }

      if (!user && !authenticated && !store){
        return <Navigate to ="/homepage" />    
    } 

  return children
}

export default StoreOwner