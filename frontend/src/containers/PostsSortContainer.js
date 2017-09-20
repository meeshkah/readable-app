import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PostsSort from '../components/PostsSort';
import { sortPosts } from '../actions/PostActions';
import './PostsSortContainer.css';

class PostsSortContainer extends Component {
  handleSort(sortBy) {
    this.props.sortPosts(sortBy, this.props.posts);
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

const mapStateToProps = ({sortPosts, posts}) => ({
  sortBy: sortPosts.sortBy,
  sortOptions: sortPosts.sortOptionsById.map((option) => sortPosts.sortOptions[option]),
  posts,
});

PostsSortContainer = withRouter(connect(
  mapStateToProps,
  {
    sortPosts,
  }
)(PostsSortContainer));

export default PostsSortContainer;
