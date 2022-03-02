import React from 'react';
import PropTypes from 'prop-types';
import styles from './HomeCardItem.module.css';

const { cardWrapper, cardTitle, imageWrapper } = styles;

export default function HomeCardItem({ title, image, link, priority, index }) {
  return (
    <div className={cardWrapper}>
      <div className={imageWrapper}>
        <img src={image} alt="icone" />
      </div>
      <p className={cardTitle}>{title}</p>
      <p className={link}></p>
    </div>
  );
}

HomeCardItem.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  priority: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};
