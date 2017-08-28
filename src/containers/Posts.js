import React, { Component } from 'react';
import { connect } from 'react-redux';
import Post from '../components/Post';

class Posts extends Component {
  render() {
    return (
      <div>
      {Object.keys(this.props.posts).map((id) => (
        <Post key={id} post={this.props.posts[id]} />
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
