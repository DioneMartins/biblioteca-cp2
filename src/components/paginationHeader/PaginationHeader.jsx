import React, { useState } from 'react';
import styles from './PaginationHeader.module.css';

const { phWrapper, phLabel, phInput, phButton } = styles;
export default function PaginationHeader(props) {
  const [quant, setQuant] = useState(10);

  function alterNumber() {
    props.changer(quant);
  }

  return (
    <div className={phWrapper}>
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
