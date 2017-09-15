import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import Post from '../components/Post';
import PostModal from './PostModal';
import {
  fetchPosts,
  fetchPostUpvote,
  fetchPostDownvote,
  deletePost,
} from '../actions';
import { openPostModal } from '../actions/modals';

class PostsList extends Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts(this.props.category, this.props.sortBy));
  }

  componentDidUpdate(prevProps) {
    if (this.props.category !== prevProps.category) {
      this.props.dispatch(fetchPosts(this.props.category, this.props.sortBy));
    }
  }

  handleUpvote(postId) {
    this.props.dispatch(fetchPostUpvote(postId));
  }

  handleDownvote(postId) {
    this.props.dispatch(fetchPostDownvote(postId));
  }

  handleDelete(postId, postComments) {
    this.props.dispatch(deletePost(postId, postComments, this.props.category));
  }

  handlePostEdit(post) {
    this.props.dispatch(openPostModal(post));
  }

  render() {
    return (
      <div>
      {this.props.visiblePosts.map((postId) => (
        <Post
          key={postId}
          post={this.props.posts[postId]}
          comments={
            this.props.posts[postId].comments ?
            this.props.posts[postId].comments.filter((commentId) => !this.props.comments[commentId].body.deleted) :
            []
          }
          onUpvote={() => this.handleUpvote(postId)}
          onDownvote={() => this.handleDownvote(postId)}
          onDelete={() => this.handleDelete(postId, this.props.posts[postId].comments)}
          onEdit={() => this.handlePostEdit(this.props.posts[postId])}
        >
          <Link className="c-post__more" to={`/${this.props.posts[postId].body.category}/${postId}`}>Read more</Link>
        </Post>
      ))}
      <PostModal />
      </div>
    );
  }
}

const mapStateToProps = (state = {}, { match }) => ({
  category: match.params.category,
  posts: state.posts,
  visiblePosts: state.visiblePosts,
  sortBy: state.sortPosts.sortBy,
  comments: state.comments,
});

PostsList = withRouter(connect(
  mapStateToProps,
)(PostsList));

export default PostsList;
