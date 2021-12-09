import React from 'react';
import logoCP2 from '../../assets/logo.png';
import {
  headerWrapper,
  headerImageWrapper,
  headerLogo,
  headerTitleWrapper,
} from './Header.module.css';

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
