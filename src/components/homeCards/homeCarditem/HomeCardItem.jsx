import React from 'react';
import PropTypes from 'prop-types';
import styles from './HomeCardItem.module.css';

const { cardWrapper, cardImage, cardTitle } = styles;

export default function HomeCardItem({ title, image, link, priority, index }) {
  return (
    <div className={cardWrapper}>
      <p className={cardImage}>
        {image} {link}
      </p>
      <p className={cardTitle}>{title}</p>
    </div>
  );
}
