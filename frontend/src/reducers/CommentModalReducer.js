import {
  COMMENT_MODAL_OPEN,
  COMMENT_MODAL_CLOSE,
} from '../actions/modals';

const commentModal = (state = {
  isOpen: false,
  comment: {},
}, action) => {
  switch (action.type) {
    case COMMENT_MODAL_OPEN:
    case COMMENT_MODAL_CLOSE:
      return {
        ...state,
        comment: action.payload.comment,
        isOpen: action.payload.isOpen,
      };
    default:
      return state;
  }
}

export default commentModal;
