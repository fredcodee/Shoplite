import React from 'react'
import { useContext, useEffect, useState } from 'react'
import AuthContext from '../context/AuthContext'
import { Navigate } from 'react-router-dom'
import Api from '../Api'

const PrivateRoute = ({children, ...rest}) => {
    const [authenticated, setAuthenticated] = useState(false)
    const token = localStorage.getItem('authTokens') || false
    let {user} = useContext(AuthContext)


    useEffect(()=>{
      if(token){
        checkToken()
      }
    }, [])
    

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


    
    if (!user && !authenticated){
        return <Navigate to ="/login" />    
    } 

  return children
}

export default PrivateRoute