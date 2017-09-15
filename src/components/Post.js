import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import './Post.css';

const Post = (props) => {
  const { post, comments, children } = props;

  return (
    <div className="c-post">
      <h1 className="c-post__title">{post.body.title}</h1>
      <div className="c-post__meta">
        Posted <span className="c-post__time" title={moment(post.body.timestamp).format("dddd, MMMM Do YYYY, h:mm:ss a")}>{moment(post.body.timestamp).fromNow()}</span> in <span className="c-post__category">{post.body.category}</span> by <span className="c-post__author">{post.body.author}</span>
      </div>
      <div className="c-post__content">{post.body.body}</div>
      <div className="c-post__score">
        <button className="c-post__up" onClick={() => props.onUpvote()}>Upvote</button>
        <div className="c-post__points">{post.body.voteScore}</div>
        <button className="c-post__down" onClick={() => props.onDownvote()}>Downvote</button>
      </div>
      <div className="c-post__comments">{comments && comments.length > 0 ? `${comments.length} comment${comments.length > 1 ? 's' : ''}` : 'No comments yet'}</div>
      <div className="c-post__actions">
        <button className="c-post__edit" onClick={() => props.onEdit()}>Edit post</button>
        <button className="c-post__delete" onClick={() => props.onDelete()}>Delete post</button>
      </div>
      <div>{children}</div>
    </div>
  );
};

Post.propTypes = {
  post: PropTypes.shape({
    body: PropTypes.shape({
      title: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      timestamp: PropTypes.number.isRequired,
      body: PropTypes.string.isRequired,
      voteScore: PropTypes.number.isRequired,
    }),
    comments: PropTypes.array,
  }),
  comments: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onUpvote: PropTypes.func.isRequired,
  onDownvote: PropTypes.func.isRequired,
};

export default Post;
