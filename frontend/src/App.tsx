import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import UpdatePrice from './pages/updatePrice';

function App() {
  return (
    <main className='main-container'>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Home />} />
        <Route path='/update-price' element={<UpdatePrice />} />
      </Routes>
    </main>
  );
}

export default App;
