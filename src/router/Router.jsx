import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home, List, Login, SearchPage, NewBookPage } from '../pages';

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/lista" element={<List />} />
      <Route path="/login" element={<Login />} />
      <Route path="/novolivro" element={<NewBookPage />} />
      <Route path="/search/:search" element={<SearchPage />} />
      <Route path="/search/" element={<SearchPage />} />
    </Routes>
  );
}
