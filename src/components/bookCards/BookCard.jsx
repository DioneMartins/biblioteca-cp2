import React, { useState, useEffect } from 'react';
import { getBookList } from '../../api/api';
import BookCardItem from './bookCardItem/BookCardItem';
import styles from './BookCard.module.css';

const { bookCardWrapper } = styles;

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
      {isLoading
        ? 'Carregando'
        : bookListData.map(({ afn, aln, notes, quant, title }, index) => {
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
    </div>
  );
}
