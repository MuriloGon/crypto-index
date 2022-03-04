import React from 'react';
import {Routes, Route} from 'react-router-dom';

function App() {
  return (
   <Routes>
     <Route path='/login' element={<h1>Login</h1>} />
     <Route path='/' element={<h1>Root</h1>} />
   </Routes>
  );
}

export default App;
