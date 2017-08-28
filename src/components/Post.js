import React from 'react';
import PropTypes from 'prop-types';

const Post = (props) => {
  const { post } = props;

  return (
    <div className="c-post">
      <h1 className="c-post__title">{post.title}</h1>
      <div className="c-post__meta">
        <div className="c-post__time">{(new Date(post.timestamp)).toString()}</div>
        <div className="c-post__category">{post.category}</div>
        <div className="c-post__author">{post.author}</div>
      </div>
      <div className="c-post__content">{post.body}</div>
      <div className="c-post__score">
        <a className="c-post__up">Upvote</a>
        <div className="c-post__points">{post.voteScore}</div>
        <a className="c-post__down">Downvote</a>
      </div>
      <div className="c-post__comments">{post.comments}</div>
      <div className="c-post__actions">
        <a className="c-post__edit">Edit post</a>
        <a className="c-post__delete">Delete post</a>
      </div>
    </div>
  );
};

Post.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired,
    body: PropTypes.string.isRequired,
    voteScore: PropTypes.number.isRequired,
    comments: PropTypes.number,
  }),
};

export default Post;
