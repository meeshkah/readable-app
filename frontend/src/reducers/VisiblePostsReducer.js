import {
  LOAD_POSTS,
  LOAD_POST,
  ADD_POST,
  DELETE_POST,
  SORT_POSTS,
} from '../actions/types';
import normalize from '../helpers/normalize';

const visiblePosts = (state = [], action) => {
  const sortPosts = (postsIds, posts, sortBy) => {
    return postsIds.concat().sort((a, b) => {
      return parseFloat(posts[a].body[sortBy]) <
        parseFloat(posts[b].body[sortBy]);
    });
  }
  switch (action.type) {
    case LOAD_POSTS:
      const postsIds = action.payload.posts
        .filter((post) => !post.deleted)
        .map((post) => post.id);
      return action.payload.sortBy ?
        sortPosts(postsIds, normalize(action.payload.posts), action.payload.sortBy) :
        postsIds;
    case DELETE_POST:
      return state.filter((postId) => postId !== action.payload.postId);
    case ADD_POST:
      return [...state, action.payload.post.id];
    case LOAD_POST:
      return [action.payload.post.id];
    case SORT_POSTS:
      return sortPosts(state, action.payload.posts, action.payload.sortBy);
    default:
      return state;
  }
}

export default visiblePosts;
