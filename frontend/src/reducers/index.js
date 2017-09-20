import { combineReducers } from 'redux';
import posts from './PostsReducer';
import visiblePosts from './VisiblePostsReducer';
import sortPosts from './SortPostsReducer';
import postModal from './PostModalReducer';
import commentModal from './CommentModalReducer';
import categories from './CategoriesReducer';
import comments from './CommentsReducer';

const rootReducer = combineReducers({
  posts,
  visiblePosts,
  sortPosts,
  postModal,
  commentModal,
  categories,
  comments,
})

export default rootReducer;
