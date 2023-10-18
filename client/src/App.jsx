import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from "../src/pages/HomePage"
import LoginPage from "../src/pages/LoginPage"
import RegisterPage from "../src/pages/RegisterPage"
import ViewPage from "../src/pages/ViewPage"
import ErrorPage from "../src/pages/ErrorPage"
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import OrdersPage from './pages/OrdersPage';
import CreateStore from './pages/CreateStore';
import StoreDashboard from './pages/StoreDashboard';
import Store from './pages/Store';
import MyProducts from './pages/MyProducts';
import StoreOrders from './pages/StoreOrders';
import AllReviews from './pages/AllReviews';
import MyStore from './pages/MyStore';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Api from './Api';

function App() {
  const [user, setUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);


  // useEffect(() => {
  //   console.log(import.meta.env.VITE_GOOGLE_CLIENT_ID)
  // }, []);

  // const checkAuth = async () => {
  //   await Api.get('http://localhost:8070/auth/check-authentication', {
  //     withCredentials: true,
  //   })
  //     .then((response) => {
  //       setAuthenticated(true);
  //       setUser(response.user)
  //     })
  //     .catch((err) => {
  //       setAuthenticated(false)
  //       console.log(err)
  //     })
  // }


  return (
    <>
     <GoogleOAuthProvider clientId={`${import.meta.env.VITE_GOOGLE_CLIENT_ID}`}>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/:storeName" element={<Store />} />
            <Route path="/my-products" element={<MyProducts />} />
            <Route path="/error" element={<ErrorPage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/cart" element={authenticated ? <CartPage /> : <Navigate to="/login" />} />
            <Route path="/orders" element={authenticated ? <OrdersPage /> : <Navigate to="/login" />} />
            <Route path="/create-store" element={authenticated ? <CreateStore /> : <Navigate to="/login" />} />
            <Route path="/dashboard" element={authenticated ? <StoreDashboard /> : <Navigate to="/login" />} />
            <Route path="/store/orders" element={authenticated ? <StoreOrders /> : <Navigate to="/login" />} />
            <Route path="/all-reviews" element={authenticated ? <AllReviews /> : <Navigate to="/login" />} />
            <Route path="/my-store/profile" element={authenticated ? <MyStore /> : <Navigate to="/login" />} />
            <Route path="/homepage" element={authenticated ? <ViewPage /> : <Navigate to="/login" /> } />
          </Routes>
      </BrowserRouter>
      </GoogleOAuthProvider>
    </>
  )
}

export default App
