import React, { useState, useEffect } from 'react';
import { getBookList } from '../../api/api';
import BookCardItem from './bookCardItem/BookCardItem';
import { PagHeader, PagFooter } from '..';
import styles from './BookCard.module.css';

const { bookCardWrapper, bookCardLoader } = styles;

export default function BookCard() {
  const [bookListData, setBookListData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [lastID, setLastID] = useState('');
  const [backID, setBackID] = useState(['']);
  const [op, setOp] = useState('forward');
  const [isLast, setIsLast] = useState(false);

  useEffect(() => {
    loadBooks();
  }, [page, perPage]);

  async function loadBooks() {
    const prevArray = backID;
    try {
      getBookList(perPage, lastID, op).then((bookArray) => {
        if (bookArray.length < perPage) setIsLast(true);
        else setIsLast(false);
        setBackID(prevArray);
        backID.push(bookArray[0]);
        setBookListData(bookArray);
        setLoading(false);
      });
    } catch (e) {
      setBookListData(null);
      setLoading(false);
    }
  }

  const changePage = (value) => {
    if (value === 'forward') {
      if (!isLast) {
        const lastViewed = bookListData.length - 1;
        setLastID(bookListData[lastViewed]);
        setLoading(true);
        setOp('forward');
        setPage(page + 1);
      }
    }
    if (value === 'back' && page > 1) {
      setLastID(backID[page - 1]);
      setLoading(true);
      setOp('back');
      setPage(page - 1);
    }
  };

  const changeAmount = (value) => {
    setPerPage(value);
  };

  return (
    <>
      <PagHeader changer={changeAmount} />
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
                docID={item.id}
              />
            );
          })
        )}
      </div>
      <PagFooter changer={changePage} />
    </>
  );
}
