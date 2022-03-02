import React from 'react';
import PropTypes from 'prop-types';
import styles from './BookCardItem.module.css';
import { deleteBook } from '../../../api/api';

const { cardWrapper, cardTitle, cardAuthor } = styles;

export default function BookCardItem(props) {
  // eslint-disable-next-line no-unused-vars
  const { firstName, lastName, notes, quant, title, bookNumber, docID } = props;
  return (
    <div className={cardWrapper}>
      <p className={cardTitle}>{title}</p>
      <p className={cardAuthor}>
        {firstName} {lastName}
      </p>
      <button onClick={() => deleteBook(docID)}></button>
    </div>
  );
}

BookCardItem.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  notes: PropTypes.arrayOf(PropTypes.string),
  quant: PropTypes.number,
  title: PropTypes.string.isRequired,
  bookNumber: PropTypes.number,
  docID: PropTypes.string.isRequired,
};

BookCardItem.defaultProps = {
  firstName: '',
  lastName: '',
  title: 'Nenhum livro encontrado',
};
