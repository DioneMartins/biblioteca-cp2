import React, { useState } from 'react';
import RandomSVG from '../../assets/Font_Awesome_5_solid_random.svg';
import styles from './PaginationHeader.module.css';

const { phWrapper, phRandom, phLabel, phInput, phButton } = styles;
export default function PaginationHeader(props) {
  const [quant, setQuant] = useState(10);

  function alterNumber() {
    props.changer(quant);
  }

  return (
    <div className={phWrapper}>
      <img className={phRandom} src={RandomSVG} alt="Aleatorizar" />
      <div>
        <label className={phLabel} htmlFor="number">
          Número de cards
        </label>
        <input
          className={phInput}
          type="number"
          value={quant}
          min="2"
          max="30"
          step="1"
          onChange={(e) => setQuant(e.target.value)}
        />
        <button className={phButton} onClick={(e) => alterNumber()}>
          Alterar
        </button>
      </div>
    </div>
  );
}
