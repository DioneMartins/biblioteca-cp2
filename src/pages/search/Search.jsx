import React, { useEffect, useState } from 'react';
import { Navbar, BookCardItem, Footer } from '../../components';
import { getSearchedBooks } from '../../api/api';
import { useLocation } from 'react-router-dom';
import styles from './Search.module.css';

const { searchBookWrapper, searchBookWarning, searchBookParagraph, searchLoader } = styles;
export default function Search() {
  const [searchedData, setSearchedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const link = useLocation();
  useEffect(() => {
    const firstLink = link.pathname.substring(8);
    var srch = firstLink.replace('%20', ' ');
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
      if (bookArray.length !== 0) setSearchedData(bookArray);
      else setSearchedData(null);
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
        <div className={searchBookWarning}>
          <p className={searchBookParagraph}>
            A web biblioteca ainda não tem acesso ao acervo completo.
          </p>
          <p className={searchBookParagraph}>
            Livros que não estão ainda aqui podem estar disponíveis na biblioteca.
          </p>
        </div>
        {loading && (
          <div className={searchLoader}>
            <p>Carregando...</p>
            <p>Pode demorar alguns segundos...</p>
          </div>
        )}
        {searchedData &&
          searchedData.map((item, index) => {
            const book = item.data();
            return (
              <BookCardItem
                key={book.title}
                firstName={book.afn}
                lastName={book.aln}
                notes={book.notes}
                quant={book.quant}
                title={book.title}
                bookNumber={index}
                docID={item.id}
              />
            );
          })}
        {!loading && !searchedData && <BookCardItem />}
      </div>
      <Footer />
    </div>
  );
}
