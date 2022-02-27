import React, { useEffect, useState } from 'react';
import { Navbar, BookCardItem, Unfinished } from '../../components';
import { getSearchedBooks } from '../../api/api';

export default function Search() {
  const [searchedData, setSearchedData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const link = window.location.pathname;
    const srch = link.substring(8);
    loadSearchBooks(srch);
  }, []);

  async function loadSearchBooks(srch) {
    try {
      const bookArray = await getSearchedBooks(srch);
      setSearchedData(bookArray);
    } catch (e) {
      setSearchedData(null);
    } finally {
      setLoading(false);
    }
  }

  console.log(searchedData);

  return (
    <div>
      <Navbar />
    </div>
  );
}
