import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from "../src/pages/HomePage"
import LoginPage from "../src/pages/LoginPage"
import RegisterPage from "../src/pages/RegisterPage"
import ViewPage from "../src/pages/ViewPage"
import ErrorPage from "../src/pages/ErrorPage"

function App() {

  return (
    <>
      <BrowserRouter>
        {/* <AuthProvider> */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/error" element={<ErrorPage />} />
            {/* <Route element={<PrivateRoute> <WorkSpace /></PrivateRoute>} path="/user-workspace" /> */}
          </Routes>
        {/* </AuthProvider> */}
      </BrowserRouter>
    </>
  )
}

export default App
