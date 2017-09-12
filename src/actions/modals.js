export const POST_MODAL_OPEN = 'POST_MODAL_OPEN';

export const openPostModal = () => {
  return {
    type: POST_MODAL_OPEN,
    payload: {
      isOpen: true,
    },
  }
};

export const POST_MODAL_CLOSE = 'POST_MODAL_CLOSE';

export const closePostModal = () => {
  return {
    type: POST_MODAL_CLOSE,
    payload: {
      isOpen: false,
    },
  }
};
