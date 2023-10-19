import React, { createContext, useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import Api from '../Api';

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem('token')
      ? JSON.parse(localStorage.getItem('token'))
      : null
  );
  const [user, setUser] = useState(() =>
    localStorage.getItem('token')
      ? jwt_decode(localStorage.getItem('token'))
      : null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const history = useNavigate();

  const loginUser = async(email, password) => {
    try {
      const response = await Api.post('/auth/login', {
        email,
        password,
      });

      const data = await response.data;
      if (response.status === 200) {
        setAuthTokens(data.token);
        setUser(jwt_decode(data.token));
        localStorage.setItem('token', JSON.stringify(data.token));
        const user  = await getUser()
        localStorage.setItem('user', JSON.stringify(user));
        history('/homepage')

      }
    } catch (error) {
        setError(error.response.data.message);
    }
  };


  const getUser = async () => {
    try {
        const response = await Api.get(`/api/user/profile`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token').replace(/"/g, '')}`,
            },
        });
        const data = await response.data;
        return data
    } catch (error) {
      history('/login');
    }
};



  const registerUser = async (name, email, password) => {
    try {
      const data ={
        name: name,
        email: email,
        password: password
      }
      const response = await Api.post('/auth/register', data);

      if (response.status === 201 || response.status === 200) {
        history('/login');
      } else {
        const data = await response.data;
        setError(data.message);
      }
    } catch (error) {
        setError(error.response.data.message);
    }
  };


  const logoutUser = async() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user')
    history('/login');
  };

  const contextData = {
    user,
    error,
    loginUser,
    logoutUser,
    registerUser,
  };

  useEffect(() => {
    if (authTokens) {
      setUser(jwt_decode(authTokens));
    }
    setLoading(false);
  }, [authTokens, loading]);

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
