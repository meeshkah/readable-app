import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import Post from '../components/Post';
import PostModal from './PostModal';
import PostsSortContainer from './PostsSortContainer';
import {
  fetchPosts,
  fetchPostUpvote,
  fetchPostDownvote,
  deletePost,
} from '../actions/PostActions';
import { openPostModal } from '../actions/modals';

class PostsList extends Component {
  componentDidMount() {
    this.props.fetchPosts(this.props.category, this.props.sortBy);
  }

  componentDidUpdate(prevProps) {
    if (this.props.category !== prevProps.category) {
      this.props.fetchPosts(this.props.category, this.props.sortBy);
    }
  }

  handleUpvote(postId) {
    this.props.fetchPostUpvote(postId);
  }

  handleDownvote(postId) {
    this.props.fetchPostDownvote(postId);
  }

  handleDelete(postId, postComments) {
    this.props.deletePost(postId, postComments, this.props.category);
  }

  handlePostEdit(post) {
    this.props.openPostModal(post);
  }

  render() {
    return (
      <div>
        <PostsSortContainer />
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

const mapStateToProps = ({posts, visiblePosts, sortBy, comments}, { match }) => ({
  category: match.params.category,
  posts,
  visiblePosts,
  sortBy,
  comments,
});

PostsList = withRouter(connect(
  mapStateToProps,
  {
    fetchPosts,
    fetchPostUpvote,
    fetchPostDownvote,
    deletePost,
    openPostModal,
  }
)(PostsList));

export default PostsList;
