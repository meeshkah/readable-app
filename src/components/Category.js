import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const Category = (props) => {
  return (
    <NavLink 
      to={`/category/${props.path}`}
      className="c-category"
      activeClassName="c-category--active"
    >
      {props.name}
    </NavLink>
  );
}

Category.propTypes = {
  name: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};

export default Category;
