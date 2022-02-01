import React from 'react';
import { Link } from 'react-router-dom';
import homeSVG from '../../assets/dynnamitt_home.svg';
import searchSVG from '../../assets/Simpleicons_Interface_magnifier.svg';
import {
  navbarWrapper,
  navbarHome,
  navbarButtonWrapper,
  navbarButton,
  navbarSearchWrapper,
  navbarSearch,
  navbarSearchButton,
  navbarSearchIcon,
} from './Navbar.module.css';

export default function Navbar() {
  return (
    <div className={navbarWrapper}>
      <Link className={navbarHome} to={'/'}>
        <img src={homeSVG} alt="Início" />
      </Link>
      <div className={navbarButtonWrapper}>
        <Link to={'/lista'} className={navbarButton}>
          <p>Lista</p>
        </Link>
        <Link to={'/login'} className={navbarButton}>
          <p>Login</p>
        </Link>
      </div>
      <div className={navbarSearchWrapper}>
        <input type="text" className={navbarSearch} />
        <button className={navbarSearchButton}>
          <img className={navbarSearchIcon} src={searchSVG} alt="Pesquisar" />
        </button>
      </div>
    </div>
  );
}
