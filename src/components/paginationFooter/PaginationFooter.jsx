import React from 'react';
import arrowLeft from '../../assets/Antu_arrow-right.svg';
import styles from './PaginationFooter.module.css';

const { pfWrapper, pfLeft, pfRight } = styles;
export default function PaginationFooter(props) {
  return (
    <div className={pfWrapper}>
      <img className={pfLeft} src={arrowLeft} alt="Esquerda" />
      <button>1</button>
      <button>1</button>
      <img className={pfRight} src={arrowLeft} alt="Esquerda" />
    </div>
  );
}
