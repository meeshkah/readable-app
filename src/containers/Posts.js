import React, { Component } from 'react';
import { connect } from 'react-redux';
import Post from '../components/Post';
import { loadPosts } from '../actions';

class Posts extends Component {
  componentDidMount() {
    this.props.dispatch(loadPosts());
  }

  render() {
    return (
      <div>
      {this.props.posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.posts,
  };
}

export default connect(
  mapStateToProps,
)(Posts);
