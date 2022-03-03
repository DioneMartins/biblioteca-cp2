import React from 'react';
import PropTypes from 'prop-types';
import styles from './HomeCardItem.module.css';
import { Link } from 'react-router-dom';

const { cardWrapper, cardTitle, imageWrapper, linkTitle } = styles;

export default function HomeCardItem({ title, image, link, priority, exibitionLink, index }) {
  return (
    <div className={cardWrapper}>
      <div className={imageWrapper}>
        <a href={link}>
          <img src={image} alt="icone" />
        </a>
      </div>
      <div>
        <p className={cardTitle}>{title}</p>
        <a className={linkTitle} href={link}>
          {exibitionLink}
        </a>
      </div>
    </div>
  );
}

HomeCardItem.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  priority: PropTypes.number,
  index: PropTypes.number,
  exibitionLink: PropTypes.string.isRequired,
};

HomeCardItem.defaultProps = {
  priority: 0,
  index: 0,
};
