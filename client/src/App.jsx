import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from './context/PrivateRoute';
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

function App() {
  return (
    <>
      <BrowserRouter>
      <AuthProvider>
      <GoogleOAuthProvider clientId={`${import.meta.env.VITE_GOOGLE_CLIENT_ID}`}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/:storeName" element={<Store />} />
            <Route path="/my-products" element={<MyProducts />} />
            <Route path="/error" element={<ErrorPage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/cart" element={<PrivateRoute>  <CartPage /> </PrivateRoute> } />
            <Route path="/orders" element={<PrivateRoute>  <OrdersPage /> </PrivateRoute> } />
            <Route path="/create-store" element={<PrivateRoute> <CreateStore /> </PrivateRoute> }/>
            <Route path="/dashboard" element={<PrivateRoute>  <StoreDashboard /> </PrivateRoute> } />
            <Route path="/store/orders" element={<PrivateRoute>  <StoreOrders /> </PrivateRoute> } />
            <Route path="/all-reviews" element={<PrivateRoute>  <AllReviews /> </PrivateRoute> } />
            <Route path="/my-store/profile" element={<PrivateRoute>  <MyStore /> </PrivateRoute> } />
            <Route path="/homepage" element={<PrivateRoute> <ViewPage /></PrivateRoute> } />
          </Routes>
          </GoogleOAuthProvider>
        </AuthProvider>
      </BrowserRouter>
      {/*  */}
    </>
  )
}

export default App
