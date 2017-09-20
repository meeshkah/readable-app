import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
// import { Redirect } from 'react-router-dom'
import Post from '../components/Post';
import Comment from '../components/Comment';
import CommentForm from '../components/CommentForm';
import CommentModal from './CommentModal';
import {
  fetchPost,
  deletePost,
  fetchPostUpvote,
  fetchPostDownvote,
} from '../actions/PostActions';
import {
  newComment,
  deleteComment,
  fetchComments,
  fetchCommentUpvote,
  fetchCommentDownvote,
} from '../actions/CommentActions';
import { openCommentModal, openPostModal } from '../actions/modals';

class PostDetail extends Component {
  componentDidMount() {
    this.props.fetchPost(this.props.postId);
    this.props.fetchComments(this.props.postId);
  }

  // TODO: DRY handles (also used in PostsList)
  handlePostUpvote(postId) {
    this.props.fetchPostUpvote(postId);
  }

  handlePostDownvote(postId) {
    this.props.fetchPostDownvote(postId);
  }

  handlePostDelete(postId, postComments) {
    this.props.deletePost(postId, postComments);
  }

  handlePostEdit(post) {
    this.props.openPostModal(post);
  }

  handleCommentUpvote(commentId) {
    this.props.fetchCommentUpvote(commentId);
  }

  handleCommentDownvote(commentId) {
    this.props.fetchCommentDownvote(commentId);
  }

  handleCommentSubmit(comment, postId) {
    this.props.newComment(comment, postId);
  }

  handleCommentDelete(commentId) {
    this.props.deleteComment(commentId);
  }

  handleCommentEdit(comment) {
    this.props.openCommentModal(comment);
  }

  render() {
    const { visiblePosts } = this.props;
    const comments = (visiblePosts.length > 0 &&
                      this.props.posts[visiblePosts[0]].comments &&
                      this.props.posts[visiblePosts[0]].comments.length > 0) ?
                      this.props.posts[visiblePosts[0]].comments :
                      [];
    const visibleComments = comments.filter((commentId) => !this.props.comments[commentId].body.deleted);

    return (
      <div className="c-post-detail">
        {visiblePosts.length > 0 && (
          <Post
            post={this.props.posts[visiblePosts[0]]}
            comments={
              this.props.posts[visiblePosts[0]].comments ?
              this.props.posts[visiblePosts[0]].comments.filter((commentId) => !this.props.comments[commentId].body.deleted) :
              []
            }
            onUpvote={() => this.handlePostUpvote(visiblePosts[0])}
            onDownvote={() => this.handlePostDownvote(visiblePosts[0])}
            onDelete={() => this.handlePostDelete(visiblePosts[0], comments)}
            onEdit={() => this.handlePostEdit(this.props.posts[visiblePosts[0]])}
          />
        )}
        <CommentForm handleSubmit={(comment) => this.props.newComment(comment, visiblePosts[0])} />
        {visibleComments.length > 0 && <h2>{visibleComments.length} comment{visibleComments.length > 1 && 's'}</h2>}
        <div className="c-post-detail__comments">
          {visibleComments.map((commentId) => (
            <Comment
              key={commentId}
              comment={this.props.comments[commentId]}
              onUpvote={() => this.handleCommentUpvote(commentId)}
              onDownvote={() => this.handleCommentDownvote(commentId)}
              onDelete={() => this.handleCommentDelete(commentId)}
              onEdit={() => this.handleCommentEdit(this.props.comments[commentId])}
            />
          ))}
        </div>
        <CommentModal />
      </div>
    );
  }
}

const mapStateToProps = ({posts, visiblePosts, comments}, { match }) => ({
  postId: match.params.postId,
  posts,
  visiblePosts,
  comments,
});

PostDetail = withRouter(connect(
  mapStateToProps,
  {
    fetchPost,
    deletePost,
    fetchComments,
    fetchPostUpvote,
    fetchPostDownvote,
    fetchCommentUpvote,
    fetchCommentDownvote,
    newComment,
    deleteComment,
    openCommentModal,
    openPostModal,
  }
)(PostDetail));

export default PostDetail;
