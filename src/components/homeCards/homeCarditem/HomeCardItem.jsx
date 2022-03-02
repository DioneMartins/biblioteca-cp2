import React from 'react';
import PropTypes from 'prop-types';
import styles from './HomeCardItem.module.css';

const { cardWrapper, cardTitle, imageWrapper } = styles;

export default function HomeCardItem({ title, image, link, priority, index }) {
  return (
    <div className={cardWrapper}>
      <div className={imageWrapper}>
        <a href={link}>
          <img src={image} alt="icone" />
        </a>
      </div>
      <a className={cardTitle} href={link}>
        {title}
      </a>
    </div>
  );
}

HomeCardItem.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  priority: PropTypes.number,
  index: PropTypes.number,
};

HomeCardItem.defaultProps = {
  priority: 0,
  index: 0,
};
