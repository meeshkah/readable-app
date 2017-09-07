import { combineReducers } from 'redux';
import { 
  LOAD_POSTS, 
  LOAD_CATEGORIES,
  POST_UPVOTE,
  POST_DOWNVOTE,
} from '../actions';

const normalizePosts = (posts) => {
  const normalized = [];
  posts.forEach((post) => {
    normalized[post.id] = post;
  });
  return normalized;
}

const posts = (state = {}, action) => {
  switch (action.type) {
    case LOAD_POSTS:
      const normalizedPosts = normalizePosts(action.payload.posts);
      return {
        ...state,
        ...normalizedPosts,
      }
    case POST_UPVOTE:
    case POST_DOWNVOTE:
      const post = {
        [action.payload.post.id]: action.payload.post,
      };
      return {
        ...state,
        ...post,
      }
    default:
      return state;
  }
};

const visiblePosts = (state = [], action) => {
  switch (action.type) {
    case LOAD_POSTS:
      return action.payload.posts.map((post) => post.id);
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

const rootReducer = combineReducers({
  posts,
  visiblePosts,
  categories,
  currentCategory,
})

export default rootReducer;
