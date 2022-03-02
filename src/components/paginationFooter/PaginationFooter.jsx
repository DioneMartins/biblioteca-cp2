import React from 'react';
import arrowLeft from '../../assets/Antu_arrow-right.svg';
import styles from './PaginationFooter.module.css';

const { pfWrapper, pfLeft, pfRight } = styles;
export default function PaginationFooter() {
  return (
    <div className={pfWrapper}>
      <img className={pfLeft} src={arrowLeft} alt="Esquerda" />
      <p>Pagination footer</p>
      <img className={pfRight} src={arrowLeft} alt="Esquerda" />
    </div>
  );
}
