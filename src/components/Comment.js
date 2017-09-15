import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import './Comment.css';

const Comment = (props) => {
  const { comment } = props;

  return (
    <div className="c-comment">
      <div className="c-comment__meta">
        Posted <span className="c-comment__time" title={moment(comment.body.timestamp).format("dddd, MMMM Do YYYY, h:mm:ss a")}>{moment(comment.body.timestamp).fromNow()}</span> by <span className="c-comment__author">{comment.body.author}</span>
      </div>
      <div className="c-comment__content">{comment.body.body}</div>
      <div className="c-comment__score">
        <button className="c-comment__up" onClick={() => props.onUpvote()}>Upvote</button>
        <div className="c-comment__points">{comment.body.voteScore}</div>
        <button className="c-comment__down" onClick={() => props.onDownvote()}>Downvote</button>
      </div>
      <div className="c-comment__actions">
        <button className="c-comment__edit" onClick={() => props.onEdit()}>Edit comment</button>
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
  onEdit: PropTypes.func.isRequired,
  onUpvote: PropTypes.func.isRequired,
  onDownvote: PropTypes.func.isRequired,
};

export default Comment;
