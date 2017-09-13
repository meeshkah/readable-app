import { combineReducers } from 'redux';
import {
  LOAD_POSTS,
  LOAD_POST,
  ADD_POST,
  LOAD_CATEGORIES,
  POST_UPVOTE,
  POST_DOWNVOTE,
  COMMENT_UPVOTE,
  COMMENT_DOWNVOTE,
  LOAD_COMMENTS,
  ADD_COMMENT,
  DELETE_COMMENT,
  EDIT_COMMENT,
} from '../actions';
import {
  POST_MODAL_OPEN,
  POST_MODAL_CLOSE,
  COMMENT_MODAL_OPEN,
  COMMENT_MODAL_CLOSE,
} from '../actions/modals';

const normalize = (entities) => {
  const normalized = [];
  entities.forEach((entity) => {
    normalized[entity.id] = {
      body: entity,
    };
  });
  return normalized;
}

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

const visiblePosts = (state = [], action) => {
  switch (action.type) {
    case LOAD_POSTS:
      return action.payload.posts.map((post) => post.id);
    case ADD_POST:
      return [...state, action.payload.post.id];
    case LOAD_POST:
      return [action.payload.post.id];
    default:
      return state;
  }
}

const postModal = (state = false, action) => {
  switch (action.type) {
    case POST_MODAL_OPEN:
    case POST_MODAL_CLOSE:
      return action.payload.isOpen;
    default:
      return state;
  }
}

const commentModal = (state = {
  isOpen: false, 
  comment: {},
}, action) => {
  switch (action.type) {
    case COMMENT_MODAL_OPEN:
    case COMMENT_MODAL_CLOSE:
      return {
        ...state,
        comment: action.payload.comment,
        isOpen: action.payload.isOpen,
      };
    default:
      return state;
  }
}

const categories = (state = [], action) => {
  switch (action.type) {
    case LOAD_CATEGORIES:
      return action.payload.categories;
    default:
      return state;
  }
};

// TODO: Set current cattegory on category change
const currentCategory = (state = '', action) => {
  switch (action.type) {
    default:
      return state;
  }
}

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
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  posts,
  visiblePosts,
  postModal,
  commentModal,
  categories,
  currentCategory,
  comments,
})

export default rootReducer;
