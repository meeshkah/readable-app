import uuidv4 from 'uuid/v4';

const BASE_URI = 'http://localhost:3001';

let token = localStorage.token;
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export const getPosts = (category = '') => {
  const uri_category = category && `/${category}`;
  return fetch(`${BASE_URI}${uri_category}/posts`, { headers })
    .then((data) => data.json());
};

export const getPost = (postId) => {
  return fetch(`${BASE_URI}/posts/${postId}`, { headers })
    .then((data) => data.json());
}

export const addPost = (post) => {
  return fetch(`${BASE_URI}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: uuidv4(),
      timestamp: Date.now(),
      title: post.title,
      author: post.author,
      body: post.body,
      category: post.category,
    }),
  }).then((data) => data.json());
}

export const deletePost = (postId) => {
  return fetch(`${BASE_URI}/posts/${postId}`, {
    method: 'DELETE',
    headers,
  }).then((data) => data.json());
}

export const editPost = (postId, post) => {
  return fetch(`${BASE_URI}/posts/${postId}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: post.title,
      body: post.body,
    }),
  }).then((data) => data.json());
}

export const getComments = (postId) => {
  return fetch(`${BASE_URI}/posts/${postId}/comments`, {headers})
    .then((data) => data.json());
}

export const addComment = (comment, postId) => {
  return fetch(`${BASE_URI}/comments`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: uuidv4(),
      timestamp: Date.now(),
      author: comment.author,
      body: comment.body,
      parentId: postId,
    }),
  }).then((data) => data.json());
}

export const deleteComment = (commentId) => {
  return fetch(`${BASE_URI}/comments/${commentId}`, {
    method: 'DELETE',
    headers,
  }).then((data) => data.json());
}

export const editComment = (commentId, comment) => {
  return fetch(`${BASE_URI}/comments/${commentId}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      timestamp: Date.now(),
      body: comment.body,
    }),
  }).then((data) => data.json());
}

// option: either "upVote" or "downVote"
export const votePost = (id, option) => {
  return fetch(`${BASE_URI}/posts/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      option,
    }),
  }).then((data) => data.json());
}

// option: either "upVote" or "downVote"
export const voteComment = (id, option) => {
  return fetch(`${BASE_URI}/comments/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      option,
    }),
  }).then((data) => data.json());
}

export const getCategories = () => {
  return fetch(`${BASE_URI}/categories`, { headers })
    .then((data) => data.json());
};
