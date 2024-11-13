import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomeLayout from './layouts/homeLayout';

function App() {
  return (
    <Routes>
      {/* Defines the route to the HomeLayout */}
      <Route path="*" element={<HomeLayout />} />
    </Routes>
  );
}

export default App;