import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import homeSVG from '../../assets/dynnamitt_home.svg';
import searchSVG from '../../assets/Simpleicons_Interface_magnifier.svg';
import styles from './Navbar.module.css';

const {
  navbarWrapper,
  navbarHome,
  navbarButtonWrapper,
  navbarButton,
  navbarSearchWrapper,
  navbarSearch,
  navbarSearchButton,
  navbarSearchIcon,
} = styles;

export default function Navbar() {
  const [search, setSearch] = useState('');

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
        <input
          id="searchBox"
          type="text"
          className={navbarSearch}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Link className={navbarSearchButton} to={'/search/' + search}>
          <img className={navbarSearchIcon} src={searchSVG} alt="Pesquisar" />
        </Link>
      </div>
    </div>
  );
}
