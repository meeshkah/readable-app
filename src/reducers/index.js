import { combineReducers } from 'redux';
import { 
  LOAD_POSTS, 
  LOAD_POST, 
  LOAD_CATEGORIES,
  POST_UPVOTE,
  POST_DOWNVOTE,
  COMMENT_UPVOTE,
  COMMENT_DOWNVOTE,
  LOAD_COMMENTS,
} from '../actions';

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
    default:
      return state;
  }
};

const visiblePosts = (state = [], action) => {
  switch (action.type) {
    case LOAD_POSTS:
      return action.payload.posts.map((post) => post.id);
    case LOAD_POST:
      return [action.payload.post.id];
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
  categories,
  currentCategory,
  comments,
})

export default rootReducer;
