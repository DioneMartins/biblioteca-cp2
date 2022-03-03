import React from 'react';
import arrow from '../../assets/Antu_arrow-right.svg';
import styles from './PaginationFooter.module.css';

const { pfWrapper, pfLeft, pfRight } = styles;
export default function PaginationFooter(props) {
  return (
    <div className={pfWrapper}>
      <button onClick={(e) => props.changer('back')}>
        <img className={pfLeft} src={arrow} alt="Esquerda" />
      </button>
      <button onClick={(e) => props.changer('forward')}>
        <img className={pfRight} src={arrow} alt="Direita" />
      </button>
    </div>
  );
}
