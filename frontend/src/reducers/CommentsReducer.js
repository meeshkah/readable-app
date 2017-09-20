import {
  DELETE_POST,
  COMMENT_UPVOTE,
  COMMENT_DOWNVOTE,
  LOAD_COMMENTS,
  ADD_COMMENT,
  DELETE_COMMENT,
  EDIT_COMMENT,
} from '../actions/types';
import normalize from '../helpers/normalize';

const comments = (state = {}, action) => {
  switch (action.type) {
    case LOAD_COMMENTS:
      const normalizedComments = normalize(action.payload.comments);
      return {
        ...state,
        ...normalizedComments,
      }
    case ADD_COMMENT:
      return {
        ...state,
        [action.payload.comment.id]: {
          ...state[action.payload.comment.id],
          body: action.payload.comment,
        },
      }
    case DELETE_COMMENT:
      return {
        ...state,
        [action.payload.commentId]: {
          ...state[action.payload.commentId],
          body: {
            ...state[action.payload.commentId].body,
            deleted: true,
          },
        },
      }
    case EDIT_COMMENT:
      return {
        ...state,
        [action.payload.commentId]: {
          ...state[action.payload.commentId],
          body: action.payload.comment,
        },
      }
    case COMMENT_UPVOTE:
    case COMMENT_DOWNVOTE:
      const comment = {
        [action.payload.comment.id]: {
          body: action.payload.comment,
        },
      };
      return {
        ...state,
        ...comment,
      }
    case DELETE_POST:
      const deletedComments = [];
      action.payload.comments.forEach((commentId) => {
        deletedComments[commentId] = {
          body: {
            ...state[commentId].body,
            deleted: true,
          },
        };
      });
      return {
        ...state,
        ...deletedComments,
      }
    default:
      return state;
  }
}

export default comments;
