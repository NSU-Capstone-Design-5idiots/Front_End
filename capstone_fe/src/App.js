import React, { useState } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import Mainpage from './pages/Mainpage';
import Register from './pages/Register';
import Login from './pages/Login';
import Donation from './pages/Donation';
import FindId from './pages/FindId';
import Agreepage from './pages/Agreepage';
import Rank from './pages/Rank';
import Don_commu from './pages/Don_commu'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Mainpage/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>   
        <Route path='/donation' element={<Donation/>}/> 
        <Route path='/findid' element={<FindId/>}/>
        <Route path='/agreepage' element={<Agreepage/>}/>
        <Route path='/rank' element={<Rank/>}/>
        <Route path='/don_commu' element={<Don_commu/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
