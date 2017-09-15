import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = (props) => {
  return (
    <div className="App-header">
      <Link to="/">
        <h2>{ props.text }</h2>
      </Link>
    </div>
  )
}

export default Header;
