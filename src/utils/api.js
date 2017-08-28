const BASE_URI = 'http://localhost:5001';

let token = localStorage.token;
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export const getPosts = () => {
  return fetch(`${BASE_URI}/posts`, { headers })
    .then((data) => data.json());
};
