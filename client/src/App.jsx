import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from "../src/pages/HomePage"
import LoginPage from "../src/pages/LoginPage"
import RegisterPage from "../src/pages/RegisterPage"
import ViewPage from "../src/pages/ViewPage"
import ErrorPage from "../src/pages/ErrorPage"
import ProductPage from './pages/ProductPage';
import CartPage  from './pages/CartPage';
import OrdersPage from './pages/OrdersPage';
import CreateStore from './pages/CreateStore';
import StoreDashboard from './pages/StoreDashboard';

function App() {

  return (
    <>
      <BrowserRouter>
        {/* <AuthProvider> */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/product/:id" element={<ProductPage/>} />
            <Route path = "/cart" element={<CartPage/>} />
            <Route path ="/orders" element={<OrdersPage/>} />
            <Route path ="/create-store" element={<CreateStore/>} />
            <Route path="/store-dashboard" element={<StoreDashboard/>} />

            <Route path="/error" element={<ErrorPage />} />
            {/* <Route element={<PrivateRoute> <WorkSpace /></PrivateRoute>} path="/user-workspace" /> */}
            <Route path = "/homepage" element={<ViewPage />} />
          </Routes>
        {/* </AuthProvider> */}
      </BrowserRouter>
    </>
  )
}

export default App
