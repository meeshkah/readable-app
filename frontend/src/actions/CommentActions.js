import * as api from '../utils/api';
import { closeCommentModal } from './modals';
import {
  LOAD_COMMENTS,
  ADD_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
  COMMENT_UPVOTE,
  COMMENT_DOWNVOTE,
} from './types';

const upvoteComment = (comment) => {
  return {
    type: COMMENT_UPVOTE,
    payload: {
      comment,
    }
  }
};

export const fetchCommentUpvote = (commentId) => (dispatch) => {
  return api
    .voteComment(commentId, 'upVote')
    .then((comment) => dispatch(upvoteComment(comment)))
};

const downvoteComment = (comment) => {
  return {
    type: COMMENT_DOWNVOTE,
    payload: {
      comment,
    }
  }
};

export const fetchCommentDownvote = (commentId) => (dispatch) => {
  return api
    .voteComment(commentId, 'downVote')
    .then((comment) => dispatch(downvoteComment(comment)))
};

const loadComments = (postId, comments) => {
  return {
    type: LOAD_COMMENTS,
    payload: {
      postId,
      comments,
    },
  }
};

export const fetchComments = (postId) => (dispatch) => {
  return api
    .getComments(postId)
    .then((comments) => dispatch(loadComments(postId, comments)));
};

const addComment = (comment, postId) => {
  return {
    type: ADD_COMMENT,
    payload: {
      comment,
      postId,
    },
  }
};

export const newComment = (comment, postId) => (dispatch) => {
  return api
    .addComment(comment, postId)
    .then((comment) => {
      dispatch(addComment(comment, postId));
    });
}

const removeComment = (commentId) => {
  return {
    type: DELETE_COMMENT,
    payload: {
      commentId,
    },
  }
};

export const deleteComment = (commentId) => (dispatch) => {
  return api
    .deleteComment(commentId)
    .then((comment) => {
      dispatch(removeComment(comment.id));
    });
}

const amendComment = (commentId, comment) => {
  return {
    type: EDIT_COMMENT,
    payload: {
      commentId,
      comment,
    },
  }
};

export const editComment = (commentId, comment) => (dispatch) => {
  return api
    .editComment(commentId, comment)
    .then((comment) => {
      dispatch(amendComment(comment.id, comment));
      dispatch(closeCommentModal());
    });
}
