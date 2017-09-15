import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PostsSort from '../components/PostsSort';
import { sortPosts } from '../actions';
import './PostsSortContainer.css';

class PostsSortContainer extends Component {
  handleSort(sortBy) {
    this.props.dispatch(sortPosts(sortBy, this.props.posts));
  }

  render() {
    const { sortBy, sortOptions } = this.props;

    return (
      <div className="c-sort">
        <h3 className="c-sort__title">Sort posts by:</h3>
        <PostsSort
          sortBy={sortBy}
          options={sortOptions}
          onSort={(sortByValue) => this.handleSort(sortByValue)}
        />
      </div>
    );
  }
}

const mapStateToProps = (state = {}) => ({
  sortBy: state.sortPosts.sortBy,
  sortOptions: state.sortPosts.sortOptionsById.map((option) => state.sortPosts.sortOptions[option]),
  posts: state.posts,
});

PostsSortContainer = withRouter(connect(
  mapStateToProps,
)(PostsSortContainer));

export default PostsSortContainer;
