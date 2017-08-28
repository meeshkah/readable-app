import { combineReducers } from 'redux';
import { SHOW_POSTS } from '../actions';

const posts = (state = [], action) => {
  switch (action.type) {
    case SHOW_POSTS:
      return action.payload.posts;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  posts,
})

export default rootReducer;
