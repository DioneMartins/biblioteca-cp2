import React, { useState, useEffect } from 'react';
import { getBookList } from '../../api/api';
import BookCardItem from './bookCardItem/BookCardItem';
import styles from './BookCard.module.css';

const { bookCardWrapper, bookCardLoader } = styles;

export default function BookCard() {
  const [bookListData, setBookListData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    loadBooks();
  }, []);

  async function loadBooks() {
    try {
      const bookArray = await getBookList();
      setBookListData(bookArray);
    } catch (e) {
      setBookListData(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={bookCardWrapper}>
      {isLoading ? (
        <div className={bookCardLoader}>
          <p>Carregando...</p>
          <p>Pode demorar alguns segundos...</p>
        </div>
      ) : (
        bookListData.map((item, index) => {
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
            />
          );
        })
      )}
    </div>
  );
}
