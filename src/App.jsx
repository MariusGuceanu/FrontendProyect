import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomeLayout from './layouts/homeLayout';

function App() {
  return (
    <Routes>
      {/* Define la ruta para el HomeLayout */}
      <Route path="*" element={<HomeLayout />} />
    </Routes>
  );
}

export default App;