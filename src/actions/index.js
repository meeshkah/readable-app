import * as api from '../utils/api';

export const LOAD_POSTS = 'LOAD_POSTS';

const loadPosts = (posts) => {
  return {
    type: LOAD_POSTS,
    payload: {
      posts,
    },
  }
};

export const fetchPosts = (category = '') => (dispatch) => {
  return api
    .getPosts(category)
    .then((posts) => dispatch(loadPosts(posts)));
};

export const POST_UPVOTE = 'POST_UPVOTE';
export const POST_DOWNVOTE = 'POST_DOWNVOTE';

const upvotePost = (post) => {
  return {
    type: POST_UPVOTE,
    payload: {
      post,
    }
  }
};

export const fetchUpvote = (postId) => (dispatch) => {
  return api
    .votePost(postId, 'upVote')
    .then((post) => dispatch(upvotePost(post)))
};

const downvotePost = (post) => {
  return {
    type: POST_DOWNVOTE,
    payload: {
      post,
    }
  }
};

export const fetchDownvote = (postId) => (dispatch) => {
  return api
    .votePost(postId, 'downVote')
    .then((post) => dispatch(downvotePost(post)))
};

export const LOAD_CATEGORIES = 'LOAD_CATEGORIES';

const loadCategories = (categories) => {
  return {
    type: LOAD_CATEGORIES,
    payload: {
      categories,
    },
  }
};

export const fetchCategories = () => (dispatch) => {
  return api
    .getCategories()
    .then((categories) => dispatch(loadCategories(categories.categories)));
};
