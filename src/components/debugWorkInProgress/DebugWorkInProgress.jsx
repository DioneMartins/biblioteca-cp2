import React from 'react';
import PropTypes from 'prop-types';
import { wrapper, compholder, future, itemDiv, itemP } from './DebugWorkInProgress.module.css';

export default function DebugWorkInProgress({ pageName, message, respDev, devOrder }) {
  return (
    <div className={wrapper}>
      <p className={compholder}>Component placeholder</p>
      <p className={future}>{pageName}</p>
      <p className={future}>Ordem na Pipeline: {devOrder}</p>
      {message.map((item) => {
        return (
          <div key={item} className={itemDiv}>
            <p className={itemP}>{item}</p>
          </div>
        );
      })}
      <p className={future}>Responsável: {respDev}</p>
    </div>
  );
}

DebugWorkInProgress.propTypes = {
  pageName: PropTypes.string.isRequired,
  message: PropTypes.arrayOf(PropTypes.string).isRequired,
  respDev: PropTypes.string.isRequired,
  devOrder: PropTypes.string.isRequired,
};
