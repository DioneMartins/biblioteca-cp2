import React from 'react';
import PropTypes from 'prop-types';
import styles from './BookCardItem.module.css';

const { cardWrapper, cardTitle, cardAuthor } = styles;

export default function BookCardItem({ firstName, lastName, notes, quant, title, bookNumber }) {
  return (
    <div className={cardWrapper}>
      <p className={cardTitle}>{title}</p>
      <p className={cardAuthor}>
        {firstName} {lastName}
      </p>
    </div>
  );
}

BookCardItem.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  notes: PropTypes.arrayOf(PropTypes.string).isRequired,
  quant: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  bookNumber: PropTypes.number.isRequired,
};
