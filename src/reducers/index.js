import { combineReducers } from 'redux';

const posts = (state = {}, action) => {
  switch (action.type) {
    case 'SHOW_POSTS':
      return {
        ...state,
        posts: action.payload.posts,
      }
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  posts,
})

export default rootReducer;
