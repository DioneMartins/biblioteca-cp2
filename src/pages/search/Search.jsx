import React, { useEffect, useState } from 'react';
import { Navbar, BookCardItem } from '../../components';
import { getSearchedBooks } from '../../api/api';
import { useLocation } from 'react-router-dom';
import styles from './Search.module.css';

const { searchBookWrapper, searchLoader } = styles;
export default function Search() {
  const [searchedData, setSearchedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const link = useLocation();
  useEffect(() => {
    const srch = link.pathname.substring(8);
    goToLoading();
    loadSearchBooks(srch);
  }, [link]);

  function goToLoading() {
    setLoading(true);
    setSearchedData([]);
  }

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

  return (
    <div>
      <Navbar />
      <div className={searchBookWrapper}>
        {loading && (
          <div className={searchLoader}>
            <p>Carregando...</p>
            <p>Pode demorar alguns segundos...</p>
          </div>
        )}
        {searchedData &&
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
        {!loading && !searchedData && <BookCardItem />}
      </div>
    </div>
  );
}
