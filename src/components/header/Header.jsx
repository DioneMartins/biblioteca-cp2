import React from 'react';
import logoCP2 from '../../assets/logo.png';
import styles from './Header.module.css';

const { headerWrapper, headerImageWrapper, headerLogo, headerTitleWrapper } = styles;

export default function Header() {
  return (
    <div className={headerWrapper}>
      <div className={headerImageWrapper}>
        <img className={headerLogo} src={logoCP2} alt="Logo" />
      </div>
      <div className={headerTitleWrapper}>
        <p>Biblioteca</p>
        <p>Colégio Pedro II</p>
      </div>
    </div>
  );
}
