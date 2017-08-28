export const SHOW_POSTS = 'SHOW_POSTS';

export const showPosts = (posts) => {
  return {
    type: SHOW_POSTS,
    payload: {
      posts,
    },
  }
}
