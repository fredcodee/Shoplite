import React from 'react'
import { Navigate } from 'react-router-dom'
import Api from '../Api'

const PrivateRoute = ({ children, ...rest }) => {
  const token = localStorage.getItem('token') || false

  const checkToken = async () => {
    try {
      await Api.get('/auth/check-token', {
        headers: {
          Authorization: `Bearer ${token.replace(/"/g, '')}`
        }
      })
        .then((response) => {
          if (response.status === 200) {
            return true
          } else {
            return false;
          }
        })
    } catch (error) {
      return false
    } 
  }



  if (!checkToken) {
    return <Navigate to="/login" />
  }

  return children
}



export default PrivateRoute