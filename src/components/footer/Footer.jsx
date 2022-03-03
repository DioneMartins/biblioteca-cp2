import React from 'react';
import styles from './Footer.module.css';

const { footerWrapper, footerGrid, footerOwner, footerLink } = styles;

export default function Footer() {
  return (
    <div className={footerWrapper}>
      <div className={footerGrid}>
        <p> Direito de uso: open source </p>
        <p>Suporte Site: bibliotecacp2.web@gmail.com</p>
        <a className={footerLink} href="https://github.com/DioneMartins/biblioteca-cp2">
          github.com/DioneMartins/biblioteca-cp2
        </a>
        <p>Suporte Biblioteca: bibliotecatijuca2@gmail.com</p>
      </div>
      <p className={footerOwner}>
        Um Projeto de: Daniel Matos, Dione Martins, Douglas Oliveira, Leonardo Labbe{' '}
      </p>
    </div>
  );
}
