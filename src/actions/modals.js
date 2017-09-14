export const POST_MODAL_OPEN = 'POST_MODAL_OPEN';

export const openPostModal = (post) => {
  return {
    type: POST_MODAL_OPEN,
    payload: {
      isOpen: true,
      post,
    },
  }
};

export const POST_MODAL_CLOSE = 'POST_MODAL_CLOSE';

export const closePostModal = () => {
  return {
    type: POST_MODAL_CLOSE,
    payload: {
      isOpen: false,
      post: {},
    },
  }
};

export const COMMENT_MODAL_OPEN = 'COMMENT_MODAL_OPEN';

export const openCommentModal = (comment) => {
  return {
    type: COMMENT_MODAL_OPEN,
    payload: {
      isOpen: true,
      comment,
    },
  }
};

export const COMMENT_MODAL_CLOSE = 'COMMENT_MODAL_CLOSE';

export const closeCommentModal = () => {
  return {
    type: COMMENT_MODAL_CLOSE,
    payload: {
      isOpen: false,
      comment: {},
    },
  }
};
