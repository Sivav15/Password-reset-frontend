import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './css/App.css';
import ForgetPassword from './js/ForgetPassword';
import Home from './js/Home';

import Login from './js/Login';

import Password from './js/Password';

import Register from './js/Register';
function App() {
  return (
    <div >


      <BrowserRouter>
      <Routes>
        
        <Route path = "/" element={<Login />}/>
        <Route path = "/register" element={<Register/>}/>
        <Route path = "home" element={<Home/>}/>
        <Route path = "/forgot-password" element={<ForgetPassword/>}/>
        <Route path = "/password/:id/:token" element={<Password/>}/>
        <Route path = "/password" element={<Password/>}/>
      
        


        
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App