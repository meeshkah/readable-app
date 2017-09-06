import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Post from '../components/Post';
import { fetchPosts } from '../actions';

class PostsList extends Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts(this.props.category));
  }

  componentDidUpdate(prevProps) {
    if (this.props.category !== prevProps.category) {
      this.props.dispatch(fetchPosts(this.props.category));
    }
  }

  render() {
    return (
      <div>
      {this.props.visiblePosts.map((postId) => (
        <Post key={postId} post={this.props.posts[postId]} />
      ))}
      </div>
    );
  }
}

const mapStateToProps = (state = {}, { match }) => ({
  category: match.params.category,
  posts: state.posts,
  visiblePosts: state.visiblePosts,
});

PostsList = withRouter(connect(
  mapStateToProps,
)(PostsList));

export default PostsList;
