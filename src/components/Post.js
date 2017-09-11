import React from 'react';
import PropTypes from 'prop-types';

const Post = (props) => {
  const { post, children } = props;
  return (
    <div className="c-post">
      <h1 className="c-post__title">{post.body.title}</h1>
      <div className="c-post__meta">
        <div className="c-post__time">{(new Date(post.body.timestamp)).toString()}</div>
        <div className="c-post__category">{post.body.category}</div>
        <div className="c-post__author">{post.body.author}</div>
      </div>
      <div className="c-post__content">{post.body.body}</div>
      <div className="c-post__score">
        <button className="c-post__up" onClick={() => props.onUpvote()}>Upvote</button>
        <div className="c-post__points">{post.body.voteScore}</div>
        <button className="c-post__down" onClick={() => props.onDownvote()}>Downvote</button>
      </div>
      <div className="c-post__comments">{post.body.comments}</div>
      <div className="c-post__actions">
        <a className="c-post__edit">Edit post</a>
        <a className="c-post__delete">Delete post</a>
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
      comments: PropTypes.number,
    }),
  }),


};

export default Post;
