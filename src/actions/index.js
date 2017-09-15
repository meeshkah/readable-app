import * as api from '../utils/api';
import { closePostModal, closeCommentModal } from './modals';
import history from '../history';

export const LOAD_POSTS = 'LOAD_POSTS';

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

export const SORT_POSTS = 'SORT_POSTS';

export const sortPosts = (sortBy, posts) => {
  return {
    type: SORT_POSTS,
    payload: {
      sortBy,
      posts,
    },
  }
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
    .then((post) => {
      if (post.error) {
        history.push(`/`);
      } else {
        dispatch(loadPost(post));
      }
    });
};

export const ADD_POST = 'ADD_POST';

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

export const DELETE_POST = 'DELETE_POST';

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
      history.push(`/${currentCategory}`);
    });
}

export const EDIT_POST = 'EDIT_POST';

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

export const ADD_COMMENT = 'ADD_COMMENT';

const addComment = (comment, postId) => {
  return {
    type: ADD_COMMENT,
    payload: {
      comment,
      postId,
    },
  }
};

export const newComment = (comment, postId) => (dispatch) => {
  return api
    .addComment(comment, postId)
    .then((comment) => {
      dispatch(addComment(comment, postId));
    });
}

export const DELETE_COMMENT = 'DELETE_COMMENT';

const removeComment = (commentId) => {
  return {
    type: DELETE_COMMENT,
    payload: {
      commentId,
    },
  }
};

export const deleteComment = (commentId) => (dispatch) => {
  return api
    .deleteComment(commentId)
    .then((comment) => {
      dispatch(removeComment(comment.id));
    });
}

export const EDIT_COMMENT = 'EDIT_COMMENT';

const amendComment = (commentId, comment) => {
  return {
    type: EDIT_COMMENT,
    payload: {
      commentId,
      comment,
    },
  }
};

export const editComment = (commentId, comment) => (dispatch) => {
  return api
    .editComment(commentId, comment)
    .then((comment) => {
      dispatch(amendComment(comment.id, comment));
      dispatch(closeCommentModal());
    });
}
