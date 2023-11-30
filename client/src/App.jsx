import React, { useState } from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from './context/PrivateRoute';
import StoreOwner from './context/StoreOwner';
import HomePage from "../src/pages/HomePage"
import LoginPage from "../src/pages/LoginPage"
import RegisterPage from "../src/pages/RegisterPage"
import ViewPage from "../src/pages/ViewPage"
import ErrorPage from "../src/pages/ErrorPage"
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import OrdersPage from './pages/OrdersPage';
import CreateStore from './pages/CreateStore';
import CreateProduct from './pages/CreateProduct';
import StoreDashboard from './pages/StoreDashboard';
import Store from './pages/Store';
import MyProducts from './pages/MyProducts';
import StoreOrders from './pages/StoreOrders';
import AllReviews from './pages/AllReviews';
import MyStore from './pages/MyStore';
import { GoogleOAuthProvider } from '@react-oauth/google';
import CheckoutPage from './pages/CheckoutPage';

function App() {
  const [orderObjects, setOrderObjects] =useState(null);
  return (
    <>
      <BrowserRouter>
      <AuthProvider>
      <GoogleOAuthProvider clientId={`${import.meta.env.VITE_GOOGLE_CLIENT_ID}`}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/store/:storeName" element={<Store />} />
            <Route path="/my-products" element={<MyProducts />} />
            <Route path="/error" element={<ErrorPage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/cart" element={<PrivateRoute>  <CartPage setOrderObjects={setOrderObjects} /></PrivateRoute> } />
            <Route path="/orders" element={<PrivateRoute>  <OrdersPage /> </PrivateRoute> } />
            <Route path="/create-store" element={<PrivateRoute> <CreateStore /> </PrivateRoute> }/>
            <Route path="/add/product" element = {<StoreOwner> <CreateProduct/> </StoreOwner>} />
            <Route path="/dashboard" element={<StoreOwner>  <StoreDashboard /> </StoreOwner> } />
            <Route path="/store/orders" element={<StoreOwner>  <StoreOrders /> </StoreOwner> } />
            <Route path="/all-reviews" element={<StoreOwner>  <AllReviews /> </StoreOwner> } />
            <Route path="/my-store/profile" element={<StoreOwner>  <MyStore /> </StoreOwner> } />
            <Route path="/homepage" element={<PrivateRoute> <ViewPage /></PrivateRoute> } />
            <Route path='/checkout' element={<PrivateRoute> <CheckoutPage orderObjects ={orderObjects} /></PrivateRoute> } />
          </Routes>
          </GoogleOAuthProvider>
        </AuthProvider>
      </BrowserRouter>
      {/*  */}
    </>
  )
}

export default App
