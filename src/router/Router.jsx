import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home, List, Login, SearchPage } from '../pages';

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/lista" element={<List />} />
      <Route path="/login" element={<Login />} />
      <Route path="/search/:search" element={<SearchPage />} />
    </Routes>
  );
}
