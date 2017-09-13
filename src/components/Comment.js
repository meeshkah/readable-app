import React from 'react';
import PropTypes from 'prop-types';

const Comment = (props) => {
  const { comment } = props;

  return (
    <div className="c-comment">
      <div className="c-comment__meta">
        <div className="c-comment__time">{(new Date(comment.body.timestamp)).toString()}</div>
        <div className="c-comment__author">{comment.body.author}</div>
      </div>
      <div className="c-comment__content">{comment.body.body}</div>
      <div className="c-comment__score">
        <button className="c-comment__up" onClick={() => props.onUpvote()}>Upvote</button>
        <div className="c-comment__points">{comment.body.voteScore}</div>
        <button className="c-comment__down" onClick={() => props.onDownvote()}>Downvote</button>
      </div>
      <div className="c-comment__actions">
        <a className="c-comment__edit">Edit comment</a>
        <button className="c-comment__delete" onClick={() => props.onDelete()}>Delete comment</button>
      </div>
    </div>
  );
};

Comment.propTypes = {
  comment: PropTypes.shape({
    body: PropTypes.shape({
      author: PropTypes.string.isRequired,
      timestamp: PropTypes.number.isRequired,
      body: PropTypes.string.isRequired,
      voteScore: PropTypes.number.isRequired,
    }),
  }),
  onDelete: PropTypes.func.isRequired,
  onUpvote: PropTypes.func.isRequired,
  onDownvote: PropTypes.func.isRequired,
};

export default Comment;
