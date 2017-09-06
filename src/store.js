import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = (initialState = {}) => createStore(
  rootReducer,
  initialState,
  composeEnhancers(
    applyMiddleware(thunk)
  )
);


export default configureStore;

// Store shape
// {
//   posts: {
//     "post-id-1": {},
//     "post-id-2": {},
//     "post-id-3": {},
//     ...
//   }
//   visiblePosts: [
//     "post-id-2",
//     "post-id-3",
//     ...
//   ]
//   categories: {
//     "category-id-1": {},
//     "category-id-2": {},
//   }
//   currentCategory: "category-id-1",
// }
