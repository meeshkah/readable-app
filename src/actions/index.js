import * as api from '../utils/api';

export const SHOW_POSTS = 'SHOW_POSTS';

const showPosts = (posts) => {
  return {
    type: SHOW_POSTS,
    payload: {
      posts,
    },
  }
}

export const loadPosts = () => (dispatch) => {
  return api
    .getPosts()
    .then((posts) => dispatch(showPosts(posts)));
}

