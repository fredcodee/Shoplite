import { useEffect, useState } from "react";
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
import Store from './pages/Store';
import MyProducts from './pages/MyProducts';
import StoreOrders from './pages/StoreOrders';
import AllReviews  from './pages/AllReviews';
import MyStore from './pages/MyStore';
import Api from './Api';

function App() {
  // const [user, setUser] = useState(null);

  // useEffect(() => {
  //   getUser();
  // }, []);

  // const getUser = async() => {
  //   Api.get('/auth/login/success',
  //   {
  //     headers:{
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //       "Access-Control-Allow-Credentials": true,
  //     }
  //   },
  //   {
  //     credentials:"include"
  //   })
  //     .then((response) => {
  //       console.log(response)
  //       if (response.status === 200) return response.json();
  //       throw new Error("authentication has been failed!");
  //     })
  //     .then((resObject) => {
  //       setUser(resObject.user);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };


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
            <Route path="/dashboard" element={<StoreDashboard/>} />
            <Route path="/:storeName" element = {<Store/>} />
            <Route path="/my-products" element = {<MyProducts />} />
            <Route path = "/store/orders" element ={<StoreOrders/>}/>
            <Route path ="/all-reviews" element ={<AllReviews/>}/>
            <Route path ="/my-store/profile" element={<MyStore/>} />

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
