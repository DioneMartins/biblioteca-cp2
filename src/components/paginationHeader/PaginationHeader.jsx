import React from 'react';
import RandomSVG from '../../assets/Font_Awesome_5_solid_random.svg';
import styles from './PaginationHeader.module.css';

const { phWrapper, phRandom, phLabel, phInput } = styles;
export default function PaginationHeader() {
  return (
    <div className={phWrapper}>
      <img className={phRandom} src={RandomSVG} alt="Aleatorizar" />
      <div>
        <label className={phLabel} htmlFor="number">
          Número de cards
        </label>
        <input className={phInput} type="number" />
      </div>
    </div>
  );
}
