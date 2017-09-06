const BASE_URI = 'http://localhost:5001';

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

export const getCategories = () => {
  return fetch(`${BASE_URI}/categories`, { headers })
    .then((data) => data.json());
};
