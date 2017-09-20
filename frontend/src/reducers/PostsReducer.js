import {
  LOAD_POSTS,
  LOAD_POST,
  ADD_POST,
  DELETE_POST,
  EDIT_POST,
  POST_UPVOTE,
  POST_DOWNVOTE,
  LOAD_COMMENTS,
  ADD_COMMENT,
} from '../actions/types';
import normalize from '../helpers/normalize';

const posts = (state = {}, action) => {
  switch (action.type) {
    case LOAD_POSTS:
      const normalizedPosts = normalize(action.payload.posts);
      return {
        ...state,
        ...normalizedPosts,
      }
    case LOAD_POST:
    case ADD_POST:
      return {
        ...state,
        [action.payload.post.id]: {
          ...state[action.payload.post.id],
          body: action.payload.post,
        },
      }
    case DELETE_POST:
      return {
        ...state,
        [action.payload.postId]: {
          ...state[action.payload.postId],
          body: {
            ...state[action.payload.postId].body,
            deleted: true,
          },
        },
      }
    case EDIT_POST:
      return {
        ...state,
        [action.payload.postId]: {
          ...state[action.payload.postId],
          body: action.payload.post,
        },
      }
    case POST_UPVOTE:
    case POST_DOWNVOTE:
      return {
        ...state,
        [action.payload.post.id]: {
          ...state[action.payload.post.id],
          body: action.payload.post,
        },
      }
    case LOAD_COMMENTS:
      return {
        ...state,
        [action.payload.postId]: {
          ...state[action.payload.postId],
          comments: action.payload.comments.map((comment) => comment.id),
        },
      }
    case ADD_COMMENT:
      return {
        ...state,
        [action.payload.postId]: {
          ...state[action.payload.postId],
          comments: [...state[action.payload.postId].comments, action.payload.comment.id],
        },
      }
    default:
      return state;
  }
};

export default posts;
