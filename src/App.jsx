import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomeLayout from './layouts/homeLayout';
import Login from './layouts/login';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home/*" element={<HomeLayout />} />
    </Routes>
  );
}

export default App;