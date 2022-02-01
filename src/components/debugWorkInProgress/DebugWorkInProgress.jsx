import React from 'react';
import PropTypes from 'prop-types';
import { wrapper, compholder, future, itemDiv, itemP } from './DebugWorkInProgress.module.css';

export default function DebugWorkInProgress({ pageName, message }) {
  return (
    <div className={wrapper}>
      <p className={compholder}>Component placeholder</p>
      <p className={future}>{pageName}</p>
      {message.map((item) => {
        return (
          <div key={item} className={itemDiv}>
            <p className={itemP}>{item}</p>
          </div>
        );
      })}
    </div>
  );
}

DebugWorkInProgress.propTypes = {
  pageName: PropTypes.string.isRequired,
  message: PropTypes.arrayOf(PropTypes.string).isRequired,
};
