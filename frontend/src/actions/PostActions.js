import * as api from '../utils/api';
import { closePostModal } from './modals';
import history from '../history';
import {
  LOAD_POSTS,
  SORT_POSTS,
  LOAD_POST,
  ADD_POST,
  DELETE_POST,
  EDIT_POST,
  POST_UPVOTE,
  POST_DOWNVOTE,
} from './types';
import { fetchComments } from './CommentActions';

const loadPosts = (posts, sortBy = '') => {
  return {
    type: LOAD_POSTS,
    payload: {
      posts,
      sortBy,
    },
  }
};

export const fetchPosts = (category = '', sortBy = '') => (dispatch) => {
  return api
    .getPosts(category)
    .then((posts) => {
      dispatch(loadPosts(posts, sortBy));
      // TODO: This is quite costly to do for every post. Rethink.
      posts.forEach((post) => dispatch(fetchComments(post.id)));
    });
};

export const sortPosts = (sortBy, posts) => {
  return {
    type: SORT_POSTS,
    payload: {
      sortBy,
      posts,
    },
  }
};

const loadPost = (post) => {
  return {
    type: LOAD_POST,
    payload: {
      post,
    },
  }
};

export const fetchPost = (postId) => (dispatch) => {
  return api
    .getPost(postId)
    .then((post) => {
      if (!Object.keys(post).length || post.error) {
        history.push(`/404`);
      } else {
        dispatch(loadPost(post));
      }
    });
};

const addPost = (post) => {
  return {
    type: ADD_POST,
    payload: {
      post,
    },
  }
};

export const newPost = (post) => (dispatch) => {
  return api
    .addPost(post)
    .then((post) => {
      dispatch(addPost(post));
      dispatch(closePostModal());
    });
}

const removePost = (postId, comments) => {
  return {
    type: DELETE_POST,
    payload: {
      postId,
      comments,
    },
  }
};

export const deletePost = (postId, postComments = [], currentCategory = '') => (dispatch) => {
  return api
    .deletePost(postId)
    .then((post) => {
      dispatch(removePost(post.id, postComments));
      if (currentCategory) {
        history.push(`/category/${currentCategory}`);
      } else {
        history.push(`/`);
      }
    });
}

const amendPost = (postId, post) => {
  return {
    type: EDIT_POST,
    payload: {
      postId,
      post,
    },
  }
};

export const editPost = (postId, post) => (dispatch) => {
  return api
    .editPost(postId, post)
    .then((post) => {
      dispatch(amendPost(post.id, post));
      dispatch(closePostModal());
    });
}

const upvotePost = (post) => {
  return {
    type: POST_UPVOTE,
    payload: {
      post,
    }
  }
};

export const fetchPostUpvote = (postId) => (dispatch) => {
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

export const fetchPostDownvote = (postId) => (dispatch) => {
  return api
    .votePost(postId, 'downVote')
    .then((post) => dispatch(downvotePost(post)))
};
