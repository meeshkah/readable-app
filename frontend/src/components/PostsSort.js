import React from 'react';
import PropTypes from 'prop-types';

const PostsSort = (props) => {
  return (
    <select
      className="c-sort__select"
      value={props.sortBy}
      onChange={(e) => props.onSort(e.target.value)}
    >
      <option value="" disabled>Select sort option</option>
      {props.options.map((option) => (
        <option key={option.value} value={option.value}>{option.title}</option>
      ))}
    </select>
  );
}

PostsSort.propTypes = {
  sortBy: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  onSort: PropTypes.func.isRequired,
};

export default PostsSort;
