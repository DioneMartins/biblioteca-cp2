import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import BookCard from '../components/bookCards/BookCard';
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <BookCard />
    </BrowserRouter>
  );
};

export default App;
