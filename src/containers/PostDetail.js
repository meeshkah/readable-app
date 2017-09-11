import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Post from '../components/Post';
import Comment from '../components/Comment';
import { 
  fetchPost, 
  fetchComments,
  fetchPostUpvote, 
  fetchPostDownvote,
  fetchCommentUpvote, 
  fetchCommentDownvote
} from '../actions';

class PostDetail extends Component {
  componentDidMount() {
    this.props.dispatch(fetchPost(this.props.postId));
    this.props.dispatch(fetchComments(this.props.postId));
  }

  // componentDidUpdate(prevProps) {
  //   if (this.props.postId !== prevProps.postId) {
  //     this.props.dispatch(fetchPost(this.props.postId));
  //     this.props.dispatch(fetchComments(this.props.postId));
  //   }
  // }

  // TODO: DRY handles (also used in PostsList)
  handlePostUpvote(postId) {
    this.props.dispatch(fetchPostUpvote(postId));
  }

  handlePostDownvote(postId) {
    this.props.dispatch(fetchPostDownvote(postId));
  }

  handleCommentUpvote(commentId) {
    this.props.dispatch(fetchCommentUpvote(commentId));
  }

  handleCommentDownvote(commentId) {
    this.props.dispatch(fetchCommentDownvote(commentId));
  }

  render() {
    const { visiblePosts } = this.props;
    return (
      <div className="c-post-detail">
        {visiblePosts.length > 0 && (
          <Post
            post={this.props.posts[visiblePosts[0]]}
            onUpvote={() => this.handlePostUpvote(visiblePosts[0])}
            onDownvote={() => this.handlePostDownvote(visiblePosts[0])}
          />
        )}
        <div className="c-post-detail__comments">
          {(visiblePosts.length > 0 &&
           this.props.posts[visiblePosts[0]].comments &&
           this.props.posts[visiblePosts[0]].comments.length > 0) && 
           this.props.posts[visiblePosts[0]].comments.map((commentId) => (
            <Comment
              key={commentId}
              comment={this.props.comments[commentId]}
              onUpvote={() => this.handleCommentUpvote(commentId)}
              onDownvote={() => this.handleCommentDownvote(commentId)}
            />
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state = {}, { match }) => ({
  postId: match.params.postId,
  posts: state.posts,
  visiblePosts: state.visiblePosts,
  comments: state.comments,
});

PostDetail = withRouter(connect(
  mapStateToProps,
)(PostDetail));

export default PostDetail;
