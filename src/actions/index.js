import * as api from '../utils/api';

export const LOAD_POSTS = 'LOAD_POSTS';

const loadPosts = (posts) => {
  return {
    type: LOAD_POSTS,
    payload: {
      posts,
    },
  }
}

export const fetchPosts = (category = '') => (dispatch) => {
  return api
    .getPosts(category)
    .then((posts) => dispatch(loadPosts(posts)));
}

export const LOAD_CATEGORIES = 'LOAD_CATEGORIES';

const loadCategories = (categories) => {
  return {
    type: LOAD_CATEGORIES,
    payload: {
      categories,
    },
  }
}

export const fetchCategories = () => (dispatch) => {
  return api
    .getCategories()
    .then((categories) => dispatch(loadCategories(categories.categories)));
}

