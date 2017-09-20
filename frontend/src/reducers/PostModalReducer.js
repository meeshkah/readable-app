import {
  POST_MODAL_OPEN,
  POST_MODAL_CLOSE,
} from '../actions/modals';

const postModal = (state = {
  isOpen: false,
  post: {},
}, action) => {
  switch (action.type) {
    case POST_MODAL_OPEN:
    case POST_MODAL_CLOSE:
      return {
        ...state,
        post: action.payload.post,
        isOpen: action.payload.isOpen,
      };
    default:
      return state;
  }
}

export default postModal;
