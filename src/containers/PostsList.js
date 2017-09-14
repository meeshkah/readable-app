import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import Post from '../components/Post';
import { 
  fetchPosts, 
  fetchPostUpvote, 
  fetchPostDownvote,
  deletePost,
} from '../actions';

class PostsList extends Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts(this.props.category));
  }

  componentDidUpdate(prevProps) {
    if (this.props.category !== prevProps.category) {
      this.props.dispatch(fetchPosts(this.props.category));
    }
  }

  handleUpvote(postId) {
    this.props.dispatch(fetchPostUpvote(postId));
  }

  handleDownvote(postId) {
    this.props.dispatch(fetchPostDownvote(postId));
  }

  handleDelete(postId, postComments) {
    this.props.dispatch(deletePost(postId, postComments));
  }

  render() {
    return (
      <div>
      {this.props.visiblePosts.map((postId) => (
        <Post 
          key={postId} 
          post={this.props.posts[postId]}
          onUpvote={() => this.handleUpvote(postId)}
          onDownvote={() => this.handleDownvote(postId)}
          onDelete={() => this.handleDelete(postId, this.props.posts[postId].comments)}
        >
          <Link to={`/${this.props.posts[postId].body.category}/${postId}`}>Read more</Link>
        </Post>
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
