import React from 'react';
import PropTypes from 'prop-types';
import styles from './BookCardItem.module.css';
import { deleteBook } from '../../../api/api';
import { checkIfUserExists } from '../../../api/login';

const { cardWrapper, cardTitle, cardAuthor } = styles;

export default function BookCardItem(props) {
  const isLogged = checkIfUserExists();

  // eslint-disable-next-line no-unused-vars
  const { firstName, lastName, notes, quant, title, bookNumber, docID } = props;
  return (
    <div className={cardWrapper}>
      <p className={cardTitle}>{title}</p>
      <p className={cardAuthor}>
        {firstName} {lastName}
      </p>
      {isLogged ? <button onClick={() => deleteBook(docID)}></button> : null}
    </div>
  );
}

BookCardItem.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  notes: PropTypes.arrayOf(PropTypes.string),
  quant: PropTypes.number,
  title: PropTypes.string,
  bookNumber: PropTypes.number,
  docID: PropTypes.string.isRequired,
};

BookCardItem.defaultProps = {
  firstName: '',
  lastName: '',
  title: 'Nenhum livro encontrado',
};
