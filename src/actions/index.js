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

export const LOAD_POST = 'LOAD_POST';

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
    .then((post) => dispatch(loadPost(post)));
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

export const COMMENT_UPVOTE = 'COMMENT_UPVOTE';
export const COMMENT_DOWNVOTE = 'COMMENT_DOWNVOTE';

const upvoteComment = (comment) => {
  return {
    type: COMMENT_UPVOTE,
    payload: {
      comment,
    }
  }
};

export const fetchCommentUpvote = (commentId) => (dispatch) => {
  return api
    .voteComment(commentId, 'upVote')
    .then((comment) => dispatch(upvoteComment(comment)))
};

const downvoteComment = (comment) => {
  return {
    type: COMMENT_DOWNVOTE,
    payload: {
      comment,
    }
  }
};

export const fetchCommentDownvote = (commentId) => (dispatch) => {
  return api
    .voteComment(commentId, 'downVote')
    .then((comment) => dispatch(downvoteComment(comment)))
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

export const LOAD_COMMENTS = 'LOAD_COMMENTS';

const loadComments = (postId, comments) => {
  return {
    type: LOAD_COMMENTS,
    payload: {
      postId,
      comments,
    },
  }
};

export const fetchComments = (postId) => (dispatch) => {
  return api
    .getComments(postId)
    .then((comments) => dispatch(loadComments(postId, comments)));
};

