import React, { useEffect, useState } from 'react';
import { Navbar, BookCardItem } from '../../components';
import { getSearchedBooks } from '../../api/api';
import { useLocation } from 'react-router-dom';
import styles from './Search.module.css';

const { searchBookWrapper } = styles;
export default function Search() {
  const [searchedData, setSearchedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noBook, setNoBook] = useState(false);
  const [showBooks, setShowBooks] = useState(false);

  const link = useLocation();
  useEffect(() => {
    const srch = link.pathname.substring(8);
    loadSearchBooks(srch);
  }, [link]);

  async function loadSearchBooks(srch) {
    try {
      const bookArray = await getSearchedBooks(srch);
      bookArray ? setShowBooks(true) : setNoBook(true);
      setSearchedData(bookArray);
    } catch (e) {
      setSearchedData(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Navbar />
      <div className={searchBookWrapper}>
        {loading && 'Carregando'}
        {showBooks &&
          searchedData.map(({ afn, aln, notes, quant, title }, index) => {
            return (
              <BookCardItem
                key={title}
                firstName={afn}
                lastName={aln}
                notes={notes}
                quant={quant}
                title={title}
                bookNumber={index}
              />
            );
          })}
        {noBook && <BookCardItem />}
      </div>
    </div>
  );
}
